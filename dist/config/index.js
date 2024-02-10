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
                name: "Agents",
                value: "agents",
                href: "/vendors?category=agents",
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
                name: "Catering",
                value: "catering",
                href: "/vendors?category=catering",
                imageSrc: "https://placehold.co/600x600",
            },
            {
                name: "Henna",
                value: "henna",
                href: "/vendors?category=henna",
                imageSrc: "https://placehold.co/600x600",
            },
            {
                name: "Make Up Artists",
                value: "mua",
                href: "/vendors?category=mua",
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
                imageSrc: "/planmenu/wishlist.png",
            },
            {
                name: "Wedding Overview",
                href: "/plan/details",
                imageSrc: "/planmenu/overview.png",
            },
            {
                name: "To Do List",
                href: "/plan/todo",
                imageSrc: "/planmenu/todo.png",
            },
            {
                name: "Budget",
                href: "/plan/budget",
                imageSrc: "/planmenu/budget.png",
            },
            {
                name: "Guest List",
                href: "/plan/guests",
                imageSrc: "/planmenu/guest.png",
            },
            {
                name: "Itinerary",
                href: "/plan/itinerary",
                imageSrc: "/planmenu/itinerary.png",
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
        label: "Catering",
        value: "catering",
        icon: lucide_react_1.ChefHat,
    },
    {
        label: "Henna",
        value: "henna",
        icon: lucide_react_1.Hand,
    },
    {
        label: "Make Up Artist",
        value: "mua",
        icon: lucide_react_1.SprayCan,
    },
    {
        label: "Misc",
        value: "misc",
        icon: lucide_react_1.CakeSlice,
    },
];
