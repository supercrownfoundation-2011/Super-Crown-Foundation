import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounsellingForm from "@/components/CounsellingForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Navigation } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactData";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us & Campus Admissions | Super Crown Foundation Chennai",
  description:
    "Contact Super Crown Foundation in Ambattur, Chennai. Enquire about Montessori teacher training admissions, batch timings, course fees, or schedule a campus visit. Call +91 96001 51377.",
  keywords: [
    "Montessori teacher training institute in Ambattur",
    "Teacher training center near me Chennai",
    "Montessori training admissions Chennai",
    "Super Crown Foundation contact number",
    "Teacher training institute Ambattur",
  ],
  openGraph: {
    title: "Contact Super Crown Foundation | Ambattur, Chennai",
    description:
      "Get in touch with admissions counselors for course details, fee structures, and campus visits. Call +91 96001 51377 or visit our Ambattur campus.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

const CONTACT_FAQS = [
  {
    question: "Where is Super Crown Foundation campus located in Chennai?",
    answer: "Our main training campus and practical Montessori laboratory is located at No 16 & 17A, Old Twp Rd, Secretariat Colony, Venkatapuram, Ambattur, Chennai, Tamil Nadu 600053.",
  },
  {
    question: "How can I schedule a campus visit or practical lab demo in Ambattur?",
    answer: "You can call our admissions counseling desk directly at +91 96001 51377 or WhatsApp us to schedule a walk-in visit from Monday to Saturday, 9:00 AM to 6:00 PM.",
  },
  {
    question: "What are the office timings and admission contact numbers?",
    answer: "Our administrative office operates Monday through Saturday from 9:00 AM to 6:00 PM. Helplines: +91 96001 51377 and +91 86670 43942.",
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONTACT_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
              <MessageSquare className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                Reach Out To Us
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] mb-4 tracking-tight">
              Contact Super Crown Foundation
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#665D69] max-w-2xl mx-auto leading-relaxed">
              Whether you have questions about admissions, campus visits, or Montessori teacher training programs, our counseling team is here to assist you.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Campus Address Card */}
              <div className="bg-[#FAF8F5] border border-[#E6E0E8] p-6 rounded-3xl text-center flex flex-col items-center justify-between shadow-xs hover:border-[#C9A24D]/40 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white text-[#3C2350] rounded-2xl border border-[#E6E0E8] flex items-center justify-center mb-4 shadow-sm">
                    <MapPin className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-[#3C2350] mb-2">Main Campus</h4>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed mb-4">
                    {CONTACT_INFO.address}
                  </p>
                </div>
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2350] hover:text-[#C9A24D] transition-colors uppercase tracking-wider"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Phone Card */}
              <div className="bg-[#FAF8F5] border border-[#E6E0E8] p-6 rounded-3xl text-center flex flex-col items-center justify-between shadow-xs hover:border-[#C9A24D]/40 transition-all">
                <div className="flex flex-col items-center w-full">
                  <div className="w-12 h-12 bg-white text-[#3C2350] rounded-2xl border border-[#E6E0E8] flex items-center justify-center mb-4 shadow-sm">
                    <Phone className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-[#3C2350] mb-2">Direct Phone</h4>
                  <div className="flex flex-col gap-1.5 mb-4">
                    {CONTACT_INFO.phones.map((phone) => (
                      <a
                        key={phone.display}
                        href={`tel:${phone.tel}`}
                        className="font-sans text-sm font-semibold text-[#3C2350] hover:text-[#C9A24D] transition-colors"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
                <span className="font-sans text-[11px] text-[#665D69]">
                  Call for admissions & counseling
                </span>
              </div>

              {/* Email Inquiries Card */}
              <div className="bg-[#FAF8F5] border border-[#E6E0E8] p-6 rounded-3xl text-center flex flex-col items-center justify-between shadow-xs hover:border-[#C9A24D]/40 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white text-[#3C2350] rounded-2xl border border-[#E6E0E8] flex items-center justify-center mb-4 shadow-sm">
                    <Mail className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-[#3C2350] mb-2">Email Inquiries</h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="font-sans text-xs text-[#665D69] hover:text-[#3C2350] transition-colors leading-relaxed mb-4"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <span className="font-sans text-[11px] text-[#665D69]">
                  Expect responses within 24 business hours
                </span>
              </div>

              {/* Office Hours Card */}
              <div className="bg-[#FAF8F5] border border-[#E6E0E8] p-6 rounded-3xl text-center flex flex-col items-center justify-between shadow-xs hover:border-[#C9A24D]/40 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white text-[#3C2350] rounded-2xl border border-[#E6E0E8] flex items-center justify-center mb-4 shadow-sm">
                    <Clock className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-[#3C2350] mb-2">Office Hours</h4>
                  <p className="font-sans text-xs text-[#665D69] leading-relaxed mb-4">
                    {CONTACT_INFO.officeHours}
                  </p>
                </div>
                <span className="font-sans text-[11px] text-[#665D69]">
                  Sunday: Closed
                </span>
              </div>
            </div>

            {/* Google Maps Campus Location Banner */}
            <div className="mt-8 rounded-3xl bg-[#FAF8F5] border border-[#E6E0E8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#3C2350] text-[#C9A24D] flex items-center justify-center shrink-0 shadow-sm">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#3C2350]">
                    Visit Our Campus in Ambattur, Chennai
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#665D69] mt-0.5">
                    {CONTACT_INFO.institutionName} • {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#3C2350] text-white hover:bg-[#291735] hover:text-[#C9A24D] font-sans text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm shrink-0 active:scale-95"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Social Media Channels Banner */}
            <div className="mt-6 rounded-3xl bg-[#FAF8F5] border border-[#E6E0E8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3C2350]">
                  Connect With Super Crown Online
                </h4>
                <p className="font-sans text-xs text-[#665D69] mt-0.5">
                  Follow our student activities, teacher workshops, and classroom demonstrations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={CONTACT_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E6E0E8] bg-white text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A24D] hover:border-[#3C2350] text-xs font-bold transition-all shadow-2xs group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C9A227] group-hover:text-[#C9A227]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E6E0E8] bg-white text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A24D] hover:border-[#3C2350] text-xs font-bold transition-all shadow-2xs group"
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2] group-hover:text-white" />
                  <span>Facebook</span>
                </a>
                <a
                  href={CONTACT_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E6E0E8] bg-white text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A24D] hover:border-[#3C2350] text-xs font-bold transition-all shadow-2xs group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0A66C2] group-hover:text-white" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={CONTACT_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E6E0E8] bg-white text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A24D] hover:border-[#3C2350] text-xs font-bold transition-all shadow-2xs group"
                >
                  <YoutubeIcon className="w-4 h-4 text-[#FF0000] group-hover:text-white" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <CounsellingForm />
      </main>
      <Footer />
    </div>
  );
}
