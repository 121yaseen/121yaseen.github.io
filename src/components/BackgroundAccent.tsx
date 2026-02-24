import { motion, useReducedMotion } from "framer-motion";

export function BackgroundAccent() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,209,197,0.12),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(96,165,250,0.14),transparent_45%),radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-[0.08]" />

      <motion.div
        className="absolute left-[8%] top-[14%] h-56 w-56 rounded-full bg-accent/20 blur-3xl"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 24, -12, 0],
                y: [0, -18, 10, 0]
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[8%] top-[8%] h-72 w-72 rounded-full bg-accent-2/15 blur-3xl"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -28, 12, 0],
                y: [0, 16, -8, 0]
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[4%] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.22, 0.35, 0.22] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

