import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GoldCard from "@/components/ui/GoldCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceIcon from "@/components/ui/ServiceIcon";
import Reveal from "@/components/Reveal";
import {
  serviceCategories,
  getServicesByCategory,
  resultsNote,
} from "@/data/services";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hair transplant, beard and eyebrow transplants, PRP and regenerative hair therapy, skin and aesthetic treatments at Dermolyxa.",
};

const categoryCopy: Record<string, string> = {
  Hair:
    "Surgical and non-surgical hair restoration, from transplants to regenerative therapy.",
  Skin: "Medical-grade skin protocols for clarity, texture and tone.",
  Aesthetic:
    "Physician-led aesthetic treatments with a natural-looking approach.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pb-8 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Our Services"
            title="Advanced treatments, precisely delivered"
            description={`${siteConfig.name} offers a full spectrum of hair, skin and aesthetic treatments — each personalised after a medical consultation.`}
          />
        </Container>
      </section>

      {serviceCategories.map((category) => {
        const items = getServicesByCategory(category);
        if (items.length === 0) return null;
        return (
          <section
            key={category}
            id={category.toLowerCase()}
            className="scroll-mt-24 py-14 lg:py-20"
          >
            <Container>
              <Reveal>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="text-[0.62rem] font-medium uppercase tracking-[0.35em] text-gold">
                      {category}
                    </span>
                    <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                      {category} Treatments
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-muted">
                    {categoryCopy[category]}
                  </p>
                </div>
                <span className="gold-divider mt-6 block w-full" aria-hidden />
              </Reveal>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                    <GoldCard className="flex h-full flex-col">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                        <ServiceIcon name={service.icon} className="h-6 w-6" />
                      </span>
                      <span className="mt-6 text-[0.58rem] uppercase tracking-[0.28em] text-gold/70">
                        {service.category}
                      </span>
                      <h3 className="mt-2 font-serif text-2xl text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
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
      })}

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[#0C0B09] px-8 py-14 text-center sm:px-16">
              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/12 blur-[110px]" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  Not sure which treatment is right for you?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Book a consultation and our physician will assess your needs
                  and recommend a personalised plan.
                </p>
                <div className="mt-9 flex justify-center">
                  <Button href="/book" size="lg">
                    Book Consultation
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
