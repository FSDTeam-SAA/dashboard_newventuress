"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import NewsLetterDataButton from "./NewsLetterDataButton";
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

const NewsletterDashboard = () => {
  const [subscribersCurrentPage, setSubscribersCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("subscribers");

  const session = useSession();
  const token = session.data?.user?.token;

  // Fetch newsletter subscribers data
  const {
    data: subscribersData,
    isLoading: isLoadingSubscribers,
    isError: isErrorSubscribers,
    error: subscribersError,
  } = useQuery<NewsletterSubscriberResponse>({
    queryKey: ["newsletter-subscribers", subscribersCurrentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter?page=${subscribersCurrentPage}&limit=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
    enabled: !!token && activeTab === "subscribers",
  });

  // Fetch newsletter data
  const {
    data: newsletterData,
    isLoading: isLoadingNewsletter,
    isError: isErrorNewsletter,
    error: newsletterError,
  } = useQuery<NewsletterDataResponse>({
    queryKey: ["newsletter-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/newsletterData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token && activeTab === "newsletters",
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

  // Define columns for newsletter data table
  const newsletterColumns = useMemo(
    () => [
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
      {
        id: "actions",
        cell: () => <NewsLetterDataButton />,
      },
    ],
    []
  );

  const subscribersTable = useReactTable({
    data: subscribersData?.data || [],
    columns: subscribersColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const newsletterTable = useReactTable({
    data: newsletterData?.data || [],
    columns: newsletterColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render subscribers content
  const renderSubscribersContent = () => {
    if (isLoadingSubscribers) {
      return (
        <div className="w-full p-5">
          <TableSkeletonWrapper
            count={8}
            width="100%"
            height="70px"
            className="bg-[#E6EEF6]"
          />
        </div>
      );
    } else if (isErrorSubscribers) {
      return (
        <div>
          <ErrorContainer
            message={subscribersError?.message || "Something went Wrong"}
          />
        </div>
      );
    } else if (subscribersData?.data && subscribersData.data.length === 0) {
      return (
        <div>
          <NotFound message="Oops! No subscribers available. Check your internet connection." />
        </div>
      );
    } else if (subscribersData?.data && subscribersData.data.length > 0) {
      return (
        <>
          <DataTable
            table={subscribersTable}
            columns={subscribersColumns}
            title="Newsletter Subscribers"
          />

          {subscribersData.meta && subscribersData.meta.totalPages > 1 && (
            <div className="mt-[30px] w-full pb-[30px] flex justify-between">
              <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
                Showing {subscribersCurrentPage} to{" "}
                {subscribersData.meta.totalPages} in first entries
              </p>
              <div>
                <PacificPagination
                  currentPage={subscribersCurrentPage}
                  totalPages={subscribersData.meta.totalPages}
                  onPageChange={(page) => setSubscribersCurrentPage(page)}
                />
              </div>
            </div>
          )}
        </>
      );
    }
  };

  // Render newsletter content
  const renderNewsletterContent = () => {
    if (isLoadingNewsletter) {
      return (
        <div className="w-full p-5">
          <TableSkeletonWrapper
            count={8}
            width="100%"
            height="70px"
            className="bg-[#E6EEF6]"
          />
        </div>
      );
    } else if (isErrorNewsletter) {
      return (
        <div>
          <ErrorContainer
            message={newsletterError?.message || "Something went Wrong"}
          />
        </div>
      );
    } else if (newsletterData?.data && newsletterData.data.length === 0) {
      return (
        <div>
          <NotFound message="Oops! No newsletter data available. Check your internet connection." />
        </div>
      );
    } else if (newsletterData?.data && newsletterData.data.length > 0) {
      return (
        <DataTable
          table={newsletterTable}
          columns={newsletterColumns}
          title="Newsletters"
        />
      );
    }
  };

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto rounded-[24px] bg-white mb-20">
        <Tabs
          defaultValue="subscribers"
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-[#E6EEF6] rounded-t-[24px]">
            <TabsTrigger
              value="subscribers"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-[12px]"
            >
              Newsletter Subscribers
            </TabsTrigger>
            <TabsTrigger
              value="newsletters"
              className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-[12px]"
            >
              Newsletters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers" className="p-4">
            {renderSubscribersContent()}
          </TabsContent>

          <TabsContent value="newsletters" className="p-4">
            {renderNewsletterContent()}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NewsletterDashboard;
