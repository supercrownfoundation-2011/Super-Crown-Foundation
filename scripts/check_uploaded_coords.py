from PIL import Image
import numpy as np

uploaded = {
    "Varsha": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_d32e097d.jpg",
    "Karimunnisha": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_116aa64f.jpg",
    "Kanimozhi": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_3f5d140a.jpg"
}

for name, path in uploaded.items():
    im = Image.open(path)
    print(f"{name}: size={im.size}")

