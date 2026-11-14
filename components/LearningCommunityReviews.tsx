"use client";

import React, { useState } from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  ReviewRecord,
  ALL_REVIEWS_DATA,
  GOOGLE_LISTING_METADATA,
} from "@/data/reviewsData";

// Distribute records into three vertical columns for desktop
const COLUMN_1_ITEMS: ReviewRecord[] = [
  ALL_REVIEWS_DATA[0], // Verified Justdial review (Jeevitha)
  ALL_REVIEWS_DATA[1], // Practical, Activity-Based Learning
];

const COLUMN_2_ITEMS: ReviewRecord[] = [
  ALL_REVIEWS_DATA[2], // Knowledgeable & Supportive Trainers
  ALL_REVIEWS_DATA[3], // Teaching Confidence & Poise
];

const COLUMN_3_ITEMS: ReviewRecord[] = [
  ALL_REVIEWS_DATA[4], // Structured Curriculum Progression
  ALL_REVIEWS_DATA[5], // Classroom & Career Preparedness
];

// Tablet two-column grouping
const TABLET_COL_1 = [ALL_REVIEWS_DATA[0], ALL_REVIEWS_DATA[1], ALL_REVIEWS_DATA[4]];
const TABLET_COL_2 = [ALL_REVIEWS_DATA[2], ALL_REVIEWS_DATA[3], ALL_REVIEWS_DATA[5]];

/**
 * Individual Testimonial / Feedback Card
 */
function ReviewCard({ review }: { review: ReviewRecord }) {
  const isVerified = review.type === "verified_review";

  return (
    <div
      tabIndex={0}
      className={`rounded-3xl p-6 sm:p-7 border shadow-xs transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E0E8] relative overflow-hidden`}
    >
      {/* Background Watermark Quote Icon */}
      <Quote
        className="w-14 h-14 text-[#3C2350]/5 absolute -top-1 -right-1 pointer-events-none group-hover:scale-110 transition-transform"
        aria-hidden="true"
      />

      <div>
        {/* Top Header: Star Rating & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex text-[#C9A227] gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {isVerified && (
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-extrabold uppercase tracking-wider text-[#3C2350] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E6E0E8]">
              <CheckCircle2 className="w-3 h-3 text-[#C9A227]" />
              Justdial Review
            </span>
          )}
        </div>

        {/* Content Body */}
        {isVerified ? (
          <p className="font-sans text-xs sm:text-sm text-[#3C2350] leading-relaxed mb-6 italic">
            &ldquo;{review.reviewText}&rdquo;
          </p>
        ) : (
          <div className="mb-6">
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#3C2350] mb-1.5 leading-snug">
              {review.themeTitle}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#5A4E61] leading-relaxed">
              {review.reviewText}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-[#3C2350]/10 flex items-center justify-between text-xs">
        {isVerified ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3C2350] text-[#C9A227] font-heading font-extrabold flex items-center justify-center text-xs border border-[#C9A227]/30 shadow-2xs">
                {review.reviewerName ? review.reviewerName.charAt(0) : "J"}
              </div>
              <div>
                <h5 className="font-heading font-extrabold text-xs sm:text-sm text-[#3C2350] leading-tight">
                  {review.reviewerName}
                </h5>
                <span className="font-sans text-[10px] text-[#665D69] font-medium block">
                  {review.date}
                </span>
              </div>
            </div>

            {review.sourceUrl && (
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#665D69] hover:text-[#3C2350] p-1.5 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                title="View original Justdial review"
                aria-label="View original Justdial review source"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="font-sans text-[11px] font-bold text-[#3C2350]">
              Super Crown Learning Community
            </span>
            <span className="font-sans text-[10px] text-[#665D69] font-medium">
              Ambattur, Chennai
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Vertical Continuous Marquee Column
 * Renders [items, items] and transforms from translateY(0) to translateY(-50%)
 */
function MarqueeColumn({
  items,
  animationClass,
  extraTopPadding = "",
}: {
  items: ReviewRecord[];
  animationClass: string;
  extraTopPadding?: string;
}) {
  return (
    <div className={`overflow-hidden h-full ${extraTopPadding}`}>
      <div className={`${animationClass} flex flex-col gap-5`}>
        {/* Sequence 1 */}
        <div className="flex flex-col gap-5 shrink-0">
          {items.map((item, idx) => (
            <ReviewCard key={`seq1-${item.id}-${idx}`} review={item} />
          ))}
        </div>
        {/* Sequence 2 (Mirrored for seamless infinite loop) */}
        <div className="flex flex-col gap-5 shrink-0" aria-hidden="true">
          {items.map((item, idx) => (
            <ReviewCard key={`seq2-${item.id}-${idx}`} review={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LearningCommunityReviews() {
  return (
    <section
      id="student-experiences"
      aria-label="Student Experiences and Learning Community Feedback"
      className="py-20 md:py-28 bg-white border-b border-[#E6E0E8]/70"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* STATIC SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 flex flex-col items-center gap-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15">
            <MessageSquare className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
              STUDENT EXPERIENCES
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
            Hear From Our <br />
            <span className="text-[#C9A227]">Learning Community</span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-base text-[#665D69] max-w-xl">
            Discover what learners value about their Montessori teacher-training journey.
          </p>

          {/* Rating Summary Pill Linking to Official Google Maps Listing */}
          <a
            href={GOOGLE_LISTING_METADATA.officialGoogleReviewUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#E6E0E8] shadow-2xs hover:border-[#C9A227] hover:bg-white transition-all group"
            title="View Super Crown on Google Maps"
          >
            <div className="flex items-center gap-0.5 text-[#C9A227]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-heading font-extrabold text-sm text-[#3C2350]">
              {GOOGLE_LISTING_METADATA.rating.toFixed(1)} / 5.0
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#665D69] group-hover:text-[#3C2350] transition-colors" />
          </a>
        </div>

        {/* ANIMATED VERTICAL MARQUEE WALL (Desktop 3 Cols / Tablet 2 Cols) */}
        <div className="relative h-[560px] sm:h-[600px] overflow-hidden marquee-wall rounded-3xl border border-[#E6E0E8]/70 bg-[#FAF8F5]/50 p-4 sm:p-6">
          {/* Subtle Top & Bottom Gradient Vignettes */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent z-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Desktop 3-Column Vertical Motion */}
          <div className="hidden lg:grid grid-cols-3 gap-6 h-full">
            <MarqueeColumn
              items={COLUMN_1_ITEMS}
              animationClass="animate-marquee-up-fast"
            />
            <MarqueeColumn
              items={COLUMN_2_ITEMS}
              animationClass="animate-marquee-down-mid"
              extraTopPadding="pt-6"
            />
            <MarqueeColumn
              items={COLUMN_3_ITEMS}
              animationClass="animate-marquee-up-slow"
              extraTopPadding="pt-12"
            />
          </div>

          {/* Tablet 2-Column Vertical Motion */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5 h-full">
            <MarqueeColumn
              items={TABLET_COL_1}
              animationClass="animate-marquee-up-fast"
            />
            <MarqueeColumn
              items={TABLET_COL_2}
              animationClass="animate-marquee-down-mid"
              extraTopPadding="pt-8"
            />
          </div>

          {/* Mobile 1-Column Smooth Marquee Stream (Prevents mobile page scroll trapping) */}
          <div className="sm:hidden h-full overflow-hidden">
            <MarqueeColumn
              items={ALL_REVIEWS_DATA}
              animationClass="animate-marquee-up-slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

