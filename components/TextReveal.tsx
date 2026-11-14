"use client";

import React, { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  /** The text string to animate (will be split by words for mask reveal) */
  text?: string;
  /** Or custom JSX children */
  children?: React.ReactNode;
  /** HTML element tag */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  /** Additional styling classes */
  className?: string;
  /** Base delay in ms before animation begins */
  delayMs?: number;
  /** Stagger interval in ms between each word */
  staggerMs?: number;
  /** Animation style: "mask-slide" (upward mask slide) | "fade-up" (soft slide & fade) | "glow" */
  variant?: "mask-slide" | "fade-up" | "letter-reveal";
}

/**
 * Super Crown Foundation — Premium Text Reveal Animation Component
 * Smoothly reveals typography as the user scrolls into view.
 */
export default function TextReveal({
  text,
  children,
  as: Component = "div",
  className = "",
  delayMs = 0,
  staggerMs = 35,
  variant = "mask-slide",
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Immediate fallback for reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: reveal after 400ms if intersection observer doesn't trigger
    const safety = setTimeout(() => setIsVisible(true), 400 + delayMs);

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsVisible(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(el);
    } catch {
      setIsVisible(true);
    }

    return () => {
      clearTimeout(safety);
      observer?.disconnect();
    };
  }, [delayMs]);

  // If simple text is passed, split into words for individual masked upward slides
  if (text) {
    const words = text.split(" ");

    return (
      <Component
        ref={containerRef as any}
        className={`${className} inline-block leading-tight`}
        aria-label={text}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <span
              style={{
                transitionDelay: isVisible
                  ? `${delayMs + idx * staggerMs}ms`
                  : "0ms",
              }}
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : variant === "mask-slide"
                  ? "translate-y-[115%] opacity-0"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // If children are passed, animate the block smoothly
  return (
    <Component
      ref={containerRef as any}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
      }}
      className={`${className} transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </Component>
  );
}
