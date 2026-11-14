import os
from PIL import Image, ImageFilter
import numpy as np

TARGET_W = 800
TARGET_H = 1000

# 1. Load the modern purple studio background
bg_template = Image.open("public/assets/modern_purple_studio_bg.png").convert("RGBA")
if bg_template.size != (TARGET_W, TARGET_H):
    bg_template = bg_template.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

os.makedirs("public/assets/portraits", exist_ok=True)
os.makedirs("public/assets/portraits_comparison", exist_ok=True)

# -------------------------------------------------------------
# TRAINER 1: SG. Aishwarya
# Composite onto modern_purple_studio_bg
# -------------------------------------------------------------
aish_raw = Image.open("public/assets/test_cutouts/SG_Aishwarya.png").convert("RGBA")
arr_a = np.array(aish_raw)
# Clean top-right collage remnant (x > 900, y < 720)
arr_a[:720, 900:, 3] = 0
aish_cleaned = Image.fromarray(arr_a)

# Scale: eye_x=725, eye_y=820, target eye at (400, 320)
scale_a = 0.60
w_a = int(aish_cleaned.width * scale_a)
h_a = int(aish_cleaned.height * scale_a)
aish_scaled = aish_cleaned.resize((w_a, h_a), Image.Resampling.LANCZOS)

dest_x_a = 400 - int(725 * scale_a)
dest_y_a = 320 - int(820 * scale_a)

canvas_a = bg_template.copy()
canvas_a.paste(aish_scaled, (dest_x_a, dest_y_a), aish_scaled)
aish_final = canvas_a.convert("RGB")

# -------------------------------------------------------------
# TRAINER 2: Varsha. G L (From uploaded photo)
# media_1794245511617_d32e097d.jpg (size: 935x1024)
# Eye: x=505, y=335.
# Crop to 800x1000 centered on x=505, y=335
# -------------------------------------------------------------
varsha_raw = Image.open(r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_d32e097d.jpg").convert("RGB")
# Scale slightly so eye lands at 320
scale_v = 1000.0 / 1024.0
w_v = int(varsha_raw.width * scale_v) # ~913
h_v = int(varsha_raw.height * scale_v) # 1000
varsha_scaled = varsha_raw.resize((w_v, h_v), Image.Resampling.LANCZOS)
# Eye is now at x = 505 * scale_v = 493. We want it at 400.
crop_left_v = 493 - 400
crop_right_v = crop_left_v + TARGET_W
if crop_right_v > w_v:
    crop_left_v = w_v - TARGET_W
    crop_right_v = w_v
varsha_final = varsha_scaled.crop((crop_left_v, 0, crop_right_v, TARGET_H))

# -------------------------------------------------------------
# TRAINER 3: K.R. Kanimozhi (From uploaded photo)
# media_1794245511617_3f5d140a.jpg (size: 796x1024)
# Eye: x=470, y=320.
# -------------------------------------------------------------
kan_raw = Image.open(r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_3f5d140a.jpg").convert("RGB")
scale_k = 1000.0 / 1024.0
w_k = int(kan_raw.width * scale_k) # ~777
h_k = 1000
kan_scaled = kan_raw.resize((w_k, h_k), Image.Resampling.LANCZOS)
# Pad width to 800 using bg_template
canvas_k = bg_template.copy()
paste_x_k = (TARGET_W - w_k) // 2
canvas_k.paste(kan_scaled, (paste_x_k, 0))
kan_final = canvas_k.convert("RGB")

# -------------------------------------------------------------
# TRAINER 4: A. Karimunnisha (From uploaded photo)
# media_1794245511617_116aa64f.jpg (size: 862x1024)
# Eye: x=485, y=285.
# -------------------------------------------------------------
kari_raw = Image.open(r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_116aa64f.jpg").convert("RGB")
scale_kar = 1000.0 / 1024.0
w_kar = int(kari_raw.width * scale_kar) # ~841
h_kar = 1000
kari_scaled = kari_raw.resize((w_kar, h_kar), Image.Resampling.LANCZOS)
# Eye is at x = 485 * scale_kar = 473.
crop_left_kar = 473 - 400
if crop_left_kar < 0: crop_left_kar = 0
if crop_left_kar + TARGET_W > w_kar: crop_left_kar = w_kar - TARGET_W
kari_final = kari_scaled.crop((crop_left_kar, 0, crop_left_kar + TARGET_W, TARGET_H))

# -------------------------------------------------------------
# TRAINER 5: Katheja Baseera S
# Composite onto modern_purple_studio_bg
# -------------------------------------------------------------
kath_raw = Image.open("public/assets/test_cutouts/Katheja_Baseera_S.png").convert("RGBA")
arr_kt = np.array(kath_raw)
# Clear any shadow below y > 1720
arr_kt[1720:, :, 3] = 0
# Soft fade bottom 80px so it dissolves naturally
for y in range(1640, 1720):
    factor = max(0.0, 1.0 - (y - 1640) / 80.0)
    arr_kt[y, :, 3] = (arr_kt[y, :, 3].astype(float) * factor).astype(np.uint8)
kath_cleaned = Image.fromarray(arr_kt)

scale_kt = 0.52
w_kt = int(kath_cleaned.width * scale_kt)
h_kt = int(kath_cleaned.height * scale_kt)
kath_scaled = kath_cleaned.resize((w_kt, h_kt), Image.Resampling.LANCZOS)

dest_x_kt = 400 - int(715 * scale_kt)
dest_y_kt = 325 - int(700 * scale_kt)

canvas_kt = bg_template.copy()
canvas_kt.paste(kath_scaled, (dest_x_kt, dest_y_kt), kath_scaled)
kath_final = canvas_kt.convert("RGB")

# -------------------------------------------------------------
# Save all 5 portraits in public/assets/portraits/
# -------------------------------------------------------------
trainers = [
    ("SG_Aishwarya", aish_final),
    ("Varsha_G_L", varsha_final),
    ("KR_Kanimozhi", kan_final),
    ("A_Karimunnisha", kari_final),
    ("Katheja_Baseera_S", kath_final),
]

for name, img in trainers:
    jpg_path = f"public/assets/portraits/{name}.jpg"
    webp_path = f"public/assets/portraits/{name}.webp"
    img.save(jpg_path, "JPEG", quality=95, subsampling=0)
    img.save(webp_path, "WEBP", quality=92)
    print(f"Saved {jpg_path} and {webp_path}")

# Side-by-side comparison
comp_w = TARGET_W * 5 // 2
comp_h = TARGET_H // 2
comp_img = Image.new("RGB", (TARGET_W * 5, TARGET_H), (40, 10, 60))
for i, (_, p) in enumerate(trainers):
    comp_img.paste(p, (i * TARGET_W, 0))

comp_thumb = comp_img.resize((comp_w, comp_h), Image.Resampling.LANCZOS)
comp_thumb.save("public/assets/portraits_comparison/all_five_purple_gradient.jpg", "JPEG", quality=92)
print("Saved comparison to public/assets/portraits_comparison/all_five_purple_gradient.jpg")

