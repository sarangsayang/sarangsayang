import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { VENDOR_CATEGORIES } from "../../config";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import FeaturedReel from "@/components/FeaturedReel";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const sort = parse(searchParams.sort);
  const search = parse(searchParams.search);
  const category = parse(searchParams.category);

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      {category ? (
        <FeaturedReel
          title={label ?? "Vendors"}
          category={category}
          user={user?.id}
        />
      ) : null}
      <div className="mt-12 flex items-center gap-3">
        {category ? <Search search={search} category={category} /> : null}
        {category ? <Filter sort={sort} category={category} /> : null}
      </div>

      <ProductReel
        title={label ?? "Vendors"}
        href="#"
        user={user?.id}
        query={{
          category,
          search,
          limit: 40,
          sort:
            sort === "-createdAt" || sort === "createdAt" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
