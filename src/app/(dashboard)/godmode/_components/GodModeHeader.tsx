"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuctionsHeader from "./auctions/_components/auctions_header";

interface GodModeHeaderType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  showAddAuction: boolean;
  setShowAddAuction: React.Dispatch<React.SetStateAction<boolean>>;
}

const GodModeHeader = ({
  activeTab,
  setActiveTab,
  showAddAuction,
  setShowAddAuction,
}: GodModeHeaderType) => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-between mb-[30px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="newsletters">Auction</TabsTrigger>
          <TabsTrigger value="subscribers">Listing</TabsTrigger>
        </TabsList>
      </Tabs>
      {activeTab === "newsletters" && (
        <AuctionsHeader
          showAddAuction={showAddAuction}
          setShowAddAuction={setShowAddAuction}
        />
      )}
    </div>
  );
};

export default GodModeHeader;
