"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type GoldCardProps = HTMLMotionProps<"div"> & {
  hover?: boolean;
};

export default function GoldCard({
  children,
  className,
  hover = true,
  ...props
}: GoldCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gold/15 bg-surface/90 p-6",
        "shadow-[0_1px_0_0_rgba(212,175,55,0.06)_inset]",
        hover &&
          "transition-shadow duration-500 hover:border-gold/40 hover:shadow-gold-glow",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500",
          hover ? "opacity-0 group-hover:opacity-100" : "opacity-0"
        )}
        aria-hidden
      />
      <div className="relative">{children as React.ReactNode}</div>
    </motion.div>
  );
}
