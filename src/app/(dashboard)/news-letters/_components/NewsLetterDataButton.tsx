"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { format } from "date-fns";

// Types for the newsletter data
interface NewsletterData {
  _id: string;
  emailSubject: string;
  emailText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NewsletterDataResponse {
  status: boolean;
  message: string;
  data: NewsletterData[];
}

const NewsLetterDataContainer = () => {
  const session = useSession();
  const token = session.data?.user?.token;

  const { data, isLoading, isError, error } = useQuery<NewsletterDataResponse>({
    queryKey: ["newsletter-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/newsletterData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token,
  });

  // Define columns for newsletter data table
  const newsletterColumns = [
    {
      accessorKey: "emailSubject",
      header: "Subject",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.original.emailSubject}</div>
      ),
    },
    {
      accessorKey: "emailText",
      header: "Content",
      cell: ({ row }: any) => (
        <div className="max-w-[300px] truncate">{row.original.emailText}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }: any) => (
        <div>{format(new Date(row.original.createdAt), "MMM dd, yyyy")}</div>
      ),
    },
    // {
    //   id: "actions",
    //   cell: () => <NewsLetterDataButton />,
    // },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns: newsletterColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: false,
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
        <NotFound message="Oops! No newsletter data available. Check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data.length > 0) {
    content = (
      <div>
        <DataTable
          table={table}
          columns={newsletterColumns}
          title="Newsletters"
        />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto rounded-[24px] bg-white mb-20">
        {content}
      </div>
    </section>
  );
};

export default NewsLetterDataContainer;
