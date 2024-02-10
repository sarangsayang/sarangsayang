"use server";
import WelcomeUserEmail from "@/components/emails/users/WelcomeUserEmail";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  email: string;
}

export const sendWelcomeUserEmail = async ({ email }: Data) => {
  resend.emails.send({
    from: "Sarang Sayang <admin@sarangsayang.com>",
    to: [`${email}`],
    subject: `Welcome to Sarang Sayang!`,
    react: React.createElement(WelcomeUserEmail),
  });
};
