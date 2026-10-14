export type PricingPlan = {
  id: "basic" | "advanced" | "premium";
  name: string;
  tagline: string;
  priceLabel: string;
  grafts: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For early recession and smaller sessions.",
    priceLabel: "From £1,900",
    grafts: "Up to 1,500 grafts",
    features: [
      "Consultation & hair analysis",
      "FUE technique",
      "Local anaesthesia & comfort care",
      "Aftercare kit & guidance",
      "1 follow-up review",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    tagline: "Our most requested package.",
    priceLabel: "From £2,900",
    grafts: "1,500–3,000 grafts",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Basic",
      "FUE or DHI technique",
      "PRP add-on to support growth",
      "Personalised hairline design",
      "2 follow-up reviews",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For maximum density and coverage.",
    priceLabel: "From £4,500",
    grafts: "3,000+ grafts / staged plan",
    features: [
      "Everything in Advanced",
      "DHI technique & dense packing",
      "PRP package",
      "Priority scheduling",
      "Extended aftercare & 3 follow-ups",
    ],
  },
];

export const pricingDisclaimer =
  "Final price depends on the number of grafts required after your consultation. A personalised quote is provided only after an in-person assessment — never before. Results vary by individual.";
