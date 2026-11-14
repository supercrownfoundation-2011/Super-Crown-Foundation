"use client";

import React from "react";
import Link from "next/link";
import { BookCheck, Users, Heart, ArrowRight, Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

export default function WhySuperCrownSplit() {
  const valuePoints = [
    {
      icon: BookCheck,
      title: "Practical Learning",
      description: "Over 200+ hours of hands-on material practice, presentation skills, and observation.",
    },
    {
      icon: Users,
      title: "Experienced Guidance",
      description: "Direct mentorship from master trainers with 20+ years of classroom & international experience.",
    },
    {
      icon: Heart,
      title: "Child-Centered Approach",
      description: "Rooted in Maria Montessori's original principles of child respect and sensitive development periods.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Large Image with Floating Stat Badge (5 cols) */}
          <ScrollReveal className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E6E0E8] shadow-2xl bg-[#FAF8F5] h-[400px] sm:h-[480px]">
              <img
                src="/images/authentic/supercrown_legacy_training.webp"
                alt="Super Crown Montessori Teacher Training Session"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Statistic Card over image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-[#E6E0E8] shadow-xl flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center shrink-0 border border-[#C9A227]/30 shadow-md">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="font-heading text-lg sm:text-2xl font-extrabold text-[#3C2350] block leading-none mb-1">
                    16+ Years Legacy
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs text-[#665D69] font-medium">
                    5,000+ Trained Educator Alumni
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Editorial Value Copy & Points (7 cols) */}
          <ScrollReveal delayMs={120} className="lg:col-span-7 flex flex-col gap-6">

            {/* Heading */}
            <TextReveal as="h2" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-[1.15] tracking-tight">
              Empowering Women. <br />
              <span className="text-[#C9A227]">Shaping Futures.</span>
            </TextReveal>

            {/* Supporting Copy */}
            <p className="font-sans text-base text-[#665D69] leading-relaxed">
              We go beyond traditional lectures to provide an immersive, hands-on learning environment. Our trainees master authentic Montessori apparatus presentation, child observation techniques, and modern classroom leadership.
            </p>

            {/* 3 Identical Compact Value Point Cards */}
            <div className="grid grid-cols-1 gap-4 py-2">
              {valuePoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4.5 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E0E8] shadow-xs hover:border-[#3C2350]/30 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center shrink-0 border border-[#C9A227]/30 shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-heading font-extrabold text-base text-[#3C2350] mb-1 group-hover:text-[#291735] transition-colors">
                        {point.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary CTA Button -> Links to /about */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-[#3C2350] text-white px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-xl hover:shadow-[#3C2350]/20 transition-all border border-[#3C2350] gap-2.5 group cursor-pointer active:scale-95"
              >
                <span>Discover Our Approach</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
