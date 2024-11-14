"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

const Transition = () => {
  const transition = trpc.transition.useMutation();

  function handleClick1() {
    transition.mutate();
  }

  return (
    <MaxWidthWrapper className="w-full h-full flex justify-center items-center justify-items-center py-10">
      <div className="flex-row justify-center items-center justify-items-center">
        <h1>REMOVE DUPLICATED LIKES</h1>
        <Button onClick={handleClick1}>Initiate</Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Transition;
