"use client";
import { useState } from "react";
// import AddNewMembership from "./AddNewMembership";
// import MembershipContainer from "./membership-container";
// import MembershipFilter from "./membership-filter";
// import AddSponsoredListing from "./add-sponsored-list";
// import AddSponsoredContainer from "./add-sponsoredContainer";
// import MembershipRequestsTable from "./membership-request-table";

const NewsLetters = () => {
  // Main tab state
  const [tabValue, setTabValue] = useState<string>("membership");

  // Form visibility states
  const [showMembership, setShowMembership] = useState(false);
  const [showAdditionalMembership, setShowAdditionalMembership] =
    useState(false);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setTabValue(value);

    // Reset form states when changing tabs to prevent conflicts
    if (value === "membership") {
      setShowAdditionalMembership(false);
    } else if (value === "additional") {
      setShowMembership(false);
    } else {
      // For requests tab, hide both forms
      setShowMembership(false);
      setShowAdditionalMembership(false);
    }
  };

  // Determine what content to show
  const renderContent = () => {
    if (showMembership) {
    //   return <AddNewMembership setShowMembership={setShowMembership} />;
    }

    if (showAdditionalMembership) {
      return (
        // <AddSponsoredListing
        //   setShowSponsoredListing={setShowAdditionalMembership}
        // />
      );
    }

    if (tabValue === "requests") {
    //   return <MembershipRequestsTable />;
    }

    return tabValue === "membership" ? (
    //   <MembershipContainer />
    ) : (
    //   <AddSponsoredContainer />
    );
  };

  return (
    <div className="space-y-[30px]">
      <MembershipFilter
        showMembership={showMembership}
        setShowMembership={setShowMembership}
        showAdditionalMembership={showAdditionalMembership}
        setShowAdditionalMembership={setShowAdditionalMembership}
        tabValue={tabValue}
        setTabValue={handleTabChange}
      />

      {renderContent()}
    </div>
  );
};

export default NewsLetters;
