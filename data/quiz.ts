export type Gender = "male" | "female";

export type DirectionKey = "early" | "moderate" | "advanced" | "female";

export type TreatmentDirection = {
  key: DirectionKey;
  title: string;
  summary: string;
  bullets: string[];
};

export const directions: Record<DirectionKey, TreatmentDirection> = {
  early: {
    key: "early",
    title: "Medical & regenerative focus",
    summary:
      "At this early stage, non-surgical options are usually considered first — supported by a physician assessment.",
    bullets: [
      "PRP / growth-factor therapy",
      "Medical therapy review",
      "Scalp and lifestyle guidance",
      "Monitoring over time",
    ],
  },
  moderate: {
    key: "moderate",
    title: "Transplant likely suitable — combined approach",
    summary:
      "A hair transplant may be appropriate, often combined with medical support to protect existing hair.",
    bullets: [
      "FUE or DHI assessment",
      "Graft estimate based on your pattern",
      "Medical therapy to support existing hair",
      "Personalised hairline design",
    ],
  },
  advanced: {
    key: "advanced",
    title: "Restoration planning with realistic goals",
    summary:
      "Advanced loss can often still be improved, but planning focuses on realistic coverage and density.",
    bullets: [
      "FUE / DHI with a higher graft estimate",
      "A long-term 'master plan' for your hair",
      "Essential donor-area assessment",
      "Possible staged sessions",
    ],
  },
  female: {
    key: "female",
    title: "Medical assessment first",
    summary:
      "Female hair loss has many possible causes, so a medical assessment is the essential first step.",
    bullets: [
      "Investigate underlying causes",
      "PRP / regenerative options",
      "Medical therapy where appropriate",
      "Transplant considered selectively",
    ],
  },
};

export type ScalpStage = {
  id: string;
  scale: "Norwood" | "Ludwig";
  level: number;
  label: string;
  title: string;
  description: string;
  graftMin: number;
  graftMax: number;
  directionKey: DirectionKey;
};

export const norwoodStages: ScalpStage[] = [
  {
    id: "norwood-1",
    scale: "Norwood",
    level: 1,
    label: "Norwood 1",
    title: "Minimal recession",
    description: "Hairline largely intact with very early temple recession.",
    graftMin: 0,
    graftMax: 600,
    directionKey: "early",
  },
  {
    id: "norwood-2",
    scale: "Norwood",
    level: 2,
    label: "Norwood 2",
    title: "Mild recession",
    description: "Slight M-shaped recession at the temples.",
    graftMin: 800,
    graftMax: 1200,
    directionKey: "early",
  },
  {
    id: "norwood-3",
    scale: "Norwood",
    level: 3,
    label: "Norwood 3",
    title: "Early frontal recession",
    description: "Noticeable M-shaped recession extending towards the mid-scalp.",
    graftMin: 1200,
    graftMax: 1800,
    directionKey: "moderate",
  },
  {
    id: "norwood-4",
    scale: "Norwood",
    level: 4,
    label: "Norwood 4",
    title: "Frontal and crown thinning",
    description:
      "Recession and crown thinning with a band of hair between them.",
    graftMin: 2000,
    graftMax: 2600,
    directionKey: "moderate",
  },
  {
    id: "norwood-5",
    scale: "Norwood",
    level: 5,
    label: "Norwood 5",
    title: "Moderate-to-advanced loss",
    description: "Frontal and crown areas broaden; the hair bridge narrows.",
    graftMin: 2600,
    graftMax: 3500,
    directionKey: "advanced",
  },
  {
    id: "norwood-6",
    scale: "Norwood",
    level: 6,
    label: "Norwood 6",
    title: "Advanced loss",
    description: "Frontal and crown loss merge; the bridge is largely gone.",
    graftMin: 3500,
    graftMax: 4500,
    directionKey: "advanced",
  },
  {
    id: "norwood-7",
    scale: "Norwood",
    level: 7,
    label: "Norwood 7",
    title: "Extensive loss",
    description: "Only a horseshoe band of donor hair remains.",
    graftMin: 4500,
    graftMax: 5500,
    directionKey: "advanced",
  },
];

export const ludwigStages: ScalpStage[] = [
  {
    id: "ludwig-1",
    scale: "Ludwig",
    level: 1,
    label: "Ludwig I",
    title: "Mild central thinning",
    description: "Mild widening of the central parting.",
    graftMin: 800,
    graftMax: 1200,
    directionKey: "female",
  },
  {
    id: "ludwig-2",
    scale: "Ludwig",
    level: 2,
    label: "Ludwig II",
    title: "Moderate central thinning",
    description: "Noticeable thinning of the crown and central parting.",
    graftMin: 1500,
    graftMax: 2000,
    directionKey: "female",
  },
  {
    id: "ludwig-3",
    scale: "Ludwig",
    level: 3,
    label: "Ludwig III",
    title: "Advanced central thinning",
    description: "Pronounced thinning with the scalp visible through the hair.",
    graftMin: 2500,
    graftMax: 3000,
    directionKey: "female",
  },
];

export function stagesFor(gender: Gender): ScalpStage[] {
  return gender === "male" ? norwoodStages : ludwigStages;
}

export function getStage(id: string | null): ScalpStage | undefined {
  if (!id) return undefined;
  return [...norwoodStages, ...ludwigStages].find((stage) => stage.id === id);
}

export function graftRangeLabel(min: number, max: number): string {
  if (min === 0) return `Up to ${max.toLocaleString()} grafts`;
  return `${min.toLocaleString()}–${max.toLocaleString()} grafts`;
}

export type QuizOption = {
  value: string;
  label: string;
  hint?: string;
};

export type QuizQuestion = {
  id: "age" | "duration" | "family" | "goals";
  title: string;
  subtitle: string;
  options: QuizOption[];
};

export const ageQuestion: QuizQuestion = {
  id: "age",
  title: "What is your age range?",
  subtitle: "Age helps us understand which options are appropriate to discuss.",
  options: [
    { value: "18–29", label: "18–29" },
    { value: "30–39", label: "30–39" },
    { value: "40–49", label: "40–49" },
    { value: "50+", label: "50+" },
  ],
};

export const durationQuestion: QuizQuestion = {
  id: "duration",
  title: "How long have you noticed hair loss?",
  subtitle: "The rate of change influences how we plan treatment.",
  options: [
    { value: "Less than 1 year", label: "Less than 1 year" },
    { value: "1–3 years", label: "1–3 years" },
    { value: "3–5 years", label: "3–5 years" },
    { value: "5+ years", label: "5+ years" },
    { value: "Not sure", label: "Not sure" },
  ],
};

export const familyQuestion: QuizQuestion = {
  id: "family",
  title: "Is there a family history of hair loss?",
  subtitle: "Genetics often influence the pattern and progression of loss.",
  options: [
    { value: "Yes — father's side", label: "Yes — father's side" },
    { value: "Yes — mother's side", label: "Yes — mother's side" },
    { value: "Yes — both sides", label: "Yes — both sides" },
    { value: "No", label: "No" },
    { value: "Not sure", label: "Not sure" },
  ],
};

export const goalsQuestion: QuizQuestion = {
  id: "goals",
  title: "What matters most to you?",
  subtitle: "Your goals shape the treatment direction we suggest.",
  options: [
    { value: "Restore my hairline", label: "Restore my hairline" },
    { value: "Add overall density", label: "Add overall density" },
    { value: "Look younger", label: "Look younger" },
    { value: "Fix a specific area", label: "Fix a specific area" },
    { value: "Just exploring options", label: "Just exploring options" },
  ],
};

export const quizDisclaimer =
  "This quiz provides general guidance only and is not a medical diagnosis. A consultation is required to assess suitability. Results vary by individual.";
