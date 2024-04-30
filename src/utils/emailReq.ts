import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const emailTransport = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendVerificationCode = async ({
  identifier,
  code,
}: {
  identifier: string;
  code: string;
}) => {
  console.log(`Sending verification code to ${identifier}`);
  await emailTransport.sendMail({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Your Verification Code",
    html: `<p>Dear User,</p>
           <p>Thank you for choosing our service. Your verification code is: <strong>${code}</strong></p>
           <p>Please enter this code in the app to verify your email address.</p>
           <p>Thank you for your cooperation.</p>
           <p>Best regards,</p>
           <p>The Team</p>`,
  });
};
