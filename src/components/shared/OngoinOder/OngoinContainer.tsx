"use client";
// Packages
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Local imports
import { DataTable } from "@/components/ui/data-table";

import { RedyApropveColumns } from "./OngoinColum";

import { CustomerDataType, oderData } from "@/data/OngoingOrder";

const ReadyAprovalContainer = () => {
  return (
    <div className="pb-10">
      <TableContainer columns={RedyApropveColumns} data={oderData} />
    </div>
  );
};

export default ReadyAprovalContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<CustomerDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Ongoing Order Status" />
    </>
  );
};
