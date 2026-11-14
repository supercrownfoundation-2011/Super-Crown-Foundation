"use client";

import React from "react";
import { Sparkles, CheckCircle2, Award } from "lucide-react";

interface TickerItem {
  id: string;
  type: "stat" | "logo" | "feature";
  statNumber?: string;
  title: string;
  subtitle: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  icon?: React.ElementType;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: "experience",
    type: "stat",
    statNumber: "16+",
    title: "Years of Experience",
    subtitle: "Montessori Teacher Training",
  },
  {
    id: "placement",
    type: "stat",
    statNumber: "100%",
    title: "Placement Support",
    subtitle: "Career Guidance & Placement Assistance",
  },
  {
    id: "aqc",
    type: "logo",
    title: "AQC Certified",
    subtitle: "Quality Management System",
    logoSrc: "/assets/logos/aqc.webp",
    logoAlt: "AQC Quality Management System Certification Logo",
    logoWidth: 92,
    logoHeight: 54,
  },
  {
    id: "uaf",
    type: "logo",
    title: "UAF Accredited",
    subtitle: "United Accreditation Foundation",
    logoSrc: "/assets/logos/uaf.webp",
    logoAlt: "UAF United Accreditation Foundation Logo",
    logoWidth: 99,
    logoHeight: 54,
  },
  {
    id: "iaf",
    type: "logo",
    title: "IAF Recognized",
    subtitle: "International Accreditation Forum",
    logoSrc: "/assets/logos/iaf.webp",
    logoAlt: "IAF International Accreditation Forum Logo",
    logoWidth: 75,
    logoHeight: 54,
  },
  {
    id: "practical-learning",
    type: "feature",
    title: "Practical Learning",
    subtitle: "Hands-on Montessori Training",
    icon: Sparkles,
  },
  {
    id: "expert-mentorship",
    type: "feature",
    title: "Expert Mentorship",
    subtitle: "Guidance from Experienced Trainers",
    icon: CheckCircle2,
  },
  {
    id: "professional-development",
    type: "feature",
    title: "Professional Development",
    subtitle: "Building Confident Educators",
    icon: Award,
  },
];

// Helper to render an individual ticker item with strict vertical alignment
function TickerItemNode({ item }: { item: TickerItem }) {
  if (item.type === "stat") {
    return (
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <span className="font-heading font-extrabold text-lg sm:text-2xl text-[#C9A227] tracking-tight leading-none">
          {item.statNumber}
        </span>
        <div className="flex flex-col justify-center">
          <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3C2350] tracking-tight leading-tight whitespace-nowrap">
            {item.title}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] text-[#665D69] font-medium leading-tight whitespace-nowrap">
            {item.subtitle}
          </span>
        </div>
      </div>
    );
  }

  if (item.type === "logo") {
    return (
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="h-8 sm:h-9 flex items-center shrink-0">
          <img
            src={item.logoSrc}
            alt={item.logoAlt}
            width={item.logoWidth}
            height={item.logoHeight}
            className="h-7 sm:h-9 w-auto object-contain shrink-0"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3C2350] tracking-tight leading-tight whitespace-nowrap">
            {item.title}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] text-[#665D69] font-medium leading-tight whitespace-nowrap">
            {item.subtitle}
          </span>
        </div>
      </div>
    );
  }

  const Icon = item.icon || Sparkles;
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3C2350]/5 border border-[#3C2350]/10 flex items-center justify-center shrink-0 text-[#C9A227]">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227]" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3C2350] tracking-tight leading-tight whitespace-nowrap">
          {item.title}
        </span>
        <span className="font-sans text-[10px] sm:text-[11px] text-[#665D69] font-medium leading-tight whitespace-nowrap">
          {item.subtitle}
        </span>
      </div>
    </div>
  );
}

export default function TrustTicker() {
  // Render two full sets inside the continuous track to ensure 100% mathematically seamless infinite scrolling
  return (
    <section
      aria-label="Institutional Trust and Credentials"
      className="ticker-container relative w-full overflow-hidden bg-[#FAF8F5] border-y border-[#E6E0E8]/75 py-3.5 sm:py-4 select-none"
    >
      {/* Side Vignette Fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Marquee Track: Seamless translate3d(-50%, 0, 0) */}
      <div className="animate-ticker flex items-center">
        {/* Sequence 1 */}
        <div className="flex items-center shrink-0">
          {TICKER_ITEMS.map((item) => (
            <React.Fragment key={`seq1-${item.id}`}>
              <TickerItemNode item={item} />
              <span
                className="text-[#C9A227] text-xs font-bold select-none mx-5 sm:mx-8 shrink-0 opacity-80"
                aria-hidden="true"
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Sequence 2 (Identical mirror for seamless loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {TICKER_ITEMS.map((item) => (
            <React.Fragment key={`seq2-${item.id}`}>
              <TickerItemNode item={item} />
              <span
                className="text-[#C9A227] text-xs font-bold select-none mx-5 sm:mx-8 shrink-0 opacity-80"
                aria-hidden="true"
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

