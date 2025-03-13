export type MembershipPlan = {
  store: string;
  _id: string;
  planType: "basic" | "standard" | "premium"; // Add more if needed
  description: string;
  price: number;
  numberOfAuction: number;
  numberOfBids: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  profileImage: string;
  time: string;
  planTitle: string;
  numberOfListing: number;
};

export type MembershipResponse = {
  status: boolean;
  message: string;
  data: MembershipPlan[];
};
