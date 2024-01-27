"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Featured11Pull from "./Featured11Pull";

interface Featured11Props {
  user?: string;
}

const VENDOR_CATEGORIES1 = [
  {
    label: "Venues",
    value: "venues",
  },
  {
    label: "Agents",
    value: "agents",
  },
  {
    label: "Bridals",
    value: "bridals",
  },
  {
    label: "Photo & Video",
    value: "photovideo",
  },
  {
    label: "Catering",
    value: "catering",
  },
];

const VENDOR_CATEGORIES2 = [
  {
    label: "Decor",
    value: "decor",
  },
  {
    label: "Henna",
    value: "henna",
  },
  {
    label: "Make Up Artist",
    value: "mua",
  },
  {
    label: "Honeymoon",
    value: "honeymoon",
  },
  {
    label: "Misc",
    value: "misc",
  },
];

const Featured11 = ({ user }: Featured11Props) => {
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Featured Vendors
          </h1>
        </div>
      </div>

      <Carousel
        className="px-6"
        // plugins={[
        //   Autoplay({
        //     delay: 3000,
        //   }),
        // ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="grid grid-cols-5 gap-4">
              {VENDOR_CATEGORIES1.map((category) => (
                <Featured11Pull
                  label={category.label}
                  category={category.value}
                  key={category.value}
                  user={user}
                />
              ))}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid grid-cols-5 gap-4">
              {VENDOR_CATEGORIES2.map((category) => (
                <Featured11Pull
                  label={category.label}
                  category={category.value}
                  key={category.value}
                  user={user}
                />
              ))}
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:grid bg-slate-200" />
        <CarouselNext className="hidden md:grid bg-slate-200" />
      </Carousel>
    </section>
  );
};

export default Featured11;
