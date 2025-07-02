import createMiddleware from "next-intl/middleware";
import { routing } from "./i18/routing";

export default createMiddleware({
  // Domyślny język, jeśli żaden nie pasuje
  defaultLocale: "pl",

  // Lista obsługiwanych języków
  locales: routing.locales,

  // Zawsze pokazuj język w URL
  localePrefix: "always",
});

export const config = {
  // Dopasuj wszystkie ścieżki oprócz tych, które powinny być ignorowane
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
