"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <div className="w-16 h-8" />;
  }

  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 w-16 rounded-full bg-muted transition-colors cursor-pointer"
      aria-label="Przełącz motyw"
    >
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-background transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <span className="absolute left-2 top-2 h-4 w-4">
        <Sun
          size={16}
          className={`text-foreground transition-opacity duration-300 ${
            !isDarkMode ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
      <span className="absolute right-2 top-2 h-4 w-4">
        <Moon
          size={16}
          className={`text-foreground transition-opacity duration-300 ${
            isDarkMode ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
