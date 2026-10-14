import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a consultation with ${siteConfig.name}. Call, message or send us an enquiry.`,
};

const cards = [
  {
    Icon: Phone,
    label: "Call",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: siteConfig.whatsappNumber,
    href: whatsappHref(),
    external: true,
  },
  {
    Icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.emailHref,
  },
  {
    Icon: Clock,
    label: "Hours",
    value: siteConfig.hours,
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 lg:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Book Consultation"
            title="Let's design your treatment plan"
            description="Share a few details and our team will reach out to arrange your private consultation."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, label, value, href, external }, i) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                  {label}
                </p>
                <p className="mt-2 break-words text-sm text-ink/85">{value}</p>
              </>
            );
            const cls =
              "block rounded-2xl border border-gold/15 bg-surface/80 p-6 transition-colors duration-300 hover:border-gold/40";
            return (
              <Reveal key={label} delay={i * 0.08}>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-gold/15 bg-surface/70 p-8 sm:flex-row sm:justify-between">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                  Clinic Address
                </p>
                <p className="mt-2 text-sm text-ink/85">
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.city}, {siteConfig.address.country}
                </p>
              </div>
            </div>
            <Button href={whatsappHref()} size="lg">
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
