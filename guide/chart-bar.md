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

### 100% stack — shares of each total

`stack 100%` draws every bar as shares of its own total, so all bars stand
the same height and the axis reads 0–100%. Keep the raw numbers in the rows:
each segment prints its share, and hover shows the value and the share.

```dgmo
bar Ship's Stores by Quarter
stack 100%
  Rum orange
  Powder blue
  Salt pork green

Q1 420 220 255
Q2 510 280 260
Q3 470 215 310
```

A negative value is an error in a 100% stack. A plain `stack` still draws
negatives below 0.

### Stacks grouped by category — clustered stacked columns

To draw one stack per period inside each category, write the category on
its own line with no numbers, and indent one row per period under it. Each
period row is a label, then one number per `stack` series.

```dgmo
bar Plunder by Port and Year
stack
  Gold orange
  Silver blue

Tortuga
  1718 40 22
  1719 44 30
Nassau
  1718 31 18
  1719 29 26
```

The period sits under each column, and a bracket with the category name sits
under each group. A period label is any text (`1718`, `Q1 2025`, `Plan`).
Periods line up across categories; a category without one leaves its slot
empty. `stack 100%` scales each column to 100% on its own.

### Marimekko (variable-width)

A Marimekko (also called a mekko or mosaic chart) is a stacked bar whose
columns have different widths. Add `widths` above the `stack` block. The
first number on each row is then that column's width, and every column fills
to 100%.

```dgmo
bar Cloud market by region, 2025
subtitle Column width = region’s share of the $250B market
x-label Share of the global market
y-label Share of region
widths

stack
  AWS   orange
  Azure blue
  GCP   green
  Other gray

// region  width  AWS Azure GCP Other
US     42%  38 30 18 14
EU     28%  30 36 16 18
APAC   22%  28 24 20 28
LATAM   8%  34 26 14 26
```

Write a width as a share (`42%`, all shares adding up to 100) or as a size
(`105`, drawn in proportion and labelled in the chart's `format`), the same
way on every row. The segments need no arithmetic: raw counts work, because
each column is scaled to 100%. Hover on a segment to see its share of the
column, its share of the whole, and its value.

### Diverging stack — survey and Likert scales

`stack diverging` centres each bar on 0, for answers that run from one pole
to the other. Mark the middle answer with a trailing `neutral` after its
color:

```dgmo
bar Crew Morale Survey
orientation-horizontal
stack diverging
  Strongly disagree red
  Disagree orange
  Neutral gray neutral
  Agree green
  Strongly agree blue

Rations 10 20 10 30 30
Shore leave 5 15 20 40 20
```

Answers listed before the neutral one grow left of 0, answers after it grow
right, and the neutral segment straddles 0. Without a `neutral` flag, an odd
count makes the middle answer neutral and an even count splits in the middle.
Every number reads positive, on the axis and on the segments.

## Metadata Keys

| Key                      | Description                                  | Required |
| ------------------------ | -------------------------------------------- | -------- |
| `stack` / `group`        | Multi-series layout block header (see above) | No       |
| `stack 100%` | Stack drawn as shares of each bar's total (see above) | No |
| `stack diverging` | Stack centred on 0 around a `neutral` series (see above) | No |
| indented rows | Rows indented under a category line draw stacks grouped by category (see above) | No |
| `widths` | Marimekko: each row's first number is its column width (see above) | No |
| `x-label`                | Label for the X axis                         | No       |
| `y-label`                | Label for the Y axis                         | No       |
| `y-scale` | `log` for values spanning decades (default `linear`) | No |
| `y-min` | Fix the low end of the value axis (e.g. `y-min 0`) | No |
| `y-max` | Fix the high end of the value axis (e.g. `y-max 100`) | No |
| `orientation-horizontal` | Horizontal bars (default is vertical)        | No       |
| `sort` | Order the bars largest first (`sort asc` = smallest first, `sort <series>` = by one series) | No |
| `lollipop` | Draw each bar as a thin stem with a dot at its value | No |
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

### Sorted Bar

Add `sort` to order the bars largest first, or `sort asc` for smallest first.
Without it, bars keep the order of the rows. A horizontal bar puts the first
one at the top:

```dgmo
bar Crew Size by Ship
orientation-horizontal
sort

Queen Anne's Revenge 300
Whydah Gally 146
Royal Fortune 262
Adventure Galley 152
```

On a `group`, bare `sort` orders by the first series; `sort Crew` orders by
the series named Crew (`sort Crew asc` reverses it). On a `stack`, `sort`
orders by each bar's total.

### Lollipop

Add `lollipop` to draw each bar as a thin stem from 0 with a dot at its
value. It holds many categories with less ink than solid bars:

```dgmo
bar Doubloons Hauled by Port
lollipop
sort

Port Royal 850
Tortuga 620
Nassau 1100
Havana 400
```

It works with `orientation-horizontal`, `group` (one stem per series, side by
side), negative values, `sort` and `highlight`. It cannot draw a `stack`: the
pair is an error and the chart keeps solid stacked bars.

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

### Compact numbers — one unit per axis

`format compact` picks one unit for the whole value axis, from its largest
tick, and prints every tick and every value label in that unit with the same
number of decimals. Zero stays a bare `0`:

```dgmo
bar Doubloons by Port
format compact

Nassau 1200
Port Royal 800
Tortuga 420
Havana 310
```

Before, each number chose its own unit, so one axis read `1.2K, 1K, 800, 600`
and the bars were labelled `1.2K`, `800`, `420`. Now the axis reads
`0, 0.2K, 0.4K … 1.2K` and the bars `1.2K`, `0.8K`, `0.4K`, `0.3K`. A
trailing number sets the decimals for the whole axis: `format compact 2`
prints `0.42K`.

### Numbers line up — tabular figures

Every axis tick and value label is set in tabular figures: each digit takes
the same width, so a column of ticks lines up digit under digit and on the
decimal point. Nothing to write — it applies to every chart:

```dgmo
bar Crew Paid by Ship
format currency USD 2

Queen Anne's Revenge 1111.11
Royal Fortune 888.88
Whydah Gally 404.04
```

Before, digits kept their natural widths: a `1` is two thirds as wide as an
`8`, so `$1,111.11` and `$888.88` set side by side did not line up and the
right-aligned ticks wandered. Now every digit has one width, and the exported
PNG and PDF match the SVG.

## Annotate — `marker`, `band`, `era` and `note`

`marker 900 Quota` draws a dashed line at a value, and `marker Nassau Raid` one at a category. `band 400..600 Usual haul` shades a value range. `era Tortuga -> Nassau Republic` shades a run of categories. `note Nassau Spanish fleet ran aground` rings the bar's end and writes beside it, in empty plot space, with a leader line. On a stacked or grouped bar, name one segment as `series @ category`. Indented lines under a note add more text, with **bold** and *italic*. A value label under a note gives way to it. `no-notes` hides every note.

Before:

```dgmo
bar Treasure Hauls by Port
y-label Doubloons

Port Royal 850
Tortuga 620
Nassau 1100
Havana 400
```

After:

```dgmo
bar Treasure Hauls by Port
y-label Doubloons

marker 900 Quota
band 400..600 Usual haul green
era Tortuga -> Nassau Republic of Pirates
note Nassau Spanish fleet ran aground
  **1715** hurricane season

Port Royal 850
Tortuga 620
Nassau 1100
Havana 400
```

## Highlight one item — story view

Add a `highlight` line to put one bar in the spotlight. The named bar keeps its own colour, drawn solid. Every other bar and its value label turns grey. The name is a category, such as `Nassau`. On a stacked or grouped bar, you can also name a series. List several names with commas: `highlight Nassau, Havana`. Add a colour word to paint the subject: `highlight Nassau orange`. A name that matches nothing changes nothing.

Before:

```dgmo
bar Treasure Hauls by Port
y-label Doubloons

Port Royal 850
Tortuga 620
Nassau 1100
Havana 400
Kingston 530
```

After:

```dgmo
bar Treasure Hauls by Port
highlight Nassau
y-label Doubloons

Port Royal 850
Tortuga 620
Nassau 1100
Havana 400
Kingston 530
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

- **A label ending in a digit swallows the value after it.** `Feb 5 8` draws a bar labelled `Feb 5` worth 8, not `Feb` worth 58, and nothing warns. Quote the label: `"Feb 5" 8`. With a `series` block the mismatch is caught and the warning writes the corrected line for you.
- **A mistyped setting followed by a number becomes a data row** and draws a bar. A misspelling on its own gets a "did you mean" warning; one with a number after it does not. Count the bars.
- **Use `bar`, not [`pie`](chart-pie.md), when the categories do not sum to a meaningful whole** — a pie invents a denominator.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`pie`](chart-pie.md) · [`treemap`](chart-treemap.md) · [`funnel`](chart-funnel.md) · [`radar`](chart-radar.md) · [`slope`](chart-slope.md) · [`wordcloud`](chart-wordcloud.md) · [`heatmap`](chart-heatmap.md) · [`goal`](chart-goal.md)
- **Then:** [Colors & palettes](colors.md)
