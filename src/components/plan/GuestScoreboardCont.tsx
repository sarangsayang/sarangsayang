"use client";

import { trpc } from "@/trpc/client";
import GuestScoreboard from "./GuestScoreboard";

interface GuestScoreboardProps {
  planId: string;
}

const GuestScoreboardCont = ({ planId }: GuestScoreboardProps) => {
  const budgets = trpc.getGuests.useQuery({
    planId: planId,
  });

  const results = budgets.data?.docs;

  return (
    <>
      {results ? (
        <GuestScoreboard guests={results} />
      ) : (
        <div className="w-full flex justify-center gap-10 pb-6">
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">0</h1>
            </div>
            <p className="italic text-slate-400">Total Pax Invited</p>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">0</h1>
            </div>
            <p className="italic text-slate-400">Total Pax Attending</p>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">0</h1>
            </div>
            <p className="italic text-slate-400">Total Invitations</p>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">0</h1>
            </div>
            <p className="italic text-slate-400">Invitations Sent</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestScoreboardCont;
