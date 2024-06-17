import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, NextAuthOptions } from "next-auth";

interface CredentialInput {
  site: string;
  username: string;
  password: string;
}

const options: NextAuthOptions = {
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 24 * 60 * 60,
  },
  providers: [
    {
      id: "credentials",
      type: "credentials",
      credentials: {
        site: process.env.NEXTAUTH_URL ?? "",
      },
    },
  ],
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, options);
    if (session) {
      res.redirect("/auth/signin");
    } else {
      res.redirect("/");
    }
  }
}
