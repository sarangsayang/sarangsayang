"use client";

import { Guest } from "@/payload-types";
import { trpc } from "@/trpc/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import GuestPullCont from "./GuestPullCont";

interface GuestPullProps {
  planId: string;
}

const GuestPull = ({ planId }: GuestPullProps) => {
  const guests = trpc.getGuests.useQuery({
    planId: planId,
  });

  const results = guests.data?.docs as Guest[];

  const tables = [
    { title: "Bride's Family" },
    { title: "Groom's Family" },
    { title: "Work" },
    { title: "Friends" },
    { title: "Others" },
  ];

  return (
    <>
      {results ? (
        <>
          {tables.map((category) => (
            <div key={category.title}>
              <h1 className="text-xl font-semibold tracking-tight mb-4">
                {category.title}
              </h1>
              <Table className="border-2 rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Guest(s)</TableHead>
                    <TableHead className="w-[140px]">Number of Pax</TableHead>
                    <TableHead className="w-[300px]">Attendance</TableHead>
                    <TableHead className="w-[70px]">Invitation Sent</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((guest) => (
                    <>
                      {guest.group === category.title ? (
                        <GuestPullCont guest={guest} key={guest.id} />
                      ) : null}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default GuestPull;
