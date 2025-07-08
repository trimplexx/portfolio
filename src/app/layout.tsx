import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./theme-provider";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="theme"
          >
            <div className="relative flex flex-1 flex-col">
              <AnimatedBackground>
                <Navbar />
                {children}
              </AnimatedBackground>
            </div>

            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
