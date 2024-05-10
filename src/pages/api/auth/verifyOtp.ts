import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { otp } = req.body;
        if (otp === storeOtp) {
          res.status(200).json({ message: "OTP validated successfully" });
          storeOtp = null;
        } else {
          res.status(400).json({ message: "Invalid OTP" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to validate" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
