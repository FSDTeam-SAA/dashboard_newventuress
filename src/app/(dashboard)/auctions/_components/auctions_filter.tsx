"use client";
import { Button } from "@/components/ui/button";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";
import { useState } from "react";

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
];
const ChoseStoresList = [
  { id: 1, name: "Chose stores", value: "Chose stores" },
  { id: 2, name: "Sales", value: "sales" },
  { id: 3, name: "Rentals", value: "rentals" },
];
const FilterByCtegoryList = [
  { id: 1, name: "Filter By Ctegory", value: "Filter By category" },
  { id: 2, name: "Sales", value: "sales" },
  { id: 3, name: "Rentals", value: "rentals" },
];

const productTypeLists = [
  { id: 1, name: "All Product Types", value: "all" },
  { id: 2, name: "HEMP/CBD", value: "cbd" },
  { id: 3, name: "Recreational Cannabis", value: "recreational" },
];
const AllAuctionsLists = [
  { id: 1, name: "All Auctions", value: "all" },
  { id: 2, name: "Live Auctions", value: "Live Auctions" },
  { id: 3, name: "Your Auctions", value: "Your Auctions" },
];

const AuctionsFilter = () => {
  const [show, setShow] = useState<string>("all"); // Default to "all"
  const [stores, setStores] = useState<string>("Chose stores"); // Default to "auctions"
      const [ctegorys, setCtegorys] = useState<string>("Filter By category"); // Default to "auctions"
  const [productsType, setProductType] = useState("all");
  const [allAuctionsType, setAllAuctionsType] = useState("all");

  return (
    <div className="h-[68px] p-[17px] bg-white w-full flex items-center justify-between">
      <div className="flex items-center h-full  gap-x-[12px]">
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
        {/* Dropdown for "Categories" */}
        <div className="h-full flex items-center gap-2">
            <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">
            Entries
            </span>
            <PacificDropdownSelector
            list={ChoseStoresList}
            selectedValue={stores}
            onValueChange={setStores}
            />
        </div>
        <div className="h-full flex items-center gap-2">
            
            <PacificDropdownSelector
            list={FilterByCtegoryList}
            selectedValue={ctegorys}
            onValueChange={setCtegorys}
            />
        </div>
        <div className="h-full flex items-center">
          <PacificDropdownSelector
            list={productTypeLists}
            selectedValue={productsType}
            onValueChange={setProductType}
            placeholderText="All Product Types"
          />
        </div>
        <div className="h-full flex items-center">
          <PacificDropdownSelector
            list={AllAuctionsLists}
            selectedValue={allAuctionsType}
            onValueChange={setAllAuctionsType}
            placeholderText="All Auctions"
          />
        </div>
      </div>
      <Button className="">
        Bulk Delete
      </Button>
    </div>
  );
};

export default AuctionsFilter;

// Generic Dropdown Component
