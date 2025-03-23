"use client";
import { CuponData, CuponTableItemsType } from "@/data/cuponData";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CupomColumn } from "./CupomColumn";

const CuponContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="w-full">
    <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px] bg-white">
    <TableContainer data={CuponData} columns={CupomColumn} />
    </div>
    <div className="mt-[30px] mb-[314px] w-full  flex justify-between">
      <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
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

export default CuponContainer;
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { useState } from "react";




const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<CuponTableItemsType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Coupons" />
    </>
  );
};
