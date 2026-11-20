export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CourseDetail {
  slug: string;
  title: string;
  category: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  duration: string;
  mode: string;
  eligibility: string;
  overview: string;
  whoIsThisFor: string[];
  keyHighlights: string[];
  curriculum: {
    moduleTitle: string;
    topics: string[];
  }[];
  careerOpportunities: string[];
  faqs: CourseFaq[];
  image: string;
  imageAlt: string;
}

export const DETAILED_COURSES: Record<string, CourseDetail> = {
  "diploma": {
    slug: "diploma",
    title: "Diploma in Montessori Teacher Training",
    category: "Montessori Teacher Training",
    badge: "Foundational Diploma",
    metaTitle: "Diploma in Montessori Teacher Training in Chennai | Super Crown Foundation",
    metaDescription: "Enrol in Chennai's premier Diploma in Montessori Teacher Training at Super Crown Foundation, Ambattur. Practical sensorial apparatus lab, international certification, and 100% placement guidance.",
    keywords: [
      "Diploma in Montessori Teacher Training Chennai",
      "Montessori Teacher Training Ambattur",
      "Montessori certification Chennai",
      "Nursery teacher training diploma",
      "Montessori practical training Tamil Nadu",
    ],
    duration: "6 Months / 1 Year (Flexible Weekday & Weekend Batches)",
    mode: "Classroom Hands-on Lab & Practical Apparatus Training",
    eligibility: "10+2 / Higher Secondary / Any Degree / Aspiring Educators & Mothers",
    overview: "Our Diploma in Montessori Teacher Training is an internationally accredited foundational programme engineered to transform aspiring educators, career-changers, and young mothers into confident, skilled Montessori practitioners. Through 200+ hours of tactile apparatus training in our dedicated Montessori lab, students master Maria Montessori's revolutionary philosophy, child-centred pedagogy, and observation techniques.",
    whoIsThisFor: [
      "Aspiring preschool, kindergarten, and primary educators",
      "Mothers wanting to understand their child's sensitive periods and learning psychology",
      "Graduates seeking rewarding teaching careers with school placement support",
      "Entrepreneurs looking to establish their own Montessori preschool or daycare center",
    ],
    keyHighlights: [
      "Hands-on practical training with complete Maria Montessori sensory apparatus",
      "In-depth modules on EPL (Exercises of Practical Life) and Sensorial education",
      "Classroom observation, child portfolio maintenance, and lesson album preparation",
      "Internship opportunities with leading pre-schools across Chennai",
      "100% placement assistance and interview coaching",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Montessori Philosophy & Historical Pedagogy",
        topics: [
          "Life and contributions of Dr. Maria Montessori",
          "Four Planes of Development (0–24 years)",
          "The Absorbent Mind and Sensitive Periods",
          "The Prepared Environment vs. Traditional Classrooms",
        ],
      },
      {
        moduleTitle: "Module 2: Exercises of Practical Life (EPL)",
        topics: [
          "Preliminary activities: Pouring, spooning, and transferring",
          "Care of self: Dressing frames, grooming, hygiene",
          "Care of environment: Dusting, polishing, sweeping",
          "Grace and Courtesy lessons in early socialization",
        ],
      },
      {
        moduleTitle: "Module 3: Sensorial Apparatus Mastery",
        topics: [
          "Visual refinement: Pink Tower, Broad Stair, Knobbed Cylinders",
          "Tactile & stereognostic sense: Touch boards, mystery bag",
          "Auditory and olfactory training: Sound boxes and smelling jars",
          "Chromatic development: Color tablets boxes 1, 2, and 3",
        ],
      },
      {
        moduleTitle: "Module 4: Language, Phonics & Mathematical Foundations",
        topics: [
          "Sandpaper letters and tactile phoneme association",
          "Large Movable Alphabet (LMA) for spontaneous word building",
          "Number rods, spindle boxes, and cards and counters",
          "Golden Beads introduction to the decimal system",
        ],
      },
    ],
    careerOpportunities: [
      "Montessori Teacher in international and private CBSE/ICSE schools",
      "Nursery & Kindergarten Lead Educator",
      "Preschool Academic Coordinator",
      "Daycare & Early Learning Center Founder",
      "Private Montessori Homeschooling Consultant",
    ],
    faqs: [
      {
        question: "What is the minimum qualification required for the Montessori Diploma in Chennai?",
        answer: "The minimum qualification is 10+2 (Higher Secondary passed) from any recognized board. Graduates from any stream (Arts, Science, Commerce, Engineering) and working women looking for career transitions are welcomed.",
      },
      {
        question: "Does Super Crown Foundation provide hands-on practical apparatus training?",
        answer: "Yes! Unlike online theoretical courses, Super Crown Foundation has a fully equipped physical Montessori apparatus lab in Ambattur, Chennai with authentic wooden materials where students practice exercises daily.",
      },
      {
        question: "Is this Montessori Diploma recognized for school employment?",
        answer: "Yes, our certification is internationally and nationally recognized, enabling graduates to secure teaching positions in top Montessori, CBSE, ICSE, and international schools across India and abroad.",
      },
      {
        question: "Are flexible batches available for working mothers and professionals?",
        answer: "We offer both regular weekday batches (morning/afternoon) and dedicated weekend Saturday/Sunday batches tailored for working professionals and homemakers.",
      },
    ],
    image: "/images/courses/early-childhood.webp",
    imageAlt: "South Indian Montessori educator demonstrating sensory materials to young trainees in Ambattur Chennai",
  },

  "pg-diploma": {
    slug: "pg-diploma",
    title: "PG Diploma in Montessori Teacher Training",
    category: "Montessori Teacher Training",
    badge: "Advanced Leadership Diploma",
    metaTitle: "Post Graduate Diploma in Montessori Teacher Training Chennai | Super Crown Foundation",
    metaDescription: "Advance your educational career with the Post Graduate Diploma in Montessori Teacher Training at Super Crown Foundation Chennai. Leadership, curriculum planning, and 100% placement.",
    keywords: [
      "PG Diploma in Montessori Teacher Training Chennai",
      "Post graduate Montessori diploma Ambattur",
      "Advanced Montessori teacher certification",
      "Early childhood education leadership Chennai",
      "Montessori school coordinator training",
    ],
    duration: "1 Year (Comprehensive Program)",
    mode: "Classroom Lab, Practicum, Research & Internship",
    eligibility: "Any Bachelor's Degree / Prior Diploma Holders",
    overview: "The Post Graduate (PG) Diploma in Montessori Teacher Training is our flagship academic program designed for graduates aiming for senior academic roles, curriculum directors, and institutional leadership. The curriculum covers deep child psychology, advanced mathematics apparatus, language mechanics, inclusive education, and center administration.",
    whoIsThisFor: [
      "Graduates aspiring to lead Montessori and international school departments",
      "Experienced teachers aiming for promotion to Academic Coordinator or Principal",
      "Education entrepreneurs looking to launch branded early childhood institutions",
      "Child development researchers and pedagogical consultants",
    ],
    keyHighlights: [
      "Advanced curriculum encompassing 3 to 12 years developmental pedagogy",
      "Detailed training in decimal arithmetic, fractions, and grammar boxes",
      "In-depth study of child psychology, cognitive milestones, and behavioral intervention",
      "Institutional management: School licensing, teacher supervision, and parent counselling",
      "Guaranteed internship placement and priority campus interview access",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Advanced Pedagogical Theory & Cognitive Science",
        topics: [
          "Neuroscience of early childhood learning",
          "Jean Piaget, Lev Vygotsky, and Maria Montessori comparative analysis",
          "Sensitive periods for cosmic education and moral development",
          "Constructivist classroom architecture",
        ],
      },
      {
        moduleTitle: "Module 2: Advanced Mathematics & Decimal Apparatus",
        topics: [
          "Stamp game, dot game, and bead frame operations",
          "Multiplication checkerboard and division racks and tubes",
          "Fractions, geometry cabinets, and binomial/trinomial cubes",
          "Transitioning from concrete manipulation to mental abstraction",
        ],
      },
      {
        moduleTitle: "Module 3: Advanced Language, Grammar & Creative Expression",
        topics: [
          "Grammar symbols and classification boxes",
          "Sentence analysis, parsing, and syntax exploration",
          "Phonetic reading schemes and non-phonetic sight vocabulary",
          "Storytelling, children's literature curation, and dramatization",
        ],
      },
      {
        moduleTitle: "Module 4: School Leadership, Inclusive Education & Practicum",
        topics: [
          "Early detection of learning differences (Dyslexia, ADHD, Autism)",
          "Classroom leadership, parent communication, and counseling ethics",
          "School administration, statutory compliances, and curriculum audit",
          "Supervised 120-hour teaching internship with evaluation",
        ],
      },
    ],
    careerOpportunities: [
      "Head of Montessori / Academic Coordinator in International Schools",
      "Preschool Director / Vice-Principal",
      "Master Montessori Teacher Trainer",
      "Early Childhood Curriculum Developer",
      "Educational Franchise Owner / Preschool Founder",
    ],
    faqs: [
      {
        question: "How does the PG Diploma differ from the standard Montessori Diploma?",
        answer: "The PG Diploma covers advanced primary age groups (up to 12 years), comprehensive child psychology, advanced mathematical apparatus (fractions, geometry), and school leadership/administration skills necessary for senior coordinator positions.",
      },
      {
        question: "Can I join the PG Diploma if I am a graduate from non-education background?",
        answer: "Yes, graduates from any discipline (B.A., B.Sc., B.Com., B.E., B.Tech.) are eligible. We start from foundational fundamentals before advancing to leadership methodologies.",
      },
      {
        question: "Does this course include school internships?",
        answer: "Yes! Every PG Diploma candidate undergoes a structured classroom internship in partnered preschools and Montessori campuses across Chennai with mentor evaluation.",
      },
      {
        question: "What placement assistance is provided upon completion?",
        answer: "We offer 100% placement support with resume workshops, demo teaching preparation, mock interviews, and direct campus recruitment connections with reputed educational groups.",
      },
    ],
    image: "/images/courses/elementary.webp",
    imageAlt: "Super Crown Foundation master trainer supervising trainee teachers in classroom lesson planning in Chennai",
  },

  "english-phonics": {
    slug: "english-phonics",
    title: "English Phonics Teacher Training",
    category: "Skill Certification",
    badge: "High Demand Certification",
    metaTitle: "English Phonics Teacher Training Course in Chennai | Super Crown Foundation",
    metaDescription: "Master synthetic phonics, 44 speech sounds, blending, and reading pedagogy with the English Phonics Teacher Training Course at Super Crown Foundation, Chennai.",
    keywords: [
      "English Phonics Teacher Training Chennai",
      "Phonics certification course Ambattur",
      "Jolly Phonics teacher training Chennai",
      "Synthetic phonics certification for teachers",
      "Phonics instructor course Tamil Nadu",
    ],
    duration: "1 Month / Intensive Weekend Workshop",
    mode: "Interactive Lab & Audio-Visual Sound Workshop",
    eligibility: "Teachers, Homemakers, Tutors, and School Staff",
    overview: "Our English Phonics Teacher Training certification equips educators with the scientific mechanics of Synthetic Phonics. Trainees master all 44 English phoneme sounds, tactile flashcard blending, digraphs, diphthongs, alternative spellings, and tricky word strategies to guide children from emergent speech to fluent independent reading.",
    whoIsThisFor: [
      "Preschool, primary, and kindergarten English educators",
      "Home tutors looking to establish lucrative evening phonics classes",
      "Parents wanting their children to pronounce and read English without mother-tongue interference",
      "Speech trainers, remedial educators, and language enthusiasts",
    ],
    keyHighlights: [
      "Deep mastery of all 44 English phonetic sounds, articulation, and mouth positioning",
      "Sound blending techniques: Consonant-Vowel-Consonant (CVC) to multisyllabic words",
      "Digraphs (ch, sh, th), diphthongs, and complex vowel variations",
      "Techniques for tackling irregular tricky sight words without confusion",
      "Ready-to-use phonics lesson plans, worksheets, and DIY teaching manipulative kits",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Phonemic Awareness & Sound Identification",
        topics: [
          "The 44 sounds of the English language and IPA notation basics",
          "Pure sound pronunciation without the 'uh' schwa sound",
          "Letter-sound correspondence using multisensory actions",
          "Phoneme segmentation and auditory discrimination",
        ],
      },
      {
        moduleTitle: "Module 2: Blending & Segmenting Strategies",
        topics: [
          "CVC word construction and phoneme blending",
          "Initial and final consonant blends (st, bl, tr, nd)",
          "Long and short vowel distinction rules",
          "Using sound buttons and Elkonin boxes",
        ],
      },
      {
        moduleTitle: "Module 3: Complex Phonics & Spelling Rules",
        topics: [
          "Consonant and vowel digraphs (sh, th, ch, ai, ee, igh, oa)",
          "Alternative spellings for common vowel sounds",
          "Magic 'e' / split digraphs (a-e, i-e, o-e, u-e)",
          "Soft 'c' and soft 'g' phonics mechanics",
        ],
      },
      {
        moduleTitle: "Module 4: Reading Fluency, Tricky Words & Lesson Structuring",
        topics: [
          "Decodable readers vs. leveled storybooks",
          "Strategies for non-decodable tricky sight words",
          "Classroom games, tactile sound mats, and circle time activities",
          "Setting up your own independent Phonics Academy or tuition center",
        ],
      },
    ],
    careerOpportunities: [
      "Certified Phonics Trainer in CBSE, ICSE, and Cambridge Schools",
      "Independent Phonics Studio / Academy Entrepreneur",
      "Primary English Reading Specialist",
      "Language Enrichment Specialist in Activity Centers",
    ],
    faqs: [
      {
        question: "Can I start my own phonics classes after completing this course?",
        answer: "Yes! Over 60% of our phonics graduates successfully run their own evening and weekend phonics learning centers from home or rented studios, creating strong self-employment income.",
      },
      {
        question: "Is prior English literature background necessary?",
        answer: "No. Basic conversational English proficiency is sufficient. We teach the pronunciation mechanics, articulation rules, and sound charts systematically from scratch.",
      },
      {
        question: "Will I receive practical teaching practice?",
        answer: "Yes, every participant conducts mock student presentations with sound blending cards, receives audio correction from master trainers, and prepares custom phonics teaching aids.",
      },
    ],
    image: "/images/courses/english-phonics.webp",
    imageAlt: "South Indian female educator teaching English phonics with flashcards to young preschool children in a bright classroom",
  },

  "vedic-maths": {
    slug: "vedic-maths",
    title: "Vedic Maths Teacher Training",
    category: "Skill Certification",
    badge: "Fast-Track Mathematics",
    metaTitle: "Vedic Maths Teacher Training Course Chennai | Super Crown Foundation",
    metaDescription: "Master 16 Vedic Sutras, mental arithmetic shortcuts, high-speed calculation, and teaching pedagogy with Vedic Maths Teacher Certification in Chennai.",
    keywords: [
      "Vedic Maths Teacher Training Chennai",
      "Vedic mathematics certification course",
      "Mental maths teacher training Ambattur",
      "Speed maths instructor course Tamil Nadu",
      "Vedic Sutras workshop Chennai",
    ],
    duration: "1 Month / Weekend Certification",
    mode: "Interactive Numerical Workshop & Board Demonstration",
    eligibility: "Maths Teachers, Tutors, Engineering Graduates & Math Enthusiasts",
    overview: "Vedic Mathematics, derived from ancient Indian mathematical treatises, simplifies complex calculations into intuitive one-line mental operations. This teacher training program empowers educators to teach 16 foundational Sutras and 13 Sub-Sutras, enabling their students to solve addition, subtraction, multiplication, squaring, cubing, and algebraic equations up to 10 times faster than conventional methods.",
    whoIsThisFor: [
      "School mathematics teachers seeking engaging, high-speed teaching methodologies",
      "Private tuition teachers wanting to attract competitive exam students",
      "Engineers and graduates desiring to teach math with excitement rather than fear",
      "Parents wanting to eliminate math phobia in their school-going children",
    ],
    keyHighlights: [
      "Complete mastery of 16 Vedic Sutras and 13 Corollaries (Upa-Sutras)",
      "High-speed mental multiplication of 2, 3, and 4-digit numbers in seconds",
      "Instant squaring, cubing, square root, and cube root extraction",
      "Algebraic factorization, simultaneous equations, and division shortcuts",
      "Pedagogical roadmap on how to teach school children step-by-step without confusion",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Core Vedic Principles & Rapid Addition/Subtraction",
        topics: [
          "Origin and philosophy of Swami Bharati Krishna Tirtha's 16 Sutras",
          "Nikhilam Navatashcaramam Dashatah (All from 9 and last from 10)",
          "Dot Method for instantaneous multidigit column addition",
          "Bar numbers (Vinculum numbers) for subtraction without borrowing",
        ],
      },
      {
        moduleTitle: "Module 2: High-Speed Multiplication Sutras",
        topics: [
          "Ekadhikena Purvena (By one more than the previous one)",
          "Urdhva-Tiryakbhyam (Vertically and Crosswise universal method)",
          "Base multiplication above and below powers of 10, 50, 100, 1000",
          "Multiplication with series of 9s, 11s, and identical prefixes",
        ],
      },
      {
        moduleTitle: "Module 3: Powers, Roots & Divisibility Magic",
        topics: [
          "Yavadunam Sutra for instantaneous squaring of numbers",
          "Duplex (Dwandwa Yoga) method for general squares and square roots",
          "Cube roots of perfect cubes within 3 seconds using Vilokanam",
          "Flag division (Paravartya Yojayet) for large multi-digit divisors",
        ],
      },
      {
        moduleTitle: "Module 4: Classroom Pedagogy & Setting Up Your Tuition Hub",
        topics: [
          "Structuring age-appropriate Vedic Maths batches (Grades 3 to 12)",
          "Gamified math worksheets, speed drill competitions, and timing charts",
          "Curriculum planning for a 3-level commercial student course",
          "Marketing and launching your home or commercial Vedic Maths center",
        ],
      },
    ],
    careerOpportunities: [
      "School Speed Maths / Vedic Maths Faculty",
      "Independent Vedic Mathematics Academy Director",
      "Competitive Exam (Olympiad, NTSE, Bank, SSC) Quantitative Aptitude Trainer",
      "Private Math Enrichment Specialist",
    ],
    faqs: [
      {
        question: "Does Vedic Maths confuse children learning regular school math?",
        answer: "No! Vedic Maths actually reinforces school math because it provides children with multiple creative verification methods. It transforms math from mechanical memorization into exciting problem-solving.",
      },
      {
        question: "What age groups can I teach after completing this certification?",
        answer: "You can teach students from Grade 3 (8 years old) all the way up to college students and adults preparing for competitive exams like CAT, Bank PO, and Olympiads.",
      },
      {
        question: "Will I get training materials and student worksheet templates?",
        answer: "Yes, all trainees receive comprehensive reference books, formula flashcards, and print-ready practice worksheet templates to use with their own future students.",
      },
    ],
    image: "/images/courses/vedic-maths.webp",
    imageAlt: "Indian mathematics teacher demonstrating mental arithmetic shortcuts on a whiteboard to attentive students",
  },

  "child-psychology": {
    slug: "child-psychology",
    title: "Child Psychology for Teachers",
    category: "Skill Certification",
    badge: "Educator Essential",
    metaTitle: "Child Psychology Course for Teachers Chennai | Super Crown Foundation",
    metaDescription: "Understand early childhood behavioral milestones, emotional regulation, and developmental psychology with Child Psychology Certification at Super Crown Foundation.",
    keywords: [
      "Child Psychology course for teachers Chennai",
      "Early childhood psychology certification Ambattur",
      "Child development course for educators",
      "Behavioral psychology for teachers Tamil Nadu",
      "Child mental health in education Chennai",
    ],
    duration: "1 Month / Weekend Sessions",
    mode: "Interactive Clinical Case Studies & Behavioral Workshops",
    eligibility: "Teachers, Counselors, Parents, and Early Childhood Staff",
    overview: "Understanding the emotional and neurological landscape of a child is central to authentic Montessori education. This specialized course equips teachers with deep psychological frameworks to address behavioral challenges, separation anxiety, sensory sensitivities, emotional dysregulation, and developmental milestones from ages 0 to 8.",
    whoIsThisFor: [
      "Pre-primary and primary educators facing classroom behavioral challenges",
      "School counselors and student pastoral care staff",
      "New parents seeking psychological clarity on child tantrums and peer relations",
      "Educators wanting to foster compassionate, supportive classroom dynamics",
    ],
    keyHighlights: [
      "Detailed analysis of Erik Erikson's psychosocial stages and Bowlby's Attachment Theory",
      "Techniques for managing aggression, hyperactivity, withdrawal, and school phobia",
      "Identifying sensory processing challenges and supportive accommodations",
      "Positive discipline without punishment, shame, or reward dependency",
      "Parent counseling communication frameworks for difficult feedback conversations",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Foundations of Early Child Development",
        topics: [
          "Brain plasticity and synaptic pruning in the first six years",
          "Cognitive, motor, social, and emotional milestone benchmarks",
          "Attachment theory: Secure vs. insecure attachment in preschool",
          "Impact of screen time and modern lifestyles on child focus",
        ],
      },
      {
        moduleTitle: "Module 2: Behavioral Observation & Understanding Distress",
        topics: [
          "Decoding tantrums, meltdowns, and sensory overload",
          "Separation anxiety, bedtime resistance, and social shyness",
          "Sibling rivalry, peer aggression, and sharing dynamics",
          "The psychology of the 'defiant' or 'stubborn' child",
        ],
      },
      {
        moduleTitle: "Module 3: Positive Guidance & Emotional Regulation",
        topics: [
          "Emotion coaching: Naming, validating, and calming feelings",
          "Classroom calm-down corners vs. punitive time-outs",
          "Self-regulation routines and mindfulness for young children",
          "Building intrinsic self-esteem and resilience against failure",
        ],
      },
      {
        moduleTitle: "Module 4: Special Considerations & Parent Collaboration",
        topics: [
          "Early red flags for developmental delays and neurodivergence",
          "Handling trauma, family changes, and emotional grief in students",
          "Conducting empathetic parent-teacher conferences",
          "Legal and ethical boundaries for school counseling support",
        ],
      },
    ],
    careerOpportunities: [
      "Student Well-Being Coordinator in Primary Schools",
      "Early Childhood Behavioral Consultant",
      "Montessori Parent Counselor",
      "Preschool Emotional Development Facilitator",
    ],
    faqs: [
      {
        question: "Is this course practical or just clinical theory?",
        answer: "The course is 100% focused on practical classroom and home scenarios. We analyze real-world case studies of tantrums, refusal to write, hyperactivity, and social isolation with actionable handling strategies.",
      },
      {
        question: "Can I counsel parents after completing this course?",
        answer: "Yes, educators gain the communication frameworks and psychological vocabulary necessary to lead empathetic, constructive parent guidance sessions during parent-teacher meetings.",
      },
    ],
    image: "/images/courses/child-psychology.webp",
    imageAlt: "Indian child development educator at eye level observing a young child working with Montessori learning materials",
  },

  "handwriting": {
    slug: "handwriting",
    title: "Handwriting Teacher Training",
    category: "Skill Certification",
    badge: "Motor Skills Mastery",
    metaTitle: "Handwriting Teacher Training Certification Chennai | Super Crown Foundation",
    metaDescription: "Master pencil grip corrections, print-to-cursive transition, stroke geometry, and speed handwriting instruction at Super Crown Foundation Chennai.",
    keywords: [
      "Handwriting Teacher Training Chennai",
      "Calligraphy and cursive writing instructor Ambattur",
      "Pencil grip correction course for teachers",
      "Handwriting improvement certification Tamil Nadu",
    ],
    duration: "2 Weeks / Weekend Workshop",
    mode: "Hands-on Stroke Calibration & Penmanship Lab",
    eligibility: "Primary Teachers, Special Educators, Tutors, and Parents",
    overview: "Poor handwriting causes loss of marks, exam fatigue, and low academic confidence in students. This intensive teacher training program provides the scientific biomechanics of pencil grasp, finger muscle development, letter posture, line discipline, and the structured progression from print manuscript to elegant cursive handwriting.",
    whoIsThisFor: [
      "Primary school teachers wanting to systematically improve class penmanship",
      "Tuition teachers planning to launch high-demand summer handwriting clinics",
      "Parents of children struggling with slow writing, illegible notes, or hand pain",
      "Remedial educators addressing dysgraphia and fine motor coordination",
    ],
    keyHighlights: [
      "Ergonomics of posture, paper tilt, and dynamic tripod pencil grip",
      "Four baseline guides: Ascenders, descenders, base line, and waist line",
      "Strokes, loops, joins, and spacing calibration for speed and legibility",
      "Print to cursive transition methodology without student frustration",
      "Diagnostic grading techniques to pinpoint handwriting flaws in minutes",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Motor Biomechanics & Ergonomics",
        topics: [
          "Fine motor muscle strengthening exercises and finger manipulation",
          "Dynamic tripod grip vs. compensatory improper grips",
          "Paper positioning for right-handed vs. left-handed students",
          "Selection of writing instruments (triangular pencils, fountain pens)",
        ],
      },
      {
        moduleTitle: "Module 2: Print Letter Geometry & Spacing",
        topics: [
          "Basic strokes: Standing, sleeping, slanting, and curves",
          "Capital and small print letter proportions",
          "Inter-letter and inter-word spacing rules",
          "Baseline adherence and eliminating floating text",
        ],
      },
      {
        moduleTitle: "Module 3: Cursive Penmanship Mastery",
        topics: [
          "Cursive entry and exit loops (lead-ins and tails)",
          "Connecting high letters (b, v, w) vs. baseline joins",
          "Maintaining uniform slant and rhythmic letter flow",
          "Diagnosing and correcting dysgraphic letter reversals (b/d, p/q)",
        ],
      },
      {
        moduleTitle: "Module 4: Speed Writing, Examination Prep & Business Launch",
        topics: [
          "Transitioning from 4-line notebooks to single-line and unruled paper",
          "Speed writing techniques for timed school and board examinations",
          "Evaluating handwriting samples using standardized rubrics",
          "Organizing 15-day handwriting transformation bootcamps",
        ],
      },
    ],
    careerOpportunities: [
      "Certified School Penmanship & Handwriting Coach",
      "Independent Handwriting Studio Founder",
      "Tuition Center Writing Specialist",
      "Fine Motor Development Consultant",
    ],
    faqs: [
      {
        question: "Can an adult or child with very bad handwriting actually fix it?",
        answer: "Absolutely! Handwriting is a motor skill, not a genetic trait. By correcting grip pressure and practicing deliberate geometric letter strokes, dramatic improvements are achieved within 15 days.",
      },
      {
        question: "Does the course cover left-handed students?",
        answer: "Yes, we teach specific left-handed paper tilt angles, arm positioning, and pen grasps to prevent hand smudging and wrist strain.",
      },
    ],
    image: "/images/courses/handwriting.webp",
    imageAlt: "Close-up of an Indian student's hand practising neat cursive handwriting in a four-line ruled notebook with teacher guidance",
  },

  "classroom-management": {
    slug: "classroom-management",
    title: "Classroom Management Certification",
    category: "Skill Certification",
    badge: "Classroom Leadership",
    metaTitle: "Classroom Management Teacher Certification Chennai | Super Crown Foundation",
    metaDescription: "Master Montessori positive discipline, structured learning zones, conflict resolution, and calm classroom architecture with Super Crown Foundation in Chennai.",
    keywords: [
      "Classroom Management certification Chennai",
      "Teacher leadership training Ambattur",
      "Montessori classroom discipline course",
      "Early childhood classroom management Tamil Nadu",
    ],
    duration: "2 Weeks / Weekend Program",
    mode: "Interactive Simulation & Roleplay Workshop",
    eligibility: "New & Experienced Teachers, School Coordinators",
    overview: "A chaotic classroom drains teacher energy and hinders learning. This program equips educators with practical strategies to establish an orderly, self-directed Montessori environment where children work with intrinsic focus, mutual respect, and calm collaboration without shouted commands or punitive measures.",
    whoIsThisFor: [
      "New teachers experiencing difficulties with classroom noise or disruptions",
      "Experienced educators transitioning into Montessori or student-centered schools",
      "School administrators seeking to standardize positive discipline across staff",
    ],
    keyHighlights: [
      "Setting up high-functioning prepared classroom layouts and traffic flow",
      "The 'Grace and Courtesy' curriculum for proactive behavior modeling",
      "Transitions: Moving between activities smoothly without chaos or shouting",
      "De-escalating peer conflicts using non-violent restorative circles",
      "Teacher vocal modulation, body language, and non-verbal cue systems",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Environmental Architecture & Flow",
        topics: [
          "Physical layout: Shelves, floor mats, tables, and quiet corners",
          "Material accessibility and fostering autonomous clean-up habits",
          "Eliminating blind spots and clutter in the classroom",
        ],
      },
      {
        moduleTitle: "Module 2: Positive Behavioral Modeling",
        topics: [
          "Proactive vs. reactive classroom discipline",
          "Grace and courtesy lessons: Walking softly, rolling mats, speaking in turns",
          "Using songs, chimes, and non-verbal cues for attention",
        ],
      },
      {
        moduleTitle: "Module 3: Conflict Mediation & De-escalation",
        topics: [
          "The 'Peace Table' concept for resolving peer disputes",
          "Handling defiance and tantrums with calm authority",
          "Restorative consequences vs. punitive isolation",
        ],
      },
    ],
    careerOpportunities: [
      "Lead Classroom Educator",
      "Kindergarten Floor Coordinator",
      "School Discipline & Well-Being Officer",
    ],
    faqs: [
      {
        question: "How do Montessori classrooms maintain discipline without shouting?",
        answer: "Montessori classrooms channel children's natural need for purposeful movement into meaningful hands-on work. When children are deeply engaged with tactile apparatus tailored to their developmental needs, disruptive behavior naturally subsides.",
      },
    ],
    image: "/images/courses/classroom-management.webp",
    imageAlt: "Organized Indian Montessori educator guiding children in structured classroom activities in Tamil Nadu",
  },

  "storytelling": {
    slug: "storytelling",
    title: "Storytelling Techniques for Educators",
    category: "Skill Certification",
    badge: "Creative Pedagogy",
    metaTitle: "Storytelling Teacher Training Course in Chennai | Super Crown Foundation",
    metaDescription: "Learn expressive voice modulation, puppetry, dramatisation, and emotional narrative engagement with Storytelling Certification at Super Crown Foundation.",
    keywords: [
      "Storytelling course for teachers Chennai",
      "Creative puppetry and storytelling Ambattur",
      "Early childhood narration workshop Chennai",
      "Storytelling certification for preschool educators",
    ],
    duration: "2 Weeks / Weekend Workshop",
    mode: "Live Performance, Puppetry & Vocal Lab",
    eligibility: "Preschool Educators, Primary Teachers, Storytellers, and Mothers",
    overview: "Stories are the oldest and most powerful medium of education. This practical certification trains teachers in voice modulation, dramatic timing, shadow and finger puppetry, character embodiment, and how to use narratives to teach moral values, science concepts, and language fluency.",
    whoIsThisFor: [
      "Preschool and kindergarten educators seeking animated circle time sessions",
      "Children's authors, librarians, and creative arts facilitators",
      "Mothers wanting to make bedtime reading an enchanting developmental ritual",
    ],
    keyHighlights: [
      "Voice modulation: Pitch, tempo, volume, and character accents",
      "Puppet craftsmanship: Finger puppets, stick puppets, and sock puppets",
      "Kamishibai storytelling and felt-board flannelgraph techniques",
      "Interactive storytelling where children become co-creators of the plot",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: The Vocal Instrument & Narrative Arc",
        topics: [
          "Vocal warmups, breathing control, and protecting teacher vocal cords",
          "The classic narrative arc: Hook, build-up, climax, resolution",
          "Facial expressions, gestures, and theatrical stage presence",
        ],
      },
      {
        moduleTitle: "Module 2: Props, Puppetry & Visual Story Aids",
        topics: [
          "DIY puppet crafting from recycled classroom materials",
          "Shadow puppetry and using light in storytelling",
          "Using musical instruments and sound effects (drums, rainmakers)",
        ],
      },
      {
        moduleTitle: "Module 3: Curriculum Integration & Commercial Story Circles",
        topics: [
          "Teaching science, math, and social values through metaphors",
          "Promoting student vocabulary and questioning during story circles",
          "Setting up your own weekend children's Storytelling Club",
        ],
      },
    ],
    careerOpportunities: [
      "Professional Children's Storyteller",
      "Preschool Creative Dramatics Specialist",
      "Children's Literature Club Founder",
    ],
    faqs: [
      {
        question: "Can someone who is shy or soft-spoken become an engaging storyteller?",
        answer: "Yes! Storytelling is a trained craft. Through vocal projection exercises, character props, and pacing techniques, even quiet individuals discover vibrant, expressive confidence.",
      },
    ],
    image: "/images/courses/storytelling.webp",
    imageAlt: "Expressive Indian teacher narrating an animated storybook with a hand puppet to engaged preschool children",
  },

  "learning-disability": {
    slug: "learning-disability",
    title: "Learning Disability Awareness Certification",
    category: "Skill Certification",
    badge: "Inclusive Education",
    metaTitle: "Learning Disability Awareness Course for Teachers Chennai | Super Crown Foundation",
    metaDescription: "Recognize early signs of Dyslexia, ADHD, and Dyscalculia, and deploy inclusive Montessori accommodations with Super Crown Foundation Chennai.",
    keywords: [
      "Learning disability teacher training Chennai",
      "Dyslexia awareness course for educators Ambattur",
      "Special education needs SEN teacher certification",
      "Inclusive classroom training Tamil Nadu",
    ],
    duration: "1 Month / Weekend Certification",
    mode: "Clinical Diagnostic Study & Accommodation Lab",
    eligibility: "Educators, Tutors, Special Needs Aides, and Parents",
    overview: "Every child learns differently. This essential course equips teachers to identify early neurodivergent traits including Dyslexia (reading), Dysgraphia (writing), Dyscalculia (numbers), and ADHD. Educators master sensory-friendly adaptations, multisensory phonics, and compassionate classroom accommodations.",
    whoIsThisFor: [
      "General educators committed to inclusive classroom practices",
      "Remedial educators and learning support teachers",
      "Parents observing unexplained learning frustration in their children",
    ],
    keyHighlights: [
      "Early screening checklists for preschool and primary children",
      "Understanding neurodiversity from a strengths-based model",
      "Multisensory teaching adaptations (VAKT: Visual, Auditory, Kinesthetic, Tactile)",
      "Formulating Individualized Education Plans (IEP) for school settings",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Understanding Specific Learning Differences (SLD)",
        topics: [
          "Neurobiology of Dyslexia, Dysgraphia, and Dyscalculia",
          "ADHD: Inattentive, hyperactive, and combined presentations",
          "Differentiating between learning difficulty vs. intellectual limitation",
        ],
      },
      {
        moduleTitle: "Module 2: Screening, Observation & Assistive Aids",
        topics: [
          "Classroom observation rubrics without clinical labeling",
          "Multisensory phonics and math adaptations for neurodivergent learners",
          "Assistive tools: Textured grips, slant boards, colored overlays",
        ],
      },
      {
        moduleTitle: "Module 3: Inclusive Lesson Design & Parent Partnership",
        topics: [
          "Designing differentiated worksheets and test accommodations",
          "Protecting child self-esteem and peer empathy in class",
          "Sensitive communication with parents regarding formal evaluations",
        ],
      },
    ],
    careerOpportunities: [
      "Inclusive Classroom Lead Teacher",
      "Remedial Learning Facilitator",
      "School Special Educational Needs (SEN) Coordinator",
    ],
    faqs: [
      {
        question: "Does this certification qualify me to diagnose learning disabilities?",
        answer: "This certification trains educators in early identification, classroom screening, and instructional accommodations. Formal clinical diagnosis is conducted by registered clinical psychologists, whom our trainees learn to liaise with.",
      },
    ],
    image: "/images/courses/learning-disability.webp",
    imageAlt: "Patient Indian educator providing compassionate one-on-one personalized learning guidance to a student",
  },

  "teaching-aids": {
    slug: "teaching-aids",
    title: "Teaching Aids Preparation Workshop",
    category: "Skill Certification",
    badge: "Hands-on Craftsmanship",
    metaTitle: "Teaching Aids Preparation Montessori Workshop Chennai | Super Crown Foundation",
    metaDescription: "Learn to design, craft, and curate authentic Montessori sensorial apparatus, DIY manipulatives, and flashcards at Super Crown Foundation Chennai.",
    keywords: [
      "Teaching aids preparation course Chennai",
      "Montessori apparatus crafting workshop Ambattur",
      "DIY preschool teaching materials training",
      "Early learning manipulatives course Tamil Nadu",
    ],
    duration: "2 Weeks / Weekend Workshop",
    mode: "Hands-on Material Crafting Lab",
    eligibility: "Preschool Educators, Teacher Trainees, Craft Enthusiasts",
    overview: "Children understand best when they can touch and manipulate learning concepts. This tactile workshop trains educators to create durable, high-impact Montessori-inspired teaching aids, sandpaper letters, number rods, tactile classification cards, and sensory bottles using cost-effective materials.",
    whoIsThisFor: [
      "Educators wanting to enrich their classrooms on a realistic budget",
      "Teacher trainees preparing album presentations and demo teaching aids",
      "Preschool owners wanting customized tactile learning materials",
    ],
    keyHighlights: [
      "Hands-on crafting of sensorial manipulatives and tactile flashcards",
      "Age-appropriate safety standards: Non-toxic materials, rounded edges, child ergonomics",
      "Curating thematic learning trays (Botanical, Zoological, Cultural)",
      "Portfolio creation of 25+ teaching aids to present at job interviews",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Principles of Montessori Material Design",
        topics: [
          "Isolation of a single quality (color, size, texture)",
          "Control of error (self-correcting designs)",
          "Aesthetic appeal and natural textures (wood, fabric, stone)",
        ],
      },
      {
        moduleTitle: "Module 2: Language & Math Manipulatives Crafting",
        topics: [
          "Crafting DIY sandpaper letters and tactile sound boards",
          "Designing spindle boxes, counter cards, and bead chains",
          "Three-part nomenclature cards (Picture, Label, Control)",
        ],
      },
      {
        moduleTitle: "Module 3: Sensorial & Cultural Learning Trays",
        topics: [
          "Color matching discs, mystery bags, and texture tablets",
          "Life cycle trays (Butterfly, Plant, Frog) with tangible figurines",
          "Preservation, laminating, and maintenance of classroom materials",
        ],
      },
    ],
    careerOpportunities: [
      "Montessori Material Developer",
      "Preschool Activity Coordinator",
      "Educational Resource Creator & Supplier",
    ],
    faqs: [
      {
        question: "Do I take home the teaching aids crafted during the workshop?",
        answer: "Yes! All teaching aids, nomenclature sets, and manipulatives crafted during the workshop become your personal teaching toolkit to keep for your classroom or job interviews.",
      },
    ],
    image: "/images/courses/teaching-aids.webp",
    imageAlt: "Authentic Super Crown Montessori sensorial apparatus, dressing frames, and practical life teaching aids",
  },

  "personality-development": {
    slug: "personality-development",
    title: "Personality Development for Educators",
    category: "Skill Certification",
    badge: "Professional Excellence",
    metaTitle: "Personality Development for Teachers Course Chennai | Super Crown Foundation",
    metaDescription: "Elevate your professional confidence, public speaking, body language, interview presentation, and voice projection with Super Crown Foundation Chennai.",
    keywords: [
      "Personality development for teachers Chennai",
      "Teacher grooming and communication Ambattur",
      "Public speaking and confidence for educators",
      "School interview preparation training Tamil Nadu",
    ],
    duration: "2 Weeks / Weekend Program",
    mode: "Camera Simulation, Mock Interviews & Stage Lab",
    eligibility: "Teacher Trainees, Homemakers, Working Educators",
    overview: "A great teacher inspires not only through subject knowledge, but through charismatic presence, clear diction, empathetic body language, and poise. This transformative program builds unshakeable confidence in speaking before large audiences, conducting parent conferences, and acing school recruitment interviews.",
    whoIsThisFor: [
      "Trainee teachers preparing for upcoming school hiring rounds and demo lessons",
      "Homemakers re-entering the professional workforce after career breaks",
      "Educators wanting to overcome stage fright and public speaking hesitation",
    ],
    keyHighlights: [
      "Eliminating stage fear and public speaking anxiety",
      "Poise, professional dress code, posture, and empathetic eye contact",
      "Accent neutralization, crisp diction, and confident English conversation",
      "Mock demo lessons evaluated with on-camera video playback and feedback",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Self-Image & Overcoming Hesitation",
        topics: [
          "Building unshakeable inner self-esteem and growth mindset",
          "Breathing control to conquer speaking jitters and tremors",
          "Positive self-talk and commanding presence",
        ],
      },
      {
        moduleTitle: "Module 2: Professional Body Language & Etiquette",
        topics: [
          "Open vs. closed body postures in the classroom",
          "Voice modulation, tone pacing, and eliminating filler words ('um', 'like')",
          "Professional dressing, grooming standards, and school decorum",
        ],
      },
      {
        moduleTitle: "Module 3: Interview Mastery & Demo Class Success",
        topics: [
          "Crafting a standout educator resume and teaching portfolio",
          "Answering tough interview questions with composure and clarity",
          "Conducting a flawless 15-minute demo teaching lesson",
        ],
      },
    ],
    careerOpportunities: [
      "Top-tier International School Educator",
      "Public Speaker & Educational Facilitator",
      "Teacher Training Faculty",
    ],
    faqs: [
      {
        question: "Will this help me pass school interviews?",
        answer: "Yes, our trainees undergo rigorous mock interview panels and recorded demo lessons. 95%+ of our graduates report feeling completely fearless during actual school interviews.",
      },
    ],
    image: "/images/courses/personality-development.webp",
    imageAlt: "Indian female teacher trainees collaborating in communication and presentation practice under the Super Crown Foundation banner",
  },

  "parenting-skills": {
    slug: "parenting-skills",
    title: "Parenting Skills & Positive Guidance",
    category: "Skill Certification",
    badge: "Family & Child Guidance",
    metaTitle: "Parenting Skills Certification Course Chennai | Super Crown Foundation",
    metaDescription: "Bridge home and school with positive reinforcement, screen time moderation, tantrum management, and empathetic child bonding at Super Crown Foundation.",
    keywords: [
      "Parenting skills workshop Chennai",
      "Positive parenting course Ambattur",
      "Early childhood parenting certification Tamil Nadu",
      "Parent counseling training Chennai",
    ],
    duration: "2 Weeks / Weekend Interactive Workshop",
    mode: "Interactive Discussion Circles & Family Case Studies",
    eligibility: "Parents, Grandparents, Teachers, Family Counselors",
    overview: "Modern parenting comes with unprecedented challenges: excessive screen exposure, bedtime resistance, sibling conflicts, and communication gaps. This program translates Montessori principles into the home environment, teaching parents how to foster independence, emotional connection, and cooperative discipline without shouting or punishments.",
    whoIsThisFor: [
      "Parents with toddlers and young children seeking gentle, effective guidance",
      "Expectant parents wanting to prepare a Montessori home nursery",
      "Teachers wanting to guide parents during school conferences",
    ],
    keyHighlights: [
      "Transforming the home into an autonomous, child-friendly prepared environment",
      "Gentle discipline: Moving away from yelling, bribes, and threats",
      "Healthy boundaries around screens, mobile phones, and digital devices",
      "Nurturing emotional intelligence, empathy, and resilience in young children",
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: The Prepared Home Environment",
        topics: [
          "Low beds, accessible shelving, and toddler wardrobe stations",
          "Involving children in daily home life: Meal prep, sorting, folding",
          "Selecting open-ended, non-battery natural toys",
        ],
      },
      {
        moduleTitle: "Module 2: Communicating So Children Will Listen",
        topics: [
          "Active listening and reflective empathy",
          "Replacing 'No' and 'Don't' with clear actionable directions",
          "Managing sibling jealousy and sharing disputes peacefully",
        ],
      },
      {
        moduleTitle: "Module 3: Screen Moderation & Emotional Resilience",
        topics: [
          "Managing screen withdrawal and building alternative engagement routines",
          "Teaching emotional regulation during bedtime and morning routines",
          "Instilling lifelong values of gratitude, kindness, and perseverance",
        ],
      },
    ],
    careerOpportunities: [
      "Certified Parent Educator & Coach",
      "Preschool Parent Relations Liaison",
      "Family Guidance Consultant",
    ],
    faqs: [
      {
        question: "Is this course useful for teachers as well as parents?",
        answer: "Yes! When teachers understand modern parenting struggles, they communicate far more effectively with parents and build a unified, supportive partnership for the child.",
      },
    ],
    image: "/images/courses/parenting-skills.webp",
    imageAlt: "Indian parents engaging warmly with their young child in supportive developmental learning at home",
  },
};

