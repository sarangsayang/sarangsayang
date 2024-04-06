"use client";

import { trpc } from "@/trpc/client";
import BudgetScoreboard from "./BudgetScoreboard";

interface BudgetScoreboardContProps {
  planId: string;
}

const BudgetScoreboardCont = ({ planId }: BudgetScoreboardContProps) => {
  const budgets = trpc.getBudget.useQuery({
    planId: planId,
  });

  const results = budgets.data?.docs;

  return (
    <>
      {results ? (
        <BudgetScoreboard budgets={results} />
      ) : (
        <div className="w-full flex flex-col items-center md:flex-row justify-center gap-10 pb-6">
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">$0</h1>
            </div>
            <p className="italic text-slate-400">Actual Cost</p>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">$0</h1>
            </div>
            <p className="italic text-slate-400">Planned Cost</p>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl">$0</h1>
            </div>
            <p className="italic text-slate-400">Amount Paid</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetScoreboardCont;
