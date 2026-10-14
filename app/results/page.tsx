import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ResultsGallery from "@/components/sections/ResultsGallery";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Before and after results from Dermolyxa's hair, skin and aesthetic treatments. Drag to compare. Individual results vary.",
};

export default function ResultsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Real Results"
            title="Before & after gallery"
            description="Drag the handle on any image to reveal the transformation. Filter by treatment to see relevant cases."
          />
        </Container>
      </section>

      <ResultsGallery />
    </>
  );
}
