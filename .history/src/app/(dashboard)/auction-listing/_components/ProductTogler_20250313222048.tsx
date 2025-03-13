"use client";

import React from "react";
import AuctionHeader from "./AuctionHeader";
import AuctionFilter from "./AuctionFilter";
import VendorAuctionContainer from "./VendorAuctionContainer";
import { useIndustryShow } from "@/zustand/features/category/useShowIndustry";

function ProductTogler() {
  const { show, setShow } = useIndustryShow();
  return (
    <div className="space-y-[30px] mb-[30px]">
      <AuctionHeader
      // setShowAddProduct={setShowAddProduct}
      // showAddProduct={showAddProduct}
      />
      <AuctionFilter show={show} setShow={setShow} />
      {/* <VendorAuctionContainer show={show} /> */}
      {/* {showAddProduct ? <AddNewProduct /> : <VendorAuctionContainer />} */}
    </div>
  );
}

export default ProductTogler;
