from PIL import Image

TARGET_W = 800
TARGET_H = 1000

trainers = [
    "SG_Aishwarya",
    "Varsha_G_L",
    "KR_Kanimozhi",
    "A_Karimunnisha",
    "Katheja_Baseera_S",
]

comp_img = Image.new("RGB", (TARGET_W * 5, TARGET_H), (40, 10, 60))
for i, name in enumerate(trainers):
    p = Image.open(f"public/assets/portraits/{name}.jpg")
    comp_img.paste(p, (i * TARGET_W, 0))

comp_w = TARGET_W * 5 // 2
comp_h = TARGET_H // 2
comp_thumb = comp_img.resize((comp_w, comp_h), Image.Resampling.LANCZOS)
comp_thumb.save("public/assets/portraits_comparison/all_five_purple_gradient_v2.jpg", "JPEG", quality=92)
print("Saved comparison v2!")

