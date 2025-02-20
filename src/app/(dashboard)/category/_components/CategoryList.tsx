"use client";
import { useState } from "react";
import PacificPagination from "@/components/ui/PacificPagination";
import { CategoryCard } from "./categoryCard";
import { useQuery } from "@tanstack/react-query";
import { CategoryResponse } from "@/types/categories";
import ErrorContainer from "@/components/shared/sections/error-container";
import EmptyContainer from "@/components/shared/sections/empty-container";
import { Loader2 } from "lucide-react";

const initialCategories = [
  {
    id: 1,
    title: "Flowers",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Wax",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Hats",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Glasswear",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Apparel",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Pipes",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    title: "Bongs",
    imageUrl:
      "https://images.pexels.com/photos/8326748/pexels-photo-8326748.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    title: "Trays",
    imageUrl:
      "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function CategoryList() {
  const [categories, setCategories] = useState(initialCategories);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(setCategories)
  const { data, isLoading, isError, error } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`).then(
        (res) => res.json()
      ),
  });


  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex items-center justify-center">
        <Loader2 className="w-[100px] h-[100px] "/>
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error.message || "Something is wrong!"} />
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div>
        <EmptyContainer
          message="No data available for the selected criteria. Please try different
                  filters or check your connection!"
        />
      </div>
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.data?.map((category) => (
          <CategoryCard
            key={category._id}
            data={category}
            // onDelete={() => handleDelete(category?._id)}
          />
        ))}
      </div>
    );
  }

  // Function to delete a category
  // const handleDelete = (id: number) => {
  //   setCategories((prevCategories) =>
  //     prevCategories.filter((category) => category.id !== id)
  //   );
  // };

  return (
    <div>
      <div className="min-h-screen max-w-[1506px] p-4 md:p-6 bg-white rounded-[12px]">
        <div className="mx-auto">
          <div className="mb-6 rounded-t-3xl bg-primary p-4">
            <h1 className="text-[28px] font-semibold text-white">
              Category List
            </h1>
          </div>

          {content}
        </div>
      </div>

      <div className="mt-[40px] flex justify-between">
        <div className="text-[#444444] font-normal text-[16px]">
          Showing 1 to {categories.length} entries
        </div>
        <div className="w-[400px]">
          <PacificPagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={10}
          />
        </div>
      </div>
    </div>
  );
}
