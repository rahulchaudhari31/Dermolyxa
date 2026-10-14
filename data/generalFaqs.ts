import type { Faq } from "@/data/services";

export const generalFaqs: Faq[] = [
  {
    question: "Is the procedure painful?",
    answer:
      "Treatment is performed under local anaesthesia, so most patients feel pressure or mild discomfort rather than pain. Any soreness afterwards is usually mild and manageable with standard pain relief. Your physician will discuss comfort management with you.",
  },
  {
    question: "How long is recovery?",
    answer:
      "Most patients take a few days to one week away from work. Small scabs typically settle within 7–14 days and initial healing is usually complete within a couple of weeks. We provide structured aftercare and follow-up reviews.",
  },
  {
    question: "When will I see results?",
    answer:
      "New growth usually begins within 3–4 months, with the result developing gradually over 12–18 months. Because growth is gradual, patience is important — final results cannot be judged early.",
  },
  {
    question: "Are the results permanent?",
    answer:
      "Transplanted follicles are typically taken from a genetically stable donor area and can continue to grow long-term. Existing, non-transplanted hair may still be subject to ongoing hair loss, which your physician will discuss during assessment.",
  },
  {
    question: "Who is eligible for treatment?",
    answer:
      "Adults with stable hair loss and adequate donor hair density are often suitable. Eligibility depends on your medical history, the pattern of hair loss and your goals. Suitability is confirmed during a face-to-face assessment.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Cost depends on the number of grafts required, the technique used (FUE or DHI) and the extent of restoration. We provide a personalised quote only after a consultation — we do not quote before understanding your case. Flexible staged plans may be available.",
  },
  {
    question: "What does aftercare include?",
    answer:
      "Aftercare includes written guidance, a care kit, and scheduled follow-up reviews. Our team remains available to answer questions during your recovery and will monitor your progress over time.",
  },
  {
    question: "Is the treatment safe?",
    answer:
      "As with any medical procedure, there are potential risks including swelling, redness, temporary numbness, infection and scarring, though serious complications are uncommon. All risks are explained in full during your consultation before you proceed.",
  },
];

export const generalFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
