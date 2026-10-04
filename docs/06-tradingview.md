# Driving a live chart from an agent

I use the TradingView desktop app through an MCP server, so the agent reads and controls
the same chart I am looking at. This is the part of the pipeline with the most sharp
edges, so they are all written down.

## Launch

The server talks to the desktop app over a debugging port. The app has to be started by
the launcher the server provides, not from the normal shortcut. Started the wrong way, the
tools connect and then silently return nothing useful. Health check first, every session.

## Always set symbol and timeframe before reading data

```
chart_set_symbol   EXCHANGE:TICKER
chart_set_timeframe D
data_get_ohlcv     summary=true
```

In that order. The chart defaults to an intraday timeframe, and asking for bars without
setting the timeframe hands you hourly bars that look exactly like daily bars in JSON.
Every return you compute from them is wrong and nothing warns you.

Passing a symbol argument to the quote call does not switch the chart. Set the symbol
first, then quote.

## Do not touch the user's layout

The chart I work from is somebody's working layout, with their own indicators, drawings
and templates on it. Rules:

1. Open a scratch tab for agent work, do the work there, close it at the end.
2. If you must work on the live tab, record the study IDs before you add anything, then
   remove only the IDs you added. Never clear all studies.
3. Never delete drawings you did not create.

## Indicators

Use full names. "Relative Strength Index", not "RSI". Adding a study can fail and still
report success, so read the chart state back and confirm the study is actually there. When
an exponential average refuses to add, the plain moving average usually works, and for a
screenshot the difference does not matter.

Every moving average arrives in the same default colour, so a three average chart is three
blue lines. Read the style keys off the study, then override each colour explicitly.

## Drawing the trade

Three objects, no more: a rectangle for the buy zone, a horizontal line for the stop, a
horizontal line for the target. One retracement object on the live swing if the levels came
from it, because the platform labels its own levels and spans only the swing. That one
object replaces seven hand drawn lines.

Fewer objects than you want. Sentences written across candles, labels colliding at the
right edge and text wrapping into vertical columns all make a chart unreadable, and that
is what a reviewer sees first.

For projections, draw a fan that stops each path at its own point on the time axis, and
fade opacity with distance. The shape then shows the range opening with time instead of
three lines racing to the same place.

## Getting the target line into the frame

Lines outside the visible price range are simply not drawn. Turn autoscale off, then set
the visible price range wide enough to contain the stop and the target with a margin.
Check the state afterwards.

## Screenshots

Hide the floating drawing toolbar before capturing, or it sits in the middle of the image.
Then crop and mask: the buy and sell buttons in the top left corner have no place in a
research deck, and neither does the legend collapse control. `tools/chart_crop.py` does
both in one pass. Confirm the crop box against one full screenshot whenever the window
size changes, because the box is in pixels.

## What to trust

Prices and levels come from the bar series. Indicator values come from the study values
call. Nothing comes from reading a number off a screenshot.
