import createMiddleware from "next-intl/middleware";
import { routing } from "./i18/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  defaultLocale: "pl",
  locales: routing.locales,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    const url = request.nextUrl.searchParams.get("url");

    if (url?.includes("blob.core.windows.net")) {
      const response = NextResponse.next();
      response.headers.set("Accept", "image/webp,image/apng,image/*,*/*;q=0.8");
      response.headers.set("x-ms-version", "2020-04-08");
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|logowanie|admin|.*\\..*).*)",
    "/_next/image",
  ],
};
