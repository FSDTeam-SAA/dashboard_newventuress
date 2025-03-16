/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import Modal from "@/components/shared/modal/modal";
import { Badge } from "@/components/ui/badge";
import EditSubCategory from "./EditSubCategory";
import { useQuery } from "@tanstack/react-query";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
  shortDescription: string;
  industry: string;
  subCategory: string[];
  __v: number;
}

interface CategoryResponse {
  status: boolean;
  message: string;
  data: Category[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface SubCategoryCardProps {
  categoryId: any;
  title: string;
  subCategoryId: string;
  imageUrl: string;
  description: string;
  industry?: string;
  onDelete: () => void;
  categoryName?: string;
}

export function SubCategoryCard({
  title,
  imageUrl,
  onDelete,
  categoryId,
  subCategoryId,
}: SubCategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // console.log("categoryId:", categoryId);
  // Fetch categories data
  const { data: categoriesResponse, isLoading } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      // console.log("Fetching categories...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
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
      // console.log("Categories data:", data);
      return data;
    },
  });

  // Find category name by ID
  const getCategoryName = () => {
    if (isLoading) return "Loading...";
    if (
      !categoriesResponse?.data ||
      !Array.isArray(categoriesResponse.data) ||
      categoriesResponse.data.length === 0
    )
      return "No data";

    // console.log("Sub Category ID to find:", categoryId);
    // console.log("Available categories:", categoriesResponse.data);

    const category = categoriesResponse.data.find(
      (cat) => String(cat._id) === String(categoryId)
    );

    // console.log("Found category:", category);

    return category ? category.categoryName : "Unknown";
  };

  const handleModal = () => setIsOpen(true);
  const handleCategoryEditModal = () => setIsOpenEditModal(true);

  return (
    <div>
      <Card className="hover:shadow-lg duration-500">
        <CardContent className="pt-4">
          <div className="aspect-square relative mb-3">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover w-[306px] h-[270px] rounded-xl"
            />
            {categoryId && (
              <Badge
                variant="default"
                className="absolute -top-2 -right-2 bg-primary text-white px-2 py-1"
              >
                {getCategoryName()}
              </Badge>
            )}
          </div>
          <h3 className="text-center text-lg font-medium">{title}</h3>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleCategoryEditModal}
            variant="default"
            className="w-full bg-[#1a237e] hover:bg-[#0d47a1]"
          >
            Edit
          </Button>
          <Button onClick={handleModal} variant="outline" className="w-full">
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Modal */}
      {isOpen && (
        <Modal>
          <div className="flex justify-center pt-[24px]">
            <Image
              src="/assets/img/logo.png"
              alt="Modal"
              width={205}
              height={205}
              className="object-cover"
            />
          </div>
          <h2 className="text-[36px] text-[#333333] font-bold text-center mt-3">
            PACIFIC RIM FUSION
          </h2>
          <h3 className="text-[32px] text-gradient font-bold text-center mt-3">
            Are You Sure To Delete this ?
          </h3>
          <p className="text-[26px] text-[#102011] font-normal text-center mt-3">
            Keep shopping with Rim Fusion.
          </p>
          <div className="flex justify-center mt-[50px]">
            <button
              onClick={() => {
                onDelete(); // Call delete function
                setIsOpen(false);
              }}
              className="w-full border-[1px] border-[#4857BD] py-[18px] text-base text-gradient font-semibold rounded-[8px]"
            >
              Yes
            </button>
          </div>
          <div className="mt-[20px]">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary border-[1px] py-[18px] text-base text-[#FFFFFF] font-semibold rounded-[8px]"
            >
              NO
            </button>
          </div>
        </Modal>
      )}

      {/* Edit Category Modal */}
      {isOpenEditModal && (
        <section
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
          onClick={() => setIsOpenEditModal(false)}
        >
          <div
            style={{ boxShadow: "0px 0px 22px 8px #C1C9E4" }}
            className="relative w-[343px] md:w-[1250px] rounded-3xl border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 z-0 bg-[url('/assets/img/modalbg.png')] bg-no-repeat bg-cover rounded-[16px] opacity-50" />
            <div className="relative z-10">
              <EditSubCategory
                subCategoryId={subCategoryId}
                setShowEditForm={setIsOpenEditModal}
                onSuccess={() => {
                  setIsOpenEditModal(false);
                  // You might want to trigger a refetch or refresh here
                }}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
