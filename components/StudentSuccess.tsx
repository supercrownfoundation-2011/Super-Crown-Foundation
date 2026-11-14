"use client";

import React from "react";
import { Quote, ArrowRight, CheckCircle2, GraduationCap, Star, Sparkles } from "lucide-react";

export default function StudentSuccess() {
  const steps = [
    {
      num: "01",
      title: "Learn & Observe",
      desc: "Absorb theoretical principles and observe authentic child behavior in prepared environments.",
    },
    {
      num: "02",
      title: "Practical Experience",
      desc: "Over 200+ hours of hands-on material practice, presentation skills, and supervised teaching.",
    },
    {
      num: "03",
      title: "Step Into Career",
      desc: "Receive international certification and direct placement support at top Montessori institutions.",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] border-y border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Testimonial Story (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 self-start">
              <Sparkles className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Student Success Stories
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight">
              From Learning to New Beginnings
            </h2>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xl relative overflow-hidden">
              <div className="flex text-[#C9A24D] gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="font-sans text-base sm:text-lg text-[#3C2350] font-medium leading-relaxed mb-6 italic">
                &ldquo;The training at Super Crown didn&apos;t just teach me how to use Montessori materials; it transformed my entire perspective on how children learn and think. I felt completely confident stepping into my first classroom.&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-[#E6E0E8]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C9A24D] shadow-md shrink-0 bg-[#FAF8F5]">
                  <img
                    src="/images/student_alumnus_avatar.jpg"
                    alt="Anjali Sharma - Super Crown Alumnus"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-heading font-extrabold text-base text-[#3C2350]">
                    Anjali Sharma
                  </p>
                  <p className="font-sans text-xs text-[#C9A24D] font-bold uppercase tracking-wider">
                    Class of 2022 • Head Montessori Educator
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Career Journey Timeline (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E6E0E8] shadow-xl">
            <h3 className="font-heading text-xl font-extrabold text-[#3C2350] mb-6 pb-4 border-b border-[#E6E0E8] flex items-center justify-between">
              <span>Your Career Path</span>
              <GraduationCap className="w-5 h-5 text-[#C9A24D]" />
            </h3>

            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0E8] group hover:border-[#C9A24D]/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] font-heading text-xs font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#3C2350] group-hover:text-[#C9A24D] transition-colors mb-1">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

