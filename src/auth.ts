import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { LoginResponse, SessionUser } from "./types/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data: LoginResponse = await response.json()

          if (!response.ok || !data.status) {
            console.error("Login failed:", data.message || "Network issue")
            return null
          }

          // Ensure all required fields are present
          if (!data.userData.id || !data.userData.email || !data.token) {
            console.error("Missing required user data fields")
            return null
          }

          return {
            id: data.userData.id,
            email: data.userData.email,
            fullName: data.userData.fullName,
            industry: data.userData.industry,
            profession: data.userData.profession,
            token: data.token,
          } as SessionUser
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow sign in if we have a valid user with required fields
      if (user && user.id && user.email) return true
      return false
    },
    async session({ session, token }) {
      // Make sure we're only adding user data if token.user exists
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        }
      }
      return session
    },
    async jwt({ token, user }) {
      // Only update token if user exists (during sign in)
      if (user) {
        token.user = user
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
})

