"use client";

import { Chat, User } from "@/payload-types";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { trpc } from "@/trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import VendorChatInput from "./VendorChatInput";
import VendorMessages from "./VendorMessages";
import { cn } from "@/lib/utils";

interface DirectChatProps {
  chat: Chat;
  user: User;
}

const VendorChat = ({ chat, user }: DirectChatProps) => {
  const unread = trpc.getUnread.useQuery({
    chatId: chat.id,
  });

  const results = unread.data;

  const read = trpc.vendorRead.useMutation();
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className={cn(
            results && results > 0 ? "bg-red-500 hover:bg-red-400" : null
          )}
          onClick={() =>
            read.mutate({
              chatId: chat.id,
            })
          }
        >
          <MessageCircle className="mr-2 h-4 w-4" />{" "}
          {results + " Unread Messages"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="py-2">
        <MaxWidthWrapper>
          <DrawerHeader>
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="flex flex-col leading-tight">
                  <div className="text-xl flex items-center">
                    <h1 className="text-gray-700 mr-3 font-semibold flex items-center gap-2">
                      {user.email}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </DrawerHeader>
          <VendorMessages chat={chat} />
          <DrawerFooter className="h-full">
            <VendorChatInput user={user} chat={chat} />
          </DrawerFooter>
        </MaxWidthWrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default VendorChat;