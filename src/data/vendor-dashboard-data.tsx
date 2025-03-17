import {
  Box,
  Gift,
  LayoutDashboard,
  Mails,
  MessageSquare,
  Settings,
  ShieldQuestion,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import Image from "next/image";

export type SidebarContentType = {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string;
};

// NOTE: Don't Remove this code used inside vendor-dashboard route
export const sidebarContents = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LayoutDashboard className="h-[16px] w-[16px]" />,
    href: "/",
  },
  // {
  //   id: 2,
  //   name: "Media",
  //   icon: <BookImage className="h-[16px] w-[16px]" />,
  //   href: "/media",
  // },
  {
    id: 3,
    name: "Category",
    icon: (
      <Image
        src="/assets/img/category.png"
        alt="category"
        width={16}
        height={16}
      />
    ),
    href: "/category",
  },
  {
    id: 33,
    name: "Subcategory",
    icon: (
      <Image
        src="/assets/img/category.png"
        alt="category"
        width={16}
        height={16}
      />
    ),
    href: "/sub-category",
  },
  {
    id: 4,
    name: "Vendor Management",
    icon: (
      <Image
        src="/assets/img/vendor-management.png"
        alt="vendor management"
        width={16}
        height={16}
      />
    ),
    href: "/vendor-management",
  },
  {
    id: 5,
    name: "Listing",
    icon: <Box className="h-[16px] w-[16px]" />,
    href: "/auction-listing",
  },
  {
    id: 6,
    name: "Auctions",
    // icon: Icons.hammer,
    icon: (
      <Image
        src="/assets/img/auction_icon.png"
        alt="auction"
        width={16}
        height={16}
      />
    ),
    href: "/auctions",
  },
  {
    id: 7,
    name: "Order",
    icon: <ShoppingCart className="h-[16px] w-[16px]" />,
    href: "/orders",
  },
  // {
  //   id: 8,
  //   name: "Customer",
  //   icon: (
  //     <Image
  //       src="/assets/img/customer_icon.png"
  //       alt="customer"
  //       width={16}
  //       height={16}
  //     />
  //   ),
  //   href: "/customers",
  // },
  {
    id: 9,
    name: "Store management",
    icon: (
      <Image
        src="/assets/img/store-management.png"
        alt="store-management"
        width={16}
        height={16}
      />
    ),
    href: "/store-management",
  },
  {
    id: 10,
    name: "Financial Management",
    icon: (
      <Image
        src="/assets/img/financial-management.png"
        alt="financial-management"
        width={16}
        height={16}
      />
    ),
    href: "/financial-management",
  },
  {
    id: 11,
    name: "Marketing & Promotions",
    icon: (
      <Image
        src="/assets/img/marking-promotion.png"
        alt="markeing and promotion"
        width={16}
        height={16}
      />
    ),
    href: "/marketing-promotions",
  },

  {
    id: 12,
    name: "Coupons",
    icon: <Gift className="h-[16px] w-[16px]" />,
    href: "/coupons",
  },
  {
    id: 13,
    name: "Blogs Management",
    icon: (
      <Image
        src="/assets/img/blog-management.png"
        alt="markeing and promotion"
        width={16}
        height={16}
      />
    ),
    href: "/blogs-management",
  },
  // {
  //   id: 14,
  //   name: "Content Management",
  //   icon: (
  //     <Image
  //       src="/assets/img/content-management.png"
  //       alt="content management"
  //       width={16}
  //       height={16}
  //     />
  //   ),
  //   href: "/content-management",
  // },
  {
    id: 15,
    name: "Reports",
    // icon: Icons.reports,
    icon: (
      <Image
        src="/assets/img/reports.png"
        alt="reports"
        width={16}
        height={16}
      />
    ),
    href: "/reports",
  },
  {
    id: 16,
    name: "Reviews",
    icon: <MessageSquare className="h-[16px] w-[16px]" />,
    href: "/reviews",
  },
  {
    id: 17,
    name: "Settings",
    icon: <Settings className="h-[16px] w-[16px]" />,
    href: "/settings",
  },
  {
    id: 18,
    name: "Membership",
    icon: <UserPlus className="h-[16px] w-[16px]" />,
    href: "/membership",
  },
  {
    id: 19,
    name: "Help & Support",
    icon: <ShieldQuestion className="h-[16px] w-[16px]" />,
    href: "/help-support",
  },
  {
    id: 20,
    name: "NewsLetters",
    icon: <Mails className="h-[16px] w-[16px]" />,
    href: "/news-letters",
  },
] as SidebarContentType[];

export const getCurrentTab = (
  fullPath: string
): SidebarContentType | undefined => {
  return sidebarContents
    .slice() // Create a copy of the array to avoid mutating the original
    .sort((a, b) => b.href.length - a.href.length) // Sort by href length (longer paths first)
    .find((tab) => fullPath.startsWith(tab.href));
};
