export interface GalleryImage {
  /** Original source path (kept as fallback) */
  src: string;
  alt: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  coverImage: string;
  altText: string;
  route: string;
  isFeaturedLarge?: boolean;
  images: GalleryImage[];
}

/**
 * Given a raw gallery image path like /gallery/celebration/IMG_1234.JPG
 * return the optimised WebP paths produced by scripts/optimise-gallery.js
 */
export function thumbSrc(src: string) {
  const dot = src.lastIndexOf(".");
  const base = dot !== -1 ? src.slice(0, dot) : src;
  // /gallery/... → /gallery-opt/...-thumb.webp
  return base.replace("/gallery/", "/gallery-opt/") + "-thumb.webp";
}

export function fullSrc(src: string) {
  const dot = src.lastIndexOf(".");
  const base = dot !== -1 ? src.slice(0, dot) : src;
  return base.replace("/gallery/", "/gallery-opt/") + "-full.webp";
}

/**
 * Return responsive srcset for WebP (encoded for safe space handling)
 */
export function webpSrcSet(src: string): string {
  const dot = src.lastIndexOf(".");
  const base = dot !== -1 ? src.slice(0, dot) : src;
  const optBase = encodeURI(base.replace("/gallery/", "/gallery-opt/"));
  return `${optBase}-480.webp 480w, ${optBase}-800.webp 800w, ${optBase}-1200.webp 1200w, ${optBase}-1600.webp 1600w, ${optBase}-2048.webp 2048w`;
}

/**
 * Return responsive srcset for AVIF (encoded for safe space handling)
 */
export function avifSrcSet(src: string): string {
  const dot = src.lastIndexOf(".");
  const base = dot !== -1 ? src.slice(0, dot) : src;
  const optBase = encodeURI(base.replace("/gallery/", "/gallery-opt/"));
  return `${optBase}-480.avif 480w, ${optBase}-800.avif 800w, ${optBase}-1200.avif 1200w, ${optBase}-1600.avif 1600w, ${optBase}-2048.avif 2048w`;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "celebration",
    title: "Celebrations",
    categoryLabel: "OUR COMMUNITY",
    description:
      "Joyful moments from graduation ceremonies, Teacher's Day festivities, annual day events, and community celebrations that bring the Super Crown family together.",
    coverImage: "/gallery/celebration/celebrations_lighting_ceremony.jpg",
    altText: "Super Crown Foundation Celebrations — Lamp Lighting Ceremony",
    route: "/gallery?category=celebration",
    isFeaturedLarge: true,
    images: [
      { src: "/gallery/celebration/celebrations_lighting_ceremony.jpg", alt: "Super Crown Celebrations — Lamp Lighting Ceremony" },
      { src: "/gallery/celebration/IMG_2006.JPG", alt: "Celebration event at Super Crown Foundation" },
      { src: "/gallery/celebration/IMG_2012.JPG", alt: "Super Crown community celebration" },
      { src: "/gallery/celebration/IMG_4461.JPG", alt: "Festive gathering at Super Crown" },
      { src: "/gallery/celebration/IMG_4462.JPG", alt: "Annual day celebration" },
      { src: "/gallery/celebration/IMG_4494.JPG", alt: "Super Crown milestone event" },
      { src: "/gallery/celebration/IMG_4497.jpg", alt: "Foundation day celebration" },
      { src: "/gallery/celebration/IMG_4498.jpg", alt: "Community gathering" },
      { src: "/gallery/celebration/IMG_4499(1).jpg", alt: "Special celebration moment" },
      { src: "/gallery/celebration/IMG_4501.jpg", alt: "Super Crown festive event" },
      { src: "/gallery/celebration/IMG_4502.JPG", alt: "Celebration at Super Crown" },
      { src: "/gallery/celebration/IMG_4505 - Copy.JPG", alt: "Joyful moment at Super Crown" },
      { src: "/gallery/celebration/IMG_3796.JPG", alt: "Super Crown community event" },
      { src: "/gallery/celebration/IMG_3804.JPG", alt: "Annual gathering at Super Crown" },
      { src: "/gallery/celebration/IMG_3854.JPG", alt: "Festive celebration" },
      { src: "/gallery/celebration/IMG_4316.JPG", alt: "Milestone celebration" },
      { src: "/gallery/celebration/IMG_4328.JPG", alt: "Super Crown event" },
      { src: "/gallery/celebration/IMG_2261.jpg", alt: "Community celebration" },
      { src: "/gallery/celebration/IMG_2263.jpg", alt: "Super Crown festivity" },
      { src: "/gallery/celebration/IMG_2286.JPG", alt: "Special event at Super Crown" },
      { src: "/gallery/celebration/IMG_2315.JPG", alt: "Super Crown celebration" },
      { src: "/gallery/celebration/IMG_2836.jpg", alt: "Super Crown community moment" },
      { src: "/gallery/celebration/IMG_2838.JPG", alt: "Festive gathering" },
      { src: "/gallery/celebration/IMG_3457.JPG", alt: "Super Crown event" },
      { src: "/gallery/celebration/IMG_8681.jpg", alt: "Super Crown celebration" },
      { src: "/gallery/celebration/IMG_8820.jpg", alt: "Community milestone" },
      { src: "/gallery/celebration/IMG_9172.jpg", alt: "Super Crown celebration" },
      { src: "/gallery/celebration/IMG_9175.jpg", alt: "Annual day event" },
      { src: "/gallery/celebration/IMG_9353.jpg", alt: "Super Crown festive moment" },
      { src: "/gallery/celebration/IMG_9376.jpg", alt: "Celebration at Super Crown" },
      { src: "/gallery/celebration/IMG_9377.jpg", alt: "Community gathering" },
      { src: "/gallery/celebration/IMG_9706.jpg", alt: "Super Crown milestone event" },
      { src: "/gallery/celebration/DSC_0161.JPEG", alt: "Super Crown celebration" },
      { src: "/gallery/celebration/IMG_0811.JPG", alt: "Foundation celebration" },
      { src: "/gallery/celebration/IMG_1199.JPG", alt: "Super Crown community event" },
      { src: "/gallery/celebration/FullSizeRender(3).jpg", alt: "Super Crown festive event" },
      { src: "/gallery/celebration/IMG_7776 - Copy.jpg", alt: "Super Crown celebration" },
      { src: "/gallery/celebration/945e53fd-2bf1-4555-ae13-65cdcb6b78e1.jpg", alt: "Super Crown community moment" },
      { src: "/gallery/celebration/IMG_2267.PNG", alt: "Celebration at Super Crown" },
    ],
  },
  {
    id: "class",
    title: "Classroom Life",
    categoryLabel: "LEARN & GROW",
    description:
      "Step inside our vibrant classrooms — children engaged in Montessori activities, hands-on learning experiences, and collaborative discovery sessions.",
    coverImage: "/gallery/class/IMG_1212.JPG",
    altText: "Montessori Classroom at Super Crown Foundation",
    route: "/gallery?category=class",
    images: [
      { src: "/gallery/class/IMG_1212.JPG", alt: "Montessori classroom activity" },
      { src: "/gallery/class/IMG_0270.JPG", alt: "Children learning in class" },
      { src: "/gallery/class/IMG_1473.JPG", alt: "Montessori hands-on session" },
      { src: "/gallery/class/IMG_1947(1).JPG", alt: "Classroom exploration" },
      { src: "/gallery/class/IMG_1948(1).JPG", alt: "Super Crown classroom activity" },
      { src: "/gallery/class/IMG_1948.JPG", alt: "Children engaged in learning" },
      { src: "/gallery/class/IMG_1951.JPG", alt: "Montessori learning moment" },
      { src: "/gallery/class/IMG_2262.jpg", alt: "Classroom session" },
      { src: "/gallery/class/IMG_2730(1).JPG", alt: "Hands-on classroom activity" },
      { src: "/gallery/class/IMG_2730.JPG", alt: "Super Crown class session" },
      { src: "/gallery/class/IMG_3557.JPG", alt: "Children in classroom" },
      { src: "/gallery/class/IMG_3560.JPG", alt: "Montessori activities" },
      { src: "/gallery/class/IMG_3564.JPG", alt: "Classroom learning" },
      { src: "/gallery/class/IMG_3573.JPG", alt: "Super Crown classroom" },
      { src: "/gallery/class/IMG_4602.JPG", alt: "Class engagement" },
      { src: "/gallery/class/IMG_4618(1).JPG", alt: "Children at work" },
      { src: "/gallery/class/IMG_4621.JPG", alt: "Montessori session" },
      { src: "/gallery/class/IMG_4643.JPG", alt: "Classroom activity" },
      { src: "/gallery/class/IMG_4646.JPG", alt: "Learning in action" },
      { src: "/gallery/class/IMG_5134.JPG", alt: "Super Crown class" },
      { src: "/gallery/class/IMG_5150.JPG", alt: "Children exploring" },
      { src: "/gallery/class/IMG_5162.JPG", alt: "Classroom session" },
      { src: "/gallery/class/IMG_5170.JPG", alt: "Montessori classroom" },
      { src: "/gallery/class/IMG_5369.JPG", alt: "Learning activity" },
      { src: "/gallery/class/IMG_5568.JPG", alt: "Super Crown class" },
      { src: "/gallery/class/IMG_8695.jpg", alt: "Classroom moment" },
      { src: "/gallery/class/IMG_8800.jpg", alt: "Super Crown learning" },
      { src: "/gallery/class/FullSizeRender(1).jpg", alt: "Classroom activity" },
      { src: "/gallery/class/FullSizeRender(2).jpg", alt: "Montessori session" },
      { src: "/gallery/class/FullSizeRender(4).jpg", alt: "Children in class" },
      { src: "/gallery/class/IMG_0807(1).jpg", alt: "Super Crown classroom" },
      { src: "/gallery/class/IMG_0807.JPG", alt: "Montessori learning" },
    ],
  },
  {
    id: "events",
    title: "Events & Certifications",
    categoryLabel: "MILESTONES",
    description:
      "Proud moments of achievement — certification ceremonies, diploma awards, training events, and professional development milestones for our educators.",
    coverImage: "/gallery/events & certifications/IMG_0861.JPG",
    altText: "Super Crown Foundation Events and Certifications",
    route: "/gallery?category=events",
    images: [
      { src: "/gallery/events & certifications/IMG_0861.JPG", alt: "Certification ceremony" },
      { src: "/gallery/events & certifications/IMG_0865.JPG", alt: "Award ceremony" },
      { src: "/gallery/events & certifications/IMG_0866.JPG", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/IMG_0871.JPG", alt: "Events at Super Crown" },
      { src: "/gallery/events & certifications/IMG_0877.JPG", alt: "Diploma ceremony" },
      { src: "/gallery/events & certifications/IMG_0879.JPG", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_0883.JPG", alt: "Certification event" },
      { src: "/gallery/events & certifications/IMG_0886.JPG", alt: "Super Crown milestone" },
      { src: "/gallery/events & certifications/IMG_0890.JPG", alt: "Award event" },
      { src: "/gallery/events & certifications/IMG_0894.JPG", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/IMG_0899.JPG", alt: "Events and certifications" },
      { src: "/gallery/events & certifications/IMG_0914.JPG", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_0966.JPG", alt: "Super Crown achievement" },
      { src: "/gallery/events & certifications/IMG_1011.JPG", alt: "Certification moment" },
      { src: "/gallery/events & certifications/IMG_1035.JPG", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_1155.JPG", alt: "Award ceremony" },
      { src: "/gallery/events & certifications/IMG_2079.JPG", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/IMG_2084.JPG", alt: "Events at Super Crown" },
      { src: "/gallery/events & certifications/IMG_2101.JPG", alt: "Super Crown milestone" },
      { src: "/gallery/events & certifications/IMG_2138.jpg", alt: "Certification ceremony" },
      { src: "/gallery/events & certifications/IMG_2675.JPG", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_2722.JPG", alt: "Award ceremony" },
      { src: "/gallery/events & certifications/IMG_2723.JPG", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/IMG_3695.JPG", alt: "Super Crown milestone event" },
      { src: "/gallery/events & certifications/IMG_6750.JPEG", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_7776.jpg", alt: "Events at Super Crown" },
      { src: "/gallery/events & certifications/IMG_9708.jpg", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/FullSizeRender.jpg", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/IMG_0091.jpg", alt: "Achievement ceremony" },
      { src: "/gallery/events & certifications/278b45f9-bea3-4e26-833b-b7416e233d56.JPG", alt: "Super Crown certification" },
      { src: "/gallery/events & certifications/9221c4de-98bb-489a-8571-711d27d649c4.jpg", alt: "Events and certifications" },
      { src: "/gallery/events & certifications/9bb5aa78-b438-4aaa-a11b-c5f71756952f.jpg", alt: "Super Crown milestone" },
      { src: "/gallery/events & certifications/copy_BBC5573D-0047-43C0-AFE5-FE659B37A857.jpeg", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/E65E9BD9-B077-49BB-91DB-729A45DD6070.JPG", alt: "Certification ceremony" },
      { src: "/gallery/events & certifications/e80eee8c-0db9-48f8-8403-0578dfe851d1.jpg", alt: "Super Crown achievement" },
      { src: "/gallery/events & certifications/f99d05af-063d-48d3-827e-f986b0c49eaa.jpg", alt: "Super Crown event" },
      { src: "/gallery/events & certifications/facbcbf3-ce38-433c-82fc-022bc0b5b471.jpg", alt: "Events at Super Crown" },
      { src: "/gallery/events & certifications/fd672f53-2b0f-4c02-8cbb-0302ef2f9646.jpg", alt: "Super Crown certification" },
    ],
  },
];
