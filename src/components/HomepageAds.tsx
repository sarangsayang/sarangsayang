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
import Link from "next/link";

const HomepageAds = () => {
  return (
    <section>
      <Carousel
      // plugins={[
      //     Autoplay({
      //         delay: 5000,
      //     }),
      // ]}
      >
        <CarouselContent>
          <CarouselItem className="flex items-center justify-center p-6">
            <Link
              href={`https://open.spotify.com/show/3k1f239b4o0ais2Yt5OID2`}
              target="_blank"
            >
              <Image
                width={1100}
                height={220}
                src="/ads/OI.jpg"
                alt="ad1"
                unoptimized={true}
              />
            </Link>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
            <CarouselNext /> */}
      </Carousel>
    </section>
  );
};

export default HomepageAds;
