"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const faqs = [
    {
      id: "01",
      question: "What are the eligibility criteria for the diploma program?",
      answer: "Applicants must have completed 10+2 (high school graduation) or hold a degree from a recognized institution. A passion for early education and basic proficiency in English is required.",
    },
    {
      id: "02",
      question: "Do you provide placement assistance after course completion?",
      answer: "Yes, we provide dedicated 100% placement guidance. We have strong network tie-ups with leading international Montessori schools, private academies, and progressive early learning centers.",
    },
    {
      id: "03",
      question: "Is the certification internationally recognized?",
      answer: "Absolutely. Our certification is globally accredited, allowing our graduates to pursue teaching career opportunities across international schools worldwide.",
    },
    {
      id: "04",
      question: "What is the duration of the courses?",
      answer: "The Early Childhood Diploma is 12 months, the Elementary Certification is 9 months, and short-term workshops range from 1 to 3 months depending on batch frequency.",
    },
    {
      id: "05",
      question: "Are online or weekend classes available?",
      answer: "Yes! We offer flexible learning formats including full-time campus, weekend executive batches, and hybrid/remote learning to accommodate working professionals and parents.",
    },
    {
      id: "06",
      question: "How do I start the admission and counselling process?",
      answer: "You can click 'Book Free Counselling' to request a callback, or submit your details in the contact form below. Our academic counseling team will walk you through the program overview and enrollment steps.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white border-y border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column Sticky Header (4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-3">
              <HelpCircle className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
              Have Questions? We’re Here to Help.
            </h2>
            <p className="font-sans text-base text-[#665D69] mt-4 leading-relaxed">
              Find quick answers to common questions about our admissions criteria, international accreditations, and course schedules.
            </p>
          </div>

          {/* Right Column Accordion Items (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={faq.id} 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "bg-[#FAF8F5] border-[#3C2350]/30 shadow-md" 
                      : "bg-white border-[#E6E0E8] hover:border-[#C9A24D]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full p-4 sm:p-6 flex justify-between items-center text-left group transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 pr-2 sm:pr-4">
                      <span className="font-heading text-xs font-extrabold text-[#C9A24D] bg-white border border-[#E6E0E8] px-2.5 sm:px-3 py-1 rounded-lg shrink-0">
                        {faq.id}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#3C2350] group-hover:text-[#C9A24D] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#3C2350] text-[#C9A24D]" : "bg-[#F3EEF6] text-[#3C2350] group-hover:bg-[#3C2350] group-hover:text-white"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 animate-fade-in border-t border-[#E6E0E8]/60 mt-2">
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
  );
}

