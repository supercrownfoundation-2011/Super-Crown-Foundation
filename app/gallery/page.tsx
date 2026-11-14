"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Images,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GALLERY_CATEGORIES,
  GalleryCategory,
  GalleryImage,
  thumbSrc,
  fullSrc,
  webpSrcSet,
  avifSrcSet,
} from "@/data/galleryData";

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */
function filterImages(images: GalleryImage[]) {
  return images.filter((img) => !/\.(mov|heic)$/i.test(img.src));
}

type BentoCardRole = "featured-left" | "small" | "wide" | "featured-right";

/**
 * Mathematically interlocking 8-item repeating bento pattern:
 * - 0: featured-left  (desktop: 2x2 on left; mobile: 2x2)
 * - 1: small          (desktop: 1x1 top-mid; mobile: 1x1)
 * - 2: small          (desktop: 1x1 top-right; mobile: 1x1)
 * - 3: wide           (desktop: 2x1 bottom-right; mobile: 2x1)
 *   --> Rows 1 & 2 are 100% full (4 cols x 2 rows)
 * - 4: small          (desktop: 1x1 row 3 col 1; mobile: 1x1)
 * - 5: small          (desktop: 1x1 row 3 col 2; mobile: 1x1)
 * - 6: wide           (desktop: 2x1 row 4 cols 1-2; mobile: 2x1)
 * - 7: featured-right (desktop: 2x2 rows 3-4 cols 3-4; mobile: 2x2)
 *   --> Rows 3 & 4 are 100% full (4 cols x 2 rows)
 */
const BENTO_CYCLE: BentoCardRole[] = [
  "featured-left",
  "small",
  "small",
  "wide",
  "small",
  "small",
  "wide",
  "featured-right",
];

function getBentoRole(idx: number): BentoCardRole {
  return BENTO_CYCLE[idx % BENTO_CYCLE.length];
}

function bentoRoleClasses(role: BentoCardRole): string {
  switch (role) {
    case "featured-left":
    case "featured-right":
      return "col-span-2 row-span-2";
    case "wide":
      return "col-span-2 row-span-1";
    case "small":
      return "col-span-1 row-span-1";
  }
}

/* ─────────────────────────────────────────────────────────
   ResponsiveGalleryImage — Delivers adaptive AVIF & WebP variants
   with optimized srcset, proper display sizes, and priority hints
───────────────────────────────────────────────────────── */
function ResponsiveGalleryImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 290px",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#E6E0E8]">
      {!loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#E6E0E8] via-[#F3EEF6] to-[#E6E0E8] animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}
      <picture className="w-full h-full block">
        <source type="image/avif" srcSet={avifSrcSet(src)} sizes={sizes} />
        <source type="image/webp" srcSet={webpSrcSet(src)} sizes={sizes} />
        <img
          ref={ref}
          src={thumbSrc(src)}
          srcSet={webpSrcSet(src)}
          sizes={sizes}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`${className} transition-opacity duration-500 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
          }`}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Lightbox — Full-screen high-res WebP Viewer
───────────────────────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [imgLoaded, setImgLoaded] = useState(false);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
    setImgLoaded(false);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
    setImgLoaded(false);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Preload adjacent images
  useEffect(() => {
    const preload = (i: number) => {
      const img = new Image();
      img.src = fullSrc(images[i].src);
    };
    preload((current + 1) % images.length);
    preload((current - 1 + images.length) % images.length);
  }, [current, images]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="font-heading text-xs font-bold text-[#C9A227] tracking-wider uppercase">
            SUPER CROWN GALLERY
          </span>
          <span className="text-white/40">|</span>
          <span className="font-sans text-xs text-white/70 tabular-nums">
            {current + 1} <span className="text-white/30">/ {images.length}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-[#3C2350] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 group active:scale-90"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Center Image Container */}
      <div
        className="max-w-[92vw] max-h-[85vh] flex items-center justify-center px-16 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {!imgLoaded && (
          <img
            src={thumbSrc(images[current].src)}
            alt={images[current].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl blur-xs scale-102"
          />
        )}
        <picture
          className={`max-w-full max-h-[85vh] flex items-center justify-center transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          <source
            type="image/avif"
            srcSet={avifSrcSet(images[current].src)}
            sizes="(max-width: 1024px) 92vw, 1600px"
          />
          <source
            type="image/webp"
            srcSet={webpSrcSet(images[current].src)}
            sizes="(max-width: 1024px) 92vw, 1600px"
          />
          <img
            key={current}
            src={fullSrc(images[current].src)}
            srcSet={webpSrcSet(images[current].src)}
            sizes="(max-width: 1024px) 92vw, 1600px"
            alt={images[current].alt}
            onLoad={() => setImgLoaded(true)}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
          />
        </picture>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-[#3C2350] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 group active:scale-90"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Bottom Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center z-10 pointer-events-none">
        <p className="font-sans text-xs text-white/70 text-center max-w-md">
          {images[current].alt}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   BentoGrid — Gapless, interlocking Bento Grid Component
───────────────────────────────────────────────────────── */
function BentoGrid({
  images,
  onOpen,
  categoryLabel,
  priorityCount = 0,
}: {
  images: GalleryImage[];
  onOpen: (idx: number) => void;
  categoryLabel?: string;
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[200px] lg:auto-rows-[240px] gap-2.5 sm:gap-4.5 grid-flow-dense">
      {images.map((img, idx) => {
        const role = getBentoRole(idx);
        const isFeatured = role === "featured-left" || role === "featured-right";
        const isWide = role === "wide";
        const isPriority = idx < priorityCount;

        const sizes = isFeatured || isWide
          ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 580px"
          : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 290px";

        return (
          <div
            key={img.src}
            onClick={() => onOpen(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(idx);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${img.alt} - Click to view full image`}
            className={`${bentoRoleClasses(role)} group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E6E0E8] shadow-xs hover:shadow-xl hover:border-[#C9A227]/50 focus-visible:ring-2 focus-visible:ring-[#3C2350] focus-visible:ring-offset-2 transition-all duration-300 cursor-pointer`}
          >
            {/* Responsive Multi-Format Adaptive Image */}
            <ResponsiveGalleryImage
              src={img.src}
              alt={img.alt}
              sizes={sizes}
              priority={isPriority}
              className="w-full h-full object-cover group-hover:scale-106"
            />

            {/* Subtle Gradient Scrim on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#291735]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Floating Action & Details */}
            <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-between items-start">
                {isFeatured && categoryLabel ? (
                  <span className="font-sans text-[10px] font-extrabold text-[#C9A227] bg-[#291735]/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {categoryLabel}
                  </span>
                ) : (
                  <span />
                )}
                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#3C2350] flex items-center justify-center shadow-xs">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="font-sans text-xs text-white/95 line-clamp-2 leading-relaxed">
                  {img.alt}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CategorySection — Overview Bento for "All Albums" View
   Always displays a curated 8-image interlocking Bento Box
───────────────────────────────────────────────────────── */
function CategorySection({
  category,
  onSelectCategory,
  priorityCount = 0,
}: {
  category: GalleryCategory;
  onSelectCategory: (id: string) => void;
  priorityCount?: number;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = filterImages(category.images);
  // Exactly 8 items guarantees a closed, symmetrical 4x4-cell bento block
  const preview = images.slice(0, 8);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E6E0E8] shadow-xs hover:shadow-md transition-shadow">
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div>
          <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
            — {category.categoryLabel}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3C2350] leading-tight">
            {category.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#665D69] mt-2 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectCategory(category.id)}
          className="shrink-0 inline-flex items-center gap-2 bg-[#3C2350] text-[#C9A227] hover:bg-[#291735] hover:text-white px-5 py-3 rounded-xl font-sans text-xs font-extrabold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95 group"
        >
          <Images className="w-4 h-4 text-[#C9A227]" />
          <span>View All {images.length} Photos</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C9A227]" />
        </button>
      </div>

      {/* Perfect 8-Card Interlocking Bento Grid Preview */}
      <BentoGrid
        images={preview}
        onOpen={(idx) => setLightbox(idx)}
        categoryLabel={category.categoryLabel}
        priorityCount={priorityCount}
      />

      {lightbox !== null && (
        <Lightbox
          images={preview}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FullCategoryView — Full Album View (All Photos in Bento)
───────────────────────────────────────────────────────── */
function FullCategoryView({ category }: { category: GalleryCategory }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = filterImages(category.images);

  return (
    <div>
      {/* Album Hero Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 min-h-[240px] sm:min-h-[300px] border border-[#E6E0E8] shadow-sm">
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            srcSet={avifSrcSet(category.coverImage)}
            sizes="(max-width: 1280px) 100vw, 1240px"
          />
          <source
            type="image/webp"
            srcSet={webpSrcSet(category.coverImage)}
            sizes="(max-width: 1280px) 100vw, 1240px"
          />
          <img
            src={fullSrc(category.coverImage)}
            srcSet={webpSrcSet(category.coverImage)}
            sizes="(max-width: 1280px) 100vw, 1240px"
            alt={category.altText}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#291735]/95 via-[#3C2350]/75 to-transparent" />
        <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-end h-full min-h-[240px] sm:min-h-[300px]">
          <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
            — {category.categoryLabel}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2">
            {category.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl mb-4">
            {category.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#C9A227] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Images className="w-3.5 h-3.5" />
              {images.length} High-Resolution Photos
            </span>
          </div>
        </div>
      </div>

      {/* Complete Bento Grid of All Images */}
      <BentoGrid
        images={images}
        onOpen={(idx) => setLightbox(idx)}
        categoryLabel={category.categoryLabel}
        priorityCount={4}
      />

      {lightbox !== null && (
        <Lightbox
          images={images}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Page Layout
───────────────────────────────────────────────────────── */
function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const activeCategory: GalleryCategory | null = categoryParam
    ? GALLERY_CATEGORIES.find((c) => c.id === categoryParam) ?? null
    : null;

  const setCategory = (id: string | null) => {
    router.push(id ? `/gallery?category=${id}` : "/gallery");
  };

  const totalPhotos = GALLERY_CATEGORIES.reduce(
    (sum, c) => sum + filterImages(c.images).length,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-grow pt-[80px]">
        {/* Page Hero Header */}
        <section className="bg-white border-b border-[#E6E0E8]/70 py-12 md:py-16">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#665D69] hover:text-[#3C2350] font-sans text-xs font-bold uppercase tracking-wider transition-colors mb-7 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="font-sans text-xs font-extrabold uppercase text-[#C9A227] tracking-wider block mb-2">
                  CAMPUS ARCHIVES & MOMENTS
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] leading-tight tracking-tight">
                  Life at Super Crown
                </h1>
                <p className="font-sans text-sm sm:text-base text-[#665D69] leading-relaxed mt-3 max-w-xl">
                  Explore our prepared environments, hands-on pedagogical training, vibrant convocation ceremonies, and student milestones in interactive Bento layouts.
                </p>
              </div>

              {/* Total Stats Chips */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-[#FAF8F5] border border-[#E6E0E8] rounded-2xl px-5 py-3 text-center shadow-2xs">
                  <span className="font-heading text-2xl font-extrabold text-[#3C2350] block">
                    {totalPhotos}+
                  </span>
                  <span className="font-sans text-[10px] font-bold text-[#665D69] uppercase tracking-wider">
                    Curated Photos
                  </span>
                </div>
                <div className="bg-[#FAF8F5] border border-[#E6E0E8] rounded-2xl px-5 py-3 text-center shadow-2xs">
                  <span className="font-heading text-2xl font-extrabold text-[#3C2350] block">
                    {GALLERY_CATEGORIES.length}
                  </span>
                  <span className="font-sans text-[10px] font-bold text-[#665D69] uppercase tracking-wider">
                    Core Albums
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Album Tab Bar */}
        <div className="bg-white/95 backdrop-blur-md border-b border-[#E6E0E8]/70 sticky top-[72px] sm:top-[80px] z-30 shadow-2xs">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-hide">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`shrink-0 px-5 py-2 rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  !activeCategory
                    ? "bg-[#3C2350] text-[#C9A227] shadow-xs"
                    : "bg-[#FAF8F5] text-[#665D69] hover:text-[#3C2350] hover:bg-[#F3EEF6]"
                }`}
              >
                All Albums ({totalPhotos})
              </button>
              {GALLERY_CATEGORIES.map((cat) => {
                const count = filterImages(cat.images).length;
                const isSelected = activeCategory?.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`shrink-0 px-5 py-2 rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#3C2350] text-[#C9A227] shadow-xs"
                        : "bg-[#FAF8F5] text-[#665D69] hover:text-[#3C2350] hover:bg-[#F3EEF6]"
                    }`}
                  >
                    {cat.title} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Showcase Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            {activeCategory ? (
              <FullCategoryView category={activeCategory} />
            ) : (
              <div className="space-y-12 sm:space-y-16">
                {GALLERY_CATEGORIES.map((cat, catIdx) => (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    onSelectCategory={setCategory}
                    priorityCount={catIdx === 0 ? 4 : 0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#FAF8F5]">
          <div className="w-10 h-10 rounded-full border-4 border-[#C9A227] border-t-transparent animate-spin" />
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
