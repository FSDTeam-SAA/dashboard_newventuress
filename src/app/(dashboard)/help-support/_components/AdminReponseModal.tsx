"use client";

import type React from "react";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminResponse } from "@/lib/updateAdminResponse";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AdminResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string;
  currentResponse: string;
  contactSubject: string;
}

export function AdminResponseModal({
  isOpen,
  onClose,
  contactId,
  currentResponse,
  contactSubject,
}: AdminResponseModalProps) {
  const [adminResponse, setAdminResponse] = useState(currentResponse || "");
  const { data: session } = useSession();
  const token = session?.user.token as string;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateAdminResponse(contactId, adminResponse, token),
    onSuccess: () => {
      toast({
        title: "Response updated",
        description: "The admin response has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      onClose();
    },
    onError: (error) => {
      toast({
        // variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while updating the response.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Admin Response</DialogTitle>
          <DialogDescription>
            Update the admin response for:{" "}
            <span className="text-gradient">{contactSubject}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="adminResponse"
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Enter your response..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
