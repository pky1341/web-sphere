import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { sendVerificationRequest } from '@/utils/emailReq';



const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER_HOST,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp:{label:"OTP",type:"tesxt"}
      },
      async authorize(credentials, req) {
        const { email, password,otp } = credentials as {
          email: string;
          password: string;
          otp:string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || user.password !== password) {
          return null;
        }
        const otpSession=await prisma.otpDetails.findFirst({
          where:{
            email,
            otp:Number(otp),
            expiryAt:{gt:new Date()}
          },
        });
        if (!otpSession) {
          return null;
        }
        return { ...user, id: user.id.toString() };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(options);
