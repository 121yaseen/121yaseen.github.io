import type { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

interface SectionShellProps extends PropsWithChildren {
  id: string;
  className?: string;
}

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cx("scroll-mt-28 py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cx("max-w-3xl", className)}>
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line/80 bg-panel/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-sm leading-7 text-muted sm:text-base">{description}</p>
    </div>
  );
}

interface PillProps {
  children: ReactNode;
  className?: string;
}

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-line/80 bg-panel/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  icon,
  external,
  ...props
}: ButtonLinkProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
  const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
    primary:
      "border border-accent/30 bg-gradient-to-r from-accent/20 via-accent-2/15 to-accent/10 text-text shadow-glow hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-panel",
    secondary:
      "border border-line bg-panel/70 text-text hover:-translate-y-0.5 hover:border-line/80 hover:bg-panel/90",
    ghost: "border border-transparent text-muted hover:bg-panel/60 hover:text-text"
  };

  return (
    <a
      className={cx(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : null)}
      {...props}
    >
      <span>{children}</span>
      {icon ?? (external ? <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" /> : null)}
    </a>
  );
}

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-line bg-panel/70 shadow-panel backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}

export { cx };

