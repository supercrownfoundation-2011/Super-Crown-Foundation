"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Search,
  GraduationCap,
  Award,
  BookOpen,
  X,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { FACULTY_MEMBERS } from "@/data/facultyData";
import CounsellingModal from "./CounsellingModal";

function FacultyDirectoryContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Faculty");
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);

  const categories = ["All Faculty", "Academic Lead", "Trainers"];

  const filteredFaculty = FACULTY_MEMBERS.filter((faculty) => {
    const isLead = faculty.role.toLowerCase().includes("lead") || faculty.role.toLowerCase().includes("founder") || faculty.role.toLowerCase().includes("directress");
    const matchesCategory =
      selectedCategory === "All Faculty" ||
      (selectedCategory === "Academic Lead" && isLead) ||
      (selectedCategory === "Trainers" && !isLead);

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      faculty.name.toLowerCase().includes(query) ||
      faculty.role.toLowerCase().includes(query) ||
      faculty.qualifications.some((q) => q.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-[#FAF8F5] py-16 sm:py-24 border-b border-[#E6E0E8]/70 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl">
            <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-3">
              — FACULTY & MENTORS DIRECTORY
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] leading-[1.12] tracking-tight mb-6">
              Learn From Experienced <br />
              <span className="text-[#C9A227]">Montessori Educators.</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#665D69] leading-relaxed mb-10">
              Meet the educators and Montessori professionals who guide aspiring teachers through practical learning, expert guidance, and professional growth.
            </p>
          </div>

          {/* KEY STATS COUNTER BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E0E8] shadow-lg shadow-[#3C2350]/5">
            <div className="flex flex-col border-r border-[#E6E0E8] last:border-r-0 pr-4">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350]">5+</span>
              <span className="font-sans text-xs font-bold text-[#665D69] uppercase tracking-wider mt-1">Core Trainers</span>
            </div>
            <div className="flex flex-col border-r border-[#E6E0E8] last:border-r-0 pr-4">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#C9A227]">100%</span>
              <span className="font-sans text-xs font-bold text-[#665D69] uppercase tracking-wider mt-1">PGDMPTT Certified</span>
            </div>
            <div className="flex flex-col border-r border-[#E6E0E8] last:border-r-0 pr-4">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350]">16+ Yrs</span>
              <span className="font-sans text-xs font-bold text-[#665D69] uppercase tracking-wider mt-1">Legacy</span>
            </div>
            <div className="flex flex-col pr-4">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350]">5,000+</span>
              <span className="font-sans text-xs font-bold text-[#665D69] uppercase tracking-wider mt-1">Alumni Mentored</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="py-8 bg-white border-b border-[#E6E0E8]/70 sticky top-[72px] z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl font-sans text-xs font-extrabold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#3C2350] text-[#C9A227] shadow-sm"
                      : "bg-[#FAF8F5] text-[#665D69] hover:bg-[#E6E0E8]/60 hover:text-[#3C2350] border border-[#E6E0E8]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#665D69]" />
            <input
              type="text"
              placeholder="Search faculty by name, qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-[#3C2350] placeholder-[#665D69]/60 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#665D69] hover:text-[#3C2350] p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FACULTY CARDS GRID */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E6E0E8]/70">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center mb-8">
            <p className="font-sans text-xs font-extrabold uppercase text-[#665D69] tracking-wider">
              Showing {filteredFaculty.length} {filteredFaculty.length === 1 ? "Educator" : "Educators"}
            </p>
          </div>

          {filteredFaculty.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E0E8] max-w-md mx-auto my-12">
              <Users className="w-12 h-12 text-[#C9A227] mx-auto mb-4 opacity-50" />
              <h3 className="font-heading text-xl font-bold text-[#3C2350] mb-2">No Faculty Found</h3>
              <p className="font-sans text-xs text-[#665D69] mb-6">
                No faculty members match your search criteria &quot;{searchQuery}&quot;. Try resetting your search or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Faculty");
                }}
                className="bg-[#3C2350] text-[#C9A227] px-6 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#291735] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredFaculty.map((faculty) => {
                const isHighlighted = faculty.isHead || faculty.id === initialId;

                return (
                  <div
                    key={faculty.id}
                    id={faculty.id}
                    className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                      isHighlighted
                        ? "border-[#C9A227] ring-1 ring-[#C9A227]/30"
                        : "border-[#E6E0E8]"
                    }`}
                  >
                    {/* Portrait Photo Container */}
                    <div className="relative aspect-[4/5] bg-[#2D123D] overflow-hidden">
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        style={{ objectPosition: faculty.objectPosition || "center 18%" }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Badge */}
                      {faculty.badge && (
                        <span
                          className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm z-10 border ${
                            faculty.badge.includes("FOUNDER") || faculty.badge.includes("LEAD")
                              ? "bg-[#3C2350] text-[#C9A227] border-[#C9A227]/40"
                              : "bg-white/95 backdrop-blur-md text-[#3C2350] border-[#E6E0E8]"
                          }`}
                        >
                          {faculty.badge}
                        </span>
                      )}
                    </div>

                    {/* Card Content Info */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow gap-4 bg-white">
                      <div>
                        {/* Name & Role */}
                        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#3C2350] leading-snug group-hover:text-[#291735] transition-colors mb-1.5">
                          {faculty.name}
                        </h3>
                        <p className="font-sans text-xs font-extrabold text-[#665D69] tracking-wider uppercase mb-3">
                          {faculty.role}
                        </p>
                        <div className="w-10 h-0.5 bg-[#C9A227] mb-4" />

                        {/* Verified Educational Qualifications */}
                        <div>
                          <span className="font-sans text-[10px] font-extrabold text-[#C9A227] uppercase tracking-wider block mb-2.5">
                            Verified Qualifications
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {faculty.qualifications.map((qual, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-xs font-semibold text-[#3C2350] bg-[#FAF8F5] p-2 rounded-lg border border-[#E6E0E8]"
                              >
                                <GraduationCap className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                                <span className="leading-snug">{qual}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Enquire CTA */}
                      <div className="pt-4 border-t border-[#E6E0E8] flex items-center justify-between">
                        <button
                          onClick={() => setIsCounsellingOpen(true)}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#3C2350] hover:text-[#C9A227] transition-colors cursor-pointer group-hover:translate-x-0.5"
                        >
                          Connect With Faculty <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* WHY LEARN FROM OUR FACULTY SECTION */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E6E0E8]/70">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
              — THE SUPER CROWN STANDARD
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight leading-tight mb-4">
              Why Our Faculty Makes <br />
              <span className="text-[#C9A227]">The Difference.</span>
            </h2>
            <p className="font-sans text-base text-[#665D69] leading-relaxed">
              We believe that exceptional teacher education requires master educators who understand child development, Montessori philosophy, and practical classroom teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">1:1 Individual Mentorship</h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Personal guidance during album preparation, practical material practice, and oral examinations.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">Authentic Pedagogy</h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Trainers certified in Montessori teacher training who uphold pure, child-centred methodology.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">Live Demonstration</h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Master every sensorial, language, and math apparatus under direct trainer observation and feedback.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#3C2350] text-[#C9A227] flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">Career Placement Support</h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Personal academic guidance, certification coaching, and placement assistance across reputed institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CALL TO ACTION BANNER */}
      <section className="py-20 sm:py-24 bg-[#3C2350] text-white relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-3">
              — ADMISSIONS OPEN FOR 2026
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Ready to Learn From <br />
              <span className="text-[#C9A227]">Experienced Mentors?</span>
            </h2>
            <p className="font-sans text-base text-white/80 leading-relaxed">
              Book a free counselling session today to discuss diploma courses, career prospects, and batch schedules with our academic advisors.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsCounsellingOpen(true)}
              className="bg-[#C9A227] text-[#3C2350] px-8 py-4 rounded-2xl font-sans text-xs uppercase tracking-wider font-extrabold hover:bg-[#d8b035] hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
            >
              <span>Book Free Counselling</span>
              <ArrowRight className="w-4 h-4 text-[#3C2350]" />
            </button>
          </div>
        </div>
      </section>

      {/* Counselling Modal */}
      <CounsellingModal
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
      />
    </>
  );
}

export default function FacultyDirectory() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-[#3C2350] font-sans font-bold text-sm">
          Loading Faculty Directory...
        </div>
      }
    >
      <FacultyDirectoryContent />
    </Suspense>
  );
}
