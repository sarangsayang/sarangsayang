"use client";

import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { Vendor } from "@/payload-types";

interface Featured11PullProps {
  category: string;
  label: string;
  user?: string;
  index: number;
}

const Featured11Pull = ({
  user,
  category,
  label,
  index,
}: Featured11PullProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  return (
    <div className="w-50">
      {user && results.data?.top ? (
        <ProductListing
          index={index}
          vendor={results.data.top as Vendor}
          user={user}
        />
      ) : null}
      {!user && results.data?.top ? (
        <ProductListing
          index={index}
          vendor={results.data.top as Vendor}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default Featured11Pull;
