import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { trpc } from "@/trpc/client";
import ItineraryPullCont from "./ItineraryPullCont";
import { Loader2 } from "lucide-react";
import { Itinerary } from "@/payload-types";

interface ItineraryTableProps {
  title: string;
  planId: string;
}

const ItineraryTable = ({ title, planId }: ItineraryTableProps) => {
  const itinerary = trpc.getItineraryByDate.useQuery({
    planId: planId,
    date: title,
  });

  const results = itinerary.data?.docs as Itinerary[];

  return (
    <div className="md:py-10">
      <h1 className="font-bold">{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[140px]">Time</TableHead>
            <TableHead className="md:w-[270px]">Event</TableHead>
            <TableHead className="md:w-[270px]">Location</TableHead>
            <TableHead className="md:w-[350px]">Details</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results ? (
            results.map((itinerary) => (
              <ItineraryPullCont itinerary={itinerary} key={itinerary.id} />
            ))
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItineraryTable;
