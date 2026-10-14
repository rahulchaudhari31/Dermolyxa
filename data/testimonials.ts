export type Testimonial = {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "A. R.",
    treatment: "Hair Transplant",
    rating: 5,
    quote:
      "The consultation was thorough and honest. My hairline looks natural and suits my age — exactly what I hoped for.",
  },
  {
    id: "t2",
    name: "S. M.",
    treatment: "Beard Transplant",
    rating: 5,
    quote:
      "Patchy areas filled in beautifully and it still looks like me. The aftercare guidance made recovery straightforward.",
  },
  {
    id: "t3",
    name: "N. C.",
    treatment: "Skin Treatment",
    rating: 5,
    quote:
      "A staged plan that actually explained the timeline. My skin texture and tone improved gradually and looks healthy.",
  },
  {
    id: "t4",
    name: "F. A.",
    treatment: "PRP Therapy",
    rating: 4,
    quote:
      "Non-surgical and easy to fit around work. The team was clear that results vary, which I appreciated.",
  },
  {
    id: "t5",
    name: "R. K.",
    treatment: "Eyebrow Transplant",
    rating: 5,
    quote:
      "Careful, precise work. My eyebrows look full and symmetrical again. The attention to detail was exceptional.",
  },
  {
    id: "t6",
    name: "H. T.",
    treatment: "Aesthetic Treatment",
    rating: 5,
    quote:
      "Subtle and tasteful. Nobody could tell I had anything done — I just looked refreshed. Very professional throughout.",
  },
  {
    id: "t7",
    name: "M. S.",
    treatment: "Hair Transplant",
    rating: 5,
    quote:
      "From design to follow-up, everything was explained clearly. The clinic felt calm, clean and genuinely caring.",
  },
];

export const testimonialsNote =
  "Testimonials reflect individual experiences. Results vary from person to person.";
