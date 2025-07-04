import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../theme-provider";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin-ext"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Portfolio | Łukasz Krawczyk",
  description: "Portfolio programistyczne",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="theme"
          >
            <AnimatedBackground>
              <Navbar />
              {children}
            </AnimatedBackground>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
