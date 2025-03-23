"use client";
import Toggle from "./Toggle";
import { CuponTableItemsType } from "@/data/cuponData";
import { ColumnDef } from "@tanstack/react-table";
import AuctionsButton from "./AuctionsButton";



export const CupomColumn: ColumnDef<CuponTableItemsType>[] = [
  {
    header: "Code",
    cell: ({ row }) => {
      return (
        <div className=" py-[19px] " >
          <span className="text-[14px] 2xl:text-[16px] text-gradient font-mediuml  ">{row.original.code}</span>
        </div>
      );
    },
  },
  {
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="w-[120px] 2xl:w-[149px]">
          <span className="text-[9px] 2xl:text-[12px] text-white bg-primary py-[5px] pl-[10px] pr-[20px] rounded-[10px] font-normal">{row.original.type}</span>
        </div>
      );
    },
  },
  {
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="text-[16px] text-[#444444] font-mediuml">{row.original.amount}</span>
        </div>
      );
    },
  },
  {
    header: "Store",
    cell: ({ row }) => {
      return (
        <div className="">
          <span className=" text-[14px] 2xl:text-[16px] text-[#444444] font-mediuml">{row.original.store}</span>
        </div>
      );
    },
  },
  {
    header: "Usage Limits", 
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="text-[16px] text-[#444444] font-mediuml">Limit-{row.original.limit}</span>
          
        </div>
      );
    },
  },
  {
    header: "Permission", 
    cell: () => {
      return (
        <div className="">

          <Toggle/>
          
        </div>
      );
    },
  },
  {
    header: "Expired Date", 
    cell: ({ row }) => {
      return (
        <div className="w-[149px]">
          <span className="text-[14px] 2xl:text-[16px] w-[149px] text-[#444444] font-mediuml">{row.original.expireDate}</span>  <br />
          <span className="text-[16px]  text-center  text-[#444444] font-mediuml">{row.original.time}</span>
        </div>
      );
    },
  },
  {
    header: "Actions", 
    cell: ({ row }) => {

      return (
        <div className="">
          <AuctionsButton row={ row }/>
        </div>
      );
    },
  },

];