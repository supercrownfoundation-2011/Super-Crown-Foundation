import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacultyDirectory from "@/components/FacultyDirectory";

export const metadata = {
  title: "Faculty & Master Trainers | Super Crown Foundation",
  description: "Meet the experienced Montessori master trainers, child psychologists, and academic directors at Super Crown Foundation. Learn directly from industry leaders.",
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
