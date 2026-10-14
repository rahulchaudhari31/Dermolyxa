"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import { navLinks, siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/10 bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo priority />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                  active ? "text-gold" : "text-ink/75 hover:text-gold"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-center bg-gold/70 transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-gold"
            aria-label={`Call ${siteConfig.name}`}
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            {siteConfig.phone}
          </a>
          <Button href="/book" size="sm" variant="primary">
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10 lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l border-gold/15 bg-[#0C0B09] px-6 pb-9 pt-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo onClick={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="gold-divider my-6" aria-hidden />

              <nav className="flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/5 py-3.5 font-serif text-2xl text-ink transition-colors hover:text-gold"
                    >
                      {link.label}
                      <span className="text-xs tracking-widest text-gold/50">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <Button href="/book" size="lg" fullWidth>
                  <Calendar className="h-4 w-4" />
                  Book Consultation
                </Button>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  {siteConfig.phone}
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
