import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedCourses from "@/components/FeaturedCourses";
import CounsellingForm from "@/components/CounsellingForm";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Montessori Teacher Training Programs & Diplomas",
  description:
    "Explore internationally recognized Montessori teacher training diplomas, certifications in English Phonics, Vedic Maths, Child Psychology, and classroom leadership at Super Crown Foundation.",
  openGraph: {
    title: "Montessori Teacher Training Programs | Super Crown Foundation",
    description:
      "Accredited Early Childhood and Primary Montessori Teacher Training diplomas with 200+ hours of practical apparatus training and 100% placement support.",
    url: "/courses",
  },
  alternates: {
    canonical: "/courses",
  },
};

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[90px]">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] py-20 border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-4">
              <BookOpen className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Academic Programs
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] mb-4 tracking-tight">
              Montessori Teacher Training Programs
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#665D69] max-w-2xl mx-auto leading-relaxed">
              Explore our range of internationally accredited diplomas, certifications, and specialized classroom leadership workshops designed for modern educators.
            </p>
          </div>
        </section>

        <FeaturedCourses />
        <CounsellingForm />
      </main>
      <Footer />
    </div>
  );
}

