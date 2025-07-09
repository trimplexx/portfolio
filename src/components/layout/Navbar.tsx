"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: t("about") },
    { href: "/#timeline", label: t("timeline") },
    { href: "/#projects", label: t("projects") },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl font-bold">
            ŁK
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-8">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
