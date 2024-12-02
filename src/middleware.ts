import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (role === "User" && request.nextUrl.pathname.includes("/edit")) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  if (role === "Admin" && request.nextUrl.pathname.includes("/company/edite")) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  if (role === "User" && request.nextUrl.pathname.startsWith("/activities")) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/contacts/:path*",
    "/users/:path*",
    "/company/:path*",
    "/activities",
  ],
};
