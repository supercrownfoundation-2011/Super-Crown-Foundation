"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FRANCHISE_FAQS: FAQItem[] = [
  {
    id: "01",
    question: "What is the Super Crown Foundation franchise opportunity?",
    answer:
      "Super Crown Foundation offers educators, entrepreneurs, and school administrators the opportunity to establish an authorized International Montessori Teacher Training School in their city. As a partner, you deliver our internationally inspired Montessori and Early Childhood Education certification programs backed by 16+ years of institutional academic excellence.",
  },
  {
    id: "02",
    question: "What is the franchise fee?",
    answer:
      "The franchise fee is ₹2,00,000. This one-time fee includes brand authorization rights, complete curriculum access, comprehensive faculty training, marketing guidance, and institutional study resources as documented in our franchise prospectus.",
  },
  {
    id: "03",
    question: "Is there a royalty fee?",
    answer:
      "No. Super Crown Foundation operates on a transparent 'No Royalty' model. There is 0% recurring royalty on student tuition fees, allowing franchise partners to retain their operational revenue and reinvest in educational excellence.",
  },
  {
    id: "04",
    question: "What is included in the franchise package?",
    answer:
      "The franchise package includes: (1) Brand usage rights for Super Crown Foundation, (2) Complete curriculum access and syllabi, (3) Training support for your faculty and center leadership, (4) Marketing guidance and promotional templates, and (5) Academic study materials and resources for your enrolled students.",
  },
  {
    id: "05",
    question: "Will academic and training support be provided?",
    answer:
      "Yes. We provide complete academic frameworks, curriculum manuals, and practical activity guidelines. Furthermore, our senior faculty conducts structured training for your instructors and center directors to ensure standardized Montessori teaching methodologies.",
  },
  {
    id: "06",
    question: "Can I enquire about opening a centre in my city?",
    answer:
      "Absolutely. We invite franchise enquiries from all Tier 1, Tier 2, and Tier 3 cities across Tamil Nadu, South India, and across the nation. Each territory is evaluated on demographic demand, local teacher training needs, and area exclusivity.",
  },
  {
    id: "07",
    question: "What are the space and infrastructure requirements?",
    answer:
      "Space requirements vary based on whether you are integrating the academy into an existing school or preschool campus or launching a standalone centre. Typically, an administrative counselling area, theory classroom, and practical Montessori activity room are recommended. Please contact our franchise team for the latest requirements and detailed specifications for your specific location.",
  },
  {
    id: "08",
    question: "What are the next steps after submitting an enquiry?",
    answer:
      "Once you submit the online enquiry form, our franchise team reviews your preferred location and schedules a direct exploratory consultation within 24–48 hours. We then share the comprehensive Franchise Prospectus, discuss location feasibility, and guide you through the formal partnership agreement.",
  },
];

export default function FranchiseFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4">
      {FRANCHISE_FAQS.map((faq, idx) => {
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
              type="button"
              onClick={() => toggleIndex(idx)}
              className="w-full p-4 sm:p-6 flex justify-between items-center text-left group transition-colors focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                <span className="font-heading text-xs font-extrabold text-[#C9A24D] bg-white border border-[#E6E0E8] px-2.5 sm:px-3 py-1 rounded-lg shrink-0">
                  {faq.id}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#3C2350] group-hover:text-[#C9A24D] transition-colors">
                  {faq.question}
                </h3>
              </div>
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? "bg-[#3C2350] text-[#C9A24D]"
                    : "bg-[#F3EEF6] text-[#3C2350] group-hover:bg-[#3C2350] group-hover:text-white"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-[#E6E0E8]/60 mt-2">
                <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
