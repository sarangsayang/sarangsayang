"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { trpc } from "@/trpc/client";
import VendorBannerCard from "./VendorBannerCard";
import { Vendor } from "@/payload-types";

const PhotoVideoBanner = () => {
  const results = trpc.getTopVendor.useQuery({
    category: "photovideo",
  });

  const top = results.data?.top as Vendor;
  const top4 = results.data?.top4 as unknown;

  return (
    <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-md p-5">
      <MaxWidthWrapper className="pb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Featured Photo & Video
        </h1>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="w-full col-span-2">
          {results.data && top4 ? (
            <div className="grid grid-cols-2 gap-3">
              {/* @ts-ignore */}
              <VendorBannerCard vendor={top} />
              {/* @ts-ignore */}
              <VendorBannerCard vendor={top4[0].vendor as Vendor} />
              {/* <p>{JSON.stringify(top4[1].vendor as Vendor)}</p>
              <p>{JSON.stringify(top4[2].vendor as Vendor)}</p> */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PhotoVideoBanner;
