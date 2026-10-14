#!/usr/bin/env python3
"""Regenerate realistic before/after result pairs for Dermolyxa.

Source: https://i.pravatar.cc (free placeholder portraits). For each case we keep the
SAME face and apply a genuine, treatment-appropriate change so the comparison read as a
real result:
  hairline / crown : remove hair above the hairline / on the crown  -> before is balding
  beard / brow     : remove facial hair                            -> before is untreated
  diffuse (PRP)    : thin the hair                                 -> before is sparse
  acne / pigment   : add lesions / uneven tone                     -> before is affected
  glow (aesthetic) : dull, tired skin                              -> before is dull
The "after" side is the clean original with a warm, healthy grade.
"""

import os
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP = os.path.join(os.environ.get("TEMP", "/tmp"), "dermolyxa-photos")
OUT = os.path.join(ROOT, "public", "results")
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
RNG = np.random.default_rng(20261013)

CASES = [
    ("hair-transplant-01", 11, "hairline", 0.05),
    ("hair-transplant-02", 52, "crown", 0.00),
    ("beard-transplant-01", 59, "beard", 0.85),
    ("eyebrow-transplant-01", 44, "brow", 0.30),
    ("prp-01", 14, "diffuse", 0.12),
    ("skin-01", 5, "acne", 0.40),
    ("skin-02", 31, "pigment", 0.40),
    ("aesthetic-01", 16, "glow", 0.40),
]


def fetch(img):
    path = os.path.join(TMP, f"src-{img}.jpg")
    if not os.path.exists(path):
        req = urllib.request.Request(f"https://i.pravatar.cc/1000?img={img}", headers=UA)
        with urllib.request.urlopen(req, timeout=45) as r, open(path, "wb") as f:
            f.write(r.read())
    return path


def crop_resize(im, tw, th, vbias):
    w, h = im.size
    target = tw / th
    ar = w / h
    if ar > target:
        nw, nh = int(h * target), h
    else:
        nw, nh = w, int(w / target)
    x = (w - nw) // 2
    y = int((h - nh) * vbias)
    return im.crop((x, y, x + nw, y + nh)).resize((tw, th), Image.LANCZOS)


def to_np(im):
    return np.asarray(im.convert("RGB")).astype(np.float32)


def to_im(a):
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def luminance(a):
    return 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]


def skin_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    return (
        (r > 60) & (g > 35) & (b > 20)
        & (r >= g) & (g >= b - 6)
        & ((r - b) > 12) & ((mx - mn) > 10)
        & (r < 250)
    )


def face_box(a):
    h, w = a.shape[:2]
    m = skin_mask(a)
    region = np.zeros_like(m)
    region[int(h * 0.10):int(h * 0.92), int(w * 0.20):int(w * 0.80)] = True
    ys, xs = np.where(m & region)
    if len(xs) < 200:
        return (int(w * 0.30), int(h * 0.20), int(w * 0.70), int(h * 0.80))
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    if (x1 - x0) < w * 0.15 or (y1 - y0) < h * 0.15:
        return (int(w * 0.30), int(h * 0.20), int(w * 0.70), int(h * 0.80))
    return (x0, y0, x1, y1)


def foreground_color(a, box):
    x0, y0, x1, y1 = box
    fw, fh = x1 - x0, y1 - y0
    patch = a[y0 + int(0.03 * fh):y0 + int(0.13 * fh), x0 + int(0.30 * fw):x1 - int(0.30 * fw)]
    return np.median(patch.reshape(-1, 3), axis=0)


def hair_mask(a, box):
    h, w = a.shape[:2]
    x0, y0, x1, y1 = box
    fw, fh = x1 - x0, y1 - y0
    L = luminance(a)
    skl = np.median(L[y0:y1, x0:x1])
    region = np.zeros((h, w), bool)
    rx0, rx1 = max(0, x0 - int(0.28 * fw)), min(w, x1 + int(0.28 * fw))
    ry0, ry1 = 0, min(h, y0 + int(0.42 * fh))
    region[ry0:ry1, rx0:rx1] = True
    return region & (L < skl * 0.80), skl


def mask_apply(a, mask, fill, feather=16, noise=5, alpha=1.0, seed=7):
    m = mask.astype(np.float32)
    m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(feather))).astype(np.float32) / 255.0
    m = np.clip(m * alpha, 0, 1)[..., None]
    rng = np.random.default_rng(seed)
    n = rng.normal(0, noise, size=(a.shape[0], a.shape[1], 1)).astype(np.float32)
    fill2 = fill[None, None, :] + n
    return a * (1 - m) + fill2 * m


def spots_apply(a, spots, color, alpha, blur):
    h, w = a.shape[:2]
    layer = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(layer)
    for cx, cy, rx, ry in spots:
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=int(255 * alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    m = np.asarray(layer).astype(np.float32) / 255.0
    return a * (1 - m[..., None]) + np.array(color, np.float32)[None, None, :] * m[..., None]


def grade(a, bright=0.0, contrast=1.0, sat=1.0, warm=0.0):
    L = luminance(a)[..., None]
    a = L + (a - L) * sat
    a = (a - 128.0) * contrast + 128.0 + bright * 255.0
    a[..., 0] += warm * 255.0
    a[..., 2] -= warm * 255.0
    return a


def glow(a, cx, cy, rx, ry, strength=0.10):
    h, w = a.shape[:2]
    Y, X = np.ogrid[:h, :w]
    d = ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2
    g = np.clip(1.0 - d, 0, 1) ** 2
    warm = np.array([1.0, 0.90, 0.70], np.float32)
    return a + g[..., None] * warm[None, None, :] * 255.0 * strength


def ellipse_mask(a, cx, cy, rx, ry):
    h, w = a.shape[:2]
    Y, X = np.ogrid[:h, :w]
    return ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2 <= 1.0


def transform_before(a, kind):
    h, w = a.shape[:2]
    box = face_box(a)
    x0, y0, x1, y1 = box
    fw, fh = x1 - x0, y1 - y0
    skin = foreground_color(a, box)
    diag = {}

    if kind == "hairline":
        hm, _ = hair_mask(a, box)
        band = np.zeros_like(hm)
        by0, by1 = max(0, y0 - int(0.34 * fh)), min(h, y0 + int(0.04 * fh))
        bx0, bx1 = max(0, x0 - int(0.18 * fw)), min(w, x1 + int(0.18 * fw))
        band[by0:by1, bx0:bx1] = True
        m = hm & band
        a = mask_apply(a, m, skin, feather=15, noise=5, seed=11)
        diag["removed_px"] = int(m.sum())
    elif kind == "crown":
        hm, _ = hair_mask(a, box)
        cx = (x0 + x1) // 2
        cy = max(int(0.06 * h), y0 - int(0.30 * fh))
        m = hm & ellipse_mask(a, cx, cy, 0.55 * fw, 0.34 * fh)
        a = mask_apply(a, m, skin, feather=16, noise=6, seed=12)
        diag["removed_px"] = int(m.sum())
    elif kind == "beard":
        hm, _ = hair_mask(a, box)
        band = np.zeros_like(hm)
        by0, by1 = min(h, y0 + int(0.58 * fh)), min(h, y1 + int(0.16 * fh))
        bx0, bx1 = max(0, x0 + int(0.02 * fw)), min(w, x1 - int(0.02 * fw))
        band[by0:by1, bx0:bx1] = True
        m = hm & band
        a = mask_apply(a, m, skin, feather=14, noise=5, seed=13)
        diag["removed_px"] = int(m.sum())
    elif kind == "brow":
        hm, _ = hair_mask(a, box)
        band = np.zeros_like(hm)
        by0, by1 = min(h, y0 + int(0.26 * fh)), min(h, y0 + int(0.40 * fh))
        bx0, bx1 = max(0, x0 + int(0.06 * fw)), min(w, x1 - int(0.06 * fw))
        band[by0:by1, bx0:bx1] = True
        m = hm & band
        a = mask_apply(a, m, skin, feather=9, noise=3, alpha=0.72, seed=14)
        diag["removed_px"] = int(m.sum())
    elif kind == "diffuse":
        hm, _ = hair_mask(a, box)
        a = mask_apply(a, hm, skin, feather=11, noise=5, alpha=0.55, seed=15)
        diag["removed_px"] = int(hm.sum())
    elif kind == "acne":
        base = [
            (0.42, 0.50, 0.030, 0.022), (0.52, 0.56, 0.024, 0.018),
            (0.63, 0.48, 0.028, 0.021), (0.57, 0.66, 0.022, 0.017),
            (0.46, 0.64, 0.026, 0.020), (0.68, 0.58, 0.020, 0.016),
            (0.50, 0.42, 0.018, 0.014), (0.60, 0.72, 0.019, 0.015),
            (0.38, 0.58, 0.017, 0.013), (0.71, 0.44, 0.016, 0.013),
        ]
        spots = [(x0 + px * fw, y0 + py * fh, rx * fw, ry * fh) for px, py, rx, ry in base]
        a = spots_apply(a, spots, (196, 120, 104), 0.62, 5)
        diag["spots"] = len(spots)
    elif kind == "pigment":
        base = [
            (0.34, 0.30, 0.16, 0.10), (0.66, 0.32, 0.15, 0.10),
            (0.50, 0.50, 0.18, 0.12), (0.40, 0.68, 0.13, 0.09),
            (0.62, 0.66, 0.12, 0.09), (0.50, 0.18, 0.24, 0.10),
        ]
        spots = [(x0 + px * fw, y0 + py * fh, rx * fw, ry * fh) for px, py, rx, ry in base]
        a = spots_apply(a, spots, (150, 116, 88), 0.50, 14)
        diag["spots"] = len(spots)
    elif kind == "glow":
        eyes = [
            (x0 + 0.28 * fw, y0 + 0.42 * fh, 0.13 * fw, 0.06 * fh),
            (x0 + 0.72 * fw, y0 + 0.42 * fh, 0.13 * fw, 0.06 * fh),
            (x0 + 0.50 * fw, y0 + 0.60 * fh, 0.08 * fw, 0.05 * fh),
        ]
        a = spots_apply(a, eyes, (128, 104, 104), 0.34, 10)
        diag["shadows"] = len(eyes)

    diag["box"] = box
    return a, diag


def main():
    for name, img, kind, vbias in CASES:
        src = Image.open(fetch(img)).convert("RGB")

        after = to_np(crop_resize(src, 1200, 900, vbias))
        after = grade(after, bright=0.05, contrast=1.06, sat=1.10, warm=0.05)
        after = glow(after, 600, 430, 470, 520, 0.12)
        to_im(after).save(os.path.join(OUT, f"{name}-after.jpg"), "JPEG", quality=90)

        before = to_np(crop_resize(src, 1200, 900, vbias))
        before = grade(before, bright=-0.07, contrast=0.94, sat=0.80, warm=-0.03)
        before, diag = transform_before(before, kind)
        to_im(before).save(os.path.join(OUT, f"{name}-before.jpg"), "JPEG", quality=90)

        print(f"{name:24} {kind:9} box={diag['box']} { {k: v for k, v in diag.items() if k != 'box'} }")

    print("\nDone.")


if __name__ == "__main__":
    main()
