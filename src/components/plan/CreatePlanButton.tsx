"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/client";
import { MoveRight } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

interface DetailsPullProps {
  userId: string;
}

const CreatePlanButton = ({ userId }: DetailsPullProps) => {
  const router = useRouter();
  const create = trpc.createPlan.useMutation();
  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs[0];

  function handleClick(userId: string) {
    create.mutate({
      userId: userId,
    });
    router.push("/plan/details");
  }

  return (
    <>
      {identifiedPlan ? (
        <Button variant="ghost" asChild>
          <Link href="/plan/details">
            Continue Planning{" "}
            <MoveRight className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
          </Link>
        </Button>
      ) : (
        <>
          <Button variant="ghost" onClick={() => handleClick(userId)}>
            Unlock Wedding Planner{" "}
            <MoveRight className="ml-1 h-4 w-4 transition-all text-muted-foreground" />
          </Button>
        </>
      )}
    </>
  );
};

export default CreatePlanButton;
