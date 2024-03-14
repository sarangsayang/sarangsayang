import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";

const AngelSearch = () => {
  return (
    <div className="w-full bg-sky-200 rounded-md shadow-md my-4 border-2 px-10 py-4 flex flex-col gap-4 items-center">
      <Label className="text-lg font-bold">
        I want <span className=" text-slate-600 font-semibold">a or an</span>..
      </Label>
      <div className="flex flex-row justify-center w-full sm:w-[75%]">
        <div className="w-full flex flex-row items-baseline gap-4 font-semibold p-3 bg-white shadow-md rounded-lg px-10">
          <Input className="border-2 select-auto shadow-sm" />
          <p className="">wedding!</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 text-slate-600 italic">
        <Link href={"#"} className="hover:underline">
          Intimate?
        </Link>
        <Link href={"#"} className="hover:underline">
          Grand?
        </Link>
        <Link href={"#"} className="hover:underline">
          Religous?
        </Link>
      </div>
    </div>
  );
};

export default AngelSearch;
