import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeProvider } from "./theme-provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AnimatedBackground>
            <Navbar />
            {children}
          </AnimatedBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
