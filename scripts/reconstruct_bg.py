import os
from PIL import Image
import numpy as np
import rembg

session = rembg.new_session("isnet-general-use")

uploaded_p = r"C:\Users\pc\.gemini\antigravity\brain\d665c886-2d8c-4f50-bd0b-068255e4f7d4\.user_uploaded\media_1794245511617_3f5d140a.jpg"
im = Image.open(uploaded_p).convert("RGB")
print("Removing subject to get background mask...")
nobg = rembg.remove(im, session=session)
nobg.save("public/assets/kanimozhi_nobg.png")

# Alpha of nobg is 255 on subject, 0 on background
arr_nobg = np.array(nobg)
subject_mask = arr_nobg[..., 3] > 30

arr_im = np.array(im)
bg_only = arr_im.copy()
bg_only[subject_mask] = [0, 0, 0] # black out subject
Image.fromarray(bg_only).save("public/assets/bg_only_kanimozhi.png")
print("Saved bg_only_kanimozhi.png")

