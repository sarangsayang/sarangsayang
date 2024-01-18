"use client";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, setDate } from "date-fns";
import { CalendarIcon, Delete } from "lucide-react";
import { date } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { trpc } from "@/trpc/client";
import { Todo } from "@/payload-types";
import TodoEdit from "./TodoEdit";

interface TodoPullProp {
  planId: string;
}

const TodoPull = ({ planId }: TodoPullProp) => {
  const results = trpc.getTodo.useQuery({
    planId: planId,
  });

  const identifiedResults = results?.data;

  return (
    <>
      {results.data
        ? results.data.docs.map((todo: Todo) => (
            <TodoEdit
              key={todo.id}
              id={todo.id}
              pTodo={todo.todo}
              pDate={todo.date}
              pChecked={todo.done ? todo.done : false}
            />
          ))
        : null}
    </>
  );
};

export default TodoPull;
