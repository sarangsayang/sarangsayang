"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { MousePointerClick } from "lucide-react";
import TVCDataPull from "./TVCDataPull";

interface TVCContProps {
  userId: string;
}

const TVCCont = ({ userId }: TVCContProps) => {
  const getVendorId = trpc.getVendorId.useQuery({
    userId: userId,
  });
  const vendorId = getVendorId.data?.docs[0].id;

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
        <CardTitle className="text-sm font-medium">Total Page Visits</CardTitle>
        <MousePointerClick />
      </CardHeader>
      <CardContent>
        {vendorId ? <TVCDataPull vendorId={vendorId} /> : null}
      </CardContent>
    </>
  );
};

export default TVCCont;
