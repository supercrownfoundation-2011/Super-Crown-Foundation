import { MetadataRoute } from "next";
import { DETAILED_COURSES } from "@/data/courseDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.supercrownfoundation.com";
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faculty`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = Object.keys(DETAILED_COURSES).map((slug) => ({
    url: `${siteUrl}/courses/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...coreRoutes, ...courseRoutes];
}
