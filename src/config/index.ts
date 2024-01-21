import { CakeSlice, Camera, ChefHat, Flower2, Hand, Hotel, Mic2, Plane, Shirt, SprayCan, Search, LockKeyhole } from "lucide-react"

export const PRODUCT_CATEGORIES = [
    {
      label: 'Discover',
      locked: false,
      value: 'discover' as const,
      featured: [
        {
          name: 'Venues',
          value: 'venues',
          href: '/vendors?category=venues',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Agents',
          value: 'agents',
          href: '/vendors?category=agents',
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'Bridals',
          value: 'bridals',
          href: '/vendors?category=bridals',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Photo & Video',
          value: 'photovideo',
          href: `/vendors?category=photovideo`,
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Catering',
          value: 'catering',
          href: '/vendors?category=catering',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Decor',
          value: 'decor',
          href: '/vendors?category=decor',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Henna',
          value: 'henna',
          href: '/vendors?category=henna',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Make Up Artists',
          value: 'mua',
          href: '/vendors?category=mua',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Emcees',
          value: 'emcees',
          href: '/vendors?category=emcees',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Honeymoon',
          value: 'honeymoon',
          href: '/vendors?category=honeymoon',
          imageSrc: "https://placehold.co/600x600",
          
        },
        {
          name: 'Misc',
          value: 'misc',
          href: '/vendors?category=misc',
          imageSrc: "https://placehold.co/600x600",
        },
        
      ],
    },
    {
      label: 'Plan',
      locked: true,
      value: 'plan' as const,
      featured: [
        {
          name: 'Wishlist',
          href: `/plan/wishlist`,
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'Wedding Overview',
          href: '/plan/details',
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'To Do List',
          href: '/plan/todo',
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'Budget',
          href: '/plan/budget',
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'Guest List',
          href: '/products?category=icons',
          imageSrc: "https://placehold.co/600x600",
        },
        {
          name: 'Itinerary',
          href: '/products?category=icons',
          imageSrc: "https://placehold.co/600x600",
        }
      ],
    },
  ]
  
export const VENDOR_CATEGORIES = [
  {
    label: 'Venues',
    value: 'venues',
    icon: Hotel
  },
  {
    label: 'Agents',
    value: 'agents',
    icon: Search
  },
  {
    label: 'Bridals',
    value: 'bridals',
    icon: Shirt
  },
  {
    label: 'Photo & Video',
    value: 'photovideo',
    icon: Camera
  },
  {
    label: 'Catering',
    value: 'catering',
    icon: ChefHat

  },
  {
    label: 'Decor',
    value: 'decor',
    icon: Flower2
  },
  {
    label: 'Henna',
    value: 'henna',
    icon: Hand
  },
  {
    label: 'Make Up Artist',
    value: 'mua',
    icon: SprayCan
  },
  {
    label: 'Emcees',
    value: 'emcees',
    icon: Mic2
  },
  {
    label: 'Honeymoon',
    value: 'honeymoon',
    icon: Plane
  },
  {
    label: 'Misc',
    value: 'misc',
    icon: CakeSlice
  },
]