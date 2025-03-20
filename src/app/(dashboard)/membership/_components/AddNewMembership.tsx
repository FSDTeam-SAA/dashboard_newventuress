"use client";

import { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MembershipFormData {
  planType: string;
  description: string;
  price: number;
  numberOfAuction: number;
  numberOfBids: number;
  numberOfListing: number;
}

export default function AddNewMembership({
  setShowMembership,
}: {
  setShowMembership: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [formData, setFormData] = useState<MembershipFormData>({
    planType: "",
    description: "",
    price: 0,
    numberOfAuction: 0,
    numberOfBids: 0,
    numberOfListing: 0,
  });

  const headers = useMemo(() => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (session?.user?.token) {
      headers.Authorization = `Bearer ${session.user.token}`;
    }
    return headers;
  }, [session]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: [
          "price",
          "numberOfAuction",
          "numberOfBids",
          "numberOfListing",
        ].includes(name)
          ? parseFloat(value) || 0
          : value,
      }));
    },
    []
  );

  const handlePlanTypeChange = useCallback((value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      planType: value,
    }));
  }, []);

  const createMembershipMutation = useMutation({
    mutationFn: async (data: MembershipFormData) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memberships`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create membership");
        }

        return response.json();
      } catch (error) {
        console.error("Membership creation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Membership plan created successfully!");
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      setShowMembership(false);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.planType) return toast.error("Plan type is required");
    if (!formData.description) return toast.error("Description is required");
    if (formData.price <= 0) return toast.error("Price must be greater than 0");
    if (!session?.user?.token)
      return toast.error("You must be logged in to create a membership");

    setIsLoading(true);
    try {
      await createMembershipMutation.mutateAsync(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="rounded-t-3xl bg-primary px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">
          Add New Membership Plan
        </h1>
      </div>
      <div className="mt-4">
        <CardContent className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="planType">Plan Type *</Label>
                  <Select
                    value={formData.planType}
                    onValueChange={handlePlanTypeChange}
                    required
                  >
                    <SelectTrigger className="h-12 mt-2">
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="mt-2 min-h-[100px]"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter plan description"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Price ($)", name: "price", placeholder: "0.00" },
                  {
                    label: "Number of Auctions",
                    name: "numberOfAuction",
                    placeholder: "0",
                  },
                  {
                    label: "Number of Bids",
                    name: "numberOfBids",
                    placeholder: "0",
                  },
                  {
                    label: "Number of Listings",
                    name: "numberOfListing",
                    placeholder: "0",
                  },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <Label htmlFor={name}>{label} *</Label>
                    <Input
                      className="h-12 mt-2"
                      id={name}
                      name={name}
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={formData[name as keyof MembershipFormData] || ""}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                    />
                  </div>
                ))}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMembership(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Membership"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
