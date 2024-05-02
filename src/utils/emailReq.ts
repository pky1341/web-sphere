import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { SendVerificationRequestParams } from "next-auth/providers/email";
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

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, otp } = params as unknown as {
    identifier: string;
    otp: number;
  };
  
  await emailTransport.sendMail({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Your Verification Code",
    html: `<p>Dear User,</p>
           <p>Thank you for choosing our service. Your verification code is: <strong>${otp}</strong></p>
           <p>Please enter this code in the app to verify your email address.</p>
           <p>Thank you for your cooperation.</p>
           <p>Best regards,</p>
           <p>The Team</p>`,
  });
};
