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

## Shared scale — `y-axis` range and `log`

Slope charts fit their vertical range to the data, so two charts side by side
use different scales. Fix the range to compare them honestly:

```dgmo
slope Fleet Strength

period 1715 1725
y-axis 0..60

Blackbeard 40 4
Roberts 12 52
```

`y-axis log` spaces (a range goes first: `y-axis 1..1000 log`). It spaces the lines by ratio instead of difference.

## Number format — `format`, `unit`, `locale`

Every number the chart prints takes the same format:
`format currency USD` ($1,200), `format percent 1` (12.5% — values as
written), `format compact` (1.2M), or a quoted pattern such as
`format ",.2f"`. Add `unit ms` for text after each number and `locale de-DE`
for that locale's separators.

## Annotate — `marker`, `band` and `note`

`marker y 50 Target` draws a dashed line at a value and `band 20..30 Usual` shades a value range. Periods are usually years, so a value `marker` names its axis with `y`. A `note` indented under a series row rings that line at a period and writes beside it; it starts with the period: `  note 2025 Overtakes Go` under `Rust 20 62`. `no-notes` hides every note.

Before:

```dgmo
slope Language Popularity
period 2020 2025

Rust 20 62
Go 45 55
Java 70 48
```

After:

```dgmo
slope Language Popularity
period 2020 2025

marker y 50 Half of teams

Rust 20 62
  note 2025 Overtakes Go
Go 45 55
Java 70 48
```

## Highlight one item — story view

Indent a `highlight` line under a series row to put that series in the spotlight. It keeps its own colour, drawn solid and on top. Every other series turns grey, including its line, points and labels. Put a `highlight` under each series you want lit. A colour word paints the subject: `highlight orange`.

Before:

```dgmo
slope Programming Language Popularity

period 2020 2022 2025

Python 3 1 1
JavaScript 1 2 2
Rust 18 12 5
Go 10 8 7
```

After:

```dgmo
slope Programming Language Popularity

period 2020 2022 2025

Python 3 1 1
JavaScript 1 2 2
Rust 18 12 5
  highlight orange
Go 10 8 7
```

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
