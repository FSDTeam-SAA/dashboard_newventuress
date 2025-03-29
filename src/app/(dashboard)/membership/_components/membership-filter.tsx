"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MembershipFilterProps {
  showMembership: boolean;
  setShowMembership: (value: boolean) => void;
  showAdditionalMembership: boolean;
  setShowAdditionalMembership: (value: boolean) => void;
  tabValue: string;
  setTabValue: (value: string) => void;
}

const MembershipFilter = ({
  showMembership,
  setShowMembership,
  showAdditionalMembership,
  setShowAdditionalMembership,
  tabValue,
  setTabValue,
}: MembershipFilterProps) => {
  // Handle membership button click based on current tab and state
  const handleMembershipButtonClick = () => {
    if (tabValue === "membership") {
      setShowMembership(!showMembership);
      // If opening membership form, ensure additional form is closed
      if (!showMembership) {
        setShowAdditionalMembership(false);
      }
    } else {
      // If on additional tab, switch to membership tab and open form
      setTabValue("membership");
      setShowMembership(true);
      setShowAdditionalMembership(false);
    }
  };

  // Handle additional button click based on current tab and state
  const handleAdditionalButtonClick = () => {
    if (tabValue === "additional") {
      setShowAdditionalMembership(!showAdditionalMembership);
      // If opening additional form, ensure membership form is closed
      if (!showAdditionalMembership) {
        setShowMembership(false);
      }
    } else {
      // If on membership tab, switch to additional tab and open form
      setTabValue("additional");
      setShowAdditionalMembership(true);
      setShowMembership(false);
    }
  };

  return (
    <div className="h-[60px] p-[8px] rounded-lg bg-white w-full flex justify-between items-center">
      <div className="flex-1">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="grid min-w-[65%] grid-cols-3">
            <TabsTrigger value="membership">Membership Plans</TabsTrigger>
            <TabsTrigger value="additional">Additional Plans</TabsTrigger>
            <TabsTrigger value="requests">Membership Requests</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex gap-x-[12px] ml-4">
        <Button
          onClick={handleMembershipButtonClick}
          className="h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]"
        >
          {showMembership ? "View Membership List" : "Add Membership Plan"}
        </Button>
        <Button
          onClick={handleAdditionalButtonClick}
          className="h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]"
        >
          {showAdditionalMembership
            ? "View Additional List"
            : "Add Additional Plan"}
        </Button>
      </div>
    </div>
  );
};

export default MembershipFilter;
