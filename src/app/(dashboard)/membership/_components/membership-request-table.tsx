"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Check, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MembershipRequest {
  _id: string;
  fullName: string;
  email: string;
  planName: string;
  paymentMethod: string;
  status: string;
  purchasedAt: string;
  createdAt: string;
}

const MembershipRequestsTable = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<MembershipRequest[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    action: string;
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchMembershipRequests();
  }, []);

  // Filter requests whenever the status filter or requests change
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(
        requests.filter((request) => request.status === statusFilter)
      );
    }
  }, [statusFilter, requests]);

  const fetchMembershipRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/membership/details/all`
      );
      const data = await response.json();

      if (data.status) {
        setRequests(data.data);
        // Initially set filtered requests to all requests
        setFilteredRequests(data.data);
      } else {
        toast("Failed to fetch membership requests");
      }
    } catch (error) {
      console.error("Error fetching membership requests:", error);
      toast("Failed to fetch membership requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusAction = (id: string, action: string) => {
    setSelectedRequest({ id, action });
    setConfirmDialogOpen(true);
  };

  const updateMembershipStatus = async () => {
    if (!selectedRequest) return;

    const { id, action } = selectedRequest;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/membership/status/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: action }),
        }
      );

      const data = await response.json();

      if (data.status) {
        toast(getSuccessMessage(action));

        // Update the local state to reflect the change
        const updatedRequests = requests.map((request) =>
          request._id === id ? { ...request, status: action } : request
        );
        setRequests(updatedRequests);
      } else {
        toast(data.message || "Failed to update membership status");
      }
    } catch (error) {
      console.error("Error updating membership status:", error);
      toast("Failed to update membership status");
    } finally {
      // Reset selected request
      setSelectedRequest(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getActionText = () => {
    if (!selectedRequest) return "";

    switch (selectedRequest.action) {
      case "approved":
        return "approve";
      case "rejected":
        return "reject";
      case "pending":
        return "reset to pending";
      default:
        return "update";
    }
  };

  const getSuccessMessage = (action: string) => {
    switch (action) {
      case "approved":
        return "Membership approved successfully";
      case "rejected":
        return "Membership rejected successfully";
      case "pending":
        return "Membership reset to pending successfully";
      default:
        return "Membership status updated successfully";
    }
  };

  const getDialogTitle = () => {
    return "Confirm Action";
  };

  const getActionButtonText = () => {
    if (!selectedRequest) return "Confirm";

    switch (selectedRequest.action) {
      case "approved":
        return "Approve";
      case "rejected":
        return "Reject";
      case "pending":
        return "Reset to Pending";
      default:
        return "Confirm";
    }
  };

  const getActionButtonClass = () => {
    if (!selectedRequest) return "";

    switch (selectedRequest.action) {
      case "approved":
        return "bg-green-600 hover:bg-green-700";
      case "rejected":
        return "bg-red-600 hover:bg-red-700";
      case "pending":
        return "bg-blue-600 hover:bg-blue-700";
      default:
        return "";
    }
  };

  // Get counts for each status type
  const getStatusCounts = () => {
    const pendingCount = requests.filter((r) => r.status === "pending").length;
    const approvedCount = requests.filter(
      (r) => r.status === "approved"
    ).length;
    const rejectedCount = requests.filter(
      (r) => r.status === "rejected"
    ).length;

    return {
      all: requests.length,
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="rounded-t-3xl bg-primary px-8 py-5">
        <h1 className="text-2xl font-semibold text-white">
          Membership Requests
        </h1>
      </div>
      <div className="flex justify-end items-center mt-6">
        <Tabs
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="all" className="px-4">
              All ({counts.all})
            </TabsTrigger>
            <TabsTrigger value="pending" className="px-4">
              Pending ({counts.pending})
            </TabsTrigger>
            <TabsTrigger value="approved" className="px-4">
              Approved ({counts.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="px-4">
              Rejected ({counts.rejected})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No {statusFilter !== "all" ? statusFilter : ""} membership requests
          found
        </div>
      ) : (
        <Table className="p-1">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  {request.fullName}
                </TableCell>
                <TableCell className="p-0">{request.email}</TableCell>
                <TableCell className="capitalize p-0">
                  {request.planName}
                </TableCell>
                <TableCell className="p-0">{request.paymentMethod}</TableCell>
                <TableCell className="p-0">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell className="p-0">
                  {formatDate(request.purchasedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {request.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusAction(request._id, "approved")
                            }
                            className="text-green-600 cursor-pointer"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusAction(request._id, "rejected")
                            }
                            className="text-red-600 cursor-pointer"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      {request.status !== "pending" && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusAction(request._id, "pending")
                          }
                          className="cursor-pointer"
                        >
                          Reset to Pending
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getDialogTitle()}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {getActionText()} this membership
              request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedRequest(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateMembershipStatus();
                setConfirmDialogOpen(false);
              }}
              className={getActionButtonClass()}
            >
              {getActionButtonText()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MembershipRequestsTable;
