"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, MessageSquare } from "lucide-react";
import { MONTESSORI_DIPLOMAS, PROFESSIONAL_CERTIFICATIONS } from "@/data/courses";
import { WhatsAppIcon } from "./SocialIcons";

export default function CounsellingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: MONTESSORI_DIPLOMAS[0].title,
    mode: "Offline / Campus",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone)) errs.phone = "Enter a valid phone number";
    if (!formData.email.trim()) errs.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setErrors({});

    try {
      const sourcePage = typeof window !== "undefined" ? window.location.pathname : "/";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          course: formData.course,
          mode: formData.mode,
          message: formData.message,
          sourcePage,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLeadId(data.leadId);
        setWhatsappUrl(data.whatsappUrl);
        setSubmitted(true);

        // Automatic WhatsApp Handoff
        if (data.whatsappUrl && typeof window !== "undefined") {
          const opened = window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
          if (!opened) {
            // Popup blocked by browser; user can click the button on the confirmation view
            console.log("Popup blocked by browser; fallback button presented.");
          }
        }
      } else {
        setErrors({ form: data.error || "Failed to submit enquiry. Please try again." });
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setErrors({ form: "Network error submitting enquiry. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="counselling-form-section" className="py-20 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block">
              ADMISSIONS & GUIDANCE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
              Ready to Begin Your Montessori Educator Journey?
            </h2>
            <p className="font-sans text-base text-[#665D69] leading-relaxed">
              Enquire today to speak with our academic guidance team regarding course details, learning approaches, and enrolment procedures.
            </p>

            {/* Step Sequence */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E6E0E8] shadow-xs">
                <span className="font-heading text-xs font-extrabold text-[#3C2350] bg-[#C9A227] px-3 py-1.5 rounded-xl">01</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#3C2350]">Submit Enquiry</h4>
                  <p className="font-sans text-xs text-[#665D69]">Fill out your contact details & preferred programme.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E6E0E8] shadow-xs">
                <span className="font-heading text-xs font-extrabold text-[#3C2350] bg-[#C9A227] px-3 py-1.5 rounded-xl">02</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#3C2350]">Automatic Sheets Record</h4>
                  <p className="font-sans text-xs text-[#665D69]">Your lead is logged permanently in our admissions spreadsheet.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E6E0E8] shadow-xs">
                <span className="font-heading text-xs font-extrabold text-[#3C2350] bg-[#C9A227] px-3 py-1.5 rounded-xl">03</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#3C2350]">Instant WhatsApp Connect</h4>
                  <p className="font-sans text-xs text-[#665D69]">Connect directly to WhatsApp (+91 96001 51377) for rapid counsel.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Block */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-[#E6E0E8] shadow-xl relative">
            <h3 className="font-heading text-2xl font-extrabold text-[#3C2350] mb-8 pb-4 border-b border-[#E6E0E8]">
              Enquire About Courses
            </h3>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#25D366] flex items-center justify-center border border-[#25D366]/40 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                {leadId && (
                  <span className="font-sans text-xs font-bold text-[#3C2350] bg-[#F3EEF6] px-4 py-1.5 rounded-full border border-[#3C2350]/20 tracking-wider">
                    LEAD ID: {leadId}
                  </span>
                )}

                <h4 className="font-heading text-2xl font-bold text-[#3C2350]">
                  Enquiry Registered, {formData.fullName}!
                </h4>
                <p className="font-sans text-sm text-[#665D69] max-w-md leading-relaxed">
                  Your enquiry for <span className="font-bold text-[#3C2350]">{formData.course}</span> has been logged into our admissions system.
                </p>

                {/* WhatsApp Action Button */}
                {whatsappUrl && (
                  <div className="w-full max-w-md pt-3 flex flex-col gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-2xl font-sans text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer active:scale-95"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                      <span>Continue to WhatsApp (96001 51377)</span>
                    </a>
                    <span className="text-[11px] text-[#665D69] font-medium">
                      If WhatsApp did not open automatically, click above to send your pre-filled enquiry.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      course: MONTESSORI_DIPLOMAS[0].title,
                      mode: "Offline / Campus",
                      message: "",
                    });
                  }}
                  className="mt-6 text-xs text-[#665D69] hover:text-[#3C2350] underline font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Course Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.form && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errors.form}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      disabled={loading}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3.5 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    />
                    {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      disabled={loading}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 96001 51377"
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3.5 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3.5 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Course Select */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                      Programme Interested In
                    </label>
                    <select
                      disabled={loading}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    >
                      <optgroup label="Montessori Teacher Training">
                        {MONTESSORI_DIPLOMAS.map((prog) => (
                          <option key={prog.id} value={prog.title}>
                            {prog.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Professional Certification Courses">
                        {PROFESSIONAL_CERTIFICATIONS.map((cert) => (
                          <option key={cert.id} value={cert.title}>
                            {cert.title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Mode */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                      Preferred Mode
                    </label>
                    <select
                      disabled={loading}
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3.5 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    >
                      <option value="Offline / Campus">Offline / Campus</option>
                      <option value="Online / Remote">Online / Remote</option>
                      <option value="Hybrid / Weekend">Hybrid / Weekend</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message / Questions */}
                <div>
                  <label className="block font-sans text-xs font-bold text-[#3C2350] mb-2">
                    Questions or Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your learning goals or any questions regarding admissions..."
                    className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-3 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#3C2350] text-white py-4 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C9A227]" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry & Chat on WhatsApp</span>
                        <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#665D69]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span>Instant WhatsApp handoff to <strong>+91 96001 51377</strong></span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
