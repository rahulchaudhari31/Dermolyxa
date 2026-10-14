import { Check, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { pricingDisclaimer, pricingPlans } from "@/data/pricing";
import { cn } from "@/lib/cn";

type PricingProps = {
  className?: string;
};

export default function Pricing({ className }: PricingProps) {
  return (
    <section
      id="pricing"
      className={cn("border-t border-gold/10 py-24 lg:py-32", className)}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent packages, tailored to you"
            description="Every plan is finalised after your consultation, once we understand the grafts you actually need."
          />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500",
                  plan.featured
                    ? "border-gold/50 bg-gradient-to-b from-[#1a160d] to-[#0c0b09] shadow-gold-soft lg:-translate-y-2"
                    : "border-gold/15 bg-surface/60 hover:border-gold/40"
                )}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#1b1404]">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="font-serif text-2xl text-ink">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{plan.tagline}</p>

                <p className="mt-6 font-serif text-3xl text-gold-gradient">
                  {plan.priceLabel}
                </p>
                <span className="mt-3 inline-flex w-fit rounded-full border border-gold/20 px-3 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-gold">
                  {plan.grafts}
                </span>

                <span className="gold-divider my-6 w-full" aria-hidden />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href="/book"
                    size="lg"
                    fullWidth
                    variant={plan.featured ? "primary" : "secondary"}
                  >
                    Get Exact Quote
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-muted">
          {pricingDisclaimer}
        </p>
      </Container>
    </section>
  );
}
