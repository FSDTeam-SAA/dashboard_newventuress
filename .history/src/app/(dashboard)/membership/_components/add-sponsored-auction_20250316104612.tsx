"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoveRight, Trash2, Edit } from "lucide-react";
import EmailSendingForm from "./email-sending-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import EditSponsoredForm from "./editSponsoredForm";

const SponsoredAuction = ({
  id,
  initialData,
}: {
  id: string;
  initialData: any;
}) => {
  const [emailOpen, setEmailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // Delete Membership
  const deleteMembership = async () => {
    if (!session?.user?.token) {
      throw new Error("Unauthorized: No token found");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sponsoredlisting/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete membership");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteMembership,
    onSuccess: () => {
      toast.success("sponsored plan deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      setDeleteOpen(false);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  // Edit Membership
  const updateMembership = async (updatedData: any) => {
    if (!session?.user?.token) {
      throw new Error("Unauthorized: No token found");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sponsoredlisting/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update membership");
    }
    return res.json();
  };

  const editMutation = useMutation({
    mutationFn: updateMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      setEditOpen(false);
    },
    onError: (error) => {
      console.error("Edit failed:", error);
    },
  });

  const handleEditSubmit = (updatedData: any) => {
    toast.success("Sponsored Plan Updated Successfully!");
    editMutation.mutate(updatedData);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white h-auto w-[140px] rounded-lg shadow-md"
        >
          <DropdownMenuItem
            className="p-[8px] hover:bg-[#E6EEF6] cursor-pointer"
            onClick={() => setEmailOpen(true)}
          >
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-[8px] hover:bg-[#FFF3CD] text-yellow-600 cursor-pointer"
            onClick={() => setEditOpen(true)}
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-[8px] hover:bg-[#FFE6E6] text-red-600 cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Send Email Dialog */}
      {emailOpen && (
        <AlertDialog open={emailOpen} onOpenChange={setEmailOpen}>
          <AlertDialogTitle />
          <AlertDialogContent className="p-0 shadow-lg rounded-[16px] min-w-[700px]">
            <div className="w-full h-[78px] bg-primary rounded-t-[16px] flex items-center justify-between px-[32px]">
              <p className="text-white text-[32px]">Send Email</p>
              <Button
                onClick={() => setEmailOpen(false)}
                className="bg-[#FFFFFF] text-[#121D42] hover:bg-white/90"
              >
                Back to List <MoveRight />
              </Button>
            </div>
            <div className="bg-white px-[32px] rounded-b-[16px]">
              <EmailSendingForm />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Confirm Delete Dialog */}
      {deleteOpen && (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="w-full h-[78px] bg-primary rounded-t-[16px] flex items-center justify-center px-[32px] mb-5">
                <p className="text-white text-[32px] ">Are you sure?</p>
              </div>
              <AlertDialogDescription className="text-center">
                This will permanently delete the sponsorship.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8">
              <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Edit Membership Dialog */}
      {editOpen && (
        <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <div className="w-full h-[78px] bg-primary rounded-t-[16px] flex items-center justify-between px-[32px]">
                <p className="text-white text-[32px]">Edit Sponsored Plan</p>
              </div>
            </AlertDialogHeader>
            <div>
              <EditSponsoredForm
                initialData={initialData}
                onSubmit={handleEditSubmit}
                isSubmitting={editMutation.isPending}
                onCancel={() => setEditOpen(false)}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SponsoredAuction;
