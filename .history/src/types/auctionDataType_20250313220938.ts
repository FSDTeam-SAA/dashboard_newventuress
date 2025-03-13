export type AuctionDataResponse = {
  status: boolean;
  message: string;
  data: AuctionItem[];
  pagination: Pagination;
};

export type AuctionItem = {
  _id: string;
  vendorID?: string;
  title: string;
  shortDescription?: string;
  productType?: string;
  category?: string;
  startingPrice: number;
  startingTime: string;
  endingTime: string;
  sku?: string;
  stockQuantity: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};
