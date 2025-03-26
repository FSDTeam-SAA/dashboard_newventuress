"use client";

import { ColumnDef } from "@tanstack/react-table";
import MembershipAction from "./membership-auction";
import { MembershipPlan } from "@/types/membership";

export const MembershipColumns: ColumnDef<MembershipPlan>[] = [
  {
    header: "Plan",
    cell: ({ row }) => {
      return (
        <div className="bg-primary text-white p-[10px] rounded-[12px] ">
          {row.original.planType?.toUpperCase()}
        </div>
      );
    },
  },

  {
    header: "Description",
    cell: ({ row }) => (
      <p className="text-gradient leading-[21.6px]">
        {row.original.description || "No Stote"}
      </p>
    ),
  },

  {
    header: "Plan Details",
    cell: ({ row }) => {
      return (
        <div className="text-[16px] font-normal leading-[19.2px] text-[#444444] space-y-[8px]">
          <p>Auction: {row.original.numberOfAuction}</p>
          <p>Bids: {row.original.numberOfBids}</p>
          <p>Listing: {row.original?.numberOfListing || "Not Available"}</p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cell: ({ row }) => {
      return (
        <p className="text-[16px] leading-[19.2px] font-normal text-[#444444]">
          {row.original?.price || "00"}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <MembershipAction id={row.original._id} initialData={row.original} />
    ),
  },
];
