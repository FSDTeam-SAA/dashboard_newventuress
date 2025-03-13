export type Product = {
  _id: string;
  vendorID: string | null;
  storeID: {
    _id: string;
    userId: string;
    licenses: {
      recreational: string;
      hemp: string;
      _id: string;
    }[];
    vendorInfo: {
      fullName: string;
      email: string;
      _id: string;
    }[];
    generalSetting: any[]; // Adjust if necessary
    socialMediaSetting: any[];
    policyAndSupport: any[];
    customerSupport: any[];
    billingAddress: any[];
    shippingAddress: any[];
    __v: number;
  };
  title: string;
  shortDescription: string;
  productType: string;
  category: string | null;
  startingPrice: number;
  startingTime: string; // Use Date if needed
  endingTime: string; // Use Date if needed
  sku: string;
  stockQuantity: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
 export type AuctionListingDataResponse = {
   status: boolean;
   message: string;
   data: Product[];
   pagination: Pagination;
};
 export type Pagination = {
   currentPage: number;
   totalPages: number;
   totalItems: number;
   itemsPerPage: number;
 };