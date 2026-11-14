from PIL import Image
import numpy as np

# Let's inspect the background gradient in the uploaded photos
paths = [
    ("Varsha", r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_d32e097d.jpg"),
    ("Karimunnisha", r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_116aa64f.jpg"),
    ("Kanimozhi", r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_3f5d140a.jpg")
]

for name, p in paths:
    im = Image.open(p)
    arr = np.array(im)
    print(f"\n{name} ({im.size}):")
    # Sample top-left corner (0,0), top-right corner (0, w-1), top-center (0, w//2)
    print("  Top-left [y=10, x=10]:", arr[10, 10])
    print("  Top-center [y=10, x=w//2]:", arr[10, im.width // 2])
    print("  Top-right [y=10, x=w-10]:", arr[10, im.width - 10])
    print("  Mid-left [y=h//2, x=10]:", arr[im.height // 2, 10])
    print("  Mid-right [y=h//2, x=w-10]:", arr[im.height // 2, im.width - 10])

