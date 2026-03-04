"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ChatInput } from "@/components/chat-input";
import { DockTabId, FloatingDock } from "@/components/floating-dock";

const SOCIAL_ITEMS = ["LinkedIn", "Youtube", "Instagram", "Discord", "Github", "X"];

type ContactModeProps = {
  email: string;
  handle: string;
  activeTab: DockTabId;
  onTabChange: (tab: DockTabId) => void;
};

export function ContactMode({ email, handle, activeTab, onTabChange }: ContactModeProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-[#efeff2] px-4 pb-6 pt-8 text-[#111827]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mt-1"
      >
        <Image
          src="/landing-memojis.png"
          alt="Top memoji"
          width={54}
          height={54}
          className="h-14 w-14 object-contain"
          priority
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut", delay: 0.03 }}
        className="mt-10 w-full max-w-[44rem] rounded-[1.8rem] bg-[#e5e5e8] px-5 py-7 sm:px-14 sm:py-8"
      >
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#0f121a] sm:text-4xl">Contacts</h2>
          <p className="text-lg font-medium text-[#262b34] sm:pt-1 sm:text-2xl">{handle}</p>
        </div>

        <a
          href={`mailto:${email}`}
          className="mt-7 inline-flex max-w-full items-center gap-2 text-base font-medium text-[#1677ff] hover:underline sm:text-3xl"
        >
          <span className="break-all sm:break-normal">{email}</span>
          <ChevronRight size={22} />
        </a>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-slate-500 sm:gap-x-8 sm:text-lg">
          {SOCIAL_ITEMS.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-slate-700">
              {item}
            </a>
          ))}
        </div>
      </motion.section>

      <p className="mt-8 w-full max-w-[44rem] text-sm leading-[1.6] text-[#1f2430] sm:text-[1.05rem]">
        You can reach out to me anytime! Just hit me up at{" "}
        <a href={`mailto:${email}`} className="text-[#1677ff] hover:underline">
          {email}
        </a>{" "}
        or connect with me on{" "}
        <a href="#" className="text-[#1677ff] hover:underline">
          LinkedIn
        </a>
        . I&apos;m always happy to chat! 😊 What&apos;s on your mind?
      </p>

      <div className="mt-auto flex w-full flex-col items-center pt-12">
        <button type="button" className="inline-flex items-center gap-1.5 text-sm text-slate-500">
          <ChevronDown size={16} />
          <span>Hide quick questions</span>
        </button>

        <FloatingDock
          activeTab={activeTab}
          onTabChange={onTabChange}
          variant="contact"
          showMoreButton
          className="mt-3"
        />

        <ChatInput variant="contact" className="mt-4" />
      </div>
    </div>
  );
}
