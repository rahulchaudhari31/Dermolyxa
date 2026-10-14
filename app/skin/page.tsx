import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Skin & Laser",
  description:
    "Medical-grade laser resurfacing, acne and scar revision, and pigmentation correction at Dermolyxa.",
};

export default function SkinPage() {
  return (
    <PagePlaceholder
      eyebrow="Skin & Laser"
      title="Luminous skin, medically engineered"
      description="Advanced laser and skin protocols that refine texture, even tone and restore a healthy, natural glow."
    />
  );
}
