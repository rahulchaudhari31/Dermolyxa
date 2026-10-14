export const siteConfig = {
  name: "Dermolyxa",
  tagline: "Skin • Hair • Aesthetic",
  subTagline: "Advanced Regenerative & Aesthetic Science",

  phone: "+44 20 7946 0958",
  phoneHref: "tel:+442079460958",

  whatsappNumber: "+442079460958",
  whatsappMessage:
    "Hello Dermolyxa, I would like to book a consultation.",

  email: "hello@dermolyxa.com",
  emailHref: "mailto:hello@dermolyxa.com",

  address: {
    line1: "Harley Street Medical District",
    line2: "Suite 210",
    city: "London",
    country: "United Kingdom",
  },

  hours: "Mon – Sat · 9:00 AM – 7:00 PM",

  socials: {
    instagram: "https://instagram.com/dermolyxa",
    facebook: "https://facebook.com/dermolyxa",
    youtube: "https://youtube.com/@dermolyxa",
    linkedin: "https://linkedin.com/company/dermolyxa",
  },

  heroTrustBadges: [
    "Physician-Led Care",
    "Regenerative Technology",
    "Natural-Looking Results",
  ],

  // Trust strip counters — replace these sample numbers with real figures.
  stats: [
    { label: "Years of Experience", value: 12, suffix: "+" },
    { label: "Successful Grafts", value: 5000, suffix: "+" },
    { label: "Happy Patients", value: 8000, suffix: "+" },
    { label: "Expert Doctors", value: 6, suffix: "" },
  ],

  journeySteps: [
    {
      title: "Consultation",
      description:
        "A private consultation to understand your goals, medical history and expectations.",
    },
    {
      title: "Hair Analysis",
      description:
        "Detailed scalp and donor-area assessment, with density mapping and photography.",
    },
    {
      title: "Hairline Design",
      description:
        "A personalised hairline designed around your facial proportions and future ageing.",
    },
    {
      title: "Procedure",
      description:
        "Your treatment is performed by our medical team in a sterile, modern suite.",
    },
    {
      title: "Recovery",
      description:
        "Structured aftercare guidance and scheduled follow-up support as you heal.",
    },
    {
      title: "Growth Timeline",
      description:
        "New growth develops gradually over the months ahead. Results vary by individual.",
    },
  ],

  disclaimer:
    "The content on this website is for informational purposes only and does not constitute medical advice. Results vary from person to person. All treatments are performed by qualified medical professionals following an in-person consultation.",
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hair", href: "/hair" },
  { label: "Skin", href: "/skin" },
  { label: "Aesthetic", href: "/aesthetic" },
  { label: "Results", href: "/results" },
  { label: "Doctor", href: "/doctor" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message: string): string {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function whatsappHref(): string {
  return whatsappLink(siteConfig.whatsappMessage);
}
