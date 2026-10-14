import { HeartPulse, ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Pillars from "@/components/sections/Pillars";
import WhyDermolyxa from "@/components/sections/WhyDermolyxa";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import DoctorProfile from "@/components/sections/DoctorProfile";
import DoctorsTeam from "@/components/sections/DoctorsTeam";
import RealStories from "@/components/sections/RealStories";
import Pricing from "@/components/sections/Pricing";
import GeneralFaqSection from "@/components/sections/GeneralFaqSection";
import Reveal from "@/components/Reveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      {/* See the results */}
      <Hero />
      <TrustStrip />
      <Pillars />
      <WhyDermolyxa />
      <JourneyTimeline className="border-t border-gold/10 py-24 lg:py-32" />
      <BeforeAfterSection />

      {/* Trust the doctor → read stories → check the price → clear doubts */}
      <DoctorProfile />
      <DoctorsTeam />
      <RealStories />
      <Pricing />
      <GeneralFaqSection />

      {/* Book */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[#0C0B09] px-8 py-16 text-center sm:px-16">
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/12 blur-[110px]" />
              <div className="relative">
                <HeartPulse className="mx-auto h-9 w-9 text-gold" aria-hidden />
                <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
                  Begin your journey at{" "}
                  <span className="text-gold-gradient">{siteConfig.name}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Reserve a private consultation with our physician and receive
                  a personalised treatment plan.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button href="/book" size="lg">
                    Book Free Consultation
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Button>
                  <Button
                    href={siteConfig.phoneHref}
                    size="lg"
                    variant="secondary"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
