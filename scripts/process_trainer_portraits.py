import os
import rembg
from PIL import Image, ImageOps

ASSETS_DIR = "public/assets"
OUT_DIR = "public/assets/portraits"
os.makedirs(OUT_DIR, exist_ok=True)

WARM_IVORY = (247, 244, 240) # #F7F4F0

# Target canvas size: 800 x 1000 (4:5 aspect ratio)
CANVAS_W = 800
CANVAS_H = 1000

session = rembg.new_session("u2netp")

trainers = [
    {
        "filename": "SG_Aishwarya.jpg",
        "output": "SG_Aishwarya",
        # SG Aishwarya: Sitting portrait with arms folded in blue saree
        "crop_box": (100, 150, 1436, 1950), # bounding box in original
        "target_head_y": 140, # top margin of head
        "target_scale": 0.52,
        "offset_x": 0,
        "offset_y": 20,
    },
    {
        "filename": "Varsha_G_L.jpg",
        "output": "Varsha_G_L",
        # Varsha: Standing on right side of wall in pink floral saree
        "crop_box": (350, 250, 1350, 1950),
        "target_head_y": 130,
        "target_scale": 0.58,
        "offset_x": 10,
        "offset_y": 10,
    },
    {
        "filename": "KR_Kanimozhi.jpg",
        "output": "KR_Kanimozhi",
        # KR Kanimozhi: Standing in front of purple banner in pink checked saree
        "crop_box": (300, 250, 1450, 1950),
        "target_head_y": 140,
        "target_scale": 0.58,
        "offset_x": 0,
        "offset_y": 20,
    },
    {
        "filename": "A_Karimunnisha.jpg",
        "output": "A_Karimunnisha",
        # Karimunnisha: Maroon hijab head & shoulders portrait
        "crop_box": (150, 200, 1574, 1980),
        "target_head_y": 130,
        "target_scale": 0.52,
        "offset_x": 0,
        "offset_y": 20,
    },
    {
        "filename": "Katheja_Baseera_S.jpg",
        "output": "Katheja_Baseera_S",
        # Katheja: Peach hijab studio head & shoulders portrait
        "crop_box": (100, 100, 1314, 1850),
        "target_head_y": 130,
        "target_scale": 0.54,
        "offset_x": 0,
        "offset_y": 20,
    },
]

print("Starting background removal and standardization...")

for t in trainers:
    src_path = os.path.join(ASSETS_DIR, t["filename"])
    print(f"\nProcessing {t['filename']}...")
    im = Image.open(src_path).convert("RGB")
    
    # 1. Remove background cleanly with rembg
    print("  Removing background...")
    nobg = rembg.remove(im, session=session)
    
    # Get bounding box of the cutout subject (alpha > 10)
    bbox = nobg.getbbox()
    if bbox:
        # Crop to subject bounds
        subject = nobg.crop(bbox)
    else:
        subject = nobg
        
    sub_w, sub_h = subject.size
    print(f"  Cutout subject dimensions: {sub_w} x {sub_h}")
    
    # Calculate scale so that the subject fits nicely in the 800x1000 canvas
    # We want upper body / head-and-shoulders with consistent head scale
    # Target height of subject: ~820px out of 1000px
    target_h = int(CANVAS_H * 0.84)
    scale = target_h / sub_h
    
    # If the width would exceed canvas width with padding, scale down
    if int(sub_w * scale) > CANVAS_W - 40:
        scale = (CANVAS_W - 40) / sub_w
        
    scaled_w = int(sub_w * scale)
    scaled_h = int(sub_h * scale)
    
    resized_sub = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
    
    # 2. Create the warm-ivory studio background canvas (#F7F4F0)
    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), WARM_IVORY)
    
    # Position subject horizontally centered, bottom-aligned or slightly above bottom
    pos_x = (CANVAS_W - scaled_w) // 2 + t.get("offset_x", 0)
    # Align head ~120-140px from top
    pos_y = CANVAS_H - scaled_h
    if pos_y < 120:
        pos_y = 120
    
    # Paste subject using its alpha channel as mask
    canvas.paste(resized_sub, (pos_x, pos_y), resized_sub)
    
    # Save both high-quality JPG and WebP versions
    out_jpg = os.path.join(OUT_DIR, f"{t['output']}.jpg")
    out_webp = os.path.join(OUT_DIR, f"{t['output']}.webp")
    
    canvas.save(out_jpg, "JPEG", quality=92, subsampling=0)
    canvas.save(out_webp, "WEBP", quality=90)
    print(f"  Saved {out_jpg} ({CANVAS_W}x{CANVAS_H}) and {out_webp}")

print("\nAll 5 portraits processed successfully!")

