"use client";

import { useState, useEffect } from "react";
import DateRangePicker from "./membershipDateRange";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
];

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
  const [show, setShow] = useState<string>("all"); // Default to "all"
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    if (date) {
      console.log("Date Range Changed:", {
        from: date.from ? format(date.from, "yyyy-MM-dd") : undefined,
        to: date.to ? format(date.to, "yyyy-MM-dd") : undefined,
      });
    }
  }, [date]);

  const formatDateRange = (range: DateRange | undefined) => {
    if (range?.from) {
      if (range.to) {
        return `${format(range.from, "LLL dd, y")} - ${format(
          range.to,
          "LLL dd, y"
        )}`;
      }
      return format(range.from, "LLL dd, y");
    }
    return "Pick a date range";
  };

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
    <div className="h-[60px] p-[8px] bg-white w-full flex justify-between items-center">
      <div className="flex gap-x-[12px]">
        {/* Dropdown for "Show" */}
        <div className="h-full flex items-center gap-x-[9px] w-fit">
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">
            Show
          </span>
          <PacificDropdownSelector
            list={showList}
            selectedValue={show}
            onValueChange={setShow}
          />
        </div>
        {/* Dropdown for "Entries" */}
        <div className="h-full flex items-center gap-x-[9px] w-fit">
          <DateRangePicker
            date={date}
            onDateChange={(newDate) => {
              setDate(newDate);
              console.log("Date Range Selected:", {
                from: newDate?.from
                  ? format(newDate.from, "yyyy-MM-dd")
                  : undefined,
                to: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : undefined,
              });
            }}
            trigger={
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal bg-primary text-[#F5F5F5] hover:text-[#F5F5F5]"
              >
                {formatDateRange(date)}
                <ChevronDown />
              </Button>
            }
          />
        </div>
      </div>
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="membership">Membership Plans</TabsTrigger>
          <TabsTrigger value="additional">Additional Plans</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>
        <div className="flex gap-x-[12px]">
          <Button
            onClick={handleAdditionalButtonClick}
            className="h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]"
          >
            {showAdditionalMembership
              ? "View Additional List"
              : "Add Additional Plan"}
          </Button>
          <Button
            onClick={handleMembershipButtonClick}
            className="h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]"
          >
            {showMembership ? "View Membership List" : "Add Membership Plan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipFilter;
