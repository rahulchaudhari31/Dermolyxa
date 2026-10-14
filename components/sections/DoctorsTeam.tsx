import Image from "next/image";
import { BadgeCheck, Stethoscope } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { doctors, doctorsNote } from "@/data/doctors";
import { cn } from "@/lib/cn";

type DoctorsTeamProps = {
  className?: string;
};

export default function DoctorsTeam({ className }: DoctorsTeamProps) {
  return (
    <section
      id="doctors"
      className={cn("border-t border-gold/10 py-24 lg:py-32", className)}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Meet Our Doctors"
            title="A team you can trust"
            description="Specialists across hair restoration, aesthetics and regenerative medicine — united by a conservative, patient-first approach."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-surface/60 transition-colors duration-500 hover:border-gold/40">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#15120d] to-[#0a0a0a]">
                  <Image
                    src={doctor.photo}
                    alt={`${doctor.name} — ${doctor.role}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-gold/30 bg-black/60 px-3 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                    {doctor.experienceYears}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl leading-snug text-ink">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                    {doctor.role}
                  </p>

                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {doctor.qualification}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {doctor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/15 px-3 py-1 text-[0.58rem] uppercase tracking-[0.12em] text-ink/75"
                      >
                        <Stethoscope className="h-3 w-3 text-gold" />
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted">{doctorsNote}</p>
      </Container>
    </section>
  );
}
