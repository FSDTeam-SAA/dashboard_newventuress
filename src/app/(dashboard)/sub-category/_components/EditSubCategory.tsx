"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

interface EditSubCategoryProps {
  subCategoryId: string;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

export default function EditSubCategory({
  subCategoryId,
  setShowEditForm,
  onSuccess,
}: EditSubCategoryProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const session = useSession();
  const token = session.data?.user?.token;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    subCategoryName: "",
    shortDescription: "",
  });

  // Fetch subcategory data on component mount
  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/single/${subCategoryId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subcategory data");
        }

        const data = await response.json();
        console.log("Raw subcategory data:", data);
        setFormData({
          subCategoryName: data.data?.subCategoryName || "",
          shortDescription: data.data?.shortDescription || "",
        });

        if (data.data?.image) {
          setImagePreview(data.data.image);
        }
      } catch (error) {
        toast(
          `Error fetching subcategory: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchSubcategoryData();
  }, [subCategoryId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("subCategoryName", formData.subCategoryName);
    formDataToSubmit.append("shortDescription", formData.shortDescription);
    if (imageFile) formDataToSubmit.append("image", imageFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subCategoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast("Subcategory updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["subcategory"] });
        if (onSuccess) onSuccess();
        setShowEditForm(false);
      } else {
        toast(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      toast(`Network error, please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <p>Loading subcategory data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="rounded-t-3xl bg-primary px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Edit Subcategory</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-primary/80"
          onClick={() => setShowEditForm(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="subCategoryName">Subcategory Name *</Label>
            <Input
              className="h-10"
              id="subCategoryName"
              name="subCategoryName"
              required
              value={formData.subCategoryName}
              onChange={handleInputChange}
            />

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
                    src={
                      imagePreview || "/placeholder.svg?height=170&width=300"
                    }
                    alt="Subcategory preview"
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
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
