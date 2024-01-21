"use client";

import { formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import { useState } from "react";

interface BudgetProps {
  userId: string;
}

const BudgetCont = ({ userId }: BudgetProps) => {
  const [actual, setActual] = useState(30765);
  const [planned, setPlanned] = useState(40000);
  const [paid, setPaid] = useState(1550);

  const totalDifference = (actual / planned) * 100;
  const paidPerc = (paid / actual) * 100;

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs[0];

  return (
    <>
      {identifiedPlan ? (
        <>
          <div className="w-full flex justify-center gap-10">
            <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <h1 className="text-xl">{formatPrice(actual)}</h1>
                {actual === planned ? null : null}
                {actual != 0 && planned != 0 && actual > planned ? (
                  <p className="text-red-500 text-sm">
                    {totalDifference.toFixed(2)}
                    <span>&#37;</span> of Planned
                  </p>
                ) : null}
                {actual != 0 && planned != 0 && actual < planned ? (
                  <p className="text-green-500 text-sm">
                    {totalDifference.toFixed(2)}
                    <span>&#37;</span> of Planned
                  </p>
                ) : null}
              </div>
              <p className="italic text-slate-400">Actual Cost</p>
            </div>
            <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <h1 className="text-xl">{formatPrice(planned)}</h1>
              </div>
              <p className="italic text-slate-400">Planned Cost</p>
            </div>
            <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <h1 className="text-xl">{formatPrice(paid)}</h1>
                {paid != 0 ? (
                  <p className="text-yellow-500 text-sm">
                    {paidPerc.toFixed(2)}
                    <span>&#37;</span> Paid
                  </p>
                ) : null}
              </div>
              <p className="italic text-slate-400">Amount Paid</p>
            </div>
          </div>
        </>
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default BudgetCont;
