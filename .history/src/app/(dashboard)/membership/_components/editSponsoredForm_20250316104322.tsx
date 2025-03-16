"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SponsoredListingData {
  id: string;
  planTitle: string;
  description: string;
  price: number;
  numberOfListing: number;
}

interface EditSponsoredFormProps {
  initialData: SponsoredListingData;
  onSubmit: (data: SponsoredListingData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function EditSponsoredForm({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: EditSponsoredFormProps) {
  const [formData, setFormData] = useState<SponsoredListingData>({
    _id: "",
    planTitle: "",
    description: "",
    price: 0,
    numberOfListing: 0,
  });

  // Initialize form with initial data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="mt-4">
        <CardContent className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="planTitle">Plan Title *</Label>
                  <Input
                    className="h-[50px] mt-2"
                    id="planTitle"
                    name="planTitle"
                    type="text"
                    required
                    value={formData.planTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. 1 Sponsored Listing"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="mt-2 min-h-[100px]"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g. Get 1 Sponsored listing at 20$"
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
                  <Label htmlFor="numberOfListing">
                    Number of Sponsored Listing *
                  </Label>
                  <Input
                    className="h-[50px] mt-2"
                    id="numberOfListing"
                    name="numberOfListing"
                    type="number"
                    min="1"
                    required
                    value={formData.numberOfListing || ""}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
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
                    {isSubmitting ? "Saving..." : "Save Changes"}
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
