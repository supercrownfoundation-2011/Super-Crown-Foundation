import os
from PIL import Image, ImageFilter
import numpy as np

CANVAS_W = 800
CANVAS_H = 1000
WARM_IVORY = (247, 244, 240) # #F7F4F0

# Let's write the complete, refined script
def clean_aishwarya(arr):
    # Remove the small photo collage remnant on the top-right of her hair
    # In original coordinates: x > 850, y between 500 and 700
    # Let's inspect that area: it's background photos
    mask = (arr[..., 0] < 120) & (arr[..., 2] > 100) # purplish wall
    # Clear anything in x > 900, y < 700
    arr[:720, 920:, 3] = 0
    return arr

def clean_varsha(arr):
    # 1. Clear faint smudge on left at x < 420
    arr[:, :420, 3] = 0
    # 2. Feather the right edge (x > 1080) where the photo frame ended
    for x in range(1060, arr.shape[1]):
        factor = max(0.0, 1.0 - (x - 1060) / 49.0)
        arr[:, x, 3] = (arr[:, x, 3].astype(float) * factor).astype(np.uint8)
    return arr

def clean_kanimozhi(arr):
    # Kanimozhi is already very clean
    return arr

def clean_karimunnisha(arr):
    # Clear any bottom scanner speckle below y > 2020
    arr[2020:, :, 3] = 0
    # Soft fade the bottom 120px so chest dissolves smoothly into ivory
    y_start = 1880
    y_end = 2020
    for y in range(y_start, y_end):
        factor = max(0.0, 1.0 - (y - y_start) / float(y_end - y_start))
        arr[y, :, 3] = (arr[y, :, 3].astype(float) * factor).astype(np.uint8)
    return arr

def clean_katheja(arr):
    # Clear shadow below y > 1720
    arr[1720:, :, 3] = 0
    # Soft fade bottom 120px so chest dissolves smoothly into ivory
    y_start = 1600
    y_end = 1720
    for y in range(y_start, y_end):
        factor = max(0.0, 1.0 - (y - y_start) / float(y_end - y_start))
        arr[y, :, 3] = (arr[y, :, 3].astype(float) * factor).astype(np.uint8)
    # Also feather the left edge of the hijab where it hit the photo boundary (x < 110)
    for x in range(0, 110):
        factor = max(0.0, (x - 60) / 50.0) if x > 60 else 0.0
        arr[:, x, 3] = (arr[:, x, 3].astype(float) * factor).astype(np.uint8)
    return arr

configs = [
    {
        "id": "SG_Aishwarya",
        "file": "public/assets/test_cutouts/SG_Aishwarya.png",
        "eye_x": 725,
        "eye_y": 820,
        "scale": 0.53, # scale factor
        "target_eye_x": 400,
        "target_eye_y": 325, # eye level at 32.5%
        "clean_fn": clean_aishwarya,
    },
    {
        "id": "Varsha_G_L",
        "file": "public/assets/test_cutouts/Varsha_G_L.png",
        "eye_x": 830, # center of her face
        "eye_y": 960,
        "scale": 0.65, # gives nice headroom and upper body
        "target_eye_x": 400,
        "target_eye_y": 330,
        "clean_fn": clean_varsha,
    },
    {
        "id": "KR_Kanimozhi",
        "file": "public/assets/test_cutouts/KR_Kanimozhi.png",
        "eye_x": 900,
        "eye_y": 980,
        "scale": 0.64,
        "target_eye_x": 400,
        "target_eye_y": 330,
        "clean_fn": clean_kanimozhi,
    },
    {
        "id": "A_Karimunnisha",
        "file": "public/assets/test_cutouts/A_Karimunnisha.png",
        "eye_x": 820,
        "eye_y": 560,
        "scale": 0.40, # balanced head-and-shoulders scale
        "target_eye_x": 400,
        "target_eye_y": 330,
        "clean_fn": clean_karimunnisha,
    },
    {
        "id": "Katheja_Baseera_S",
        "file": "public/assets/test_cutouts/Katheja_Baseera_S.png",
        "eye_x": 715,
        "eye_y": 700,
        "scale": 0.46, # balanced head-and-shoulders scale
        "target_eye_x": 400,
        "target_eye_y": 335,
        "clean_fn": clean_katheja,
    },
]

processed_images = []

for cfg in configs:
    img = Image.open(cfg["file"]).convert("RGBA")
    arr = np.array(img)
    
    if cfg["clean_fn"]:
        arr = cfg["clean_fn"](arr)
        img = Image.fromarray(arr)
        
    scale = cfg["scale"]
    new_w = int(img.width * scale)
    new_h = int(img.height * scale)
    scaled_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    scaled_eye_x = int(cfg["eye_x"] * scale)
    scaled_eye_y = int(cfg["eye_y"] * scale)
    
    dest_x = cfg["target_eye_x"] - scaled_eye_x
    dest_y = cfg["target_eye_y"] - scaled_eye_y
    
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    canvas.paste(scaled_img, (dest_x, dest_y), scaled_img)
    
    final_rgb = canvas.convert("RGB")
    
    out_jpg = f"public/assets/portraits/{cfg['id']}.jpg"
    out_webp = f"public/assets/portraits/{cfg['id']}.webp"
    final_rgb.save(out_jpg, "JPEG", quality=95, subsampling=0)
    final_rgb.save(out_webp, "WEBP", quality=92)
    print(f"Generated {out_jpg}")
    processed_images.append(final_rgb)

# Save comparison
comp_w = CANVAS_W * 5 // 2
comp_h = CANVAS_H // 2
comp_img = Image.new("RGB", (CANVAS_W * 5, CANVAS_H), WARM_IVORY)
for i, p in enumerate(processed_images):
    comp_img.paste(p, (i * CANVAS_W, 0))

comp_thumb = comp_img.resize((comp_w, comp_h), Image.Resampling.LANCZOS)
comp_thumb.save("public/assets/portraits_comparison/all_five_refined.jpg", "JPEG", quality=92)
print("Saved comparison to public/assets/portraits_comparison/all_five_refined.jpg")

