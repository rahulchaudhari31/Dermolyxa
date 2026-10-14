import type { Faq } from "@/data/services";

export const hairTransplantFaqs: Faq[] = [
  {
    question: "Is a hair transplant painful?",
    answer:
      "The procedure is performed under local anaesthesia, so most patients experience pressure rather than pain. Mild soreness and tightness afterwards are common and are usually manageable with standard pain relief. Your physician will discuss comfort management with you.",
  },
  {
    question: "How much does a hair transplant cost?",
    answer:
      "Cost depends on the number of grafts required, the technique used (FUE or DHI) and the extent of restoration. We provide a personalised quote only after a consultation and assessment — we do not quote before understanding your case. Flexible staged plans may be available.",
  },
  {
    question: "What is recovery like?",
    answer:
      "Most patients take a few days to one week away from work. Small scabs typically settle within 7–14 days, and initial healing is usually complete within a couple of weeks. We provide structured aftercare guidance and follow-up reviews.",
  },
  {
    question: "Will my hair shed after the procedure?",
    answer:
      "Some temporary shedding of the transplanted hairs is normal in the first few weeks. This is part of the natural growth cycle rather than a failure of the procedure, and new growth follows in the months afterwards.",
  },
  {
    question: "What is the growth timeline?",
    answer:
      "New growth usually begins within 3–4 months, with the result developing gradually over 12–18 months. Because growth is gradual, patience is important — final results cannot be judged early.",
  },
  {
    question: "Is the result permanent?",
    answer:
      "Transplanted follicles are typically taken from a genetically stable donor area and can continue to grow long-term. Existing, non-transplanted hair may still be subject to ongoing hair loss, which your physician will discuss during assessment.",
  },
  {
    question: "Are there side effects or risks?",
    answer:
      "As with any medical procedure, there are potential risks including swelling, redness, temporary numbness, infection and scarring. Serious complications are uncommon. All risks are explained in full during your consultation before you proceed.",
  },
  {
    question: "Am I eligible for a hair transplant?",
    answer:
      "Adults with stable hair loss and adequate donor hair density are often suitable. Eligibility depends on your medical history, the pattern of hair loss and your goals. Suitability is confirmed during a face-to-face assessment.",
  },
  {
    question: "Will I need to shave my head?",
    answer:
      "It depends on the technique. Some approaches require the donor or recipient area to be trimmed, while others may allow you to keep a longer hairstyle. Your physician will discuss the options and what each involves.",
  },
  {
    question: "Do I need to travel or stay nearby?",
    answer:
      "If you are travelling from out of town, plan to stay locally for approximately 2–5 days for the procedure and an initial review. Our team can help coordinate scheduling and practical arrangements.",
  },
];

export const hairTransplantFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hairTransplantFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
