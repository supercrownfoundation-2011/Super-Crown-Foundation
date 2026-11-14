import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "The Power of Prepared Environments in Early Childhood Development",
      category: "Montessori Methodology",
      date: "September 10, 2026",
      author: "Mrs. Rani Rajendran",
      excerpt: "Discover why physical spatial layout, accessibility, and natural materials are crucial for fostering independent learning and concentration in young children.",
      image: "/images/authentic/blog_prepared_environments.webp",
    },
    {
      id: 2,
      title: "How Material Presentation Builds Mathematical Mind in Children",
      category: "Practical Pedagogy",
      date: "August 28, 2026",
      author: "Elena Rodriguez",
      excerpt: "Exploring the progression from concrete sensorial apparatus (like Golden Beads) to abstract mathematical computation in early childhood.",
      image: "/images/authentic/blog_math_materials.webp",
    },
    {
      id: 3,
      title: "Understanding Sensitive Periods in Early Learning",
      category: "Child Psychology",
      date: "August 15, 2026",
      author: "Dr. Sarah Mitchell",
      excerpt: "Key developmental windows when children absorb specific skills—like order, language, and sensory refinement—effortlessly.",
      image: "/images/authentic/blog_sensitive_periods.webp",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[90px]">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] py-20 border-b border-[#E6E0E8]/70">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEF6] border border-[#3C2350]/15 mb-4">
              <BookOpen className="w-4 h-4 text-[#C9A24D]" />
              <span className="font-sans text-xs font-bold text-[#3C2350] tracking-wider uppercase">
                EdTech Articles & Insights
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3C2350] mb-4 tracking-tight">
              Pedagogical Insights & Articles
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#665D69] max-w-2xl mx-auto leading-relaxed">
              Stay updated with pedagogical insights, teacher training tips, child psychology findings, and institutional announcements from Super Crown Foundation.
            </p>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="rounded-3xl border border-[#E6E0E8] bg-[#FAF8F5] flex flex-col group overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C9A24D]/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-56 relative overflow-hidden bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <span className="font-sans text-xs font-bold text-[#3C2350] bg-[#F3EEF6] px-3.5 py-1 rounded-full border border-[#3C2350]/15 self-start mb-3">
                      {article.category}
                    </span>
                    <h3 className="font-heading text-xl font-extrabold text-[#3C2350] group-hover:text-[#C9A24D] transition-colors mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <p className="font-sans text-sm text-[#665D69] leading-relaxed mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="pt-4 border-t border-[#E6E0E8] flex flex-wrap justify-between items-center gap-2 text-xs text-[#665D69] font-semibold">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#C9A24D]" /> {article.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C9A24D]" /> {article.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

