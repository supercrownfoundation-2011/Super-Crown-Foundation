import os
from PIL import Image, ImageFilter
import numpy as np

TARGET_W = 800
TARGET_H = 1000

bg_template = Image.open("public/assets/modern_purple_studio_bg.png").convert("RGBA")
if bg_template.size != (TARGET_W, TARGET_H):
    bg_template = bg_template.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

kath_raw = Image.open("public/assets/test_cutouts/Katheja_Baseera_S.png").convert("RGBA")
arr_kt = np.array(kath_raw)

# Look at original height: Katheja ends at y = 1720
# Let's scale Katheja up to 0.56 so her bottom lands closer to the canvas bottom (1000px)
scale_kt = 0.56
# Scaled eye: 700 * 0.56 = 392.
# We want eye at y = 320.
# So dest_y = 320 - 392 = -72.
# Her bottom (y=1720) in scaled image is at: -72 + (1720 * 0.56) = -72 + 963 = 891.
# To make her bottom fade smoothly into the dark purple from y=750 to 900:
# In the original image before scaling, fade from y=1350 to 1700 (350 pixels of ultra-smooth fade!):
y_start = 1350
y_end = 1715
for y in range(y_start, y_end):
    # smooth cosine fade
    t = (y - y_start) / float(y_end - y_start)
    factor = 0.5 * (1.0 + np.cos(np.pi * t))
    arr_kt[y, :, 3] = (arr_kt[y, :, 3].astype(float) * factor).astype(np.uint8)
arr_kt[y_end:, :, 3] = 0

# Also feather the left edge of her hijab where it hit original border (x < 120)
for x in range(0, 120):
    factor = max(0.0, (x - 60) / 60.0) if x > 60 else 0.0
    arr_kt[:, x, 3] = (arr_kt[:, x, 3].astype(float) * factor).astype(np.uint8)

kath_cleaned = Image.fromarray(arr_kt)

w_kt = int(kath_cleaned.width * scale_kt)
h_kt = int(kath_cleaned.height * scale_kt)
kath_scaled = kath_cleaned.resize((w_kt, h_kt), Image.Resampling.LANCZOS)

dest_x_kt = 400 - int(715 * scale_kt)
dest_y_kt = 320 - int(700 * scale_kt)

canvas_kt = bg_template.copy()
canvas_kt.paste(kath_scaled, (dest_x_kt, dest_y_kt), kath_scaled)
kath_final = canvas_kt.convert("RGB")

kath_final.save("public/assets/portraits/Katheja_Baseera_S.jpg", "JPEG", quality=95, subsampling=0)
kath_final.save("public/assets/portraits/Katheja_Baseera_S.webp", "WEBP", quality=92)
print("Updated Katheja_Baseera_S with silky smooth bottom dissolve!")

