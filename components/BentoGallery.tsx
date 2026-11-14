"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Images } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { webpSrcSet, avifSrcSet } from "@/data/galleryData";

interface BentoHighlightCard {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  description?: string;
  image: string;
  rawSrc: string;
  alt: string;
  isLarge?: boolean;
}

const BENTO_HIGHLIGHTS: BentoHighlightCard[] = [
  {
    id: "featured-celebration",
    categoryId: "celebration",
    categoryLabel: "COMMUNITY & FESTIVITIES",
    title: "Annual Celebrations & Convocations",
    description: "Joyful graduation ceremonies, Teacher's Day celebrations, and milestone gatherings that unite the Super Crown family.",
    image: "/gallery-opt/celebration/IMG_2006-thumb.webp",
    rawSrc: "/gallery/celebration/IMG_2006.JPG",
    alt: "Super Crown Foundation Annual Celebration",
    isLarge: true,
  },
  {
    id: "class-environment",
    categoryId: "class",
    categoryLabel: "AUTHENTIC MONTESSORI",
    title: "Classroom Environments",
    image: "/gallery-opt/class/IMG_1212-thumb.webp",
    rawSrc: "/gallery/class/IMG_1212.JPG",
    alt: "Montessori classroom in action",
  },
  {
    id: "events-awards",
    categoryId: "events",
    categoryLabel: "GLOBAL CERTIFICATES",
    title: "Awards & Certifications",
    image: "/gallery-opt/events & certifications/IMG_0861-thumb.webp",
    rawSrc: "/gallery/events & certifications/IMG_0861.JPG",
    alt: "Super Crown certification ceremony",
  },
  {
    id: "class-hands-on",
    categoryId: "class",
    categoryLabel: "HANDS-ON LEARNING",
    title: "Practical Pedagogical Training",
    image: "/gallery-opt/class/IMG_1473-thumb.webp",
    rawSrc: "/gallery/class/IMG_1473.JPG",
    alt: "Educators training with Montessori apparatus",
  },
  {
    id: "community-milestones",
    categoryId: "celebration",
    categoryLabel: "CAMPUS CELEBRATIONS",
    title: "Celebrations",
    image: "/gallery-opt/celebration/celebrations_lighting_ceremony-thumb.webp",
    rawSrc: "/gallery/celebration/celebrations_lighting_ceremony.jpg",
    alt: "Super Crown Celebrations — Lamp Lighting Ceremony",
  },
];

export default function BentoGallery() {
  const router = useRouter();
  const largeCard = BENTO_HIGHLIGHTS[0];
  const gridCards = BENTO_HIGHLIGHTS.slice(1);

  return (
    <section
      id="gallery-section"
      aria-label="Campus Life Gallery Preview"
      className="py-20 md:py-28 bg-[#FAF8F5] border-y border-[#E6E0E8]/70"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                LIFE AT SUPER CROWN
              </span>
              <TextReveal as="h2" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C2350] tracking-tight leading-tight">
                A Glimpse <span className="text-[#C9A227]">Into Our World.</span>
              </TextReveal>
              <TextReveal delayMs={100} as="p" className="font-sans text-sm sm:text-base text-[#665D69] leading-relaxed mt-3">
                Explore the people, moments, and milestones that shape the Super Crown Foundation community.
              </TextReveal>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-white text-[#3C2350] px-6 py-3 rounded-full border border-[#E6E0E8] font-sans text-xs font-extrabold tracking-wider uppercase hover:border-[#3C2350] hover:bg-[#3C2350] hover:text-white focus-visible:outline-2 focus-visible:outline-[#3C2350] focus-visible:outline-offset-2 transition-all shadow-xs group shrink-0 cursor-pointer active:scale-95"
            >
              <Images className="w-4 h-4 text-[#C9A227]" />
              <span>View All Galleries</span>
              <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Asymmetric 5-Card Bento Grid Composition */}
        <ScrollReveal delayMs={120}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1 — Featured Large Left Card */}
          <div
            onClick={() => router.push(`/gallery?category=${largeCard.categoryId}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/gallery?category=${largeCard.categoryId}`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${largeCard.title} - View gallery`}
            className="md:col-span-5 relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-white shadow-md hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#3C2350] focus-visible:ring-offset-2 group min-h-[300px] sm:min-h-[420px] md:min-h-[500px] h-full cursor-pointer transition-all duration-300"
          >
            <picture className="w-full h-full block">
              <source
                type="image/avif"
                srcSet={avifSrcSet(largeCard.rawSrc)}
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <source
                type="image/webp"
                srcSet={webpSrcSet(largeCard.rawSrc)}
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <img
                src={largeCard.image}
                srcSet={webpSrcSet(largeCard.rawSrc)}
                sizes="(max-width: 768px) 100vw, 500px"
                alt={largeCard.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-[#291735]/95 via-[#3C2350]/45 to-transparent p-7 sm:p-8 flex flex-col justify-end text-white transition-opacity">
              <div className="flex justify-between items-end gap-4">
                <div className="max-w-sm">
                  <span className="font-sans text-xs font-extrabold text-[#C9A227] tracking-wider uppercase block mb-2">
                    — {largeCard.categoryLabel}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-snug">
                    {largeCard.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
                    {largeCard.description}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#C9A227] group-hover:text-[#3C2350] group-hover:border-[#C9A227] transition-all shrink-0 shadow-sm">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Card 2x2 Bento Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridCards.map((card) => (
              <div
                key={card.id}
                onClick={() => router.push(`/gallery?category=${card.categoryId}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/gallery?category=${card.categoryId}`);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${card.title} - View gallery`}
                className="relative rounded-3xl overflow-hidden border border-[#E6E0E8] bg-white shadow-sm hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#3C2350] focus-visible:ring-offset-2 group min-h-[220px] sm:min-h-[240px] h-full cursor-pointer transition-all duration-300"
              >
                <picture className="w-full h-full block">
                  <source
                    type="image/avif"
                    srcSet={avifSrcSet(card.rawSrc)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                  <source
                    type="image/webp"
                    srcSet={webpSrcSet(card.rawSrc)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                  <img
                    src={card.image}
                    srcSet={webpSrcSet(card.rawSrc)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#291735]/95 via-[#3C2350]/35 to-transparent p-6 flex flex-col justify-end text-white transition-opacity">
                  <div className="flex justify-between items-end gap-3">
                    <div>
                      <span className="font-sans text-[11px] font-extrabold text-[#C9A227] tracking-wider uppercase block mb-1.5">
                        — {card.categoryLabel}
                      </span>
                      <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white leading-snug">
                        {card.title}
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#C9A227] group-hover:text-[#3C2350] group-hover:border-[#C9A227] transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
}
