"use client";
import { useState } from "react";
import AddNewMembership from "./AddNewMembership";
import MembershipContainer from "./membership-container";
import MembershipFilter from "./membership-filter";
import AddSponsoredListing from "./add-sponsored-list";
import AddSponsoredContainer from "./add-sponsoredContainer";

const Membership = () => {
  const [showMembership, setShowMembership] = useState(false);
  // const [membershipCategory, setmembershipCategory] = useState(false);
  const [showAdditionalMembership, setShowAdditionalMembership] =
    useState(false);
  const [tabValue, setTabValue] = useState<string>("membership");
  console.log(tabValue);

  return (
    <div className="space-y-[30px]">
      <MembershipFilter
        showMembership={showMembership}
        setShowMembership={setShowMembership}
        showAdditionalMembership={showAdditionalMembership}
        setShowAdditionalMembership={setShowAdditionalMembership}
        tabValue={tabValue} // Pass state
        setTabValue={setTabValue} // Pass setter function
        // membershipCategory={membershipCategory}
        // setmembershipCategory={setmembershipCategory}
      />

      {/* Conditionally render based on tabValue */}
      {showMembership ? (
        <AddNewMembership setShowMembership={setShowMembership} />
      ) : showAdditionalMembership ? (
        <AddSponsoredListing
          setShowSponsoredListing={setShowAdditionalMembership}
        />
      ) : tabValue === "membership" ? (
        <MembershipContainer />
      ) : tabValue === "additional" ? (
        // <div className="text-center text-xl font-bold">Hello World</div>
        <AddSponsoredContainer />
      ) : null}
    </div>
  );
};

export default Membership;
