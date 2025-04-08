import { ReactNode } from "react";
import DashNav from "./_components/dashboard-navbar";
import DashSidebar from "./_components/dashboard-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function VendorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-[#E6EEF6]">
      <DashNav />
      <div className="flex items-start h-full ">
        <DashSidebar />
        <div className="px-[25px] 2xl:px-[30px] pt-[20px] 2xl:pt-[30px] w-full">
          {children}
        </div>
        <Toaster className="top-5 right-5 fixed" />
      </div>
    </div>
  );
}
