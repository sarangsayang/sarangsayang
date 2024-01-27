"use client";

import { trpc } from "@/trpc/client";
import { Loader, PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import ItineraryPull from "./ItineraryPull";
import Image from "next/image";
import WantToSync from "./WantToSync";

interface ItineraryContProps {
  userId: string;
}

const ItineraryCont = ({ userId }: ItineraryContProps) => {
  const [time, setTime] = useState(0);
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [involved, setInvolved] = useState("");
  const [details, setDetails] = useState("");

  const handleTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.valueAsNumber);
  };

  const handleEvent = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEvent(event.target.value);
  };

  const handleLocation = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLocation(event.target.value);
  };

  const handleInvolved = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInvolved(event.target.value);
  };

  const handleDetails = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDetails(event.target.value);
  };

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs;

  const add = trpc.addItinerary.useMutation();

  return (
    <>
      {identifiedPlan && identifiedPlan.length === 1 ? (
        <>
          <div className="w-full flex flex-row justify-center items-center p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
            <Image
              src="https://i.giphy.com/media/06rUB8SOzXgFzbVmF2/giphy.gif"
              alt="ItsTime"
              width={480}
              height={480}
              className="px-4"
            />
            <div className="grid grid-cols-6 gap-5 w-full py-6 px-6">
              <div className="col-span-2 flex items-end gap-2">
                <div className="w-full">
                  <Label>Time (24hr Format)</Label>
                  <Input
                    type="number"
                    step="15"
                    placeholder="Enter time in 24hr format"
                    value={time}
                    onChange={(e) => handleTime(e)}
                  />
                </div>
                <p className="text-slate-500 pb-2">hrs</p>
              </div>
              <div className="col-span-2">
                <Label>Event</Label>
                <Input
                  placeholder="Enter event"
                  value={event}
                  onChange={(e) => handleEvent(e)}
                />
              </div>
              <div className="col-span-2">
                <Label>Location</Label>
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => handleLocation(e)}
                />
              </div>
              <div className="col-span-3">
                <Label>Who&#39;s Involved</Label>
                <Input
                  placeholder="Enter people involved"
                  value={involved}
                  onChange={(e) => handleInvolved(e)}
                />
              </div>
              <div className="col-span-3">
                <Label>Details</Label>
                <Input
                  placeholder="Enter details"
                  value={details}
                  onChange={(e) => handleDetails(e)}
                />
              </div>
            </div>
            <div className="p-10">
              <PlusCircle
                onClick={() => {
                  add.mutate({
                    planId: identifiedPlan[0].id,
                    time: time,
                    location: location,
                    event: event,
                    involved: involved,
                    details: details,
                  });
                  setTime(0);
                  setLocation("");
                  setEvent("");
                  setInvolved("");
                  setDetails("");
                }}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </div>
          </div>
          <ItineraryPull planId={identifiedPlan[0].id} />
        </>
      ) : identifiedPlan ? (
        <WantToSync plans={identifiedPlan} userId={userId} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default ItineraryCont;
