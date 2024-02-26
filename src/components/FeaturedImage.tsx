"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Vendor } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";

interface FeaturedImageProps {
  category: string;
}

const FeaturedImage = ({ category }: FeaturedImageProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  const top = results.data?.top as Vendor;
  return (
    <>
      {top ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                width={900}
                height={900}
                //@ts-ignore
                src={top.images[1].image.sizes?.thumbnail?.url}
                alt="product category image"
                className="aspect-square rounded-2xl object-cover object-center"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{top.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Image
          width={900}
          height={900}
          src="https://placehold.co/600x600"
          alt="product category image"
          className="aspect-square rounded-2xl"
        />
      )}
    </>
  );
};

export default FeaturedImage;
