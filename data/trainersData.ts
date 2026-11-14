export interface Trainer {
  id: string;
  name: string;
  designation: string;
  image: string;
  qualifications: string[];
  objectPosition?: string;
}

export const TRAINERS_DATA: Trainer[] = [
  {
    id: "sg-aishwarya",
    name: "SG. Aishwarya",
    designation: "Academic Lead / Coordinator",
    image: "/assets/portraits/SG_Aishwarya.jpg",
    qualifications: [
      "M.Sc.",
      "C.S. (Gold Medalist)",
      "PGDMPTT",
      "M.Sc. Psychology",
      "Diploma in Happiness Coach & Parenting",
    ],
    objectPosition: "center center",
  },
  {
    id: "varsha-g-l",
    name: "Varsha. G L",
    designation: "Trainer",
    image: "/assets/portraits/Varsha_G_L.jpg",
    qualifications: [
      "B.A. English / French",
      "PGDMPTT",
      "Pursuing Japanese Language",
    ],
    objectPosition: "center center",
  },
  {
    id: "kr-kanimozhi",
    name: "K.R. Kanimozhi",
    designation: "Trainer",
    image: "/assets/portraits/KR_Kanimozhi.jpg",
    qualifications: [
      "B.E.",
      "PGDMPTT",
    ],
    objectPosition: "center center",
  },
  {
    id: "a-karimunnisha",
    name: "A. Karimunnisha",
    designation: "Online Tutor in Salalah Tamil Sangam; Online Trainer at Super Crown Foundation",
    image: "/assets/portraits/A_Karimunnisha.jpg",
    qualifications: [
      "B.Sc. Computer Science",
      "PGDMPTT",
    ],
    objectPosition: "center center",
  },
  {
    id: "katheja-baseera-s",
    name: "Katheja Baseera S",
    designation: "Trainer",
    image: "/assets/portraits/Katheja_Baseera_S.jpg",
    qualifications: [
      "M.Sc. IT",
      "PGDMPTT",
    ],
    objectPosition: "center center",
  },
];

