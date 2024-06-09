import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "PUT") {
        const { userEmail } = req.body;

        try {
            const response = await prisma.user.update({
                where: {
                    email: userEmail,
                },
                data:{
                    emailVerified:true,
                    isActive:true,
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error:'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: "method not allowed" });
    }
}