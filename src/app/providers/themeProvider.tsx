"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export type Theme = "light" | "dark" | "device based";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export enum Themes {
  light = "light",
  dark = "dark",
  'device based' = "device based",
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    Cookies.set("theme", newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (themeValue: Theme) => {
    const root = document.documentElement;

    if (themeValue === "device based") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", themeValue);
    }
  };

  // Следим за изменением системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "device based") {
        applyTheme("device based");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Применяем тему при монтировании
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
