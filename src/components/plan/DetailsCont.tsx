"use client";

import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import DetailsPull from "./DetailsPull";

interface DetailsContProps {
  userId: string;
}

const DetailsCont = ({ userId }: DetailsContProps) => {
  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs[0];

  return (
    <>
      {identifiedPlan ? (
        <DetailsPull plan={identifiedPlan} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default DetailsCont;
