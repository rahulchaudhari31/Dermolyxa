"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const HEAD_PATH =
  "M60 6 C34 6 19 27 19 53 C19 84 38 110 60 110 C82 110 101 84 101 53 C101 27 86 6 60 6 Z";
const SKIN = "#2f2820";

type ScalpIllustrationProps = {
  variant: "norwood" | "ludwig";
  level: number;
  className?: string;
};

export default function ScalpIllustration({
  variant,
  level,
  className,
}: ScalpIllustrationProps) {
  const rawId = useId();
  const clipId = `scalp-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  let baldPath: string;
  if (variant === "norwood") {
    const templeY = 34 + (level - 1) * 6;
    const peak = Math.max(0, 20 - (level - 1) * 6);
    const centreY = templeY + peak;
    baldPath = `M16 ${templeY} Q38 ${centreY} 60 ${centreY} Q82 ${centreY} 104 ${templeY} L104 118 L16 118 Z`;
  } else {
    const spread = 6 + level * 7;
    baldPath = `M60 10 L ${60 - spread} 108 L ${60 + spread} 108 Z`;
  }

  const label =
    variant === "norwood"
      ? `Norwood ${level} hair loss pattern illustration`
      : `Ludwig ${level} hair loss pattern illustration`;

  return (
    <svg
      viewBox="0 0 120 130"
      className={cn("text-gold", className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={HEAD_PATH} />
        </clipPath>
      </defs>

      <rect x="48" y="98" width="24" height="30" rx="8" fill={SKIN} />
      <ellipse cx="18" cy="58" rx="6" ry="11" fill={SKIN} />
      <ellipse cx="102" cy="58" rx="6" ry="11" fill={SKIN} />

      <path d={HEAD_PATH} fill={SKIN} />

      <g clipPath={`url(#${clipId})`}>
        <path d={HEAD_PATH} fill="currentColor" />
        <path d={baldPath} fill={SKIN} />
      </g>

      <path
        d={HEAD_PATH}
        fill="none"
        stroke="rgba(212,175,55,0.55)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
