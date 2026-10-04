# Technical analysis: measure, then interpret

Two files, in this order, always. A fact sheet with numbers and no verbs of opinion. Then
a reading of that fact sheet. Mixing them produces a chart that agrees with whatever you
already believed.

## The fact sheet

What gets measured, from the bar series:

- trend: price against the 20, 50 and 200 period averages, as a percentage distance
- momentum: RSI, MACD against its signal
- participation: volume over the last 20 bars against the 100 before them, and the share
  of the last 20 bars that closed up
- range: the 52 week high and low, and where price sits inside that
- the biggest single bar moves of the last year, dated, with each one's volume ratio
- average true range, for sizing

`tools/indicators.py` produces all of this from a JSON bar file.

## Levels

**A level is a price. A zone is a place.** Define a zone mechanically or you will draw it
where you want it: one to five quiet bars, then a bar whose body is at least 60% of its
range and whose range is at least 1.2 average ranges, which then carries at least one
average range clear within three bars. Up out of the base is demand, down is supply.

A zone dies when price closes beyond its far edge. Each revisit uses it up, so a fresh
zone outranks a tested one. The near edge is where you work the order. The far edge is
where you are wrong.

**Confluence is the only reason to care about a level.** One moving average is nothing.
The 50 day average sitting on a prior swing low and a 38.2% retracement, all within one
percent, is a level. Score each candidate by how many independent methods land there, and
quote only the top few.

**A cluster containing the current price is neither support nor resistance.** It is the
place the stock has to leave. Label it that way.

**The chance of reaching a level is empirical.** Count how often past windows of the same
length travelled that far, using intrabar highs and lows, because a stop does not wait for
the close.

## What I measured and stopped using

- **The common indicators are copies of each other.** Correlate them before stacking them.
  Three oscillators on one chart is one oscillator drawn three times.
- **No indicator predicts direction on its own.** What they do is gate. "Only take this
  setup when participation is above average" is a real improvement. "RSI below 30, buy" is
  not.
- **Fibonacci scoring, as a standalone score, did not survive testing.** A fib level counts
  only when something else lands on it, which makes it a confluence input and nothing more.
- **Square root of time volatility bands are too crude.** A HAR style model, which weights
  recent, weekly and monthly realised volatility, gives projection bands that are much
  closer to what actually happens.
- **Costs are not a flat haircut.** The stocks a signal selects are usually the ones that
  are hardest to trade, so slippage rises exactly when the signal fires.

## The output contract

Every chart read ships all of this, or it is not finished.

| Part | Rule |
|---|---|
| Calls | LONG, SHORT or NEUTRAL, one per horizon |
| Horizon | in days, on every call |
| Decision level | one price or one tight zone |
| Invalidation | two triggers, one up one down, both on a closing basis |
| Size | shares per unit of risk, derived from the average range |
| Limits | every flag the measurement raised, plus the fact that this is chart work only |

When the horizons disagree, say so. Blending them into one answer destroys the only
information you had.
