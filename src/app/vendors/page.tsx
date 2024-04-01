import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { VENDOR_CATEGORIES } from "../../config";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import FeaturedReel from "@/components/FeaturedReel";
import { BadgeCheck, Heart } from "lucide-react";
import Link from "next/link";

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
    <>
      {/* <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg">
        <MaxWidthWrapper>
          {category ? (
            <FeaturedReel
              title={label ?? "Vendors"}
              category={category}
              user={user?.id}
            />
          ) : null}
        </MaxWidthWrapper>
      </div> */}

      <MaxWidthWrapper>
        <div className="py-6 grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <Link href={"/faq"} target="_blank">
                <p className="mt-3 text-sm text-muted-foreground text-balance font-bold">
                  Non-Official Sarang Sayang Vendors{" "}
                </p>
              </Link>
              <p className="text-sm text-muted-foreground text-balance">
                have not claimed their profiles.
              </p>
            </div>
          </div>

          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 flex flex-col items-center">
              <div className="flex flex-row items-center align-middle gap-2">
                <Link href={"/faq"} target="_blank">
                  <p className="font-bold text-sm text-muted-foreground">
                    Official Sarang Sayang Vendors
                  </p>
                </Link>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-blue-400"
                />
              </div>
              <p className="text-sm text-muted-foreground text-balance">
                are vendors who have claimed their profile.
              </p>
            </div>
          </div>

          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 flex flex-col items-center">
              <div className="flex flex-row items-center align-middle gap-2">
                <Link href={"/faq"} target="_blank">
                  <p className="font-bold text-sm text-muted-foreground">
                    Supervendors
                  </p>
                </Link>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-yellow-400"
                />
              </div>
              <p className="text-sm text-muted-foreground text-balance">
                have claimed their profiles and are very active.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
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
            limit: 1000,
            sort: sort === "-name" || sort === "name" ? sort : undefined,
          }}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
