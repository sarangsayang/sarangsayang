"use client";

import { trpc } from "@/trpc/client";
import { Check } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import moment from "moment";

interface DetailsPullProps {
  plan: Plan;
}

interface Plan {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  rsvpDate: string;
  inviDate: string;
  venue: string;
  agent: string;
  bridal: string;
  photovideo: string;
  catering: string;
  decor: string;
  henna: string;
  mua: string;
  emcee: string;
  honeymoon: string;
  misc: string;
}

const DetailsPull = ({ plan }: DetailsPullProps) => {
  const updatePlan = trpc.updatePlan.useMutation();

  const [brideName, setBrideName] = useState(plan.brideName);
  const [groomName, setGroomName] = useState(plan.groomName);
  const [brideButton, setBrideButton] = useState("bg-emerald-200");
  const [groomButton, setGroomButton] = useState("bg-emerald-200");

  const [weddingDate, setWeddingDate] = useState<Date>(
    new Date(plan.weddingDate)
  );

  const duration = moment.duration(moment(weddingDate).diff(moment()));

  function handleBrideNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setBrideName(event.target.value);
    setBrideButton("bg-amber-200 ease-in-out duration-300");
  }

  function handleGroomNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setGroomName(event.target.value);
    setGroomButton("bg-amber-200 ease-in-out duration-300");
  }

  const handleWeddingDateChange = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setWeddingDate(new Date(formattedDate));

    updatePlan.mutate({
      id: plan.id,
      weddingDate: formattedDate,
    });
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-lg p-7 bg-gradient-to-r from-pink-100 to-cyan-100">
          <div className="p-6 flex flex-col justify-around">
            <Label htmlFor="brideName">Bride&apos;s Name</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                id="brideName"
                value={brideName}
                className="text-center"
                onChange={handleBrideNameChange}
              />
              <Button
                variant="outline"
                size="icon"
                className={brideButton}
                onClick={() => {
                  updatePlan.mutate({
                    id: plan.id,
                    brideName: brideName,
                  });
                  setBrideButton("bg-emerald-200 ease-in-out duration-300");
                }}
              >
                <Check className="h-4" />
              </Button>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-around">
            <Label htmlFor="groomName">Groom&apos;s Name</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                id="groomName"
                value={groomName}
                className="text-center"
                onChange={handleGroomNameChange}
              />
              <Button
                variant="outline"
                size="icon"
                className={groomButton}
                onClick={() => {
                  updatePlan.mutate({
                    id: plan.id,
                    groomName: groomName,
                  });
                  setGroomButton("bg-emerald-200 ease-in-out duration-300");
                }}
              >
                <Check className="h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full rounded-lg p-6 bg-gradient-to-r from-pink-100 to-cyan-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            <div className="flex flex-col items-center justify-center py-6">
              <h2 className="font-semibold">Wedding Date</h2>
              <div className="p-6 flex flex-col gap-1 items-center justify-center">
                <p>{JSON.stringify({ weddingDate })}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
                    <h1 className="font-semibold text-3xl">
                      {Math.floor(duration.asYears())}
                    </h1>
                    <p className="font-light text-sm">Years Left</p>
                  </div>
                  <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
                    <h1 className="font-semibold text-3xl">
                      {Math.floor(duration.asMonths()) % 12}
                    </h1>
                    <p className="font-light text-sm">Months Left</p>
                  </div>
                  <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
                    <h1 className="font-semibold text-3xl">
                      {Math.floor(duration.asDays()) % 30}
                    </h1>
                    <p className="font-light text-sm">Days Left</p>
                  </div>
                </div>
              </div>
              <Image
                src="https://i.giphy.com/media/gaJPlAdO21ns6Z2M3e/giphy-downsized.gif"
                alt="WeddingExcited"
                width={250}
                height={250}
                className="mt-3"
              />
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              <Calendar
                mode="single"
                required
                selected={weddingDate}
                // @ts-ignore
                onSelect={handleWeddingDateChange}
                className="rounded-md border my-3 bg-slate-50"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default DetailsPull;
