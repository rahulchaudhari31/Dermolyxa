import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/forms/BookingForm";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Request a free consultation at Dermolyxa. Share your details and our team will confirm your appointment.",
};

const perks = [
  "Free initial hair loss consultation",
  "Personalised, no-pressure treatment plan",
  "Physician-led assessment",
  "Your photo and details are kept confidential",
];

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Book Consultation"
            title="Request your free consultation"
            description="Complete the form below and our team will contact you to confirm a convenient time. Prefer to chat? Use WhatsApp at any time."
          />
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <BookingForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-gold/15 bg-surface/70 p-7">
                <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
                  Why Book With Us
                </h3>
                <ul className="mt-5 space-y-3">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink/85"
                    >
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <span className="gold-divider my-7 block w-full" aria-hidden />

                <ul className="space-y-4 text-sm text-ink/80">
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a href={siteConfig.phoneHref} className="hover:text-gold">
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a href={siteConfig.emailHref} className="hover:text-gold">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                      {siteConfig.address.city}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{siteConfig.hours}</span>
                  </li>
                </ul>

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat on WhatsApp
                </a>

                <p className="mt-6 text-[0.68rem] leading-relaxed text-muted/80">
                  Your information is used only to respond to your enquiry. We do
                  not provide medical advice or a diagnosis through this form.
                  Submitting this form does not create a doctor–patient
                  relationship.
                </p>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
