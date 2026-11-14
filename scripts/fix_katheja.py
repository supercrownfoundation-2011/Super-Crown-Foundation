"""
Final fix for Katheja_Baseera_S only.

The original image had a white/near-white background. isnet generates
alpha that includes the entire source image boundary as opaque (since the
white bg is transparent to the model at the edges). The result has hard
rectangular left/bottom edges.

Fix: After rembg, apply a VERY strong Gaussian blur to alpha (radius=15)
then use a high lo/hi contrast stretch to push the edges to transparent
while keeping the face center fully opaque. This gives a natural soft
falloff at all edges rather than a hard box.
"""

import os
import numpy as np
import rembg
from PIL import Image, ImageFilter

ASSETS_DIR = "public/assets"
OUT_DIR = "public/assets/portraits"
WARM_IVORY = (247, 244, 240)
CANVAS_W = 800
CANVAS_H = 1000
EYE_Y_TARGET = 0.28

session = rembg.new_session("isnet-general-use")

orig = Image.open(os.path.join(ASSETS_DIR, "Katheja_Baseera_S.jpg")).convert("RGB")
crop = orig.crop((60, 50, 1354, 1950))
nobg = rembg.remove(crop, session=session)

r, g, b, a = nobg.split()
a_arr = np.array(a, dtype=np.float32)

# Step 1: Heavy Gaussian blur to push hard edges into smooth gradients
a_pil_blur = Image.fromarray(a_arr.astype(np.uint8), "L")
a_pil_blur = a_pil_blur.filter(ImageFilter.GaussianBlur(radius=18))
a_arr_blurred = np.array(a_pil_blur, dtype=np.float32)

# Step 2: High-contrast stretch: pixels that were fully opaque stay opaque,
# pixels that were semi-transparent or at the border become transparent fast.
# lo=100 means anything that blurred below 100 goes to 0, hi=230 → 255.
lo, hi = 100.0, 230.0
a_stretched = np.clip((a_arr_blurred - lo) / (hi - lo) * 255, 0, 255)
a_pil_final = Image.fromarray(a_stretched.astype(np.uint8), "L")

cutout = Image.merge("RGBA", (r, g, b, a_pil_final))

# Find tight subject bbox
a_bin = (a_stretched > 10)
rows = np.where(a_bin.any(axis=1))[0]
cols = np.where(a_bin.any(axis=0))[0]
if len(rows) > 0:
    pad = 5
    subject = cutout.crop((
        max(0, int(cols[0]) - pad),
        max(0, int(rows[0]) - pad),
        min(cutout.width, int(cols[-1]) + pad),
        min(cutout.height, int(rows[-1]) + pad),
    ))
else:
    subject = cutout

sub_w, sub_h = subject.size
print(f"Subject: {sub_w}x{sub_h}")

# Scale to canvas
target_h = int(CANVAS_H * 0.80)
scale = target_h / sub_h
if int(sub_w * scale) > CANVAS_W - 20:
    scale = (CANVAS_W - 20) / sub_w
scaled_w = max(1, int(sub_w * scale))
scaled_h = max(1, int(sub_h * scale))
scaled = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

pos_x = (CANVAS_W - scaled_w) // 2
eye_y_in_cutout = 0.19
eye_px = eye_y_in_cutout * scaled_h
pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_px)
pos_y = max(15, min(pos_y, CANVAS_H - scaled_h - 5))

canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
canvas.paste(scaled, (pos_x, pos_y), scaled)
final = canvas.convert("RGB")

out_jpg = os.path.join(OUT_DIR, "Katheja_Baseera_S.jpg")
out_webp = os.path.join(OUT_DIR, "Katheja_Baseera_S.webp")
final.save(out_jpg, "JPEG", quality=93, subsampling=0)
final.save(out_webp, "WEBP", quality=90)
print(f"Saved: {out_jpg} and {out_webp}")

