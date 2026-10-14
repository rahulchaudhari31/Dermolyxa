export type DoctorProfile = {
  name: string;
  role: string;
  photo: string;
  intro: string;
  experienceYears: string;
  qualifications: string[];
  experience: string[];
  philosophy: string;
  certifications: string[];
  memberships: string[];
  specialties: string[];
};

export const doctor: DoctorProfile = {
  name: "Dr. Full Name",
  role: "Founder & Chief Medical Officer",
  photo: "/doctor/founder.jpg",
  intro:
    "A physician-led aesthetic practice founded on natural, evidence-based results and a patient-first approach.",
  experienceYears: "15+ years",
  qualifications: [
    "MBBS — Bachelor of Medicine & Surgery",
    "MD — Dermatology",
    "Fellowship — Regenerative & Aesthetic Medicine",
    "Advanced Training — Hair Restoration Surgery",
  ],
  experience: [
    "Performed 5,000+ hair restoration procedures",
    "Lead physician across skin and aesthetic services",
    "Trainer for advanced injectable techniques",
    "Speaker at regional aesthetic medicine conferences",
  ],
  philosophy:
    "Our philosophy is conservative and honest. We recommend only what is appropriate for you, explain the realistic range of outcomes, and design treatment plans that respect your natural features rather than pursue trends.",
  certifications: [
    "Board Certified — Aesthetic Medicine",
    "Certified — Advanced Injectables",
    "Certified — Follicular Unit Extraction (FUE)",
    "Certified — Direct Hair Implantation (DHI)",
    "Certification — Regenerative Therapies",
    "Certification — Laser & Energy Devices",
  ],
  memberships: [
    "International Society of Hair Restoration Surgery",
    "Regional Dermatology Association",
    "Aesthetic Medicine Academy",
  ],
  specialties: [
    "Hair Restoration",
    "Regenerative Therapy",
    "Injectables",
    "Laser & Skin",
  ],
};
