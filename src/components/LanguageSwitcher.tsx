"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (nextLocale: "en" | "pl") => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={localActive === "pl" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectChange("pl")}
        disabled={isPending}
      >
        PL
      </Button>
      <Button
        variant={localActive === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectChange("en")}
        disabled={isPending}
      >
        EN
      </Button>
    </div>
  );
}
