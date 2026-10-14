"use client";

import { Calendar, Phone } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppButton";

export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-black/85 backdrop-blur-xl md:hidden">
      <div className="flex items-stretch gap-2 px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a
          href={siteConfig.phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-gold/40 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-gold"
          aria-label="Call the clinic"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#25D366]/50 text-[#25D366]"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <a
          href="/book"
          className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-gold-gradient text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#1b1404] shadow-gold-soft"
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </a>
      </div>
    </div>
  );
}
