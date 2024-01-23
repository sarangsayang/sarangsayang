"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { trpc } from "@/trpc/client";
import PageVisits from "./pagevisits/PageVisits";
import { Loader } from "lucide-react";
import VendorLikes from "./vendorlikes/VendorLikes";
import Enquiries from "./enquiries/Enquiries";

interface GraphProps {
  userId: string;
}

const Graphs = ({ userId }: GraphProps) => {
  const vendor = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorId = vendor.data?.docs[0].id;

  return (
    <>
      <Card>
        {vendorId ? (
          <VendorLikes vendorId={vendorId} />
        ) : (
          <Loader className="animate-spin" />
        )}
      </Card>

      <Card>
        {vendor ? (
          <Enquiries vendorId={vendorId} />
        ) : (
          <Loader className="animate-spin" />
        )}
      </Card>
    </>
  );
};

export default Graphs;
