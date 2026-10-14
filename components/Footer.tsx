import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";
import { navLinks, siteConfig } from "@/lib/siteConfig";

const socials = [
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: Facebook },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: Youtube },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/15 bg-[#0C0B09]">
      <div className="noise-overlay">
        <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.subTagline}. Physician-led care combining artistry with
              regenerative science.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
              Explore
            </h3>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
              Treatments
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-ink/75">
              <li>Hair Restoration</li>
              <li>Skin &amp; Laser</li>
              <li>Injectables &amp; Fillers</li>
              <li>Regenerative Therapies</li>
              <li>Body Contouring</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
              Visit Us
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-ink/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={siteConfig.emailHref}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/5">
        <Container className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
            <Link href="/quiz" className="transition-colors hover:text-gold">
              Hair Loss Quiz
            </Link>
            <Link href="/book" className="transition-colors hover:text-gold">
              Book Consultation
            </Link>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/5 bg-black/40">
        <Container className="py-5">
          <p className="mx-auto max-w-4xl text-center text-[0.68rem] leading-relaxed text-muted/80">
            <span className="font-medium text-muted">Medical Disclaimer: </span>
            {siteConfig.disclaimer}
          </p>
        </Container>
      </div>
    </footer>
  );
}
