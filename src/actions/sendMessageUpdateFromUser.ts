"use server";
import MessageUpdateFromUserEmail from "@/components/emails/vendors/MessageUpdateFromUser";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  vendorEmail: string;
  userName: string;
  vendorName: string;
}

export const sendMessageUpdateFromUser = async ({
  vendorEmail,
  userName,
  vendorName,
}: Data) => {
  console.log("Atleast they tried");
  resend.emails.send({
    from: "Sarang Sayang <admin@sarangsayang.com>",
    to: vendorEmail,
    subject: `Message From ${userName} on Sarang Sayang!`,
    react: React.createElement(MessageUpdateFromUserEmail, {
      userName: userName,
      vendorName: vendorName,
    }),
  });
};