import React from "react";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";

interface AuctionsHeaderProps {
  showAddAuction: boolean;
  setShowAddAuction: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuctionsHeader: React.FC<AuctionsHeaderProps> = ({
  showAddAuction,
  setShowAddAuction,
}) => {
  return (
    <div className=" bg-white p-[8px] rounded-[12px] flex items-center justify-between">
      <div>
        <Button onClick={() => setShowAddAuction((prev) => !prev)}>
          {showAddAuction ? "Auction List" : "Add New"} <Box />
        </Button>
      </div>
    </div>
  );
};

export default AuctionsHeader;
