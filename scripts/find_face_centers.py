from PIL import Image
import numpy as np

# Let's inspect the facial region for each person to determine:
# 1. eye_x, eye_y (center point between the eyes)
# 2. head_top_y (top of hair or hijab)
# 3. chin_y (bottom of chin)
# This lets us achieve 100% mathematical precision in aligning eye levels, headroom, and head scale!

# Let's measure visually or by sampling from each cutout:
# SG_Aishwarya:
# Eyes are clearly visible. Let's find pixel coordinates.
# Varsha_G_L:
# KR_Kanimozhi:
# A_Karimunnisha:
# Katheja_Baseera_S:

im_aish = Image.open("public/assets/test_cutouts/SG_Aishwarya.png")
# Let's crop a 400x400 around expected eye area
# In 1536x2048, head is roughly x: 500-1000, y: 500-1100
print("SG Aishwarya size:", im_aish.size)

