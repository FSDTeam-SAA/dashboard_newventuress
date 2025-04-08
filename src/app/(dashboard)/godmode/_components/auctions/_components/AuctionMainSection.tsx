import AuctionListingContainer from "./auctions_listing_container";
import AddListingForm from "./AddListingForm";
interface AuctionMainSectionProps {
  showAddAuction: boolean;
  setShowAddAuction: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuctionMainSection = ({
  showAddAuction,
  setShowAddAuction,
}: AuctionMainSectionProps) => {
  return (
    <div className="space-y-[30px]">
      {showAddAuction ? (
        <AddListingForm setShowAddAuction={setShowAddAuction} />
      ) : (
        <AuctionListingContainer />
      )}
    </div>
  );
};

export default AuctionMainSection;
