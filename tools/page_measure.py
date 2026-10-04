"""Measure A4 page overflow in an HTML note before printing it.

    python page_measure.py note.html
    python page_measure.py note.html --usable 1047 --selector "section"

Prints, for every page, how many pixels of content it holds and how many it has spare.
A negative number is overflow and will push content onto the next page. Measuring beats
looking at the PDF, because a 9 pixel overflow is invisible until it moves a heading.

Usable height is the printable area in CSS pixels. About 1047 for A4 at 11mm top and
bottom margins. Change it with --usable if the stylesheet uses different margins.

Needs playwright: pip install playwright && playwright install chromium
See ../docs/09-pdf-note-pipeline.md.
"""
import argparse
import pathlib
import sys

USABLE_DEFAULT = 1047.0


def measure(path, selector, usable):
    from playwright.sync_api import sync_playwright

    url = pathlib.Path(path).resolve().as_uri()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 794, "height": 1123})
        page.goto(url)
        page.emulate_media(media="print")
        boxes = page.eval_on_selector_all(
            selector,
            """els => els.map(e => {
                 const r = e.getBoundingClientRect();
                 return {
                   tag: e.tagName.toLowerCase(),
                   cls: e.className || '',
                   top: r.top + window.scrollY,
                   bottom: r.bottom + window.scrollY,
                   text: (e.textContent || '').trim().slice(0, 48)
                 };
               })""",
        )
        total = page.evaluate("document.body.scrollHeight")
        browser.close()
    return boxes, total


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html")
    ap.add_argument("--usable", type=float, default=USABLE_DEFAULT)
    ap.add_argument("--selector", default="section, .page, .block, h2")
    args = ap.parse_args()

    boxes, total = measure(args.html, args.selector, args.usable)
    pages = int(total // args.usable) + 1
    print("%s: %.0f px of content, %d A4 page(s) at %.0f px usable"
          % (args.html, total, pages, args.usable))
    print()

    worst = 0
    for i in range(pages):
        top, bottom = i * args.usable, (i + 1) * args.usable
        on_page = [b for b in boxes if b["top"] < bottom and b["bottom"] > top]
        used = max([b["bottom"] for b in on_page], default=top) - top
        spare = args.usable - used
        flag = "OVER" if spare < 0 else "ok  "
        print("  page %d  %s  used %6.0f  spare %+7.0f" % (i + 1, flag, used, spare))
        if spare < 0:
            worst = min(worst, spare)
            crossing = [b for b in on_page if b["bottom"] > bottom]
            for b in crossing[:3]:
                print("        crosses the break: <%s class=%r> %s"
                      % (b["tag"], b["cls"], b["text"]))

    print()
    if worst < 0:
        print("FIX: move a whole section to the next page, then cut two sentences.")
        sys.exit(1)
    print("PASS: every page fits.")


if __name__ == "__main__":
    main()
