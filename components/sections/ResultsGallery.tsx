"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import {
  resultCases,
  resultCategories,
  resultsDisclaimer,
  type ResultTreatment,
} from "@/data/results";
import { cn } from "@/lib/cn";

export default function ResultsGallery() {
  const [filter, setFilter] = useState<ResultTreatment | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? resultCases
      : resultCases.filter((item) => item.treatment === filter);

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const close = () => setActiveIndex(null);
  const go = (dir: 1 | -1) =>
    setActiveIndex((i) =>
      i === null ? i : (i + dir + filtered.length) % filtered.length
    );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {resultCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category);
                  setActiveIndex(null);
                }}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-300",
                  isActive
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-gold/15 text-muted hover:border-gold/40 hover:text-gold"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            >
              <div className="overflow-hidden rounded-2xl border border-gold/15 bg-surface/70 p-3 transition-colors duration-300 hover:border-gold/35">
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={`${item.title} — ${item.treatment}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="flex items-start justify-between gap-4 px-1 pb-1 pt-4">
                  <div>
                    <p className="text-[0.56rem] uppercase tracking-[0.26em] text-gold/80">
                      {item.treatment}
                    </p>
                    <h3 className="mt-1.5 font-serif text-lg text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(filtered.indexOf(item))}
                    aria-label={`Expand ${item.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            No results available for this treatment yet.
          </p>
        ) : null}

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-muted/80">
          {resultsDisclaimer}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} before and after`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10 sm:-right-12 sm:top-0"
              >
                <X className="h-5 w-5" />
              </button>

              <BeforeAfterSlider
                beforeSrc={active.before}
                afterSrc={active.after}
                alt={`${active.title} — ${active.treatment}`}
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />

              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.58rem] uppercase tracking-[0.26em] text-gold/80">
                    {active.treatment}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-ink">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{active.detail}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous result"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next result"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted/80">{resultsDisclaimer}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
