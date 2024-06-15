"use client";

import { trpc } from "@/trpc/client";
import { Loader, Plus } from "lucide-react";
import { Button } from "../ui/button";
import WantToSync from "./WantToSync";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BudgetVersion from "./BudgetVersion";
import BudgetNewButton from "./BudgetNewButton";
import BudgetOverview from "./BudgetOverview";

interface BudgetProps {
  userId: string;
}

const BudgetCont = ({ userId }: BudgetProps) => {
  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs;

  return (
    <>
      {identifiedPlan && identifiedPlan.length === 1 ? (
        <Tabs defaultValue="1">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>

            {identifiedPlan[0].totalVer ? (
              Array.from({ length: identifiedPlan[0].totalVer }).map((_, i) => (
                <TabsTrigger value={i + 1 + ""} key={i}>
                  Plan {i + 1}
                </TabsTrigger>
              ))
            ) : (
              <TabsTrigger value="1">Plan 1</TabsTrigger>
            )}
            <BudgetNewButton planId={identifiedPlan[0].id} />
          </TabsList>

          <TabsContent value="overview">
            {identifiedPlan[0].totalVer ? (
              <BudgetOverview
                planId={identifiedPlan[0].id}
                totalVer={identifiedPlan[0].totalVer}
              />
            ) : (
              <BudgetOverview planId={identifiedPlan[0].id} totalVer={1} />
            )}
          </TabsContent>

          {identifiedPlan[0].totalVer ? (
            Array.from({ length: identifiedPlan[0].totalVer }).map((_, i) => (
              <TabsContent value={i + 1 + ""} key={i}>
                <BudgetVersion planId={identifiedPlan[0].id} version={i + 1} />
              </TabsContent>
            ))
          ) : (
            <TabsContent value="1">
              <BudgetVersion planId={identifiedPlan[0].id} />
            </TabsContent>
          )}
        </Tabs>
      ) : identifiedPlan ? (
        <WantToSync plans={identifiedPlan} userId={userId} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default BudgetCont;
