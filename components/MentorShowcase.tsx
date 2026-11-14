"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MENTORS_DATA } from "@/data/mentorData";
import ScrollReveal from "./ScrollReveal";

export default function MentorShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, MENTORS_DATA.length - cardsPerView);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.firstElementChild?.clientWidth || 320;
      const gap = 24;
      const index = Math.round(scrollPosition / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(index, 0), maxIndex));
    }
  };

  const scrollToCard = (index: number) => {
    const clampedIndex = Math.min(Math.max(index, 0), maxIndex);
    setActiveIndex(clampedIndex);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 320;
      const gap = 24;
      container.scrollTo({
        left: clampedIndex * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const isPrevDisabled = activeIndex <= 0;
  const isNextDisabled = activeIndex >= maxIndex;

  const handlePrev = () => {
    if (!isPrevDisabled) {
      scrollToCard(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section
      id="mentor-showcase"
      aria-label="Mentors Section"
      className="py-16 sm:py-20 md:py-28 bg-[#FAF8F5] border-y border-[#E6E0E8]/70 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Bar */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                MEET OUR MENTORS
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                The People Behind <br />
                <span className="text-[#C9A227]">Our Learning Journey.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#665D69] leading-relaxed mt-3">
                Meet the educators guiding aspiring teachers through their Montessori learning journey.
              </p>
            </div>

            {/* Right Header Navigation Controls & Link */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isPrevDisabled}
                  style={{ touchAction: "manipulation" }}
                  className={`w-11 h-11 rounded-full border border-[#E6E0E8] bg-white text-[#3C2350] flex items-center justify-center transition-all shadow-xs select-none ${
                    isPrevDisabled
                      ? "opacity-35 cursor-not-allowed text-[#3C2350]/40"
                      : "hover:bg-[#3C2350] hover:text-white hover:border-[#3C2350] focus-visible:outline-2 focus-visible:outline-[#3C2350] focus-visible:outline-offset-2 cursor-pointer active:scale-95"
                  }`}
                  aria-label="Previous mentor"
                >
                  <ArrowLeft className="w-4 h-4 pointer-events-none" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  style={{ touchAction: "manipulation" }}
                  className={`w-11 h-11 rounded-full border border-[#3C2350] bg-[#3C2350] text-[#C9A227] flex items-center justify-center transition-all shadow-sm select-none ${
                    isNextDisabled
                      ? "opacity-35 cursor-not-allowed bg-[#3C2350]/40 border-[#3C2350]/20 text-[#C9A227]/50"
                      : "hover:bg-[#291735] hover:border-[#291735] focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2 cursor-pointer active:scale-95"
                  }`}
                  aria-label="Next mentor"
                >
                  <ArrowRight className="w-4 h-4 pointer-events-none" />
                </button>
              </div>

              <Link
                href="/faculty"
                className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-extrabold tracking-wider text-[#3C2350] hover:text-[#C9A227] focus-visible:outline-2 focus-visible:outline-[#3C2350] focus-visible:outline-offset-2 transition-colors uppercase group/link"
              >
                <span>Meet All Faculty</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Viewport: Exactly 3 complete cards visible on desktop, 2 on tablet, 1 on mobile */}
        <ScrollReveal delayMs={100}>
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none"
            tabIndex={0}
            aria-label="Scrollable mentor cards list"
          >
            {MENTORS_DATA.map((trainer) => (
              <Link
                key={trainer.id}
                href={`/faculty?id=${trainer.id}`}
                className="w-full min-w-full sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)] shrink-0 snap-start bg-white rounded-3xl border border-[#E6E0E8] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-[#3C2350] focus-visible:ring-offset-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                aria-label={`${trainer.name} - ${trainer.role}`}
              >
                {/* Standardised 4:5 Portrait on Modern Purple Gradient Studio Canvas */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#2D123D] shrink-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Depth Scrim */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Card Information: Name, Designation & Arrow Indicator */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-4 bg-white">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#3C2350] group-hover:text-[#291735] transition-colors leading-snug line-clamp-1 mb-1">
                      {trainer.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed line-clamp-2 min-h-[36px]">
                      {trainer.role}
                    </p>
                  </div>

                  {/* Subtle Arrow Indicator */}
                  <div className="pt-3 border-t border-[#E6E0E8]/70 flex items-center justify-between">
                    <span className="font-sans text-[11px] font-bold text-[#3C2350] group-hover:text-[#C9A227] transition-colors uppercase tracking-wider">
                      Faculty Profile
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#3C2350] flex items-center justify-center border border-[#E6E0E8] group-hover:bg-[#3C2350] group-hover:text-[#C9A227] group-hover:border-[#3C2350] transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#C9A227] w-6 h-2 rounded-full"
                  : "bg-[#E6E0E8] w-2 h-2 rounded-full hover:bg-[#3C2350]/30"
              }`}
              aria-label={`Go to mentor slide position ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
