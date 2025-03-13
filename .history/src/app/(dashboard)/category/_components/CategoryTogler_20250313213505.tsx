"use client";
import React from "react";
import AddnewCategory from "./AddnewCategory";
import CategoryList from "./CategoryList";
import CategoryFilter from "./category-filter";
import { useIndustryShow } from "@/zustand/features/category/useShowIndustry";
function CategoryTogler() {
  const [showcategory, setShowCategory] = React.useState(false);
  const { show, setShow } = useIndustryShow();

  return (
    <div className="space-y-[30px] mb-[30px]">
      <CategoryFilter
        show={show}
        setShow={setShow}
        setShowCategory={setShowCategory}
        showcategory={showcategory}
      />
      {showcategory ? (
        <AddnewCategory setShowCategory={setShowCategory} />
      ) : (
        <CategoryList show={show} />
      )}
    </div>
  );
}

export default CategoryTogler;
