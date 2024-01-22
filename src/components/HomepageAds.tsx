"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const HomepageAds = () => {
  return (
    <section className="pt-1">
      <Carousel
      // plugins={[
      //     Autoplay({
      //         delay: 5000,
      //     }),
      // ]}
      >
        <CarouselContent>
          <CarouselItem className="flex items-center justify-center p-6">
            <Image
              width={1100}
              height={200}
              src="https://placehold.co/1100x200"
              alt="ad1"
            />
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
            <CarouselNext /> */}
      </Carousel>
    </section>
  );
};

export default HomepageAds;
