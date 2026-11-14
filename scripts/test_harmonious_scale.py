import os
from PIL import Image, ImageFilter
import numpy as np

CANVAS_W = 800
CANVAS_H = 1000
WARM_IVORY = (247, 244, 240) # #F7F4F0

# Let's inspect the cutouts:
# 1. SG_Aishwarya.png:
#    Head top: y ≈ 535, Eyes: x ≈ 725, y ≈ 820. Bottom: y = 2047
#    We want bottom to reach y = 1000, or eye at y = 320.
#    Distance eye to bottom = 2047 - 820 = 1227 px.
#    Distance eye to top = 820 - 535 = 285 px.
#    If eye is at y = 330, and bottom is at y = 1000:
#    Distance on canvas = 1000 - 330 = 670 px.
#    Scale = 670 / 1227 = 0.546!
#    Then headroom = 330 - (285 * 0.546) = 330 - 155 = 175 px! PERFECT!
#    Head height on canvas = (1040 - 535) * 0.546 = 276 px!

# 2. Varsha_G_L.png:
#    Eyes: x ≈ 850, y ≈ 960. Bottom: y = 2047. Head top: y ≈ 760.
#    Distance eye to bottom = 2047 - 960 = 1087 px.
#    Distance eye to top = 960 - 760 = 200 px.
#    If eye is at y = 330, and bottom is at y = 1000:
#    Scale = 670 / 1087 = 0.616!
#    Headroom = 330 - (200 * 0.616) = 207 px!
#    Head height on canvas = 360 * 0.616 = 222 px.
#    Wait! Varsha was photographed standing full waist/hip. If scale = 0.72:
#    eye at y = 330, bottom at y = 1000.

# 3. KR_Kanimozhi.png:
#    Eyes: x ≈ 920, y ≈ 980. Bottom: y = 2047. Head top: y ≈ 775.
#    Distance eye to bottom = 2047 - 980 = 1067 px.
#    If eye is at y = 330, and bottom is at y = 1000:
#    Scale = 670 / 1067 = 0.628!

# 4. A_Karimunnisha.png:
#    Eyes: x ≈ 820, y ≈ 560. Bottom: y = 2000 (bottom of chest). Head top: y ≈ 10.
#    Distance eye to bottom = 2000 - 560 = 1440 px.
#    Distance eye to top = 560 - 10 = 550 px.
#    If eye is at y = 330, and bottom is at y = 1000:
#    Scale = 670 / 1440 = 0.465!
#    Headroom = 330 - (550 * 0.465) = 330 - 256 = 74 px!
#    Head height = (950 - 10) * 0.465 = 437 px!
#    Wait, 74px headroom might be a bit tight, or eye at y = 350 gives 95px headroom!

# 5. Katheja_Baseera_S.png:
#    Eyes: x ≈ 715, y ≈ 700. Bottom: y = 1720. Head top: y ≈ 295.
#    Distance eye to bottom = 1720 - 700 = 1020 px.
#    Distance eye to top = 700 - 295 = 405 px.
#    If eye is at y = 330, and bottom is at y = 1000:
#    Scale = 670 / 1020 = 0.657!
#    Headroom = 330 - (405 * 0.657) = 330 - 266 = 64 px!
#    If eye is at y = 360: scale = 640 / 1020 = 0.627, headroom = 360 - 254 = 106 px!

print("Testing harmonious scaling...")

