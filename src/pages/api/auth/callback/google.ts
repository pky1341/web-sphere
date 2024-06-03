import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await NextAuth({
    providers: [],
    callbacks: {
      async signIn({ account, profile}:{user:any,account:any,profile:any}) {
        if (account?.provider === "google" && profile?.email) {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                firstName: profile.name,
                email: profile.email,
                emailVerified: true,
                isActive: true,
              },
            });
          }
        }
        return true;
      },
    },
  })(req, res);
  // res.redirect("/");
}
