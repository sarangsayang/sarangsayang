"use client";

import { CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import ProductListing from "./ProductListing";

interface Featured11PullProps {
  category: string;
  label: string;
  user?: string;
}

const Featured11Pull = ({ user, category, label }: Featured11PullProps) => {
  const results = trpc.getTopVendor.useQuery({
    category: category,
  });

  return (
    <div className="w-50">
      {user && results.data?.top ? (
        <ProductListing
          index={results.data.top.id}
          vendor={results.data.top}
          user={user}
        />
      ) : null}
      {!user && results.data?.top ? (
        <ProductListing
          index={results.data.top.id}
          vendor={results.data.top}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default Featured11Pull;
