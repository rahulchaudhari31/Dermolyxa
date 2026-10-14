import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Faqs from "@/components/sections/Faqs";
import Reveal from "@/components/Reveal";
import { generalFaqs, generalFaqSchema } from "@/data/generalFaqs";
import { resultsNote } from "@/data/services";
import { cn } from "@/lib/cn";

type GeneralFaqSectionProps = {
  className?: string;
};

export default function GeneralFaqSection({ className }: GeneralFaqSectionProps) {
  return (
    <section
      id="faq"
      className={cn("border-t border-gold/10 py-24 lg:py-32", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generalFaqSchema) }}
      />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="FAQs"
            title="Questions, answered"
            description="The things patients ask most — from pain and recovery to cost, eligibility and safety. If you are unsure about anything, please book a consultation."
          />
        </Reveal>
        <Faqs faqs={generalFaqs} />
        <p className="mt-10 text-center text-xs text-muted">{resultsNote}</p>
      </Container>
    </section>
  );
}
