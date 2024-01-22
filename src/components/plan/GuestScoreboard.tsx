"use client";

import { Guest } from "@/payload-types";

interface GuestScoreboardProps {
  guests: Guest[];
}

const GuestScoreboard = ({ guests }: GuestScoreboardProps) => {
  let invited = 0;
  let attending = 0;
  const invitations = guests.length;
  let sent = 0;

  for (let i = 0; i < guests.length; i++) {
    //@ts-ignore
    invited = invited + guests[i].pax;

    if (guests[i].attendance === "Attending") {
      attending++;
    }

    if (guests[i].sent === true) {
      sent++;
    }
  }

  return (
    <div className="w-full flex justify-center gap-10 pb-6">
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{invited}</h1>
        </div>
        <p className="italic text-slate-400">Total Pax Invited</p>
      </div>
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{attending}</h1>
        </div>
        <p className="italic text-slate-400">Total Pax Attending</p>
      </div>
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{invitations}</h1>
        </div>
        <p className="italic text-slate-400">Total Invitations</p>
      </div>
      <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{sent}</h1>
        </div>
        <p className="italic text-slate-400">Invitations Sent</p>
      </div>
    </div>
  );
};

export default GuestScoreboard;
