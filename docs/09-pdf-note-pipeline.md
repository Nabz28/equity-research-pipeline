# The PDF note pipeline

One or two A4 pages, written as HTML, printed by headless Chrome. Used when the reader
wants prose instead of slides.

## Build

```bash
chrome --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=out.pdf note.html
```

Two practical notes. Copy the HTML next to the output first and run from there. A file URL
through nested directories with spaces in them is the most common failure. And set the page
geometry in CSS, not on the command line.

```css
@page { size: A4; margin: 11mm 9mm; }
```

## Measure the overflow, do not eyeball it

With those margins the usable height is about 1047 CSS pixels a page. So the check is
arithmetic, not judgement. Load the page, measure the bottom edge of every section, and
report how many pixels each page is over or under. `tools/page_measure.py` prints a per
page surplus or deficit.

Three rounds of this is normal. The fix for an overflowing page is almost never a smaller
font. Move a whole section to the next page, then cut two sentences. A reader notices a
smaller font at once. Nobody notices a shorter paragraph.

## Shape

- Lead every section with a bold takeaway sentence, then prose underneath. The first
  sentence carries the insight.
- Prose beats a table for anything with a causal chain in it. Use a table only to compare
  three or more things across the same columns, or to list price levels.
- A page of stacked tables hides the argument. A note that is all tables has no argument.
- For bullet style notes use a short bold label, a full stop, then the sentence.

## Before it goes out

Run the voice linter. Then read the whole thing out loud. If you would not say a sentence
that way to a colleague sitting next to you, rewrite it.
