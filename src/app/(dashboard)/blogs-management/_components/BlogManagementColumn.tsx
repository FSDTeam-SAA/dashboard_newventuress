"use client";

import { Button } from "@/components/ui/button";
import { blogsManagementDataType } from "@/data/blogsManagementData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";





export const BlogManagementColumn: ColumnDef<blogsManagementDataType>[] = [


  {
    header: "Tittle",
    cell: ({ row }) => {
      return (
        <div className="w-[256px] h-[66px] flex justify-center gap-[2px]">
          <span className="text-lg font-medium leading-[21px] text-black text-center">{row.original.title}</span>
        </div>
      );
    },
  },
  {
    header: "Author",
    cell: ({ row }) => {
      return (
        <div className="w-[200px] h-[44px] flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.auctor}</span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.date}</span>
        </div>
      );
    },
  },
  {
    header: "Views and Engagement",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.view}</span>
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
              <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]">
              <DropdownMenuItem className="p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default">Edit</DropdownMenuItem>
              <DropdownMenuItem className="p-[8px] text-red-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default" >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }
];