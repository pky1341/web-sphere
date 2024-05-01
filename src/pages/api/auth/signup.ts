import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { sendVerificationRequest } from "@/utils/emailReq";
import { signIn } from "next-auth/react";
import { resolve } from "path";
import { rejects } from "assert";
import otpGenerator from "otp-generator";

interface RequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface SendVerificationRequestParams {
  identifier: string;
  otp: number; 
}
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const form = new IncomingForm();
        const fields = await new Promise<{ fields: any; files: any }>(
          (resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          }
        );
        const { FirstName, LastName, Email, Password, ConfirmPassword } =
          fields.fields;
        const passwdStr = String(Password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwdStr, salt);
        const existingUser = await prisma.user.findUnique({
          where: { email: String(Email) },
        });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "Email already exists. Please log in." });
        }
        const user = await prisma.user.create({
          data: {
            firstName: String(FirstName),
            lastName: String(LastName),
            email: String(Email),
            password: hashedPassword,
          },
        });
        const otp = otpGenerator.generate(4, {
          digits: true,
          upperCase: false,
          specialChars: false,
          alphabets: false,
        } as any);
        await sendVerificationRequest({
          identifier: String(Email),
          otp: Number(otp),
        }:SendVerificationRequestParams);
        res.status(200).json({ message: "User created successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
      }
      break;
    default:
      res.status(405).json({ error: "method not allowed" });
      break;
  }
}
