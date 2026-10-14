#!/usr/bin/env python3
"""Build web assets from the client-supplied logo (gold artwork on black)."""
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"C:\Users\Admin\OneDrive\Desktop\logo dermolyxa.jpeg"


def transparent_logo():
    im = Image.open(SRC).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    alpha = np.clip((lum - 6.0) * 1.7, 0, 255)
    rgba = np.dstack([a, alpha]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    bbox = out.getchannel("A").point(lambda p: 255 if p > 10 else 0).getbbox()
    if bbox:
        out = out.crop(bbox)
    return out


def fit(logo, size, bg=(0, 0, 0, 0), pad=0.10):
    w, h = size
    canvas = Image.new("RGBA", size, bg)
    lw, lh = logo.size
    s = min(w * (1 - 2 * pad) / lw, h * (1 - 2 * pad) / lh)
    nw, nh = max(1, int(lw * s)), max(1, int(lh * s))
    canvas.alpha_composite(logo.resize((nw, nh), Image.LANCZOS), ((w - nw) // 2, (h - nh) // 2))
    return canvas


def main():
    logo = transparent_logo()
    print("trimmed logo", logo.size)

    w0, h0 = logo.size
    nav_w = 600
    nav = logo.resize((nav_w, max(1, round(nav_w * h0 / w0))), Image.LANCZOS)
    nav.save(os.path.join(ROOT, "public", "logo-dermolyxa.png"), optimize=True)
    print("wrote public/logo-dermolyxa.png", nav.size)

    fit(logo, (1200, 630), (8, 8, 8, 255), pad=0.16).convert("RGB").save(
        os.path.join(ROOT, "public", "og.png"), "PNG", optimize=True)
    print("wrote public/og.png")

    fit(logo, (512, 512), (8, 8, 8, 255), pad=0.12).save(
        os.path.join(ROOT, "app", "icon.png"), optimize=True)
    print("wrote app/icon.png")

    fit(logo, (180, 180), (8, 8, 8, 255), pad=0.12).save(
        os.path.join(ROOT, "app", "apple-icon.png"), optimize=True)
    print("wrote app/apple-icon.png")


if __name__ == "__main__":
    main()
