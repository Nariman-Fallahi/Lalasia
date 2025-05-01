import { BookOpenText, Newspaper, ShoppingBag, Wrench } from "lucide-react";

export const HEADER_MENU_PATHS = [
  {
    id: 1,
    name: "Products",
    path: "/products",
    icon: ShoppingBag,
  },
  {
    id: 2,
    name: "Services",
    path: "/services",
    icon: Wrench,
  },
  {
    id: 3,
    name: "Article",
    path: "/article",
    icon: Newspaper,
  },
  {
    id: 4,
    name: "About Us",
    path: "/about",
    icon: BookOpenText,
  },
];

export const FOOTER_MENU_PATHS = [
  {
    id: 1,
    title: "Product",
    items: [
      {
        id: 1,
        name: "New Arrivals",
        path: "/",
      },
      {
        id: 2,
        name: "Best Selling",
        path: "/",
      },
      {
        id: 3,
        name: "Home Decor",
        path: "/",
      },
      {
        id: 4,
        name: "Kitchen Set",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Services",
    items: [
      {
        id: 1,
        name: "Catalog",
        path: "/",
      },
      {
        id: 2,
        name: "Blog",
        path: "/",
      },
      {
        id: 3,
        name: "FaQ",
        path: "/",
      },
      {
        id: 4,
        name: "Pricing",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Follow Us",
    items: [
      {
        id: 1,
        name: "Facebook",
        path: "/",
      },
      {
        id: 2,
        name: "Instagram",
        path: "/",
      },
      {
        id: 3,
        name: "Twitter",
        path: "/",
      },
    ],
  },
];
