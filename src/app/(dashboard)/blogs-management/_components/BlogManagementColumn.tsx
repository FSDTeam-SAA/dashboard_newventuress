"use client";

import { blogsDataType } from "@/data/blogsManagementData";
import { ColumnDef } from "@tanstack/react-table";
import AuctionsButton from "./AuctionsButton";






export const BlogManagementColumn: ColumnDef<blogsDataType>[] = [


  {
    id: "title",
    header: () => <div className="ml-[-405px] ">Tittle</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[256px] h-[114px] flex justify-center gap-[2px] items-center">
          <span className="text-lg font-medium leading-[21px] text-black text-center">{row.original.title}</span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center items-center">{row.original.createdAt}</span>
        </div>
      );
    },
  },
  {
    header: "Actions", 
    cell: ({ row }) => {

      return (
        <div className="  ">
          
          <AuctionsButton row={ row }/>
        </div>
      );
    },
  },
];