"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";

export const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Łukasz Krawczyk. {t("rights")}
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <IconGitHub className="text-muted-foreground hover:text-primary transition-colors" />
          <IconLinkedIn className="text-muted-foreground hover:text-primary transition-colors" />
          <a
            href="mailto:Ikrawczyk2001@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
