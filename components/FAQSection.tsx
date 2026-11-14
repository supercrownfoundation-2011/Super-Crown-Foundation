"use client";

import React, { useState } from "react";
import { Plus, Minus, PhoneCall } from "lucide-react";
import CounsellingModal from "./CounsellingModal";
import TextReveal from "./TextReveal";

export default function FAQSection() {
  const faqs = [
    {
      id: "01",
      question: "What is Montessori teacher training?",
      answer: "Montessori teacher training is a specialized pedagogical program that prepares educators to guide children using Maria Montessori's child-centered philosophy, sensory apparatus presentation, observational techniques, and prepared learning environments.",
    },
    {
      id: "02",
      question: "Who can join the program?",
      answer: "Applicants holding 10+2 (high school graduation) or a university degree with a passion for early education are eligible to apply. No prior teaching experience is mandatory as we provide complete foundational and practical training.",
    },
    {
      id: "03",
      question: "What will I learn during the training?",
      answer: "You will master practical material presentations across Practical Life, Sensorial, Language, Mathematics, and Culture, alongside child psychology, observation methods, classroom leadership, and lesson planning.",
    },
    {
      id: "04",
      question: "How long does the program take?",
      answer: "Our Early Childhood Diploma spans 12 months, the Elementary Certification takes 9 months, and short-term classroom leadership workshops range from 1 to 3 months depending on batch frequency.",
    },
    {
      id: "05",
      question: "How does the training prepare me for teaching?",
      answer: "Through over 200+ hours of supervised practical lab practice, material presentation exams, mock teaching sessions, and 100% placement guidance with leading partner schools.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIndex = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <section className="py-16 sm:py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E6E0E8]/70">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Clean Editorial Title (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col items-start gap-4 sm:gap-6">
              <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block">
                — FAQ & ASSISTANCE
              </span>

              <TextReveal as="h2" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
                Frequently <br className="hidden lg:inline" />
                Asked <br className="hidden lg:inline" />
                Questions
              </TextReveal>

              <TextReveal delayMs={100} as="p" className="font-sans text-sm sm:text-base text-[#665D69] leading-relaxed max-w-md">
                Have questions about program structure, eligibility, or batch timings? Our counselors are available to guide you.
              </TextReveal>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#3C2350] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-sans text-xs font-extrabold uppercase tracking-wider hover:bg-[#291735] transition-all cursor-pointer shadow-sm active:scale-95 mt-2"
              >
                <PhoneCall className="w-4 h-4 text-[#C9A227]" />
                <span>Speak to a Counselor</span>
              </button>
            </div>

            {/* RIGHT COLUMN: Accordion Items (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-white border-[#3C2350]/40 shadow-md"
                        : "bg-white border-[#E6E0E8] hover:border-[#C9A227]/50"
                    }`}
                  >
                    <button
                      onClick={() => toggleIndex(idx)}
                      className="w-full p-4 sm:p-6 flex justify-between items-center text-left focus:outline-none cursor-pointer group gap-3"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                        <span className="font-heading text-xs font-extrabold text-[#C9A227] bg-[#FAF8F5] border border-[#E6E0E8] px-2.5 sm:px-3 py-1 rounded-lg shrink-0">
                          {faq.id}
                        </span>
                        <h3 className="font-heading text-sm sm:text-lg font-bold text-[#3C2350] group-hover:text-[#291735] transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[#3C2350] text-[#C9A227]"
                            : "bg-[#F3EEF6] text-[#3C2350] group-hover:bg-[#3C2350] group-hover:text-white"
                        }`}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 animate-fade-in border-t border-[#E6E0E8]/60 mt-1">
                        <p className="font-sans text-xs sm:text-base text-[#665D69] leading-relaxed pt-3 sm:pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
