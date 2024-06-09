import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";


const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID||'',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||'',
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
      // tokenUrl: 'https://oauth2.googleapis.com/token',
      profileUrl: 'https://openidconnect.googleapis.com/v1/userinfo',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER_HOST,
      from: process.env.EMAIL_FROM,
    }),
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
        if (!email) {
          throw new Error("Email is required");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });
        
        if (!user) {
          throw new Error("Invalid email or password");
        }
        if (!user.emailVerified) {
          throw new Error("Email not Verified");
        }
        const isValidPassword = await bcrypt.compare(password,user.password );
        if (!isValidPassword) {
          throw new Error("Invalid email or password"); 
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
