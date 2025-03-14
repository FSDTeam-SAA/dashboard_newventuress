"use client";

import { useSession } from "next-auth/react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SponsoredListingFormData {
  planTitle: string;
  description: string;
  price: number;
  numberOfListing: number;
}

interface EditSponsoredListingFormProps {
  initialData: SponsoredListingFormData;
  id?: string;
  onSubmit?: (data: SponsoredListingFormData) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}

export default function EditSponsoredListingForm({
  initialData,
  id,
  onSubmit,
  isSubmitting = false,
  onCancel,
}: EditSponsoredListingFormProps) {
  const [formData, setFormData] =
    useState<SponsoredListingFormData>(initialData);
  const { data: session } = useSession();

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "numberOfListing" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.planTitle) {
      toast.error("Plan title is required");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sponsoredlisting/edit/${id}`,
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

      toast.success("Sponsored listing updated successfully");
      onCancel(); // Close the form or navigate back
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="planTitle">Plan Title *</Label>
          {/* <Input
            className="h-[50px] mt-2"
            id="planTitle"
            name="planTitle"
            value={formData.planTitle}
            onChange={handleInputChange}
            placeholder="Enter plan title"
            required
          /> */}
          <Select
            value={formData.planTitle}
            onValueChange={(val) => {
              setFormData((prevData) => ({
                ...prevData,
                planTitle: val,
              }));
            }}
          >
            <SelectTrigger className="h-[50px]">
              <SelectValue placeholder="Select Plan" />
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
          <Label htmlFor="numberOfListing">Number of Auction *</Label>
          <Input
            className="h-[50px] mt-2"
            id="numberOfListing"
            name="numberOfListing"
            type="number"
            min="1"
            required
            value={formData.numberOfListing || ""}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="numberOfListing">Number of Bids *</Label>
          <Input
            className="h-[50px] mt-2"
            id="numberOfListing"
            name="numberOfListing"
            type="number"
            min="1"
            required
            value={formData.numberOfListing || ""}
            onChange={handleInputChange}
            placeholder="0"
          />
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
