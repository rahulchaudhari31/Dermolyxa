"use client";

import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials, testimonialsNote } from "@/data/testimonials";
import { cn } from "@/lib/cn";

const swipeThreshold = 60;

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) =>
    setIndex((next + testimonials.length) % testimonials.length);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      goTo(index + 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      goTo(index - 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      goTo(index - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      goTo(index + 1);
      e.preventDefault();
    }
  };

  return (
    <section className="relative border-y border-gold/10 bg-surface/40 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Patient Stories"
          title="Experiences you can relate to"
          description="Individual experiences shared by our patients. Results vary from person to person."
        />

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Patient testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-14 max-w-3xl focus:outline-none"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={onDragEnd}
            >
              {testimonials.map((t, i) => (
                <div key={t.id} className="w-full shrink-0 px-1">
                  <div
                    aria-hidden={i !== index}
                    className="rounded-3xl border border-gold/15 bg-bg/50 p-8 sm:p-12"
                  >
                    <Quote className="h-8 w-8 text-gold/50" />
                    <div className="mt-6 flex gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-4 w-4",
                            s < t.rating ? "fill-gold" : "text-gold/25"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-6 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 font-serif text-sm text-gold">
                        {t.name.replace(/[^A-Za-z]/g, "").slice(0, 2)}
                      </span>
                      <div>
                        <p className="text-sm text-ink">{t.name}</p>
                        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80">
                          {t.treatment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
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

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-5 text-center text-[0.6rem] uppercase tracking-[0.2em] text-muted/70">
            Swipe or use the arrows · {index + 1} / {testimonials.length}
          </p>
          <p className="mt-4 text-center text-xs text-muted/70">
            {testimonialsNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
