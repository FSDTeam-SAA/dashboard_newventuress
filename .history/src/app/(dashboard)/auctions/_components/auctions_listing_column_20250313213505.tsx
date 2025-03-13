"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
// import { Check } from "lucide-react";
// import Image from "next/image";
import AuctionListingAuction from "./auction_listing_action";
import { AuctionItem } from "@/types/auctionDataType";
import Image from "next/image";
import { Check } from "lucide-react";

export const AuctionListingColumns: ColumnDef<AuctionItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className="flex  items-center gap-x-[8px] w-fit max-w-[360px]">
          <div className="h-[110px] w-[110px] relative rounded-[12px]">
            {
              row?.original?.images?.map((img: string, index: number)=>{
                return <Image
                key={index}
                src={img}
                alt="product"
                width={142}
                height={110}
                className="rounded-[12px]"
              />
              })}
            
          </div>
          <div className="flex flex-col gap-y-[8px]">
            <h3 className="text-[18px] leading-[21.6px] font-semibold text-gradient">
              {row.original.title}
            </h3>
            <div className="flex items-center  py-1 rounded">
              <span className="text-xs border rounded-xl flex items-center gap-2 px-2 py-1">
                <Check className="w-3 h-3" />
                In stock {row.original.stockQuantity}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Starting Price",
    cell: ({ row }) => (
      <div className="text-[#444444] font-normal text-[16px] leading-[19.2px] ">
        ${row.original.startingPrice}
      </div>
    ),
  },
  {
    header: "Start Date",
    cell: ({ row }) => (
      <div className="text-[#444444] font-normal text-[16px] leading-[19.2px] ">
        {row.original.startingTime}
      </div>
    ),
  },
  {
    header: "End Date",
    cell: ({ row }) => (
      <div className="text-[#444444] font-normal text-[16px] leading-[19.2px] ">
        {row.original.endingTime}
      </div>
    ),
  },
  // {
  //   header: "Bid",
  //   cell: ({ row }) => (
  //     <h4 className="max-w-[137px] text-gradient font-semibold text-[18px] leading-[21.6px] ">
  //       {row.original.store}
  //     </h4>
  //   ),
  // },
  // {
  //   header: "Last Bid",
  //   cell: ({ row }) => (
  //     <h5 className="max-w-[137px] font-normal text-[16px] leading-[19.2px] text-[#E10E0E]">
  //       {row.original.status}
  //     </h5>
  //   ),
  // },
  
  {
    header: "Actions",
    cell: () => <AuctionListingAuction />,
  },
];
