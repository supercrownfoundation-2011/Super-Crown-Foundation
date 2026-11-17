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

const siteUrl = "https://www.supercrownfoundation.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Super Crown Foundation | International Montessori Teacher Training",
    template: "%s | Super Crown Foundation",
  },
  description:
    "An internationally recognized institution dedicated to shaping the educators of tomorrow through practical, rigorous Montessori teacher training, early childhood education diplomas, and professional certifications.",
  keywords: [
    "Montessori Teacher Training",
    "Super Crown Foundation",
    "Teacher Certification Chennai",
    "Early Childhood Education Diploma",
    "Montessori Training Ambattur",
    "Nursery Teacher Training NTT",
    "Child Psychology Course",
    "International Montessori Certification",
  ],
  authors: [{ name: "Super Crown Foundation" }],
  creator: "Super Crown Foundation",
  publisher: "Super Crown Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.supercrownfoundation.com",
    siteName: "Super Crown Foundation",
    title: "Super Crown Foundation | International Montessori Teacher Training",
    description:
      "Premier Montessori teacher training school offering internationally recognized diplomas, practical apparatus training, and 100% placement guidance.",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Super Crown Foundation Official Crest & Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Crown Foundation | International Montessori Teacher Training",
    description:
      "Premier Montessori teacher training school offering internationally recognized diplomas, practical apparatus training, and 100% placement guidance.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Super Crown Foundation",
  alternateName: "Super Crown International Montessori Teacher Training School",
  url: "https://www.supercrownfoundation.com",
  logo: "https://www.supercrownfoundation.com/logo.png",
  description:
    "An internationally recognized educational institution and charitable trust offering rigorous Montessori teacher training, diploma certifications, and women empowerment through education.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 16 & 17A, Old Twp Rd, Secretariat Colony, Venkatapuram, Ambattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600053",
    addressCountry: "IN",
  },
  telephone: ["+919600151377", "+918667043942"],
  email: "supercrownfoundation@gmail.com",
  sameAs: [
    "https://www.instagram.com/supercrown.foundation/",
    "https://www.facebook.com/p/Super-Crown-Foundation-61590255278191/",
    "https://www.linkedin.com/in/super-crown-foundation-07b011425/",
    "https://www.youtube.com/channel/UCv_bIE7CEYDNWhAu1R21tcw",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
