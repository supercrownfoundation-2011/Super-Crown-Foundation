"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Award, BookOpen } from "lucide-react";
import { MONTESSORI_DIPLOMAS, PROFESSIONAL_CERTIFICATIONS } from "@/data/courses";
import CounsellingModal from "./CounsellingModal";

export default function FeaturedCourses() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquire = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col gap-20">
          
          {/* CATEGORY 1: MONTESSORI DIPLOMAS */}
          <div>
            <div className="mb-10">
              <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                FLAGSHIP PROGRAMMES
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350] tracking-tight">
                Montessori Teacher Training Diplomas
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#665D69] mt-2 max-w-2xl">
                Comprehensive diploma programmes designed to provide foundational and advanced knowledge of Montessori philosophy, pedagogy, and practical classroom teaching.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {MONTESSORI_DIPLOMAS.map((prog) => {
                const isPG = prog.isFeatured;
                const cardBg = isPG ? "bg-[#F3EEF6] border-[#3C2350]/20" : "bg-white border-[#E6E0E8]";
                const Icon = isPG ? GraduationCap : Award;

                return (
                  <div
                    key={prog.id}
                    className={`rounded-3xl p-8 sm:p-10 border ${cardBg} shadow-md flex flex-col justify-between group relative overflow-hidden`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white text-[#3C2350] flex items-center justify-center border border-[#E6E0E8] shadow-xs">
                          <Icon className="w-6 h-6 text-[#C9A227]" />
                        </div>
                        <span className="font-sans text-[11px] font-extrabold uppercase text-[#C9A227] tracking-wider">
                          {prog.category}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350] mb-4 leading-tight">
                        {prog.title}
                      </h3>

                      <p className="font-sans text-sm sm:text-base text-[#5A4E61] leading-relaxed mb-6">
                        {prog.description}
                      </p>

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

                    <div className="pt-6 border-t border-[#3C2350]/10 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/courses/${prog.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2350] hover:text-[#C9A227] transition-colors"
                      >
                        View Full Syllabus & Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleEnquire(prog.title)}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#3C2350] text-white px-6 py-3 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] transition-all shadow-sm gap-2 cursor-pointer active:scale-95"
                      >
                        Enquire Now
                        <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CATEGORY 2: PROFESSIONAL CERTIFICATION COURSES */}
          <div>
            <div className="mb-10">
              <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                SKILL CERTIFICATIONS
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350] tracking-tight">
                Professional Certification Courses
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#665D69] mt-2 max-w-2xl">
                Focused training programmes designed to build specialized knowledge across key domain areas of teaching and child development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROFESSIONAL_CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E6E0E8] shadow-xs hover:shadow-xl hover:border-[#C9A227]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E6E0E8]">
                    <img
                      src={cert.image}
                      alt={cert.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md p-2 text-[#3C2350] flex items-center justify-center border border-white/40 shadow-xs">
                      <BookOpen className="w-4 h-4 text-[#C9A227]" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-heading text-lg font-extrabold text-[#3C2350] mb-2 leading-snug group-hover:text-[#291735] transition-colors">
                        {cert.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed mb-6">
                        {cert.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E6E0E8] flex items-center justify-between gap-2">
                      <Link
                        href={`/courses/${cert.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3C2350] hover:text-[#C9A227] transition-colors"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                      </Link>
                      <button
                        onClick={() => handleEnquire(cert.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#3C2350] bg-[#F3EEF6] px-3.5 py-1.5 rounded-xl border border-[#E6E0E8] hover:bg-[#3C2350] hover:text-white transition-all cursor-pointer shadow-2xs"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
