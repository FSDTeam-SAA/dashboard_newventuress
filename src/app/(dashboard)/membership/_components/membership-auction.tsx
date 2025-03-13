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
import EditSponsoredListingForm from "./EditMembershipForm";

interface SponsoredListingData {
  _id: string;
  planTitle: string;
  description: string;
  price: number;
  numberOfListing: number;
}

interface SponsoredListingActionProps {
  id: string;
  initialData: SponsoredListingData;
}

const SponsoredListingAction = ({
  id,
  initialData,
}: SponsoredListingActionProps) => {
  const [emailOpen, setEmailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // Delete Sponsored Listing
  const deleteSponsoredListing = async () => {
    if (!session?.user?.token) {
      throw new Error("Unauthorized: No token found");
    }
    const res = await fetch(
      `http://localhost:8001/api/admin/sponsoredlisting/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete sponsored listing");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteSponsoredListing,
    onSuccess: () => {
      toast.success("Sponsored listing deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["sponsoredListing"] });
      setDeleteOpen(false);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete sponsored listing");
    },
  });

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
                This will permanently delete the sponsored listing.
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

      {/* Edit Sponsored Listing Dialog */}
      {editOpen && (
        <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <div className="w-full h-[78px] bg-primary rounded-t-[16px] flex items-center justify-between px-[32px]">
                <p className="text-white text-[32px]">Edit Sponsored Listing</p>
              </div>
            </AlertDialogHeader>
            <div>
              <EditSponsoredListingForm
                initialData={initialData}
                id={id}
                onCancel={() => setEditOpen(false)}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SponsoredListingAction;
