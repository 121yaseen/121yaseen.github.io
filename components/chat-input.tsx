"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function ChatInput() {
  const [question, setQuestion] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      whileHover={{ scale: 1.006 }}
      animate={{
        scale: isFocused ? 1.008 : 1,
        boxShadow: isFocused
          ? "0 12px 30px -20px rgba(14, 28, 62, 0.38)"
          : "0 10px 24px -22px rgba(14, 28, 62, 0.34)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="relative w-full max-w-lg"
    >
      <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/88 py-2.5 pl-6 pr-2 shadow-[0_10px_24px_-22px_rgba(17,24,39,0.55)] transition-all hover:border-neutral-300">
        <input
          type="text"
          placeholder="Ask me anything…"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={question.trim().length === 0}
          className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70"
          aria-label="Submit question"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      </div>
    </motion.form>
  );
}
