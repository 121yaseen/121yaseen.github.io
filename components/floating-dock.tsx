"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type DockTab = {
  id: string;
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

export function FloatingDock() {
  const [activeTab, setActiveTab] = useState("me");

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.12 }}
      className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5"
      aria-label="Primary"
    >
      {tabs.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className={`h-[4.6rem] w-full cursor-pointer rounded-2xl border px-3 backdrop-blur-lg transition-colors md:h-[5rem] ${
              active
                ? "border-[#d7ebfb] bg-[#ebf5fe]"
                : "border-neutral-200 bg-white/30 hover:bg-white/45"
            }`}
            aria-pressed={active}
          >
            <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
              <Icon size={22} strokeWidth={2} color={iconColors[item.id]} />
              <span className="text-xs font-medium sm:text-sm">{item.label}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
