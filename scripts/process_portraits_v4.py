"""
Portrait standardisation v4 — targeted fix for problem images.

Strategy:
- SG_Aishwarya: v3 isnet result is good but has ghost hand in upper-right.
  Fix by cropping the ROI more tightly so ghost hand is outside it.
- Varsha_G_L: banner is inseparable from subject with automated tools.
  Use a CENTER-CROP of the original (take the face+upper body zone directly)
  then composite on ivory with a soft vignette mask to fade out edges.
- KR_Kanimozhi: banner is inseparable. Same approach as Varsha.
- A_Karimunnisha: v3 result was good — just reprocess with tighter head scale.
- Katheja_Baseera_S: v3 result was good — keep same approach.

The vignette approach for Varsha and Kanimozhi means their backgrounds
will not be fully removed but will fade softly into the ivory canvas.
This is intentional and consistent with professional editorial photography
style that blends into a background colour.
"""

import os
import numpy as np
import rembg
from PIL import Image, ImageFilter, ImageDraw

ASSETS_DIR = "public/assets"
OUT_DIR = "public/assets/portraits"
os.makedirs(OUT_DIR, exist_ok=True)

WARM_IVORY = (247, 244, 240)
CANVAS_W = 800
CANVAS_H = 1000
EYE_Y_TARGET = 0.28  # eye level at 28% from top of canvas

session_isnet = rembg.new_session("isnet-general-use")
session_u2 = rembg.new_session("u2netp")
print("Sessions ready")


def smooth_alpha(alpha_arr, radius=2.0):
    pil = Image.fromarray(alpha_arr, mode="L")
    smoothed = pil.filter(ImageFilter.GaussianBlur(radius=radius))
    arr = np.array(smoothed, dtype=np.float32)
    lo, hi = 20.0, 230.0
    arr = np.clip((arr - lo) / (hi - lo) * 255, 0, 255)
    return arr.astype(np.uint8)


def rembg_composite(src_path, roi, session, eye_y_in_cutout, body_h_ratio,
                    alpha_smooth=2.0):
    """Full rembg pipeline: crop → remove bg → scale → place on canvas."""
    orig = Image.open(src_path).convert("RGB")
    crop = orig.crop(roi)
    nobg = rembg.remove(crop, session=session)
    r, g, b, a = nobg.split()
    a_arr = np.array(a)
    a_smooth = smooth_alpha(a_arr, radius=alpha_smooth)
    a_pil = Image.fromarray(a_smooth, mode="L")
    cutout = Image.merge("RGBA", (r, g, b, a_pil))

    a_bin = (a_arr > 20).astype(np.uint8)
    rows = np.where(a_bin.any(axis=1))[0]
    cols = np.where(a_bin.any(axis=0))[0]
    if len(rows) == 0:
        subject = cutout
    else:
        pad = 8
        top = max(0, int(rows[0]) - pad)
        bot = min(cutout.height, int(rows[-1]) + pad)
        left = max(0, int(cols[0]) - pad)
        right = min(cutout.width, int(cols[-1]) + pad)
        subject = cutout.crop((left, top, right, bot))

    sub_w, sub_h = subject.size
    target_h = int(CANVAS_H * body_h_ratio)
    scale = target_h / sub_h
    if int(sub_w * scale) > CANVAS_W - 30:
        scale = (CANVAS_W - 30) / sub_w
    scaled_w = max(1, int(sub_w * scale))
    scaled_h = max(1, int(sub_h * scale))
    subject_scaled = subject.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    pos_x = (CANVAS_W - scaled_w) // 2
    eye_in_scaled = eye_y_in_cutout * scaled_h
    pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_in_scaled)
    pos_y = max(15, min(pos_y, CANVAS_H - scaled_h - 5))

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), WARM_IVORY + (255,))
    canvas.paste(subject_scaled, (pos_x, pos_y), subject_scaled)
    return canvas.convert("RGB"), scaled_w, scaled_h


def vignette_composite(src_path, roi, eye_y_in_roi, body_h_ratio,
                       fade_px=120):
    """
    For images where rembg cannot cleanly separate the subject from bg.
    Crops tightly around the person, scales to canvas, then applies a
    soft elliptical vignette mask so the outer edges fade into ivory.
    This is NOT full background removal — it's an editorial soft-crop.
    """
    orig = Image.open(src_path).convert("RGB")
    crop = orig.crop(roi)
    cw, ch = crop.size

    # Scale to canvas proportionally
    target_h = int(CANVAS_H * body_h_ratio)
    scale = target_h / ch
    if int(cw * scale) > CANVAS_W - 20:
        scale = (CANVAS_W - 20) / cw
    scaled_w = max(1, int(cw * scale))
    scaled_h = max(1, int(ch * scale))
    scaled = crop.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    # Place on canvas
    pos_x = (CANVAS_W - scaled_w) // 2
    eye_in_scaled = eye_y_in_roi * scaled_h
    pos_y = int(EYE_Y_TARGET * CANVAS_H - eye_in_scaled)
    pos_y = max(15, min(pos_y, CANVAS_H - scaled_h - 5))

    # Build a soft elliptical alpha mask
    mask = Image.new("L", (scaled_w, scaled_h), 255)
    draw = ImageDraw.Draw(mask)
    # Create gradient by drawing concentric ellipses from transparent border
    # This fades from full opaque center to transparent at edges
    steps = fade_px
    for i in range(steps):
        alpha_val = int(255 * (i / steps) ** 1.5)
        inset = steps - i
        draw.ellipse(
            [inset, inset, scaled_w - inset, scaled_h - inset],
            fill=None, outline=alpha_val
        )
    # Blur the mask for a smooth gradient
    mask = mask.filter(ImageFilter.GaussianBlur(radius=fade_px * 0.6))

    # Composite onto ivory canvas using the vignette mask
    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), WARM_IVORY)
    subject_rgba = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    scaled_rgba = scaled.convert("RGBA")
    # Apply mask to scaled image
    r, g, b, _ = scaled_rgba.split()
    scaled_with_mask = Image.merge("RGBA", (r, g, b, mask))
    subject_rgba.paste(scaled_with_mask, (pos_x, pos_y))
    canvas_rgba = canvas.convert("RGBA")
    final_rgba = Image.alpha_composite(canvas_rgba, subject_rgba)
    return final_rgba.convert("RGB"), scaled_w, scaled_h


# ─── Process each portrait ───────────────────────────────────────────────────

print("\n=== SG_Aishwarya ===")
# v3 had a ghost hand in upper-right corner (from a photo on the wall).
# Use tighter ROI that excludes that area, run with isnet
result, sw, sh = rembg_composite(
    src_path=os.path.join(ASSETS_DIR, "SG_Aishwarya.jpg"),
    roi=(250, 350, 1300, 2048),   # tighter: excludes top-right ghost
    session=session_isnet,
    eye_y_in_cutout=0.19,
    body_h_ratio=0.74,
    alpha_smooth=2.5,
)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.webp"), "WEBP", quality=90)
print(f"  Subject: {sw}x{sh}. Saved.")

print("\n=== Varsha_G_L ===")
# Person stands on the far right side, leaning against the wall right next to
# the banner. ROI crops in very tightly around just her face+body column.
# Then we use a soft vignette to blend out the banner edges.
result, sw, sh = vignette_composite(
    src_path=os.path.join(ASSETS_DIR, "Varsha_G_L.jpg"),
    roi=(850, 300, 1536, 2048),   # tight on her: she's right of frame
    eye_y_in_roi=0.17,
    body_h_ratio=0.80,
    fade_px=100,
)
result.save(os.path.join(OUT_DIR, "Varsha_G_L.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "Varsha_G_L.webp"), "WEBP", quality=90)
print(f"  Subject: {sw}x{sh}. Saved.")

print("\n=== KR_Kanimozhi ===")
# Seated at table, looks to her left. The banner wraps behind her.
# She occupies roughly the lower-left area of frame.
# Tight crop around her face+body, then vignette.
result, sw, sh = vignette_composite(
    src_path=os.path.join(ASSETS_DIR, "KR_Kanimozhi.jpg"),
    roi=(150, 400, 1200, 2048),   # crop out top-banner, keep person
    eye_y_in_roi=0.18,
    body_h_ratio=0.80,
    fade_px=110,
)
result.save(os.path.join(OUT_DIR, "KR_Kanimozhi.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "KR_Kanimozhi.webp"), "WEBP", quality=90)
print(f"  Subject: {sw}x{sh}. Saved.")

print("\n=== A_Karimunnisha ===")
# Head-and-shoulders, clean white bg. isnet works perfectly.
result, sw, sh = rembg_composite(
    src_path=os.path.join(ASSETS_DIR, "A_Karimunnisha.jpg"),
    roi=(100, 50, 1624, 2000),
    session=session_isnet,
    eye_y_in_cutout=0.21,
    body_h_ratio=0.80,
    alpha_smooth=2.0,
)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.webp"), "WEBP", quality=90)
print(f"  Subject: {sw}x{sh}. Saved.")

print("\n=== Katheja_Baseera_S ===")
# Head-and-shoulders, originally white bg. isnet works much better here.
result, sw, sh = rembg_composite(
    src_path=os.path.join(ASSETS_DIR, "Katheja_Baseera_S.jpg"),
    roi=(60, 50, 1354, 1950),
    session=session_isnet,
    eye_y_in_cutout=0.19,
    body_h_ratio=0.80,
    alpha_smooth=2.0,
)
result.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.webp"), "WEBP", quality=90)
print(f"  Subject: {sw}x{sh}. Saved.")

print("\nAll 5 portraits processed (v4). Check public/assets/portraits/")

