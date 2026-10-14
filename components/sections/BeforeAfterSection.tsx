import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";
import { resultCases, resultsDisclaimer } from "@/data/results";

const featured = resultCases.slice(0, 3);

export default function BeforeAfterSection() {
  return (
    <section className="relative border-t border-gold/10 bg-surface/30 py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before & After"
            title="Results worth the wait"
            description="Drag each image to reveal the transformation. Every result is individual — a consultation helps set realistic expectations."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <div>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={`${item.title} — ${item.treatment}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <p className="mt-4 text-[0.56rem] uppercase tracking-[0.26em] text-gold/80">
                  {item.treatment}
                </p>
                <h3 className="mt-1.5 font-serif text-xl text-ink">
                  {item.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="max-w-2xl text-xs leading-relaxed text-muted/80">
            {resultsDisclaimer}
          </p>
          <Button href="/results" variant="secondary">
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
