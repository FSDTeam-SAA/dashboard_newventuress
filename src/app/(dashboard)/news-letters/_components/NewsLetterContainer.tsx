"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { format } from "date-fns";

// Types for the newsletter subscriber data
interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
  fullName?: string;
}

interface NewsletterSubscriberResponse {
  status: boolean;
  message: string;
  data: NewsletterSubscriber[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const NewsLetterContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = session.data?.user?.token;

  const { data, isLoading, isError, error } =
    useQuery<NewsletterSubscriberResponse>({
      queryKey: ["newsletter-subscribers", currentPage],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter?page=${currentPage}&limit=8`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
      enabled: !!token,
    });

  // Define columns for subscribers table
  const subscribersColumns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: any) => (
          <div className="font-medium">{row.original.email}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }: any) => (
          <div>{format(new Date(row.original.createdAt), "MMM dd, yyyy")}</div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns: subscribersColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  let content;
  if (isLoading) {
    content = (
      <div className="w-full p-5">
        <TableSkeletonWrapper
          count={8}
          width="100%"
          height="70px"
          className="bg-[#E6EEF6]"
        />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer
          message={(error as Error)?.message || "Something went Wrong"}
        />
      </div>
    );
  } else if (data && data?.data && data?.data.length === 0) {
    content = (
      <div>
        <NotFound message="Oops! No subscribers available. Check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data.length > 0) {
    content = (
      <div>
        <DataTable
          table={table}
          columns={subscribersColumns}
          title="Newsletter Subscribers"
        />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto rounded-[24px] bg-white mb-20">
        {content}
      </div>
      <div>
        {data && data?.meta && data?.meta.totalPages > 1 && (
          <div className="mt-[30px] w-full pb-[30px] flex justify-between">
            <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
              Showing {currentPage} to {data?.meta?.totalPages} in first entries
            </p>
            <div>
              <PacificPagination
                currentPage={currentPage}
                totalPages={data?.meta.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsLetterContainer;
