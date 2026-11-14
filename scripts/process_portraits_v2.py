"""
Portrait standardisation v2 — improved per-image handling.

Strategy per image:
  1. Pre-crop a tight region-of-interest (ROI) around the person
     so rembg doesn't have to deal with busy banner backgrounds.
  2. Run rembg on the smaller, cleaner crop.
  3. Smooth the alpha mask edges with a Gaussian blur to remove jagged
     block artefacts (critical for hijabs and fine hair).
  4. Composite onto the warm-ivory (#F7F4F0) canvas.
  5. Place the subject so the eye-level lands consistently at ~27-30%
     from the top of the 800x1000 canvas.
  6. Scale so each subject fills the frame at a consistent apparent size.
"""

import os
import numpy as np
import rembg
from PIL import Image, ImageFilter

ASSETS_DIR = "public/assets"
OUT_DIR = "public/assets/portraits"
os.makedirs(OUT_DIR, exist_ok=True)

WARM_IVORY = (247, 244, 240)   # #F7F4F0
CANVAS_W = 800
CANVAS_H = 1000
# Target: eye line should sit at this fraction from the top of the canvas
EYE_Y_RATIO = 0.30

# Use u2netp (fast, low-RAM). It struggles with complex busy backgrounds,
# which is why we pre-crop each image tightly around the person first.
session = rembg.new_session("u2netp")

trainers = [
    {
        "filename": "SG_Aishwarya.jpg",
        "output": "SG_Aishwarya",
        # Original: 1536x2048, person centered, purple photo-collage wall bg
        # Pre-crop: strip the busy photo-wall completely, keep person tightly
        "roi": (200, 350, 1336, 2048),   # (left, top, right, bottom)
        # After rembg the cutout's eye region sits at about 15% from top of cutout
        "eye_y_in_cutout": 0.17,
        # Target apparent height of head+shoulders relative to canvas height
        "target_body_h_ratio": 0.78,
    },
    {
        "filename": "Varsha_G_L.jpg",
        "output": "Varsha_G_L",
        # Original: 1536x2048, person is on RIGHT side, SuperCrown banner on LEFT
        # Pre-crop: take only the right half where the person is
        "roi": (600, 300, 1536, 2048),
        "eye_y_in_cutout": 0.20,
        "target_body_h_ratio": 0.78,
    },
    {
        "filename": "KR_Kanimozhi.jpg",
        "output": "KR_Kanimozhi",
        # Original: 1536x2048, person is seated at table, purple banner behind
        # Pre-crop: take middle to bottom where the person sits (banner mostly top)
        "roi": (200, 350, 1536, 2048),
        "eye_y_in_cutout": 0.20,
        "target_body_h_ratio": 0.78,
    },
    {
        "filename": "A_Karimunnisha.jpg",
        "output": "A_Karimunnisha",
        # Original: 1724x2048, plain white bg, head-and-shoulders portrait
        # No pre-crop needed; person fills most of frame
        "roi": (80, 50, 1644, 2000),
        "eye_y_in_cutout": 0.22,
        "target_body_h_ratio": 0.82,
    },
    {
        "filename": "Katheja_Baseera_S.jpg",
        "output": "Katheja_Baseera_S",
        # Original: 1414x2000, plain white bg, head-and-shoulders portrait
        # Blocky edges in v1 because the original already had white bg close to ivory
        # Tighter ROI will help
        "roi": (50, 50, 1364, 1950),
        "eye_y_in_cutout": 0.20,
        "target_body_h_ratio": 0.82,
    },
]


def smooth_alpha(alpha_arr: np.ndarray, radius: int = 3) -> np.ndarray:
    """
    Smooth binary-ish alpha mask edges with a small Gaussian blur,
    then re-normalise. This eliminates blocky rembg artefacts.
    """
    pil = Image.fromarray(alpha_arr, mode="L")
    smoothed = pil.filter(ImageFilter.GaussianBlur(radius=radius))
    # Stretch contrast so the interior stays opaque
    arr = np.array(smoothed, dtype=np.float32)
    # Clip: anything above 180 → full opaque, below 20 → transparent
    arr = np.clip((arr - 20) / (180 - 20) * 255, 0, 255)
    return arr.astype(np.uint8)


print("Starting portrait processing v2...")

for t in trainers:
    src_path = os.path.join(ASSETS_DIR, t["filename"])
    print(f"\n--- Processing {t['filename']} ---")

    # 1. Open and pre-crop
    orig = Image.open(src_path).convert("RGBA")
    roi = t["roi"]
    crop = orig.crop(roi)
    print(f"  Pre-crop size: {crop.size}")

    # 2. Background removal on pre-cropped image
    print("  Running rembg...")
    nobg = rembg.remove(crop, session=session)   # RGBA

    # 3. Extract and smooth the alpha channel
    r, g, b, a = nobg.split()
    a_arr = np.array(a)
    a_smooth = smooth_alpha(a_arr, radius=4)
    a_pil = Image.fromarray(a_smooth, mode="L")

    # Recombine with smoothed alpha
    cutout = Image.merge("RGBA", (r, g, b, a_pil))

    # 4. Determine subject bounding box (pixels with alpha > 20)
    a_thresh = (a_arr > 20).astype(np.uint8)
    rows = np.where(a_thresh.any(axis=1))[0]
    cols = np.where(a_thresh.any(axis=0))[0]
    if len(rows) == 0 or len(cols) == 0:
        print("  WARNING: empty mask, using full crop")
        subject = cutout
    else:
        sub_top = int(rows[0])
        sub_bot = int(rows[-1])
        sub_left = int(cols[0])
        sub_right = int(cols[-1])
        # Add small padding around subject
        pad = 8
        sub_top = max(0, sub_top - pad)
        sub_bot = min(cutout.height, sub_bot + pad)
        sub_left = max(0, sub_left - pad)
        sub_right = min(cutout.width, sub_right + pad)
        subject = cutout.crop((sub_left, sub_top, sub_right, sub_bot))

    sub_w, sub_h = subject.size
    print(f"  Subject size after crop: {sub_w} x {sub_h}")

    # 5. Scale subject so it fills target_body_h_ratio of canvas height
    target_h = int(CANVAS_H * t["target_body_h_ratio"])
    scale = target_h / sub_h
    # Clamp width so it doesn't exceed canvas (with 20px side padding each)
    if int(sub_w * scale) > CANVAS_W - 40:
        scale = (CANVAS_W - 40) / sub_w
    scaled_w = max(1, int(sub_w * scale))
    scaled_h = max(1, int(sub_h * scale))
    subject_scaled = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    # 6. Position on canvas
    # Horizontally centered
    pos_x = (CANVAS_W - scaled_w) // 2

    # Vertically: the eye line inside the cutout is at eye_y_in_cutout * scaled_h.
    # We want that to map to EYE_Y_RATIO * CANVAS_H from top.
    eye_in_scaled = t["eye_y_in_cutout"] * scaled_h
    pos_y = int(EYE_Y_RATIO * CANVAS_H - eye_in_scaled)
    # Never let top of subject go below 20px or above canvas
    pos_y = max(20, pos_y)

    print(f"  Placing at ({pos_x}, {pos_y}), scaled size {scaled_w}x{scaled_h}")

    # 7. Create warm-ivory canvas and composite
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    canvas.paste(subject_scaled, (pos_x, pos_y), subject_scaled)

    # 8. Convert to RGB and save
    final = canvas.convert("RGB")
    out_jpg = os.path.join(OUT_DIR, f"{t['output']}.jpg")
    out_webp = os.path.join(OUT_DIR, f"{t['output']}.webp")
    final.save(out_jpg, "JPEG", quality=93, subsampling=0)
    final.save(out_webp, "WEBP", quality=90)
    print(f"  Saved → {out_jpg} and {out_webp}")

print("\nAll 5 portraits processed (v2). Check public/assets/portraits/")

