import Link from "next/link";
import { ArrowRight, Droplets, Sprout, Gem } from "lucide-react";
import Container from "@/components/ui/Container";
import GoldCard from "@/components/ui/GoldCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "Skin",
    href: "/services#skin",
    Icon: Droplets,
    description:
      "Medical-grade skin treatments for clarity, refined texture and an even, healthy tone.",
  },
  {
    title: "Hair",
    href: "/services#hair",
    Icon: Sprout,
    description:
      "Regenerative hair restoration focused on density and natural-looking hairline design.",
  },
  {
    title: "Aesthetic",
    href: "/services#aesthetic",
    Icon: Gem,
    description:
      "Refined, physician-led aesthetic enhancements that respect your natural features.",
  },
];

export default function Pillars() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Three Pillars"
            title="Skin • Hair • Aesthetic"
            description="Three areas of care, one uncompromising standard. Every plan begins with a full assessment and is tailored to you."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map(({ title, description, Icon, href }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <GoldCard className="flex h-full flex-col items-start">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-2xl text-ink">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {description}
                </p>
                <Link
                  href={href}
                  className="group mt-8 inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </GoldCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
