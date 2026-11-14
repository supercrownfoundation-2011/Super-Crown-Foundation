from PIL import Image, ImageDraw, ImageFont
import os

thumb_dir = r"public\assets\stock_replacement_thumbs"
files = sorted([f for f in os.listdir(thumb_dir) if f.endswith("_thumb.jpg")])

# 4 columns, 4 rows
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
print("Contact sheet created: public/assets/stock_replacements_contact_sheet.jpg")

