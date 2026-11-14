from PIL import Image, ImageFilter
import numpy as np

img_pil = Image.open("public/assets/bg_only_kanimozhi.png").convert("RGB")
img = np.array(img_pil, dtype=np.float32)

# Mask of where pixels are black [0, 0, 0]
mask = (img[:, :, 0] < 5) & (img[:, :, 1] < 5) & (img[:, :, 2] < 5)
h, w, c = img.shape

# Known background pixels
y_coords, x_coords = np.where(~mask)

# Exclude the bright gold arc pixels from the polynomial fit so they don't skew the gradient
# Gold arcs have high R and G (e.g. R > 120, G > 70)
is_gold = (img[y_coords, x_coords, 0] > 120) & (img[y_coords, x_coords, 1] > 60)
fit_y = y_coords[~is_gold]
fit_x = x_coords[~is_gold]

# Fit 2nd-degree polynomial 2D surface for smooth radial/elliptical gradient
A = np.column_stack([
    fit_x**2, fit_y**2, fit_x*fit_y, fit_x, fit_y, np.ones_like(fit_x)
])

all_y, all_x = np.indices((h, w))
A_all = np.column_stack([
    all_x.ravel()**2, all_y.ravel()**2, (all_x*all_y).ravel(), all_x.ravel(), all_y.ravel(), np.ones_like(all_x.ravel())
])

poly_bg = np.zeros((h, w, 3), dtype=np.float32)
for i in range(3):
    vals = img[fit_y, fit_x, i]
    coeff, _, _, _ = np.linalg.lstsq(A, vals, rcond=None)
    poly_bg[:, :, i] = (A_all @ coeff).reshape((h, w))

poly_bg = np.clip(poly_bg, 0, 255)

# Smooth blend between known background (which has the gold arcs and texture) and poly_bg in the center
# Blur the mask to create a soft transition
mask_img = Image.fromarray((mask * 255).astype(np.uint8), mode="L")
blurred_mask = mask_img.filter(ImageFilter.GaussianBlur(radius=12))
blend_weight = np.array(blurred_mask, dtype=np.float32)[:, :, np.newaxis] / 255.0

final_bg = (poly_bg * blend_weight + img * (1.0 - blend_weight)).astype(np.uint8)

out_pil = Image.fromarray(final_bg)
out_pil.save("public/assets/modern_purple_bg_template.png")
print("Saved modern_purple_bg_template.png with size:", out_pil.size)

