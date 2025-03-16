"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
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
import { useQueryClient } from "@tanstack/react-query";

interface SponsoredListingData {
  _id: string;
  planTitle: string;
  planType: string;
  description: string;
  price: number;
  numberOfListing: number;
  numberOfAuction: number;
  numberOfBids: number;
}

interface EditSponsoredListingFormProps {
  initialData: SponsoredListingData;
  id?: string;
  onSubmit?: (data: SponsoredListingData) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}

export default function EditMembershipForm({
  initialData,
  id,
  onSubmit,
  isSubmitting = false,
  onCancel,
}: EditSponsoredListingFormProps) {
  const [formData, setFormData] = useState<SponsoredListingData>(initialData);
  const { data: session } = useSession();

  console.log(initialData);

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" ||
        name === "numberOfListing" ||
        name === "numberOfAuction" ||
        name === "numberOfBids"
          ? Number(value)
          : value,
    }));
  };

  const handlePlanTypeChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      planType: value,
    }));
  };

  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.planType) {
      toast.error("Plan type is required");
      return;
    }

    if (!formData.description) {
      toast.error("Description is required");
      return;
    }

    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (formData.numberOfListing <= 0) {
      toast.error("Number of listings must be greater than 0");
      return;
    }

    if (formData.numberOfAuction < 0) {
      toast.error("Number of auctions must be a positive number");
      return;
    }

    if (formData.numberOfBids < 0) {
      toast.error("Number of bids must be a positive number");
      return;
    }

    // Check if user is authenticated
    if (!session?.user?.token) {
      toast.error("You must be logged in to update a sponsored listing");
      return;
    }

    // If onSubmit is provided, use it (for parent component handling)
    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    // Otherwise handle submission directly (standalone mode)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memberships/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update sponsored listing"
        );
      }

      toast.success("pdated successfully");
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      onCancel(); // Close the form or navigate back
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* <div>
            <Label htmlFor="planTitle">Plan Title *</Label>
            <Input
              className="h-[50px] mt-2"
              id="planTitle"
              name="planTitle"
              value={formData.planTitle}
              onChange={handleInputChange}
              placeholder="Enter plan title"
              required
            />
          </div> */}

          <div>
            <Label htmlFor="planType">Plan Type *</Label>
            <Select
              value={formData.planType}
              onValueChange={handlePlanTypeChange}
              required
            >
              <SelectTrigger className="h-[50px] mt-2">
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
          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              className="h-[50px] mt-2"
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.price || ""}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="numberOfAuction">Number of Auctions *</Label>
            <Input
              className="h-[50px] mt-2"
              id="numberOfAuction"
              name="numberOfAuction"
              type="number"
              min="0"
              required
              value={formData.numberOfAuction || ""}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="numberOfBids">Number of Bids *</Label>
            <Input
              className="h-[50px] mt-2"
              id="numberOfBids"
              name="numberOfBids"
              type="number"
              min="0"
              required
              value={formData.numberOfBids || ""}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="numberOfListing">Number of Listings *</Label>
            <Input
              className="h-[50px] mt-2"
              id="numberOfListing"
              name="numberOfListing"
              type="number"
              min="0"
              required
              value={formData.numberOfListing || ""}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
