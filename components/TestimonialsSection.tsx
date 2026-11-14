"use client";

import React from "react";
import { Quote, Star, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "The training at Super Crown didn't just teach me how to present Montessori materials; it completely transformed my perspective on how children think and learn. I felt 100% confident entering my classroom.",
      name: "Anjali Sharma",
      role: "Class of 2022 • Head Montessori Educator",
      avatar: "/images/student_alumnus_avatar.jpg",
      bgClass: "bg-[#FAF8F5] border-[#E6E0E8]",
    },
    {
      id: 2,
      quote:
        "As a practicing teacher looking to deepen my pedagogy, the Elementary Certification exceeded my expectations. The cosmic education and geometry apparatus sessions were truly world-class.",
      name: "Priya Nair",
      role: "Class of 2023 • Primary Section Lead",
      avatar: "/images/faculty_practical_instructor.jpg",
      bgClass: "bg-[#F3EEF6] border-[#3C2350]/15",
    },
    {
      id: 3,
      quote:
        "The hands-on lab practice and dedicated placement guidance helped me secure a position at an international Montessori school immediately after graduation. Highly recommended!",
      name: "Meera Reddy",
      role: "Class of 2024 • Montessori Educator",
      avatar: "/images/faculty_academic_director.jpg",
      bgClass: "bg-[#FBF4E4] border-[#C9A227]/30",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
            What Our <br />
            <span className="text-[#C9A227]">Learners Say</span>
          </h2>
          <p className="font-sans text-base text-[#665D69]">
            Hear directly from educators who transformed their teaching careers through Super Crown Foundation.
          </p>
        </div>

        {/* 3 Horizontal Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-8 border ${item.bgClass} shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Subtle Quote Watermark Icon */}
              <Quote className="w-16 h-16 text-[#3C2350]/5 absolute -top-2 -right-2 pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex text-[#C9A227] gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-sans text-sm sm:text-base text-[#3C2350] leading-relaxed mb-8 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#3C2350]/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A227] shadow-xs shrink-0 bg-white">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#3C2350]">
                    {item.name}
                  </h4>
                  <p className="font-sans text-[11px] font-bold text-[#C9A227] uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
