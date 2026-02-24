import { Laptop, Moon, Sun } from "lucide-react";

import type { ThemePreference } from "../types";
import { cx } from "./common";

interface ThemeToggleProps {
  preference: ThemePreference;
  resolvedTheme: "light" | "dark";
  onCycle: () => void;
}

export function ThemeToggle({ preference, resolvedTheme, onCycle }: ThemeToggleProps) {
  const Icon = preference === "system" ? Laptop : resolvedTheme === "dark" ? Moon : Sun;
  const label = `Theme: ${preference} (${resolvedTheme} active). Click to cycle system/light/dark.`;

  return (
    <button
      type="button"
      onClick={onCycle}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-2 text-xs font-medium text-muted shadow-panel backdrop-blur transition-all duration-300 ease-premium",
        "hover:-translate-y-0.5 hover:border-line/80 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{preference}</span>
    </button>
  );
}

