# The deck pipeline

Twelve slides, 16:9, dark. Built from code so the layout is identical across stocks and
only the data file changes. `tools/deck_build.js` plus a data file is the whole thing.

## The shape

| # | Slide | Must contain |
|---|---|---|
| 1 | Cover | ticker, name, one sentence that is the entire thesis, price, the move |
| 2 | The short answer | the call, entry, target, stop, horizon, risk and reward |
| 3 | What is this company | three cards: what it does, how it makes money, who owns it |
| 4 | Business model and revenue mix | a doughnut of segment revenue plus four unit economics stats |
| 5 | Financials | revenue by quarter as bars, three headline stats |
| 6 | Guidance and outlook | three big numbers, then four dated items with what each one does |
| 7 | Why it moved | five dated steps with the move, in order, then one kicker line |
| 8 | Weekly chart | the screenshot, three numbers under it |
| 9 | Daily chart | the screenshot, the three levels colour matched to the lines on it |
| 10 | Is it priced in | three cards, then a verdict sentence |
| 11 | Scenarios | bull, base, bear with probability, price, change, arithmetic |
| 12 | Recommendation | the plan repeated, plus what would prove it wrong |

Slides 4 and 6 exist because the first version went straight from "what is this company"
to the chart. Every reader then asked the same two questions. How does the revenue split,
and what has management said about next year.

## Layout rules that survived review

- **Bigger fonts, fewer words.** This is read on a laptop in a meeting. It is not a
  document.
- **Lead every slide with a takeaway sentence in the title position.** The title is the
  conclusion. The body explains it.
- **Three cards across, or four. Never five.** Five is unreadable at speed.
- **No slide ends with an empty bottom third.** Either the content grows or the slide
  merges with its neighbour.
- **Reported and inferred get separated visually.** A figure from a rumour or a chat
  message goes in a box labelled reported. My inference goes in a different box labelled
  as mine. Never one bullet list holding both.
- **Deal structure decks are different.** For a takeover, five to eight slides. The centre
  of the deck is one flowchart of the structure with the cash flows on the arrows.

## The font size trap

The library has a shrink to fit option. PowerPoint ignores it. Autofit in a generated file
is not applied until a human opens the box and edits it. So a long value renders at full
size and runs off its card.

Fix: compute the point size yourself from the string length and the box width.

```js
const fit = (v, base, width) => Math.min(base, Math.floor((width * 72) / (String(v).length * 0.6)));
```

Apply it to every big statistic, every price, every call banner. The 0.6 is average glyph
width as a fraction of point size for the sans faces I use. It is approximate and
deliberately conservative.

## Render and QA

Generating the file is not finishing. Render each slide to a PNG and look at it.

```powershell
powershell -ExecutionPolicy Bypass -File tools/render.ps1 "$HOME\Downloads\ACME_Deck.pptx"
```

That script drives PowerPoint through COM to export 1600x900 PNGs, then saves the PDF with
the same object. So the PDF a reader opens is the file I checked.

What the images catch and the source never does: titles wrapping onto a third line, a value
clipped by its card, two cards of visibly different height, a chart screenshot with the
platform buttons still in it, and a slide that is simply too empty.
