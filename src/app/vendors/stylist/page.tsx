import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import StylistBanner from "@/components/StylistBanner";
import { getServerSideUser } from "@/lib/payload-utils";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const Stylist = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Decor", value: "decor" },
    { title: "Agents", value: "agent" },
  ];
  return (
    <>
      <StylistBanner />
      <MaxWidthWrapper>
        <div className="hidden py-6 lg:grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
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
        {subC.map((cat) => (
          <MiscPull
            key={cat.value}
            category={cat.value}
            title={cat.title}
            user={user?.id}
          />
        ))}
      </MaxWidthWrapper>
    </>
  );
};

export default Stylist;
