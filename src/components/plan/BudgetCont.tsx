"use client";

import { trpc } from "@/trpc/client";
import { Loader, PlusCircle } from "lucide-react";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import BudgetPull from "./BudgetPull";
import Image from "next/image";
import BudgetScoreboardCont from "./BudgetScoreboardCont";
import WantToSync from "./WantToSync";

interface BudgetProps {
  userId: string;
}

const BudgetCont = ({ userId }: BudgetProps) => {
  const [bfor, setFor] = useState("");
  const [bcat, setCat] = useState("");
  const [bdetails, setDetails] = useState("");
  const [plannedCost, setPlannedCost] = useState(0);
  const [actualCost, setActualCost] = useState(0);

  const handleDetails = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDetails(event.target.value);
  };

  const handlePlanned = (event: ChangeEvent<HTMLInputElement>) => {
    setPlannedCost(event.target.valueAsNumber);
  };

  const handleActual = (event: ChangeEvent<HTMLInputElement>) => {
    setActualCost(event.target.valueAsNumber);
  };

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const add = trpc.addBudget.useMutation();

  const identifiedPlan = plan.data?.docs;

  return (
    <>
      {identifiedPlan && identifiedPlan.length === 1 ? (
        <>
          <BudgetScoreboardCont planId={identifiedPlan[0].id} />
          <div className="w-full flex flex-row justify-center items-center p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
            <Image
              src="https://i.giphy.com/media/26nfp8HGGHLPGY2KQ/giphy.gif"
              alt="CountingBudget"
              width={480}
              height={360}
              className="px-4"
            />
            <div className="grid grid-cols-4 gap-5 w-full py-6 px-6">
              <div className="col-span-4">
                <Input
                  placeholder="Add details"
                  value={bdetails}
                  onChange={(e) => handleDetails(e)}
                />
              </div>

              <div className="col-span-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Category</Label>
                  <Select value={bfor} onValueChange={setFor}>
                    <SelectTrigger>
                      <SelectValue placeholder="For" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>People</SelectLabel>
                        <SelectItem value="Bride">Bride</SelectItem>
                        <SelectItem value="Groom">Groom</SelectItem>
                        <SelectItem value="Bridesmaids">Bridesmaids</SelectItem>
                        <SelectItem value="Groomsmen">Groomsmen</SelectItem>
                        <SelectItem value="Bride's Family">
                          Bride&#39;s Family
                        </SelectItem>
                        <SelectItem value="Groom's Family">
                          Groom&#39;s Family
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Event</SelectLabel>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Engagement">Engagement</SelectItem>
                        <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                        <SelectItem value="Photoshoot">Photoshoot</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Misc</SelectLabel>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Planned Cost</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Button disabled className="bg-slate-600">
                      $
                    </Button>
                    <Input
                      className="w-full"
                      type="number"
                      value={plannedCost}
                      onChange={(e) => handlePlanned(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Actual Cost</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Button disabled className="bg-slate-600">
                      $
                    </Button>
                    <Input
                      className="w-full"
                      type="number"
                      value={actualCost}
                      onChange={(e) => handleActual(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-10">
              <PlusCircle
                onClick={() => {
                  add.mutate({
                    planId: identifiedPlan[0].id,
                    for: bfor,
                    cat: "-",
                    details: bdetails,
                    plannedCost: plannedCost,
                    actualCost: actualCost,
                  });
                  setFor("");
                  setCat("");
                  setDetails("");
                  setPlannedCost(0);
                  setActualCost(0);
                }}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </div>
          </div>
          <BudgetPull planId={identifiedPlan[0].id} />
        </>
      ) : identifiedPlan ? (
        <WantToSync plans={identifiedPlan} userId={userId} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default BudgetCont;
