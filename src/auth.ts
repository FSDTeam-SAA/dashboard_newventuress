import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse, SessionUser } from "./types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data: LoginResponse = await response.json();

        if (!response.ok || !data.status) {
          throw new Error(data.message || "Network issue");
        }

        return {
          id: data.userData.id,
          email: data.userData.email,
          fullName: data.userData.fullName,
          industry: data.userData.industry,
          profession: data.userData.profession,
          token: data.token,
        } as SessionUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});
