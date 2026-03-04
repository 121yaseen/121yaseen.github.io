"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  MoreHorizontal,
  PartyPopper,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";

export type DockTabId = "me" | "projects" | "skills" | "fun" | "contact";
type DockVariant = "hero" | "contact";

type DockTab = {
  id: DockTabId;
  label: string;
  icon: LucideIcon;
};

const tabs: DockTab[] = [
  { id: "me", label: "Me", icon: Laugh },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "fun", label: "Fun", icon: PartyPopper },
  { id: "contact", label: "Contact", icon: UserRoundSearch },
];

const iconColors: Record<string, string> = {
  me: "#329696",
  projects: "#3E9858",
  skills: "#856ED9",
  fun: "#B95F9D",
  contact: "#C19433",
};

type FloatingDockProps = {
  activeTab: DockTabId;
  onTabChange: (tab: DockTabId) => void;
  variant?: DockVariant;
  showMoreButton?: boolean;
  className?: string;
};

export function FloatingDock({
  activeTab,
  onTabChange,
  variant = "hero",
  showMoreButton = false,
  className = "",
}: FloatingDockProps) {
  const navClassName =
    variant === "contact"
      ? `mt-3 flex w-full max-w-[44rem] flex-wrap items-center justify-center gap-2 ${className}`.trim()
      : `mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5 ${className}`.trim();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.12 }}
      className={navClassName}
      aria-label="Primary"
    >
      {tabs.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        const buttonClassName =
          variant === "contact"
            ? `h-[3.3rem] min-w-[5.9rem] cursor-pointer rounded-2xl border px-3 sm:min-w-[7.2rem] sm:px-4 backdrop-blur-lg transition-colors ${
                active
                  ? "border-[#d7ebfb] bg-[#ebf5fe]"
                  : "border-neutral-300 bg-white/60 hover:bg-white/80"
              }`
            : `h-[4.6rem] w-full cursor-pointer rounded-2xl border px-3 backdrop-blur-lg transition-colors md:h-[5rem] ${
                active
                  ? "border-[#d7ebfb] bg-[#ebf5fe]"
                  : "border-neutral-200 bg-white/30 hover:bg-white/45"
              }`;

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className={buttonClassName}
            aria-pressed={active}
          >
            <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
              <Icon size={variant === "contact" ? 18 : 22} strokeWidth={2} color={iconColors[item.id]} />
              <span className="text-xs font-medium sm:text-sm">{item.label}</span>
            </div>
          </motion.button>
        );
      })}

      {showMoreButton && (
        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="flex h-[3.3rem] min-w-[3.3rem] items-center justify-center rounded-2xl border border-neutral-300 bg-white/60 backdrop-blur-lg transition-colors hover:bg-white/80"
          aria-label="More options"
        >
          <MoreHorizontal size={18} className="text-slate-600" />
        </motion.button>
      )}
    </motion.nav>
  );
}
