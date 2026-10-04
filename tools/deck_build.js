// Generic 12 slide single stock deck. Layout is fixed. Only the data file changes.
//
//   node deck_build.js example_data.js
//
// Chart images are read from this directory as chart_<TICKER>_W.png and chart_<TICKER>_D.png.
// Output goes to $DECK_OUT, or ~/Downloads.
// See ../docs/08-deck-pipeline.md for the slide contract and the font size trap.
const pptxgen = require("pptxgenjs");
const path = require("path");
const os = require("os");

const OUT = process.env.DECK_OUT || path.join(os.homedir(), "Downloads");
const BG = "0D1117", CARD = "161B22", CARD2 = "1F2630", WHITE = "FFFFFF", MUTED = "9AA4B2", SOFT = "C9D1D9";
const GREEN = "22C55E", RED = "EF4444", CYAN = "38BDF8";
const FONT = "Arial";
const W = 13.333, M = 0.6, CW = W - 2 * M;
const fit = (v, base, width) => Math.min(base, Math.floor((width * 72) / (String(v).length * 0.6)));


const dataFile = process.argv[2] || "./example_data.js";
const d = require(path.resolve(process.cwd(), dataFile));

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = `${d.ticker} ${d.name}`;
const fs = require("fs");
const img = (k) => path.join(__dirname, `chart_${d.ticker}_${k}.png`);
// Missing screenshot: draw a labelled placeholder instead of failing the build.
function chartImg(s, k, x, y, w, h) {
  const f = img(k);
  if (fs.existsSync(f)) return s.addImage({ path: f, x, y, w, h });
  card(s, x, y, w, h, CARD2);
  txt(s, `chart_${d.ticker}_${k}.png not found`, { x, y: y + h / 2 - 0.2, w, h: 0.4, fontSize: 14, color: MUTED, align: "center" });
}
let n = 0;

function txt(s, t, o) { s.addText(t, Object.assign({ fontFace: FONT, color: WHITE, margin: 0, isTextBox: true, valign: "top" }, o)); }
function card(s, x, y, w, h, fill, line) {
  s.addShape("roundRect", { x, y, w, h, fill: { color: fill || CARD }, line: { color: line || fill || CARD, width: line ? 1.5 : 0.75 }, rectRadius: 0.1 });
}
function arrow(s, x, y, w, h, color) { s.addShape("line", { x, y, w, h, line: { color: color || MUTED, width: 2.25, endArrowType: "triangle" } }); }
function header(s, title) {
  n++;
  s.background = { color: BG };
  txt(s, `${d.ticker}  ·  ${d.name}`, { x: M, y: 0.35, w: 8, h: 0.3, fontSize: 13, bold: true, color: d.accent, charSpacing: 1 });
  txt(s, title, { x: M, y: 0.68, w: CW, h: 0.75, fontSize: 30, bold: true });
  txt(s, String(n), { x: W - M - 0.6, y: 7.05, w: 0.6, h: 0.25, fontSize: 11, color: MUTED, align: "right" });
}
function foot(s, t) { txt(s, t, { x: M, y: 7.05, w: 11.3, h: 0.25, fontSize: 10, color: "6B7280" }); }

// 1 cover
{
  const s = pres.addSlide(); n++;
  s.background = { color: BG };
  chartImg(s, "W", 5.85, 1.15, 6.883, 4.508);
  txt(s, d.deskLine || "RESEARCH NOTE", { x: M, y: 0.55, w: 5, h: 0.3, fontSize: 13, bold: true, color: MUTED, charSpacing: 2 });
  txt(s, d.ticker, { x: M, y: 1.1, w: 5.2, h: 1.5, fontSize: 104, bold: true, color: d.accent });
  txt(s, d.name, { x: M, y: 2.72, w: 5.2, h: 0.6, fontSize: 30, bold: true });
  txt(s, d.tagline, { x: M, y: 3.42, w: 4.9, h: 1.3, fontSize: 18, color: "D1D5DB" });
  card(s, M, 4.95, 1.72, 1.2);
  txt(s, "Price 2 Oct", { x: M + 0.18, y: 5.06, w: 1.4, h: 0.28, fontSize: 12, color: MUTED });
  txt(s, d.price, { x: M + 0.18, y: 5.34, w: 1.45, h: 0.55, fontSize: 24, bold: true });
  card(s, M + 1.9, 4.95, 1.72, 1.2);
  txt(s, d.retLabel, { x: M + 2.08, y: 5.06, w: 1.4, h: 0.28, fontSize: 12, color: MUTED });
  txt(s, d.ret, { x: M + 2.08, y: 5.34, w: 1.45, h: 0.55, fontSize: 24, bold: true, color: GREEN });
  card(s, M + 3.8, 4.95, 1.72, 1.2);
  txt(s, "Dividend", { x: M + 3.98, y: 5.06, w: 1.4, h: 0.28, fontSize: 12, color: MUTED });
  txt(s, "5.6%", { x: M + 3.98, y: 5.34, w: 1.45, h: 0.55, fontSize: 24, bold: true });
  card(s, M, 6.3, 5.52, 0.75, d.accent);
  txt(s, d.callShort, { x: M, y: 6.3, w: 5.52, h: 0.75, fontSize: 20, bold: true, color: BG, align: "center", valign: "middle" });
}

// 2 short answer
{
  const s = pres.addSlide();
  header(s, "The short answer");
  txt(s, d.callShort, { x: M, y: 1.65, w: CW, h: 0.9, fontSize: 46, bold: true, color: d.accent });
  txt(s, d.callLine, { x: M, y: 2.62, w: CW, h: 0.6, fontSize: 23, color: "D1D5DB" });
  const items = [["Buy at", d.plan.entry, GREEN], ["Target", d.plan.target, CYAN], ["Stop loss", d.plan.stop, RED], ["Horizon", d.plan.horizon, WHITE]];
  const cw = (CW - 3 * 0.3) / 4;
  items.forEach(([l, v, c], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 3.55, cw, 2.35);
    txt(s, l, { x: x + 0.3, y: 3.85, w: cw - 0.6, h: 0.4, fontSize: 18, color: MUTED });
    txt(s, v, { x: x + 0.3, y: 4.45, w: cw - 0.6, h: 1.0, fontSize: fit(v, 34, cw - 0.6), bold: true, color: c });
  });
  txt(s, `Call: ${d.callWord}.  ${d.planNote}`, { x: M, y: 6.25, w: CW, h: 0.4, fontSize: 16, color: MUTED });
}

// 3 what is this company
{
  const s = pres.addSlide();
  header(s, "What is this company?");
  const cw = (CW - 2 * 0.35) / 3;
  d.biz.forEach((b, i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 1.75, cw, 4.95);
    s.addShape("ellipse", { x: x + 0.4, y: 2.1, w: 0.8, h: 0.8, fill: { color: d.accent }, line: { color: d.accent } });
    txt(s, `0${i + 1}`, { x: x + 0.4, y: 2.1, w: 0.8, h: 0.8, fontSize: 22, bold: true, color: BG, align: "center", valign: "middle" });
    txt(s, b.h, { x: x + 0.4, y: 3.2, w: cw - 0.8, h: 0.9, fontSize: fit(b.h, 28, cw - 0.8), bold: true });
    txt(s, b.b, { x: x + 0.4, y: 4.2, w: cw - 0.8, h: 2.4, fontSize: 18, color: SOFT, lineSpacingMultiple: 1.1 });
  });
}

// 4 business model and mix
{
  const s = pres.addSlide();
  header(s, d.model.title);
  const lw = 5.2;
  card(s, M, 1.6, lw, 5.25);
  txt(s, d.model.mixTitle, { x: M + 0.35, y: 1.8, w: lw - 0.7, h: 0.35, fontSize: 16, bold: true });
  const pal = [d.accent, "F1F5F9", "64748B"];
  const total = d.model.mix.reduce((a, m) => a + m[1], 0);
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Mix", labels: d.model.mix.map(m => m[0]), values: d.model.mix.map(m => m[1]) }], {
    x: M + 1.05, y: 2.2, w: 3.1, h: 2.9, holeSize: 58, chartColors: pal.slice(0, d.model.mix.length),
    showLegend: false, showValue: false, showPercent: false, showLabel: false, showTitle: false,
    dataBorder: { pt: 1.5, color: CARD },
  });
  d.model.mix.forEach((m, i) => {
    const y = 5.35 + i * 0.4;
    s.addShape("roundRect", { x: M + 0.35, y: y + 0.08, w: 0.2, h: 0.2, fill: { color: pal[i] }, line: { color: pal[i] }, rectRadius: 0.03 });
    txt(s, m[0], { x: M + 0.7, y, w: 2.9, h: 0.34, fontSize: 13, color: SOFT, valign: "middle" });
    txt(s, `Rp${m[1]}T`, { x: M + 3.3, y, w: 0.95, h: 0.34, fontSize: 13, bold: true, align: "right", valign: "middle" });
    txt(s, `${Math.round((m[1] / total) * 100)}%`, { x: M + 4.25, y, w: 0.6, h: 0.34, fontSize: 13, color: MUTED, align: "right", valign: "middle" });
  });
  const gx = M + lw + 0.3, gw = W - M - gx, cw2 = (gw - 0.25) / 2, ch2 = 2.5;
  d.model.rows.forEach((r, i) => {
    const x = gx + (i % 2) * (cw2 + 0.25), y = 1.6 + Math.floor(i / 2) * (ch2 + 0.25);
    card(s, x, y, cw2, ch2);
    txt(s, r.v, { x: x + 0.3, y: y + 0.25, w: cw2 - 1.6, h: 0.6, fontSize: fit(r.v, 30, cw2 - 1.6), bold: true, color: d.accent, valign: "middle" });
    const pc = r.g.startsWith("+") ? GREEN : r.g.startsWith("-") ? RED : CARD2;
    const tc = (pc === CARD2) ? WHITE : BG;
    s.addShape("roundRect", { x: x + cw2 - 1.3, y: y + 0.33, w: 1.0, h: 0.42, fill: { color: pc }, line: { color: pc }, rectRadius: 0.2 });
    txt(s, r.g, { x: x + cw2 - 1.3, y: y + 0.33, w: 1.0, h: 0.42, fontSize: 14, bold: true, color: tc, align: "center", valign: "middle" });
    txt(s, r.h, { x: x + 0.3, y: y + 0.95, w: cw2 - 0.6, h: 0.38, fontSize: fit(r.h, 18, cw2 - 0.6), bold: true });
    txt(s, r.b, { x: x + 0.3, y: y + 1.42, w: cw2 - 0.6, h: 1.0, fontSize: 14, color: SOFT });
  });
  txt(s, d.model.foot, { x: M, y: 6.95, w: 11.3, h: 0.3, fontSize: 11, color: MUTED });
}

// 5 financials
{
  const s = pres.addSlide();
  header(s, d.fin.title);
  card(s, M, 1.65, 7.7, 5.05);
  s.addChart(pres.charts.BAR, [{ name: "Revenue", labels: d.fin.quarters, values: d.fin.revenue }], {
    x: M + 0.2, y: 1.8, w: 7.3, h: 4.45, barDir: "col", chartColors: [d.accent], barGapWidthPct: 45,
    showTitle: true, title: d.fin.chartTitle || "Quarterly revenue", titleColor: WHITE, titleFontSize: 16, titleFontFace: FONT,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: WHITE, dataLabelFontSize: 13, dataLabelFontFace: FONT,
    dataLabelFormatCode: "#,##0",
    catAxisLabelColor: MUTED, catAxisLabelFontSize: 13, catAxisLabelFontFace: FONT, catAxisLineShow: false,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, valAxisMinVal: 0,
  });
  txt(s, d.fin.note, { x: M + 0.3, y: 6.28, w: 7.1, h: 0.3, fontSize: 12, color: MUTED });
  d.fin.stats.forEach((st, i) => {
    const y = 1.65 + i * 1.75;
    card(s, 8.6, y, W - M - 8.6, 1.55);
    txt(s, st.v, { x: 8.9, y: y + 0.18, w: 3.6, h: 0.7, fontSize: fit(st.v, 36, 3.5), bold: true, color: d.accent });
    txt(s, st.l, { x: 8.9, y: y + 0.9, w: 3.6, h: 0.55, fontSize: 15, color: SOFT });
  });
}

// 6 guidance and outlook
{
  const s = pres.addSlide();
  header(s, d.guide.title);
  const lw = 4.3;
  d.guide.big.forEach((b, i) => {
    const y = 1.6 + i * 1.8;
    card(s, M, y, lw, 1.6);
    txt(s, b.v, { x: M + 0.35, y: y + 0.2, w: lw - 0.7, h: 0.7, fontSize: fit(b.v, 36, lw - 0.7), bold: true, color: d.accent, valign: "middle" });
    txt(s, b.l, { x: M + 0.35, y: y + 0.95, w: lw - 0.7, h: 0.55, fontSize: 14, color: SOFT });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  d.guide.items.forEach((it, i) => {
    const y = 1.6 + i * 1.33;
    card(s, rx, y, rw, 1.18);
    s.addShape("roundRect", { x: rx + 0.3, y: y + 0.36, w: 1.45, h: 0.46, fill: { color: d.accent }, line: { color: d.accent }, rectRadius: 0.2 });
    txt(s, it.t, { x: rx + 0.3, y: y + 0.36, w: 1.45, h: 0.46, fontSize: fit(it.t, 14, 1.3), bold: true, color: BG, align: "center", valign: "middle" });
    txt(s, it.h, { x: rx + 2.05, y: y + 0.15, w: rw - 2.35, h: 0.38, fontSize: 18, bold: true });
    txt(s, it.b, { x: rx + 2.05, y: y + 0.53, w: rw - 2.35, h: 0.6, fontSize: 14, color: SOFT });
  });
  foot(s, d.sources);
}

// 7 why it moved
{
  const s = pres.addSlide();
  header(s, d.why.title);
  const k = d.why.steps.length, cw = (CW - (k - 1) * 0.28) / k;
  d.why.steps.forEach((st, i) => {
    const x = M + i * (cw + 0.28);
    card(s, x, 1.7, cw, 3.9);
    txt(s, st.d, { x: x + 0.25, y: 1.95, w: cw - 0.5, h: 0.32, fontSize: 15, bold: true, color: MUTED });
    txt(s, st.m, { x: x + 0.25, y: 2.33, w: cw - 0.5, h: 0.75, fontSize: fit(st.m, 36, cw - 0.5), bold: true, color: d.accent });
    txt(s, st.t, { x: x + 0.25, y: 3.2, w: cw - 0.5, h: 2.2, fontSize: 15, color: SOFT });
    if (i < k - 1) arrow(s, x + cw + 0.02, 1.7 + 3.9 / 2, 0.24, 0, MUTED);
  });
  card(s, M, 5.85, CW, 0.95, CARD2);
  txt(s, d.why.kicker, { x: M + 0.35, y: 5.85, w: CW - 0.7, h: 0.95, fontSize: 20, bold: true, valign: "middle" });
}

// 8 weekly chart
{
  const s = pres.addSlide();
  header(s, d.weekly.title);
  chartImg(s, "W", M, 1.55, 8.4, 5.5);
  d.weekly.points.forEach((p, i) => {
    const y = 1.55 + i * 1.9;
    card(s, 9.3, y, W - M - 9.3, 1.7);
    txt(s, p.v, { x: 9.6, y: y + 0.2, w: 2.9, h: 0.8, fontSize: fit(p.v, 42, 2.9), bold: true, color: d.accent });
    txt(s, p.l, { x: 9.6, y: y + 1.0, w: 2.9, h: 0.6, fontSize: 15, color: SOFT });
  });
}

// 9 daily chart
{
  const s = pres.addSlide();
  header(s, d.daily.title);
  chartImg(s, "D", M, 1.55, 8.4, 5.5);
  const x0 = 9.3, pw = W - M - x0;
  d.daily.levels.forEach((lv, i) => {
    const y = 1.55 + i * 1.2;
    card(s, x0, y, pw, 1.1);
    s.addShape("roundRect", { x: x0 + 0.25, y: y + 0.37, w: 0.36, h: 0.36, fill: { color: lv.c }, line: { color: lv.c }, rectRadius: 0.05 });
    txt(s, lv.k, { x: x0 + 0.8, y: y + 0.1, w: pw - 1.0, h: 0.28, fontSize: 13, color: MUTED });
    txt(s, lv.v, { x: x0 + 0.8, y: y + 0.36, w: pw - 1.0, h: 0.42, fontSize: fit(lv.v, 24, pw - 1.0), bold: true });
    txt(s, lv.s, { x: x0 + 0.8, y: y + 0.78, w: pw - 1.0, h: 0.26, fontSize: 11, color: MUTED });
  });
  card(s, x0, 5.2, pw, 1.85, CARD2);
  const runs = d.daily.reads.map((r, i) => ({ text: r, options: { bullet: true, breakLine: i < d.daily.reads.length - 1, paraSpaceAfter: 8 } }));
  txt(s, runs, { x: x0 + 0.2, y: 5.32, w: pw - 0.4, h: 1.65, fontSize: 13, color: WHITE });
}

// 10 priced in
{
  const s = pres.addSlide();
  header(s, d.val.title);
  const cw = (CW - 2 * 0.35) / 3;
  d.val.cards.forEach((c, i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 1.75, cw, 3.05);
    txt(s, c.v, { x: x + 0.35, y: 2.05, w: cw - 0.7, h: 1.0, fontSize: fit(c.v, 40, cw - 0.7), bold: true, color: d.accent, valign: "middle" });
    txt(s, c.l, { x: x + 0.35, y: 3.2, w: cw - 0.7, h: 1.4, fontSize: 18, color: SOFT });
  });
  card(s, M, 5.1, CW, 1.65, CARD2);
  txt(s, d.val.verdict, { x: M + 0.4, y: 5.1, w: CW - 0.8, h: 1.65, fontSize: 19, bold: true, valign: "middle" });
  foot(s, d.sources);
}

// 11 scenarios
{
  const s = pres.addSlide();
  header(s, "Up or down? Three 12-month scenarios");
  const cols = { Bull: GREEN, Base: WHITE, Bear: RED };
  const cw = (CW - 2 * 0.35) / 3;
  d.scen.forEach((sc, i) => {
    const x = M + i * (cw + 0.35), c = cols[sc.k];
    card(s, x, 1.7, cw, 4.55);
    txt(s, sc.k, { x: x + 0.35, y: 1.95, w: 2, h: 0.5, fontSize: 24, bold: true, color: c });
    s.addShape("roundRect", { x: x + cw - 1.45, y: 1.98, w: 1.1, h: 0.45, fill: { color: CARD2 }, line: { color: CARD2 }, rectRadius: 0.2 });
    txt(s, sc.p, { x: x + cw - 1.45, y: 1.98, w: 1.1, h: 0.45, fontSize: 16, bold: true, align: "center", valign: "middle" });
    txt(s, sc.px, { x: x + 0.35, y: 2.6, w: cw - 0.7, h: 0.9, fontSize: fit(sc.px, 46, cw - 0.7), bold: true });
    txt(s, sc.ch, { x: x + 0.35, y: 3.6, w: 2.6, h: 0.45, fontSize: 22, bold: true, color: c });
    txt(s, sc.t, { x: x + 0.35, y: 4.25, w: cw - 0.7, h: 1.9, fontSize: 16, color: SOFT });
  });
  txt(s, d.scenNote, { x: M, y: 6.4, w: CW, h: 0.55, fontSize: 14, color: MUTED });
}

// 12 recommendation
{
  const s = pres.addSlide();
  header(s, "Recommendation");
  const lw = 6.1;
  card(s, M, 1.65, lw, 5.15);
  txt(s, d.callShort, { x: M + 0.4, y: 1.9, w: lw - 0.8, h: 0.7, fontSize: fit(d.callShort, 30, lw - 0.8), bold: true, color: d.accent });
  const rows = [["Buy at", d.plan.entry, GREEN], ["Target", d.plan.target, CYAN], ["Stop loss", d.plan.stop, RED], ["Horizon", d.plan.horizon, WHITE]];
  rows.forEach(([l, v, c], i) => {
    const y = 2.85 + i * 0.9;
    txt(s, l, { x: M + 0.4, y: y + 0.12, w: 2.2, h: 0.5, fontSize: 20, color: MUTED });
    txt(s, v, { x: M + 2.6, y, w: lw - 3.0, h: 0.7, fontSize: fit(v, 30, lw - 3.0), bold: true, color: c, align: "right" });
  });
  txt(s, d.planNote, { x: M + 0.4, y: 6.35, w: lw - 0.8, h: 0.35, fontSize: 13, color: MUTED });
  const rx = M + lw + 0.35, rw = W - M - rx;
  card(s, rx, 1.65, rw, 3.95, CARD2);
  txt(s, "What would prove me wrong", { x: rx + 0.35, y: 1.9, w: rw - 0.7, h: 0.5, fontSize: 22, bold: true });
  const runs = d.wrong.map((r, i) => ({ text: r, options: { bullet: true, breakLine: i < d.wrong.length - 1, paraSpaceAfter: 10 } }));
  txt(s, runs, { x: rx + 0.35, y: 2.55, w: rw - 0.7, h: 2.9, fontSize: 17, color: SOFT });
  card(s, rx, 5.85, rw, 0.95, d.accent);
  txt(s, d.catalyst, { x: rx + 0.35, y: 5.85, w: rw - 0.7, h: 0.95, fontSize: 18, bold: true, color: BG, valign: "middle" });
}

const file = path.join(OUT, `${d.ticker}_Deck.pptx`);
pres.writeFile({ fileName: file }).then(() => console.log("wrote", file, n, "slides"));
