"use client";
import { Button } from "@/components/ui/button";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";
import { useState } from "react";

const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "New", value: "New" },
  { id: 3, name: "Old", value: "Old" },
];

const categoriesList = [
  { id: 1, name: "Filter By Category", value: "all" },
  { id: 2, name: "Sales", value: "sales" },
  { id: 3, name: "Rentals", value: "rentals" },
];
const typeList = [
  { id: 1, name: "All Product Types", value: "all" },
  { id: 2, name: "CBD", value: "sales" },
  { id: 3, name: "Recreational Cannabis", value: "Recreational" },
];
const storeList = [
  { id: 1, name: "Choose stores", value: "all" },
  { id: 2, name: "CBD", value: "sales" },
  { id: 3, name: "Recreational Cannabis", value: "Recreational" },
];

const MediaFilter = () => {
  const [show, setShow] = useState<string>("all"); // Default to "all"
  const [category, setCategory] = useState<string>("all"); // Default to "auctions"
  const [types, setTypes] = useState<string>("all"); // Default to "auctions"
  const [stores, setStores] = useState<string>("all"); // Default to "auctions"

  return (
    <div className="h-[60px] p-[8px] bg-white w-full flex justify-between items-center rounded-[12px]">
      <div className="flex gap-x-[12px]">
        {/* Dropdown for "Show" */}
        <div className="h-full flex items-center gap-x-[9px] w-fit ml-2">
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
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">
            Entries
          </span>
          <PacificDropdownSelector
            list={storeList}
            selectedValue={stores}
            onValueChange={setStores}
          />
        </div>
        {/* Dropdown for "Categories" */}
        <div className="h-full flex items-center">
          <PacificDropdownSelector
            list={categoriesList}
            selectedValue={category}
            onValueChange={setCategory}
          />
        </div>
        {/* Dropdown for "Types" */}
        <div className="h-full flex items-center">
          <PacificDropdownSelector
            list={typeList}
            selectedValue={types}
            onValueChange={setTypes}
          />
        </div>
      </div>
      <Button className="w-[135px] h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]">
        Bulk Delete
      </Button>
    </div>
  );
};

export default MediaFilter;

// Generic Dropdown Component
