"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  Building2,
  ShieldCheck,
  Send,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialIcons";

export default function FranchiseEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    budget: "₹2,00,000 – ₹5,00,000 (Franchise Fee + Initial Setup)",
    experience: "Educator / Teacher",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone)) {
      errs.phone = "Enter a valid phone number (min 8 digits)";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.city.trim()) {
      errs.city = "Preferred city / location is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setErrors({});

    try {
      const formattedMessage = [
        `Preferred Location: ${formData.city.trim()}`,
        `Investment Budget: ${formData.budget}`,
        `Background / Experience: ${formData.experience}`,
        formData.message.trim() ? `Additional Notes: ${formData.message.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          course: "Franchise Opportunity",
          mode: `Location: ${formData.city.trim()}`,
          message: formattedMessage,
          sourcePage: "Franchise Page",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLeadId(data.leadId);
        setWhatsappUrl(data.whatsappUrl || "");
        setSubmitted(true);

        // Optional WhatsApp auto-open
        if (data.whatsappUrl && typeof window !== "undefined") {
          const opened = window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
          if (!opened) {
            console.log("Popup blocked by browser; user can use button below.");
          }
        }
      } else {
        setErrors({
          form: data.error || "Failed to submit franchise enquiry. Please try again.",
        });
      }
    } catch (err) {
      console.error("Franchise enquiry error:", err);
      setErrors({
        form: "Network error submitting enquiry. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setLeadId("");
    setWhatsappUrl("");
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      city: "",
      budget: "₹2,00,000 – ₹5,00,000 (Franchise Fee + Initial Setup)",
      experience: "Educator / Teacher",
      message: "",
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6E0E8] p-6 sm:p-10 lg:p-12 shadow-saas">
      {submitted ? (
        <div className="text-center py-8 sm:py-12 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3C2350]/10 border border-[#3C2350]/20 text-[#3C2350] flex items-center justify-center mb-6">
            <CheckCircle2 className="w-9 h-9 text-[#C9A227]" />
          </div>

          <span className="text-[11px] font-sans font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
            ENQUIRY RECEIVED
          </span>

          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3C2350] mb-3">
            Thank You for Your Interest!
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#665D69] max-w-lg mb-6 leading-relaxed">
            Your franchise enquiry has been recorded with reference{" "}
            <span className="font-mono font-bold text-[#3C2350] bg-[#FAF8F5] px-2 py-1 rounded-md border border-[#E6E0E8]">
              {leadId}
            </span>
            . Our franchise director will review your preferred location (
            <strong className="text-[#3C2350]">{formData.city}</strong>) and contact you
            within 24–48 hours for an exploratory discussion.
          </p>

          <div className="w-full max-w-md bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6E0E8] text-left mb-6 text-xs text-[#665D69] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#3C2350] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>Next Steps in the Franchise Journey:</span>
            </div>
            <p>1. Exploratory phone consultation &amp; city feasibility check.</p>
            <p>2. Review of the official Franchise Prospectus &amp; Academic Framework.</p>
            <p>3. Centre infrastructure consultation &amp; mutual agreement.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-[#FAF8F5] hover:bg-[#F3EEF6] text-[#3C2350] font-bold py-3.5 px-6 rounded-xl border border-[#E6E0E8] transition-all text-sm cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {errors.form && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Priya Natarajan"
                className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#241828] placeholder-[#665D69]/50 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 ${
                  errors.fullName ? "border-red-400 bg-red-50/30" : "border-[#E6E0E8]"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#241828] placeholder-[#665D69]/50 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 ${
                  errors.phone ? "border-red-400 bg-red-50/30" : "border-[#E6E0E8]"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. priya@example.com"
                className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#241828] placeholder-[#665D69]/50 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 ${
                  errors.email ? "border-red-400 bg-red-50/30" : "border-[#E6E0E8]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* Preferred City / Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Preferred City / Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Coimbatore, Madurai, Bengaluru"
                className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#241828] placeholder-[#665D69]/50 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 ${
                  errors.city ? "border-red-400 bg-red-50/30" : "border-[#E6E0E8]"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Investment Budget */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Available Investment Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E6E0E8] bg-[#FAF8F5] text-sm text-[#241828] transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 cursor-pointer"
              >
                <option value="₹2,00,000 – ₹5,00,000 (Franchise Fee + Initial Setup)">
                  ₹2,00,000 – ₹5,00,000 (Franchise Fee + Initial Setup)
                </option>
                <option value="₹5,00,000 – ₹10,00,000 (Comprehensive Centre Setup)">
                  ₹5,00,000 – ₹10,00,000 (Comprehensive Centre Setup)
                </option>
                <option value="₹10,00,000+ (Multi-classroom / Regional Academy)">
                  ₹10,00,000+ (Multi-classroom / Regional Academy)
                </option>
                <option value="Exploring / To Be Discussed in Consultation">
                  Exploring / To Be Discussed in Consultation
                </option>
              </select>
              <p className="text-[11px] text-[#665D69] mt-1.5">
                Note: ₹2,00,000 is the franchise fee. Premises &amp; interior setup depend on your centre location.
              </p>
            </div>

            {/* Relevant Education / Business Experience */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
                Relevant Background / Experience
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E6E0E8] bg-[#FAF8F5] text-sm text-[#241828] transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20 cursor-pointer"
              >
                <option value="Educator / Teacher">Educator / Teacher</option>
                <option value="School / Preschool Administrator">
                  School / Preschool Administrator
                </option>
                <option value="Entrepreneur / Business Owner">
                  Entrepreneur / Business Owner
                </option>
                <option value="Working Professional entering Education">
                  Working Professional entering Education
                </option>
                <option value="Passionate about Women's Empowerment">
                  Passionate about Women&apos;s Empowerment
                </option>
                <option value="Other Professional Background">Other Professional Background</option>
              </select>
              <p className="text-[11px] text-[#665D69] mt-1.5">
                Helps us customize academic training and onboarding to your strengths.
              </p>
            </div>
          </div>

          {/* Message / Additional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2350] mb-2">
              Message or Specific Queries (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your target area, existing infrastructure (if any), or any specific questions you have regarding the franchise model..."
              className="w-full px-4 py-3 rounded-xl border border-[#E6E0E8] bg-[#FAF8F5] text-sm text-[#241828] placeholder-[#665D69]/50 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C2350]/20"
            />
          </div>

          {/* Transparent Notice */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E0E8] text-xs text-[#665D69] leading-relaxed flex items-start gap-2.5">
            <Building2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
            <span>
              <strong>Transparent Partnership:</strong> Final approval and franchise allocation are
              subject to exploratory discussion, location feasibility, and formal agreement. Submitting
              an enquiry does not obligate either party.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3C2350] hover:bg-[#291735] text-white py-4 rounded-xl font-heading font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#C9A227]" />
                <span>Submitting Franchise Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Franchise Enquiry</span>
                <Send className="w-4 h-4 text-[#C9A227]" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
