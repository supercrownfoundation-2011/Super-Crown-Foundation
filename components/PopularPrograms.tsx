"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  SpellCheck,
  Calculator,
  PenTool,
  Brain,
  Users,
  BookOpen,
  Smile,
  Heart,
  Shapes,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { PROFESSIONAL_CERTIFICATIONS } from "@/data/courses";
import CounsellingModal from "./CounsellingModal";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

export default function PopularPrograms() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleEnquire = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
      const cardWidth = card ? card.offsetWidth : 320;
      const gap = 24;
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "SpellCheck":
        return SpellCheck;
      case "Calculator":
        return Calculator;
      case "PenTool":
        return PenTool;
      case "Brain":
        return Brain;
      case "Users":
        return Users;
      case "BookOpen":
        return BookOpen;
      case "Smile":
        return Smile;
      case "Heart":
        return Heart;
      case "Shapes":
        return Shapes;
      case "Lightbulb":
        return Lightbulb;
      default:
        return BookOpen;
    }
  };

  // Harmonized background styling with subtle borders
  const bgClasses = [
    { card: "bg-[#F3EEF6] border-[#3C2350]/15", tag: "bg-white/90 text-[#3C2350]" },
    { card: "bg-[#FAF8F5] border-[#E6E0E8]", tag: "bg-[#F3EEF6] text-[#3C2350]" },
    { card: "bg-[#FBF4E4] border-[#C9A227]/30", tag: "bg-white/90 text-[#8B6E14]" },
  ];

  return (
    <>
      <section
        id="certification-courses"
        aria-label="Professional Certification Courses"
        className="py-20 md:py-28 bg-white border-y border-[#E6E0E8]/70"
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          {/* Header Row with Title & Carousel Navigation Controls */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                  ACCREDITED TEACHER TRAININGS
                </span>
                <TextReveal as="h2" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
                  Explore Our <br />
                  <span className="text-[#C9A227]">Professional Certification Courses</span>
                </TextReveal>
              </div>

              <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-4 shrink-0">
                {/* Carousel Controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleScroll("left")}
                    style={{ touchAction: "manipulation" }}
                    className="w-11 h-11 rounded-full border border-[#E6E0E8] bg-[#FAF8F5] text-[#3C2350] flex items-center justify-center hover:bg-[#3C2350] hover:text-white hover:border-[#3C2350] focus-visible:outline-2 focus-visible:outline-[#3C2350] focus-visible:outline-offset-2 transition-all cursor-pointer shadow-xs active:scale-95 select-none"
                    aria-label="Previous courses"
                  >
                    <ArrowLeft className="w-4 h-4 pointer-events-none" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScroll("right")}
                    style={{ touchAction: "manipulation" }}
                    className="w-11 h-11 rounded-full border border-[#3C2350] bg-[#3C2350] text-[#C9A227] flex items-center justify-center hover:bg-[#291735] hover:border-[#291735] focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2 transition-all cursor-pointer shadow-sm active:scale-95 select-none"
                    aria-label="Next courses"
                  >
                    <ArrowRight className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>

                {/* View All Courses Link */}
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-[#3C2350] px-5 py-3 rounded-xl border border-[#E6E0E8] font-sans text-xs font-extrabold tracking-wider uppercase hover:border-[#3C2350] hover:bg-[#3C2350] hover:text-white focus-visible:outline-2 focus-visible:outline-[#3C2350] focus-visible:outline-offset-2 transition-all shadow-xs group cursor-pointer"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontally Scrollable Cards Container */}
          <ScrollReveal delayMs={100}>
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none"
              tabIndex={0}
              aria-label="Scrollable course list"
            >
            {PROFESSIONAL_CERTIFICATIONS.map((cert, idx) => {
              const IconComp = getIconComponent(cert.iconName);
              const scheme = bgClasses[idx % bgClasses.length];
              const formattedIndex = (idx + 1).toString().padStart(2, "0");

              return (
                <div
                  key={cert.id}
                  onClick={() => handleEnquire(cert.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleEnquire(cert.title);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${cert.title} - Click to enquire`}
                  className={`snap-start w-[calc(100vw-48px)] sm:w-[340px] sm:min-w-[340px] max-w-[350px] rounded-3xl border ${scheme.card} shadow-xs hover:shadow-xl hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-[#3C2350] focus-visible:ring-offset-2 transition-all duration-300 flex flex-col justify-between group shrink-0 cursor-pointer overflow-hidden bg-clip-padding`}
                >
                  {/* Top: Photo with Consistent Aspect Ratio & Overlays */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E6E0E8] shrink-0">
                    <img
                      src={cert.image}
                      alt={cert.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Subtle contrast gradient scrim for text readability */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
                      aria-hidden="true"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      {/* Icon Badge */}
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md p-2 text-[#3C2350] flex items-center justify-center border border-white/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <IconComp className="w-5 h-5 text-[#C9A227]" />
                      </div>

                      {/* Course Number Badge */}
                      <span className="font-heading text-xs font-extrabold text-[#3C2350] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-sm">
                        {formattedIndex}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Exact Course Title */}
                      <h3 className="font-heading text-xl font-extrabold text-[#3C2350] mb-2.5 group-hover:text-[#291735] transition-colors leading-snug">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed mb-6 line-clamp-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Bottom Row: Pill Tag & Arrow Button */}
                    <div className="pt-4 border-t border-[#3C2350]/10 flex justify-between items-center">
                      <span className={`font-sans text-[11px] font-bold px-3.5 py-1 rounded-full border border-[#E6E0E8] shadow-2xs ${scheme.tag}`}>
                        Certification
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(cert.title);
                        }}
                        className="w-9 h-9 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center group-hover:bg-[#291735] group-hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#C9A227] transition-all cursor-pointer active:scale-90"
                        aria-label={`Enquire for ${cert.title}`}
                      >
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
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
