import NextAuth from "next-auth/next";
import { nextAuthOptions } from "@/lib/next-auth";

// TODO - move this route to app directory as soon as https://github.com/nextauthjs/next-auth/pull/6777 lands
export default NextAuth(nextAuthOptions);
