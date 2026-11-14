from PIL import Image, ImageFilter
import numpy as np

# Load clean purple gradient
base_bg = Image.open("public/assets/clean_purple_gradient_800x1000.png").convert("RGBA")
W, H = base_bg.size

# Load Kanimozhi bg with gold arcs
kan_bg = Image.open("public/assets/bg_only_kanimozhi.png").convert("RGB")
# Resize kan_bg to 800x1000
kan_bg_resized = kan_bg.resize((W, H), Image.Resampling.LANCZOS)
arr_kan = np.array(kan_bg_resized, dtype=np.float32)

# Load clean gradient as array
arr_base = np.array(base_bg, dtype=np.float32)[..., :3]

# The difference between arr_kan and arr_base in top-left and mid-right gives the gold lighting effect!
# Top-left region: y < 350, x < 400
# Mid-right region: y > 400, x > 500
gold_overlay = np.zeros((H, W, 4), dtype=np.float32)

# For top-left:
diff_tl = np.clip(arr_kan[:350, :400] - arr_base[:350, :400], 0, 255)
# Alpha is based on brightness of the diff
alpha_tl = np.max(diff_tl, axis=-1)
# Threshold and soft fade
alpha_tl = np.clip((alpha_tl - 15) * 1.5, 0, 255)
gold_overlay[:350, :400, :3] = arr_kan[:350, :400]
gold_overlay[:350, :400, 3] = alpha_tl

# For mid-right:
diff_mr = np.clip(arr_kan[400:, 500:] - arr_base[400:, 500:], 0, 255)
alpha_mr = np.max(diff_mr, axis=-1)
alpha_mr = np.clip((alpha_mr - 15) * 1.5, 0, 255)
gold_overlay[400:, 500:, :3] = arr_kan[400:, 500:]
gold_overlay[400:, 500:, 3] = alpha_mr

# Smooth the overlay alpha
gold_pil = Image.fromarray(gold_overlay.astype(np.uint8), mode="RGBA")
r, g, b, a = gold_pil.split()
a_blurred = a.filter(ImageFilter.GaussianBlur(radius=1.5))
gold_pil = Image.merge("RGBA", (r, g, b, a_blurred))

# Composite onto base_bg
final_template = Image.alpha_composite(base_bg, gold_pil)
final_template.save("public/assets/modern_purple_studio_bg.png")
print("Saved modern_purple_studio_bg.png!")

