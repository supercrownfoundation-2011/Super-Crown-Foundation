"""
Portrait standardisation v5 — final targeted fixes.

Per-image analysis:
- SG_Aishwarya: v4 result is good (small right-shoulder bleed is fine). KEEP.
- Varsha_G_L: Standing against banner+wall junction. Take only the wall side
  (right portion) and fade LEFT edge only where banner is visible.
- KR_Kanimozhi: Good seated composition. Need narrower left crop to cut banner
  then do LEFT-SIDE gradient fade only.
- A_Karimunnisha: v4 is perfect. KEEP.
- Katheja_Baseera_S: isnet still has hard rectangular bottom edge.
  Use aggressive alpha erosion to remove hard edges from near-white bg.
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
print("Session ready")


def smooth_alpha(alpha_arr, radius=2.0, lo=20, hi=230):
    pil = Image.fromarray(alpha_arr, mode="L")
    smoothed = pil.filter(ImageFilter.GaussianBlur(radius=radius))
    arr = np.array(smoothed, dtype=np.float32)
    arr = np.clip((arr - lo) / (hi - lo) * 255, 0, 255)
    return arr.astype(np.uint8)


def place_on_canvas(subject_rgba, eye_y_in_cutout, body_h_ratio):
    """Scale and place an RGBA subject image on the warm-ivory canvas."""
    sub_w, sub_h = subject_rgba.size
    target_h = int(CANVAS_H * body_h_ratio)
    scale = target_h / sub_h
    if int(sub_w * scale) > CANVAS_W - 20:
        scale = (CANVAS_W - 20) / sub_w
    scaled_w = max(1, int(sub_w * scale))
    scaled_h = max(1, int(sub_h * scale))
    scaled = subject_rgba.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    pos_x = (CANVAS_W - scaled_w) // 2
    eye_px = eye_y_in_cutout * scaled_h
    pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_px)
    pos_y = max(15, min(pos_y, CANVAS_H - scaled_h - 5))

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    canvas.paste(scaled, (pos_x, pos_y), scaled)
    return canvas.convert("RGB"), scaled_w, scaled_h


def rembg_full(src, roi, eye_y, body_h, alpha_r=2.0, alpha_lo=20, alpha_hi=230):
    orig = Image.open(src).convert("RGB")
    crop = orig.crop(roi)
    nobg = rembg.remove(crop, session=session)
    r, g, b, a = nobg.split()
    a_arr = np.array(a)
    a_smooth = smooth_alpha(a_arr, alpha_r, alpha_lo, alpha_hi)
    a_pil = Image.fromarray(a_smooth, "L")
    cutout = Image.merge("RGBA", (r, g, b, a_pil))

    a_bin = (a_arr > 20)
    rows = np.where(a_bin.any(axis=1))[0]
    cols = np.where(a_bin.any(axis=0))[0]
    if len(rows) > 0:
        pad = 8
        subject = cutout.crop((
            max(0, int(cols[0]) - pad),
            max(0, int(rows[0]) - pad),
            min(cutout.width, int(cols[-1]) + pad),
            min(cutout.height, int(rows[-1]) + pad),
        ))
    else:
        subject = cutout
    return place_on_canvas(subject, eye_y, body_h)


def horizontal_fade_composite(src, roi, eye_y, body_h, fade_left=0, fade_right=0, fade_top=0):
    """
    Crop ROI, then apply directional linear alpha fades
    (fade_left pixels from left edge, etc.) to blend into ivory canvas.
    """
    orig = Image.open(src).convert("RGB")
    crop = orig.crop(roi)
    cw, ch = crop.size

    # Build an alpha mask (all opaque, then fade the requested edges)
    mask_arr = np.full((ch, cw), 255, dtype=np.float32)

    if fade_left > 0:
        for x in range(min(fade_left, cw)):
            mask_arr[:, x] = np.minimum(mask_arr[:, x], (x / fade_left) * 255)

    if fade_right > 0:
        for x in range(min(fade_right, cw)):
            xi = cw - 1 - x
            mask_arr[:, xi] = np.minimum(mask_arr[:, xi], (x / fade_right) * 255)

    if fade_top > 0:
        for y in range(min(fade_top, ch)):
            mask_arr[y, :] = np.minimum(mask_arr[y, :], (y / fade_top) * 255)

    # Smooth the mask
    mask_pil = Image.fromarray(mask_arr.astype(np.uint8), "L")
    mask_pil = mask_pil.filter(ImageFilter.GaussianBlur(radius=max(fade_left, fade_right, fade_top) * 0.4))

    crop_rgba = crop.convert("RGBA")
    r, g, b, _ = crop_rgba.split()
    subject = Image.merge("RGBA", (r, g, b, mask_pil))
    return place_on_canvas(subject, eye_y, body_h)


# ─────────────────────────────────────────────────────────────────
# SG_Aishwarya — v4 isnet result is clean; just reprocess with
# slightly more bottom crop to cut the arms/wrist junk at bottom
# ─────────────────────────────────────────────────────────────────
print("\n=== SG_Aishwarya ===")
result, sw, sh = rembg_full(
    src=os.path.join(ASSETS_DIR, "SG_Aishwarya.jpg"),
    roi=(250, 350, 1300, 1980),
    eye_y=0.19,
    body_h=0.74,
    alpha_r=2.5,
)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ─────────────────────────────────────────────────────────────────
# Varsha_G_L — Stands RIGHT next to wall (right half = beige wall,
# left half = banner). Take the ROI where only she and the wall are
# and fade the LEFT edge where banner is still visible.
# ─────────────────────────────────────────────────────────────────
print("\n=== Varsha_G_L ===")
result, sw, sh = horizontal_fade_composite(
    src=os.path.join(ASSETS_DIR, "Varsha_G_L.jpg"),
    roi=(820, 280, 1536, 2048),  # right side: wall+person; banner is on left
    eye_y=0.16,
    body_h=0.82,
    fade_left=160,   # fade left edge where banner bleeds in
    fade_right=0,
    fade_top=80,
)
result.save(os.path.join(OUT_DIR, "Varsha_G_L.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "Varsha_G_L.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ─────────────────────────────────────────────────────────────────
# KR_Kanimozhi — Seated at table, looks LEFT, banner fills upper
# 50% of frame. Tight crop of LOWER portion (table+person) fading
# the top edge where banner is.
# ─────────────────────────────────────────────────────────────────
print("\n=== KR_Kanimozhi ===")
result, sw, sh = horizontal_fade_composite(
    src=os.path.join(ASSETS_DIR, "KR_Kanimozhi.jpg"),
    roi=(150, 500, 1536, 2048),   # crop below banner, person in center-right
    eye_y=0.12,
    body_h=0.84,
    fade_left=80,
    fade_right=0,
    fade_top=90,     # fade top edge where banner still visible
)
result.save(os.path.join(OUT_DIR, "KR_Kanimozhi.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "KR_Kanimozhi.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ─────────────────────────────────────────────────────────────────
# A_Karimunnisha — Perfect in v4, identical re-run
# ─────────────────────────────────────────────────────────────────
print("\n=== A_Karimunnisha ===")
result, sw, sh = rembg_full(
    src=os.path.join(ASSETS_DIR, "A_Karimunnisha.jpg"),
    roi=(100, 50, 1624, 2000),
    eye_y=0.21,
    body_h=0.80,
    alpha_r=2.0,
)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ─────────────────────────────────────────────────────────────────
# Katheja_Baseera_S — Original had nearly-white bg, hijab edges
# are blocky with isnet. Use tighter alpha stretch (lo=50, hi=200)
# to push the mask cleaner on near-white backgrounds.
# Also increase alpha_r to blur blocky edges more aggressively.
# ─────────────────────────────────────────────────────────────────
print("\n=== Katheja_Baseera_S ===")
result, sw, sh = rembg_full(
    src=os.path.join(ASSETS_DIR, "Katheja_Baseera_S.jpg"),
    roi=(60, 50, 1354, 1950),
    eye_y=0.19,
    body_h=0.80,
    alpha_r=3.5,     # more blur on edges
    alpha_lo=50,
    alpha_hi=200,
)
result.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

print("\nAll 5 portraits processed (v5).")

