"""Check a draft note against the house voice rules before it goes out.

    python lint_note.py <file.md|file.html>
    cat note.txt | python lint_note.py

Style: plain and blunt. Short sentences, simple words,
fact then meaning then action. No clever contrast lines.
"""
import re
import sys

BAD_WORDS = [
    "percentile", "sigma", "z-score", "basis points", "regime",
    "materiality", "dislocation", "idiosyncratic", "capitalisation rate",
    "identification", "residual", "persistence", "structural",
]
BAD_PHRASES = [
    "load-bearing", "does not survive", "worth noting", "that said",
    "crucially", "fundamentally", "at its core", "it is important to note",
    "decoration", "in the current environment", "navigate", "delve",
]
# "X, not Y" contrast constructions. See docs/10-writing-rules.md.
CONTRAST = re.compile(r",\s+not\s+(a|an|the|to|because|from|by|on|in|its|his|her|their)\b", re.I)


def strip_markup(text):
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
    text = re.sub(r"<script.*?</script>", " ", text, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"&[a-z]+;", " ", text)
    return re.sub(r"\s+", " ", text)


def main():
    if len(sys.argv) > 1:
        raw = open(sys.argv[1], encoding="utf-8").read()
        label = sys.argv[1]
    else:
        raw = sys.stdin.read()
        label = "stdin"
    text = strip_markup(raw) if "<" in raw[:400] else raw
    low = text.lower()
    problems = []

    em = text.count("—")
    if em:
        problems.append("%d em dash(es). Remove every one." % em)

    for w in BAD_WORDS:
        n = low.count(w)
        if n:
            problems.append('banned word "%s" x%d. Use a plain word.' % (w, n))
    for w in BAD_PHRASES:
        n = low.count(w)
        if n:
            problems.append('banned phrase "%s" x%d.' % (w, n))

    for m in CONTRAST.finditer(text):
        s = max(0, m.start() - 60)
        problems.append('clever contrast line: "...%s..." Say it once, plainly.'
                        % text[s:m.end() + 20].strip())

    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if len(s.strip()) > 3]
    lengths = [len(s.split()) for s in sentences]
    if lengths:
        avg = sum(lengths) / len(lengths)
        longs = [s for s, n in zip(sentences, lengths) if n > 25]
        print("%s: %d sentences, %.1f words average" % (label, len(sentences), avg))
        if avg > 18:
            problems.append("average sentence %.1f words. Target 15. Break them up." % avg)
        for s in longs[:6]:
            problems.append("sentence over 25 words: %s..." % s[:90])

    print()
    if problems:
        print("FIX %d:" % len(problems))
        for p in problems:
            print("  -", p)
        sys.exit(1)
    print("PASS: reads plain and blunt.")


if __name__ == "__main__":
    main()
