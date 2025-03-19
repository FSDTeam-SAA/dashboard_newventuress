"use client";
import React from "react";
import SubCategoryHeader from "./SubCategoryHeader";
import AddNewSubCategory from "./AddNewSubCategory";
import SubCategorList from "./SubCategorList";
import { useIndustryShow } from "@/zustand/features/category/useShowIndustry";

const SubCategory = () => {
  const { show, setShow } = useIndustryShow();
  const [showcategory, setShowCategory] = React.useState(false);
  return (
    <div className="space-y-[30px] mb-[30px]">
      <SubCategoryHeader
        setShowCategory={setShowCategory}
        showcategory={showcategory}
        show={show}
        setShow={setShow}
      />
      {showcategory ? (
        <AddNewSubCategory setShowCategory={setShowCategory} />
      ) : (
        <SubCategorList show={show} />
      )}
    </div>
  );
};

export default SubCategory;
