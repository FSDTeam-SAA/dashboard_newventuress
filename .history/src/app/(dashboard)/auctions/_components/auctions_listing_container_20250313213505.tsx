"use client";

// Packages
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

// Local imports
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { AuctionListingColumns } from "./auctions_listing_column";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { AuctionDataResponse, AuctionItem } from "@/types/auctionDataType";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

const AuctionListingContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = session?.data?.user?.token;
  console.log({token})

  const {data, isLoading, isError, error} = useQuery<AuctionDataResponse>({
    queryKey : ["all-auctions"],
    queryFn : () => fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auction/all`, {
      method : "GET",
      headers : {
        "content-type" : "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res)=>res.json())
  })


  console.log(data?.data)

  let content;
  if (isLoading) {
    content = (
      <div className="w-full p-10">
        <TableSkeletonWrapper count={5} width="100%" height="120px" className="bg-white"/>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="w-full h-[500px]">
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
    );
  } else if (data && data.data && data.data.length === 0) {
    content = (
      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
    );
  } else if (data && data.data && data.data.length > 0) {
    content = <TableContainer
    data={data?.data || []}
    columns={AuctionListingColumns}
  />
  }
  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px]">
        {content}
      </div>
      <div className="my-[40px] w-full  flex justify-between">
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

export default AuctionListingContainer;

interface TableContainerProps {
  data: any[];
  columns: ColumnDef<AuctionItem>[];
}
const TableContainer = ({ data, columns }: TableContainerProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });
  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        title="All Auctions"
        titleClass="h-[78px] flex items-center text-[28px] leading-[33.6px] font-semibold"
      />
    </>
  );
};
