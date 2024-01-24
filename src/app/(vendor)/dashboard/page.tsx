import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CRMCont from "@/components/crm/CRMCont";
import { Card } from "@/components/ui/card";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import TVLCont from "@/components/analytics/cards/vendorlikes/TVLCont";
import TECont from "@/components/analytics/cards/enquiries/TECont";
import SSCont from "@/components/analytics/cards/enquiries/SSCont";

export default async function Dashboard() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      <MaxWidthWrapper className="space-y-4 pt-6 py-20">
        <div className="flex items-center justify-between space-y-2 pb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your vendor account and statistics.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 mb-12">
          {/* Total Vendor Likes */}
          <Card>{user ? <TVLCont userId={user.id} /> : null}</Card>

          {/* Total Enquiries */}
          <Card>{user ? <TECont userId={user.id} /> : null}</Card>

          {/* Enquiries From Sarang Sayang */}
          <Card>{user ? <SSCont userId={user.id} /> : null}</Card>
        </div>
      </MaxWidthWrapper>
      {user ? <CRMCont userId={user.id} role={user.role} /> : null}
    </>
  );
}
