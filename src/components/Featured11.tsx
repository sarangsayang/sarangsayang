"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const Featured11 = () => {
  return (
    <section className="pt-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Featured Vendors
          </h1>
        </div>
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="flex items-center justify-center p-6">
            <div className="group">
              <Link href={"/vendor/65a09ae79cd6475e4b36af23"}>
                <Image
                  unoptimized={true}
                  width={800}
                  height={300}
                  className="object-cover max-w-[800px] max-h-[300px]"
                  src="/featured/featVenue.jpeg"
                  alt="featuredVenue"
                />
                <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                  <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                    Amaris D Arena
                  </h1>
                  <p className="text-sm text-gray-500">Venue</p>
                </div>
              </Link>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div className="group">
              <Link href={"/vendor/65a8042fdd4b315ab0a02363"}>
                <Image
                  unoptimized={true}
                  width={800}
                  height={300}
                  className="object-cover max-w-[800px] max-h-[300px]"
                  src="/featured/featAgent.jpeg"
                  alt="featuredVenue"
                />
                <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                  <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                    SID Events
                  </h1>
                  <p className="text-sm text-gray-500">Agent</p>
                </div>
              </Link>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div className="group">
              <Link href={"/vendor/65902c5432fec6b4e3fc1109"}>
                <Image
                  unoptimized={true}
                  width={800}
                  height={300}
                  className="object-cover max-w-[800px] max-h-[300px]"
                  src="/featured/featBridal.jpeg"
                  alt="featuredVenue"
                />
                <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                  <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                    Farzana Khan Bridal
                  </h1>
                  <p className="text-sm text-gray-500">Bridal</p>
                </div>
              </Link>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div className="group">
              <Link href={"/vendor/659c437836386279c1644502"}>
                <Image
                  unoptimized={true}
                  width={800}
                  height={300}
                  className="object-cover max-w-[800px] max-h-[300px]"
                  src="/featured/featPhotoVideo.jpeg"
                  alt="featuredVenue"
                />
                <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                  <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                    Weekend Stories Co
                  </h1>
                  <p className="text-sm text-gray-500">Photo & Video</p>
                </div>
              </Link>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div className="group">
              <Link href={"/vendor/65a83bc0dd4b315ab0a06331"}>
                <Image
                  unoptimized={true}
                  width={800}
                  height={300}
                  className="object-cover max-w-[800px] max-h-[300px]"
                  src="/featured/featCatering.jpeg"
                  alt="featuredVenue"
                />
                <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                  <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                    Jamil Catering
                  </h1>
                  <p className="text-sm text-gray-500">Catering</p>
                </div>
              </Link>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Decor</p>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Henna</p>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Make Up Artist</p>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Emcee</p>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Honeymoon</p>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="flex items-center justify-center p-6">
            <div>
              <Image
                width={800}
                height={300}
                src="https://placehold.co/800x300"
                alt="SarangSayang"
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                  SarangSayang
                </h3>
                <p className="text-sm text-gray-500">Misc</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:grid" />
        <CarouselNext className="hidden md:grid" />
      </Carousel>
    </section>
  );
};

export default Featured11;
