"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Robust ScrollReveal component with guaranteed fallbacks for mobile browsers.
 * Ensures content NEVER disappears, fails to render, or becomes non-interactive
 * even if IntersectionObserver is throttled, delayed, or unsupported on mobile devices.
 */
export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Immediately reveal if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    // 2. On mobile viewports (< 768px), reveal quickly to prevent blank scroll pauses
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const mobileTimer = setTimeout(() => {
        setIsVisible(true);
      }, Math.min(delayMs, 50));
      return () => clearTimeout(mobileTimer);
    }

    const element = ref.current;
    if (!element) {
      setIsVisible(true);
      return;
    }

    // 3. Immediate bounding check: if already near/in viewport, show immediately
    try {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 150 && rect.bottom >= -150) {
        setIsVisible(true);
        return;
      }
    } catch {
      // If getBoundingClientRect fails for any reason, show content safely
      setIsVisible(true);
      return;
    }

    // 4. Hard safety fallback: GUARANTEE visibility within 500ms regardless of scroll/observer state
    const safetyFallback = setTimeout(() => {
      setIsVisible(true);
    }, 500 + delayMs);

    // 5. IntersectionObserver with generous positive margin (150px ahead of scroll) and 0 threshold
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setIsVisible(true);
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        },
        {
          threshold: 0,
          rootMargin: "150px 0px 150px 0px",
        }
      );
      observer.observe(element);
    } catch {
      // In case IntersectionObserver is restricted or unsupported
      setIsVisible(true);
    }

    return () => {
      clearTimeout(safetyFallback);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [delayMs]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
      }}
      className={`${className} transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-90 sm:opacity-0 translate-y-2 sm:translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}


