"use client";

import React from "react";

interface AuroraProps {
  className?: string;
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
}

/**
 * React Bits - Aurora Ambient Gradient Background
 * Fluid, slowly drifting ambient light gradients calibrated to Super Crown's brand palette.
 */
export default function Aurora({
  className = "",
  colorStops = ["#3C2350", "#C9A227", "#7A4D94"],
}: AuroraProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Primary Deep Royal Purple Ambient Orb */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] sm:w-[840px] h-[480px] rounded-full blur-[110px] opacity-25 mix-blend-multiply animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colorStops[0]} 0%, transparent 70%)`,
          animationDuration: "9s",
        }}
      />

      {/* Warm Golden Glow Accent - Top Right */}
      <div
        className="absolute top-12 -right-20 w-[420px] sm:w-[560px] h-[420px] rounded-full blur-[100px] opacity-20 mix-blend-multiply animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colorStops[1]} 0%, transparent 68%)`,
          animationDuration: "12s",
          animationDelay: "3s",
        }}
      />

      {/* Gentle Lavender Mist - Bottom Left */}
      <div
        className="absolute top-44 -left-20 w-[460px] sm:w-[580px] h-[460px] rounded-full blur-[120px] opacity-20 mix-blend-multiply animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colorStops[2]} 0%, transparent 70%)`,
          animationDuration: "14s",
          animationDelay: "5s",
        }}
      />

      {/* Subtle Dot Matrix Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#3C2350_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
    </div>
  );
}

