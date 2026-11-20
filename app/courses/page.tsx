import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedCourses from "@/components/FeaturedCourses";
import CounsellingForm from "@/components/CounsellingForm";
import { BookOpen, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Montessori Teacher Training Programs & Diplomas in Chennai",
  description:
    "Explore internationally recognized Montessori teacher training diplomas, English Phonics, Vedic Maths, and Child Psychology certifications at Super Crown Foundation Chennai.",
  keywords: [
    "Montessori teacher training courses Chennai",
    "Montessori diploma Ambattur",
    "Teacher training institute Chennai",
    "Early childhood education certification",
    "Montessori course fees Chennai",
  ],
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

const COURSES_FAQS = [
  {
    question: "What is the eligibility for Montessori Teacher Training in Chennai?",
    answer: "Minimum qualification for our foundational Diploma is 10+2 (Higher Secondary). For our PG Diploma, any Bachelor's degree (Arts, Science, Commerce, Engineering) is eligible. Homemakers, career-changers, and aspiring teachers are all welcomed.",
  },
  {
    question: "What is the difference between a Montessori Diploma and PG Diploma?",
    answer: "The foundational Diploma covers early childhood Montessori pedagogy (2.5 to 6 years), sensorial apparatus, and practical life exercises. The PG Diploma covers ages 2.5 to 12 years, advanced decimal mathematics, fractions, child psychology, and school administrative leadership.",
  },
  {
    question: "Are Super Crown Foundation certifications valid across India and abroad?",
    answer: "Yes! Our certifications and diplomas are internationally and nationally recognized, enabling graduates to teach in prestigious Montessori, CBSE, ICSE, and international schools across India and worldwide.",
  },
  {
    question: "Does Super Crown Foundation provide hands-on practical apparatus training?",
    answer: "Yes, 100%! We have a dedicated, state-of-the-art physical Montessori laboratory in Ambattur, Chennai equipped with authentic Maria Montessori sensory apparatus, bead frames, cylinder blocks, and language albums.",
  },
  {
    question: "Can working women and mothers join flexible weekend batches?",
    answer: "Absolutely. We offer regular weekday morning and afternoon batches as well as dedicated weekend (Saturday & Sunday) sessions designed specifically for working professionals and mothers.",
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COURSES_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org FAQPage Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <Navbar />
      <main className="flex-grow pt-[90px]">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] py-20 border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-4">
              <BookOpen className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Academic Programs & Certifications
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] mb-4 tracking-tight">
              Montessori Teacher Training Programs
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#665D69] max-w-2xl mx-auto leading-relaxed">
              Explore our range of internationally accredited diplomas, skill certifications, and specialized classroom leadership workshops designed for modern educators.
            </p>
          </div>
        </section>

        <FeaturedCourses />

        {/* SEO FAQ Section */}
        <section className="py-20 bg-white border-t border-[#E6E0E8]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-3">
                <HelpCircle className="w-4 h-4 text-[#C9A24D]" />
                <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                  Admissions & Course FAQs
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3C2350]">
                Frequently Asked Questions About Courses
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#665D69] mt-2">
                Have questions about our Montessori diplomas, batch timings, or practical training? Find quick answers below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {COURSES_FAQS.map((faq, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E6E0E8] flex flex-col justify-start">
                  <h3 className="font-heading text-lg font-bold text-[#3C2350] mb-3 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A24D] shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="font-sans text-sm text-[#5A4E61] leading-relaxed pl-7.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CounsellingForm />
      </main>
      <Footer />
    </div>
  );
}

