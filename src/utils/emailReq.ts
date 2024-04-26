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

export const sendVerificationRequest = async ({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}) => {
  console.log(`Sending verification email to ${identifier}`);
  await emailTransport.sendMail({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Sign Up Verification",
    html: `<p>Please click the link to verify your email: <a href="${url}">${url}</a></p>`,
  });
};
