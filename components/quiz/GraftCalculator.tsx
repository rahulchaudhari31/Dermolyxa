"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { graftRangeLabel, norwoodStages } from "@/data/quiz";
import ScalpIllustration from "@/components/quiz/ScalpIllustration";
import { cn } from "@/lib/cn";

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight
          ? "border-gold/40 bg-gold/10"
          : "border-gold/10 bg-bg/40"
      )}
    >
      <p className="text-[0.55rem] uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 font-serif text-lg",
          highlight ? "text-gold" : "text-ink"
        )}
      >
        {value}
      </p>
    </div>
  );
}

export default function GraftCalculator() {
  const [stageId, setStageId] = useState(norwoodStages[2].id);
  const stage = norwoodStages.find((item) => item.id === stageId) ?? norwoodStages[0];

  return (
    <div className="rounded-3xl border border-gold/15 bg-surface/60 p-6 sm:p-9">
      <div className="flex items-center gap-3">
        <Calculator className="h-5 w-5 text-gold" />
        <h3 className="font-serif text-2xl text-ink">
          Graft Estimate Calculator
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Select the Norwood stage that best matches your pattern to see an
        approximate graft range.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap gap-2">
            {norwoodStages.map((item) => {
              const active = item.id === stageId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStageId(item.id)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-[2.75rem] rounded-full border px-4 text-[0.62rem] font-medium uppercase tracking-[0.16em] transition-all duration-300",
                    active
                      ? "border-gold/60 bg-gold/15 text-gold"
                      : "border-gold/15 text-muted hover:border-gold/40 hover:text-gold"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <Stat label="Pattern" value={stage.title} />
            <Stat label="Scale" value={stage.label} />
            <Stat
              label="Approx. grafts"
              value={graftRangeLabel(stage.graftMin, stage.graftMax)}
              highlight
            />
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/15 bg-bg/40 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <p className="text-xs leading-relaxed text-muted">
              This is an estimate only — not a quote or a diagnosis. Actual graft
              numbers are confirmed after an in-person assessment of your donor
              area and pattern. Results vary by individual.
            </p>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ScalpIllustration
              variant="norwood"
              level={stage.level}
              className="h-40 w-40 text-gold"
            />
          </motion.div>
          <p className="mt-3 text-[0.6rem] uppercase tracking-[0.24em] text-gold">
            {stage.label}
          </p>
        </div>
      </div>
    </div>
  );
}
