import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { generateNumericOTP } from '@/utils/generateOtp';
import {v4 as uuidv4} from 'uuid';


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

export const sendVerificationRequest = async (email: string) => {
  let store:{[key:string]:number}= {};
  let otp=Number(generateNumericOTP(4));
  const otpSessionId=uuidv4();
  // sessionStorage.setItem(otpSessionId,String(otp));
  store[otpSessionId]=otp;
  await emailTransport.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your Verification Code",
    html: `<p>Dear User,</p>
           <p>Thank you for choosing our service. Your verification code is: <strong>${otp}</strong></p>
           <p>Please enter this code in the app to verify your email address.</p>
           <p>Thank you for your cooperation.</p>
           <p>Best regards,</p>
           <p>The Team</p>`,
  });
};
