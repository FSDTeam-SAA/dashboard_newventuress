export interface Category {
    _id: string;
    categoryName: string;
    image: string;
    slug: string;
    shortDescription: string;
    __v: number;
  }
  
 export interface CategoryResponse {
    status: boolean;
    message: string;
    data: Category[];
  }