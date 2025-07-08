import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
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
  "/admin/projects/:id",
  "/admin/projekty",
  "/admin/projekty/dodawanie",
  "/admin/projekty/:id",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAdminPath = adminPaths.some(
    (path) => pathname.startsWith(path) || pathname.startsWith(`/pl${path}`)
  );

  if (isAdminPath) {
    const authCookie = request.cookies.get("admin-auth");
    const isAuthenticated = authCookie?.value === "authenticated";

    if (!isAuthenticated) {
      if (pathname !== "/login") {
        const url = new URL("/login", request.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
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
