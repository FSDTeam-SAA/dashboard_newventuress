"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { contactListColumns } from "./CustomerListColumn";
import { fetchContactMessages } from "@/lib/fetchContactMessages";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { AdminResponseModal } from "./AdminReponseModal";
import type { ContactMessage } from "./CustomerListColumn";

const ContactListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null
  );
  const pageSize = 25;

  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  // Get the token from the session
  const token = session?.user.token as string;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contacts", userEmail],
    queryFn: () => fetchContactMessages(userEmail, token),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const handleEditResponse = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const contacts = useMemo(() => data?.data || [], [data]);
  const totalPages = Math.ceil(contacts.length / pageSize);
  const paginatedData = useMemo(() => {
    return contacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [contacts, currentPage, pageSize]);

  const columns = useMemo(() => {
    return contactListColumns.map((col) => {
      if (col.header === "Edit Admin Response") {
        return {
          ...col,
          cell: ({ row }: { row: { original: ContactMessage } }) => {
            return (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  onClick={() => handleEditResponse(row.original)}
                >
                  Edit
                </button>
              </div>
            );
          },
        };
      }
      return col;
    });
  }, []);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-[24px] bg-white shadow-[0px_0px_22px_8px_#C1C9E4]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-lg">Loading your contact messages...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Failed to load contact messages. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="w-full">
      <div className="h-auto w-full rounded-[24px] bg-white shadow-[0px_0px_22px_8px_#C1C9E4]">
        <DataTable table={table} columns={columns} title="Customer Support" />
      </div>
      {contacts.length > 0 && (
        <div className="my-[40px] flex w-full justify-between">
          <p className="text-[16px] font-normal leading-[19.2px] text-[#444444]">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, contacts.length)} of{" "}
            {contacts.length} entries
          </p>
          <div>
            <PacificPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
      {contacts.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No contact messages found.
        </div>
      )}

      {selectedContact && (
        <AdminResponseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContact(null);
          }}
          contactId={selectedContact._id}
          currentResponse={selectedContact.adminResponse}
          contactSubject={selectedContact.subject}
        />
      )}
    </section>
  );
};

export default ContactListContainer;
