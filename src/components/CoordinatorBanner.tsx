"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { trpc } from "@/trpc/client";

const CoordinatorBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65a80cdedd4b315ab0a03267",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65a80cdedd4b315ab0a03267"} target="_blank">
          <div className="bg-[url('/rw.jpg')] bg-cover lg:bg-center bg-bottom relative h-[350px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-3 md:p-5 bg-white/75 rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-base md:text-lg font-bold">
                  Reverie Weddings
                </h1>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-yellow-400"
                />
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Check out Reverie Weddings vendor profile &amp; enquire for your
                wedding coordinator services today.
              </p>
              {/* <p className="text-slate-500 text-xs md:text-sm">
                Enquire now for Intimate Wedding Dais, Bridal Room Decorations
                and Gubahan Hantaran.
              </p> */}
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default CoordinatorBanner;