"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";
import {
  BadgeCheck,
  CheckCircle,
  Crown,
  Loader2,
  MoveRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { trpc } from "@/trpc/client";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { sendFeatVendForm } from "@/actions/sendFeatVendForm";
import { Vendor } from "@/payload-types";
import { sendTopVendForm } from "@/actions/sendTopVendForm";

interface PriceRangeProps {
  userRole: string;
  userId: string;
  portal: string;
  hasSub: boolean;
  checkoutLink: string;
}

interface PriceObject {
  monthly: number;
  monthly5: number;
}

const PriceRange = ({
  userRole,
  userId,
  portal,
  hasSub,
  checkoutLink,
}: PriceRangeProps) => {
  const [annually, setAnnually] = useState(false);

  const vendor = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorAsVendor = vendor.data?.docs[0] as Vendor;

  function isFirst6(category: string, price: PriceObject) {
    if (category === "venues") {
      return price.monthly;
    } else if (category === "agents") {
      return price.monthly;
    } else if (category === "bridals") {
      return price.monthly5;
    } else if (category === "photovideo") {
      return price.monthly5;
    } else if (category === "catering") {
      return price.monthly5;
    } else if (category === "decor") {
      return price.monthly5;
    } else if (category === "henna") {
      return price.monthly5;
    } else if (category === "mua") {
      return price.monthly5;
    } else if (category === "emcees") {
      return price.monthly5;
    } else if (category === "honeymoon") {
      return price.monthly5;
    } else if (category === "misc") {
      return price.monthly5;
    }
  }

  return (
    <main className="mx-4 my-12">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
          <span className="font-semibold">Sarang Sayang Vendor Plans</span>
        </h1>
        <Button variant="ghost">
          <Link href={portal} className="flex gap-2 items-center">
            Manage Billing{" "}
            <MoveRight className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
          </Link>
        </Button>
      </div>

      <Tabs
        defaultValue="plans"
        className="w-full flex flex-col items-center mt-3"
      >
        <TabsList className="grid w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="addon">Add On</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="flex flex-col items-center justify-center mt-5 px-20 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {userRole === "vendor" ? (
                        <Crown className="text-yellow-600" />
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are here!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0">
                  <span className="text-4xl font-medium tracking-tight">
                    Free
                  </span>
                  <span className="text-gray-400">/forever</span>
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">Offical Vendor</h2>
                    <BadgeCheck
                      aria-hidden="true"
                      className="h-4 w-4 flex-shrink-0 text-blue-400"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    All vendors who have claimed their vendor profile are
                    automatically an Official Sarang Sayang Vendor.
                  </p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="ml-3 text-base font-medium">
                      Access to dashboard
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to update
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Vendor Profile / Packages
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to Sarang Sayang
                      </p>
                      <p className="ml-3 text-base font-medium">Support Team</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Increased brand awareness
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Enquiry notifications
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Upgrade to view user details/messages
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to personal CRM Platform
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Keep track of your own leads
                      </p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {userRole != "vendor" ? (
                        <Crown className="text-yellow-600" />
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are here!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0">
                  <span className="text-4xl font-medium tracking-tight">$</span>
                  {!annually ? (
                    <>
                      <span className="text-4xl font-medium tracking-tight">
                        {vendor.data && vendor.data.docs[0].category ? (
                          isFirst6(vendor.data.docs[0].category, {
                            monthly: 500,
                            monthly5: 200,
                          })
                        ) : (
                          <Loader2 className="animate-spin text-blue-500" />
                        )}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-medium tracking-tight">
                        {/* @ts-ignore */}
                        {vendor.data && vendor.data.docs[0].category ? (
                          isFirst6(vendor.data.docs[0].category, {
                            monthly: 4800,
                            monthly5: 1920,
                          })
                        ) : (
                          <Loader2 className="animate-spin text-blue-500" />
                        )}
                      </span>
                      <span className="text-gray-400">/year</span>
                    </>
                  )}
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">Supervendor</h2>
                    <BadgeCheck
                      aria-hidden="true"
                      className="h-4 w-4 flex-shrink-0 text-yellow-400"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Other than the cool Gold tick, our Supervendors will have
                    more access to our users.
                  </p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="ml-3 text-base font-medium">
                      Access to dashboard
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to update
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Vendor Profile / Packages
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to Sarang Sayang
                      </p>
                      <p className="ml-3 text-base font-medium">Support Team</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Increased brand awareness
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Enquiry notifications
                      </p>
                      <p className="ml-3 text-sm italic font-light text-yellow-600">
                        With viewable user details
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Access to personal CRM Platform
                      </p>
                      <p className="ml-3 text-sm italic font-light text-yellow-600">
                        Your Leads + Sarang Sayang Leads
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Direct Messaging Function
                      </p>
                      <p className="ml-3 text-sm italic font-light text-yellow-600">
                        Access to all user messages,
                      </p>
                      <p className="ml-3 text-sm italic font-light text-yellow-600">
                        and reply to all enquiries instantly
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Entitled to Add Ons
                      </p>
                      <p className="ml-3 text-sm italic font-light text-yellow-600">
                        First come first serve
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Plan switch */}
                <div>
                  <div className="flex items-center justify-center mt-18 space-x-4 border-t p-5">
                    <p className="font-medium text-sm">Bill Monthly</p>
                    <Switch checked={annually} onCheckedChange={setAnnually} />
                    <p className="text-sm font-medium flex flex-col">
                      Bill Annually{" "}
                      <span className="font-light">(20% off)</span>
                    </p>
                  </div>
                  {annually ? (
                    <p className="text-sm font-light text-center text-gray-400 mt-3">
                      All yearly plans are non-refundable.
                    </p>
                  ) : (
                    <p className="text-sm font-light text-center text-gray-400 mt-3">
                      Monthly plans can be cancelled at any time.
                    </p>
                  )}
                </div>

                <Button disabled={hasSub} className="w-full">
                  <Link href={checkoutLink}>Upgrade Now</Link>
                </Button>
              </section>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="addon">
          <div className="flex flex-row justify-center">
            <p className="text-sm font-normal text-gray-600">
              All Supervendors are eligible for this Featured/Top vendor add on-
              on a first come first serve basis.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center px-20 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6"></div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-4xl font-medium tracking-tight">
                    $300
                  </span>
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">
                      Featured Vendor add on
                    </h2>
                  </div>
                  <p className="text-sm text-gray-400">3 slots per category</p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="ml-3 text-base font-medium">
                        Top 4 Listings for the month
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        On respective category page
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Consolidated Social Media Post
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        (eg: Sarang Sayang Featured Bridals of the month)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Featured in monthly Sarang Sayang e-mail newsletter
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => {
                    sendFeatVendForm({
                      name: vendorAsVendor.name,
                      cat: vendorAsVendor.category,
                      //@ts-ignore
                      email: vendorAsVendor.venduserid.email,
                    });
                    toast.success(
                      "Thanks for your interest! We will reach out soon."
                    );
                  }}
                >
                  Upgrade
                </Button>
              </section>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-6"></div>
              <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                {/* Price */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-4xl font-medium tracking-tight">
                    $500
                  </span>
                </div>

                {/* Name and DESC */}
                <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                  <div className="flex items-center gap-1">
                    <h2 className="text-2xl font-normal">Top Vendor add on</h2>
                  </div>
                  <p className="text-sm text-gray-400">1 slot per category</p>
                </div>

                <ul className="flex-1 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Top Listing of the month
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        On respective category page
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium text-balance">
                        Cover of Consolidated Social Media Post
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        (eg: Sarang Sayang Featured Bridals of the month)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Featured in monthly Sarang Sayang e-mail newsletter
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">Featured on</p>
                      <p className="ml-3 text-base font-medium">
                        Sarang Sayang Homepage
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Easy access and maximum exposure to our users
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="ml-3 text-base font-medium">
                        Category Cover Photo
                      </p>
                      <p className="ml-3 text-sm italic font-light">
                        Vendor Photo will be used as the cover photo for the
                        “discover” tab.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => {
                    sendTopVendForm({
                      name: vendorAsVendor.name,
                      cat: vendorAsVendor.category,
                      //@ts-ignore
                      email: vendorAsVendor.venduserid.email,
                    });
                    toast.success(
                      "Thanks for your interest! We will reach out soon."
                    );
                  }}
                >
                  Upgrade
                </Button>
              </section>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default PriceRange;
