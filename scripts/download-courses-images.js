const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const COURSES_IMAGE_DIR = path.join(__dirname, '../public/images/courses');
fs.mkdirSync(COURSES_IMAGE_DIR, { recursive: true });

const COURSE_IMAGES = [
  {
    id: "english-phonics",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    alt: "Teacher helping young child with English phonics and reading"
  },
  {
    id: "vedic-maths",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    alt: "Student working on mathematical equations and mental math"
  },
  {
    id: "handwriting",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
    alt: "Close up of student handwriting practice with pencil and notebook"
  },
  {
    id: "child-psychology",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    alt: "Educator having supportive one-on-one interaction with a child"
  },
  {
    id: "classroom-management",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
    alt: "Organized Montessori classroom environment with engaged students"
  },
  {
    id: "storytelling",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    alt: "Teacher reading an engaging picture storybook to eager children"
  },
  {
    id: "personality-development",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    alt: "Young students developing confident communication and teamwork skills"
  },
  {
    id: "parenting-skills",
    url: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&auto=format&fit=crop&q=80",
    alt: "Parent guiding child through gentle developmental learning at home"
  },
  {
    id: "teaching-aids",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    alt: "Colorful Montessori sensory apparatus and hands-on teaching aids"
  },
  {
    id: "learning-disability",
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80",
    alt: "Dedicated teacher offering individualized supportive guidance to a student"
  }
];

async function downloadAndOptimize() {
  console.log("Downloading and optimizing course images...");
  for (const item of COURSE_IMAGES) {
    const dest = path.join(COURSES_IMAGE_DIR, `${item.id}.webp`);
    try {
      console.log(`Fetching ${item.id}...`);
      const resp = await fetch(item.url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const arrayBuffer = await resp.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await sharp(buffer)
        .resize(700, 440, { fit: "cover", position: "center" })
        .webp({ quality: 82 })
        .toFile(dest);

      console.log(` Saved ${item.id}.webp successfully.`);
    } catch (err) {
      console.error(` Error downloading ${item.id}:`, err.message);
    }
  }
  console.log("All course images processed!");
}

downloadAndOptimize();

