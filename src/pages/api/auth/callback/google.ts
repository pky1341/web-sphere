import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession({ req, res, strategy: "jwt" });
    if (session) {
      res.redirect("/");
    } else {
      res.redirect("/auth/signin");
    }
  }
}
