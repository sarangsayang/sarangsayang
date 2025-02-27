"use server";
import UserOpenChat from "@/components/emails/vendors/UserOpenChat";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  vendorEmail: string;
  userName: string;
  vendorName: string;
}

export const sendOpenChat = async ({
  vendorEmail,
  userName,
  vendorName,
}: Data) => {
  resend.emails.send({
    from: "Sarang Sayang <admin@sarangsayang.com>",
    to: [`${vendorEmail}`],
    subject: `${userName} Clicked Chat Now with you on Sarang Sayang`,
    react: React.createElement(UserOpenChat, {
      userName: userName,
      vendorName: vendorName,
    }),
  });
};
