#!/usr/bin/env python3
"""
NextVector Article Image Optimizer
Re-encodes oversized cover images in public/images/articles/ for fast page loads:
  - Downscales anything wider than MAX_WIDTH (keeps aspect ratio).
  - Re-encodes JPEGs as progressive JPEG at QUALITY with metadata stripped.
  - Converts opaque PNG photos to JPEG and rewrites their paths in src/data/articlesData.ts.
A file is only replaced when the result is at least MIN_SAVING smaller, so re-running is a no-op.

Usage:
  python scripts/optimize_images.py            # optimize in place
  python scripts/optimize_images.py --dry-run  # report only
"""

import sys
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required (pip install Pillow).")
    sys.exit(1)

ROOT_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT_DIR / "public" / "images" / "articles"
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"

MAX_WIDTH = 1600
QUALITY = 82
MIN_SAVING = 0.15          # replace only if >= 15% smaller
MIN_BYTES = 250 * 1024     # leave already-small files alone

def encode_jpeg(img):
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    if img.width > MAX_WIDTH:
        img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
    buf = BytesIO()
    img.save(buf, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return buf.getvalue()

def has_alpha(img):
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        return img.convert("RGBA").getextrema()[3][0] < 255
    return False

def main():
    dry_run = "--dry-run" in sys.argv
    articles_src = ARTICLES_FILE.read_text(encoding="utf-8")
    renamed = {}
    before_total = after_total = 0

    for path in sorted(IMAGES_DIR.iterdir()):
        suffix = path.suffix.lower()
        if suffix not in (".jpg", ".jpeg", ".png") or path.stat().st_size < MIN_BYTES:
            continue
        size = path.stat().st_size
        with Image.open(path) as img:
            img.load()
            if suffix == ".png" and has_alpha(img):
                continue  # transparent artwork must stay PNG
            data = encode_jpeg(img)

        if len(data) > size * (1 - MIN_SAVING):
            continue

        target = path if suffix in (".jpg", ".jpeg") else path.with_suffix(".jpg")
        if target != path and target.exists():
            print(f"  [SKIP] {path.name}: {target.name} already exists")
            continue

        before_total += size
        after_total += len(data)
        print(f"  {path.name}: {size // 1024} KB -> {len(data) // 1024} KB" + (f" (as {target.name})" if target != path else ""))
        if dry_run:
            continue
        target.write_bytes(data)
        if target != path:
            path.unlink()
            renamed[f"/images/articles/{path.name}"] = f"/images/articles/{target.name}"

    if renamed and not dry_run:
        for old, new in renamed.items():
            articles_src = articles_src.replace(old, new)
        ARTICLES_FILE.write_text(articles_src, encoding="utf-8")
        print(f"Updated {len(renamed)} image path(s) in {ARTICLES_FILE.relative_to(ROOT_DIR)}")

    saved = before_total - after_total
    label = "Would save" if dry_run else "Saved"
    print(f"{label} {saved / 1024 / 1024:.1f} MB ({before_total / 1024 / 1024:.1f} MB -> {after_total / 1024 / 1024:.1f} MB)")

if __name__ == "__main__":
    main()
