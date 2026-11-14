"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle2, Award } from "lucide-react";

export default function AboutHook() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative rounded-3xl overflow-hidden aspect-[4/3] group border border-[#E6E0E8] shadow-xl bg-[#FAF8F5]">
            <img
              src="/images/authentic/supercrown_legacy_training.webp"
              alt="Super Crown Montessori Teaching Demonstration"
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
            />
            {/* Top Corner Floating Badge */}
            <div className="absolute top-4 left-4 backdrop-blur-md bg-white/90 px-4 py-2.5 rounded-2xl border border-[#E6E0E8] shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3C2350] to-[#291735] text-[#C9A24D] flex items-center justify-center font-heading font-extrabold text-sm shadow-sm">
                16+
              </div>
              <div>
                <span className="font-heading text-xs font-bold text-[#3C2350] block leading-none">Years Legacy</span>
                <span className="font-sans text-[10px] text-[#C9A24D] font-bold uppercase tracking-wider">
                  Pioneer Institution
                </span>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 self-start">
              <Award className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Our Story & Vision
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
              Empowering Confident Educators,{" "}
              <span className="bg-gradient-to-r from-[#C9A24D] to-[#b38b39] bg-clip-text text-transparent">
                Transforming Classrooms.
              </span>
            </h2>

            <p className="font-sans text-base text-[#665D69] leading-relaxed">
              At Super Crown Foundation, we believe exceptional educators are the cornerstone of a thriving society. Founded on the core principles of child respect, acute observation, and practical material mastery, we provide world-class Montessori teacher training tailored for modern classrooms.
            </p>

            <p className="font-sans text-base text-[#665D69] leading-relaxed">
              Our comprehensive curriculum combines immersive hands-on practical sessions, child psychology modules, and real-world placement guidance so you can step into any classroom globally with total confidence.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#241828] bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0E8]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0" /> Practical Material Mastery
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#241828] bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0E8]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0" /> Child Psychology Focus
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#241828] bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0E8]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0" /> Global Accreditation
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#241828] bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0E8]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0" /> Mentorship Network
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#3C2350] text-white px-6 py-3 rounded-xl font-sans text-xs tracking-wider uppercase font-bold hover:bg-[#291735] transition-all shadow-md group"
              >
                Read Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

