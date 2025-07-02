import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  defaultLocale: "pl",
  locales,
  localePrefix,
});

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
