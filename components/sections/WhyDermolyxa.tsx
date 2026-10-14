import {
  PencilRuler,
  Dna,
  ShieldCheck,
  Receipt,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";

const reasons = [
  {
    Icon: PencilRuler,
    title: "Personalised Hairline Design",
    text: "Every hairline is mapped to your facial proportions and long-term goals.",
  },
  {
    Icon: Dna,
    title: "Advanced Regenerative Techniques",
    text: "PRP, growth-factor and regenerative protocols performed by trained physicians.",
  },
  {
    Icon: ShieldCheck,
    title: "Hygienic, Modern Clinic",
    text: "Hospital-grade sterilisation within a calm, contemporary environment.",
  },
  {
    Icon: Receipt,
    title: "Transparent Pricing",
    text: "Clear quotes and treatment plans, with no hidden costs or surprises.",
  },
  {
    Icon: HeartHandshake,
    title: "Aftercare Support",
    text: "Structured follow-up and guidance throughout your recovery journey.",
  },
  {
    Icon: Stethoscope,
    title: "Physician-Led Consultations",
    text: "Assessment and planning led by a qualified doctor from the outset.",
  },
];

export default function WhyDermolyxa() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            tone="light"
            eyebrow="Why Dermolyxa"
            title="Care built on trust and precision"
            description="We combine regenerative medicine with an artist's eye — so your results look considered, natural and true to you."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl border border-gold-dark/20 bg-white/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-dark/45 hover:shadow-[0_24px_50px_-30px_rgba(184,134,11,0.6)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-dark/30 text-gold-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-[#1b160b]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c5546]">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
