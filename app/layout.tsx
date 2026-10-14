import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cormorant, jost } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBookBar from "@/components/MobileBookBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = `${siteConfig.subTagline}. Luxury skin, hair and aesthetic care at ${siteConfig.name}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description,
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh bg-bg">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-gradient focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-[#1b1404]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <MobileBookBar />
        </Providers>
      </body>
    </html>
  );
}
