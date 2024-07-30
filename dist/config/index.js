"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENDOR_CATEGORIES = exports.PRODUCT_CATEGORIES = void 0;
var lucide_react_1 = require("lucide-react");
exports.PRODUCT_CATEGORIES = [
    {
        label: "Discover",
        locked: false,
        value: "discover",
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
                href: "/vendors?category=stylist",
                imageSrc: "https://placehold.co/600x600",
            },
            {
                name: "Bridals",
                value: "bridals",
                href: "/vendors?category=bridals",
                imageSrc: "https://placehold.co/600x600",
            },
            {
                name: "Photo & Video",
                value: "photovideo",
                href: "/vendors?category=photovideo",
                imageSrc: "https://placehold.co/600x600",
            },
            {
                name: "Berkat & Gubahan",
                value: "berkatgubahan",
                href: "/vendors?category=berkatgubahan",
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
        value: "plan",
        featured: [
            {
                name: "Wishlist",
                href: "/plan/wishlist",
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
exports.VENDOR_CATEGORIES = [
    {
        label: "Venues",
        value: "venues",
        icon: lucide_react_1.Hotel,
    },
    {
        label: "Agents",
        value: "agents",
        icon: lucide_react_1.Search,
    },
    {
        label: "Bridals",
        value: "bridals",
        icon: lucide_react_1.Shirt,
    },
    {
        label: "Photo & Video",
        value: "photovideo",
        icon: lucide_react_1.Camera,
    },
    {
        label: "Make Up Artist",
        value: "mua",
        icon: lucide_react_1.SprayCan,
    },
    {
        label: "Henna",
        value: "henna",
        icon: lucide_react_1.Hand,
    },
    {
        label: "Emcees & Performers",
        value: "emceesperformers",
        icon: lucide_react_1.Mic2,
    },
    {
        label: "Misc",
        value: "misc",
        icon: lucide_react_1.CakeSlice,
    },
    {
        label: "Wedding Stylist",
        value: "stylist",
        icon: lucide_react_1.Flower2,
    },
    {
        label: "Berkat & Gubahan",
        value: "berkatgubahan",
        icon: lucide_react_1.Gift,
    },
];
