"""
Portrait standardisation v3 — using isnet-general-use (much better than u2netp)
with per-image strategy to handle purple banners and near-white backgrounds.

Each image gets:
1. A tight pre-crop to put the person near the frame edges
2. For banner images: a hue-saturation based background darkening pass
   to help the model distinguish subject from purple background
3. isnet-general-use for background removal (179MB, much better quality)
4. Gaussian alpha edge smoothing to remove blocky artefacts
5. Consistent placement: eye line at ~28% from top of 800x1000 canvas
"""

import os
import numpy as np
import rembg
from PIL import Image, ImageFilter
import colorsys

ASSETS_DIR = "public/assets"
OUT_DIR = "public/assets/portraits"
os.makedirs(OUT_DIR, exist_ok=True)

WARM_IVORY = (247, 244, 240)   # #F7F4F0
CANVAS_W = 800
CANVAS_H = 1000
EYE_Y_TARGET = 0.28  # eye level at 28% from top of canvas

session = rembg.new_session("isnet-general-use")
print("isnet-general-use session ready")

trainers = [
    {
        "filename": "SG_Aishwarya.jpg",
        "output": "SG_Aishwarya",
        # Seated, blue saree, purple photo-collage wall bg
        # ROI: trim off left photos, keep person in center+right
        "roi": (300, 300, 1400, 2048),
        # Eye level is about 20% into the cropped area
        "eye_y_in_cutout": 0.19,
        # We want head+torso framing: subject height ~72% of canvas
        "target_body_h_ratio": 0.75,
        "preprocess_purple": False,  # collage not solid purple, skip
    },
    {
        "filename": "Varsha_G_L.jpg",
        "output": "Varsha_G_L",
        # Standing, person is on the RIGHT side of frame, big purple banner on LEFT
        # ROI: take only the right portion where person is; she starts ~700px in
        "roi": (700, 200, 1536, 2048),
        "eye_y_in_cutout": 0.17,
        "target_body_h_ratio": 0.78,
        # Purple banner is solid saturated purple — darken it to help model
        "preprocess_purple": True,
    },
    {
        "filename": "KR_Kanimozhi.jpg",
        "output": "KR_Kanimozhi",
        # Seated at table, person is on RIGHT, large purple banner behind her
        # She's looking to her LEFT. Take a tighter crop to exclude banner
        "roi": (350, 300, 1536, 2048),
        "eye_y_in_cutout": 0.17,
        "target_body_h_ratio": 0.76,
        "preprocess_purple": True,
    },
    {
        "filename": "A_Karimunnisha.jpg",
        "output": "A_Karimunnisha",
        # Head-and-shoulders, plain white background — model works well
        "roi": (100, 50, 1624, 2000),
        "eye_y_in_cutout": 0.20,
        "target_body_h_ratio": 0.80,
        "preprocess_purple": False,
    },
    {
        "filename": "Katheja_Baseera_S.jpg",
        "output": "Katheja_Baseera_S",
        # Head-and-shoulders, originally white bg — the original was near-white
        # so v1 alpha was blocky. isnet should do much better.
        "roi": (60, 50, 1354, 1950),
        "eye_y_in_cutout": 0.19,
        "target_body_h_ratio": 0.80,
        "preprocess_purple": False,
    },
]


def kill_purple_bg(img_rgb: Image.Image) -> Image.Image:
    """
    For images with a highly saturated purple banner background,
    desaturate + darken the purple pixels while leaving skin tones
    and saree colours mostly untouched.
    This gives rembg a cleaner contrast between person and banner.
    """
    arr = np.array(img_rgb, dtype=np.float32) / 255.0
    # Convert to HSV
    h, s, v = arr[..., 0], arr[..., 1], arr[..., 2]
    # Purple hue range: roughly 0.65–0.80 in [0,1] (234°–288°)
    # Also catches blue-purple
    is_purple = (
        ((h >= 0.63) & (h <= 0.82)) &
        (s >= 0.35) &
        (v >= 0.15)
    )
    # Also catch gold/yellow text on banner: suppress it too so model
    # doesn't confuse gold letters with skin/saree
    is_gold = (
        ((h >= 0.10) & (h <= 0.20)) &
        (s >= 0.5) &
        (v >= 0.4)
    )
    mask = (is_purple | is_gold)[..., np.newaxis]
    # Darken those pixels toward mid-gray so they contrast with person
    target = np.array([0.4, 0.4, 0.4], dtype=np.float32)
    result = arr * (1 - mask * 0.75) + target * (mask * 0.75)
    result = np.clip(result * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(result)


def smooth_alpha(alpha_arr: np.ndarray, radius: float = 2.5) -> np.ndarray:
    """
    Smooth alpha mask edges with a Gaussian blur, then stretch contrast.
    isnet already produces cleaner masks but a little smoothing helps
    with fabric/hijab edges.
    """
    pil = Image.fromarray(alpha_arr, mode="L")
    smoothed = pil.filter(ImageFilter.GaussianBlur(radius=radius))
    arr = np.array(smoothed, dtype=np.float32)
    # Moderate stretch: keep interior fully opaque, fade edges cleanly
    lo, hi = 30.0, 220.0
    arr = np.clip((arr - lo) / (hi - lo) * 255, 0, 255)
    return arr.astype(np.uint8)


print("\nProcessing portraits...\n")

for t in trainers:
    src_path = os.path.join(ASSETS_DIR, t["filename"])
    print(f"=== {t['filename']} ===")

    orig = Image.open(src_path).convert("RGB")
    roi = t["roi"]
    crop = orig.crop(roi)
    print(f"  Pre-crop: {crop.size}")

    # Optional: suppress purple background to help model
    if t["preprocess_purple"]:
        print("  Killing purple banner pixels...")
        crop = kill_purple_bg(crop)

    # Background removal with isnet
    print("  Running isnet-general-use rembg...")
    nobg = rembg.remove(crop, session=session)   # RGBA

    # Smooth alpha
    r, g, b, a = nobg.split()
    a_arr = np.array(a)
    a_smooth = smooth_alpha(a_arr, radius=2.5)
    a_pil = Image.fromarray(a_smooth, mode="L")
    cutout = Image.merge("RGBA", (r, g, b, a_pil))

    # Find subject bounding box (alpha > 25)
    a_bin = (a_arr > 25).astype(np.uint8)
    rows = np.where(a_bin.any(axis=1))[0]
    cols = np.where(a_bin.any(axis=0))[0]
    if len(rows) == 0 or len(cols) == 0:
        print("  WARNING: empty mask; using full crop")
        subject = cutout
    else:
        pad = 10
        top = max(0, int(rows[0]) - pad)
        bot = min(cutout.height, int(rows[-1]) + pad)
        left = max(0, int(cols[0]) - pad)
        right = min(cutout.width, int(cols[-1]) + pad)
        subject = cutout.crop((left, top, right, bot))

    sub_w, sub_h = subject.size
    print(f"  Subject bbox: {sub_w} x {sub_h}")

    # Scale so subject height = target_body_h_ratio * canvas height
    target_h_px = int(CANVAS_H * t["target_body_h_ratio"])
    scale = target_h_px / sub_h
    if int(sub_w * scale) > CANVAS_W - 30:
        scale = (CANVAS_W - 30) / sub_w
    scaled_w = max(1, int(sub_w * scale))
    scaled_h = max(1, int(sub_h * scale))
    subject_scaled = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    # Place: horizontal center, vertical based on eye-level target
    pos_x = (CANVAS_W - scaled_w) // 2
    eye_in_scaled = t["eye_y_in_cutout"] * scaled_h
    pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_in_scaled)
    pos_y = max(15, min(pos_y, CANVAS_H - scaled_h - 5))

    print(f"  Scaled: {scaled_w}x{scaled_h}, pos: ({pos_x}, {pos_y})")

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    canvas.paste(subject_scaled, (pos_x, pos_y), subject_scaled)

    final = canvas.convert("RGB")
    out_jpg = os.path.join(OUT_DIR, f"{t['output']}.jpg")
    out_webp = os.path.join(OUT_DIR, f"{t['output']}.webp")
    final.save(out_jpg, "JPEG", quality=93, subsampling=0)
    final.save(out_webp, "WEBP", quality=90)
    print(f"  → Saved {out_jpg}\n")

print("All 5 portraits processed (v3 — isnet-general-use).")

