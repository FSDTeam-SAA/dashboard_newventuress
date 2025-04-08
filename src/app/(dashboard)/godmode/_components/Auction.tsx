import React from "react";
import AuctionMainSection from "./auctions/_components/AuctionMainSection";

export default function Auction({
  showAddAuction,
  setShowAddAuction,
}: {
  showAddAuction: boolean;
  setShowAddAuction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AuctionMainSection
      showAddAuction={showAddAuction}
      setShowAddAuction={setShowAddAuction}
    />
  );
}
