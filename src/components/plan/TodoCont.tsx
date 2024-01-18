"use client";

import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import TodoPull from "./TodoPull";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format, setDate } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { date } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChangeEvent, SetStateAction, useState } from "react";

interface DetailsContProps {
  userId: string;
}

const TodoCont = ({ userId }: DetailsContProps) => {
  const [date, setDate] = useState<Date>();
  const [todo, setTodo] = useState("");

  function handleTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value);
  }

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs[0];

  const addTodo = trpc.addTodo.useMutation();

  const submitTodo = () => {
    addTodo.mutate({
      planId: identifiedPlan.id as string,
      date: date?.toISOString() as string,
      todo: todo as string,
    });
    setDate(new Date());
    setTodo("");
  };

  return (
    <>
      {identifiedPlan ? (
        <MaxWidthWrapper>
          <div className="grid grid-cols-10 py-3 mb-5 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
            <div className="col-span-6 px-4">
              <Input
                placeholder="Add a new to do.."
                value={todo}
                onChange={(e) => handleTodoChange(e)}
              />
            </div>
            <div className="col-span-3 flex justify-center items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex justify-center items-center">
              <PlusCircle
                onClick={submitTodo}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </div>
          </div>
          <TodoPull planId={identifiedPlan.id} />
        </MaxWidthWrapper>
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default TodoCont;
