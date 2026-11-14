import os
from PIL import Image
import numpy as np

# Let's inspect the background of the uploaded photos
p1 = r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_116aa64f.jpg"
im = Image.open(p1)
w, h = im.size
print(f"Uploaded Karimunnisha: {w}x{h}")

# Check top 200 rows of Karimunnisha - how much is background?
# Hijab starts around x=300 to 550 at top, so left 250px and right 250px are pure background!
arr = np.array(im)
print("Left col 50 average RGB:", arr[:, 50, :].mean(axis=0))
print("Right col w-50 average RGB:", arr[:, w - 50, :].mean(axis=0))

