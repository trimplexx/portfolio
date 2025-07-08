"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: t("about") },
    { href: "/#timeline", label: t("timeline") },
    { href: "/#projects", label: t("projects") },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto grid h-16 grid-cols-3 items-center px-4">
        <div className="flex justify-start">
          <Link
            href="/"
            className="font-serif text-xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            ŁK
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-end">
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 pb-6">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
