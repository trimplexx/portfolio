"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";

export const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Łukasz Krawczyk. {t("rights")}
          </p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-4">
          <a
            href={`mailto:${t("email")}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
            <span className="text-sm">{t("email")}</span>
          </a>

          <a
            href={`tel:${t("phone").replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm">{t("phone")}</span>
          </a>

          <IconGitHub className="text-muted-foreground hover:text-primary transition-colors" />
          <IconLinkedIn className="text-muted-foreground hover:text-primary transition-colors" />
        </div>
      </div>
    </footer>
  );
};
