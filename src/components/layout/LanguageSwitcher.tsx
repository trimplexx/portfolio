"use client";

import { useTransition } from "react";
import { usePathname, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale =
    typeof params.locale === "string" ? params.locale : "pl";

  const toggleLocale = () => {
    const nextLocale = currentLocale === "pl" ? "en" : "pl";

    let pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
      ? pathname.substring(`/${currentLocale}`.length)
      : pathname;

    if (pathWithoutLocale === "") {
      pathWithoutLocale = "/";
    }

    const newPath = `/${nextLocale}${pathWithoutLocale}`;

    startTransition(() => {
      window.location.href = newPath;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLocale}
        disabled={isPending}
        aria-label={
          currentLocale === "pl" ? "Switch to English" : "Zmień na polski"
        }
      >
        {currentLocale === "pl" ? "EN" : "PL"}
      </Button>
    </div>
  );
}
