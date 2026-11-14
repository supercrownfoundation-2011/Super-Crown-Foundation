import os
import rembg
from PIL import Image
import numpy as np

session = rembg.new_session("isnet-general-use")
os.makedirs("public/assets/test_cutouts", exist_ok=True)

files = [
    "SG_Aishwarya.jpg",
    "Varsha_G_L.jpg",
    "KR_Kanimozhi.jpg",
    "A_Karimunnisha.jpg",
    "Katheja_Baseera_S.jpg"
]

for f in files:
    path = os.path.join("public/assets", f)
    im = Image.open(path).convert("RGB")
    print(f"Running isnet on {f} (size: {im.size})...")
    # rembg with isnet
    nobg = rembg.remove(im, session=session)
    out_path = os.path.join("public/assets/test_cutouts", f.replace(".jpg", ".png"))
    nobg.save(out_path)
    print(f"Saved {out_path}")

print("Done testing clean rembg.")

