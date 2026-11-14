"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Super Crown Foundation — Premium Animated Opening Brand Introduction
 *
 * Sequence & Timing:
 * 0.0s – 0.6s: Solid warm ivory & champagne-gold background appears
 * 0.5s – 1.6s: Large official logo (340–400px) fades in and scales 80% -> 100% at exact viewport center
 * 1.6s – 2.7s: Logo smoothly moves towards the LEFT and reduces to 260–300px
 * 2.3s – 3.8s: Complete text block reveals on the RIGHT sequentially:
 *   - 2.3s: Line 1 — SUPER CROWN FOUNDATION (Single line on desktop, 44–50px, #3C2350)
 *   - 2.7s: Line 2 — (Educational & Charitable Trust) (20–23px, #A77B20)
 *   - 3.1s: Line 3 — International Montessori Teacher Training School (19–22px, #3C2350)
 *   - 3.5s: Line 4 — Empowering Women Through Education (19–21px, #A77B20)
 * 3.8s – 5.0s: HOLD the complete institutional lockup clearly so visitors can comfortably read it
 * 5.0s – 5.8s: Smooth fade-out of the splash screen to reveal the homepage
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Animation stages:
  // "bg" -> "logo-enter" -> "logo-move" -> "hold" -> "done"
  const [stage, setStage] = useState<"bg" | "logo-enter" | "logo-move" | "hold">("bg");
  const [lineIndex, setLineIndex] = useState(0); // 0 = none, 1 = Line 1, 2 = Line 2, etc.
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const closeSplash = useCallback(() => {
    setIsFadingOut(true);
    try {
      sessionStorage.setItem("scf_splash_shown", "true");
    } catch {
      // Storage restriction fallback
    }
    const t = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 750);
    timersRef.current.push(t);
  }, []);

  useEffect(() => {
    // Check session persistence & query overrides
    try {
      const params = new URLSearchParams(window.location.search);
      const forceSplash = params.get("splash") === "1" || params.get("preview") === "splash";
      const alreadyShown = sessionStorage.getItem("scf_splash_shown") === "true";
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!forceSplash && (alreadyShown || prefersReduced)) {
        setIsVisible(false);
        return;
      }
    } catch {
      // Security fallback
    }

    // Lock page scroll during brand splash animation
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Strict Timing Sequence:
    // 0.5s: Logo entrance at screen center
    const t1 = setTimeout(() => setStage("logo-enter"), 500);

    // 1.6s: Logo smoothly glides to the left & reduces to lockup size
    const t2 = setTimeout(() => setStage("logo-move"), 1600);

    // 2.3s – 3.5s: Sequential text line reveals
    const t3 = setTimeout(() => setLineIndex(1), 2300); // Line 1: SUPER CROWN FOUNDATION
    const t4 = setTimeout(() => setLineIndex(2), 2700); // Line 2: (Educational & Charitable Trust)
    const t5 = setTimeout(() => setLineIndex(3), 3100); // Line 3: International Montessori Teacher Training School
    const t6 = setTimeout(() => setLineIndex(4), 3500); // Line 4: Empowering Women Through Education

    // 3.8s: Hold complete composition in crisp alignment
    const t7 = setTimeout(() => setStage("hold"), 3800);

    // 5.0s: Smooth fade-out to reveal homepage
    const t8 = setTimeout(() => closeSplash(), 5000);

    // 6.5s: Failsafe hard timeout so user is never trapped
    const hardTimeout = setTimeout(() => closeSplash(), 6500);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7, t8, hardTimeout];

    return () => {
      timersRef.current.forEach(clearTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [closeSplash]);

  if (!isVisible) return null;

  // Has logo moved to final position?
  const hasMoved = stage === "logo-move" || stage === "hold";
  const hasEntered = stage === "logo-enter" || hasMoved;

  return (
    <div
      id="scf-splash-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Super Crown Foundation Introduction"
      className={`fixed inset-0 z-[99999] w-screen h-screen min-h-[100dvh] flex items-center justify-center select-none overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        // 100% Solid Opaque Background: Warm ivory center to soft rich champagne-gold edge
        backgroundColor: "#FBF8F1",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, #FFFEFC 0%, #FAF6EE 35%, #F4E8D1 70%, #ECD8B4 100%)",
      }}
    >
      {/* Visible Champagne-Gold Ambient Glow & Architectural Framing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft, warm radiant aura in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] lg:w-[1100px] h-[850px] lg:h-[1100px] rounded-full bg-gradient-to-tr from-[#C9A227]/20 via-[#F3E6C5]/35 to-transparent blur-3xl" />

        {/* Outer delicate gold double-border framing */}
        <div className="absolute inset-5 sm:inset-8 border border-[#A77B20]/25 rounded-2xl pointer-events-none" />
        <div className="absolute inset-7 sm:inset-10 border border-[#A77B20]/15 rounded-xl pointer-events-none hidden sm:block" />

        {/* Elegant corner brackets in rich gold */}
        <div className="absolute top-7 left-7 sm:top-10 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-[#A77B20]/60 pointer-events-none" />
        <div className="absolute top-7 right-7 sm:top-10 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-[#A77B20]/60 pointer-events-none" />
        <div className="absolute bottom-7 left-7 sm:bottom-10 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-[#A77B20]/60 pointer-events-none" />
        <div className="absolute bottom-7 right-7 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-[#A77B20]/60 pointer-events-none" />
      </div>

      {/* Visible, high-contrast Skip Button in top-right */}
      <button
        onClick={closeSplash}
        type="button"
        className="absolute top-8 right-8 sm:top-12 sm:right-12 z-50 text-xs sm:text-sm font-bold text-[#3C2350] hover:text-[#A77B20] transition-all py-2 px-4 rounded-full border border-[#A77B20]/40 hover:border-[#A77B20] bg-white/90 shadow-sm flex items-center gap-2 group cursor-pointer active:scale-95"
        aria-label="Skip introduction"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#A77B20] transition-transform group-hover:translate-x-1" />
      </button>

      {/* 
        MAIN BRAND IDENTITY LOCKUP
        Desktop (>= 768px): Horizontal composition [LOGO (260-300px)] | [DIVIDER] | [TEXT BLOCK]
        Mobile (< 768px): Centered vertical composition [LOGO (160-180px)] / [TEXT BLOCK]
        Occupies 75–85% of content width, centered in viewport.
      */}
      <div className="relative z-10 w-full max-w-[1260px] px-6 sm:px-10 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-center">

        {/* 
          OFFICIAL LOGO WRAPPER
          Stage 1: Center of viewport, large 340–400px wide, scales 80% -> 100%
          Stage 2: Glides smoothly to the left, reduces to 260–300px wide
        */}
        <div
          className={`shrink-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !hasEntered
              ? "opacity-0 scale-75"
              : hasMoved
              ? "opacity-100 scale-100 mb-5 md:mb-0"
              : "opacity-100 scale-100 mb-0"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Radiant gold halo behind logo */}
            <div
              className={`absolute inset-0 -m-8 rounded-full bg-[#C9A227]/25 blur-2xl transition-all duration-1000 pointer-events-none ${
                hasEntered ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />

            {/* Official Emblem Image Asset */}
            <img
              src="/assets/SCI Head PNG.png"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/logo.png";
              }}
              alt="Super Crown Foundation Official Emblem"
              className={`relative z-10 object-contain drop-shadow-md transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                hasMoved
                  ? "w-[170px] sm:w-[210px] md:w-[260px] lg:w-[290px] h-[170px] sm:h-[210px] md:h-[260px] lg:h-[290px]"
                  : "w-[240px] sm:w-[320px] md:w-[360px] lg:w-[390px] h-[240px] sm:h-[320px] md:h-[360px] lg:h-[390px]"
              }`}
            />
          </div>
        </div>

        {/* 
          PRESTIGIOUS VERTICAL CREST DIVIDER (Desktop only)
          Warm gold vertical line connecting emblem with school identity
        */}
        <div
          className={`hidden md:block w-[1.5px] bg-gradient-to-b from-transparent via-[#A77B20]/60 to-transparent transition-all duration-800 mx-8 lg:mx-12 shrink-0 ${
            hasMoved && lineIndex >= 1
              ? "opacity-100 h-36 lg:h-44"
              : "opacity-0 h-0"
          }`}
        />

        {/* 
          SCHOOL IDENTITY TEXT BLOCK
          Desktop: Expands to the RIGHT of the logo
          Mobile: Expands below the logo
        */}
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center overflow-hidden ${
            hasMoved
              ? "max-h-[450px] opacity-100 mt-2 md:mt-0 text-center md:text-left"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {/* 
            LINE 1: SUPER CROWN FOUNDATION
            Must appear on ONE SINGLE LINE on desktop.
            Font size: 42–52px on large desktop.
            Bold / extra-bold. Deep purple #3C2350.
          */}
          <h1
            className={`font-heading font-extrabold uppercase tracking-tight text-[#3C2350] leading-[1.08] transition-all duration-600 ease-out whitespace-normal md:whitespace-nowrap text-2xl sm:text-3xl md:text-[2.6rem] lg:text-[3.1rem] xl:text-[3.3rem] ${
              lineIndex >= 1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 md:-translate-x-10"
            }`}
          >
            SUPER CROWN FOUNDATION
          </h1>

          {/* 
            LINE 2: (Educational & Charitable Trust)
            Font size: 20–23px.
            Gold: #A77B20 (rich, high-contrast, deeply saturated).
            Medium weight.
          */}
          <p
            className={`font-sans font-medium text-[#A77B20] tracking-wider transition-all duration-600 ease-out text-sm sm:text-base md:text-xl lg:text-[1.38rem] mt-1.5 sm:mt-2 ${
              lineIndex >= 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 md:-translate-x-10"
            }`}
          >
            (Educational & Charitable Trust)
          </p>

          {/* 
            LINE 3: International Montessori Teacher Training School
            Font size: 19–22px.
            Deep purple #3C2350 / dark charcoal.
            One single line on desktop.
          */}
          <p
            className={`font-sans font-bold text-[#3C2350] tracking-normal transition-all duration-600 ease-out whitespace-normal md:whitespace-nowrap text-base sm:text-lg md:text-[1.25rem] lg:text-[1.32rem] mt-3 sm:mt-3.5 leading-snug ${
              lineIndex >= 3
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 md:-translate-x-10"
            }`}
          >
            International Montessori Teacher Training School
          </p>

          {/* 
            LINE 4: Empowering Women Through Education
            Font size: 19–21px.
            Champagne gold: #A77B20.
            Elegant semi-bold italic.
          */}
          <p
            className={`font-sans font-semibold italic text-[#A77B20] tracking-wide transition-all duration-600 ease-out text-sm sm:text-base md:text-[1.18rem] lg:text-[1.24rem] mt-2 sm:mt-2.5 ${
              lineIndex >= 4
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 md:-translate-x-10"
            }`}
          >
            Empowering Women Through Education
          </p>
        </div>

      </div>

      {/* Subtle bottom prestige seal */}
      <div className="absolute bottom-7 sm:bottom-10 text-[11px] sm:text-xs tracking-[0.25em] font-sans font-bold text-[#A77B20]/75 uppercase pointer-events-none">
        Excellence in Montessori Teacher Education
      </div>
    </div>
  );
}
