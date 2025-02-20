export type HighlightedStatement = {
    title: string;
    description: string;
    _id: string;
  };

export interface blogsDataType {
    _id: string;
    image: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    highlightedStatement: HighlightedStatement[];
    __v: number;
}

export interface blogsDataResponse {
    success: boolean;
  message: string;
  data: blogsDataType[];   
  meta: {
    totalPages: number;
  };
}

// export const blogsManagementData: blogsManagementDataType[] = [
//     {
//         id: 1,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 2,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 3,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 4,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 5,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 6,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
//     {
//         id: 7,
//         title: "Germany's Pioneering Cannabis Legislation: Setting a Precedent for the EU",
//         auctor : "Admin",
//         date : "Jan 6, 2025",
//         view : "2,450",

//     },
// ];