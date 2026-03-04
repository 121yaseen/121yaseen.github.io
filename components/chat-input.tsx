"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";
import { FormEvent, useState } from "react";

type ChatInputVariant = "hero" | "contact";

type ChatInputProps = {
  variant?: ChatInputVariant;
  className?: string;
};

export function ChatInput({ variant = "hero", className = "" }: ChatInputProps) {
  const [question, setQuestion] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const isContact = variant === "contact";
  const placeholder = isContact ? "Ask me anything" : "Ask me anything…";
  const disableSubmit = !isContact && question.trim().length === 0;

  const outerClassName = isContact
    ? `relative w-full max-w-[44rem] ${className}`.trim()
    : `relative w-full max-w-lg ${className}`.trim();

  const containerClassName = isContact
    ? "mx-auto flex items-center rounded-full border border-neutral-300 bg-[#d6d7dc] py-2.5 pl-6 pr-2 shadow-[0_8px_20px_-18px_rgba(17,24,39,0.5)] transition-all hover:border-neutral-400"
    : "mx-auto flex items-center rounded-full border border-neutral-200 bg-white/88 py-2.5 pl-6 pr-2 shadow-[0_10px_24px_-22px_rgba(17,24,39,0.55)] transition-all hover:border-neutral-300";

  const buttonClassName = isContact
    ? "flex items-center justify-center rounded-full bg-[#6aa5ef] p-2.5 text-white transition-colors hover:bg-[#578fd5]"
    : "flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70";

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
      className={outerClassName}
    >
      <div className={containerClassName}>
        <input
          type="text"
          placeholder={placeholder}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full border-none bg-transparent text-base placeholder:text-neutral-500 focus:outline-none ${
            isContact ? "text-[#71798b]" : "text-neutral-800"
          }`}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={disableSubmit}
          className={buttonClassName}
          aria-label="Submit question"
        >
          {isContact ? <ArrowUp className="h-5 w-5" strokeWidth={2} /> : <ArrowRight className="h-5 w-5" strokeWidth={2} />}
        </motion.button>
      </div>
    </motion.form>
  );
}
