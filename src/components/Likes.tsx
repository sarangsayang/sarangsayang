"use client";

import { BookHeart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import LikeItem from "./LikeItem";
import { trpc } from "@/trpc/client";
import { User } from "@/payload-types";

const Likes = ({ user }: { user: User }) => {
  const getLikes = trpc.getLikes.useQuery({
    userId: user.id,
  });

  const likes = getLikes.data?.docs || [];

  const itemCount = likes.length;

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center">
        <BookHeart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-blue-400 group-hover:text-blue-500"
        />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-2 sm:max-w-lg bg-gradient-to-b from-cyan-100 bg-transparent">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Wishlist ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex h-full flex-col py-3">
              <ScrollArea>
                {/* @ts-ignore */}
                {likes.map((like) => (
                  <div className="px-6" key={like.id}>
                    <LikeItem
                      key={like.id}
                      vendorId={like.vendor.id}
                      likeId={like.id}
                    />
                  </div>
                ))}
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-6 px-4">
            <Image
              src="https://i.giphy.com/media/OSuaE6AknuRc7syZXp/giphy-downsized.gif"
              alt="NothingHere"
              width={480}
              height={360}
              className="px-4"
            />
            <div className="text-xl font-semibold">Your heart is empty..</div>
            <SheetTrigger asChild>
              <Link
                href="/vendors"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your likes!
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Likes;
