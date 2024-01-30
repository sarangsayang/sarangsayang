import PriceRange from "@/components/sales/PriceRange";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { Loader } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription,
} from "@/lib/stripe";
import { generateCustomerPortalLink } from "@/lib/stripe";

export default async function Status() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  await createCustomerIfNull();

  const manage = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );
  const hasSub = await hasSubscription();
  const checkoutLink = await createCheckoutLink("" + user?.id);

  const vendorRole = user?.role;

  const bgVendor = vendorRole === "vendor" ? "bg-blue-300" : "bg-yellow-300";

  function role(role: string) {
    if (role === "vendor") {
      return {
        label: "Offical Vendor",
        desc: `View your perks and how you can upgrade your status to become our Supervendor below!`,
      };
    } else if (role === "supervendor") {
      return {
        label: "Supervendor",
        desc: `Congrats! You'll maintain being a Supervendor till your subscription ends`,
      };
    }
  }

  return (
    <>
      <MaxWidthWrapper
        className={cn(bgVendor, "mt-20 h-full rounded-lg shadow-md")}
      >
        {user && vendorRole ? (
          <div className="py-10 flex flex-col items-start">
            <h1 className="text-4xl font-medium py-2 flex items-baseline gap-2">
              <span className="text-2xl font-light">
                You&apos;re currently an official
              </span>{" "}
              {role(vendorRole)?.label}
            </h1>
            <p className="text-gray-600 italic w-100">
              {role(vendorRole)?.desc}
            </p>
          </div>
        ) : (
          <Loader className="animate-spin" />
        )}
      </MaxWidthWrapper>
      {user && vendorRole && manage && checkoutLink ? (
        <PriceRange
          userRole={vendorRole}
          userId={user.id}
          portal={manage}
          hasSub={hasSub}
          checkoutLink={checkoutLink}
        />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
}
