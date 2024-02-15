"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface FeaturedImageProps {
  category: string;
}

const FeaturedImage = ({ category }: FeaturedImageProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });
  return (
    <>
      {results.data?.top ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                width={900}
                height={900}
                src={results.data.top.images[1].image.url}
                alt="product category image"
                className="aspect-square rounded-2xl object-cover object-center"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{results.data.top.name}</p>
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
