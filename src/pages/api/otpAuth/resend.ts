import { NextApiRequest, NextApiResponse } from "next";
import { sendVerificationRequest } from "@/utils/emailReq";
import rateLimt from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

const limiter = rateLimt({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many requests from this IP, please try again after 15 minutes",
  statusCode: 429,
  keyGenerator: function (req) {
    return req.ip;
  },
});

const otpSessions = new Map<
  string,
  { email: string; otp: number; expiryAt: Date }
>();
const prisma=new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await limiter(req, res, async () => {
      const { email } = req.body;
      const existingSession = [...otpSessions.values()].find(
        (session) => session.email === email
      );
      if (existingSession && existingSession.expiryAt.getTime() > Date.now()) {
        return res
          .status(429)
          .json({ error: "You must wait before requesting a new OTP" });
      }
      const otpSessionId=await sendVerificationRequest(String(email));

      const otpSession=await prisma.otpDetails.findUnique({
        where:{
          id:otpSessionId
        }
      });
      if (otpSession) {
        otpSessions.set(otpSessionId,{email,otp:Number(otpSession.otp),expiryAt:otpSession.expiryAt});
      }
      return res.status(200).json({otpSessionId});
    });
  }else{
    res.status(405).json({error:'method not allowed'});
  }
}
