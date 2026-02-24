import { useEffect, useState } from "react";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

import type { ThemePreference } from "../types";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink, Container, cx } from "./common";

interface NavSection {
  id: string;
  label: string;
}

interface NavbarProps {
  name: string;
  sections: readonly NavSection[];
  activeSectionId: string;
  themePreference: ThemePreference;
  resolvedTheme: "light" | "dark";
  onCycleTheme: () => void;
}

export function Navbar({
  name,
  sections,
  activeSectionId,
  themePreference,
  resolvedTheme,
  onCycleTheme
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.15 });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="absolute inset-x-0 top-0 h-full border-b border-line/60 bg-bg/70 backdrop-blur-xl" />
        <Container className="relative">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-3 rounded-full px-2 py-1 text-sm font-medium text-text transition hover:bg-panel/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel text-xs font-bold tracking-wide text-text">
                {initials || "YN"}
              </span>
              <span className="hidden text-sm font-semibold sm:inline">{name}</span>
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-line bg-panel/70 p-1 shadow-panel backdrop-blur lg:flex">
              {sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={cx(
                      "relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-premium",
                      isActive ? "text-text" : "text-muted hover:text-text"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full border border-line/80 bg-bg-soft/90"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    ) : null}
                    <span className="relative">{section.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle
                preference={themePreference}
                resolvedTheme={resolvedTheme}
                onCycle={onCycleTheme}
              />
              <div className="hidden sm:block">
                <ButtonLink href="#contact" variant="secondary">
                  Contact
                </ButtonLink>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel/80 text-muted shadow-panel backdrop-blur transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
        <motion.div className="h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-amber-300" style={{ scaleX: progressScale }} />
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="mx-4 mt-20 rounded-2xl border border-line bg-panel/95 p-4 shadow-panel"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-2">
                {sections.map((section) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={cx(
                        "rounded-xl border px-3 py-3 text-sm font-medium transition",
                        isActive
                          ? "border-accent/40 bg-accent/10 text-text"
                          : "border-line/70 bg-bg-soft/30 text-muted hover:text-text"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {section.label}
                    </a>
                  );
                })}
                <ButtonLink href="#contact" variant="primary" className="mt-2 w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Contact
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

