"use client";
import AnalyticsChart from "../_components/analytics-chart";
import DashboardOverview from "../_components/dashBoardOverview";
import MostSoldItems from "../_components/MostSoldItems";
import GeoChart from "../_components/TopUserCountries";
// import { SalesVolumeChart } from "./_components/totalPaymentVolume/_componenets/sales-volume-chart";
// import TotalPaymentVolume from "./_components/totalPaymentVolume/totalPaymentVolume";

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Dashboard Overview Section */}
      <section>
        <h1 className="text-gradient text-[22px] font-semibold mb-[20px]">
          Overview
        </h1>
        <DashboardOverview />
      </section>

      {/* Main Content Grid */}
      <div className="w-full mx-auto grid grid-cols-6 gap-8 my-[30px]">
        {/* Geo Chart Component */}
        <GeoChart />
        <div className="col-span-2">
          <MostSoldItems />
          <AnalyticsChart />
        </div>
      </div>
      {/* Geo Chart Component */}
      {/* <div className="w-full grid grid-cols-2 gap-4 2xl:gap-8 my-[30px]">
        <div>
          <TotalPaymentVolume/>
        </div>
        <div className="">
        <SalesVolumeChart />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
