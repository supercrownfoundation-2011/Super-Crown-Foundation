import cv2
import numpy as np
from PIL import Image

# Read the image where subject is blacked out
img = cv2.imread("public/assets/bg_only_kanimozhi.png")
# Mask of where to inpaint (where pixels are black [0,0,0])
mask = (img[:, :, 0] == 0) & (img[:, :, 1] == 0) & (img[:, :, 2] == 0)
mask_uint8 = mask.astype(np.uint8) * 255

print(f"Mask size: {mask_uint8.shape}, inpaint area ratio: {mask_uint8.mean() / 255:.2f}")

# We can inpaint with Telea or Navier-Stokes or better yet:
# The background is a smooth radial/bilinear gradient.
# We can fit a smooth 2D gradient model (e.g. polynomial or radial RBF)
# to the known background pixels and perfectly fill the center,
# preserving the exact texture, color, and gold corner arcs!

h, w, c = img.shape
y_coords, x_coords = np.where(~mask) # known background pixels

# Let's fit a smooth 2D quadratic surface for each channel (R, G, B)
A = np.column_stack([
    x_coords**2, y_coords**2, x_coords*y_coords, x_coords, y_coords, np.ones_like(x_coords)
])

# Solve least squares for each channel
poly_bg = np.zeros((h, w, 3), dtype=np.float32)
all_y, all_x = np.indices((h, w))
A_all = np.column_stack([
    all_x.ravel()**2, all_y.ravel()**2, (all_x*all_y).ravel(), all_x.ravel(), all_y.ravel(), np.ones_like(all_x.ravel())
])

for i in range(3):
    vals = img[y_coords, x_coords, i].astype(np.float32)
    # Fit coefficients
    coeff, _, _, _ = np.linalg.lstsq(A, vals, rcond=None)
    pred = A_all @ coeff
    poly_bg[:, :, i] = pred.reshape((h, w))

poly_bg = np.clip(poly_bg, 0, 255).astype(np.uint8)

# Now composite: keep known background pixels (including the golden arcs!),
# and use poly_bg for the center, with a smooth blend at the boundary!
dist = cv2.distanceTransform(mask_uint8, cv2.DIST_L2, 5)
# Smooth transition over 15 pixels
blend_factor = np.clip(dist / 15.0, 0, 1.0)[:, :, np.newaxis]

final_bg = (poly_bg * blend_factor + img * (1 - blend_factor)).astype(np.uint8)

# Save the pristine background template!
cv2.imwrite("public/assets/modern_purple_bg_template.png", final_bg)
print("Saved public/assets/modern_purple_bg_template.png!")

