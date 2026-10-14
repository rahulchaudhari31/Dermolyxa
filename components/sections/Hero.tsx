"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Microscope,
  HeartHandshake,
  ClipboardList,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GoldParticles from "@/components/sections/GoldParticles";
import { siteConfig } from "@/lib/siteConfig";

const ease = [0.22, 1, 0.36, 1] as const;

const badgeIcons = [BadgeCheck, Microscope, HeartHandshake];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-bg pt-28 pb-16">
      <div className="noise-overlay absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)]" />
      <GoldParticles />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image
              src="/logo-dermolyxa.png"
              alt={`${siteConfig.name} logo`}
              width={600}
              height={433}
              priority
              sizes="(max-width: 640px) 220px, 280px"
              className="h-24 w-auto sm:h-28"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-7 text-[0.62rem] font-medium uppercase tracking-[0.38em] text-gold"
          >
            {siteConfig.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease }}
            className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Advanced Regenerative
            <br />
            <span className="text-gold-gradient">&amp; Aesthetic Science</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Natural-looking hair and skin outcomes, designed by physicians using
            advanced regenerative techniques — with a treatment plan built around
            your goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/book" size="lg" className="w-full sm:w-auto">
              Book Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              href="/quiz"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <ClipboardList className="h-4 w-4" />
              Take the Hair Loss Quiz
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {siteConfig.heroTrustBadges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? BadgeCheck;
              return (
                <li
                  key={badge}
                  className="flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink/70"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {badge}
                </li>
              );
            })}
          </motion.ul>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
