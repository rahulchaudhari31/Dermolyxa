"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt = "Before and after comparison",
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 640px",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    containerRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current?.hasPointerCapture(e.pointerId)) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setPosition((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setPosition((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPosition(100);
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`${alt}. Drag, or use the arrow keys, to compare before and after.`}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)} percent before image`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative aspect-[4/3] w-full touch-pan-y cursor-ew-resize select-none overflow-hidden rounded-2xl border border-gold/20 bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        className
      )}
    >
      <Image
        src={afterSrc}
        alt={`${alt} — after`}
        fill
        priority={priority}
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={`${alt} — before`}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          className="pointer-events-none object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-ink backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-gold/30 bg-black/60 px-3 py-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gold/80"
        style={{ left: `${position}%` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-black/70 text-gold shadow-gold-soft backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <MoveHorizontal className="h-5 w-5" />
      </div>
    </div>
  );
}
