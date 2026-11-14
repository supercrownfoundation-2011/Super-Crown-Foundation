import os
from PIL import Image
import numpy as np

# Canvas settings
CANVAS_W = 800
CANVAS_H = 1000
WARM_IVORY = (247, 244, 240) # #F7F4F0

# Target alignment points on the 800x1000 canvas:
TARGET_EYE_Y = 340 # Eye level ~34% from top (gives perfect headroom and torso proportion)
TARGET_EYE_X = 400 # Horizontally centered
TARGET_HEAD_H = 290 # Consistent head size across all five trainers!

trainers_config = [
    {
        "id": "SG_Aishwarya",
        "file": "public/assets/test_cutouts/SG_Aishwarya.png",
        "eye_x": 725,
        "eye_y": 820,
        "head_h": 505,
        "clean_fn": None,
    },
    {
        "id": "Varsha_G_L",
        "file": "public/assets/test_cutouts/Varsha_G_L.png",
        "eye_x": 850,
        "eye_y": 960,
        "head_h": 360,
        # Varsha has a faint smudge on the far left (x < 420)
        "clean_fn": lambda arr: clear_rect(arr, x_max=420),
    },
    {
        "id": "KR_Kanimozhi",
        "file": "public/assets/test_cutouts/KR_Kanimozhi.png",
        "eye_x": 920,
        "eye_y": 980,
        "head_h": 395,
        "clean_fn": None,
    },
    {
        "id": "A_Karimunnisha",
        "file": "public/assets/test_cutouts/A_Karimunnisha.png",
        "eye_x": 820,
        "eye_y": 560,
        "head_h": 940,
        # Karimunnisha has a tiny smudge at very bottom
        "clean_fn": lambda arr: clear_rect_y(arr, y_min=2030),
    },
    {
        "id": "Katheja_Baseera_S",
        "file": "public/assets/test_cutouts/Katheja_Baseera_S.png",
        "eye_x": 715,
        "eye_y": 700,
        "head_h": 745,
        # Katheja has a shadow below y > 1720
        "clean_fn": lambda arr: clear_rect_y(arr, y_min=1725),
    },
]

def clear_rect(arr, x_max):
    arr[:, :x_max, 3] = 0
    return arr

def clear_rect_y(arr, y_min):
    arr[y_min:, :, 3] = 0
    return arr

os.makedirs("public/assets/portraits", exist_ok=True)
os.makedirs("public/assets/portraits_comparison", exist_ok=True)

processed_images = []

for cfg in trainers_config:
    img = Image.open(cfg["file"]).convert("RGBA")
    arr = np.array(img)
    
    if cfg["clean_fn"]:
        arr = cfg["clean_fn"](arr)
        img = Image.fromarray(arr)
        
    # Scale so that head height matches TARGET_HEAD_H
    scale = TARGET_HEAD_H / cfg["head_h"]
    
    # Calculate new dimensions
    new_w = int(img.width * scale)
    new_h = int(img.height * scale)
    
    # Resize with high quality Lanczos resampling
    # To avoid any dark edge fringe during alpha resizing, resize RGBA directly:
    scaled_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Scaled eye coordinates
    scaled_eye_x = int(cfg["eye_x"] * scale)
    scaled_eye_y = int(cfg["eye_y"] * scale)
    
    # Destination position on canvas
    dest_x = TARGET_EYE_X - scaled_eye_x
    dest_y = TARGET_EYE_Y - scaled_eye_y
    
    # Create canvas
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    
    # Alpha composite
    # Paste using PIL paste with alpha mask
    canvas.paste(scaled_img, (dest_x, dest_y), scaled_img)
    
    # Convert to RGB
    final_rgb = canvas.convert("RGB")
    
    # Save jpg and webp
    out_jpg = f"public/assets/portraits/{cfg['id']}.jpg"
    out_webp = f"public/assets/portraits/{cfg['id']}.webp"
    final_rgb.save(out_jpg, "JPEG", quality=94, subsampling=0)
    final_rgb.save(out_webp, "WEBP", quality=92)
    print(f"Saved {out_jpg} (scale: {scale:.3f}, dest: {dest_x}, {dest_y})")
    
    processed_images.append(final_rgb)

# Generate a side-by-side comparison image of all 5 portraits!
comp_w = CANVAS_W * 5 // 2
comp_h = CANVAS_H // 2
comp_img = Image.new("RGB", (CANVAS_W * 5, CANVAS_H), WARM_IVORY)
for i, p in enumerate(processed_images):
    comp_img.paste(p, (i * CANVAS_W, 0))

# Save resized comparison
comp_thumb = comp_img.resize((comp_w, comp_h), Image.Resampling.LANCZOS)
comp_thumb.save("public/assets/portraits_comparison/all_five_side_by_side.jpg", "JPEG", quality=90)
print("Saved side-by-side comparison to public/assets/portraits_comparison/all_five_side_by_side.jpg")

