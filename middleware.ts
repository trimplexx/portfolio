import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const passwordCookie = request.cookies.get("admin-password");
  const isAdminPasswordCorrect =
    passwordCookie?.value === process.env.ADMIN_PASSWORD;

  if (
    !isAdminPasswordCorrect &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
