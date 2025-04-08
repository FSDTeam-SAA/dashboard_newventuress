"use client";
import React, { useState } from "react";
import GodModeHeader from "./_components/GodModeHeader";
import ProductListing from "./_components/Product-listing";
import AuctionMainSection from "./_components/auctions/_components/AuctionMainSection";

const Page = () => {
  const [activeTab, setActiveTab] = React.useState("subscribers");
  const [showAddAuction, setShowAddAuction] = useState(false);

  return (
    <div>
      <GodModeHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAddAuction={showAddAuction}
        setShowAddAuction={setShowAddAuction}
      />
      {activeTab === "subscribers" && <ProductListing />}
      {activeTab === "newsletters" && (
        <AuctionMainSection
          showAddAuction={showAddAuction}
          setShowAddAuction={setShowAddAuction}
        />
      )}
    </div>
  );
};

export default Page;
