"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import { AvatarStatic } from "@/components/avatar-static";
import { ChatInput } from "@/components/chat-input";
import { ContactMode } from "@/components/contact-mode";
import { DockTabId, FloatingDock } from "@/components/floating-dock";
import { FluidBackground } from "@/components/fluid-background";

type PageMode = "hero" | "contact";

export default function Home() {
  const [activeTab, setActiveTab] = useState<DockTabId>("me");

  const mode: PageMode = useMemo(() => (activeTab === "contact" ? "contact" : "hero"), [activeTab]);

  return (
    <main className="flex min-h-screen flex-col">
      <AnimatePresence mode="wait">
        {mode === "hero" ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20"
          >
            <FluidBackground />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center overflow-hidden">
              <div
                className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
                style={{ marginBottom: "-2.5rem" }}
              >
                Toukoum
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
              className="z-[1] mb-8 mt-24 flex flex-col items-center text-center md:mb-12 md:mt-4"
            >
              <button
                type="button"
                className="h-auto w-auto cursor-pointer rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg transition-colors hover:bg-white/60"
              >
                <Image src="/logo-toukoum.svg" alt="Logo" width={100} height={100} className="w-6 md:w-8" priority />
                <span className="sr-only">About Toukoum</span>
              </button>
              <h2 className="mt-1 text-xl font-semibold text-[#29354d] md:text-2xl">Hey, I&apos;m yaaaseeen 👋</h2>
              <h1 className="text-4xl font-bold tracking-tight text-[#070d23] sm:text-5xl md:text-6xl lg:text-7xl">
                AI Engineer
              </h1>
            </motion.div>

            <AvatarStatic />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.12 }}
              className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
            >
              <ChatInput variant="hero" />
              <FloatingDock activeTab={activeTab} onTabChange={setActiveTab} variant="hero" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ContactMode
              email="yaseen@hinoun.com"
              handle="@yaseen"
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
