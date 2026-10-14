export type Doctor = {
  id: string;
  name: string;
  role: string;
  photo: string;
  qualification: string;
  experienceYears: string;
  specialties: string[];
};

export const doctors: Doctor[] = [
  {
    id: "doctor-01",
    name: "Dr. A. Khan",
    role: "Founder & Chief Medical Officer",
    photo: "/doctors/doctor-01.jpg",
    qualification: "MBBS, MD (Dermatology)",
    experienceYears: "15+ years",
    specialties: ["Hair Restoration", "Regenerative Therapy"],
  },
  {
    id: "doctor-02",
    name: "Dr. S. Rahman",
    role: "Hair Restoration Surgeon",
    photo: "/doctors/doctor-02.jpg",
    qualification: "MBBS, FUE / DHI Certified",
    experienceYears: "10+ years",
    specialties: ["FUE & DHI", "Hairline Design"],
  },
  {
    id: "doctor-03",
    name: "Dr. M. Noor",
    role: "Aesthetic Physician",
    photo: "/doctors/doctor-03.jpg",
    qualification: "MDS, Aesthetic Medicine",
    experienceYears: "9+ years",
    specialties: ["Injectables", "Skin & Laser"],
  },
  {
    id: "doctor-04",
    name: "Dr. Z. Hassan",
    role: "Regenerative Medicine",
    photo: "/doctors/doctor-04.jpg",
    qualification: "MBBS, MSc Regenerative Medicine",
    experienceYears: "8+ years",
    specialties: ["PRP Therapy", "Trichology"],
  },
];

export const doctorsNote =
  "All treatments are performed by qualified medical professionals following an in-person consultation.";
