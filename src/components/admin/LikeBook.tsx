"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { trpc } from "@/trpc/client";
import { Vendor } from "@/payload-types";

const LikeBook = () => {
  const {
    data: getAllVendorLikes,
    isLoading,
    status,
  } = trpc.getAllVendorLikes.useQuery({});

  return (
    <MaxWidthWrapper className="border-2 shadow-md p-10">
      <h2 className="text-xl font-bold tracking-tight">Top 10 Vendors</h2>
      {!isLoading ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[200px]">Claim Status</TableHead>
                <TableHead className="text-right">Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllVendorLikes?.map((vendor: Vendor, i) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-semibold">{vendor.name}</TableCell>
                  <TableCell className="capitalize">
                    {vendor.category}
                  </TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    {vendor.venduserid.id === "658fdba885aa3665781e567a" ? (
                      <p className="p-5 bg-amber-200 rounded-md shadow-md w-full text-slate-500">
                        UnClaimed
                      </p>
                    ) : (
                      <p className="p-5 bg-sky-200 rounded-md shadow-md w-full text-slate-500">
                        Claimed
                      </p>
                    )}
                  </TableCell>
                  {/* @ts-ignore */}
                  <TableCell className="text-right">{vendor.likes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Table>
          <TableCaption className="animate-bounce">{status} la..</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Claim Status</TableHead>
              <TableHead className="text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      )}
    </MaxWidthWrapper>
  );
};

export default LikeBook;