import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowLeft } from "lucide-react";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PagePlaceholder({
  eyebrow,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-40">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <Container className="relative">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-gold/15 bg-surface/70 p-8 text-center">
            <p className="font-serif text-xl text-ink">
              This page is coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The layout, components and design system are ready — content for
              this section is being curated.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Button href="/" variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </Button>
              <Button href="/book">Book Consultation</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
