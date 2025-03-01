"use client";

import { FinanceListData, DemoTableItemsType } from "@/data/FinanceListData";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CustomerListColumn } from "./FinanceListColumn";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { useState } from "react";

const CustomerContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="w-full">
      <div className="h-auto w-full rounded-[24px] bg-white shadow-[0px_0px_22px_8px_#C1C9E4]">
        <TableContainer data={FinanceListData} columns={CustomerListColumn} />
      </div>
      <div className="my-[40px] flex w-full justify-between">
        <p className="text-[16px] font-normal leading-[19.2px] text-[#444444]">
          Showing 1 to 25 in first entries
        </p>
        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<DemoTableItemsType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Finance Lists" />
    </>
  );
};
