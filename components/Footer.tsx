"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, ArrowRight, ExternalLink, ArrowUp } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactData";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#3C2350] text-white pt-20 pb-10 border-t border-[#C9A227]/30 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-white font-heading font-extrabold text-xl tracking-tight">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center border border-[#C9A227] shadow-md">
                <img src="/logo.png" alt="Super Crown Foundation Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-extrabold text-lg text-white">
                  SUPER CROWN <span className="text-[#C9A227] font-normal">FOUNDATION</span>
                </span>
                <span className="text-[9px] font-sans font-extrabold tracking-[0.18em] text-[#C9A24D] uppercase mt-0.5">
                  SINCE 2011
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm text-[#C9A227] font-semibold italic">
              &ldquo;Building Great Teachers. Creating Brighter Futures.&rdquo;
            </p>

            <p className="font-sans text-xs text-white/70 leading-relaxed">
              An internationally recognized institution dedicated to shaping the educators of tomorrow through practical, rigorous Montessori teacher training.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold text-[#C9A24D] tracking-wider uppercase mb-1">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-[#C9A24D] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C9A24D] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#C9A24D] transition-colors">All Courses</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-[#C9A24D] transition-colors">Faculty Directory</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C9A24D] transition-colors">Campus Gallery</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C9A24D] transition-colors">Blog & Insights</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C9A24D] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold text-[#C9A24D] tracking-wider uppercase mb-1">
              Our Programs
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/courses" className="hover:text-[#C9A24D] transition-colors">
                  Early Childhood Diploma (3–6 yrs)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#C9A24D] transition-colors">
                  Elementary Certification (6–12 yrs)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#C9A24D] transition-colors">
                  Classroom Management & Leadership
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/courses"
                  className="text-[#C9A24D] font-bold flex items-center gap-1.5 hover:underline text-xs uppercase tracking-wider"
                >
                  View All Programs <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="font-heading text-xs font-bold text-[#C9A24D] tracking-wider uppercase mb-1">
                Get In Touch
              </h4>
              <ul className="flex flex-col gap-3 font-sans text-xs text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                  <a
                    href={CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A24D] transition-colors leading-relaxed group flex items-start gap-1"
                    title="View on Google Maps"
                  >
                    <span>{CONTACT_INFO.address}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {CONTACT_INFO.phones.map((phone, idx) => (
                      <span key={phone.display}>
                        <a
                          href={`tel:${phone.tel}`}
                          className="hover:text-[#C9A24D] transition-colors font-medium"
                        >
                          {phone.display}
                        </a>
                        {idx < CONTACT_INFO.phones.length - 1 && <span className="text-white/40">,</span>}
                      </span>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9A24D] shrink-0" />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="hover:text-[#C9A24D] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-[#C9A24D] tracking-wider uppercase mb-3">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={CONTACT_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] hover:text-[#291735] transition-all"
                  aria-label="Follow Super Crown Foundation on Instagram"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] hover:text-[#291735] transition-all"
                  aria-label="Follow Super Crown Foundation on Facebook"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] hover:text-[#291735] transition-all"
                  aria-label="Follow Super Crown Foundation on LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] hover:text-[#291735] transition-all"
                  aria-label="Subscribe to Super Crown Foundation on YouTube"
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60 font-sans">
          <p>© {new Date().getFullYear()} Super Crown Foundation. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Accreditation Info</Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 text-[#C9A24D] hover:text-white transition-colors cursor-pointer ml-1 py-1"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

