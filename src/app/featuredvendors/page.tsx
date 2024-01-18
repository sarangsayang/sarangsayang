import React from "react";
import { categories } from "@/app/data/data";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import FeaturedReel from "@/components/FeaturedReel";

const Trending = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <MaxWidthWrapper>
      {categories.map((category) => (
        <div key={category.value}>
          <FeaturedReel
            title={category.label}
            category={category.value}
            user={user?.id}
            featured={false}
            href={`/vendors?category=${category.value}`}
          />
        </div>
      ))}
    </MaxWidthWrapper>
  );
};

export default Trending;
