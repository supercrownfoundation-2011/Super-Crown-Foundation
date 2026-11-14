"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Phone,
  User,
  Mail,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { MONTESSORI_DIPLOMAS, PROFESSIONAL_CERTIFICATIONS } from "@/data/courses";
import { WhatsAppIcon } from "./SocialIcons";

interface CounsellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

export default function CounsellingModal({
  isOpen,
  onClose,
  initialCourse,
}: CounsellingModalProps) {
  const defaultCourse = MONTESSORI_DIPLOMAS[0].title;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: initialCourse || defaultCourse,
    mode: "Offline / Campus",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone))
      errs.phone = "Enter a valid phone number";
    if (!formData.email.trim()) errs.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setErrors({});

    try {
      const sourcePage =
        typeof window !== "undefined" ? window.location.pathname : "/";
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
          window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
        }
      } else {
        setErrors({ form: data.error || "Failed to submit enquiry." });
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setErrors({ form: "Network error submitting enquiry. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#291735]/70 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-[#E6E0E8] shadow-2xl p-5 sm:p-9 rounded-3xl max-h-[92vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#665D69] hover:text-[#3C2350] hover:bg-[#F3EEF6] rounded-xl transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-6 text-center flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#25D366] flex items-center justify-center border border-[#25D366]/40 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            {leadId && (
              <span className="font-sans text-xs font-bold text-[#3C2350] bg-[#F3EEF6] px-4 py-1.5 rounded-full border border-[#3C2350]/20 tracking-wider">
                LEAD ID: {leadId}
              </span>
            )}

            <h3 className="font-heading text-2xl font-extrabold text-[#3C2350]">
              Course Enquiry Registered!
            </h3>
            <p className="font-sans text-sm text-[#665D69] max-w-md leading-relaxed">
              Thank you, <span className="font-semibold text-[#241828]">{formData.fullName}</span>. Your enquiry for <span className="font-bold text-[#3C2350]">{formData.course}</span> has been saved to our admissions system.
            </p>

            {/* WhatsApp Handoff Button */}
            {whatsappUrl && (
              <div className="w-full max-w-md pt-2 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-2xl font-sans text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Continue on WhatsApp (96001 51377)</span>
                </a>
                <span className="text-[11px] text-[#665D69] font-medium">
                  Connect immediately with our academic advisors on WhatsApp.
                </span>
              </div>
            )}

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 text-xs text-[#665D69] hover:text-[#3C2350] underline font-semibold transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase text-[#C9A227] tracking-wider block mb-1">
                COURSE ENQUIRY
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350]">
                Enquire About Course
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#665D69] mt-1">
                Speak directly with our academic team to learn more about admissions, schedule, and curriculum.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errors.form}
                </div>
              )}

              {/* Selected Program Display / Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#3C2350] mb-1">
                  Selected Programme *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-[#665D69] absolute left-3.5 top-3.5" />
                  <select
                    disabled={loading}
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
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
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#3C2350] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#665D69] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    disabled={loading}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl pl-10 pr-4 py-3 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                  />
                </div>
                {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3C2350] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#665D69] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      disabled={loading}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 96001 51377"
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl pl-10 pr-4 py-3 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3C2350] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#665D69] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email address"
                      className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl pl-10 pr-4 py-3 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all disabled:opacity-50"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-[#3C2350] mb-2">
                  Preferred Learning Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Offline / Campus", "Online / Remote", "Hybrid / Weekend"].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      disabled={loading}
                      onClick={() => setFormData({ ...formData, mode })}
                      className={`py-2 px-2 text-[11px] font-bold uppercase tracking-wider text-center rounded-xl border transition-all cursor-pointer ${
                        formData.mode === mode
                          ? "bg-[#3C2350] text-white border-[#3C2350] shadow-sm"
                          : "bg-[#FAF8F5] text-[#665D69] border-[#E6E0E8] hover:border-[#3C2350]"
                      }`}
                    >
                      {mode.split(" / ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#3C2350] mb-1">
                  Questions or Note (Optional)
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific questions about fees, timings, or syllabus..."
                    className="w-full bg-[#FAF8F5] border border-[#E6E0E8] rounded-xl px-4 py-2.5 text-sm text-[#241828] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 focus:border-[#3C2350] transition-all resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#3C2350] text-white py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95 disabled:opacity-60"
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

              <div className="mt-4 pt-3 border-t border-[#E6E0E8]/70 text-center">
                <span className="font-sans text-[11px] text-[#665D69]">
                  Or call admissions directly:{" "}
                  <a
                    href="tel:+919600151377"
                    className="font-bold text-[#3C2350] hover:text-[#C9A227] transition-colors"
                  >
                    96001 51377
                  </a>{" "}
                  /{" "}
                  <a
                    href="tel:+918667043942"
                    className="font-bold text-[#3C2350] hover:text-[#C9A227] transition-colors"
                  >
                    086670 43942
                  </a>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
