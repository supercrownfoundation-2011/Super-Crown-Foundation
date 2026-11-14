import { TRAINERS_DATA, Trainer } from "./trainersData";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  objectPosition?: string;
  badge?: string;
  isHead?: boolean;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "rani-rajendran",
    name: "Mrs. Rani Rajendran",
    role: "Founder & Directress",
    image: "/images/founder.jpg",
    qualifications: [
      "M.A.",
      "Advanced Montessori Leadership Diploma",
    ],
    badge: "FOUNDER & DIRECTRESS",
    isHead: true,
  },
  ...TRAINERS_DATA.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.designation,
    image: t.image,
    qualifications: t.qualifications,
    objectPosition: t.objectPosition,
    badge: t.designation.includes("Lead") ? "ACADEMIC LEAD" : "TRAINER",
    isHead: t.designation.includes("Lead"),
  })),
];
