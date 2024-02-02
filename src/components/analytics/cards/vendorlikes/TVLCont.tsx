"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { BookHeart } from "lucide-react";
import TVLDataPull from "./TVLDataPull";

interface TotalVendorLikesProps {
  userId: string;
}

const TotalVendorLikes = ({ userId }: TotalVendorLikesProps) => {
  const getVendorId = trpc.getVendorId.useQuery({
    userId: userId,
  });
  const vendorId = getVendorId.data?.docs[0].id;

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
        <CardTitle className="text-sm font-medium">
          Total Vendor Likes
        </CardTitle>
        <BookHeart />
      </CardHeader>
      <CardContent>
        {vendorId ? <TVLDataPull vendorId={vendorId} /> : null}
      </CardContent>
    </>
  );
};

export default TotalVendorLikes;
