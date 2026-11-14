from PIL import Image
import numpy as np

# Let's inspect the cutouts in public/assets/test_cutouts/
# For each cutout, let's find the bounding box and exact eye coordinates.
cutouts = [
    "SG_Aishwarya.png",
    "Varsha_G_L.png",
    "KR_Kanimozhi.png",
    "A_Karimunnisha.png",
    "Katheja_Baseera_S.png"
]

for name in cutouts:
    img = Image.open(f"public/assets/test_cutouts/{name}")
    arr = np.array(img)
    alpha = arr[..., 3]
    # non-zero alpha
    y_indices, x_indices = np.where(alpha > 30)
    print(f"\n{name}:")
    print(f"  Image size: {img.size}")
    print(f"  Alpha bbox: x=({x_indices.min()}, {x_indices.max()}), y=({y_indices.min()}, {y_indices.max()})")
    print(f"  Width: {x_indices.max() - x_indices.min()}, Height: {y_indices.max() - y_indices.min()}")

