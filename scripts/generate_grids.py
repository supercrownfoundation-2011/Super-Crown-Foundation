from PIL import Image, ImageDraw
import numpy as np

cutouts = [
    ("SG_Aishwarya", "public/assets/test_cutouts/SG_Aishwarya.png"),
    ("Varsha_G_L", "public/assets/test_cutouts/Varsha_G_L.png"),
    ("KR_Kanimozhi", "public/assets/test_cutouts/KR_Kanimozhi.png"),
    ("A_Karimunnisha", "public/assets/test_cutouts/A_Karimunnisha.png"),
    ("Katheja_Baseera_S", "public/assets/test_cutouts/Katheja_Baseera_S.png")
]

# Let's inspect where eyes and head are by saving a version with 100px grid lines
for name, path in cutouts:
    img = Image.open(path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size
    for x in range(0, w, 100):
        draw.line([(x, 0), (x, h)], fill=(255, 0, 0, 100), width=2)
        if x % 200 == 0:
            draw.text((x + 5, 20), str(x), fill=(255, 0, 0, 255))
    for y in range(0, h, 100):
        draw.line([(0, y), (w, y)], fill=(0, 255, 0, 100), width=2)
        if y % 200 == 0:
            draw.text((20, y + 5), str(y), fill=(0, 255, 0, 255))
    # Save a half-size thumbnail for quick inspection
    thumb = img.resize((w // 2, h // 2))
    thumb.save(f"public/assets/test_cutouts/{name}_grid.png")

print("Grids generated!")

