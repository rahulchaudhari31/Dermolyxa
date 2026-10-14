"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/siteConfig";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

function Counter({ value, suffix = "", duration = 1.9 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function TrustStrip() {
  return (
    <section className="relative border-y border-gold/10 bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Container className="grid grid-cols-2 gap-y-10 py-14 sm:grid-cols-4 sm:py-16">
        {siteConfig.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="font-serif text-4xl text-gold-gradient sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-[0.6rem] uppercase tracking-[0.24em] text-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
