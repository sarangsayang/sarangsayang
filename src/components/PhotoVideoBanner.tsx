"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { trpc } from "@/trpc/client";

const PhotoVideoBanner = () => {
  const addClick = trpc.addClick.useMutation();

  return (
    <div
      className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg p-5"
      onClick={() => {
        addClick.mutate({
          vendorId: "65d0103e1ee37d026fce4b94",
        });
      }}
    >
      <MaxWidthWrapper>
        <Link href={"/vendor/65d0103e1ee37d026fce4b94"} target="_blank">
          <div className="bg-[url('/aefWeddings.png')] bg-cover bg-center relative h-[270px] w-full rounded-3xl cursor-pointer shadow-lg">
            <div className="absolute bottom-0 left-0 p-5 bg-white/75 rounded-2xl m-5">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-lg font-bold">aef.weddings</h1>
                <BadgeCheck
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-yellow-400"
                />
              </div>
              <p className="text-slate-500 text-sm">
                Quote &quot;SARANGSAYANG&quot; and get 10% off all packages!
              </p>
            </div>
          </div>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default PhotoVideoBanner;
