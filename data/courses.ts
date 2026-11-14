export interface MontessoriDiploma {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  isFeatured?: boolean;
}

export interface ProfessionalCertification {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  imageAlt: string;
}

export const MONTESSORI_DIPLOMAS: MontessoriDiploma[] = [
  {
    id: "pg-diploma",
    title: "PG Diploma in Montessori Teacher Training",
    category: "MONTESSORI TEACHER TRAINING",
    description: "An in-depth professional diploma focusing on Montessori philosophy, advanced teaching methodologies, and comprehensive classroom management.",
    highlights: [
      "In-depth knowledge of Montessori philosophy",
      "Advanced teaching methodologies",
      "Child development & psychology",
      "Practical training with lesson planning",
      "Classroom management & activities",
      "Internship & certification",
    ],
    isFeatured: true,
  },
  {
    id: "diploma",
    title: "Diploma in Montessori Teacher Training",
    category: "MONTESSORI TEACHER TRAINING",
    description: "A foundational programme designed to develop practical child-centred teaching techniques and Montessori observation skills.",
    highlights: [
      "Foundation of Montessori philosophy",
      "Child centred teaching approaches",
      "Practical teaching techniques",
      "Developmental activities",
      "Observation & record maintenance",
      "Certification & career guidance",
    ],
    isFeatured: false,
  },
];

export const PROFESSIONAL_CERTIFICATIONS: ProfessionalCertification[] = [
  {
    id: "english-phonics",
    title: "English Phonics Teacher Training",
    description: "Explore phonics-based approaches to teaching English sounds, letter blending, and early reading confidence.",
    iconName: "SpellCheck",
    image: "/images/courses/english-phonics.webp",
    imageAlt: "South Indian female educator teaching English phonics with flashcards to young preschool children in a bright classroom",
  },
  {
    id: "vedic-maths",
    title: "Vedic Maths Teacher Training",
    description: "Master rapid Vedic Maths techniques, mental arithmetic shortcuts, and engaging math teaching methods.",
    iconName: "Calculator",
    image: "/images/courses/vedic-maths.webp",
    imageAlt: "Indian mathematics teacher demonstrating mental arithmetic shortcuts on a whiteboard to attentive students",
  },
  {
    id: "handwriting",
    title: "Handwriting Teacher Training",
    description: "Develop expert knowledge of pencil grip, letter formation, line discipline, and print-to-cursive handwriting guidance.",
    iconName: "PenTool",
    image: "/images/courses/handwriting.webp",
    imageAlt: "Close-up of an Indian student's hand practising neat cursive handwriting in a four-line ruled notebook with teacher guidance",
  },
  {
    id: "child-psychology",
    title: "Child Psychology",
    description: "Understand child developmental milestones, cognitive behaviour patterns, emotional needs, and supportive learning guidance.",
    iconName: "Brain",
    image: "/images/courses/child-psychology.webp",
    imageAlt: "Indian child development educator at eye level observing a young child working with Montessori learning materials",
  },
  {
    id: "classroom-management",
    title: "Classroom Management",
    description: "Learn dynamic techniques for structuring a calm Montessori environment, positive discipline, and student guidance.",
    iconName: "Users",
    image: "/images/courses/classroom-management.webp",
    imageAlt: "Organized Indian Montessori educator guiding children in structured classroom activities in Tamil Nadu",
  },
  {
    id: "storytelling",
    title: "Storytelling Techniques",
    description: "Harness expressive voice modulation, creative puppetry, and dramatisation to captivate and educate young learners.",
    iconName: "BookOpen",
    image: "/images/courses/storytelling.webp",
    imageAlt: "Expressive Indian teacher narrating an animated storybook with a hand puppet to engaged preschool children",
  },
  {
    id: "personality-development",
    title: "Personality Development",
    description: "Cultivate public speaking, self-esteem, interpersonal communication, and leadership presence for teachers and learners.",
    iconName: "Smile",
    image: "/images/courses/personality-development.webp",
    imageAlt: "Indian female teacher trainees collaborating in communication and presentation practice under the Super Crown Foundation banner",
  },
  {
    id: "parenting-skills",
    title: "Parenting Skills",
    description: "Bridge school and home with positive reinforcement strategies, developmental milestones, and empathetic child engagement.",
    iconName: "Heart",
    image: "/images/courses/parenting-skills.webp",
    imageAlt: "Indian parents engaging warmly with their young child in supportive developmental learning at home",
  },
  {
    id: "teaching-aids",
    title: "Teaching Aids Preparation",
    description: "Learn how to craft and curate tangible Montessori sensory apparatus, DIY flashcards, and manipulatives.",
    iconName: "Shapes",
    image: "/images/courses/teaching-aids.webp",
    imageAlt: "Authentic Super Crown Montessori sensorial apparatus, dressing frames, and practical life teaching aids",
  },
  {
    id: "learning-disability",
    title: "Learning Disability Awareness",
    description: "Recognize early signs of dyslexia, ADHD, and dyscalculia, and deploy inclusive classroom accommodations.",
    iconName: "Lightbulb",
    image: "/images/courses/learning-disability.webp",
    imageAlt: "Patient Indian educator providing compassionate one-on-one personalized learning guidance to a student",
  },
];

export const ALL_COURSE_TITLES = [
  ...MONTESSORI_DIPLOMAS.map((d) => d.title),
  ...PROFESSIONAL_CERTIFICATIONS.map((c) => c.title),
];
