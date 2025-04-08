"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { NewsletterData } from "@/types/newsLetterDataType";
import { ColumnDef } from "@tanstack/react-table";
import NewsLetterDataButton from "./NewsLetterDataButton";
import { format } from "date-fns";

export const NewsLetterDataColumn: ColumnDef<NewsletterData>[] = [
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
    header: "Subject",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
            {row.original.emailSubject}
          </span>
        </div>
      );
    },
  },
  {
    header: "Content",
    cell: ({ row }) => {
      // Truncate the email text if it's too long
      const maxLength = 50;
      const text = row.original.emailText;
      const displayText =
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
            {displayText}
          </span>
        </div>
      );
    },
  },
  {
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
            {format(new Date(row.original.createdAt), "dd MMM yyyy")}
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
          <NewsLetterDataButton />
        </div>
      );
    },
  },
];
