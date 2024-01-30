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
import ItineraryTable from "./ItineraryTable";

interface ItineraryPullProps {
  planId: string;
}

const ItineraryPull = ({ planId }: ItineraryPullProps) => {
  const itinerary = trpc.getItinerary.useQuery({
    planId: planId,
  });

  const results = itinerary.data;

  return (
    <>
      {results ? (
        <div className="flex flex-col">
          {results.map((date) => (
            <ItineraryTable title={date} planId={planId} key={date} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ItineraryPull;
