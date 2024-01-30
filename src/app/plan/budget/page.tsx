import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { Check, Loader } from "lucide-react";
import BudgetCont from "@/components/plan/BudgetCont";
import { Button } from "@/components/ui/button";

const Budget = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 py-10">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budget</h2>
          <p className="text-muted-foreground italic">
            This part can be a little a intimidating, 😅 So this form is here to
            help!
          </p>
          <div className="flex flex-row items-center gap-1 text-muted-foreground italic">
            <p>Make sure to click</p>
            <Button
              variant="outline"
              size="icon"
              className="bg-gradient-to-r from-amber-200 to-emerald-200 w-6 h-6"
            >
              <Check className="h-3" />
            </Button>
            <p>to save your details.</p>
          </div>
        </div>
      </div>
      {user ? (
        <BudgetCont userId={user?.id} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </MaxWidthWrapper>
  );
};

export default Budget;
