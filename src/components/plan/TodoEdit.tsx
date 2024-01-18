"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Delete } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "@radix-ui/react-checkbox";
import { format } from "date-fns";
import { trpc } from "@/trpc/client";

interface TodoEditProps {
  id: string;
  pTodo: string;
  pDate: string;
  pChecked: boolean;
}

const TodoEdit = ({ id, pTodo, pDate, pChecked }: TodoEditProps) => {
  const [todo, setTodo] = useState(pTodo);
  const [date, setDate] = useState<Date>(new Date(pDate));
  const [checked, setChecked] = useState(pChecked);

  const edit = trpc.editTodo.useMutation();

  const editTodo = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTodo(event.target.value);
    edit.mutate({
      planId: id,
      todo: todo,
    });
  };

  const editDate = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setDate(new Date(formattedDate));

    edit.mutate({
      planId: id,
      date: formattedDate,
    });
  };

  const editChecked = (boolean: boolean) => {
    if (boolean === true) {
      setChecked(false);
    } else if (boolean === false) {
      setChecked(true);
    }

    edit.mutate({
      planId: id,
      check: checked,
    });
  };

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-6 px-4">
        <Input value={todo} onChange={(e) => editTodo(e)} />
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal text-muted-foreground"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              //@ts-ignore
              onSelect={editDate}
              required
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full flex justify-around items-center px-4">
        <Delete className="text-red-400 w-5 h-5" />
        <Checkbox
          checked={checked}
          onCheckedChange={(event) => editChecked(event as boolean)}
        />
      </div>
    </div>
  );
};

export default TodoEdit;
