// Example data file for deck_build.js. ACME is invented. Every number here is made up.
// It exists to show the schema and to let the layout be tested without any real research.
module.exports = {
  ticker: "ACME", name: "Acme Widget Industries", accent: "38BDF8",
  deskLine: "RESEARCH NOTE  ·  EXAMPLE",
  tagline: "A mid cap widget maker. Up 40% in three months on one contract, not on better margins.",
  price: "$24.10", ret: "+40%", retLabel: "3 months",
  callShort: "WAIT FOR $21.00-21.80",
  callWord: "NEUTRAL",            // LONG, NEUTRAL or SHORT
  callLine: "Cheap on book value. It only earns 9% on equity. Buy the pullback.",
  plan: { entry: "$21.00-21.80", target: "$28.00", stop: "$19.90", horizon: "3-6 months" },
  planNote: "Risk and reward from $21.40 = 4.4x. The dividend adds about 3% a year.",

  // Slide 3. Three cards. What it does, how it makes money, who owns it.
  biz: [
    { h: "Widget plants", b: "Four plants, 1.2m units a year of capacity, running at 81%. Two are over twenty years old." },
    { h: "Service contracts", b: "Maintenance on the installed base. 28% of revenue and the only part with a recurring margin." },
    { h: "Founder owns 61%", b: "Free float is 39%. Net cash of $310m and no debt, which is 18% of the market value." },
  ],

  // Slide 4. Business model and revenue mix. The doughnut plus four unit economics stats.
  model: {
    title: "Business model: sell the box, earn on the service",
    mixTitle: "H1 revenue, $1.42bn",
    mix: [["Widgets", 1.02], ["Service and parts", 0.40]],
    rows: [
      { v: "$1,840", g: "+2.1%", h: "Average price a unit", b: "Price did the work this half. Volume was flat." },
      { v: "554k", g: "-1.4%", h: "Units shipped in H1", b: "One plant was down six weeks for a retool." },
      { v: "31.0%", g: "+0.8pp", h: "Service gross margin", b: "Three times the margin on a new box." },
      { v: "81%", g: "flat", h: "Capacity used", b: "Above 90% they need a new plant. That is $400m." },
    ],
    foot: "Revenue split is H1 by segment. Other segments were $4m. All figures invented for this example.",
  },

  // Slide 5. Financials. Revenue by quarter as bars, three headline stats.
  fin: {
    title: "Profit up 48%. Revenue barely moved.",
    quarters: ["Q1 24", "Q2 24", "Q3 24", "Q4 24", "Q1 25", "Q2 25"],
    revenue: [672, 690, 705, 640, 698, 722],
    chartTitle: "Quarterly revenue ($m)",
    note: "Q2 net profit was $96m, above any quarter of last year",
    stats: [
      { v: "+48.2%", l: "H1 net profit, $181m" },
      { v: "24.1%", l: "H1 gross margin, up from 22.9%" },
      { v: "$310m", l: "net cash, no debt" },
    ],
  },

  // Slide 6. Guidance and outlook. Three big numbers, then four dated items.
  guide: {
    title: "Guidance and outlook: one contract carries the year",
    big: [
      { v: "$180m", l: "capex guided for this year" },
      { v: "8%", l: "revenue growth guided, raised from 5%" },
      { v: "28%", l: "of revenue is now recurring service" },
    ],
    items: [
      { t: "1 Jul", h: "Fleet contract starts", b: "$240m over three years. About 6% of revenue a year, at group margin." },
      { t: "Sep", h: "Retool finished", b: "The plant is back. Management guides 1.3m units of capacity next year." },
      { t: "1 Jan", h: "Input tariff decision", b: "A 12% duty on imported steel is under review. It would cost about 2pp of margin." },
      { t: "Late Oct", h: "Q3 results", b: "The first quarter with the new contract fully in the numbers." },
    ],
  },

  // Slide 7. Why it moved. Five dated steps, then one kicker.
  why: {
    title: "Why the stock moved",
    steps: [
      { d: "Mar", m: "-18%", t: "Q4 missed on the plant retool and the order book fell 9%." },
      { d: "Apr", m: "$17.20", t: "The low. A broker cut the stock on capacity worries." },
      { d: "1 Jul", m: "Contract", t: "The fleet contract was announced and the whole sector re-rated." },
      { d: "4 Aug", m: "+48%", t: "H1 profit of $181m on better price and lower unit cost." },
      { d: "22 Sep", m: "-6%", t: "The tariff review leaked and the sector gave some back on 4x volume." },
    ],
    kicker: "The re-rating came from one contract. Since July the stock is up 31% and the sector is up 3%.",
  },

  // Slide 8. Weekly chart. Needs chart_ACME_W.png beside this file.
  weekly: {
    title: "Weekly chart: back at the top of a two year range",
    points: [
      { v: "+40%", l: "in 3 months, off the April low" },
      { v: "62", l: "weekly RSI. Not stretched" },
      { v: "$26.00", l: "the 52 week high, set a year ago" },
    ],
  },

  // Slide 9. Daily chart. Colours must match the lines drawn on chart_ACME_D.png.
  daily: {
    title: "Daily chart: mid range, just above all three averages",
    levels: [
      { c: "38BDF8", k: "Target", v: "$28.00", s: "above the 52 week high" },
      { c: "2ECC71", k: "Buy zone", v: "$21.00-21.80", s: "50 day average plus the September low" },
      { c: "EF4444", k: "Stop", v: "$19.90", s: "below the 200 day average" },
    ],
    reads: [
      "First support is $22.40. The 20 day average and the 38.2% retracement sit in the same place.",
      "Volume is 1.1x average, and only 40% of the last 20 days closed up.",
    ],
  },

  // Slide 10. Is it priced in. See docs/04-scenarios.md for the three tests.
  val: {
    title: "Priced in? The contract is. The returns are not.",
    cards: [
      { v: "+31% vs +3%", l: "ACME against the sector since the contract was announced" },
      { v: "11.2x · 0.9x", l: "P/E and price to book. The closest peer is 9.1x and 1.1x" },
      { v: "$26.40", l: "average analyst target, 10% above the price. Range $22 to $33" },
    ],
    verdict: "ACME earns 9% on equity. The peer earns 16%. The service segment is the only part that earns its cost of capital, and it is 28% of revenue.",
  },

  // Slide 11. Scenarios. Probabilities must sum to 1 and must not be equal.
  scen: [
    { k: "Bull", p: "30%", px: "$33.00", ch: "+37%", t: "The contract extends, the retooled plant lifts volume and the tariff is dropped. Profit near $420m at 12x." },
    { k: "Base", p: "45%", px: "$26.50", ch: "+10%", t: "Profit about $370m and the market keeps paying 11x. The dividend adds 3%." },
    { k: "Bear", p: "25%", px: "$19.00", ch: "-21%", t: "The tariff lands, margin gives up 2pp and volume stays flat. Profit back near $280m at 10x." },
  ],
  scenNote: "Speculation. Weighted value about $26.20, roughly 9% above today before dividends. Math: full year profit x P/E, divided by 142m shares.",

  // Slide 12. What would prove the call wrong. At least two, one in each direction.
  wrong: [
    "Q3 in late October shows unit volume up year on year with unit cost still falling.",
    "The steel tariff review is dropped, or lands below 5%.",
    "A weekly close above $26.00 on strong volume. The range breaks and I was too cautious.",
  ],
  catalyst: "Next catalyst: Q3 results in late October.",
  sources: "Sources: invented. This file is a layout fixture, not research.",
};
