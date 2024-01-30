"use client";

import { Itinerary } from "@/payload-types";
import { trpc } from "@/trpc/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ItineraryPullCont from "./ItineraryPullCont";

interface ItineraryPullProps {
  planId: string;
}

const ItineraryPull = ({ planId }: ItineraryPullProps) => {
  const itinerary = trpc.getItinerary.useQuery({
    planId: planId,
  });

  const results = itinerary.data?.docs as Itinerary[];

  return (
    <>
      {results ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Date and Time</TableHead>
              <TableHead className="w-[270px]">Event</TableHead>
              <TableHead className="w-[270px]">Location</TableHead>
              <TableHead className="w-[350px]">Details</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((itinerary) => (
              <ItineraryPullCont key={itinerary.id} itinerary={itinerary} />
            ))}
          </TableBody>
        </Table>
      ) : null}
    </>
  );
};

export default ItineraryPull;
