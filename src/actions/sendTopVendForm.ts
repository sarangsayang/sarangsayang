"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  name: string;
  email: string;
  cat: string;
}

export const sendTopVendForm = async ({ name, email, cat }: Data) => {
  resend.emails.send({
    from: "Admin <admin@sarangsayang.com>",
    to: ["admin@sarangsayang.com", "sales@sarangsayang.com"],
    subject: `${name} wants to be a top vendor`,
    html: `
            <div>
                <p>Vendor Name: ${name}</p>
                <p>Category: ${cat}</p>
                <p>Email: ${email}</p>
            </div>
        `,
  });
};