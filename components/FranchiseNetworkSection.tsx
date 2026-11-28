"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Building2,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface FranchiseLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  district: string;
}

const FRANCHISE_LOCATIONS: FranchiseLocation[] = [
  {
    id: "01",
    name: "Chidambaram",
    city: "Chidambaram",
    state: "Tamil Nadu",
    district: "Cuddalore District",
    region: "Eastern Tamil Nadu",
  },
  {
    id: "02",
    name: "Hosur",
    city: "Hosur",
    state: "Tamil Nadu",
    district: "Krishnagiri District",
    region: "Northwestern Tamil Nadu",
  },
  {
    id: "03",
    name: "Kanyakumari",
    city: "Kanyakumari",
    state: "Tamil Nadu",
    district: "Kanyakumari District",
    region: "Southern Tamil Nadu",
  },
];

export default function FranchiseNetworkSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/80 relative overflow-hidden">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#3C2350]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C9A227]/40 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <span className="text-[10px] sm:text-xs font-sans font-extrabold tracking-widest text-[#C9A227] uppercase">
              OUR GROWING FRANCHISE NETWORK
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#3C2350] leading-[1.15] tracking-tight">
            Growing Together.{" "}
            <span className="text-[#C9A227] block sm:inline">
              Expanding Educational Opportunities.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
            &ldquo;Our franchise network is extending the Super Crown Foundation educational mission across Tamil Nadu, bringing Montessori teacher training opportunities to more communities.&rdquo;
          </p>
        </ScrollReveal>

        {/* 3 Franchise Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FRANCHISE_LOCATIONS.map((loc, idx) => (
            <ScrollReveal
              key={loc.id}
              delayMs={idx * 100}
              className="bg-[#FAF8F5] rounded-3xl border border-[#E6E0E8] overflow-hidden hover:border-[#3C2350]/40 hover:shadow-saas transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Block with Subtle Cartographic Graphics */}
                <div className="relative p-6 sm:p-7 bg-gradient-to-br from-[#3C2350] via-[#331C44] to-[#291735] text-white overflow-hidden">
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Top Row: Index Badge & Status Pill */}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-extrabold text-[#C9A24D] bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                      LOC {loc.id}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#C9A24D] bg-white/10 px-2.5 py-1 rounded-full border border-[#C9A24D]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                      <span>Authorized Centre</span>
                    </span>
                  </div>

                  {/* Location Graphic Pin & Title */}
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-[#C9A24D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                      {loc.name}
                    </h3>
                    <span className="text-xs text-white/70 font-sans mt-1.5 block">
                      {loc.region}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 sm:p-7 flex flex-col gap-4">
                  {/* City and State with Pin */}
                  <div className="flex items-center gap-2.5 text-sm text-[#3C2350] font-semibold">
                    <MapPin className="w-4 h-4 text-[#C9A227] shrink-0" />
                    <span>
                      {loc.city}, {loc.state}
                    </span>
                  </div>

                  {/* Small Institutional Franchise Label */}
                  <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E6E0E8] self-start shadow-2xs">
                    <Building2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                    <span className="text-xs font-heading font-bold text-[#3C2350]">
                      Super Crown Foundation Franchise
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#665D69] leading-relaxed pt-1">
                    Delivering certified Montessori and Nursery Teacher Training programs with academic guidance and institutional support.
                  </p>
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                <div className="pt-4 border-t border-[#E6E0E8]/70 flex items-center justify-between text-xs text-[#665D69]">
                  <span className="flex items-center gap-1.5 text-[#3C2350] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>0% Royalty Partner</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#C9A24D] font-bold">
                    ESTD NETWORK
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing CTA Container */}
        <ScrollReveal delayMs={300} className="mt-14 lg:mt-18">
          <div className="bg-[#FAF8F5] rounded-3xl border-2 border-[#3C2350]/15 p-8 sm:p-10 lg:p-12 shadow-saas flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                EXPAND WITH US
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350] tracking-tight">
                Become Our Next Franchise Partner
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#665D69] mt-2 leading-relaxed">
                Join our growing network and help shape the future of education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
              <a
                href="#franchise-enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#3C2350] hover:bg-[#291735] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer group"
              >
                <span>Explore Franchise Opportunities</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24D] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
