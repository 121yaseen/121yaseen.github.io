"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AvatarStatic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
      className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72"
      aria-label="Hero memoji"
    >
      <Image
        src="/landing-memojis.png"
        alt="Hero memoji"
        width={2000}
        height={2000}
        priority
        className="translate-y-14 scale-[2] object-cover"
      />
    </motion.div>
  );
}
