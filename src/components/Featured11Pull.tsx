"use client";

import { CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/trpc/client";

interface Featured11PullProps {
  category: string;
  label: string;
}

const Featured11Pull = ({ category, label }: Featured11PullProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  return (
    <>
      {results.data?.top ? (
        <CarouselItem className="flex items-center justify-center p-6">
          <div className="group">
            <Link href={`/vendor/${results.data.top.id}`}>
              <Image
                unoptimized={true}
                width={1100}
                height={400}
                className="object-cover max-w-[1100px] max-h-[400px]"
                src={results.data.top.images[0].image.url}
                alt={`Featured${label}`}
              />
              <div className="mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white">
                <h1 className="font-medium text-sm text-gray-700 group-hover:underline">
                  {results.data.top.name}
                </h1>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </Link>
          </div>
        </CarouselItem>
      ) : null}
    </>
  );
};

export default Featured11Pull;
