import os
from PIL import Image

src_dir = r"public\assets\supercrown website stock image replacement"
thumb_dir = r"public\assets\stock_replacement_thumbs"
os.makedirs(thumb_dir, exist_ok=True)

files = sorted(os.listdir(src_dir))

for f in files:
    full_path = os.path.join(src_dir, f)
    if os.path.isfile(full_path):
        im = Image.open(full_path)
        w, h = im.size
        ratio = w / h
        print(f"{f}: {w}x{h} (aspect ratio: {ratio:.2f})")
        # Save a low-res thumbnail (max 600px width/height) for visual checking
        thumb = im.copy()
        thumb.thumbnail((600, 600), Image.Resampling.LANCZOS)
        thumb_name = f.replace(".JPG.jpeg", "_thumb.jpg").replace(".jpeg", "_thumb.jpg")
        thumb.save(os.path.join(thumb_dir, thumb_name), "JPEG", quality=80)

print(f"Thumbnails saved in {thumb_dir}")

