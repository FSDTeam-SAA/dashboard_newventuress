import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import SubCategoryFilter from "./sub-category-filter";

const SubCategoryHeader = ({
  showcategory,
  setShowCategory,
  show,
  setShow,
}: {
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
  showcategory: boolean;
  show: any;
  setShow: any;
}) => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end">
      <SubCategoryFilter show={show} setShow={setShow} />
      <div className="pr-2">
        <Button
          onClick={() => setShowCategory((prev) => !prev)}
          className="h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]"
        >
          {showcategory ? "Subcategory List" : "Add New"} <Box />
        </Button>
      </div>
    </div>
  );
};

export default SubCategoryHeader;
