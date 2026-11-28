import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Award,
  BookOpen,
  HeartHandshake,
  Users,
  Target,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building,
  Phone,
  ArrowRight,
  FileText,
  Check,
  Layers,
  HelpCircle,
  Clock,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranchiseEnquiryForm from "@/components/franchise/FranchiseEnquiryForm";
import FranchiseFAQ from "@/components/franchise/FranchiseFAQ";
import FranchiseNetworkSection from "@/components/FranchiseNetworkSection";
import { CONTACT_INFO } from "@/data/contactData";

export const metadata: Metadata = {
  title: "Montessori Teacher Training Franchise Opportunity",
  description:
    "Explore the Super Crown Foundation franchise opportunity in Montessori teacher training. Learn about academic support, training, investment and partnership enquiries.",
  alternates: {
    canonical: "https://www.supercrownfoundation.com/franchise",
  },
  openGraph: {
    title: "Montessori Teacher Training Franchise Opportunity | Super Crown Foundation",
    description:
      "Explore the Super Crown Foundation franchise opportunity in Montessori teacher training. Learn about academic support, training, investment and partnership enquiries.",
    url: "https://www.supercrownfoundation.com/franchise",
    siteName: "Super Crown Foundation",
    type: "website",
    images: [
      {
        url: "/images/authentic/supercrown_legacy_training.webp",
        width: 1200,
        height: 630,
        alt: "Super Crown Foundation Montessori Teacher Training Franchise Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montessori Teacher Training Franchise Opportunity | Super Crown Foundation",
    description:
      "Explore the Super Crown Foundation franchise opportunity in Montessori teacher training. Learn about academic support, training, investment and partnership enquiries.",
    images: ["/images/authentic/supercrown_legacy_training.webp"],
  },
};

export default function FranchisePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.supercrownfoundation.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Franchise Opportunity",
            item: "https://www.supercrownfoundation.com/franchise",
          },
        ],
      },
      {
        "@type": "EducationalOrganization",
        name: "Super Crown Foundation",
        url: "https://www.supercrownfoundation.com",
        logo: "https://www.supercrownfoundation.com/logo.png",
        sameAs: [
          "https://www.instagram.com/super_crownacademy",
          "https://www.facebook.com/supercrownfoundation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Franchise Opportunity in Montessori Teacher Training",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Super Crown Foundation Franchise Partner",
              description:
                "Franchise partnership for establishing an authorized Montessori teacher training school with 0% royalty.",
              price: "200000",
              priceCurrency: "INR",
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-[#241828] pt-20 sm:pt-24">
        {/* ========================================================= */}
        {/* SECTION 1: HERO (Split Layout) */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#3C2350] via-[#331C44] to-[#2A1638] text-white pt-14 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FAF8F5]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              
              {/* Left Column (Content - 7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A227]/40 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-sans font-extrabold tracking-widest text-[#C9A24D] uppercase">
                    FRANCHISE OPPORTUNITY 2026
                  </span>
                </div>

                {/* Main H1 Headline */}
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.15] tracking-tight">
                  Build a Future in Education.{" "}
                  <span className="text-[#C9A24D] block mt-1">
                    Empower the Next Generation.
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="font-sans text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                  Become a franchise partner of Super Crown Foundation and contribute to developing skilled educators through professional Montessori teacher training.
                </p>

                {/* Key Institutional Proof Chips */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 text-xs text-white/90">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24D]" />
                    <span>Since 2011 (16+ Yrs)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24D]" />
                    <span>Franchise Fee: ₹2,00,000</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-[#C9A24D]/40 text-[#C9A24D] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>No Royalty Model</span>
                  </div>
                </div>

                {/* Dual Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <a
                    href="#franchise-enquiry"
                    className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B38F1F] text-[#3C2350] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Enquire About a Franchise</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#about-opportunity"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-xs sm:text-sm px-6 py-4 rounded-xl border border-white/20 transition-all cursor-pointer"
                  >
                    <span>Explore the Opportunity</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C9A24D]" />
                  </a>
                </div>

                {/* Micro Sub-note */}
                <p className="text-[11px] text-white/60 pt-1">
                  * Admissions &amp; training partnership for early education centres, schools &amp; entrepreneurs.
                </p>
              </div>

              {/* Right Column (Hero Image - 5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative Frame Glow */}
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#C9A227]/40 via-white/10 to-[#C9A227]/20 blur-sm -z-10" />

                  <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#3C2350] aspect-[4/3] sm:aspect-[4/3]">
                    <Image
                      src="/images/authentic/supercrown_legacy_training.webp"
                      alt="Super Crown Foundation Montessori classroom teacher training session in progress"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover object-center"
                    />

                    {/* Gradient Overlay for institutional legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/80 via-transparent to-transparent" />

                    {/* Bottom Caption Pill */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-[#E6E0E8] shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#C9A227]">
                            INSTITUTIONAL PARTNERSHIP
                          </div>
                          <div className="text-xs font-bold text-[#3C2350]">
                            Super Crown Foundation
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#3C2350] bg-[#FAF8F5] px-2 py-1 rounded-md border border-[#E6E0E8]">
                        ESTD 2011
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT THE OPPORTUNITY */}
        {/* ========================================================= */}
        <section id="about-opportunity" className="py-20 lg:py-24 bg-white border-b border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                ABOUT THE OPPORTUNITY
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                A Meaningful Opportunity in Education
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
                At Super Crown Foundation, we believe that every great nation begins with a great teacher. With more than 16 years of educational excellence, our mission is to empower franchise partners to create skilled, compassionate educators who transform classrooms across communities.
              </p>
            </div>

            {/* 4 Core Mission Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8] hover:border-[#C9A24D]/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E0E8] text-[#3C2350] flex items-center justify-center mb-5 shadow-2xs">
                    <GraduationCap className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Prepare Passionate Educators
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Equip aspiring teachers with deep pedagogical knowledge, practical confidence, and globally aligned classroom standards.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E0E8]/70 text-[11px] font-bold text-[#C9A24D] uppercase tracking-wider">
                  Pedagogical Rigor
                </div>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8] hover:border-[#C9A24D]/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E0E8] text-[#3C2350] flex items-center justify-center mb-5 shadow-2xs">
                    <BookOpen className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Promote Quality Early Education
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Advocate for child-centred Montessori principles and foundational learning that nurtures curiosity, independence, and creativity.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E0E8]/70 text-[11px] font-bold text-[#C9A24D] uppercase tracking-wider">
                  Montessori Excellence
                </div>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8] hover:border-[#C9A24D]/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E0E8] text-[#3C2350] flex items-center justify-center mb-5 shadow-2xs">
                    <HeartHandshake className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Empower Women Through Skills
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Enable women to gain professional qualifications, achieve financial independence, and establish respected careers in education.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E0E8]/70 text-[11px] font-bold text-[#C9A24D] uppercase tracking-wider">
                  Women Empowerment
                </div>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8] hover:border-[#C9A24D]/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E0E8] text-[#3C2350] flex items-center justify-center mb-5 shadow-2xs">
                    <Users className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Develop Educational Leaders
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Nurture trainers, preschool directors, curriculum coordinators, and academic entrepreneurs who lead educational institutions.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E0E8]/70 text-[11px] font-bold text-[#C9A24D] uppercase tracking-wider">
                  Future Leadership
                </div>
              </div>

            </div>

            {/* Founder Vision Banner */}
            <div className="mt-12 bg-[#3C2350] text-white rounded-3xl p-6 sm:p-10 border border-[#C9A227]/30 shadow-saas flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-8 h-8 text-[#C9A24D]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C9A24D] block mb-1">
                  OUR INSPIRATION
                </span>
                <p className="font-heading text-base sm:text-xl font-bold leading-relaxed italic text-white/95">
                  &ldquo;Education is the most powerful tool to transform lives and communities. Our vision is to empower women, create professional educators, and provide quality Montessori teacher training.&rdquo;
                </p>
                <div className="mt-2 text-xs text-white/70">
                  — Super Crown Foundation Leadership Team
                </div>
              </div>
              <a
                href="#franchise-enquiry"
                className="shrink-0 bg-[#C9A227] hover:bg-[#B38F1F] text-[#3C2350] font-heading font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Join Our Mission
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: COURSES AND ACADEMIC PROGRAMMES */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-[#FAF8F5]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                  ACADEMIC PORTFOLIO
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                  Courses and Academic Programmes
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#665D69] mt-3 leading-relaxed">
                  As an authorized centre, you will offer Super Crown Foundation&apos;s proven curriculum spanning early childhood and specialized teacher education.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-[#3C2350] hover:text-[#C9A227] transition-colors shrink-0"
              >
                <span>View Full Course Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 6 Programme Cards (from PDF Page 7) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 01
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    International Montessori Teacher Training
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Comprehensive training with globally inspired teaching standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Montessori Apparatus Included</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 02
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    Nursery Teacher Training
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Building strong foundations for aspiring early educators.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Early Learning Fundamentals</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 03
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    Early Childhood Education
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Understanding child-centred educational principles.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Developmental Pedagogy</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 04
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    Classroom Management
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Effective strategies for engaging and managing classrooms.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Behavioral Dynamics</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 05
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    Child Psychology
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Understanding children&apos;s behaviour, growth and development.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Growth Milestones</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] hover:border-[#3C2350]/40 hover:shadow-saas transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E6E0E8]">
                      CORE PROGRAM 06
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2 leading-snug">
                    Practical Montessori Activities
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Hands-on learning using Montessori educational materials.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E6E0E8] flex items-center justify-between text-xs text-[#3C2350] font-semibold">
                  <span>Sensorial &amp; Math Apparatus</span>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: TRAINING METHODOLOGY */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-y border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                ACADEMIC RIGOUR
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                Learning That Goes Beyond Theory
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
                Our training approach prepares students to understand educational concepts and apply them in real classroom environments.
              </p>
            </div>

            {/* 7 Learning Elements Sequence (from PDF Page 8) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
              
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">01</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Theory Sessions
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Core educational philosophies &amp; foundational learning principles.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">02</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Practical Demos
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Faculty-led demonstrations of apparatus and presentations.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">03</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Classroom Observation
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Direct observations of active classroom environments &amp; dynamics.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">04</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Montessori Activities
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Hands-on practice with specialized apparatus for mastery.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">05</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Assignments
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Structured coursework reinforcing curriculum planning.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">06</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Assessments
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Practical viva, portfolio reviews &amp; written evaluations.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] flex flex-col justify-between relative group hover:border-[#3C2350] transition-colors">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#C9A24D] block mb-3">07</span>
                  <h3 className="font-heading text-sm font-bold text-[#3C2350] mb-1.5">
                    Interactive Learning
                  </h3>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                    Simulated teaching, peer discussions &amp; feedback loops.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: WHY PARTNER WITH SUPER CROWN FOUNDATION? */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-[#FAF8F5]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                PARTNERSHIP ADVANTAGES
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                Everything You Need to Build an Educational Centre
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
                Super Crown Foundation equips franchise partners with proven operational systems, recognized branding, and comprehensive academic support to build a thriving learning hub.
              </p>
            </div>

            {/* 5 Benefits Grid (from PDF Page 12) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center mb-5 text-[#3C2350]">
                    <ShieldCheck className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Established Brand Identity
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Operate under a respected institutional name founded in 2011 with a legacy of preparing thousands of teachers.
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#3C2350]">
                  Immediate Community Trust
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center mb-5 text-[#3C2350]">
                    <BookOpen className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Academic Support
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Full access to structured curriculum manuals, lesson syllabi, study materials, and practical activity guidelines.
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#3C2350]">
                  Complete Course Syllabus
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center mb-5 text-[#3C2350]">
                    <GraduationCap className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Training Support
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Extensive training for your faculty and academic directors to ensure your classroom teaching matches central standards.
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#3C2350]">
                  Faculty Enablement
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center mb-5 text-[#3C2350]">
                    <Target className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Marketing Guidance
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Branded collaterals, digital promotional materials, banner artworks, and strategic advice on student admissions.
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#3C2350]">
                  Student Enrolment Support
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#E6E0E8] shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center mb-5 text-[#3C2350]">
                    <Building className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2.5">
                    Operational Assistance
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Step-by-step guidance on centre layout, batch scheduling, enquiry handling, and daily administrative best practices.
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#3C2350]">
                  Streamlined Centre Setup
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: FRANCHISE SUPPORT */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-t border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                FOUR PILLARS OF ASSISTANCE
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                Your Partner in Every Step
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
                We provide end-to-end support to help our franchise partners succeed and make a lasting impact in education.
              </p>
            </div>

            {/* 4 Categories (from PDF Page 13) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#E6E0E8] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider mb-3">
                    PILLAR 01
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">
                    Academic Support
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Complete curriculum access and teaching guidance.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E6E0E8] flex items-center gap-1.5 text-xs text-[#3C2350] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#C9A24D]" />
                  <span>Curriculum Manuals</span>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#E6E0E8] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider mb-3">
                    PILLAR 02
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">
                    Marketing Support
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Promotional materials and branding guidance.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E6E0E8] flex items-center gap-1.5 text-xs text-[#3C2350] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#C9A24D]" />
                  <span>Creative Assets</span>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#E6E0E8] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider mb-3">
                    PILLAR 03
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">
                    Training Support
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Faculty and operational training.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E6E0E8] flex items-center gap-1.5 text-xs text-[#3C2350] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#C9A24D]" />
                  <span>Faculty Enablement</span>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#E6E0E8] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider mb-3">
                    PILLAR 04
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-2">
                    Ongoing Assistance
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                    Continuous guidance for franchise partners.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E6E0E8] flex items-center gap-1.5 text-xs text-[#3C2350] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#C9A24D]" />
                  <span>Dedicated Mentorship</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: INVESTMENT DETAILS (Prominent & Transparent) */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-[#FAF8F5] border-y border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                TRANSPARENT TERMS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight">
                A Transparent Franchise Investment
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#665D69] mt-3">
                &ldquo;An investment in education is an investment in the future.&rdquo; Clear, upfront partnership terms with zero hidden recurring royalty charges.
              </p>
            </div>

            {/* Main Investment Box */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-[#3C2350]/20 p-8 sm:p-12 shadow-saas relative overflow-hidden">
              {/* Corner Accent Badge */}
              <div className="absolute top-0 right-0 bg-[#3C2350] text-[#C9A24D] px-6 py-2 rounded-bl-2xl text-[11px] font-heading font-extrabold uppercase tracking-wider">
                OFFICIAL 2026 TERMS
              </div>

              {/* Price Figures Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-[#E6E0E8]">
                
                {/* Franchise Fee */}
                <div>
                  <span className="text-xs font-bold text-[#665D69] uppercase tracking-wider block mb-1">
                    Franchise Fee
                  </span>
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#3C2350] tracking-tight">
                    ₹2,00,000
                  </div>
                  <span className="text-xs text-[#665D69] mt-1 block">
                    One-time initial brand &amp; curriculum fee
                  </span>
                </div>

                {/* Royalty */}
                <div className="sm:border-l sm:border-[#E6E0E8] sm:pl-8">
                  <span className="text-xs font-bold text-[#665D69] uppercase tracking-wider block mb-1">
                    Royalty
                  </span>
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#C9A227] tracking-tight">
                    No Royalty
                  </div>
                  <span className="text-xs text-[#665D69] mt-1 block">
                    0% recurring fee on your centre&apos;s student fees
                  </span>
                </div>

              </div>

              {/* Included Items (from PDF Page 14) */}
              <div className="pt-8">
                <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#3C2350] mb-4">
                  What is Included in Your Franchise Package:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-center gap-3 text-sm text-[#3C2350] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
                    <span>Brand Rights</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#3C2350] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
                    <span>Curriculum Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#3C2350] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
                    <span>Training Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#3C2350] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
                    <span>Marketing Guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#3C2350] font-medium sm:col-span-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
                    <span>Academic Resources &amp; Student Study Guides</span>
                  </div>
                </div>
              </div>

              {/* Disclaimers & Regulatory Transparency (Explicitly required) */}
              <div className="mt-8 pt-6 border-t border-[#E6E0E8] bg-[#FAF8F5] -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 p-6 sm:p-8 text-xs text-[#665D69] leading-relaxed">
                <p className="font-semibold text-[#3C2350] mb-1">
                  Important Notice Regarding Centre Setup:
                </p>
                <p>
                  The ₹2,00,000 fee grants institutional brand authorization, curriculum access, and initial training support. Additional setup requirements (such as classroom premises, interior furnishings, educational materials, applicable taxes, and agreement terms) are tailored to your chosen location and will be explained during the franchise consultation.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: FRANCHISE APPLICATION JOURNEY */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-b border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                FOUR-STEP PROCESS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                Franchise Application Journey
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#665D69] mt-4 leading-relaxed">
                A straightforward, collaborative pathway from initial enquiry to establishing your Montessori training centre.
              </p>
            </div>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1 */}
              <div className="relative bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8]">
                <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] font-heading font-extrabold text-sm flex items-center justify-center mb-5">
                  1
                </div>
                <h3 className="font-heading text-base font-bold text-[#3C2350] mb-2">
                  Submit an Enquiry
                </h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Fill out our franchise interest form with your contact details, target city, and background experience.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8]">
                <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] font-heading font-extrabold text-sm flex items-center justify-center mb-5">
                  2
                </div>
                <h3 className="font-heading text-base font-bold text-[#3C2350] mb-2">
                  Discuss Location &amp; Goals
                </h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Participate in an exploratory consultation with our leadership team to evaluate area feasibility.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8]">
                <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] font-heading font-extrabold text-sm flex items-center justify-center mb-5">
                  3
                </div>
                <h3 className="font-heading text-base font-bold text-[#3C2350] mb-2">
                  Review Franchise Proposal
                </h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Examine the comprehensive prospectus, curriculum framework, and operational guidelines.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0E8]">
                <div className="w-10 h-10 rounded-xl bg-[#3C2350] text-[#C9A24D] font-heading font-extrabold text-sm flex items-center justify-center mb-5">
                  4
                </div>
                <h3 className="font-heading text-base font-bold text-[#3C2350] mb-2">
                  Formal Discussion &amp; Agreement
                </h3>
                <p className="font-sans text-xs text-[#665D69] leading-relaxed">
                  Complete the formal partnership agreement and initiate faculty training and centre launch setup.
                </p>
              </div>

            </div>

            <div className="mt-8 p-4 rounded-xl bg-white border border-[#E6E0E8] text-xs text-[#665D69] text-center">
              * Note: Final approval and partnership allocation are subject to mutual discussion and formal agreement.
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* OUR GROWING FRANCHISE NETWORK */}
        {/* ========================================================= */}
        <FranchiseNetworkSection />

        {/* ========================================================= */}
        {/* SECTION 9: FRANCHISE ENQUIRY FORM */}
        {/* ========================================================= */}
        <section id="franchise-enquiry" className="py-20 lg:py-24 bg-[#FAF8F5] scroll-mt-24">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column (Information & Trust - 5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                    START THE CONVERSATION
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                    Let&apos;s Build Something Meaningful Together
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-[#665D69] mt-3 leading-relaxed">
                    Tell us a little about yourself and your interest in becoming a Super Crown Foundation franchise partner.
                  </p>
                </div>

                {/* Direct Contact Cards */}
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#E6E0E8] flex items-start gap-4 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center shrink-0 text-[#3C2350]">
                      <Phone className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#665D69]">
                        Call Our Franchise Team
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm font-bold text-[#3C2350] mt-0.5">
                        <a href="tel:+919600151377" className="hover:text-[#C9A227] transition-colors">
                          +91 96001 51377
                        </a>
                        <span>/</span>
                        <a href="tel:+918667043942" className="hover:text-[#C9A227] transition-colors">
                          +91 86670 43942
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E6E0E8] flex items-start gap-4 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] flex items-center justify-center shrink-0 text-[#3C2350]">
                      <Building className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#665D69]">
                        Institutional Headquarters
                      </div>
                      <div className="text-xs text-[#3C2350] mt-0.5 leading-relaxed">
                        No.16/17, Old Township Road, Ambattur, Chennai – 600053
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Points */}
                <div className="p-5 rounded-2xl bg-white border border-[#E6E0E8] text-xs text-[#665D69] space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-[#3C2350]">
                    <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                    <span>Confidential Evaluation</span>
                  </div>
                  <p>All location enquiries are kept strictly confidential during area feasibility studies.</p>
                </div>
              </div>

              {/* Right Column (Interactive Form - 7 cols) */}
              <div className="lg:col-span-7">
                <FranchiseEnquiryForm />
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-y border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column (Sticky Heading - 4 cols) */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E6E0E8] mb-3">
                  <HelpCircle className="w-4 h-4 text-[#C9A24D]" />
                  <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                    FRANCHISE FAQ
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#665D69] mt-4 leading-relaxed">
                  Clear answers to key questions regarding our franchise partnership, curriculum, investment, and operational onboarding.
                </p>
                <div className="mt-6 pt-6 border-t border-[#E6E0E8] hidden lg:block">
                  <p className="text-xs text-[#665D69] mb-3">
                    Have a specific question not covered here?
                  </p>
                  <a
                    href="#franchise-enquiry"
                    className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-[#3C2350] hover:text-[#C9A227] transition-colors"
                  >
                    <span>Send Us a Query</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column (Accordion - 8 cols) */}
              <div className="lg:col-span-8">
                <FranchiseFAQ />
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: FINAL CTA */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 bg-[#3C2350] text-white relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10 text-center">
            
            <span className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest text-[#C9A24D] block mb-3">
              JOIN OUR GROWING NETWORK
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
              Partner With Us. Inspire Generations.
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto mt-4 leading-relaxed">
              Join us in empowering women, nurturing children and creating future educators through quality Montessori teacher training.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="#franchise-enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B38F1F] text-[#3C2350] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Discuss a Franchise Opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919600151377"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-xs sm:text-sm px-7 py-4 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#C9A24D]" />
                <span>Call: +91 96001 51377</span>
              </a>
            </div>

            <div className="mt-8 text-xs text-white/60">
              International Montessori Teacher Training School • Established 2011 • Chennai, India
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
