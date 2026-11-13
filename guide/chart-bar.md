```dgmo
bar Treasure Hauls by Port

Port Royal 850
Tortuga 620
Nassau 1100
Havana 430
Cartagena 780
```

## Overview

A bar chart compares a value across categories using **length** — the most direct way to read which is bigger and by how much. Reach for it to rank categories by value, compare groups side by side, or stack parts into a total. It is the honest default: bars make no claim beyond "these are the sizes." Nothing has to sum to a whole, nothing has to be a subset of anything, and the axis stays in real units. When another chart type's precondition doesn't hold, `bar` is almost always the right fallback.

## When to use

- **`bar`** — you are comparing sizes of things and someone needs to read the individual numbers accurately.
- [`pie`](chart-pie.md) — your values genuinely add up to a meaningful 100% of something and shares are the question. A pie always reads as "100% of something"; on categories that don't sum (average rating by product) it invents a whole that does not exist.
- [`treemap`](chart-treemap.md) — categories contain sub-categories you also want sized. Use `bar` for one flat list of a handful of items read precisely.
- [`funnel`](chart-funnel.md) — every stage is a subset of the one before and the difference is drop-off. On independent categories a funnel manufactures an attrition story that isn't there.
- [`radar`](chart-radar.md) — the *overall shape* across measures is the point ("strong here, weak there") and every axis shares one scale. Use `bar` when the individual numbers must be read accurately, or when your measures are in mixed units.
- [`slope`](chart-slope.md) — the point is how each item *moved* between two moments. Slope draws only the first and last period, so use `bar` (or [`line`](chart-line.md)) when the movement in between matters.
- [`wordcloud`](chart-wordcloud.md) — you only want a texture of which terms come up most. Use `bar` if anyone needs to rank them, since word size is an unreliable comparison.
- [`heatmap`](chart-heatmap.md) — you have two things to break down by at once (rows *and* columns). `bar` breaks down by one dimension only.
- [`goal`](chart-goal.md) — one number against one target, rather than several numbers compared.
- [`polar-area`](chart-polar-area.md) — you want the same one-value-per-item comparison drawn radially. It reads as a shape rather than a ruler, so use `bar` whenever the numbers must be compared precisely.
- [`venn`](chart-venn.md) — an item can belong to more than one category at once. Bar assumes each item lands in exactly one.

## Syntax

```
bar Chart Title
x-label X Axis Label
y-label Y Axis Label

Label value
```

A single-series bar needs no series declaration — one value per row.

## Multi-series — `stack` or `group`

Declare multiple series with a **layout block header**: `stack` (stacked bars,
one bar per category) or `group` (clustered, side-by-side). The header names the
layout — `series` is not used on bar charts.

```dgmo
bar Support Tickets by Priority
x-label Month
y-label Tickets

stack
  Critical red
  High orange
  Low green

January 8 24 45
February 12 19 51
March 6 22 38
```

Swap `stack` for `group` to render the series side by side instead of stacked.

## Metadata Keys

| Key                      | Description                                  | Required |
| ------------------------ | -------------------------------------------- | -------- |
| `stack` / `group`        | Multi-series layout block header (see above) | No       |
| `x-label`                | Label for the X axis                         | No       |
| `y-label`                | Label for the Y axis                         | No       |
| `y-scale` | `log` for values spanning decades (default `linear`) | No |
| `y-min` | Fix the low end of the value axis (e.g. `y-min 0`) | No |
| `y-max` | Fix the high end of the value axis (e.g. `y-max 100`) | No |
| `orientation-horizontal` | Horizontal bars (default is vertical)        | No       |
| `color`                  | Override the bar color (e.g., `red`)         | No       |

The title is line 1 (`bar Treasure Hauls by Port`) — there is no `title` directive.

## Data Format

Each data line follows the pattern `Label value`:

```
Port Royal 850
Tortuga 620
Nassau 1100
```

## Variants

### Horizontal Bar

Add `orientation-horizontal` to display bars horizontally:

```dgmo
bar Crew Size by Ship
orientation-horizontal

Queen Anne's Revenge 300
Royal Fortune 262
Whydah Gally 146
Adventure Galley 152
```

## Number format — `format`, `unit`, `locale`

Every number the chart prints — axis ticks, value labels and hover — takes
the same format:

```dgmo
bar Plunder by Port
format currency USD

Nassau 125000
Tortuga 98000
Port Royal 143500
```

The named formats are `format currency <CODE>` ($1,200), `format percent 1`
(12.5% — values as written) and `format compact` (1.2M); a trailing number
fixes the decimals. Anything else takes a quoted pattern, such as
`format ",.2f"`. `unit ms` puts text after each number (`120 ms`), and
`locale de-DE` switches to that locale's separators (`1.234,5`).

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

- **A label ending in a digit swallows the value after it.** `Feb 5 8` draws a bar labelled `Feb 5` worth 8, not `Feb` worth 58, and nothing warns. Quote the label: `"Feb 5" 8`. With a `series` block the mismatch is caught and the warning writes the corrected line for you.
- **A mistyped setting followed by a number becomes a data row** and draws a bar. A misspelling on its own gets a "did you mean" warning; one with a number after it does not. Count the bars.
- **Use `bar`, not [`pie`](chart-pie.md), when the categories do not sum to a meaningful whole** — a pie invents a denominator.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`pie`](chart-pie.md) · [`treemap`](chart-treemap.md) · [`funnel`](chart-funnel.md) · [`radar`](chart-radar.md) · [`slope`](chart-slope.md) · [`wordcloud`](chart-wordcloud.md) · [`heatmap`](chart-heatmap.md) · [`goal`](chart-goal.md)
- **Then:** [Colors & palettes](colors.md)
