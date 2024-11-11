"use client";

import VendorChat from "@/components/chat/VendorChat";
import { Button } from "@/components/ui/button";
import { User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import React from "react";

interface TVLChatProps {
  user: User;
  vendor: Vendor;
}

const TVLChat = ({ user, vendor }: TVLChatProps) => {
  const chat = trpc.checkChat.useQuery({
    userId: user.id,
    vendorId: vendor.id,
  });

  const createChat = trpc.createChat.useMutation();

  if (chat.isFetched && chat.data)
    return (
      <div>
        {/* <VendorChat chat={chat.data[0]} user={user} /> */}
        YES
      </div>
    );

  if (chat.isFetched && !chat.data)
    return (
      <Button
        className="w-[200px]"
        variant={"secondary"}
        onClick={() =>
          createChat.mutate({
            userId: user.id,
            vendorId: vendor.id,
          })
        }
      >
        Start Chat
      </Button>
    );

  if (chat.isLoading)
    return (
      <Button className="w-[200px]" variant={"outline"} disabled>
        <p className="flex justify-center items-center gap-3">
          Loading{" "}
          <span>
            <Loader2 size={10} className="animate-spin" />
          </span>
        </p>
      </Button>
    );
};

export default TVLChat;
