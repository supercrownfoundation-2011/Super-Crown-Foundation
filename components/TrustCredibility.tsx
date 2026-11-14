"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Award, BookCheck, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import CounsellingModal from "./CounsellingModal";
import ScrollReveal from "./ScrollReveal";

export default function TrustCredibility() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const credibilityItems = [
    {
      icon: GraduationCap,
      title: "Montessori Pedagogy",
      description: "AMI-aligned authentic teaching methodology",
    },
    {
      icon: Award,
      title: "Expert Mentorship",
      description: "Mentored by 20+ year senior master trainers",
    },
    {
      icon: BookCheck,
      title: "Practical Lab Practice",
      description: "200+ hours hands-on material presentations",
    },
    {
      icon: ShieldCheck,
      title: "Global Certification",
      description: "Internationally recognized teaching credentials",
    },
    {
      icon: HeartHandshake,
      title: "100% Career Support",
      description: "Personal academic guidance & placement help",
    },
  ];

  return (
    <>
      <section className="py-14 bg-[#FAF8F5] border-y border-[#E6E0E8]/70">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight mb-3">
              Why Educators <span className="text-[#C9A227]">Choose Super Crown</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#665D69] max-w-2xl mx-auto leading-relaxed">
              Empowering aspiring teachers with real-world skills, global credentials, and career growth.
            </p>
          </div>

          {/* 5 Identical Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
            {credibilityItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delayMs={idx * 60} className="h-full">
                  <Link
                    href="/about"
                    className="bg-white p-5 rounded-2xl border border-[#E6E0E8] shadow-xs flex flex-col items-center text-center justify-between h-full min-h-[175px] group hover:border-[#3C2350]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-98"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#F3EEF6] text-[#3C2350] flex items-center justify-center mb-3.5 border border-[#E6E0E8]/60 group-hover:bg-[#3C2350] group-hover:text-[#C9A227] transition-colors shrink-0">
                      <Icon className="w-5.5 h-5.5" />
                    </div>

                    <div className="flex flex-col flex-grow justify-center mb-2">
                      <h4 className="font-heading text-xs sm:text-sm font-extrabold text-[#3C2350] mb-1.5 leading-snug group-hover:text-[#291735] transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[11px] text-[#665D69] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <span className="font-sans text-[10px] font-bold text-[#C9A227] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Conversion CTA Bar */}
          <div className="mt-10 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center bg-[#3C2350] text-white px-7 py-3.5 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-lg hover:shadow-[#3C2350]/20 transition-all border border-[#3C2350] gap-2 cursor-pointer active:scale-95"
            >
              Start Your Teaching Journey Today
              <ArrowRight className="w-4 h-4 text-[#C9A227]" />
            </button>
          </div>

        </div>
      </section>

      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
