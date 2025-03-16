"use client";
// Packages
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Local imports
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { MembershipColumns } from "./membership-column";
import { MembershipPlan, MembershipResponse } from "@/types/membership";
import NotFound from "@/components/shared/NotFound/NotFound";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";

const MembershipContainer = () => {
  const [currentPage, setCurrentpage] = useState(1);

  const session = useSession();
  const token = session.data?.user.token;
  console.log({ token });

  const { data, isError, isLoading, error } = useQuery<MembershipResponse>({
    queryKey: ["membership"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memberships`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log("response data:", data);
  console.log(data?.data);

  let content;
  if (isLoading) {
    content = (
      <div className="w-full">
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
    content = <TableContainer columns={MembershipColumns} data={data.data} />;
  }
  return (
    <div>
      <div>{content}</div>

      <div className="w-full flex justify-between py-[40px]">
        <p className="text-[#444444] font-normal text-[16px] leading-[19.2px] ">
          Showing 1 to 25 in first entries
        </p>

        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={(page) => setCurrentpage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<MembershipPlan>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Membership List" />
    </>
  );
};
