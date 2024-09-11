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
import { toast } from "./ui/use-toast";
import { trpc } from "@/trpc/client";

const BecomeAVendor = () => {
  const [dsvData, setDSVData] = useState({
    vendorName: "",
    category: "",
    name: "",
    contact: "",
    email: "",
  });

  const checkUser = trpc.checkUserExist.useQuery({
    email: dsvData.email,
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
                <Label htmlFor="name">
                  Vendor Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="vendorName"
                  name="vendorName"
                  value={dsvData.vendorName}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      vendorName: e.target.value,
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
                <Label htmlFor="name">
                  Name <span className="text-red-400">*</span>
                </Label>
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
                <Label htmlFor="contact">
                  Contact Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  value={dsvData.contact}
                  onChange={(e) => {
                    setDSVData({
                      ...dsvData,
                      contact: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Registered Sarang Sayang Email{" "}
                  <span className="text-red-400">*</span>
                </Label>
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
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              {checkUser.data &&
              checkUser.data.totalDocs === 1 &&
              dsvData.email != "" &&
              dsvData.contact != "" &&
              dsvData.name != "" &&
              dsvData.vendorName != "" ? (
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "We'll get right on it!",
                      description:
                        "Verifications and authentications can take up to 1-2 working days.",
                    })
                  }
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled
                >
                  Submit
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeAVendor;
