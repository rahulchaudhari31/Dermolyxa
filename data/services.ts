export type ServiceCategory = "Hair" | "Skin" | "Aesthetic";

export type ServiceIconKey =
  | "sparkles"
  | "scissors"
  | "user"
  | "eye"
  | "syringe"
  | "dna"
  | "droplets"
  | "gem";

export type JourneyStep = {
  title: string;
  description: string;
};

export type ProcedureStep = {
  title: string;
  description: string;
};

export type DurationItem = {
  label: string;
  value: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: ServiceIconKey;
  shortDescription: string;
  heroSubtitle: string;
  overview: string[];
  whoItsFor: string[];
  procedure: ProcedureStep[];
  durationRecovery: DurationItem[];
  benefits: string[];
  faqs: Faq[];
  journey?: JourneyStep[];
  keywords?: string[];
};

export const resultsNote =
  "Results vary by individual. Consultation required.";

export const services: Service[] = [
  {
    slug: "hair-transplant",
    title: "Hair Transplant (FUE & DHI)",
    category: "Hair",
    icon: "sparkles",
    shortDescription:
      "Follicular unit extraction techniques to restore density and rebuild a natural-looking hairline.",
    heroSubtitle:
      "A physician-led hair restoration procedure using FUE or DHI to relocate healthy follicles and improve hair density.",
    overview: [
      "A hair transplant relocates healthy, genetically stable hair follicles from the donor area (typically the back and sides of the scalp) to areas of thinning or receding hair.",
      "We offer two established techniques — Follicular Unit Extraction (FUE) and Direct Hair Implantation (DHI). Your physician will recommend the approach best suited to your pattern of hair loss and goals.",
      "The focus is on conservative, natural-looking design: restoring density while keeping the hairline appropriate for your age and facial proportions.",
    ],
    whoItsFor: [
      "Adults with stable pattern hair loss or receding hairlines",
      "Those with adequate donor hair density",
      "People seeking a permanent, natural-looking improvement in density",
      "Individuals who understand the gradual nature of post-procedure growth",
    ],
    procedure: [
      {
        title: "Consultation & assessment",
        description:
          "Review of your medical history, pattern of hair loss and expectations, with a scalp and donor-area assessment.",
      },
      {
        title: "Hairline design",
        description:
          "A personalised hairline is mapped to your facial proportions and planned for future ageing.",
      },
      {
        title: "Extraction",
        description:
          "Under local anaesthesia, individual follicular units are carefully extracted from the donor area using FUE or DHI.",
      },
      {
        title: "Implantation",
        description:
          "Grafts are placed at a controlled angle and direction to create natural density and flow.",
      },
      {
        title: "Aftercare & review",
        description:
          "You receive structured aftercare guidance and scheduled follow-up reviews.",
      },
    ],
    durationRecovery: [
      { label: "Procedure time", value: "approx. 6–10 hours" },
      { label: "Initial recovery", value: "7–14 days" },
      { label: "Visible growth", value: "4–6 months onward" },
    ],
    benefits: [
      "Improves hair density in thinning or receding areas",
      "Designed to look natural and age-appropriate",
      "Uses your own genetically stable donor hair",
      "Performed under local anaesthesia by trained clinicians",
      "Personalised hairline mapping for each patient",
    ],
    faqs: [
      {
        question: "Is the procedure painful?",
        answer:
          "The procedure is performed under local anaesthesia. Most patients report pressure or mild discomfort rather than pain. Your physician will discuss comfort management with you.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Transplanted hair typically begins to grow after a few months, with fuller results developing gradually over 12–18 months. Results vary by individual.",
      },
      {
        question: "Will there be scarring?",
        answer:
          "FUE and DHI are designed to minimise visible scarring. Any marks are generally small and dispersed. Your physician will explain what to expect.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "This depends on the extent of hair loss and the number of grafts required. Some patients may benefit from a single session, while others may plan staged sessions.",
      },
    ],
    keywords: ["hair transplant", "FUE", "DHI", "hair restoration"],
  },
  {
    slug: "beard-transplant",
    title: "Beard Transplant",
    category: "Hair",
    icon: "user",
    shortDescription:
      "Restore or reshape beard density and definition using your own donor hair.",
    heroSubtitle:
      "A specialised procedure to improve beard density, fill patchy areas and define beard shape.",
    overview: [
      "A beard transplant uses follicle extraction and implantation techniques to add density to patchy or sparse beards and define beard lines.",
      "The design is tailored to your facial structure and desired style, whether you prefer light stubble or a fuller beard.",
      "As with scalp transplants, the hair is taken from a genetically stable donor area and transplanted to the beard region.",
    ],
    whoItsFor: [
      "Adults with patchy, sparse or uneven beard growth",
      "People wanting to reshape or define beard lines",
      "Those with adequate donor hair density",
      "Individuals with realistic expectations about density and growth",
    ],
    procedure: [
      {
        title: "Consultation & design",
        description:
          "Assessment of your beard pattern and discussion of the desired shape and density.",
      },
      {
        title: "Donor assessment",
        description:
          "Evaluation of the donor area to plan extraction and graft numbers.",
      },
      {
        title: "Extraction & implantation",
        description:
          "Follicles are extracted and placed at natural angles to match beard hair direction.",
      },
      {
        title: "Aftercare",
        description:
          "Guidance on cleaning, healing and the expected growth cycle.",
      },
    ],
    durationRecovery: [
      { label: "Procedure time", value: "approx. 3–6 hours" },
      { label: "Initial recovery", value: "7–10 days" },
      { label: "Visible growth", value: "4–6 months onward" },
    ],
    benefits: [
      "Fills patchy or sparse beard areas",
      "Defines and balances beard shape",
      "Uses your own donor hair",
      "Designed to follow natural beard growth direction",
      "Performed under local anaesthesia",
    ],
    faqs: [
      {
        question: "Will the transplanted beard hair grow like normal beard hair?",
        answer:
          "Transplanted hair takes on characteristics of the beard region over time, though it originates from donor scalp hair. Your physician will explain the expected outcome.",
      },
      {
        question: "Can I shave after the procedure?",
        answer:
          "Shaving is usually avoided for an initial period to allow healing. Your aftercare plan will specify when it is safe to resume.",
      },
      {
        question: "Is one session enough?",
        answer:
          "Many patients achieve their goals in a single session, but the number of sessions depends on the area and density required.",
      },
    ],
    keywords: ["beard transplant", "facial hair", "beard restoration"],
  },
  {
    slug: "eyebrow-transplant",
    title: "Eyebrow Transplant",
    category: "Hair",
    icon: "eye",
    shortDescription:
      "Rebuild sparse or over-plucked eyebrows with precisely placed individual hairs.",
    heroSubtitle:
      "A delicate procedure to restore eyebrow fullness and shape with precisely angled individual hairs.",
    overview: [
      "An eyebrow transplant uses individual hair grafts to restore fullness to eyebrows affected by over-plucking, scarring or naturally sparse growth.",
      "Because eyebrow hairs are fine and grow at a distinct angle, placement is meticulous to achieve a natural, symmetrical result.",
      "The shape is designed with you beforehand to complement your eyes and facial features.",
    ],
    whoItsFor: [
      "Adults with sparse, thin or over-plucked eyebrows",
      "People with eyebrow gaps or asymmetry",
      "Those seeking a permanent improvement in eyebrow fullness",
      "Individuals with suitable donor hair",
    ],
    procedure: [
      {
        title: "Consultation & shaping",
        description:
          "Discussion of your preferred shape and assessment of donor hair.",
      },
      {
        title: "Graft selection",
        description:
          "Fine, single-hair grafts are selected to match the delicate nature of eyebrow hair.",
      },
      {
        title: "Precise implantation",
        description:
          "Hairs are placed individually at natural angles and directions.",
      },
      {
        title: "Healing & review",
        description:
          "Aftercare guidance and follow-up to monitor growth.",
      },
    ],
    durationRecovery: [
      { label: "Procedure time", value: "approx. 2–4 hours" },
      { label: "Initial recovery", value: "5–10 days" },
      { label: "Visible growth", value: "4–6 months onward" },
    ],
    benefits: [
      "Restores fullness to sparse eyebrows",
      "Corrects asymmetry and gaps",
      "Precisely designed shape",
      "Uses fine, natural-looking grafts",
      "Performed under local anaesthesia",
    ],
    faqs: [
      {
        question: "Will the eyebrows look natural?",
        answer:
          "Individual hairs are placed at natural angles to mimic eyebrow growth. The design is agreed with you beforehand to suit your features.",
      },
      {
        question: "How long is recovery?",
        answer:
          "Initial healing typically takes around one week. Some redness or scabbing may occur and settles with aftercare.",
      },
      {
        question: "Will they need trimming?",
        answer:
          "Transplanted hairs may grow longer than native eyebrow hair and sometimes require occasional trimming.",
      },
    ],
    keywords: ["eyebrow transplant", "eyebrow restoration"],
  },
  {
    slug: "prp-hair-therapy",
    title: "PRP Hair Therapy",
    category: "Hair",
    icon: "syringe",
    shortDescription:
      "Platelet-rich plasma therapy to support hair follicles and improve the quality of existing hair.",
    heroSubtitle:
      "A non-surgical therapy using your own platelet-rich plasma to support follicular health.",
    overview: [
      "Platelet-rich plasma (PRP) therapy uses a concentrated portion of your own blood plasma, which contains growth factors, delivered to the scalp.",
      "The aim is to support the hair follicle environment and improve the quality and appearance of existing hair.",
      "PRP is often used alone for early thinning, or alongside a transplant to support the overall result.",
    ],
    whoItsFor: [
      "Adults with early or mild hair thinning",
      "Those wanting a non-surgical approach",
      "Patients supporting results alongside a transplant",
      "Individuals without active scalp infection or certain blood conditions",
    ],
    procedure: [
      {
        title: "Consultation",
        description:
          "Assessment of your hair and scalp, with a discussion of suitability.",
      },
      {
        title: "Blood draw & preparation",
        description:
          "A small blood sample is taken and processed to concentrate the plasma.",
      },
      {
        title: "Delivery",
        description:
          "The plasma is delivered to target areas of the scalp under sterile conditions.",
      },
      {
        title: "Course planning",
        description:
          "A personalised schedule of sessions is planned, with periodic review.",
      },
    ],
    durationRecovery: [
      { label: "Session time", value: "approx. 45–60 minutes" },
      { label: "Downtime", value: "minimal" },
      { label: "Course", value: "typically a series of sessions" },
    ],
    benefits: [
      "Non-surgical and minimally invasive",
      "Uses your own plasma",
      "Minimal downtime",
      "Can complement other hair treatments",
      "Suitable for early-stage thinning",
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        answer:
          "PRP is typically delivered as a course of sessions, with the number advised by your physician based on your assessment.",
      },
      {
        question: "Is there any downtime?",
        answer:
          "Most patients return to normal activities the same day, though temporary tenderness may occur.",
      },
      {
        question: "Can PRP be combined with a transplant?",
        answer:
          "Yes, PRP is sometimes used alongside surgery to support the overall result. Your physician will advise if this is suitable for you.",
      },
    ],
    keywords: ["PRP", "platelet rich plasma", "hair therapy", "hair thinning"],
  },
  {
    slug: "exosome-regenerative-hair-therapy",
    title: "Exosome / Regenerative Hair Therapy",
    category: "Hair",
    icon: "dna",
    shortDescription:
      "Advanced regenerative therapies that aim to support the scalp and follicular environment.",
    heroSubtitle:
      "Regenerative approaches designed to support the health of the scalp and existing hair follicles.",
    overview: [
      "Regenerative hair therapies explore the use of advanced biological preparations to support the scalp environment and existing follicles.",
      "These are emerging, non-surgical options that are used selectively and always following a medical assessment.",
      "They are generally considered supportive treatments rather than a replacement for established procedures.",
    ],
    whoItsFor: [
      "Adults exploring non-surgical, regenerative options",
      "Patients wanting to support existing hair follicles",
      "Those suitable after medical assessment",
      "Individuals with realistic expectations of an emerging therapy",
    ],
    procedure: [
      {
        title: "Medical consultation",
        description:
          "A thorough assessment of suitability and discussion of realistic expectations.",
      },
      {
        title: "Scalp preparation",
        description:
          "The scalp is prepared and treatment areas are mapped.",
      },
      {
        title: "Application",
        description:
          "The regenerative preparation is delivered to targeted areas under sterile conditions.",
      },
      {
        title: "Review",
        description:
          "Scheduled follow-up to assess progress and plan any further sessions.",
      },
    ],
    durationRecovery: [
      { label: "Session time", value: "approx. 45–75 minutes" },
      { label: "Downtime", value: "minimal" },
      { label: "Review", value: "follow-up after a few weeks" },
    ],
    benefits: [
      "Non-surgical approach",
      "Aims to support the scalp environment",
      "Minimal downtime",
      "Can be considered alongside other treatments",
      "Personalised after medical assessment",
    ],
    faqs: [
      {
        question: "Are regenerative therapies proven?",
        answer:
          "These are emerging options with a developing evidence base. Your physician will discuss what is known and what is still being studied before you proceed.",
      },
      {
        question: "Is it suitable for everyone?",
        answer:
          "No. Suitability depends on your medical history and assessment. A consultation is required.",
      },
      {
        question: "How soon might I notice a difference?",
        answer:
          "Timelines vary and are not predictable for every patient. Responses are reviewed at follow-up.",
      },
    ],
    keywords: ["exosome", "regenerative hair", "hair therapy"],
  },
  {
    slug: "skin-treatments",
    title: "Skin Treatments",
    category: "Skin",
    icon: "droplets",
    shortDescription:
      "Medical-grade skin treatments for clarity, texture, tone and overall skin health.",
    heroSubtitle:
      "Personalised skin protocols to improve clarity, texture and an even, healthy tone.",
    overview: [
      "Our skin treatments address a range of concerns including texture, tone, pigmentation, acne scarring and dullness.",
      "A physician assessment determines the most appropriate approach, which may include laser, resurfacing, medical facials or combination protocols.",
      "Plans are staged to suit your skin type and lifestyle, with gradual, natural-looking improvement as the goal.",
    ],
    whoItsFor: [
      "Adults with concerns about texture, tone or pigmentation",
      "Those with acne or post-acne scarring",
      "People seeking a medical-grade skincare plan",
      "Individuals wanting gradual, natural-looking improvement",
    ],
    procedure: [
      {
        title: "Skin assessment",
        description:
          "A detailed consultation to identify your primary concerns and skin type.",
      },
      {
        title: "Plan design",
        description:
          "A personalised protocol, which may combine more than one treatment.",
      },
      {
        title: "Treatment sessions",
        description:
          "Delivered in-clinic under medical supervision, with comfort managed throughout.",
      },
      {
        title: "Review & maintenance",
        description:
          "Progress is reviewed and a maintenance plan is agreed.",
      },
    ],
    durationRecovery: [
      { label: "Session time", value: "approx. 30–75 minutes" },
      { label: "Downtime", value: "varies by treatment" },
      { label: "Results", value: "gradual over a course" },
    ],
    benefits: [
      "Personalised to your skin type",
      "Addresses texture, tone and pigmentation",
      "Can be combined for tailored results",
      "Medically supervised throughout",
      "Supports long-term skin health",
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        answer:
          "Most skin protocols are delivered as a course. The number depends on your concerns and how your skin responds.",
      },
      {
        question: "Is there downtime?",
        answer:
          "Downtime varies by treatment — some have minimal downtime while others may involve a short recovery period. This will be explained in advance.",
      },
      {
        question: "Are results permanent?",
        answer:
          "Results and maintenance needs vary by individual. Ongoing skincare and periodic sessions may help maintain your results.",
      },
    ],
    keywords: ["skin treatments", "laser", "acne scarring", "pigmentation"],
  },
  {
    slug: "aesthetic-treatments",
    title: "Aesthetic Treatments",
    category: "Aesthetic",
    icon: "gem",
    shortDescription:
      "Physician-led injectables and aesthetic enhancements designed to look refined and natural.",
    heroSubtitle:
      "Subtle, physician-led aesthetic treatments that refine rather than change your natural features.",
    overview: [
      "Our aesthetic treatments include injectables and related non-surgical enhancements, always delivered with a conservative, natural-looking approach.",
      "Every treatment begins with a consultation to understand your goals and ensure the plan suits your features and expression.",
      "The emphasis is on refinement — supporting freshness and balance while respecting who you are.",
    ],
    whoItsFor: [
      "Adults considering non-surgical facial enhancement",
      "Those wanting a subtle, natural-looking improvement",
      "People seeking physician-led assessment and planning",
      "Individuals with realistic expectations of aesthetic treatment",
    ],
    procedure: [
      {
        title: "Consultation",
        description:
          "Discussion of your goals and a facial assessment, with honest advice on what is suitable.",
      },
      {
        title: "Treatment plan",
        description:
          "A tailored plan that may combine treatments to achieve balanced, natural results.",
      },
      {
        title: "Treatment",
        description:
          "Performed in-clinic under medical supervision, with comfort prioritised.",
      },
      {
        title: "Review",
        description:
          "A follow-up to review results and plan any maintenance.",
      },
    ],
    durationRecovery: [
      { label: "Session time", value: "approx. 20–60 minutes" },
      { label: "Downtime", value: "often minimal" },
      { label: "Results", value: "reviewed over following weeks" },
    ],
    benefits: [
      "Physician-led assessment and planning",
      "Conservative, natural-looking approach",
      "Personalised to your features",
      "Often minimal downtime",
      "Clear advice on suitable options",
    ],
    faqs: [
      {
        question: "Will it look obvious?",
        answer:
          "Our approach prioritises subtle, natural-looking results. The aim is freshness and balance rather than an altered appearance.",
      },
      {
        question: "How long do results last?",
        answer:
          "Longevity varies by treatment and individual. This is discussed during your consultation.",
      },
      {
        question: "Is a consultation required first?",
        answer:
          "Yes. A consultation is required so your physician can assess suitability and explain the options and risks. Results vary by individual.",
      },
    ],
    keywords: ["aesthetic treatments", "injectables", "fillers", "anti-wrinkle"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}

export const serviceCategories: ServiceCategory[] = [
  "Hair",
  "Skin",
  "Aesthetic",
];
