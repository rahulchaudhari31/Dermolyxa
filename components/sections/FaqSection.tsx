import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Faqs from "@/components/sections/Faqs";
import { hairTransplantFaqs, hairTransplantFaqSchema } from "@/data/faqs";
import { resultsNote } from "@/data/services";
import { cn } from "@/lib/cn";

type FaqSectionProps = {
  className?: string;
};

export default function FaqSection({ className }: FaqSectionProps) {
  return (
    <section className={cn("py-24 lg:py-32", className)}>
      {/* FAQ structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hairTransplantFaqSchema) }}
      />

      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title="Hair transplant questions, answered"
          description="Honest answers to the questions we are asked most often. If you are unsure about anything, please book a consultation."
        />
        <Faqs faqs={hairTransplantFaqs} />
        <p className="mt-10 text-center text-xs text-muted/70">{resultsNote}</p>
      </Container>
    </section>
  );
}
