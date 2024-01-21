"use client";

import { trpc } from "@/trpc/client";
import { Todo } from "@/payload-types";
import TodoEdit from "./TodoEdit";
import TodoReq from "./TodoReq";

interface TodoPullProp {
  planId: string;
}

const TodoPull = ({ planId }: TodoPullProp) => {
  const results = trpc.getTodo.useQuery({
    planId: planId,
  });

  return (
    <div className="w-full grid grid-col-1 gap-4">
      <TodoReq id={planId} Todo={"Engagement Date"} />
      <TodoReq id={planId} Todo={"Get Engagement Rings"} />
      <TodoReq id={planId} Todo={"Get Wedding Rings"} />
      <TodoReq id={planId} Todo={"Set Duit Hantaran"} />
      <TodoReq id={planId} Todo={"Get Honeymoon Package"} />
      <TodoReq id={planId} Todo={"Nikah Date"} />
      <TodoReq id={planId} Todo={"Sanding Date"} />
      {results.data
        ? results.data.docs.map((todo: Todo) =>
            todo.todo !== "Engagement Date" &&
            todo.todo !== "Get Engagement Rings" &&
            todo.todo !== "Get Wedding Rings" &&
            todo.todo !== "Set Duit Hantaran" &&
            todo.todo !== "Get Honeymoon Package" &&
            todo.todo !== "Nikah Date" &&
            todo.todo !== "Sanding Date" ? (
              <TodoEdit
                key={todo.id}
                todoId={todo.id}
                //@ts-ignore
                id={planId}
                pTodo={todo.todo}
                pDate={todo.date}
                pChecked={todo.done}
                pRemarks={todo.remarks || ""}
              />
            ) : null
          )
        : null}
    </div>
  );
};

export default TodoPull;
