"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  _id: string;
  categoryName: string;
}

export default function AddNewSubCategory({
  setShowCategory,
}: {
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedIndustry, setSelectedIndustry] =
    useState<string>("recreational");

  const [formData, setFormData] = useState({
    subCategoryName: "",
    shortDescription: "",
    categoryID: "", // Changed from categoryId to categoryID to match API
  });

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?industry=${selectedIndustry}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast("Failed to load categories. Please try again.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [selectedIndustry]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setSelectedFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      toast("Please select a JPEG or PNG file");
    }
  };

  const handleDelete = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setSelectedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryID: value,
    }));
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    // Reset category selection when industry changes
    setFormData((prev) => ({
      ...prev,
      categoryID: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryID) {
      toast("Please select a category");
      return;
    }

    setIsLoading(true);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("subCategoryName", formData.subCategoryName);
    formDataToSubmit.append("shortDescription", formData.shortDescription);

    // Append categoryID as a single value (the API will handle it as an array)
    formDataToSubmit.append("categoryID", formData.categoryID);

    // Add the selected industry to the form data
    formDataToSubmit.append("industry", selectedIndustry);

    if (imageFile) formDataToSubmit.append("image", imageFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: formDataToSubmit,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast("Subcategory created successfully!");
        setShowCategory(false);
      } else {
        toast(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      toast(`Network error, please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="rounded-t-3xl bg-primary px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">
          Add New Subcategory
        </h1>
      </div>
      <CardContent className="p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="subCategoryName">Subcategory Name *</Label>
            <Input
              className="h-14"
              id="subCategoryName"
              name="subCategoryName"
              required
              value={formData.subCategoryName}
              onChange={handleInputChange}
            />

            <div className="space-y-2">
              <Label>Industry Type *</Label>
              <div className="flex gap-4 items-center mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cbd"
                    name="industry"
                    value="cbd"
                    checked={selectedIndustry === "cbd"}
                    onChange={() => handleIndustryChange("cbd")}
                    className="h-4 w-4 text-primary"
                  />
                  <Label htmlFor="cbd" className="font-normal cursor-pointer">
                    HEMP/CBD
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="recreational"
                    name="industry"
                    value="recreational"
                    checked={selectedIndustry === "recreational"}
                    onChange={() => handleIndustryChange("recreational")}
                    className="h-4 w-4 text-primary"
                  />
                  <Label
                    htmlFor="recreational"
                    className="font-normal cursor-pointer"
                  >
                    Recreational Cannabis
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.categoryID}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="h-14">
                  <SelectValue
                    placeholder={
                      loadingCategories
                        ? "Loading categories..."
                        : "Select a category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-categories" disabled>
                      {loadingCategories
                        ? "Loading..."
                        : "No categories available"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-4">
            <Label>Subcategory Image</Label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handleFileInput}
              />
              {imagePreview ? (
                <div className="relative w-full h-[170px]">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Category preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 h-[180px]">
                  <ImageIcon className="w-12 h-12 text-gray-400 mt-10" />
                  <p className="text-sm text-gray-600">
                    Drop your image here, or browse
                  </p>
                  <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                </div>
              )}
            </div>
            {selectedFileName && (
              <p className="text-green-500">{selectedFileName}</p>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <Button type="submit" className="bg-primary" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Confirm"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
