import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Aesthetic Artistry",
  description:
    "Physician-led injectables, dermal fillers, skin boosters and thread lifting at Dermolyxa.",
};

export default function AestheticPage() {
  return (
    <PagePlaceholder
      eyebrow="Aesthetic Artistry"
      title="Refined enhancement, naturally yours"
      description="Subtle injectables, fillers and lifting treatments designed to enhance — never overstate — your features."
    />
  );
}
