"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { MONTESSORI_DIPLOMAS } from "@/data/courses";
import CounsellingModal from "./CounsellingModal";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

export default function ProgramCategories() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquire = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="training-programs" className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          {/* Section Heading */}
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
              DIPLOMA PROGRAMMES
            </span>
            <TextReveal as="h2" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight mb-3">
              Explore Our <span className="text-[#C9A227]">Training Programs</span>
            </TextReveal>
            <TextReveal delayMs={100} as="p" className="font-sans text-base text-[#665D69] leading-relaxed">
              Our primary Montessori teacher training diploma programmes prepare aspiring educators with deep pedagogical knowledge and practical classroom skills.
            </TextReveal>
          </div>

          {/* Two Large Programme Cards Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {MONTESSORI_DIPLOMAS.map((prog, idx) => {
              const isPG = prog.isFeatured;
              const cardBg = isPG ? "bg-[#F3EEF6] border-[#3C2350]/20" : "bg-[#FAF8F5] border-[#E6E0E8]";
              const Icon = isPG ? GraduationCap : Award;

              return (
                <ScrollReveal key={prog.id} delayMs={idx * 120} className="h-full">
                  <div
                    className={`h-full rounded-3xl p-7 sm:p-9 border ${cardBg} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                  >
                  {/* Visual Accent Tag for PG Diploma */}
                  {isPG && (
                    <div className="absolute top-0 right-0 bg-[#3C2350] text-[#C9A227] text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider border-b border-l border-[#C9A227]/30">
                      ADVANCED DIPLOMA
                    </div>
                  )}

                  <div>
                    {/* Header Icon & Category Label */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#3C2350] flex items-center justify-center border border-[#E6E0E8] shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-[#C9A227]" />
                      </div>
                      <span className="font-sans text-[11px] font-extrabold uppercase text-[#C9A227] tracking-wider">
                        {prog.category}
                      </span>
                    </div>

                    {/* Exact Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350] mb-4 leading-tight">
                      {prog.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm sm:text-base text-[#5A4E61] leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    {/* Key Learning Highlights */}
                    <div className="pt-6 border-t border-[#3C2350]/10 mb-8">
                      <h4 className="font-sans text-xs font-extrabold text-[#3C2350] uppercase tracking-wider mb-4">
                        Key Learning Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {prog.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#3C2350]">
                            <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / CTAs */}
                  <div className="pt-6 border-t border-[#3C2350]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      onClick={() => handleEnquire(prog.title)}
                      className="inline-flex items-center justify-center bg-[#3C2350] text-white px-6 py-3.5 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] transition-all shadow-sm gap-2 group/btn cursor-pointer active:scale-95"
                    >
                      Enquire About This Course
                      <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <Link
                      href="/courses"
                      className="font-sans text-xs font-bold text-[#3C2350] hover:text-[#C9A227] transition-colors text-center cursor-pointer py-2"
                    >
                      View Course Details →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
            })}
          </div>
        </div>
      </section>

      {/* Counselling Modal */}
      <CounsellingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCourse={selectedCourse || undefined}
      />
    </>
  );
}
