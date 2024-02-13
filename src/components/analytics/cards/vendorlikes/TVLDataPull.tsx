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

  const lastMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const lastMonthData = trpc.getVendorLikesThisMonth.useQuery({
    month: lastMonth,
    year: currentYear,
    vendorId: vendorId,
  });

  const lastMonthNumbers = lastMonthData.data?.docs.length;

  const thisMonthData = trpc.getVendorLikesThisMonth.useQuery({
    month: lastMonth + 1,
    year: currentYear,
    vendorId: vendorId,
  });

  const thisMonthNumbers = thisMonthData.data?.docs.length;

  function findDifference(lastMonthNumbers: number, thisMonthNumbers: number) {
    const difference = thisMonthNumbers - lastMonthNumbers;
    if (difference > 0) {
      return (
        <p className="text-xs text-lime-700 mt-4">
          +{difference} from last month
        </p>
      );
    } else if (difference < 0) {
      return (
        <p className="text-xs text-rose-700 mt-4">
          {difference} from last month
        </p>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      {likes ? (
        <div className="text-2xl font-bold">{likes.length}</div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
      {/* @ts-ignore */}
      {findDifference(lastMonthNumbers, thisMonthNumbers)}
    </>
  );
};

export default TVLDataPull;
