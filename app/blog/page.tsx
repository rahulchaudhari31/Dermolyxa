import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on skin, hair and aesthetic medicine from the Dermolyxa team.",
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      eyebrow="Journal"
      title="Insight from the clinic"
      description="Evidence-based articles on regenerative science, skincare and aesthetic medicine."
    />
  );
}
