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
      className="rounded-3xl p-6 sm:p-7 border shadow-md transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1 bg-white border-[#E6E0E8] hover:border-[#C9A24D] relative overflow-hidden"
    >
      {/* Background Watermark Quote Icon */}
      <Quote
        className="w-14 h-14 text-[#C9A24D]/10 absolute -top-1 -right-1 pointer-events-none group-hover:scale-110 transition-transform"
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
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-extrabold uppercase tracking-wider text-[#3C2350] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#C9A24D]/30">
              <CheckCircle2 className="w-3 h-3 text-[#C9A227]" />
              Justdial Verified
            </span>
          )}
        </div>

        {/* Content Body */}
        {isVerified ? (
          <p className="font-sans text-xs sm:text-sm text-[#241828] leading-relaxed mb-6 italic font-medium">
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
              <div className="w-9 h-9 rounded-full bg-[#3C2350] text-[#C9A24D] font-heading font-extrabold flex items-center justify-center text-xs border border-[#C9A24D]/40 shadow-2xs">
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
      id="reviews"
      aria-label="Student Experiences and Verified Learning Community Reviews"
      className="py-20 md:py-28 bg-[#3C2350] text-white relative overflow-hidden border-y border-[#C9A227]/30"
    >
      {/* Invisible anchor for backward compatibility with #student-experiences */}
      <span id="student-experiences" className="sr-only">Student Reviews</span>

      {/* Radiant Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        {/* STATIC SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 flex flex-col items-center gap-3.5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C9A24D]/40 backdrop-blur-xs">
            <Star className="w-3.5 h-3.5 text-[#C9A24D] fill-current" />
            <span className="font-sans text-xs font-bold text-[#C9A24D] tracking-wider uppercase">
              VERIFIED RATINGS &amp; REVIEWS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What Our Students Say — <br />
            <span className="text-[#C9A24D]">Real Experiences &amp; Reviews</span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-base text-white/80 max-w-xl leading-relaxed">
            Discover what our Montessori trainees and alumnae value about their practical learning journey at Super Crown Foundation.
          </p>

          {/* Prominent Google & Justdial Rating Summary Ribbon */}
          <a
            href={GOOGLE_LISTING_METADATA.officialGoogleReviewUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 border border-white/20 shadow-md hover:border-[#C9A24D] hover:bg-white/15 transition-all group backdrop-blur-xs"
            title="View verified reviews on Google Maps"
          >
            <div className="flex items-center gap-1 text-[#C9A24D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-heading font-extrabold text-sm sm:text-base text-white">
              {GOOGLE_LISTING_METADATA.rating.toFixed(1)} / 5.0
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-xs font-sans font-semibold text-white/80 hidden sm:inline">
              Google &amp; Justdial Verified
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A24D] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* ANIMATED VERTICAL MARQUEE WALL (Desktop 3 Cols / Tablet 2 Cols) */}
        <div className="relative h-[560px] sm:h-[620px] overflow-hidden marquee-wall rounded-3xl border border-[#C9A227]/25 bg-black/20 p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
          {/* Top & Bottom Gradient Vignettes fading into Royal Purple #3C2350 */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#3C2350] via-[#3C2350]/80 to-transparent z-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3C2350] via-[#3C2350]/80 to-transparent z-20"
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

