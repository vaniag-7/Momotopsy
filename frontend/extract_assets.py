from PIL import Image
import numpy as np
import os

def make_transparent(img, bg_coord=(0,0), threshold=30):
    img = img.convert("RGBA")
    data = np.array(img)
    
    bg_color = data[bg_coord[1], bg_coord[0]]
    bg_r, bg_g, bg_b, _ = bg_color
    
    r, g, b, a = data.T
    
    dist = np.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
    transparent_areas = (dist < threshold)
    
    data[..., 3][transparent_areas.T] = 0
    return Image.fromarray(data)

def main():
    if not os.path.exists('src/assets'):
        os.makedirs('src/assets')

    # 1. Landing momo
    img1 = Image.open('refs/WhatsApp Image 2026-04-16 at 12.20.10 PM.jpeg')
    momo_large = img1.crop((0, 0, 400, 400))
    momo_large = make_transparent(momo_large, bg_coord=(390, 0), threshold=20)
    momo_large.save('src/assets/large_momo.png')

    # 2. Momo Basket
    img2 = Image.open('refs/WhatsApp Image 2026-04-16 at 12.20.38 PM.jpeg')
    momo_basket = img2.crop((0, img2.height - 400, 400, img2.height))
    momo_basket = make_transparent(momo_basket, bg_coord=(10, 10), threshold=20)
    momo_basket.save('src/assets/momo_basket.png')

    # 3. Top-Right shape
    shape_top_right = img2.crop((img2.width - 400, 0, img2.width, 400))
    shape_top_right = make_transparent(shape_top_right, bg_coord=(0, 390), threshold=20)
    shape_top_right.save('src/assets/shape_top_right.png')

    # 4. Top-Left shape
    img3 = Image.open('refs/WhatsApp Image 2026-04-16 at 12.20.57 PM.jpeg')
    shape_top_left = img3.crop((0, 0, 300, 300))
    shape_top_left = make_transparent(shape_top_left, bg_coord=(290, 290), threshold=20)
    shape_top_left.save('src/assets/shape_top_left.png')

    # 5. Bottom-left shape
    img4 = Image.open('refs/WhatsApp Image 2026-04-16 at 12.21.20 PM.jpeg')
    shape_bottom_left = img4.crop((0, img4.height - 400, 400, img4.height))
    shape_bottom_left = make_transparent(shape_bottom_left, bg_coord=(390, 10), threshold=20)
    shape_bottom_left.save('src/assets/shape_bottom_left.png')

print("Starting pixel-perfect extraction...")
main()
print("Done.")
