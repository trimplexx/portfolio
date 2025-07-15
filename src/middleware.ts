import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18/routing";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "pl",
  locales: routing.locales,
  localePrefix: "always",
});

const adminPaths = [
  "/admin",
  "/admin/projects",
  "/admin/projects/add",
  /^\/admin\/projects\/[^/]+$/,
  /^\/admin\/projekty\/[^/]+$/,
  "/admin/projekty",
  "/admin/projekty/dodawanie",
];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAdminPath = adminPaths.some((p) =>
    typeof p === "string" ? pathname.startsWith(p) : p.test(pathname)
  );

  if (isAdminPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith("/pl/admin")) {
      const newPath = pathname.replace("/pl", "");
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|login|logowanie|favicon.ico).*)",
  ],
};
