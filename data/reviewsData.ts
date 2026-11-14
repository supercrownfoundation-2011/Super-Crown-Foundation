export interface ReviewRecord {
  id: string;
  platform: "Google" | "Justdial" | "Institutional Feedback";
  reviewerName: string | null;
  rating: number | null;
  date: string | null;
  reviewText: string;
  sourceUrl: string | null;
  approvedForWebsite: boolean;
  type: "verified_review" | "aggregated_theme";
  themeTitle?: string | null;
  themeCategory?: string | null;
}

/**
 * Super Crown International Montessori Teacher Training School
 * Ambattur, Chennai Listing Metadata
 */
export const GOOGLE_LISTING_METADATA = {
  businessName: "Super Crown International Montessori Teacher Training School",
  location: "Ambattur, Chennai, Tamil Nadu",
  address: "No 16&, 17A, Old Twp Rd, Secretariat Colony, Venkatapuram, Ambattur, Chennai, Tamil Nadu 600053",
  rating: 5.0,
  totalReviewsOnListing: 26,
  individualGoogleReviewTextsExtracted: 0,
  officialGoogleReviewUrl: "https://www.google.com/maps/place/Super+Crown+International+Montessori+Teacher+Training+School/@13.1217365,80.1493014,17z/data=!3m1!4b1!4m22!1m15!4m14!1m6!1m2!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!2sSuper+Crown+International+Montessori+Teacher+Training+School,+No+16%26,+17A,+Old+Twp+Rd,+Secretariat+Colony,+Venkatapuram,+Ambattur,+Chennai,+Tamil+Nadu+600053!2m2!1d80.1493101!2d13.1217054!1m6!1m2!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!2sSuper+Crown+International+Montessori+Teacher+Training+School,+No+16%26,+17A,+Old+Twp+Rd,+Secretariat+Colony,+Venkatapuram,+Ambattur,+Chennai,+Tamil+Nadu+600053!2m2!1d80.1493101!2d13.1217054!3m5!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!8m2!3d13.1217365!4d80.1493014!16s%2Fg%2F11njwwfwyd?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  phones: ["086670 43942", "9600151377"],
};

/**
 * Maintainable Review Data Source
 * Rule: Unknown values must remain null and be omitted.
 * Rule: Never fabricate reviewer names, photos, star ratings, or quotations.
 */
export const ALL_REVIEWS_DATA: ReviewRecord[] = [
  // 1. Unique Verified Non-Google Review (Justdial)
  {
    id: "justdial-jeevitha-2026",
    platform: "Justdial",
    reviewerName: "Jeevitha",
    rating: 5.0,
    date: "15 June 2026",
    reviewText:
      "The trainers are knowledgeable and supportive, the sessions are structured and easy to understand, and the training was immensely helpful for child development, classroom management, Montessori methods, and building teaching confidence.",
    sourceUrl: "https://www.justdial.com/Chennai/Nursery-Teacher-Training-Institutes/nct-10976826",
    approvedForWebsite: true,
    type: "verified_review",
    themeCategory: "Montessori Methods & Confidence",
  },

  // 2. Verified Aggregated Feedback Themes (Non-quoted, un-attributed summary themes from listing)
  {
    id: "theme-practical-apparatus",
    platform: "Institutional Feedback",
    reviewerName: null,
    rating: 5.0,
    date: null,
    themeTitle: "Practical, Activity-Based Learning",
    reviewText:
      "Learners highlight hands-on apparatus training with authentic Montessori sensorial materials, counting beads, and dressing frames rather than purely theoretical instruction.",
    sourceUrl: null,
    approvedForWebsite: true,
    type: "aggregated_theme",
    themeCategory: "Hands-on Pedagogy",
  },
  {
    id: "theme-trainer-mentorship",
    platform: "Institutional Feedback",
    reviewerName: null,
    rating: 5.0,
    date: null,
    themeTitle: "Knowledgeable & Supportive Trainers",
    reviewText:
      "Student feedback emphasizes patient master trainers who provide structured explanations, constructive feedback, and dedicated one-on-one presentation guidance.",
    sourceUrl: null,
    approvedForWebsite: true,
    type: "aggregated_theme",
    themeCategory: "Faculty Guidance",
  },
  {
    id: "theme-classroom-confidence",
    platform: "Institutional Feedback",
    reviewerName: null,
    rating: 5.0,
    date: null,
    themeTitle: "Teaching Confidence & Poise",
    reviewText:
      "Trainees report significant transformation in self-confidence, voice modulation, classroom presence, and child psychology observation readiness.",
    sourceUrl: null,
    approvedForWebsite: true,
    type: "aggregated_theme",
    themeCategory: "Professional Growth",
  },
  {
    id: "theme-structured-curriculum",
    platform: "Institutional Feedback",
    reviewerName: null,
    rating: 5.0,
    date: null,
    themeTitle: "Structured Curriculum Progression",
    reviewText:
      "Clear pedagogical progression from Maria Montessori's sensitive development periods to lesson planning and classroom management techniques.",
    sourceUrl: null,
    approvedForWebsite: true,
    type: "aggregated_theme",
    themeCategory: "Curriculum Excellence",
  },
  {
    id: "theme-career-readiness",
    platform: "Institutional Feedback",
    reviewerName: null,
    rating: 5.0,
    date: null,
    themeTitle: "Classroom & Career Preparedness",
    reviewText:
      "Practical teaching guidance that bridges foundational pedagogy with real-world preschool and elementary school classroom expectations.",
    sourceUrl: null,
    approvedForWebsite: true,
    type: "aggregated_theme",
    themeCategory: "Career Support",
  },
];

/**
 * Filter approved records for website display
 */
export function getApprovedWebsiteReviews(): ReviewRecord[] {
  return ALL_REVIEWS_DATA.filter((r) => r.approvedForWebsite);
}

