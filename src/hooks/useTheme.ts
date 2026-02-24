import { useEffect, useMemo, useState } from "react";

import type { ThemePreference } from "../types";

const STORAGE_KEY = "portfolio-theme-preference";

function getSystemTheme(): Exclude<ThemePreference, "system"> {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredPreference(): ThemePreference | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }

  return null;
}

function applyThemeClass(theme: Exclude<ThemePreference, "system">) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() => getStoredPreference() ?? "system");
  const [systemTheme, setSystemTheme] = useState<Exclude<ThemePreference, "system">>(() => getSystemTheme());

  const resolvedTheme = useMemo(
    () => (preference === "system" ? systemTheme : preference),
    [preference, systemTheme]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemTheme(mediaQuery.matches ? "dark" : "light");

    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    applyThemeClass(resolvedTheme);

    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, preference);
  }, [preference, resolvedTheme]);

  const cyclePreference = () => {
    setPreference((current) => {
      if (current === "system") {
        return "light";
      }
      if (current === "light") {
        return "dark";
      }
      return "system";
    });
  };

  return {
    preference,
    resolvedTheme,
    setPreference,
    cyclePreference
  };
}

