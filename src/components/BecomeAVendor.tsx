"use client";

import { sendDSVEmail } from "@/actions/sendDSVEmail";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "@/app/data/data";
import { Button } from "./ui/button";

const BecomeAVendor = () => {
  const [dsvData, setDSVData] = useState({
    name: "",
    email: "",
    category: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm font-light text-slate-600 hover:text-slate-800 hover:underline cursor-pointer">
          Become a vendor
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Don&apos;t see your vendor?</DialogTitle>
          <DialogDescription className="text-balance">
            It&#39;s free! Be a part of the Sarang Sayang family. Submit your
            vendor info and our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        <form
          action={async (dsvData) => {
            await sendDSVEmail(dsvData);
          }}
        >
          <div className="flex items-center space-x-2 pb-4">
            <div className="grid flex-1 gap-3">
              <div>
                <Label htmlFor="name">Vendor Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={dsvData.name}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label>Vendor Category</Label>
                <Select
                  name="category"
                  value={dsvData.category}
                  onValueChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      category: e,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.label} key={category.value}>
                        <div className="flex items-center gap-3">
                          <p className="text-slate-500 font-light">
                            {category.icon}
                          </p>
                          <p className="font-light">{category.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Vendor Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={dsvData.email}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-6">
            <DialogClose asChild>
              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeAVendor;
