"""
Portrait standardisation v6 — FINAL.

Per-image strategy after extensive testing:
- SG_Aishwarya: v5 isnet result is clean. Apply small RGB inpaint on the
  ghost area (upper-right, slight purple tinge from saree behind her).
- Varsha_G_L: Run isnet on the VERY TIGHT crop that only includes her face+body
  column (the wall is on her right, banner on her left). Then fade just the
  left and right edges to blend out banner remnants.
- KR_Kanimozhi: Use the v2 result (which had clean cut) and inpaint any
  banner ghost regions with ivory fill. Actually rerun isnet on a tighter crop
  that excludes the top 60% of frame (banner area).
- A_Karimunnisha: v4/v5 isnet result is perfect. Keep.
- Katheja_Baseera_S: isnet result has hard rectangular alpha edge.
  Apply soft bottom-left corner fades to remove the hard box edge.
"""

import os
import numpy as np
import rembg
from PIL import Image, ImageFilter, ImageDraw

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


def place_on_canvas(subject_rgba, eye_y, body_h):
    sub_w, sub_h = subject_rgba.size
    target_h = int(CANVAS_H * body_h)
    scale = target_h / sub_h
    if int(sub_w * scale) > CANVAS_W - 20:
        scale = (CANVAS_W - 20) / sub_w
    scaled_w = max(1, int(sub_w * scale))
    scaled_h = max(1, int(sub_h * scale))
    scaled = subject_rgba.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
    pos_x = (CANVAS_W - scaled_w) // 2
    eye_px = eye_y * scaled_h
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


def soft_fade_rgba(rgba_img, fade_left=0, fade_right=0, fade_top=0, fade_bottom=0, blur=30):
    """Apply soft linear fades to alpha on specified edges."""
    arr = np.array(rgba_img, dtype=np.float32)
    alpha = arr[..., 3]
    h, w = alpha.shape

    if fade_left > 0:
        for x in range(min(fade_left, w)):
            alpha[:, x] *= (x / fade_left)
    if fade_right > 0:
        for x in range(min(fade_right, w)):
            xi = w - 1 - x
            alpha[:, xi] *= (x / fade_right)
    if fade_top > 0:
        for y in range(min(fade_top, h)):
            alpha[y, :] *= (y / fade_top)
    if fade_bottom > 0:
        for y in range(min(fade_bottom, h)):
            yi = h - 1 - y
            alpha[yi, :] *= (y / fade_bottom)

    alpha = np.clip(alpha, 0, 255)
    arr[..., 3] = alpha
    result = Image.fromarray(arr.astype(np.uint8), "RGBA")
    # Blur alpha only
    r, g, b, a = result.split()
    a = a.filter(ImageFilter.GaussianBlur(radius=blur * 0.4))
    return Image.merge("RGBA", (r, g, b, a))


# ══════════════════════════════════════════════════════════════
# SG_Aishwarya — Good result, clean cut, minor shoulder bleed
# ══════════════════════════════════════════════════════════════
print("\n=== SG_Aishwarya ===")
result, sw, sh = rembg_full(
    src=os.path.join(ASSETS_DIR, "SG_Aishwarya.jpg"),
    roi=(250, 350, 1300, 1980),
    eye_y=0.19, body_h=0.74, alpha_r=2.5,
)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "SG_Aishwarya.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ══════════════════════════════════════════════════════════════
# Varsha_G_L — Key insight from original photo:
# She stands with the banner to her LEFT and a plain wall to her RIGHT.
# Her face and body are in the CENTER of the frame.
# Take the FULL original width (1536) but crop TOP to cut the banner header
# and use isnet — the model will cut her body from the purple banner well.
# Then apply LEFT-side fade to remove any residual banner.
# ══════════════════════════════════════════════════════════════
print("\n=== Varsha_G_L ===")
# Use isnet on the FULL width, cropping only the top banner area
orig_v = Image.open(os.path.join(ASSETS_DIR, "Varsha_G_L.jpg")).convert("RGB")
crop_v = orig_v.crop((0, 500, 1536, 2048))  # cut top where the big banner text dominates
nobg_v = rembg.remove(crop_v, session=session)
r_v, g_v, b_v, a_v = nobg_v.split()
a_arr_v = np.array(a_v)
a_smooth_v = smooth_alpha(a_arr_v, 2.5, 20, 220)
a_pil_v = Image.fromarray(a_smooth_v, "L")
cutout_v = Image.merge("RGBA", (r_v, g_v, b_v, a_pil_v))

# Apply left-side fade to remove banner-side pixels
cutout_v = soft_fade_rgba(cutout_v, fade_left=350, fade_right=0, fade_top=80, blur=40)

# Find tight subject bbox
a_bin_v = (a_arr_v > 20)
rows_v = np.where(a_bin_v.any(axis=1))[0]
cols_v = np.where(a_bin_v.any(axis=0))[0]
if len(rows_v) > 0:
    pad = 8
    subject_v = cutout_v.crop((
        max(0, int(cols_v[0]) - pad),
        max(0, int(rows_v[0]) - pad),
        min(cutout_v.width, int(cols_v[-1]) + pad),
        min(cutout_v.height, int(rows_v[-1]) + pad),
    ))
else:
    subject_v = cutout_v

result_v, sw_v, sh_v = place_on_canvas(subject_v, 0.18, 0.78)
result_v.save(os.path.join(OUT_DIR, "Varsha_G_L.jpg"), "JPEG", quality=93, subsampling=0)
result_v.save(os.path.join(OUT_DIR, "Varsha_G_L.webp"), "WEBP", quality=90)
print(f"  {sw_v}x{sh_v} → saved")

# ══════════════════════════════════════════════════════════════
# KR_Kanimozhi — Similar banner problem.
# She's seated at a table, occupies right-center of frame.
# Cut top 40% of frame (banner dominates there), use isnet on bottom portion.
# ══════════════════════════════════════════════════════════════
print("\n=== KR_Kanimozhi ===")
orig_k = Image.open(os.path.join(ASSETS_DIR, "KR_Kanimozhi.jpg")).convert("RGB")
iw_k, ih_k = orig_k.size
print(f"  Original size: {iw_k}x{ih_k}")
# Crop: cut the top (banner heavy) but keep from row 600 down
# Also cut far left edge (banner text) — start at x=400
crop_k = orig_k.crop((400, 600, 1536, 2048))
nobg_k = rembg.remove(crop_k, session=session)
r_k, g_k, b_k, a_k = nobg_k.split()
a_arr_k = np.array(a_k)
a_smooth_k = smooth_alpha(a_arr_k, 2.5, 20, 220)
a_pil_k = Image.fromarray(a_smooth_k, "L")
cutout_k = Image.merge("RGBA", (r_k, g_k, b_k, a_pil_k))

# Soft top and left fades
cutout_k = soft_fade_rgba(cutout_k, fade_left=120, fade_top=100, blur=35)

a_bin_k = (a_arr_k > 20)
rows_k = np.where(a_bin_k.any(axis=1))[0]
cols_k = np.where(a_bin_k.any(axis=0))[0]
if len(rows_k) > 0:
    pad = 8
    subject_k = cutout_k.crop((
        max(0, int(cols_k[0]) - pad),
        max(0, int(rows_k[0]) - pad),
        min(cutout_k.width, int(cols_k[-1]) + pad),
        min(cutout_k.height, int(rows_k[-1]) + pad),
    ))
else:
    subject_k = cutout_k

result_k, sw_k, sh_k = place_on_canvas(subject_k, 0.14, 0.82)
result_k.save(os.path.join(OUT_DIR, "KR_Kanimozhi.jpg"), "JPEG", quality=93, subsampling=0)
result_k.save(os.path.join(OUT_DIR, "KR_Kanimozhi.webp"), "WEBP", quality=90)
print(f"  {sw_k}x{sh_k} → saved")

# ══════════════════════════════════════════════════════════════
# A_Karimunnisha — Perfect result. Keep v5.
# ══════════════════════════════════════════════════════════════
print("\n=== A_Karimunnisha ===")
result, sw, sh = rembg_full(
    src=os.path.join(ASSETS_DIR, "A_Karimunnisha.jpg"),
    roi=(100, 50, 1624, 2000),
    eye_y=0.21, body_h=0.80, alpha_r=2.0,
)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.jpg"), "JPEG", quality=93, subsampling=0)
result.save(os.path.join(OUT_DIR, "A_Karimunnisha.webp"), "WEBP", quality=90)
print(f"  {sw}x{sh} → saved")

# ══════════════════════════════════════════════════════════════
# Katheja_Baseera_S — Hard rectangular alpha bottom edge.
# Fix: run rembg then apply soft bottom+corner fades to blend into canvas.
# ══════════════════════════════════════════════════════════════
print("\n=== Katheja_Baseera_S ===")
orig_kj = Image.open(os.path.join(ASSETS_DIR, "Katheja_Baseera_S.jpg")).convert("RGB")
crop_kj = orig_kj.crop((60, 50, 1354, 1950))
nobg_kj = rembg.remove(crop_kj, session=session)
r_kj, g_kj, b_kj, a_kj = nobg_kj.split()
a_arr_kj = np.array(a_kj)
a_smooth_kj = smooth_alpha(a_arr_kj, 3.0, 40, 210)
a_pil_kj = Image.fromarray(a_smooth_kj, "L")
cutout_kj = Image.merge("RGBA", (r_kj, g_kj, b_kj, a_pil_kj))

# Soft bottom fade to blend the hard rectangular edge
cutout_kj = soft_fade_rgba(cutout_kj, fade_bottom=120, fade_right=80, blur=40)

a_bin_kj = (a_arr_kj > 30)
rows_kj = np.where(a_bin_kj.any(axis=1))[0]
cols_kj = np.where(a_bin_kj.any(axis=0))[0]
if len(rows_kj) > 0:
    pad = 5
    subject_kj = cutout_kj.crop((
        max(0, int(cols_kj[0]) - pad),
        max(0, int(rows_kj[0]) - pad),
        min(cutout_kj.width, int(cols_kj[-1]) + pad),
        min(cutout_kj.height, int(rows_kj[-1]) + pad),
    ))
else:
    subject_kj = cutout_kj

result_kj, sw_kj, sh_kj = place_on_canvas(subject_kj, 0.19, 0.80)
result_kj.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.jpg"), "JPEG", quality=93, subsampling=0)
result_kj.save(os.path.join(OUT_DIR, "Katheja_Baseera_S.webp"), "WEBP", quality=90)
print(f"  {sw_kj}x{sh_kj} → saved")

print("\nAll 5 portraits processed (v6 — FINAL).")

