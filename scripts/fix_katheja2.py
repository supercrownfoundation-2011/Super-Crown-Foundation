"""
Final fix for Katheja_Baseera_S.

The original portrait had a plain white background. After rembg, the cutout
boundary is clean but slightly rectangular where the original scan boundary
meets the subject (left side, bottom). 

The correct approach here is NOT to process the alpha (which is accurate)
but to give her MORE canvas padding and let the ivory canvas extend naturally
around her — she is centered on the canvas, and the ivory canvas IS her background.
The issue is that the subject extends edge-to-edge of the canvas, making the
boundary visible. Fix: scale down slightly so she has natural canvas padding
on all sides, then the ivory background wraps around her naturally.
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

# Standard smooth alpha
a_pil_blur = Image.fromarray(a_arr.astype(np.uint8), "L")
a_pil_blur = a_pil_blur.filter(ImageFilter.GaussianBlur(radius=3))
a_arr_b = np.array(a_pil_blur, dtype=np.float32)
lo, hi = 30.0, 220.0
a_stretched = np.clip((a_arr_b - lo) / (hi - lo) * 255, 0, 255)
a_pil_final = Image.fromarray(a_stretched.astype(np.uint8), "L")
cutout = Image.merge("RGBA", (r, g, b, a_pil_final))

# Find tight subject bbox from blurred alpha (erode a bit more)
a_bin = (a_stretched > 50)   # higher threshold to trim near-white boundary
rows = np.where(a_bin.any(axis=1))[0]
cols = np.where(a_bin.any(axis=0))[0]

if len(rows) > 0:
    # Add generous padding to separate subject from canvas edge
    top = max(0, int(rows[0]))
    bot = min(cutout.height, int(rows[-1]))
    left = max(0, int(cols[0]))
    right = min(cutout.width, int(cols[-1]))
    subject = cutout.crop((left, top, right, bot))
else:
    subject = cutout

sub_w, sub_h = subject.size
print(f"Subject: {sub_w}x{sub_h}")

# Scale to 68% canvas height (instead of 80%) so she has more breathing room
target_h = int(CANVAS_H * 0.68)
scale = target_h / sub_h
if int(sub_w * scale) > CANVAS_W - 80:  # more horizontal padding too
    scale = (CANVAS_W - 80) / sub_w
scaled_w = max(1, int(sub_w * scale))
scaled_h = max(1, int(sub_h * scale))
scaled = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

pos_x = (CANVAS_W - scaled_w) // 2
eye_y_in_cutout = 0.19
eye_px = eye_y_in_cutout * scaled_h
pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_px)
pos_y = max(60, min(pos_y, CANVAS_H - scaled_h - 60))  # keep off edges

canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
canvas.paste(scaled, (pos_x, pos_y), scaled)
final = canvas.convert("RGB")

out_jpg = os.path.join(OUT_DIR, "Katheja_Baseera_S.jpg")
out_webp = os.path.join(OUT_DIR, "Katheja_Baseera_S.webp")
final.save(out_jpg, "JPEG", quality=93, subsampling=0)
final.save(out_webp, "WEBP", quality=90)
print(f"Saved: {scaled_w}x{scaled_h} at pos ({pos_x},{pos_y})")

