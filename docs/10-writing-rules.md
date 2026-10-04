# Writing rules

Plain and blunt. Short sentences, around fifteen words. Simple words. Say the fact, then
what it means, then what to do. `tools/lint_note.py` enforces the mechanical parts.

## The rules

**1. One idea per sentence.** Aim for fifteen words. Break anything longer in two.

**2. No clever contrast lines.** This is the main thing to unlearn. Never write "X, not Y"
to sound sharp. Say the thing once, plainly.

| Do not write | Write |
|---|---|
| We include it to close the search, not to open a position. | We list it so you know we checked. Do not buy it. |
| It is a scarcity mechanic, not a valuation signal. | The float is tiny. That is why the price jumps. It says nothing about value. |
| The listing is the exit, not the entry. | Sell into the listing. Do not buy it. |
| Buying it is a narrative with no cash flow behind it. | You would be buying a story. There are no earnings in it. |

**3. Simple words.** Precision nobody understands is not precision.

| Do not write | Write |
|---|---|
| materiality | does it matter, is it big enough |
| dislocation | this is cheap and that is expensive |
| idiosyncratic move | the stock's own move |
| structural, mechanism, residual, persistence | say what actually happens |

**4. Say the number, then what it means for money.** Gold is 16% below its January peak.
So this is a recovery.

**5. Lead with the answer.** Every section starts with the conclusion. Evidence after.

**6. No em dashes.** Ever. Use a full stop.

## The register

> The company builds its own motors and gears. It does not buy them from Japan. All its
> suppliers are small domestic firms. It spends $103m a year on parts. Its biggest supplier
> gets $4m of that. That is too small to matter to any listed company. So do not buy the
> Japanese component maker on this news. There is no money in it for them.

The same content written to sound clever makes the reader decode it. That is the failure.

## The linter

```bash
python tools/lint_note.py note.html
```

It checks em dashes, a banned word list, a banned phrase list, the clever contrast
pattern, the average sentence length, and any sentence over 25 words. It exits non zero
when it finds something, so it drops into a pre delivery check easily.

It only catches mechanical failures. The real test is reading it out loud.
