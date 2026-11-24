import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Compass,
  Target,
  Heart,
  BookOpen,
  Users,
  Lightbulb,
  Sprout,
  Star,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Super Crown Foundation",
  description:
    "Learn about Super Crown Foundation's 16+ year legacy, authentic Montessori philosophy, vision, mission, and commitment to empowering women through international early childhood educator training.",
  openGraph: {
    title: "About Super Crown Foundation | Legacy & Montessori Philosophy",
    description:
      "16+ years of excellence in Montessori teacher education, guiding over 5,000+ graduates across India and internationally.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Child-Centred Approach",
      description: "Respecting every child's uniqueness and potential.",
      icon: Heart,
    },
    {
      title: "Quality Education",
      description: "Maintaining high standards in training and learning.",
      icon: BookOpen,
    },
    {
      title: "Empathy & Inclusivity",
      description: "Creating a supportive environment for all.",
      icon: Users,
    },
    {
      title: "Practical Learning",
      description: "Blending Montessori theory with real classroom experience.",
      icon: Lightbulb,
    },
    {
      title: "Continuous Growth",
      description: "Encouraging lifelong learning and improvement.",
      icon: Sprout,
    },
    {
      title: "Integrity",
      description: "Upholding trust, transparency, and ethical practices.",
      icon: Star,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-[80px]">

        {/* SECTION 1: ABOUT US HERO */}
        <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-6 flex flex-col items-start gap-6">
                <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block">
                  — ABOUT US
                </span>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] leading-[1.12] tracking-tight">
                  Empowering Educators. <br />
                  <span className="text-[#C9A227]">Inspiring Generations.</span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-[#665D69] leading-relaxed">
                  Super Crown Foundation is a Montessori teacher training institution dedicated to developing compassionate, skilled, and confident educators who create meaningful learning experiences for children.
                </p>

                <div className="pt-2">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center bg-[#3C2350] text-white px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-xl hover:shadow-[#3C2350]/20 transition-all border border-[#3C2350] gap-2.5 group cursor-pointer active:scale-95"
                  >
                    <span>Explore Our Programmes</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-white shadow-xl min-h-[260px] h-[300px] sm:h-[450px]">
                <img
                  src="/images/authentic/about_hero_authentic.webp"
                  alt="Super Crown Foundation Montessori Practical Training Session"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 2: OUR STORY */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column Image */}
              <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-[#FAF8F5] shadow-xl min-h-[260px] h-[300px] sm:h-[450px]">
                <img
                  src="/images/authentic/about_story_authentic.webp"
                  alt="Super Crown Foundation Prepared Learning Environment and Workshop"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column Text */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block">
                  — OUR STORY
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
                  A Journey Rooted <br />
                  <span className="text-[#3C2350]">in Purpose.</span>
                </h2>

                <p className="font-sans text-base text-[#665D69] leading-relaxed">
                  Super Crown Foundation was established with a vision to promote authentic Montessori education through quality teacher training. We believe that every child deserves a nurturing environment and that well-prepared, empathetic educators can create a lasting positive impact on society.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 3: OUR FOUNDER (MOVED RIGHT AFTER OUR STORY) */}
        <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column Uploaded Founder Image */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-white shadow-xl min-h-[300px] h-[360px] sm:h-[500px] group">
                <img
                  src="/images/founder.jpg"
                  alt="Mrs. Rani Rajendran - Founder of Super Crown Foundation"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#3C2350]/90 via-[#3C2350]/50 to-transparent p-6 text-white">
                  <p className="font-heading font-extrabold text-xl text-white">Mrs. Rani Rajendran</p>
                  <p className="font-sans text-xs text-[#C9A227] font-bold uppercase tracking-wider">Founder &amp; Directress</p>
                </div>
              </div>

              {/* Right Column Text & Quote Box */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                    — OUR FOUNDER
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
                    Mrs. Rani Rajendran
                  </h2>
                  <p className="font-sans text-sm sm:text-base font-bold text-[#C9A227] uppercase tracking-wider mt-1.5">
                    Founder &amp; Directress, Super Crown Foundation
                  </p>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#3C2350] leading-snug -mt-1">
                  A Visionary with a Lasting Impact on Early Childhood Education
                </h3>

                <p className="font-sans text-base text-[#665D69] leading-relaxed">
                  Founded by Mrs. Rani Rajendran, a dedicated educator and pioneer with a deep passion for child development, Super Crown Foundation continues to be guided by her vision of creating a more empathetic, highly skilled, and well-prepared generation of Montessori educators.
                </p>

                {/* Quotation Box */}
                <div className="bg-[#FBF4E4] p-6 sm:p-7 rounded-2xl border-l-4 border-[#C9A227] relative mt-2 shadow-xs">
                  <Quote className="w-8 h-8 text-[#C9A227]/40 mb-2" />
                  <p className="font-heading text-lg sm:text-xl font-bold italic text-[#3C2350] mb-3 leading-snug">
                    &ldquo;Education is not just about teaching, but about transforming lives.&rdquo;
                  </p>
                  <span className="font-sans text-xs font-extrabold text-[#665D69] uppercase tracking-wider block">
                    — Mrs. Rani Rajendran, Founder &amp; Directress
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 4: OUR PURPOSE — VISION & MISSION */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-14">
              <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                — OUR PURPOSE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight mb-3">
                Education that shapes <br className="hidden sm:inline" />
                <span className="text-[#C9A227]">a brighter future.</span>
              </h2>
              <p className="font-sans text-base text-[#665D69] leading-relaxed">
                Our vision and mission reflect our commitment to quality teacher education, child-centred learning, and a more compassionate world for every child.
              </p>
            </div>

            {/* Two Contrasting Content Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Vision Panel (Light Warm White Surface) */}
              <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E6E0E8] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FBF4E4] text-[#C9A227] flex items-center justify-center mb-6 border border-[#C9A227]/20">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                    OUR VISION
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350] mb-4 leading-tight">
                    A stronger foundation for every child.
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#665D69] leading-relaxed">
                    To contribute to a future where compassionate, capable educators help children learn with confidence, curiosity, and independence.
                  </p>
                </div>
              </div>

              {/* Mission Panel (Deep Royal Purple Surface) */}
              <div className="bg-[#3C2350] text-white rounded-3xl p-6 sm:p-10 border border-[#3C2350] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#C9A227] flex items-center justify-center mb-6 border border-white/10">
                    <Target className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                    OUR MISSION
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                    Empowering teachers, enriching children.
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed">
                    To provide high-quality Montessori teacher training, promote child-centred learning, and equip educators with the knowledge, practical skills, and guidance to create meaningful classroom experiences.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION 5: OUR CORE VALUES */}
        <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            {/* Header with Title & Intro Text */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
              <div className="max-w-2xl">
                <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                  — OUR VALUES
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight">
                  Principles that Guide Our Work.
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#665D69] max-w-md leading-relaxed">
                Our values shape the way we train, support, and nurture educators. They guide our commitment to children, educators, and the wider community.
              </p>
            </div>

            {/* 6 Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-7 rounded-2xl border border-[#E6E0E8] shadow-xs hover:border-[#C9A227]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#FBF4E4] text-[#C9A227] flex items-center justify-center mb-5 border border-[#C9A227]/20 group-hover:bg-[#3C2350] group-hover:text-[#C9A227] transition-colors">
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading text-lg font-extrabold text-[#3C2350] mb-2 leading-snug">
                        {val.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* SECTION 6: CLOSING CALL TO ACTION */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column Deep Purple Banner (7 cols) */}
              <div className="lg:col-span-7 bg-[#3C2350] text-white p-6 sm:p-10 md:p-14 rounded-3xl border border-[#3C2350] shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-3">
                    — JOIN OUR JOURNEY
                  </span>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                    Be a Part of <br />
                    <span className="text-[#C9A227]">Meaningful Change.</span>
                  </h2>

                  <p className="font-sans text-base text-white/80 leading-relaxed max-w-lg">
                    Whether you&apos;re an aspiring educator or a partner in our vision, we invite you to join us in shaping brighter futures for children.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center bg-[#C9A227] text-[#3C2350] px-8 py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#d8b035] hover:shadow-xl transition-all gap-2.5 cursor-pointer active:scale-95"
                  >
                    <span>Explore Our Programmes</span>
                    <ArrowRight className="w-4 h-4 text-[#3C2350]" />
                  </Link>
                </div>
              </div>

              {/* Right Column Image (5 cols) */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-[#FAF8F5] shadow-xl min-h-[300px] lg:min-h-[420px]">
                <img
                  src="/images/authentic/about_cta_authentic.webp"
                  alt="Super Crown Trainees Practicing Montessori Apparatus"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
