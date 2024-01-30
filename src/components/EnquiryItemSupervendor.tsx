"use client";

import { Chat, User } from "@/payload-types";
import React from "react";
import { Label } from "./ui/label";
import { trpc } from "@/trpc/client";
import VendorChat from "./chat/VendorChat";

interface ChatItemProps {
  chat: Chat;
  user: User;
}

const EnquiryItemSupervendor = ({ chat, user }: ChatItemProps) => {
  const unread = trpc.getUnread.useQuery({
    chatId: chat.id,
  });

  const results = unread.data;
  return (
    <>
      <div className="space-y-3 py-2">
        <div className="w-full flex flex-row items-end justify-between">
          <div>
            <Label>Email</Label>
            <h1>{user.email}</h1>
          </div>
          <div>
            <VendorChat chat={chat} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryItemSupervendor;
