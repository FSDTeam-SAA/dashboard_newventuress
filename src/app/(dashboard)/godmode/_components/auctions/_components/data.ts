export type AuctionsListingDataType = {
  id: number;
  name: string;
  image: string;
  stock: number;
  sku: string;
  store: string;
  status: "Available" | "Low Stock" | "Out of Stock";
  price: number;
  date: string;
};

export const auctionsListingData = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "https://images.pexels.com/photos/3389513/pexels-photo-3389513.jpeg",
    stock: 50,
    sku: "WH12345",
    store: "Tech World ",
    status: "Available",
    price: 99.99,
    date: "2025-01-15",
  },
  {
    id: 2,
    name: "Smartphone",
    image: "https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg",
    stock: 30,
    sku: "SP98765",
    store: "Gadget Hub",
    status: "Available",
    price: 699.99,
    date: "2025-01-14",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    image: "https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg",
    stock: 10,
    sku: "GL45678",
    store: "Elite Computers",
    status: "Available",
    price: 1299.99,
    date: "2025-01-13",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    image: "https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg",
    stock: 25,
    sku: "BS23456",
    store: "Music Zone",
    status: "Available",
    price: 49.99,
    date: "2025-01-12",
  },
  {
    id: 5,
    name: "4K TV",
    image: "https://images.pexels.com/photos/58749/pexels-photo-58749.jpeg",
    stock: 8,
    sku: "TV34567",
    store: "Home Electronics",
    status: "Low Stock",
    price: 899.99,
    date: "2025-01-11",
  },
  {
    id: 6,
    name: "Digital Camera",
    image: "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg",
    stock: 20,
    sku: "DC67890",
    store: "Photography Pro",
    status: "Available",
    price: 499.99,
    date: "2025-01-10",
  },
  {
    id: 7,
    name: "Smartwatch",
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg",
    stock: 45,
    sku: "SW12389",
    store: "Tech Hub",
    status: "Available",
    price: 199.99,
    date: "2025-01-09",
  },
  {
    id: 8,
    name: "Portable Charger",
    image: "https://images.pexels.com/photos/3945666/pexels-photo-3945666.jpeg",
    stock: 100,
    sku: "PC56324",
    store: "Travel Essentials",
    status: "Available",
    price: 29.99,
    date: "2025-01-08",
  },
  {
    id: 9,
    name: "Drone",
    image: "https://images.pexels.com/photos/3372612/pexels-photo-3372612.jpeg",
    stock: 15,
    sku: "DR12367",
    store: "Drone World",
    status: "Available",
    price: 799.99,
    date: "2025-01-07",
  },
  {
    id: 10,
    name: "Virtual Reality Headset",
    image: "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg",
    stock: 12,
    sku: "VR78901",
    store: "Future Tech",
    status: "Low Stock",
    price: 299.99,
    date: "2025-01-06",
  },
] as AuctionsListingDataType[];
