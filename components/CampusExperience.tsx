"use client";

import React, { useState, useEffect } from "react";
import { X, ZoomIn, Image as ImageIcon, Sparkles } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  description: string;
}

export default function CampusExperience() {
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Prepared Environment",
      category: "Classroom Architecture",
      src: "/images/authentic/campus_prepared_env.webp",
      alt: "Super Crown Prepared Montessori Environment",
      description: "Child-centered room layouts meticulously designed to encourage independent exploration, focus, and natural movement.",
    },
    {
      id: 2,
      title: "Authentic Apparatus",
      category: "Sensorial & Math",
      src: "/images/authentic/campus_apparatus.webp",
      alt: "Authentic Montessori Apparatus Lab",
      description: "Self-correcting Montessori learning apparatus crafted to precise international standards for sensory and mathematical concepts.",
    },
    {
      id: 3,
      title: "Collaborative Practice",
      category: "Group Dynamics",
      src: "/images/authentic/campus_collaborative.webp",
      alt: "Super Crown Collaborative Practical Training",
      description: "Interactive peer teaching sessions where trainees refine presentation skills and receive constructive feedback.",
    },
    {
      id: 4,
      title: "Master Mentorship",
      category: "Individual Guidance",
      src: "/images/authentic/campus_mentorship.webp",
      alt: "Super Crown One-on-One Faculty Mentorship",
      description: "Direct guidance from senior faculty trainers ensuring mastery of apparatus presentations and lesson planning.",
    },
  ];

  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightboxItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeLightboxItem]);

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#E6E0E8]/70">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15">
            <ImageIcon className="w-4 h-4 text-[#C9A24D]" />
            <span className="font-sans text-xs font-bold text-[#3C2350] uppercase tracking-wider">
              Campus & Lab Experience
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight">
            Step Into the Super Crown Environment
          </h2>
          <p className="font-sans text-base text-[#665D69]">
            Explore our modern practical training spaces designed for authentic hands-on Montessori learning.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Large Item */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[0])}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-[#E6E0E8] bg-white cursor-pointer h-[320px] sm:h-[400px] md:h-[520px] shadow-lg"
          >
            <img
              src={galleryItems[0].src}
              alt={galleryItems[0].alt}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/90 via-[#3C2350]/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex items-end p-4 sm:p-6">
              <div className="backdrop-blur-md bg-white/95 p-4 rounded-2xl w-full border border-[#E6E0E8] shadow-xl flex justify-between items-center">
                <div>
                  <span className="font-sans text-[10px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                    {galleryItems[0].category}
                  </span>
                  <p className="font-heading text-base sm:text-lg font-extrabold text-[#3C2350]">
                    {galleryItems[0].title}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#3C2350] text-[#C9A24D] flex items-center justify-center shrink-0">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Grid Items */}
          {galleryItems.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="md:col-span-2 lg:col-span-1 relative group overflow-hidden rounded-3xl border border-[#E6E0E8] bg-white cursor-pointer h-[220px] sm:h-[250px] shadow-md"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2350]/90 via-[#3C2350]/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex items-end p-3 sm:p-4">
                <div className="backdrop-blur-md bg-white/95 p-3 rounded-xl w-full border border-[#E6E0E8] flex justify-between items-center">
                  <div>
                    <span className="font-sans text-[9px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <p className="font-heading text-xs sm:text-sm font-extrabold text-[#3C2350]">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#3C2350] text-[#C9A24D] flex items-center justify-center shrink-0">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          onClick={() => setActiveLightboxItem(null)}
          className="fixed inset-0 z-50 bg-[#291735]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white border border-[#E6E0E8] shadow-2xl rounded-3xl overflow-hidden max-h-[92vh] flex flex-col cursor-default"
          >
            {/* Top Close Bar */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#E6E0E8] bg-[#FAF8F5] shrink-0">
              <div>
                <span className="font-sans text-[10px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                  {activeLightboxItem.category}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#3C2350]">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-2 text-[#665D69] hover:text-[#3C2350] hover:bg-[#F3EEF6] rounded-xl transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="relative h-[260px] sm:h-[450px] bg-black shrink-0">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxItem.alt}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption Description */}
            <div className="p-5 bg-white overflow-y-auto flex-grow">
              <p className="font-sans text-xs sm:text-sm text-[#665D69] leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

