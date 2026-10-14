"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { patientStories, patientStoriesNote } from "@/data/patientStories";
import { cn } from "@/lib/cn";

const ROTATE_MS = 6000;

type RealStoriesProps = {
  className?: string;
};

export default function RealStories({ className }: RealStoriesProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = patientStories[index];

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % patientStories.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  return (
    <section
      id="stories"
      className={cn("border-t border-gold/10 py-24 lg:py-32", className)}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Patient Stories"
            title="Real stories, real results"
            description="Individual experiences shared by our patients. Results vary from person to person."
          />
        </Reveal>

        <div
          className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/20 bg-[#0C0B09] p-8 sm:p-12">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-[100px]"
                aria-hidden
              />
              <Quote className="h-9 w-9 text-gold/50" aria-hidden />

              <div aria-live="polite" className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="mt-6 flex gap-1 text-gold"
                      aria-label={`${active.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          aria-hidden
                          className={cn(
                            "h-4 w-4",
                            s < active.rating ? "fill-gold" : "text-gold/25"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-6 font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40">
                        <Image
                          src={active.photo}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <div>
                        <p className="text-sm text-ink">{active.name}</p>
                        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/90">
                          {active.treatment} · {active.city}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-auto flex gap-2 pt-8">
                {patientStories.map((story, i) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show story ${i + 1} of ${patientStories.length}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index
                        ? "w-6 bg-gold"
                        : "w-1.5 bg-gold/30 hover:bg-gold/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {patientStories.map((story, i) => {
              const isActive = i === index;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View the story from ${story.name}, ${story.city}`}
                  aria-current={isActive}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-2xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                    isActive
                      ? "border-gold/60 shadow-gold-soft"
                      : "border-gold/15 hover:border-gold/40"
                  )}
                >
                  <Image
                    src={story.photo}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="text-sm text-ink">{story.name}</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.18em] text-gold/90">
                      {story.city}
                    </p>
                  </div>
                  {isActive ? (
                    <span
                      className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          {patientStoriesNote}
        </p>
      </Container>
    </section>
  );
}
