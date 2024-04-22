import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
// import { string } from "zod";
const emailTransport = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  // auth: {
  //   user: process.env.EMAIL_SERVER_USER,
  //   pass: process.env.EMAIL_SERVER_PASSWORD,
  // },
});

const sendVerificationRequest = async ({
  identifier,
  url,
}: {
  identifier:string;
  url: string;
}) => {
  console.log(`Sending verification email to ${identifier}`);
  await emailTransport.sendMail({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Sign Up Verification",
    html: `<p>Please click the link to verify your email: <a href="${url}">${url}</a></p>`,
  });
};
const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || user.password !== password) {
          return null;
        }
        return { ...user, id: user.id.toString() };
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER_HOST,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
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
