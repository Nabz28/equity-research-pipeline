# The flow

Seven steps. Each one has to produce an artefact before the next starts. Skipping an
artefact is how a deck ends up with a confident call behind an unchecked number.

## 1. Frame

Write two sentences before touching any data. What would make this a buy. What would make
it a pass. If you cannot write the pass case, you are not researching, you are shopping.

Also write the horizon. A call with no horizon is not a call. Days, weeks or months.

## 2. Pull

Primary sources only for anything that ends up as a number on a slide.

- quarterly and annual filings from the company or the exchange mirror
- the company's own investor deck, for segment mix and guidance
- price history from the chart platform, not from a news article
- peer multiples from one consistent screener, so the comparison is apples to apples
- news for the narrative, never for the numbers

See [07-idx-playbook.md](07-idx-playbook.md) for getting Indonesian filings when the
obvious sources refuse you.

## 3. Measure

Produce a fact sheet with no opinion in it. Returns over 1, 3, 6 and 12 months. Distance
from the moving averages. RSI and MACD. Volume now against volume before. The 52 week
high and low. The eight biggest single day moves with their volume ratio, which is how you
find the dates that matter. `tools/indicators.py` emits exactly this from a bar file.

Same discipline on the fundamentals. Revenue and profit by quarter, margin, net cash,
segment mix, capex. Numbers in a table, no adjectives.

## 4. Verify

Run the check in [03-verification.md](03-verification.md) before you write a word of
narrative. This is the step that gets dropped under time pressure and it is the one that
pays.

## 5. Interpret

Now the story. What changed, when, and why the price responded. Tie every move on the
chart to a dated event or say plainly that you cannot. Then scenarios with probabilities
and a weighted value: [04-scenarios.md](04-scenarios.md).

Then the hardest section: is it priced in. The honest answer is usually "part of it".

## 6. Build

A deck for a 10 minute conversation, a one or two page PDF note for a reader who will
skim. Never both from the same keystrokes, because the formats need different compression.

## 7. QA

Render every slide to an image and look at it. Read the note out loud. Run the voice
linter. Overflowing text and wrapped titles are the cheapest possible way to lose a reader
and they are invisible if you only look at the source.
