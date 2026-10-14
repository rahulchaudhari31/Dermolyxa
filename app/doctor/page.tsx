import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DoctorProfile from "@/components/sections/DoctorProfile";
import { doctor } from "@/data/doctor";

export const metadata: Metadata = {
  title: "The Doctor",
  description:
    "Meet the physician behind Dermolyxa's regenerative and aesthetic practice — qualifications, experience, philosophy and certifications.",
};

export default function DoctorPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-4 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Physician"
            title={doctor.name}
            description={doctor.intro}
          />
        </Container>
      </section>

      <DoctorProfile showHeading={false} className="pt-16" />
    </>
  );
}
