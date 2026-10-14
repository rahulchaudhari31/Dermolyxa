import type { Metadata } from "next";
import PagePlaceholder from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms governing the use of our website and services."
    />
  );
}
