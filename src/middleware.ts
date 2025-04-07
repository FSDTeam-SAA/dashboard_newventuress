import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedin) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
