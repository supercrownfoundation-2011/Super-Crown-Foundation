import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3C2350",
};

export const metadata: Metadata = {
  title: "Super Crown Foundation | International Montessori Teacher Training",
  description:
    "An internationally recognized institution dedicated to shaping the educators of tomorrow through practical, rigorous Montessori teacher training.",
  keywords: [
    "Montessori Teacher Training",
    "Super Crown Foundation",
    "Teacher Certification",
    "Early Childhood Diploma",
    "International Education",
    "Montessori Institute",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-sans bg-[#FAF8F5] text-[#241828] antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-[#3C2350] selection:text-[#C9A24D]"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
