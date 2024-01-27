import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { Loader } from "lucide-react";
import DetailsCont from "@/components/plan/DetailsCont";

export default async function Details() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 pt-6 py-20 ">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Wedding Overview
          </h2>
          <p className="text-muted-foreground">
            Fill in some details and we&apos;ll help keep you on track.
          </p>
        </div>
      </div>
      {user ? (
        <DetailsCont userId={user.id} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </MaxWidthWrapper>
  );
}
