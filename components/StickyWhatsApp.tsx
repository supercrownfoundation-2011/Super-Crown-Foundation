"use client";

import React, { useState } from "react";
import { CONTACT_INFO } from "@/data/contactData";
import { WhatsAppIcon } from "./SocialIcons";

export default function StickyWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3"
    >
      {/* Expanding Tooltip Banner on Hover */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E6E0E8] shadow-lg text-[#3C2350] font-sans text-xs font-bold transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-3"
        }`}
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Main Sticky WhatsApp Floating Button */}
      <a
        href={CONTACT_INFO.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat with Super Crown Foundation on WhatsApp"
        title="Chat with us on WhatsApp (96001 51377)"
      >
        {/* Subtle Pulse Radar Wave */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-transform group-hover:rotate-6 duration-300" />
      </a>
    </aside>
  );
}

