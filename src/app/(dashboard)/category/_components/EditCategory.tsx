"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { TiEdit } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CategoryCardProps {
  categoryId: string;
  setIsOpenEditModal: (data: boolean) => void;
}

export function EditCategory({
  categoryId,
  setIsOpenEditModal,
}: CategoryCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const token = session.data?.user?.token;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    shortDescription: "",
    industry: "cbd",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  // Fetch category data
  const { data, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category data");
      }
      return response.json();
    },
    enabled: !!categoryId && !!token,
  });
  const categoryData = data?.data;

  // Initialize form data when category data is fetched
  useEffect(() => {
    if (categoryData) {
      setFormData({
        categoryName: categoryData.categoryName || "",
        shortDescription: categoryData.shortDescription || "",
        industry: categoryData.industry || "cbd",
      });
      setImagePreview(categoryData.image);
    }
  }, [categoryData]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Please select a JPEG or PNG file");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress((e.loaded / e.total) * 100);
      }
    };
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setSelectedFile(file);
      setUploadProgress(100);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      industry: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryName) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);

    try {
      // First, let's log what we're about to send to help debug
      console.log("Submitting form data:", {
        categoryName: formData.categoryName,
        shortDescription: formData.shortDescription,
        industry: formData.industry,
        hasImage: !!selectedFile,
      });

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("categoryName", formData.categoryName);

      // Only include shortDescription if it has a value
      if (formData.shortDescription) {
        formDataToSubmit.append("shortDescription", formData.shortDescription);
      }

      formDataToSubmit.append("industry", formData.industry);

      if (selectedFile) {
        formDataToSubmit.append("image", selectedFile);
      }

      // Log the FormData entries for debugging
      for (const [key, value] of Array.from(formDataToSubmit.entries())) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        toast.success("Category updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["allcategory"] });
        queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
        setIsOpenEditModal(false);
      } else {
        toast.error(`Error: ${result.message || "Failed to update category"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  if (isCategoryLoading) {
    return <div>Loading category data...</div>;
  }

  return (
    <div>
      <div className="rounded-t-3xl bg-primary p-4">
        <h1 className="text-[28px] font-semibold text-white">Edit Category</h1>
      </div>
      <div className="bg-white">
        <CardContent className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                    className="h-[51px] border border-[#B0B0B0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Type Description here"
                    className="min-h-[91px] border border-[#B0B0B0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.industry}
                    onValueChange={handleRadioChange}
                    className="flex items-center space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cbd" id="edit-cbd" />
                      <Label htmlFor="edit-cbd">HEMP/CBD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="recreational"
                        id="edit-recreational"
                      />
                      <Label htmlFor="edit-recreational">Recreational</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Category Image</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } 
                    ${imagePreview ? "p-2" : "p-6"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileButtonClick}
                  >
                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png"
                      onChange={handleFileInput}
                    />
                    {imagePreview ? (
                      <div className="relative aspect-video w-full h-[257px]">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Category preview"
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current?.click();
                          }}
                          className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                        >
                          <TiEdit size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 h-[193px]">
                        <ImageIcon className="w-12 h-12 text-gray-400 mt-10" />
                        <p className="text-sm text-gray-600">
                          Drop your image here, or browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Jpeg, png are allowed
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative w-10 h-10 bg-gray-100 rounded">
                      <ImageIcon className="w-6 h-6 absolute inset-0 m-auto text-gray-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenEditModal(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Category"}
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
