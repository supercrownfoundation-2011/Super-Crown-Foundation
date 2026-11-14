from PIL import Image, ImageFilter
import numpy as np

img_pil = Image.open("public/assets/bg_only_kanimozhi.png").convert("RGB")
img = np.array(img_pil, dtype=np.float32)

# Mask of silhouette
mask = (img[:, :, 0] < 5) & (img[:, :, 1] < 5) & (img[:, :, 2] < 5)
# Dilate mask by 20px using maximum filter to completely remove any edge fringing
mask_pil = Image.fromarray((mask * 255).astype(np.uint8), mode="L")
dilated_mask = np.array(mask_pil.filter(ImageFilter.MaxFilter(25))) > 0

h, w, c = img.shape
y_coords, x_coords = np.where(~dilated_mask)

# Exclude gold highlights from fit
is_gold = (img[y_coords, x_coords, 0] > 100) & (img[y_coords, x_coords, 1] > 50)
fit_y = y_coords[~is_gold]
fit_x = x_coords[~is_gold]

# Fit 2nd-order surface
A = np.column_stack([
    fit_x**2, fit_y**2, fit_x*fit_y, fit_x, fit_y, np.ones_like(fit_x)
])

# Create a clean canvas of 800 x 1000 (target size!)
TARGET_W, TARGET_H = 800, 1000
all_y, all_x = np.indices((TARGET_H, TARGET_W))

# Scale coordinates to fit polynomial
scale_x = w / TARGET_W
scale_y = h / TARGET_H
eval_x = all_x * scale_x
eval_y = all_y * scale_y

A_eval = np.column_stack([
    eval_x.ravel()**2, eval_y.ravel()**2, (eval_x*eval_y).ravel(), eval_x.ravel(), eval_y.ravel(), np.ones_like(eval_x.ravel())
])

clean_gradient = np.zeros((TARGET_H, TARGET_W, 3), dtype=np.float32)
for i in range(3):
    vals = img[fit_y, fit_x, i]
    coeff, _, _, _ = np.linalg.lstsq(A, vals, rcond=None)
    clean_gradient[:, :, i] = (A_eval @ coeff).reshape((TARGET_H, TARGET_W))

clean_gradient = np.clip(clean_gradient, 0, 255).astype(np.uint8)

# Now, let's extract the golden arcs from Karimunnisha and Kanimozhi photos:
# In Karimunnisha (media_1794245511617_116aa64f.jpg) and Kanimozhi, the arcs are in:
# 1) Top-left arc: x in [0, 350], y in [0, 250]
# 2) Mid-right arc: x in [w-250, w], y in [450, 750]
# Let's extract the gold arcs by subtracting the local background or using color threshold
# Let's see how clean_gradient alone looks first!
Image.fromarray(clean_gradient).save("public/assets/clean_purple_gradient_800x1000.png")
print("Saved clean_purple_gradient_800x1000.png")

