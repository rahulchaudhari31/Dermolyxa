import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="mb-4 inline-flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-6 bg-gold/60" aria-hidden />
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "font-serif text-3xl leading-[1.12] tracking-tight sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-ink" : "text-[#1b160b]"
        )}
      >
        {title}
      </h2>

      <span
        className={cn(
          "gold-divider mt-6",
          centered ? "w-28" : "w-20",
        )}
        aria-hidden
      />

      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-sm leading-relaxed sm:text-base",
            tone === "dark" ? "text-muted" : "text-[#5c5546]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
