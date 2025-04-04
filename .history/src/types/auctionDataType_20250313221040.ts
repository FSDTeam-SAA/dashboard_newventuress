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
  openingPrice: number;
  startingDateAndTime: string;
  endingDateAndTime: string;
  sku?: string;
  quantity: number;
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
