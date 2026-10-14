import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Hair Restoration",
  description:
    "Regenerative hair restoration, PRP therapy, mesotherapy and transplant assessment at Dermolyxa.",
};

export default function HairPage() {
  return (
    <PagePlaceholder
      eyebrow="Hair Restoration"
      title="Restore density, confident in every strand"
      description="Evidence-based regenerative therapies for thinning hair and hair loss, personalised after a full scalp and follicle assessment."
    />
  );
}
