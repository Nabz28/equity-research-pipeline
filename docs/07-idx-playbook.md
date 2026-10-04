# Indonesian market mechanics

Market specific, and almost none of it shows up in a screen. On Indonesian small caps the
board a stock trades on matters more than its valuation, because it decides whether you
can get out.

## Getting the filings

The exchange's own static PDFs and most of the financial news sites refuse automated
requests. Do not spend turns retrying them. What works:

- **Quarterly statements**, any listed ticker, from a broker mirror with a guessable path
  of the form `.../LAPORAN KEUANGAN/<year>/q<n>/<TICKER>_Q<n>_<year>.pdf`, fetched with a
  normal browser user agent and no auth. These are the full audited notes, so land areas,
  appraisal ranges and segment splits are all in them.
- **Annual reports** from the company's own site, not the exchange.
- **Investor decks**: fetch the investor relations landing page to get the hashed PDF
  filenames, then fetch those directly.
- **Prices**: the chart platform, with the timeframe set first.
- **Cross-check on multiples and consensus**: a public screener, with the date recorded.

Read the PDFs with PyMuPDF. Write the extracted text to a file with utf-8 encoding before
printing any of it, or a Windows console in a legacy code page kills the script partway
through on a single bullet glyph.

## The special monitoring board

A stock suspended for more than one trading day on price activity gets moved to the
special monitoring board and into full call auction, with a band of roughly ten percent
and no continuous trading. There is no continuous exit from there.

A run of daily closes at exactly nine or ten percent is the fingerprint of a call auction
mark-up, not of genuine demand. Check which board the stock is on before reading the tape.

Band rules change. When they do, every thin name reprices, and a rally into the change date
is most likely front-running the rule rather than reacting to news. Check the current
band and minimum price rules before writing anything about how far a small cap can fall.

## Reading the register

- Holders parked at 4.6 to 4.95 percent are deliberate. Five percent is the disclosure
  threshold. A cluster of them is one group, not six investors.
- Serial vehicles rotate between names and always disclose "capital gain" and "not a
  controller", which keeps them under the tender offer rules.
- Free float after a build like that can be under twenty percent, and weekly volume can
  exceed the entire float. Price is then set by the register, not by fundamentals.
- Coming off the high shareholding concentration list is reported as good news. It usually
  means the controller just sold down.

## Authorised capital is the tell for a shell play

Compare issued shares with the authorised number in the equity note. When the headroom is
small, a large asset injection needs a shareholder meeting to raise authorised capital
first. The meeting notice arrives before the deal, so it is the earliest tradeable signal.

## Takeovers and the tender floor

The mandatory tender offer price is at least the higher of the average daily high over the
90 calendar days before the announcement, and the price the acquirer paid. The window locks
on announcement.

Three consequences:

1. Dumping the price after the announcement does not lower the tender price for that
   announcement. A "crush it to tender cheap" thesis needs a later, separate announcement.
2. Buyers avoid the tender entirely by staying below control. Taking 30 percent while the
   old owners keep more than that triggers nothing. The tell is board seats and whether any
   filing uses the word controller.
3. Above roughly 80 percent ownership there is a refloat obligation, which caps how much
   a buyer wants in the first place.

Also price the tax and the venue. A negotiated block trade carries a small final tax on
the sale value, which changes what a seller nets and therefore what price they accept.
