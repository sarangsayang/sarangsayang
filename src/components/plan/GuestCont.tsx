"use client";

import { trpc } from "@/trpc/client";
import { Loader, PlusCircle } from "lucide-react";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import Image from "next/image";
import GuestScoreboardCont from "./GuestScoreboardCont";
import GuestPull from "./GuestPull";

interface GuestContProps {
  userId: string;
}

const GuestCont = ({ userId }: GuestContProps) => {
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const [pax, setPax] = useState(1);

  const handleName = (event: { target: { value: SetStateAction<string> } }) => {
    setName(event.target.value);
  };

  const handlePax = (event: ChangeEvent<HTMLInputElement>) => {
    setPax(event.target.valueAsNumber);
  };

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const add = trpc.addGuest.useMutation();

  const identifiedPlan = plan.data?.docs[0];
  return (
    <>
      {identifiedPlan ? (
        <>
          <GuestScoreboardCont planId={identifiedPlan.id} />
          <div className="w-full flex flex-row justify-center items-center p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
            <Image
              src="https://i.giphy.com/media/3ohjUMMndeqppOPwsg/giphy.gif"
              alt="CountingBudget"
              width={480}
              height={360}
              className="px-4"
            />
            <div className="grid grid-cols-4 gap-5 w-full py-6 px-6">
              <div>
                <Label>Group</Label>
                <Select value={group} onValueChange={setGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bride's Family">
                      Bride&#39;s Family
                    </SelectItem>
                    <SelectItem value="Groom's Family">
                      Groom&#39;s Family
                    </SelectItem>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Friends">Friends</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Name</Label>
                <Input
                  placeholder="Person's Name or Group's Name"
                  value={name}
                  onChange={(e) => handleName(e)}
                />
              </div>
              <div>
                <Label>Number of Pax</Label>
                <Input
                  type="number"
                  value={pax}
                  onChange={(e) => handlePax(e)}
                />
              </div>
            </div>
            <div className="p-10">
              <PlusCircle
                onClick={() => {
                  add.mutate({
                    planId: identifiedPlan.id,
                    group: group,
                    name: name,
                    pax: pax,
                  });
                  setGroup("");
                  setName("");
                  setPax(1);
                }}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </div>
          </div>
          <GuestPull planId={identifiedPlan.id} />
        </>
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default GuestCont;