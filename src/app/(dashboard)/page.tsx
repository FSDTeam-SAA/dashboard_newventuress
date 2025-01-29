"use client";

import DashboardOverview from "./_components/dashBoardOverview";
import ProfileCompletion from "./_components/ProfileCompletion";
import GeoChart from "./_components/TopUserCountries";

const Dashboard = () => {
  return (
    <div className="w-full px-5 ">
      {/* Profile Completion Section */}
      <ProfileCompletion />

      {/* Dashboard Overview Section */}
      <section>
        <h1 className="text-[#0057A8] text-[22px] font-semibold mb-[20px]">
          Dashboard Overview
        </h1>
        <DashboardOverview />
      </section>

      {/* Main Content Grid */}
      <div className="w-full mx-auto grid grid-cols-6 gap-8 my-[30px]">
        {/* Geo Chart Component */}
        <GeoChart />
      </div>
    </div>
  );
};

export default Dashboard;
