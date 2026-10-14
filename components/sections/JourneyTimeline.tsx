"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/siteConfig";
import { resultsNote, type JourneyStep } from "@/data/services";

type JourneyTimelineProps = {
  steps?: readonly JourneyStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showNote?: boolean;
  className?: string;
};

export default function JourneyTimeline({
  steps = siteConfig.journeySteps,
  eyebrow = "Your Journey",
  title = "What to expect, step by step",
  description = "A clear, structured pathway from your first consultation through to your results.",
  showNote = true,
  className,
}: JourneyTimelineProps) {
  return (
    <section className={className ?? "py-24 lg:py-32"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="absolute bottom-3 left-[27px] top-3 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent"
            aria-hidden
          />
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-6"
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-bg font-serif text-lg text-gold shadow-[0_0_0_6px_#0A0A0A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-3">
                  <h3 className="font-serif text-xl text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {showNote ? (
          <p className="mt-12 text-center text-xs tracking-wide text-muted/80">
            {resultsNote}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
