```dgmo
slope Pirate Fleet Strength: 1715 vs 1725

period 1715 1725

Blackbeard 40 4
Bartholomew Roberts 12 52
Charles Vane 20 2
Anne Bonny 8 15
Calico Jack 18 6
```

## Overview

A slope chart connects a "before" and an "after" with one line per item, so rises, falls, and rank changes jump out without anyone reading a number. Reach for it when you want to compare many items across exactly two moments — who rose, who fell, and who traded places. Only the first and last period are drawn, so the chart says nothing about what happened in between.

## When to use

- **`slope`** — you have a before and an after, and the point is how each item *moved* between them.
- **[`line`](chart-line.md)** — you have readings at many points in time and the path between them matters.
- **[`bar`](chart-bar.md)** — you only care about current sizes, not the movement between two moments.

Slope draws only the first and last period. On data with meaningful intermediate movement it hides reversals entirely — a metric that crashed mid-period and recovered renders as a flat, healthy line. If the middle of the story matters, use [`line`](chart-line.md).

## Syntax

```
slope Chart Title

period Period1 Period2

Label value1 value2
```

For multi-token period labels, use an indented block:

```
period
  Before COVID
  After COVID
```

## Data Format

The `period` directive defines the period labels (minimum 2 required). Data rows are space-separated with no colons:

```
period 2020 2025

Product A 40 80
Product B 70 30
```

Lines slope upward for increases and downward for decreases.

Two periods is the common case, but `period` accepts more. Each data row must then carry one value per period, and the chart still draws a straight segment between consecutive periods:

```
period 1715 1720 1725

Blackbeard 40 22 4
```

## Color Annotations

Append a color name (lowercase) after the label to set a custom color. The color token sits between the label and the values:

```
Blackbeard blue 40 4
```

## Numeric Values

Values are space-separated and written without thousands commas: `Revenue 1000 2500`. Underscores may be used as digit-group separators if desired (`Revenue 1_000 2_500`).

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Slope shows only the first and last period.** A metric that crashed mid-year and recovered draws as a flat, healthy line. If the movement between endpoints is part of the finding, use [`line`](chart-line.md).
- **The color token goes before the values, not after.** Written after them the row has no numbers left to read and is dropped with a warning about the value count.
- **A series name ending in a digit merges with its first value.** Quote the name.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`line`](chart-line.md) · [`bar`](chart-bar.md)
- **Then:** [Colors & palettes](colors.md)
