import Image from "next/image";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  Sparkles,
  Quote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { doctor } from "@/data/doctor";
import { cn } from "@/lib/cn";

type DoctorProfileProps = {
  className?: string;
  showHeading?: boolean;
};

export default function DoctorProfile({
  className,
  showHeading = true,
}: DoctorProfileProps) {
  return (
    <section className={cn("py-24 lg:py-32", className)}>
      <Container>
        {showHeading ? (
          <Reveal>
            <SectionHeading
              eyebrow="Meet Your Physician"
              title="Expertise you can trust"
              description="Physician-led care with a conservative, evidence-based philosophy and a focus on natural-looking outcomes."
            />
          </Reveal>
        ) : null}

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Photo + quick facts */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-[#15120d] to-[#0a0a0a]">
                <Image
                  src={doctor.photo}
                  alt={`${doctor.name} — ${doctor.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 border-t border-gold/15 bg-black/55 p-5 backdrop-blur-sm">
                  <p className="font-serif text-xl text-ink">{doctor.name}</p>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-gold">
                    {doctor.role}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gold/15 bg-surface/70 p-4 text-center">
                  <p className="font-serif text-2xl text-gold-gradient">
                    {doctor.experienceYears}
                  </p>
                  <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    Experience
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-surface/70 p-4">
                  <p className="text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    Specialties
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/85">
                    {doctor.specialties.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="space-y-10">
            <Reveal delay={0.06}>
              <p className="text-base leading-relaxed text-ink/85">
                {doctor.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="flex items-center gap-3 font-serif text-xl text-ink">
                <GraduationCap className="h-5 w-5 text-gold" />
                Qualifications
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {doctor.qualifications.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink/80"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="flex items-center gap-3 font-serif text-xl text-ink">
                <Award className="h-5 w-5 text-gold" />
                Experience
              </h3>
              <ul className="mt-4 space-y-3">
                {doctor.experience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink/80"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-[#0C0B09] p-7">
                <Quote className="h-8 w-8 text-gold/50" />
                <h3 className="mt-4 font-serif text-xl text-ink">Philosophy</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {doctor.philosophy}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <h3 className="flex items-center gap-3 font-serif text-xl text-ink">
                <Sparkles className="h-5 w-5 text-gold" />
                Certifications
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {doctor.certifications.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-gold/15 bg-surface/60 px-4 py-3 text-xs leading-relaxed text-ink/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {doctor.memberships.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gold/15 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <Button href="/book" size="lg">
                Book a Consultation
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
