# Research protocol

Rules I keep because breaking them has cost me.

## The null decides the answer

Before testing whether a signal works, write down what a naive version would produce.
Buy and hold. Buy the whole sector. A random pick with the same holding period. If the
clever version cannot beat the naive one, the clever version is noise with extra steps.

One worked example from my own notebook: a "near the 52 week high" screen looked strong
until I put it against every naive benchmark. It lost to all of them. The money in that
study turned out to be in the position sizing layer, not in the selection rule. I would
have shipped the selection rule.

## Run the ablation

Remove one input at a time and re-measure. Anything whose removal does not change the
answer is decoration, and decoration on a slide reads as evidence.

## Count the claims, then check them

Write the draft, then number every factual claim in it. Check each one against a source
you can name and a date. Expect a third to a half of data-derived claims to need fixing
on the first pass. That is the normal rate, not a bad day.

The failures cluster in the same places every time:

- a number copied from a broker note that cannot be rebuilt from the filings
- a percentage computed off the wrong base, usually a sum that includes an eliminations line
- a one-off gain read as run-rate earnings
- "six quarters in a row" when the data shows five
- a return quoted from memory when the screener says something two points different
- two sources using different fiscal periods, compared as if they matched

## Separate what you measured from what you think

Two sections, always. Speculation is wanted, and it is allowed to be bold. It just has to
be labelled as speculation and carry a number. "This could double" is not analysis.
"Profit near X at Y times earnings gives Z a share, and here is the probability I put on
it" is.

## Do not launder a broker target

If a target price cannot be rebuilt from the inventory note, the segment mix or the
capacity, say that it cannot. A valuation you cannot reconstruct is someone else's
assertion. In one case a published target implied an asset value four times what the
filings support, because the note was valuing a master plan rather than the land the
company actually owns.

## Corrections fail too

When you correct an error, re-run the whole check on the corrected sentence. A correction
written in a hurry has roughly the same error rate as the original draft.
