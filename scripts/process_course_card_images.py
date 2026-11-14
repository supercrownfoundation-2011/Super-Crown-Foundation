import os
from PIL import Image, ImageOps

source_map = {
    'english-phonics': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\english_phonics_1794567905727.jpg',
        'crop': 'center',
    },
    'vedic-maths': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\vedic_maths_classroom_1794567974900.jpg',
        'crop': 'center',
    },
    'handwriting': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\handwriting_instruction_close_up_v3_1794568042319.jpg',
        'crop': 'center',
    },
    'child-psychology': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\montessori_educator_child_observation_1794567986090.jpg',
        'crop': 'center',
    },
    'classroom-management': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\tamil_nadu_preschool_classroom_1794567995518.jpg',
        'crop': 'center',
    },
    'storytelling': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\storytelling_preschool_educator_1794568004156.jpg',
        'crop': 'center',
    },
    'personality-development': {
        'src': r'public\assets\supercrown website stock image replacement\IMG_7675.JPG.jpeg',
        'crop': 'custom_top_22',
    },
    'parenting-skills': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\indian_family_developmental_play_1794568011114.jpg',
        'crop': 'center',
    },
    'teaching-aids': {
        'src': r'public\assets\supercrown website stock image replacement\IMG_7668.JPG.jpeg',
        'crop': 'custom_top_28',
    },
    'learning-disability': {
        'src': r'C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\personalized_learning_guidance_1794568020674.jpg',
        'crop': 'center',
    },
}

target_w = 800
target_h = 500 # 16:10 aspect ratio matching aspect-[16/10]
out_dir = r'public\images\courses'
os.makedirs(out_dir, exist_ok=True)

for course_id, info in source_map.items():
    src_path = info['src']
    crop_mode = info['crop']
    
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im)
    w, h = im.size
    
    target_ratio = target_w / target_h # 1.6
    
    # Calculate crop
    current_ratio = w / h
    if crop_mode == 'custom_top_22':
        # for portrait IMG_7675
        crop_h = int(w / target_ratio)
        top = int(h * 0.22)
        bottom = min(h, top + crop_h)
        cropped = im.crop((0, top, w, bottom))
    elif crop_mode == 'custom_top_28':
        # for portrait IMG_7668
        crop_h = int(w / target_ratio)
        top = int(h * 0.28)
        bottom = min(h, top + crop_h)
        cropped = im.crop((0, top, w, bottom))
    else:
        # Standard center crop to target_ratio
        if current_ratio > target_ratio:
            # too wide, crop sides
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            cropped = im.crop((left, 0, left + new_w, h))
        else:
            # too tall, crop top and bottom
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            cropped = im.crop((0, top, w, top + new_h))
    
    # Resize with high quality Lanczos
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Save WebP
    webp_path = os.path.join(out_dir, f"{course_id}.webp")
    resized.save(webp_path, "WEBP", quality=85, method=6)
    
    # Save JPG fallback
    jpg_path = os.path.join(out_dir, f"{course_id}.jpg")
    resized.convert("RGB").save(jpg_path, "JPEG", quality=85, optimize=True)
    
    print(f"Processed {course_id}: {target_w}x{target_h} | WebP: {os.path.getsize(webp_path)//1024} KB, JPG: {os.path.getsize(jpg_path)//1024} KB")

print("\nAll 10 course card images processed successfully!")

