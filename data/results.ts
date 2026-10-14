export type ResultTreatment =
  | "Hair Transplant"
  | "Beard Transplant"
  | "Eyebrow Transplant"
  | "PRP Therapy"
  | "Skin"
  | "Aesthetic";

export type ResultCase = {
  id: string;
  treatment: ResultTreatment;
  title: string;
  description: string;
  detail: string;
  before: string;
  after: string;
};

export const resultCases: ResultCase[] = [
  {
    id: "hair-transplant-01",
    treatment: "Hair Transplant",
    title: "Frontal hairline restoration",
    description:
      "FUE procedure to rebuild a receding frontal hairline with a natural growth pattern.",
    detail: "Grafts: 2,500 · Technique: FUE · Review: 12 months",
    before: "/results/hair-transplant-01-before.jpg",
    after: "/results/hair-transplant-01-after.jpg",
  },
  {
    id: "hair-transplant-02",
    treatment: "Hair Transplant",
    title: "Crown density improvement",
    description:
      "DHI procedure to improve density in the crown region for a fuller appearance.",
    detail: "Grafts: 3,000 · Technique: DHI · Review: 12 months",
    before: "/results/hair-transplant-02-before.jpg",
    after: "/results/hair-transplant-02-after.jpg",
  },
  {
    id: "beard-transplant-01",
    treatment: "Beard Transplant",
    title: "Beard fullness and definition",
    description:
      "Beard transplant to fill patchy areas and define the beard line.",
    detail: "Grafts: 1,500 · Technique: FUE · Review: 9 months",
    before: "/results/beard-transplant-01-before.jpg",
    after: "/results/beard-transplant-01-after.jpg",
  },
  {
    id: "eyebrow-transplant-01",
    treatment: "Eyebrow Transplant",
    title: "Eyebrow restoration",
    description:
      "Individual hair grafts to restore fullness and symmetry to sparse eyebrows.",
    detail: "Grafts: 400 · Technique: DHI · Review: 8 months",
    before: "/results/eyebrow-transplant-01-before.jpg",
    after: "/results/eyebrow-transplant-01-after.jpg",
  },
  {
    id: "prp-01",
    treatment: "PRP Therapy",
    title: "PRP hair therapy course",
    description:
      "A course of platelet-rich plasma sessions to support the appearance of existing hair.",
    detail: "Sessions: 4 · Interval: 4 weeks · Review: 6 months",
    before: "/results/prp-01-before.jpg",
    after: "/results/prp-01-after.jpg",
  },
  {
    id: "skin-01",
    treatment: "Skin",
    title: "Texture and clarity protocol",
    description:
      "A staged skin protocol to improve texture and promote an even tone.",
    detail: "Sessions: 3 · Type: Laser · Review: 3 months",
    before: "/results/skin-01-before.jpg",
    after: "/results/skin-01-after.jpg",
  },
  {
    id: "skin-02",
    treatment: "Skin",
    title: "Pigmentation correction",
    description:
      "Targeted treatment for uneven pigmentation and a more uniform complexion.",
    detail: "Sessions: 4 · Type: Combined · Review: 4 months",
    before: "/results/skin-02-before.jpg",
    after: "/results/skin-02-after.jpg",
  },
  {
    id: "aesthetic-01",
    treatment: "Aesthetic",
    title: "Natural facial refresh",
    description:
      "Conservative injectable treatment to refresh features while respecting natural expression.",
    detail: "Sessions: 1 · Type: Injectable · Review: 6 weeks",
    before: "/results/aesthetic-01-before.jpg",
    after: "/results/aesthetic-01-after.jpg",
  },
];

export const resultCategories: Array<ResultTreatment | "All"> = [
  "All",
  "Hair Transplant",
  "Beard Transplant",
  "Eyebrow Transplant",
  "PRP Therapy",
  "Skin",
  "Aesthetic",
];

export const resultsDisclaimer =
  "Images are of individual patients and are shown for illustration only. Results vary from person to person and are not a guarantee of outcome. A consultation is required to discuss realistic expectations.";
