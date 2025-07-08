import createMiddleware from "next-intl/middleware";
import { routing } from "./i18/routing";

export default createMiddleware({
  defaultLocale: "pl",
  locales: routing.locales,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|logowanie|admin|.*\\..*).*)"],
};
