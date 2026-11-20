import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounsellingForm from "@/components/CounsellingForm";
import { DETAILED_COURSES, CourseDetail } from "@/data/courseDetails";
import {
  Clock,
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Briefcase,
  Users,
  Building,
  Phone,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(DETAILED_COURSES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = DETAILED_COURSES[slug];

  if (!course) {
    return {
      title: "Course Not Found | Super Crown Foundation",
    };
  }

  const canonicalUrl = `https://www.supercrownfoundation.com/courses/${slug}`;

  return {
    title: course.metaTitle,
    description: course.metaDescription,
    keywords: course.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.metaTitle,
      description: course.metaDescription,
      images: [course.image],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = DETAILED_COURSES[slug];

  if (!course) {
    notFound();
  }

  // Schema.org Structured Data: Course + BreadcrumbList + FAQPage
  const jsonLdCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.overview,
    provider: {
      "@type": "EducationalOrganization",
      name: "Super Crown Foundation",
      sameAs: "https://www.supercrownfoundation.com",
    },
    educationalCredentialAwarded: "Certification & Diploma",
    courseMode: "blended",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Classroom Hands-on Apparatus Lab & Workshop",
      duration: course.duration,
      location: {
        "@type": "Place",
        name: "Super Crown Foundation Campus",
        address: {
          "@type": "PostalAddress",
          streetAddress: "No 16 & 17A, Old Twp Rd, Secretariat Colony, Venkatapuram, Ambattur",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600053",
          addressCountry: "IN",
        },
      },
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
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
        name: "Courses",
        item: "https://www.supercrownfoundation.com/courses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `https://www.supercrownfoundation.com/courses/${course.slug}`,
      },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: course.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Super Crown Foundation, I would like to enquire about the ${course.title} batch timings, fee structure, and admissions.`
  );
  const whatsappUrl = `https://wa.me/919600151377?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <Navbar />

      <main className="flex-grow pt-[80px]">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-[#E6E0E8]/70 py-3.5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex items-center gap-2 text-xs font-semibold text-[#665D69]">
            <Link href="/" className="hover:text-[#3C2350] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9A24D]" />
            <Link href="/courses" className="hover:text-[#3C2350] transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span className="text-[#3C2350] font-bold truncate">{course.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white via-[#FAF8F5] to-white py-14 sm:py-20 border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-4">
                  <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                  <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                    {course.badge}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight mb-5 tracking-tight">
                  {course.title}
                </h1>

                <p className="font-sans text-base sm:text-lg text-[#5A4E61] leading-relaxed mb-8">
                  {course.overview}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] text-[#3C2350] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#665D69] block">Duration</span>
                      <span className="text-xs sm:text-sm font-bold text-[#3C2350]">{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] text-[#3C2350] flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#665D69] block">Training Mode</span>
                      <span className="text-xs sm:text-sm font-bold text-[#3C2350]">Hands-on Lab</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] text-[#3C2350] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#665D69] block">Placement</span>
                      <span className="text-xs sm:text-sm font-bold text-[#3C2350]">100% Guidance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Media Card */}
              <div className="w-full lg:w-[460px] shrink-0">
                <div className="rounded-3xl overflow-hidden border border-[#E6E0E8] shadow-xl bg-white relative">
                  <div className="aspect-[16/11] relative overflow-hidden bg-gray-200">
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24D] block">
                        Super Crown Foundation Ambattur
                      </span>
                      <span className="text-sm font-bold">Practical Sensorial Training Lab</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-6 rounded-xl font-sans text-xs font-extrabold uppercase tracking-wider hover:bg-[#1EBE5B] transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp with Admissions
                    </a>
                    <a
                      href="#enrol-form"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#3C2350] text-white py-3.5 px-6 rounded-xl font-sans text-xs font-extrabold uppercase tracking-wider hover:bg-[#291735] transition-colors shadow-sm"
                    >
                      Enquire via Web Form
                      <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content & Form Split Layout */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column (8 cols): Deep Course Content */}
              <div className="lg:col-span-8 flex flex-col gap-14">
                
                {/* 1. Who is this for */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <h2 className="font-heading text-2xl font-extrabold text-[#3C2350]">
                      Who Should Enrol in this Programme?
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.whoIsThisFor.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-[#4A3F50] font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Key Highlights */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <h2 className="font-heading text-2xl font-extrabold text-[#3C2350]">
                      Key Highlights & Practical Training
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {course.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#4A3F50] font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#3C2350] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Curriculum Modules */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-[#3C2350]">
                        Comprehensive Curriculum Modules
                      </h2>
                      <span className="text-xs text-[#665D69] font-medium">
                        Carefully structured according to international early childhood standards
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {course.curriculum.map((mod, idx) => (
                      <div key={idx} className="rounded-2xl border border-[#E6E0E8] bg-[#FAF8F5] p-6">
                        <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-4">
                          {mod.moduleTitle}
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#5A4E61]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Career Opportunities */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <h2 className="font-heading text-2xl font-extrabold text-[#3C2350]">
                      Career Outcomes & Placement Support
                    </h2>
                  </div>
                  <p className="font-sans text-sm text-[#665D69] leading-relaxed mb-6">
                    Graduates from Super Crown Foundation are actively sought after by leading Montessori schools, kindergarten campuses, CBSE, ICSE, and international educational institutions across Chennai and Tamil Nadu:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {course.careerOpportunities.map((career, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] text-xs sm:text-sm font-bold text-[#3C2350] flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A24D] shrink-0" />
                        <span>{career}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. FAQs with Accordion */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0E8] shadow-xs">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF6] flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-[#C9A24D]" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-[#3C2350]">
                        Frequently Asked Questions
                      </h2>
                      <span className="text-xs text-[#665D69]">
                        Common questions answered by admissions counselors
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {course.faqs.map((faq, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E6E0E8]">
                        <h3 className="font-heading text-base font-extrabold text-[#3C2350] mb-2.5">
                          {faq.question}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#5A4E61] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Sticky Sidebar with Counselling Form */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                
                {/* Course Fast Facts Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0E8] shadow-md flex flex-col gap-5 sticky top-[100px]">
                  <h3 className="font-heading text-xl font-extrabold text-[#3C2350]">
                    Admissions Quick Overview
                  </h3>

                  <div className="flex flex-col gap-4 text-xs sm:text-sm">
                    <div className="pb-3 border-b border-[#E6E0E8]">
                      <span className="text-[#665D69] block text-[11px] uppercase font-bold">Eligibility</span>
                      <span className="text-[#3C2350] font-bold">{course.eligibility}</span>
                    </div>

                    <div className="pb-3 border-b border-[#E6E0E8]">
                      <span className="text-[#665D69] block text-[11px] uppercase font-bold">Duration</span>
                      <span className="text-[#3C2350] font-bold">{course.duration}</span>
                    </div>

                    <div className="pb-3 border-b border-[#E6E0E8]">
                      <span className="text-[#665D69] block text-[11px] uppercase font-bold">Campus Location</span>
                      <span className="text-[#3C2350] font-bold">Ambattur, Chennai (Near Secretariat Colony)</span>
                    </div>

                    <div className="pb-3 border-b border-[#E6E0E8]">
                      <span className="text-[#665D69] block text-[11px] uppercase font-bold">Certification</span>
                      <span className="text-[#3C2350] font-bold">Internationally & Nationally Recognized</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E6E0E8] text-xs text-[#5A4E61] flex flex-col gap-2">
                    <span className="font-bold text-[#3C2350] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C9A24D]" />
                      Admissions Helpline
                    </span>
                    <a href="tel:+919600151377" className="font-extrabold text-[#3C2350] text-sm hover:underline">
                      +91 96001 51377 / +91 86670 43942
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Dedicated Course Enquiry Form Section */}
        <section id="enrol-form" className="py-20 bg-white border-t border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350] mb-3">
              Enrol in {course.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#665D69] max-w-xl mx-auto">
              Fill out the form below to receive course fee details, syllabus prospectus, and batch schedule via WhatsApp and email.
            </p>
          </div>
          <CounsellingForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
