import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import HairLossQuiz from "@/components/quiz/HairLossQuiz";
import GraftCalculator from "@/components/quiz/GraftCalculator";

export const metadata: Metadata = {
  title: "Hair Loss Quiz",
  description:
    "Answer a few quick questions to understand your hair loss pattern and the direction a consultation might take at Dermolyxa.",
};

export default function QuizPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Hair Loss Quiz"
            title="Understand your hair loss in under a minute"
            description="Answer six quick questions and receive general guidance on the treatment direction that may suit you. It is not a diagnosis — a consultation confirms suitability."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <HairLossQuiz />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <GraftCalculator />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
