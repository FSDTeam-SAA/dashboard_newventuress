"use client";
import { useState } from "react";
import PacificPagination from "@/components/ui/PacificPagination";
import { CategoryCard } from "./categoryCard";
import { categoryDataResponse } from "@/data/categoryDatatype";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import NotFound from "@/components/shared/NotFound/NotFound";
import { useSession } from "next-auth/react";

export default function CategoryList({ show }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = session.data?.user?.token;
  console.log(show);
  const { data, isLoading, isError } = useQuery<categoryDataResponse>({
    queryKey: ["allcategory", currentPage, show],
    queryFn: async (): Promise<categoryDataResponse> =>
      fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/categories?page=${currentPage}&limit=${8}&industry=${
          show == "industry" ? "" : show
        }`,
        {
          method: "GET",
        }
      ).then((res) => res.json() as Promise<categoryDataResponse>),
  });

  console.log({ data });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deletecategory"],
    mutationFn: async (orderId: string): Promise<void> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete category");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allcategory"] });
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center flex-col">
        <Loader2 className="animate-spin opacity-80" />
        <p>Loading your data...</p>
      </div>
    );
  } else if (isError) {
    content = <NotFound message="No found your data" />;
  } else if (data && data.data && data.data.length === 0) {
    content = (
      <div className="mt-7">
        <NotFound message="No found your data" />
      </div>
    );
  } else {
    content = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.data.map((category) => (
          <CategoryCard
            key={category._id}
            title={category.categoryName}
            imageUrl={category.image}
            description={category.shortDescription}
            slug={category.slug}
            categoryId={category._id}
            onDelete={() => handleDelete(category._id)}
            industry={category.industry}
            subCategory={category.subCategory}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen max-w-[1506px] p-4 md:p-6 bg-white rounded-[12px]">
        <div className="mx-auto">
          <div className="mb-6 rounded-t-3xl bg-primary p-4">
            <h1 className="text-[28px] font-semibold text-white">
              Category List
            </h1>
          </div>
          <div>{content}</div>
        </div>
      </div>
      <div className="mt-[40px] flex justify-between">
        <div className="text-[#444444] font-normal text-[16px]">
          Showing {currentPage} to {data?.meta?.totalPages} in first entries
        </div>
        <div className="w-[400px]">
          {data && data?.meta && data?.meta?.totalPages > 1 && (
            <PacificPagination
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              totalPages={data?.meta?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
