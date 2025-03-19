"use client";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "INDUSTRY", value: "industry" },
  { id: 2, name: "HEMP/CBD", value: "cbd" },
  { id: 3, name: "RECREATIONAL CANNBIS", value: "recreational" },
];

const SubCategoryFilter = ({ show, setShow }: any) => {
  return (
    <div className="h-[60px] p-[8px] bg-white w-full flex justify-between items-center rounded-lg">
      <div className="flex gap-x-[12px]">
        {/* Dropdown for "Show" */}
        <div className="h-full flex items-center gap-x-[9px] w-fit">
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444] ml-2">
            Show
          </span>
          <PacificDropdownSelector
            list={showList}
            selectedValue={show}
            onValueChange={(value) => setShow(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryFilter;

// Generic Dropdown Component
