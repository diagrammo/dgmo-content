```dgmo
slope Pirate Fleet Strength: 1715 vs 1725

period
  1715
  1725

Blackbeard red           40  4
Bartholomew Roberts blue 12 52
Charles Vane orange      20  2
Anne Bonny green          8 15
Calico Jack purple       18  6
```

## Overview

A slope chart connects a "before" and an "after" with one line per item, so rises, falls, and rank changes jump out without anyone reading a number. Reach for it when you want to compare many items across a few moments — who rose, who fell, and who traded places. Add `rank` and the same rows draw a bump chart: positions over time, 1 at the top.

## When to use

- **`slope`** — you have a before and an after, and the point is how each item *moved* between them.
- **`slope` with `rank`** — your numbers are positions (1st, 2nd, 3rd) and the point is who overtook whom.
- **[`line`](chart-line.md)** — you have readings at many points in time and the path between them matters.
- **[`bar`](chart-bar.md)** — you only care about current sizes, not the movement between two moments.
- **[`dot`](chart-dot.md)** — many items with a before and an after, where the gap matters more than the crossing lines.

Slope draws only the periods you list. With just a first and a last, it hides every reversal between them — a metric that crashed mid-period and recovered renders as a flat, healthy line. If the middle of the story matters, list more periods or use [`line`](chart-line.md).

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

## Rank over time — `rank` (bump chart)

Add a bare `rank` line and each value is a **position** as written: 1 is first. The chart puts position 1 at the top with one row per position and no value axis. Each dot shows its position number, each name sits at both ends in its colour, and each segment is a smooth S-curve, so a crossing reads as a swap.

```dgmo
slope Pirate Fleet Rankings, 1715–1720
rank

period 1715 1716 1717 1718 1719 1720

Blackbeard red           1 1 2 3 5 5
Bartholomew Roberts blue 5 4 3 1 1 1
Charles Vane orange      2 2 1 2 3 4
Anne Bonny green         4 5 5 4 2 2
Calico Jack purple       3 3 4 5 4 3
```

- **Write positions, not scores.** Every value must be a whole number from 1. Anything else is an error naming the row and period, and that row is dropped. `rank` does not turn raw values into positions.
- **Ties are allowed.** Two items with the same position in one period sit side by side on that row.
- **`y-axis` has no effect** under `rank` and warns. Positions set the rows.

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

- **Two periods hide the middle.** A metric that crashed mid-year and recovered draws as a flat, healthy line. If the movement between endpoints is part of the finding, list more periods or use [`line`](chart-line.md).
- **Under `rank`, a value is a position.** `Arsenal 82 85` is not points; it asks for 82nd and 85th place. Convert scores to positions first.
- **The color token goes before the values, not after.** Written after them the row has no numbers left to read and is dropped with a warning about the value count.
- **A series name ending in a digit merges with its first value.** Quote the name.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`line`](chart-line.md) · [`bar`](chart-bar.md)
- **Then:** [Colors & palettes](colors.md)
