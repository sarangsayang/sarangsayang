import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import HomepageAds from "@/components/HomepageAds";
import BadgeLegend from "@/components/BadgeLegend";
import Featured11 from "@/components/Featured11";
import CreatePlanButton from "@/components/plan/CreatePlanButton";

export default async function Home() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper>
        <div className="pt-16 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Singapore&apos;s largest{" "}
            <span className="text-blue-400">malay wedding directory</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Sarang Sayang, a platform for all things malay weddings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/vendors" className={buttonVariants()}>
              Browse Trending
            </Link>
            {!user ? (
              <Button variant="ghost">
                Start Planning{" "}
                <LockKeyhole className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
              </Button>
            ) : (
              <CreatePlanButton userId={user.id} />
            )}
          </div>
        </div>
        <Featured11 />
        <HomepageAds />
        <ProductReel user={user?.id} title="Brand New" query={{ limit: 4 }} />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <BadgeLegend />
        </MaxWidthWrapper>
      </section>
    </>
  );
}
