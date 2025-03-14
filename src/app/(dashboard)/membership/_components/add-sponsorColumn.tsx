"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SponsorshipData } from "@/types/sponsoData";
import SponsoredAuction from "./add-sponsored-auction";
export const SponsorshipColumns: ColumnDef<SponsorshipData>[] = [
  {
    header: "Plan",
    cell: ({ row }) => {
      return (
        <div className="bg-primary text-white p-[10px] rounded-[12px] ">
          {row.original.planTitle?.toUpperCase()}
        </div>
      );
    },
  },
  {
    header: "Description",
    cell: ({ row }) => {
      return (
        <p className="text-[16px] leading-[19.2px] font-normal text-[#444444]">
          {row.original.description || "No Description"}
        </p>
      );
    },
  },
  {
    header: "TotalListing",
    cell: ({ row }) => {
      return (
        <div className="text-[16px] font-normal leading-[19.2px] text-[#444444] space-y-[8px]">
          <p>Auction: {row.original.numberOfListing}</p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cell: ({ row }) => (
      <p className="text-gradient text-[18px] leading-[21.6px] font-semibold">
        {row.original?.price || "0"}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <SponsoredAuction id={row.original._id} initialData={row.original} />
    ),
  },
];
