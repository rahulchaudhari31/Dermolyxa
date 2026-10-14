import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GoldCard from "@/components/ui/GoldCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceIcon from "@/components/ui/ServiceIcon";
import Reveal from "@/components/Reveal";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import Faqs from "@/components/sections/Faqs";
import { getService, services, resultsNote } from "@/data/services";
import { siteConfig } from "@/lib/siteConfig";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.shortDescription,
    keywords: service.keywords,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
        <Container className="relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Services
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.35em] text-gold">
                <span className="h-px w-6 bg-gold/60" aria-hidden />
                {service.category}
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                {service.heroSubtitle}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/book" size="lg">
                  Book Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button href="/results" size="lg" variant="secondary">
                  View Results
                </Button>
              </div>
            </div>

            <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl border border-gold/20 bg-gradient-to-br from-[#15120d] to-[#0a0a0a]">
              <ServiceIcon name={service.icon} className="h-20 w-20 text-gold/50" />
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Overview"
              title="About this treatment"
            />
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-ink/80">
                {service.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <GoldCard hover={false} className="h-fit">
                <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
                  At a Glance
                </h3>
                <ul className="mt-6 space-y-5">
                  {service.durationRecovery.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm text-ink/85">
                          {item.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GoldCard>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="border-y border-gold/10 bg-surface/40 py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Suitability"
              title="Who it's for"
              description="A consultation is required to confirm whether this treatment is appropriate for you."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.whoItsFor.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 0.08}>
                <div className="flex items-start gap-3 rounded-2xl border border-gold/10 bg-bg/40 p-5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-ink/85">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How the procedure works */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="The Procedure"
              title="How it works"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.procedure.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) * 0.08}>
                <GoldCard className="h-full">
                  <span className="font-serif text-3xl text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </GoldCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Duration & Recovery */}
      <section className="border-y border-gold/10 bg-surface/40 py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Duration & Recovery"
              title="What to expect"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {service.durationRecovery.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-gold/15 bg-bg/40 p-8 text-center">
                  <Clock className="h-6 w-6 text-gold" />
                  <p className="mt-5 text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 font-serif text-xl text-ink">
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading align="left" eyebrow="Benefits" title="Potential benefits" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={(i % 2) * 0.08}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-ink/85">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Your Journey */}
      <JourneyTimeline
        steps={service.journey}
        eyebrow="Your Journey"
        title="Your pathway with us"
        description="From your first consultation through to your results — here is how your treatment journey unfolds."
        className="border-t border-gold/10 py-16 lg:py-24"
      />

      {/* FAQs */}
      <section className="border-t border-gold/10 bg-surface/40 py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="Answers to common questions about this treatment. If in doubt, please book a consultation."
          />
          <Faqs faqs={service.faqs} />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[#0C0B09] px-8 py-14 text-center sm:px-16">
              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/12 blur-[110px]" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  Ready to discuss {service.title}?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Book a private consultation with our physician at{" "}
                  {siteConfig.name} and receive a personalised treatment plan.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Button href="/book" size="lg">
                    Book Consultation
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    href={`tel:${siteConfig.phone}`}
                    size="lg"
                    variant="secondary"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
                <p className="mt-8 text-xs tracking-wide text-muted/70">
                  {resultsNote}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
