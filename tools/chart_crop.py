"""Crop a chart screenshot and mask the platform controls.

    python chart_crop.py raw.png chart_ACME_D.png

The crop box and the masks are in pixels, so they are tied to one window size. Check them
against a fresh full screenshot whenever the window changes, or you will mask the candles
and keep the buttons. See ../docs/06-tradingview.md.
"""
import sys

from PIL import Image, ImageDraw

# Tuned for a maximised window on a 2560x1440 display.
CROP = (100, 90, 2360, 1570)          # left, top, right, bottom of the chart area
MASKS = [
    (15, 45, 345, 130),               # the buy and sell buttons
    (20, 282, 95, 330),               # the legend collapse control
]
FILL = (15, 15, 15)                   # matches the dark chart background


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src, dst = sys.argv[1], sys.argv[2]
    im = Image.open(src).convert("RGB")
    chart = im.crop(CROP)
    draw = ImageDraw.Draw(chart)
    for box in MASKS:
        draw.rectangle(box, fill=FILL)
    chart.save(dst)
    print(dst, chart.size)


if __name__ == "__main__":
    main()
