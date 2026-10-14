import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Privacy Policy"
      description="Our commitment to protecting your personal and medical information."
    />
  );
}
