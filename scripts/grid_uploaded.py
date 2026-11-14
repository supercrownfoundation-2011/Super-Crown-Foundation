from PIL import Image, ImageDraw

uploaded = {
    "Varsha": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_d32e097d.jpg",
    "Karimunnisha": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_116aa64f.jpg",
    "Kanimozhi": r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_3f5d140a.jpg"
}

for name, path in uploaded.items():
    im = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(im)
    w, h = im.size
    for x in range(0, w, 50):
        draw.line([(x, 0), (x, h)], fill=(255, 255, 255, 80), width=1)
        if x % 100 == 0:
            draw.text((x + 2, 10), str(x), fill=(255, 255, 255))
    for y in range(0, h, 50):
        draw.line([(0, y), (w, y)], fill=(255, 255, 255, 80), width=1)
        if y % 100 == 0:
            draw.text((10, y + 2), str(y), fill=(255, 255, 255))
    im.save(f"public/assets/test_cutouts/{name}_uploaded_grid.png")

print("Uploaded grids saved!")

