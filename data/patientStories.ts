export type PatientStory = {
  id: string;
  name: string;
  city: string;
  treatment: string;
  rating: number;
  photo: string;
  quote: string;
};

export const patientStories: PatientStory[] = [
  {
    id: "story-01",
    name: "A. R.",
    city: "London",
    treatment: "Hair Transplant",
    rating: 5,
    photo: "/patients/patient-01.jpg",
    quote:
      "The consultation was thorough and honest. My hairline looks natural and suits my age — exactly what I hoped for.",
  },
  {
    id: "story-02",
    name: "S. M.",
    city: "Manchester",
    treatment: "Beard Transplant",
    rating: 5,
    photo: "/patients/patient-02.jpg",
    quote:
      "Patchy areas filled in beautifully and it still looks like me. The aftercare guidance made recovery straightforward.",
  },
  {
    id: "story-03",
    name: "J. C.",
    city: "Birmingham",
    treatment: "PRP Therapy",
    rating: 5,
    photo: "/patients/patient-03.jpg",
    quote:
      "Non-surgical and easy to fit around work. The team was clear that results vary, which I appreciated.",
  },
  {
    id: "story-04",
    name: "P. K.",
    city: "Dubai",
    treatment: "Aesthetic Treatment",
    rating: 5,
    photo: "/patients/patient-04.jpg",
    quote:
      "Subtle and tasteful. Nobody could tell I had anything done — I just looked refreshed. Very professional throughout.",
  },
];

export const patientStoriesNote =
  "Testimonials reflect individual experiences. Results vary from person to person.";
