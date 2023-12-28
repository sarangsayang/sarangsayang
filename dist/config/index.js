"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENDOR_CATEGORIES = exports.PRODUCT_CATEGORIES = void 0;
var lucide_react_1 = require("lucide-react");
exports.PRODUCT_CATEGORIES = [
    {
        label: 'Discover',
        locked: false,
        value: 'discover',
        leftconstraint: -1800,
        featured: [
            {
                name: 'Venues',
                value: 'venues',
                href: '/vendors?category=venues',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Agents',
                value: 'agents',
                href: '/vendors?category=agents',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Bridals',
                value: 'bridals',
                href: '/vendors?category=bridals',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Photo & Video',
                value: 'photovideo',
                href: "/vendors?category=photovideo",
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Catering',
                value: 'catering',
                href: '/vendors?category=catering',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Decor',
                value: 'decor',
                href: '/vendors?category=decor',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Henna',
                value: 'henna',
                href: '/vendors?category=henna',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Make Up Artists',
                value: 'mua',
                href: '/vendors?category=mua',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Emcees',
                value: 'emcees',
                href: '/vendors?category=emcees',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Honeymoon',
                value: 'honeymoon',
                href: '/vendors?category=honeymoon',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Misc',
                value: 'misc',
                href: '/vendors?category=misc',
                imageSrc: "https://placehold.co/400x600",
            },
        ],
    },
    {
        label: 'Plan',
        locked: true,
        value: 'plan',
        leftconstraint: -800,
        featured: [
            {
                name: 'Wishlist',
                href: "/plan/wishlist",
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Wedding Details',
                href: '/plan/details',
                imageSrc: "https://placehold.co/400x600",
            },
            {
                name: 'Guest List',
                href: '/products?category=icons',
                imageSrc: "https://placehold.co/400x600",
            }
        ],
    },
];
exports.VENDOR_CATEGORIES = [
    {
        label: 'Venues',
        value: 'venues',
        icon: lucide_react_1.Hotel
    },
    {
        label: 'Agents',
        value: 'agents',
        icon: lucide_react_1.Search
    },
    {
        label: 'Bridals',
        value: 'bridals',
        icon: lucide_react_1.Shirt
    },
    {
        label: 'Photo & Video',
        value: 'photovideo',
        icon: lucide_react_1.Camera
    },
    {
        label: 'Catering',
        value: 'catering',
        icon: lucide_react_1.ChefHat
    },
    {
        label: 'Decor',
        value: 'decor',
        icon: lucide_react_1.Flower2
    },
    {
        label: 'Henna',
        value: 'henna',
        icon: lucide_react_1.Hand
    },
    {
        label: 'Make Up Artists',
        value: 'mua',
        icon: lucide_react_1.SprayCan
    },
    {
        label: 'Emcees',
        value: 'emcees',
        icon: lucide_react_1.Mic2
    },
    {
        label: 'Honeymoon',
        value: 'honeymoon',
        icon: lucide_react_1.Plane
    },
    {
        label: 'Misc',
        value: 'misc',
        icon: lucide_react_1.CakeSlice
    },
];
