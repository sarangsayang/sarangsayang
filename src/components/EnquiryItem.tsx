"use client";

import { Chat } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { trpc } from "@/trpc/client";
import { Label } from "./ui/label";

interface ChatItemProps {
  chat: Chat;
}

const EnquiryItem = ({ chat }: ChatItemProps) => {
  const unread = trpc.getUnread.useQuery({
    chatId: chat.id,
  });

  const results = unread.data;
  return (
    <div className="space-y-3 py-2">
      <div className="w-full flex flex-row items-end justify-between">
        <div>
          <Label>Email</Label>
          <Skeleton className="w-[200px] h-[30px]" />
        </div>
        <div>
          <Button disabled className="bg-slate-500">
            <MessageCircle className="mr-2 h-4 w-4" />{" "}
            {results + " unread messages"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryItem;
