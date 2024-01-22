"use client";

import { Budget } from "@/payload-types";
import { trpc } from "@/trpc/client";
import BudgetPullCont from "./BudgetPullCont";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface BudgetPullProps {
  planId: string;
}

const BudgetPull = ({ planId }: BudgetPullProps) => {
  const budgets = trpc.getBudget.useQuery({
    planId: planId,
  });

  const results = budgets.data?.docs as Budget[];

  const tables = [
    { title: "Bride" },
    { title: "Groom" },
    { title: "Bridesmaids" },
    { title: "Groomsmen" },
    { title: "Bride's Family" },
    { title: "Groom's Family" },
    { title: "Wedding" },
    { title: "Engagement" },
    { title: "Honeymoon" },
    { title: "Photoshoot" },
    { title: "Others" },
  ];

  return (
    <>
      {results ? (
        <div className="flex flex-col gap-20 py-6">
          {tables.map((category) => (
            <div key={category.title}>
              <h1 className="text-xl font-semibold tracking-tight mb-4">
                {category.title}
              </h1>
              <Table className="border-2 rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">For</TableHead>
                    <TableHead className="w-[150px]">Planned Cost</TableHead>
                    <TableHead className="w-[150px]">Actual Cost</TableHead>
                    <TableHead className="bg-slate-200 w-[150px]">
                      Difference
                    </TableHead>
                    <TableHead className="w-[150px]">Amount Paid</TableHead>
                    <TableHead className="bg-slate-200 w-[150px]">
                      Amount Outstanding
                    </TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((budget) => (
                    <>
                      {budget.for === category.title ? (
                        <BudgetPullCont budget={budget} key={budget.id} />
                      ) : null}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default BudgetPull;
