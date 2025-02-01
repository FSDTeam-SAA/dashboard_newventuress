"use client";

import { blogsManagementDataType } from "@/data/blogsManagementData";
import { ColumnDef } from "@tanstack/react-table";
import AuctionsButton from "./AuctionsButton";





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
    cell: ({ row }) => {

      return (
        <div className=" w-[90px]">
          
          <AuctionsButton row={ row }/>
        </div>
      );
    },
  },
];