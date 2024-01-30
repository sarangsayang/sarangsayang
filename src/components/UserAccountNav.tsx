"use client";

import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/trpc/client";
import { cn } from "@/lib/utils";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  const isVendor = user?.role === "vendor" || user?.role === "supervendor";

  const vendor = trpc.getVendorId.useQuery({
    userId: user.id,
  });

  const userRole = user?.role;
  //var userRole = 'supervendor'

  const bgVendor =
    userRole === "vendor"
      ? "bg-blue-200 hover:bg-blue-100"
      : "bg-yellow-200 hover:bg-yellow-100";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black text-balance">
              Welcome back, {user.name}!
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {isVendor && vendor.data ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/status" className={bgVendor}>
                Vendor Status
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard">Vendor Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={`/backstage/collections/vendors/${vendor.data.docs[0].id}`}
              >
                Update Vendor Profile
              </Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuItem asChild>
          <Link href="/faq">FAQ</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
