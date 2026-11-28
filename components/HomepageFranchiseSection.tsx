"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Target,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function HomepageFranchiseSection() {
  const highlights = [
    {
      title: "Established Brand Identity",
      icon: ShieldCheck,
    },
    {
      title: "Academic Support",
      icon: BookOpen,
    },
    {
      title: "Training & Curriculum Guidance",
      icon: GraduationCap,
    },
    {
      title: "Marketing Assistance",
      icon: Target,
    },
    {
      title: "Operational Support",
      icon: Building2,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-y border-[#E6E0E8]/80 relative overflow-hidden">
      {/* Subtle Ambient Background Accent */}
      <div className="absolute top-1/2 -left-40 -translate-y-1/2 w-96 h-96 bg-[#3C2350]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Editorial Content (7 cols on lg) */}
          <ScrollReveal className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Small Gold Eyebrow Label */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white border border-[#C9A227]/40 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <span className="text-[10px] sm:text-xs font-sans font-extrabold tracking-widest text-[#C9A227] uppercase">
                GROW WITH SUPER CROWN FOUNDATION
              </span>
            </div>

            {/* Main Heading with Selected Words Highlighted in Champagne Gold */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#3C2350] leading-[1.18] tracking-tight">
              Build a Future in Education.{" "}
              <span className="text-[#C9A227] block sm:inline">
                Become Our Franchise Partner.
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="font-sans text-base sm:text-lg text-[#665D69] leading-relaxed max-w-2xl">
              Be part of our mission to empower women through education and create future educators. Explore the opportunity to establish a Super Crown Foundation training centre with academic guidance, training support and an established institutional identity.
            </p>

            {/* Five Franchise Support Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E6E0E8] shadow-2xs hover:border-[#3C2350]/30 hover:shadow-xs transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6E0E8] text-[#3C2350] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <span className="font-heading text-xs sm:text-sm font-bold text-[#3C2350]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-4">
              {/* Primary Purple CTA */}
              <Link
                href="/franchise"
                className="inline-flex items-center justify-center gap-2.5 bg-[#3C2350] hover:bg-[#291735] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer group"
              >
                <span>Explore Franchise Opportunities</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24D] transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Text Link */}
              <Link
                href="/franchise"
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-heading font-extrabold text-[#3C2350] hover:text-[#C9A227] transition-colors py-2 group cursor-pointer"
              >
                <span>Learn About Our Partnership Model</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24D] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </ScrollReveal>

          {/* RIGHT COLUMN: Authentic Visual (5 cols on lg) */}
          <ScrollReveal delayMs={120} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle Gold Accent Frame / Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C9A227]/25 via-transparent to-[#3C2350]/15 blur-sm -z-10" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#C9A227]/40 shadow-saas-lg bg-[#3C2350] aspect-[4/3] sm:aspect-[4/3]">
                <Image
                  src="/images/authentic/hero_authentic_guidance.webp"
                  alt="Super Crown Foundation women educators participating in a Montessori teacher training environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />

                {/* Subtle Institutional Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Label: Franchise Opportunity 2026 */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#3C2350]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-[#C9A227]/50 shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-sans font-extrabold tracking-wider text-[#C9A24D] uppercase">
                    Franchise Opportunity 2026
                  </span>
                </div>

                {/* Bottom Floating Info Pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#E6E0E8] shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C9A227] block">
                        INSTITUTIONAL PARTNERSHIP
                      </span>
                      <span className="text-xs font-bold text-[#3C2350]">
                        Super Crown Foundation
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#3C2350] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                    0% Royalty
                  </span>
                </div>

              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
