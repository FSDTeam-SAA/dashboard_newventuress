import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Always allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect to dashboard if user is already logged in and trying to access auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  // Redirect to login if user is not logged in and trying to access protected routes
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl)

    // Optionally preserve the original URL as a callback parameter
    // This allows redirecting back after login
    // loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);

    return Response.redirect(loginUrl)
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

