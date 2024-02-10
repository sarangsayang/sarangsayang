import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { sendContactUs } from "@/actions/sendContactUs";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-muted-foreground cursor-pointer hover:underline">
          Contact Us
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Something you wanna tell us?</DialogTitle>
        </DialogHeader>
        <form
          action={async (contactData) => {
            await sendContactUs(contactData);
          }}
        >
          <div className="flex items-center space-x-2 pb-4">
            <div className="grid flex-1 gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={contactData.name}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      message: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="submit" variant="secondary" className="w-full">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUs;
