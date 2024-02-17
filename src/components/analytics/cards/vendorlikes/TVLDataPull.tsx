import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";

interface TotalVendorLikesProps {
  vendorId: string;
}

const TVLDataPull = ({ vendorId }: TotalVendorLikesProps) => {
  const getLikes = trpc.getLikesFromVendId.useQuery({
    vendorId: vendorId,
  });

  const likes = getLikes.data?.docs;

  return (
    <>
      {likes ? (
        <div className="text-2xl font-bold">{likes.length}</div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  );
};

export default TVLDataPull;
