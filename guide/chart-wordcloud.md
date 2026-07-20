```dgmo
wordcloud Pirate Skills

swordsmanship 95
navigation 88
seamanship 85
gunnery 80
leadership 75
cartography 70
intimidation 68
sailing 65
plundering 60
knot-tying 55
lookout 50
cooking 45
carpentry 40
fishing 35
```

## Overview

A word cloud sizes each term by its weight, so the terms that come up most stand out at a glance. Reach for it to summarize themes, tags, or the frequency of words across a body of feedback, survey responses, or documents — the point is the *texture* of "these themes dominate," not the numbers behind them. You can supply explicit weights, or paste raw text and let the chart count word frequencies for you.

**It does not support comparison.** Word size is an area encoding that the eye reads unreliably, and it is confounded by word length — a long word at a modest weight can look bigger than a short word at a high one. Ranking terms by apparent size is reading noise. **If anyone needs to rank the terms, or know which is bigger by how much, use [`bar`](chart-bar.md).**

## When to use

- **`wordcloud`** — the finding is "these themes keep coming up," and no one needs to read a value off the picture.
- **[`bar`](chart-bar.md)** — anyone needs to know which term is biggest, or by how much. Bar is the honest version of the same data.
- **[`pie`](chart-pie.md)** — the terms are categories that sum to a meaningful whole and the reader should read exact proportions.

## Syntax

```
wordcloud Chart Title
rotate none
max 50
size 14, 80

Word weight
```

## Directives

Written at the top level, one per line, after the `wordcloud Title` line.

| Directive | Effect |
| --------- | ------ |
| `rotate none \| mixed \| angled` | Word rotation. `none` is the default. |
| `max <N>` | Cap the number of words drawn. Must be greater than 0. |
| `size <min>, <max>` | Min and max font size in pixels. Defaults to `14, 80`. Both must be positive and `min` must be less than `max`. |

> **`size` takes a comma.** Both numbers go on one line separated by a comma — `size 14, 80`. The space-separated form (`size 14 80`) is not recognized and is silently dropped, leaving the default sizes in place with no warning. This is the one wordcloud option that is not space-separated.

## Data Format

Each data line assigns a weight to a word. Higher weights produce larger text:

```
swordsmanship 95
navigation 88
seamanship 85
```

## Body Text Mode

You can also paste raw text directly — the word cloud will count word frequencies automatically. Common stop words (a, the, is, etc.) are filtered out.

```dgmo
wordcloud Gettysburg Address

Four score and seven years ago our fathers brought forth
on this continent a new nation conceived in Liberty and
dedicated to the proposition that all men are created equal.
Now we are engaged in a great civil war testing whether
that nation or any nation so conceived and so dedicated
can long endure.
```

## Appearance

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |

Words cycle through the active palette's colors, and weight drives font size, not hue — color here is decoration, not a second data channel. See [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

A word cloud draws words rather than filled shapes, so the universal fill family (`fill-tint` / `fill-solid` / `fill-outline`) has no effect, and there is no legend for `no-legend` to suppress.

## Common mistakes

- **Word size is not a reliable comparison.** Area encoding is confounded by word length, so ranking terms by apparent size is reading noise. Use [`bar`](chart-bar.md) when the ordering is the finding.
- **A trailing `//` note drops the word entirely, with no diagnostic.** Count the words in the render against the words you wrote.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`pie`](chart-pie.md)
- **Then:** [Colors & palettes](colors.md)
