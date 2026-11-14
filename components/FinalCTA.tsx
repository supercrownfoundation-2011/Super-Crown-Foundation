"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, PhoneCall, GraduationCap, Award, Compass } from "lucide-react";
import CounsellingModal from "./CounsellingModal";

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          
          {/* Main Deep Royal Purple Card Banner */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#3C2350] via-[#331c45] to-[#291735] text-white p-6 sm:p-12 md:p-20 overflow-hidden shadow-2xl border border-[#3C2350]">
            
            {/* Background Geometric Accent Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            {/* Subtle Line Graphic Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />



            <div className="hidden lg:flex absolute bottom-12 right-20 items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white shadow-lg">
              <Compass className="w-5 h-5 text-[#C9A227]" />
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#C9A227]">
                  Flexible Batches
                </span>
                <span className="text-xs font-bold">Regular & Weekend</span>
              </div>
            </div>

            {/* Banner Main Content */}
            <div className="relative z-10 max-w-2xl flex flex-col items-start gap-6">

              {/* Headline */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
                Start Your Journey <br />
                <span className="text-[#C9A227]">in Montessori Education</span>
              </h2>

              {/* Supporting Copy */}
              <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
                Take the next step toward becoming a confident, thoughtful educator. Join over 5,000+ alumni leading Montessori classrooms worldwide.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C9A227] text-[#3C2350] px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#d8b035] hover:shadow-xl transition-all gap-2.5 group cursor-pointer active:scale-95"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-bold hover:bg-white/20 transition-all gap-2.5 cursor-pointer active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-[#C9A227]" />
                  Talk to Us
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
