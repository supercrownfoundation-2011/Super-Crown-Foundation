import os
from PIL import Image, ImageOps

src_dir = r"public\assets\supercrown website stock image replacement"
out_dir = r"public\images\authentic"
os.makedirs(out_dir, exist_ok=True)

def process_image(src_filename, out_base_name, max_dim=1600, quality=85):
    src_path = os.path.join(src_dir, src_filename)
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return
    
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im)
    
    # Scale keeping aspect ratio
    w, h = im.size
    scale = min(max_dim / max(w, h), 1.0)
    if scale < 1.0:
        new_w = int(w * scale)
        new_h = int(h * scale)
        im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Save as WebP
    webp_path = os.path.join(out_dir, f"{out_base_name}.webp")
    im.save(webp_path, "WEBP", quality=quality, method=6)
    
    # Save as JPG fallback
    jpg_path = os.path.join(out_dir, f"{out_base_name}.jpg")
    im.convert("RGB").save(jpg_path, "JPEG", quality=quality, optimize=True)
    
    print(f"Generated {out_base_name}: {im.size[0]}x{im.size[1]} | WebP: {os.path.getsize(webp_path)//1024}KB, JPG: {os.path.getsize(jpg_path)//1024}KB")

# 1. Semantic assets mapped to specific site sections
semantic_mappings = [
    # Homepage Hero left card ("Authentic Apparatus Lab")
    ("IMG_7526.JPG.jpeg", "hero_authentic_lab", 1800),
    # Homepage Hero right card ("One-On-One Guidance - Observation & Material Mastery")
    ("IMG_7547.JPG.jpeg", "hero_authentic_guidance", 1600),
    # Homepage Why Super Crown Split & AboutHook ("16+ Years Legacy - 5,000+ Alumni" with official Super Crown purple banner)
    ("IMG_7672.JPG.jpeg", "supercrown_legacy_training", 1800),
    
    # About Us page Hero
    ("IMG_7657.JPG.jpeg", "about_hero_authentic", 1800),
    # About Us page Our Story section
    ("IMG_7674.JPG.jpeg", "about_story_authentic", 1800),
    # About Us page Next Step CTA
    ("IMG_7665.JPG.jpeg", "about_cta_authentic", 1600),
    
    # Blog: Article 1 ("The Power of Prepared Environments")
    ("IMG_7527.JPG.jpeg", "blog_prepared_environments", 1200),
    # Blog: Article 2 ("How Material Presentation Builds Mathematical Mind")
    ("IMG_7539.JPG.jpeg", "blog_math_materials", 1200),
    # Blog: Article 3 ("Understanding Sensitive Periods in Early Childhood Development")
    ("IMG_7668.JPG.jpeg", "blog_sensitive_periods", 1200),
    
    # Courses: Teaching Aids Preparation & Classroom Readiness
    ("IMG_7668.JPG.jpeg", "course_teaching_aids", 1000),
    
    # Campus Experience component (if reused)
    ("IMG_7526.JPG.jpeg", "campus_prepared_env", 1400),
    ("IMG_7545.JPG.jpeg", "campus_apparatus", 1200),
    ("IMG_7658.JPG.jpeg", "campus_collaborative", 1200),
    ("IMG_7675.JPG.jpeg", "campus_mentorship", 1200),
]

for src_name, target_name, max_dim in semantic_mappings:
    process_image(src_name, target_name, max_dim=max_dim)

# 2. Also process all 16 raw authentic assets as catalog webp items
for f in sorted(os.listdir(src_dir)):
    if f.lower().endswith(('.jpg', '.jpeg', '.png')):
        clean_name = f.lower().replace(".jpg.jpeg", "").replace(".jpeg", "").replace(".jpg", "")
        target_name = f"authentic_{clean_name}"
        process_image(f, target_name, max_dim=1600)

print("\nAll authentic assets prepared successfully in public/images/authentic/")

