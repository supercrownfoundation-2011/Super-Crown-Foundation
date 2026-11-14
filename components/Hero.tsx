"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HeartHandshake, CheckCircle2, GraduationCap } from "lucide-react";
import CounsellingModal from "./CounsellingModal";
import TextReveal from "./TextReveal";
import Particles from "./react-bits/Particles";
import Aurora from "./react-bits/Aurora";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-[96px] pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 bg-[#FAF8F5]/40">
        {/* React Bits Ambient Background: Flowing Aurora & Interactive Canvas Particles */}
        <Aurora />
        <Particles
          particleColors={["#C9A227", "#3C2350", "#D8B43B", "#7E4E98"]}
          particleCount={50}
          speed={0.45}
          particleBaseSize={2.2}
          moveParticlesOnHover={true}
          alphaParticles={true}
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 animate-fade-in-up">

          {/* Centered Hero Header Content */}
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6 pb-10 sm:pb-14">
            
            {/* Main Headline with masked text reveal */}
            <TextReveal as="h1" className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-[1.16] tracking-tight max-w-2xl">
              Learn Montessori. <br />
              <span className="text-[#C9A227]">Inspire Young Minds.</span>
            </TextReveal>

            {/* Supporting Subtitle Paragraph */}
            <TextReveal delayMs={140} as="p" className="font-sans text-sm sm:text-base md:text-lg text-[#665D69] max-w-xl mx-auto leading-relaxed">
              Build the knowledge, confidence, and practical skills to create meaningful learning experiences for children through Montessori education.
            </TextReveal>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#3C2350] text-white px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-xl hover:shadow-[#3C2350]/20 transition-all border border-[#3C2350] gap-2.5 group cursor-pointer active:scale-95 hover-lift"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-[#E6E0E8] text-[#3C2350] px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-bold hover:bg-[#FAF8F5] hover:border-[#3C2350]/30 transition-all gap-2 shadow-xs cursor-pointer active:scale-95 hover-lift"
              >
                <HeartHandshake className="w-4 h-4 text-[#C9A227]" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>

          {/* HERO IMAGE COMPOSITION */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-2">
            
            {/* LEFT BLOCK */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-[#FAF8F5] shadow-xl group min-h-[280px] sm:min-h-[360px] md:min-h-[420px] h-full hover-scale-img hover-lift">
              <img
                src="/images/authentic/hero_authentic_lab.webp"
                alt="Super Crown Authentic Apparatus Lab"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/80 via-transparent to-transparent opacity-90 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block">
                  Authentic Apparatus Lab
                </span>
                <p className="font-heading text-lg font-bold text-white">
                  Prepared Learning Environments
                </p>
              </div>
            </div>

            {/* CENTER BLOCK */}
            <div className="md:col-span-4 flex flex-col gap-3 justify-between">
              {/* Top Card */}
              <div className="bg-[#3C2350] text-white p-6 sm:p-7 rounded-[26px] border border-[#3C2350] shadow-xl flex flex-col justify-between flex-1 relative overflow-hidden group hover-lift">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#C9A227] flex items-center justify-center border border-white/10 mb-5">
                  <GraduationCap className="w-6 h-6 text-[#C9A227]" />
                </div>
                <div>
                  <span className="font-sans text-[11px] sm:text-xs font-extrabold text-[#C9A227] tracking-wider uppercase block mb-2.5">
                    YOUR FUTURE STARTS HERE
                  </span>
                  <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-white leading-[1.25] tracking-tight">
                    Turn Your Passion into a Teaching Career.
                  </h3>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-[26px] border border-[#E6E0E8] shadow-md flex flex-col justify-between flex-1 hover-lift">
                <p className="font-sans text-sm sm:text-base text-[#5A4E61] leading-relaxed mb-4">
                  Gain practical Montessori knowledge and build the skills to take your next step as an educator.
                </p>
                <div className="pt-4 border-t border-[#E8E2EC] flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-[#3C2350]">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                    <span>Explore Montessori Training</span>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-[#3C2350] hover:text-[#C9A227] transition-colors group/link mt-0.5"
                  >
                    <span>Explore Our Courses</span>
                    <ArrowRight className="w-4 h-4 text-[#3C2350] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT BLOCK */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-[#FAF8F5] shadow-xl group min-h-[280px] sm:min-h-[360px] md:min-h-[420px] h-full hover-scale-img hover-lift">
              <img
                src="/images/authentic/hero_authentic_guidance.webp"
                alt="Super Crown Trainees Practicing Montessori Apparatus"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/80 via-transparent to-transparent opacity-90 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block">
                  One-On-One Guidance
                </span>
                <p className="font-heading text-lg font-bold text-white">
                  Observation &amp; Material Mastery
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Counselling Modal */}
      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
