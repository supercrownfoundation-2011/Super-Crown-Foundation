import React from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustTicker from "@/components/TrustTicker";
import ProgramCategories from "@/components/ProgramCategories";
import PopularPrograms from "@/components/PopularPrograms";
import WhySuperCrownSplit from "@/components/WhySuperCrownSplit";
import LearningCommunityReviews from "@/components/LearningCommunityReviews";
import BentoGallery from "@/components/BentoGallery";
import FAQSection from "@/components/FAQSection";
import HomepageFranchiseSection from "@/components/HomepageFranchiseSection";
import FinalCTA from "@/components/FinalCTA";
import CounsellingForm from "@/components/CounsellingForm";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* BRAND INTRO ANIMATED SPLASH SCREEN (Once per session) */}
      <SplashScreen />
      <Navbar />
      <main className="flex-grow">
        {/* SECTION 01: HERO & 3-BLOCK IMAGE COMPOSITION */}
        <Hero />

        {/* SECTION 02: ANIMATED TRUST & CREDENTIALS TICKER */}
        <TrustTicker />

        {/* SECTION 03: EXPLORE PROGRAM CATEGORIES */}
        <ProgramCategories />

        {/* SECTION 04: POPULAR PROGRAMS GRID */}
        <PopularPrograms />

        {/* SECTION 05: WHY SUPER CROWN SPLIT LAYOUT */}
        <WhySuperCrownSplit />

        {/* SECTION 06: ANIMATED LEARNING COMMUNITY REVIEWS */}
        <LearningCommunityReviews />

        {/* SECTION 07: BENTO-STYLE HOMEPAGE GALLERY */}
        <BentoGallery />

        {/* SECTION 08: FAQ ACCORDION */}
        <FAQSection />

        {/* SECTION 09: FRANCHISE OPPORTUNITY */}
        <HomepageFranchiseSection />

        {/* SECTION 10: FINAL CTA BANNER */}
        <FinalCTA />

        {/* INTEGRATED COUNSELLING FORM */}
        <CounsellingForm />
      </main>
      <Footer />
      {/* STICKY WHATSAPP FLOATING BUTTON */}
      <StickyWhatsApp />
    </div>
  );
}
