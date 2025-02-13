

import TopVendorContainer from "@/components/shared/TopVendors/TopVendorContainer";
import AnalyticsChart from "./_components/analytics-chart";
import DashboardOverview from "./_components/dashBoardOverview";
import MostSoldItems from "./_components/MostSoldItems";
import ProfileCompletion from "./_components/ProfileCompletion";
import GeoChart from "./_components/TopUserCountries";
import ReadyAprovalContainer from "@/components/shared/ReadyFOrAproval.tsx/ReadyAprovalContainer";
import OngoingContainer from "@/components/shared/OngoinOder/OngoinContainer";

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Profile Completion Section */}
      <ProfileCompletion />

      {/* Dashboard Overview Section */}
      <section>
        <h1 className="text-gradient text-[22px] font-semibold mb-[20px]">
          Overview
        </h1>
        <DashboardOverview />
      </section>

      {/* Main Content Grid */}
      <div className="w-full mx-auto grid grid-cols-6 gap-4 2xl:gap-8 my-[30px] mt-10">
        {/* Geo Chart Component */}
        <GeoChart />
        <div className="col-span-2">
          <MostSoldItems />
          <AnalyticsChart />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[49%]">
          <TopVendorContainer/>
        </div>
        <div className="w-[49%]">
          <ReadyAprovalContainer/>
        </div>
      </div>
      <div className="mt-10">

      <OngoingContainer/>
      </div>
    </div>
  );
};

export default Dashboard;
