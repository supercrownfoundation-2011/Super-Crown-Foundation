import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus & Community Gallery | Celebrations, Labs & Events",
  description:
    "View authentic photos and moments from Super Crown Foundation: hands-on Montessori lab environments, graduation convocations, Teacher's Day celebrations, student workshops, and campus activities.",
  openGraph: {
    title: "Campus Gallery | Super Crown Foundation",
    description:
      "Explore life at Super Crown Foundation: practical Montessori apparatus sessions, cultural celebrations, student achievements, and campus facilities.",
    url: "/gallery",
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
