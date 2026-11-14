"use client";

import React, { useState } from "react";
import { Crown, BookCheck, Users, Sparkles, Medal, Briefcase, Zap } from "lucide-react";

export default function WhySuperCrown() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const features = [
    {
      id: "01",
      title: "16+ Years Legacy",
      icon: Crown,
      description: "Learn from a trusted institution with over 16 years of pioneer excellence in Montessori teacher education.",
    },
    {
      id: "02",
      title: "Learn Through Practice",
      icon: BookCheck,
      description: "Go beyond theoretical lectures with over 200+ hours of hands-on practical classroom observation & material handling.",
    },
    {
      id: "03",
      title: "Expert Mentorship",
      icon: Users,
      description: "Gain direct insights from seasoned master trainers who bring real-world classroom experience to every module.",
    },
    {
      id: "04",
      title: "Individual Guidance",
      icon: Sparkles,
      description: "Receive personalized feedback, tailored skill assessments, and one-on-one academic counseling throughout.",
    },
    {
      id: "05",
      title: "Specialized Diplomas",
      icon: Medal,
      description: "Earn globally recognized qualifications that validate your skills across international Montessori schools.",
    },
    {
      id: "06",
      title: "Global Career Support",
      icon: Briefcase,
      description: "Benefit from direct placement assistance, portfolio building, and job interview preparation with top partner schools.",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15">
            <Zap className="w-4 h-4 text-[#C9A24D]" />
            <span className="font-sans text-xs font-bold text-[#3C2350] uppercase tracking-wider">
              Why Choose Super Crown
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight">
            Why Aspiring Educators Choose Us
          </h2>
          <p className="font-sans text-base text-[#665D69] max-w-2xl leading-relaxed">
            We go beyond traditional training to provide an interactive learning experience that prepares you for a rewarding teaching career.
          </p>
        </div>

        {/* 6 Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = activeCard === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`bg-white border rounded-3xl p-8 transition-all duration-300 relative group ${
                  isHovered
                    ? "border-[#C9A24D]/60 shadow-xl shadow-[#3C2350]/5 -translate-y-1.5"
                    : "border-[#E6E0E8] shadow-xs hover:border-[#C9A24D]/40"
                }`}
              >
                {/* Number & Icon Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isHovered 
                      ? "bg-gradient-to-br from-[#3C2350] to-[#291735] text-[#C9A24D] shadow-md scale-105" 
                      : "bg-[#F3EEF6] text-[#3C2350]"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-heading text-xs font-extrabold text-[#C9A24D] bg-[#FAF8F5] border border-[#E6E0E8] px-3 py-1 rounded-full">
                    STEP {item.id}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-[#3C2350] mb-3 group-hover:text-[#C9A24D] transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-[#665D69] leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Active Glow Accent */}
                <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-[#3C2350] to-[#C9A24D] transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

