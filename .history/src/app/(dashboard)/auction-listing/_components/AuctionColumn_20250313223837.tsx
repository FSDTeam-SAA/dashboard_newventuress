"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/auctionData/listing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export const ActionColumn: ColumnDef<Product>[] = [
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
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={
                row.original.images[0] ||
                "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              height={142}
              width={110}
              alt="img"
              className="rounded-[8px] h-24 w-28 object-cover"
            />
          </div>
          <div>
            <h4 className="text-[18px] text-gradient font-semibold">
              {row.original.title}
            </h4>
            <div className="flex items-center w-[90px] h-[22px] text-[12px] mt-3 p-[10px] border border-[#9E9E9E] rounded-[24px] shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]">
              <Check className="w-[12px] h-[12px] text-[#6E6E6E] mr-2" />
              In stock
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: "SKU",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] text-[#444444] font-normal">
            #{row.original.sku}
          </span>
        </div>
      );
    },
  },
  {
    header: "Store",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] text-[#444444] font-normal">
            {row.original.sku}
          </span>
        </div>
      );
    },
  },
  // {
  //   header: "Status",
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         <span className="text-[16px] text-[#E10E0E] font-normal">
  //           {row.original.sku}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Price",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] text-[#444444] font-normal">
            ${row.original.sku || "10"}
          </span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] text-[#444444] font-normal">
            {new Date(row.original.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
              // second: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: () => {
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
              className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
            >
              <DropdownMenuItem className="p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                Details
              </DropdownMenuItem>
              <DropdownMenuItem className="p-[8px] text-red-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
