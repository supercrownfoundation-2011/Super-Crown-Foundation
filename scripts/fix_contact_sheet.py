from PIL import Image, ImageDraw, ImageOps
import os

src_dir = r"public\assets\supercrown website stock image replacement"
thumb_dir = r"public\assets\stock_replacement_thumbs"

files = sorted(os.listdir(src_dir))

for f in files:
    full_path = os.path.join(src_dir, f)
    if os.path.isfile(full_path):
        im = Image.open(full_path)
        im = ImageOps.exif_transpose(im) # Correct EXIF rotation!
        thumb = im.copy()
        thumb.thumbnail((600, 600), Image.Resampling.LANCZOS)
        thumb_name = f.replace(".JPG.jpeg", "_thumb.jpg").replace(".jpeg", "_thumb.jpg")
        thumb.save(os.path.join(thumb_dir, thumb_name), "JPEG", quality=85)

# Rebuild contact sheet with correct orientations
files = sorted([f for f in os.listdir(thumb_dir) if f.endswith("_thumb.jpg")])
cols = 4
rows = 4
cell_w = 400
cell_h = 320
sheet = Image.new("RGB", (cols * cell_w, rows * cell_h + 40), (245, 243, 240))
draw = ImageDraw.Draw(sheet)

for idx, f in enumerate(files):
    r = idx // cols
    c = idx % cols
    img_path = os.path.join(thumb_dir, f)
    im = Image.open(img_path)
    im.thumbnail((cell_w - 20, cell_h - 40), Image.Resampling.LANCZOS)
    x = c * cell_w + (cell_w - im.width) // 2
    y = r * cell_h + 30 + (cell_h - 40 - im.height) // 2
    sheet.paste(im, (x, y))
    label = f.replace("_thumb.jpg", "")
    draw.text((c * cell_w + 10, r * cell_h + 10), label, fill=(60, 35, 80))

sheet.save(r"public\assets\stock_replacements_contact_sheet.jpg", "JPEG", quality=85)
print("Updated contact sheet with proper orientation!")

