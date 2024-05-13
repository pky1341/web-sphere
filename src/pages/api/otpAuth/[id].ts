import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const otpSession = await prisma.otpDetails.findUnique({
        where: {
          id: id as string,
        },
      });

      if (otpSession) {
        res.status(200).json({
          otp: otpSession.otp,
          expiryAt: otpSession.expiryAt.toISOString(),
        });
      } else {
        res.status(404).json({ error: "OTP session not found" });
      }
    } catch (error) {
      console.error("Error fetching OTP session:", error);
      res.status(500).json({ error: "Failed to fetch OTP session" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
