import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacultyDirectory from "@/components/FacultyDirectory";

export const metadata: Metadata = {
  title: "Faculty & Master Trainers | Super Crown Foundation",
  description:
    "Meet the experienced Montessori master trainers, child psychologists, and academic directors at Super Crown Foundation. Learn directly from industry leaders.",
  openGraph: {
    title: "Faculty & Master Trainers | Super Crown Foundation",
    description:
      "Meet the experienced Montessori master trainers, child psychologists, and academic directors at Super Crown Foundation.",
    url: "/faculty",
  },
  alternates: {
    canonical: "/faculty",
  },
};

export default function FacultyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-[80px]">
        <FacultyDirectory />
      </main>
      <Footer />
    </div>
  );
}
