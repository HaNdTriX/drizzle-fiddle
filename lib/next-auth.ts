import {
  type NextAuthOptions,
  type DefaultSession,
  type User,
} from "next-auth";
import { getServerSession as getServerSessionUnconfigured } from "next-auth/next";
import { DrizzleAdapter } from "./next-auth-drizzle-mysql-adapter";
import db from "@/db";
import GithubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_ID) throw new Error("GITHUB_ID is not set");
if (!process.env.GITHUB_SECRET) throw new Error("GITHUB_SECRET is not set");

declare module "next-auth" {
  interface User {
    role: "admin" | "user";
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: User["role"];
    } & DefaultSession["user"];
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as User["role"];
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60, // 90 days, change it as you like
  },
  adapter: DrizzleAdapter(db),
  theme: {
    brandColor: "#4f46e5",
  },
};

export const getServerSession = () =>
  getServerSessionUnconfigured(nextAuthOptions);
