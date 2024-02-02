"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { FolderSearch } from "lucide-react";
import TEDataPull from "./TEDataPull";

interface TEContProps {
  userId: string;
}

const TECont = ({ userId }: TEContProps) => {
  const getVendorId = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorId = getVendorId.data?.docs[0].id;
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 h-20">
        <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
        <FolderSearch />
      </CardHeader>
      <CardContent>
        {vendorId ? <TEDataPull vendorId={vendorId} /> : null}
      </CardContent>
    </>
  );
};

export default TECont;
