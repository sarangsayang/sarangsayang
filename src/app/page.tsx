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
      <div className="mx-auto py-10 bg-[url('/hero.png')] bg-cover bg-center shadow-md">
        <MaxWidthWrapper className="text-center flex flex-col items-center h-[270px]">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Singapore&apos;s largest{" "}
            <span className="text-blue-400">malay wedding directory</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Sarang Sayang, a platform for all things malay weddings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/featuredvendors" className={buttonVariants()}>
              Start Browsing
            </Link>
            {!user ? (
              <Button variant="ghost">
                Unlock Wedding Planner{" "}
                <LockKeyhole className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
              </Button>
            ) : (
              <CreatePlanButton userId={user.id} />
            )}
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <Featured11 user={user?.id} />
        <HomepageAds />
        <ProductReel user={user?.id} title="Brand New" query={{ limit: 4 }} />
      </MaxWidthWrapper>
    </>
  );
}
