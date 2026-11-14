"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Users, GraduationCap } from "lucide-react";

export default function FacultyPreview() {
  const facultyMembers = [
    {
      id: "01",
      name: "Mrs. Rani Rajendran",
      role: "Principal & Lead Trainer",
      experience: "22+ Years in Montessori Pedagogy",
      bio: "Master Montessori educator with over two decades of experience training international teachers and directing AMI-aligned curricula.",
      image: "/images/faculty_lead_trainer.jpg",
    },
    {
      id: "02",
      name: "Dr. Sarah Mitchell",
      role: "Academic Director & Child Psychologist",
      experience: "15+ Years in Early Childhood Research",
      bio: "Specialist in early brain development, child behavior management, and inclusive Montessori learning environments.",
      image: "/images/faculty_academic_director.jpg",
    },
    {
      id: "03",
      name: "Elena Rodriguez",
      role: "Senior Practical Materials Instructor",
      experience: "12+ Years Classroom Guidance",
      bio: "Expert in authentic apparatus handling, Sensorial, Language, and Mathematics practical training modules.",
      image: "/images/faculty_practical_instructor.jpg",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeFaculty = facultyMembers[activeIdx];

  return (
    <section className="py-24 bg-white border-y border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-[#E6E0E8] pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-3">
              <Users className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                World-Class Mentors
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight">
              Learn From Educators Who Know the Journey
            </h2>
          </div>
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-[#3C2350] font-bold text-xs tracking-wider uppercase hover:text-[#C9A24D] transition-colors group shrink-0 bg-[#FAF8F5] px-5 py-3 rounded-xl border border-[#E6E0E8]"
          >
            Meet Full Faculty
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Interactive SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Featured Large Portrait Card */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[560px] rounded-3xl border border-[#E6E0E8] overflow-hidden group bg-[#FAF8F5] shadow-xl">
            <img
              src={activeFaculty.image}
              alt={activeFaculty.name}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
            />

            {/* Bottom Info Floating Card */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto backdrop-blur-xl bg-white/95 p-4 sm:p-6 rounded-2xl border border-[#E6E0E8] shadow-2xl max-w-md">
              <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[#C9A24D] uppercase tracking-wider block mb-1">
                {activeFaculty.experience}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#3C2350] leading-tight mb-1">
                {activeFaculty.name}
              </h3>
              <p className="font-sans text-xs font-bold text-[#3C2350] mb-1.5 sm:mb-2">
                {activeFaculty.role}
              </p>
              <p className="font-sans text-xs text-[#665D69] leading-relaxed line-clamp-3 sm:line-clamp-none">
                {activeFaculty.bio}
              </p>
            </div>
          </div>

          {/* Right: Interactive Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <p className="font-sans text-base text-[#665D69] mb-2">
              Our master trainers combine decades of classroom experience with deep pedagogical knowledge to mentor you individually.
            </p>

            <div className="flex flex-col gap-3">
              {facultyMembers.map((member, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                      isActive
                        ? "bg-[#3C2350] text-white border-[#3C2350] shadow-lg shadow-[#3C2350]/15"
                        : "bg-[#FAF8F5] border-[#E6E0E8] hover:bg-white hover:border-[#C9A24D]/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-xs ${
                        isActive ? "bg-[#C9A24D] text-[#3C2350]" : "bg-[#F3EEF6] text-[#3C2350]"
                      }`}>
                        {member.id}
                      </div>
                      <div>
                        <span
                          className={`font-heading text-lg block font-bold transition-colors ${
                            isActive ? "text-white" : "text-[#3C2350]"
                          }`}
                        >
                          {member.name}
                        </span>
                        <span className={`font-sans text-xs ${isActive ? "text-white/80" : "text-[#665D69]"}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform ${
                        isActive
                          ? "text-[#C9A24D] translate-x-1"
                          : "text-[#665D69]/40 group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-2">
              <Link
                href="/faculty"
                className="w-full bg-[#FAF8F5] border border-[#3C2350] text-[#3C2350] py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase font-bold hover:bg-[#3C2350] hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                View Full Faculty Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

