# Equity Research Pipeline

How I run a single-stock due diligence from a blank page to a finished deck or PDF note.
This repo is the method and the tooling, not the research output. No client data, no
positions, no calls, no credentials. The example data file ships a made-up company.

Nothing here is investment advice.

## The flow

```
   question
      |
  1. FRAME        what would make this a buy, what would make it a pass
      |
  2. PULL         filings, company releases, prices, peers       docs/02, docs/06
      |
  3. MEASURE      numbers first, no story yet                    tools/indicators.py
      |           charts read mechanically                       docs/05
      |
  4. VERIFY       every number traced to a source, peers         docs/03
      |           cross-checked, claims counted
      |
  5. INTERPRET    what it means, scenarios with probabilities    docs/04
      |           and a weighted value
      |
  6. BUILD        deck or PDF note                               docs/07, docs/08
      |
  7. QA           render every page, read it, run the linter     docs/09
      |
   delivery
```

The split between step 3 and step 5 is the whole point. Measuring and interpreting in one
pass is how you talk yourself into a trade. Write the fact sheet first, with no verbs of
opinion in it, then read it back and decide.

## What is in here

| Path | What it is |
|---|---|
| [docs/01-flow.md](docs/01-flow.md) | the pipeline end to end, with what each step must produce |
| [docs/02-research-protocol.md](docs/02-research-protocol.md) | how a question gets answered, and the null that decides it |
| [docs/03-verification.md](docs/03-verification.md) | the check that catches most of my own errors |
| [docs/04-scenarios.md](docs/04-scenarios.md) | scenarios, weighted value, and the "is it priced in" test |
| [docs/05-technical-analysis.md](docs/05-technical-analysis.md) | measure then interpret, levels, zones, what does not work |
| [docs/06-tradingview.md](docs/06-tradingview.md) | driving a live chart from an agent, and the traps |
| [docs/07-idx-playbook.md](docs/07-idx-playbook.md) | Indonesian market mechanics that decide whether you can exit |
| [docs/08-deck-pipeline.md](docs/08-deck-pipeline.md) | the 12 slide deck, how it is built and rendered |
| [docs/09-pdf-note-pipeline.md](docs/09-pdf-note-pipeline.md) | HTML to A4 PDF, and how to stop pages overflowing |
| [docs/10-writing-rules.md](docs/10-writing-rules.md) | the voice rules, and the linter that enforces them |
| [tools/](tools/) | the scripts: deck builder, chart crop, indicators, page measure, note linter |

## Quick start

```bash
cd tools && npm install
node deck_build.js example_data.js      # writes a 12 slide pptx to ~/Downloads
python lint_note.py ../docs/10-writing-rules.md
```

Windows, for the render and PDF step:

```powershell
powershell -ExecutionPolicy Bypass -File tools/render.ps1 "$HOME\Downloads\ACME_Deck.pptx"
```
