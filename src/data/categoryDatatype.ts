export type categoryStatement = {
  title: string;
  description: string;
  _id: string;
};
export interface categoryDataType {
  subCategoryName: string;
  _id: string;
  categoryName: string;
  title: string;
  image: string;
  slug: string;
  subCategory: string[];
  shortDescription: string;
  industry: string;
  __v: number;
  categoryStatement: categoryStatement[];
}

export type metaPagination = {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};
export interface categoryDataResponse {
  success: boolean;
  message: string;
  data: categoryDataType[];
  meta: metaPagination;
}
