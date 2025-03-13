"use client";
import type React from "react";
import { useState } from "react";
import AuctionsHeader from "./auctions_header";
import AuctionsFilter from "./auctions_filter";
// import AddAuctionForm from "./AddAuctionForm"
import AuctionListingContainer from "./auctions_listing_container";
import AjaxBidding from "./AjaxBidding";

const AuctionMainSection: React.FC = () => {
  const [showAddAuction, setShowAddAuction] = useState(false);
  const [showAddBids, setShowAddBids] = useState(true);

  return (
    <div className="space-y-[30px]">
      <AuctionsHeader
        showAddAuction={showAddAuction}
        setShowAddAuction={setShowAddAuction}
        showAddBids={showAddBids}
        setShowAddBids={setShowAddBids}
      />
      <AuctionsFilter />
      {/* {showAddBids ? <AuctionListingContainer /> : <AjaxBidding />} */}
    </div>
  );
};

export default AuctionMainSection;
