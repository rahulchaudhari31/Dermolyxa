"use client";

import { motion } from "framer-motion";

const COUNT = 18;

const particles = Array.from({ length: COUNT }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  const r2 = ((i * 4021 + 981) % 1000) / 1000;
  const r3 = ((i * 7919 + 104729) % 1000) / 1000;

  return {
    left: (r * 100).toFixed(2),
    size: 2 + Math.round(r2 * 3),
    duration: 9 + r3 * 10,
    delay: r2 * 8,
    drift: (r3 - 0.5) * 48,
    opacity: 0.3 + r * 0.5,
  };
});

export default function GoldParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Breathing glows */}
      <motion.div
        className="absolute left-1/2 top-1/4 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gold/10 blur-[130px]"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 right-1/4 h-[30rem] w-[30rem] rounded-full bg-gold-dark/10 blur-[120px]"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rising gold particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold-light"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: [-20, -520],
            x: [0, p.drift],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
