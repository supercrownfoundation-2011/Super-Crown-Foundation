from PIL import Image
import os

uploaded_dir = r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded"
files = [
    "media_1794245511617_d32e097d.jpg",
    "media_1794245511617_116aa64f.jpg",
    "media_1794245511617_3f5d140a.jpg"
]

for f in files:
    path = os.path.join(uploaded_dir, f)
    im = Image.open(path)
    print(f"{f}: size={im.size}, mode={im.mode}")

