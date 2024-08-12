import {
  CakeSlice,
  Camera,
  Mic2,
  Hand,
  Hotel,
  Shirt,
  SprayCan,
  Search,
  Flower2,
  Gift,
} from "lucide-react";

export const PRODUCT_CATEGORIES = [
  {
    label: "Discover",
    locked: false,
    value: "discover" as const,
    featured: [
      {
        name: "Venues",
        value: "venues",
        href: "/vendors?category=venues",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Wedding Stylist",
        value: "stylist",
        href: "/vendors/stylist",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Bridals",
        value: "bridals",
        href: "/vendors/bridal",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Photo & Video",
        value: "photovideo",
        href: `/vendors?category=photovideo`,
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Berkat & Gubahan",
        value: "berkatgubahan",
        href: "/vendors/berkatgubahan",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "MUA & Pak Andam",
        value: "mua",
        href: "/vendors/mua",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Emcees & Performers",
        value: "emceesperformers",
        href: "/vendors?category=emceesperformers",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Misc",
        value: "misc",
        href: "/vendors/misc",
        imageSrc: "https://placehold.co/600x600",
      },
    ],
  },
  {
    label: "Plan",
    locked: true,
    value: "plan" as const,
    featured: [
      {
        name: "Wishlist",
        href: `/plan/wishlist`,
        imageSrc: "/planmenu/1.jpg",
      },
      {
        name: "Wedding Overview",
        href: "/plan/details",
        imageSrc: "/planmenu/2.jpg",
      },
      {
        name: "To Do List",
        href: "/plan/todo",
        imageSrc: "/planmenu/3.jpg",
      },
      {
        name: "Budget",
        href: "/plan/budget",
        imageSrc: "/planmenu/4.jpg",
      },
      {
        name: "Guest List",
        href: "/plan/guests",
        imageSrc: "/planmenu/5.jpg",
      },
      {
        name: "Itinerary",
        href: "/plan/itinerary",
        imageSrc: "/planmenu/6.jpg",
      },
    ],
  },
];

export const VENDOR_CATEGORIES = [
  {
    label: "Venues",
    value: "venues",
    icon: Hotel,
  },
  {
    label: "Wedding Stylist",
    value: "stylist",
    icon: Flower2,
  },
  {
    label: "Bridals",
    value: "bridals",
    icon: Shirt,
  },
  {
    label: "Photo & Video",
    value: "photovideo",
    icon: Camera,
  },
  {
    label: "Berkat & Gubahan",
    value: "berkatgubahan",
    icon: Gift,
  },
  {
    label: "Make Up Artist",
    value: "mua",
    icon: SprayCan,
  },
  {
    label: "Emcees & Performers",
    value: "emceesperformers",
    icon: Mic2,
  },
  {
    label: "Misc",
    value: "misc",
    icon: CakeSlice,
  },
];
