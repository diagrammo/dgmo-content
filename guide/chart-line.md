```dgmo
line Ship Speed Over Voyage
series Knots
x-label Day
y-label Speed

era Day 1 -> Day 3 Rough Seas red
era Day 3 -> Day 7 Fair Winds blue

Day 1 8
Day 2 10
Day 3 7
Day 4 12
Day 5 9
Day 6 11
Day 7 6
```

## Overview

A line chart connects readings taken at many points along one axis — usually time — so the **trend** is what you see first: rising, falling, spiking, flattening out. Reach for it when you have sales by month, users by week, temperature by hour, or any measured number sampled repeatedly and you want to know which way it's going. Several series can share the chart for trajectory comparison, `era` bands can shade named periods behind the data, and a second y-axis lets you plot two different units side by side.

## When to use

- **`line`** — many readings over a continuous axis, and the shape of the movement is the point.
- **[`slope`](chart-slope.md)** — you have exactly a "before" and an "after". Slope draws only the first and last period; if the metric crashed and recovered in between, a slope chart hides that entirely.
- **[`timeline`](chart-timeline.md)** — the thing you're plotting is a list of *things that happened*, not a number.
- **[`scatter`](chart-scatter.md)** — each dot is an independent thing measured two ways, with no time ordering. A line implies an ordering that isn't there.
- **[`function`](chart-function.md)** — you have a *formula* and want the curve drawn from it, rather than a table of readings.
- **[`journey-map`](chart-journey-map.md)** — the numbers are a subjective 1–5 rating you assigned, not measurements. A line chart makes assigned scores read as measured data.
- **[`bar`](chart-bar.md)** — the categories aren't points along an axis at all, and the individual values need reading precisely.
- **[`goal`](chart-goal.md)** — there's one number racing toward one target, with no time axis to plot it against.
- **[`calendar-heatmap`](chart-calendar-heatmap.md)** — you have a value per day and want the pattern of streaks and gaps across weeks, not the exact curve.

## Syntax

```
line Chart Title
series Series Name
x-label X Axis Label
y-label Y Axis Label

Label value
```

## Filled Area — `fill`

Add `fill` to shade the area under the line.

```dgmo
line Monthly Revenue
fill
x-label Month
y-label USD (thousands)

Jan 42
Feb 55
Mar 61
Apr 78
```

> The former standalone `area` chart type was removed in 1.0 — use `line` + `fill`.

## Multiple Series — `series` block

Plot several series on one chart with a `series` block. Indent one line per
series (name plus optional color); each data row then carries one value per
series, in declaration order.

```dgmo
line Weekly Active Users
series
  Free blue
  Pro green
  Team orange
x-label Week
y-label Users (thousands)

"Week 1"  8.2  1.1  0.3
"Week 2"  9.5  1.6  0.5
"Week 3" 11.8  2.4  0.9
"Week 4" 13.4  3.3  1.4
```

A short one-line form is tolerated: `series Free Pro Team`.

> The former standalone `multi-line` chart type was removed in 1.0 — use `line` + a `series` block.

## Stacked Area — `stack` block

Use a `stack` block in place of `series` to stack each series on top of the
one below. The top edge is the total. A stacked area always fills, and its
axis always starts at 0.

```dgmo
line Ship's Stores in the Hold
y-label Barrels

stack
  Rum orange
  Powder blue
  Salt pork green

Jan 120 60 80
Feb 140 70 85
Mar 160 85 90
Apr 190 100 100
```

Write `stack 100%` to draw shares instead: every x position fills the chart,
and the axis reads 0–100%. Keep the raw numbers in the rows; hover shows each
value and its share. A stacked area prints no point values, and a negative
value is an error, because a band cannot go below the one it sits on. It
also takes no `y-right-label`, `band` between series, or `fill-between`.

## Dual Y-Axes — `y-right-label`

When two series share an x-axis but not a unit — revenue in dollars against margin
in percent — give the chart a second y-axis. Inside the `series` block, an indented
`y-label` or `y-right-label` line acts as a **header**: every series declared beneath
it is assigned to that axis, until the next header. The header text doubles as that
axis's label, so you don't write a separate `y-label` line.

```dgmo
line Revenue vs Margin
series
  y-label Revenue (thousands)
  Product blue
  Services green
  y-right-label Margin (%)
  Margin orange
x-label Quarter

Q1 120  80 18
Q2 140  95 21
Q3 165 110 24
Q4 190 130 26
```

- Series accumulate under the **most recent header**; anything before the first
  header lands on the left axis.
- Data rows still carry one value per series in declaration order — left-axis
  series first, then right-axis, exactly as written in the block.
- Each axis auto-fits its own series independently, so the two units never
  distort each other.
- Dual axes are a `line` feature. Setting `y-right-label` on another chart type
  warns and renders a single axis, and setting it with no series grouped under
  it warns too.

Use a second axis sparingly: two axes let the author choose where the lines
cross, so reserve it for genuinely different units rather than for two numbers
that could share one scale.

## Y-Axis Scaling — auto-fit by default, `no-auto-y` to opt out

A line chart **auto-fits its y-axis to the data**: the axis spans a padded window
around the min→max of all series (not a forced 0 baseline), so a tightly-clustered,
high-valued series fills the plot instead of hugging the top of a 0-based scale.

```dgmo
line Squat Est. 1RM (lbs)
x-label Week
y-label lbs

"Week 1" 315
"Week 2" 330
"Week 3" 350
"Week 4" 365
"Week 5" 380
"Week 6" 395
```

Add `no-auto-y` to force the axis back to a **0 baseline** (magnitude honesty):

```dgmo
line Squat Est. 1RM (lbs)
no-auto-y
y-label lbs

"Week 1" 315
"Week 6" 395
```

> Auto-fit is **line only**. Bar charts always anchor at 0 — a bar's length
> encodes magnitude, so a floating baseline would mislead. `no-auto-y` is ignored
> on non-line charts.

### Fixed range and log scale — `y-min`, `y-max`, `y-scale`

`y-min` and `y-max` fix either end of the axis. Use them to compare charts on
one scale, or to force a 0 floor with an exact top. `y-scale log` suits values
that span decades: a series from 10 to 10 million stays readable, with a tick
at every power of ten.

```dgmo
line Monthly Active Users
y-scale log

2019 12
2020 940
2021 61000
2022 4800000
```

A log axis needs every value above 0; with a zero or a negative value it stays
linear and warns. On a dual-axis chart, these set the left axis only.

## Dates on the x-axis

When **every** row label is an ISO date — `2024-03` or `2024-03-15` — the rows
sit at their real place in time, and the axis labels itself with years, months
or days. A six-month gap looks six times longer than a one-month gap. Bare
years (`2024`), quarter names and any mix of dates and words keep evenly
spaced labels.

## Steps — `step` and `step-before`

For a value that changes in jumps and holds in between (a rate, a price, a
headcount), add `step`. Each value runs flat until the next point, then jumps:

```dgmo
line Port Royal Duty on Rum
step
y-label Pieces of eight per barrel

1718-01 4
1718-04 5
1718-06 7
1719-02 7.5
1720-08 6
```

`step` starts each new value on its own date. `step-before` instead reaches
the value on its date, as for a balance at month end. Use one, not both. Steps
work with `series` and `fill`, and the line stops at the last point.

## Uncertainty band — `band <label> <low> <high>`

To show a forecast range, give the low and high bounds their own series and
name them in a `band` line. The band shades between them, in the low series'
colour; the two bounds are not drawn as lines and the legend shows the band's
label once:

```dgmo
line Rum Sales Forecast
y-label Barrels
series
  Actual blue
  Low teal
  High teal
band Forecast Low High

Jan 120 112 128
Feb 132 120 146
Mar 128 112 150
Apr 141 120 168
```

The band counts toward the y-axis range and follows `step`. `band 40..60`
with two numbers is the value band from Annotations, a different thing.

## Fill between two series — `fill-between`

To show where one series leads another, add `fill-between A B`. The gap is
green where A is above B and red where B is above A, switching where the
lines cross. Two colour names after the series replace green and red:

```dgmo
line Plunder vs Quota
y-label Doubloons
series
  Haul blue
  Quota gray
fill-between Haul Quota green red

Jan 420 400
Feb 470 410
Mar 380 420
Apr 350 430
May 460 440
```

The fill never widens the y-axis. Several `fill-between` lines may name
different pairs. `fill` and `fill-between` cannot be used together.

## Era Bands

Annotate named time periods with a shaded background band and label:

```dgmo
line U.S. Strategic Petroleum Reserve
y-label Million Barrels

era '77 -> '81 Carter blue
era '81 -> '89 Reagan red
era '89 -> '93 Bush red

'77 7
'78 67
'79 91
'80 108
'81 230
'82 294
'83 379
```

Era syntax: `era <start> -> <end> Label color`

- `start` and `end` must exactly match data point labels
- Color is optional; omit for the palette default
- Named colors: `red`, `blue`, `green`, `orange`, `purple`, `teal`, etc.
- Multiple eras can overlap — both render without error

## Metadata Keys

| Key       | Description                               | Required |
| --------- | ----------------------------------------- | -------- |
| `chart`   | Must be `line`                            | Yes      |
| `series`  | Name of the data series (shown in legend) | No       |
| `x-label` | Label for the X axis                      | No       |
| `y-label` | Label for the left Y axis                 | No       |
| `y-scale` | `log` for values spanning decades (default `linear`) | No |
| `y-min` | Fix the low end of the value axis (e.g. `y-min 0`) | No |
| `y-max` | Fix the high end of the value axis (e.g. `y-max 100`) | No |
| `y-right-label` | Label for the right Y axis (dual-axis; group series beneath it) | No |
| `stack` | Stacked areas in place of `series`; `stack 100%` for shares (see above) | No |
| `fill`    | Shade the area under the line             | No       |
| `fill-between` | Shade between two series, by which one leads | No |
| `band` | A value range (`band 40..60`) or a band between two series (`band Forecast Low High`) | No |
| `color`   | Override the line color                   | No       |
| `no-auto-y` | Anchor the y-axis at 0 (opt out of auto-fit) | No    |
| `step` | Hold each value until the next point | No |
| `step-before` | Steps that reach each value at its own point | No |
| `no-value` | Hide the value labels at each point      | No       |

The chart title is the rest of line 1 (`line Ship Speed Over Voyage`) — there is
no `title` directive.

## Data Format

Each data line follows the pattern `Label value`:

```
Day 1 8
Day 2 10
Day 3 7
```

## Number format — `format`, `unit`, `locale`

Every number the chart prints takes the same format:
`format currency USD` ($1,200), `format percent 1` (12.5% — values as
written), `format compact` (1.2M), or a quoted pattern such as
`format ",.2f"`. Add `unit ms` for text after each number and `locale de-DE`
for that locale's separators.

## Annotate — `marker`, `band`, `era` and `note`

Four lines mark what the reader should notice. `marker 40 Break-even` draws a dashed line at a value; `marker 1718 Raid` draws one at a category. When the categories are numbers, as years are, name the axis: `marker y 40 …` for a value, `marker x 1718 …` for a year. `band 20..30 Usual range` shades a value range, and `era 1717 -> 1718 Blockade` shades a span of the x-axis.

`note` rings one point and writes beside it, with a leader line, in empty plot space. On a chart with several series, name the point as `series @ position`: `note Vane @ 1720 Hanged at Port Royal`. On a single series, `note 1718 Peak` is enough. Quote a multi-word name, and indent lines under the note to add more text. A point value under a note gives way to it. `no-notes` hides every note.

Each series' name also sits at the right end of its line, so the reader does not have to look up the legend. The names are added beside the point values, not in place of them.

Before:

```dgmo
line Plunder by Crew, 1716–1720
y-label Doubloons (thousands)

series
  Blackbeard
  Bonnet
  Vane

1716 12 8 10
1717 28 16 22
1718 46 24 31
1719 30 19 36
1720 22 11 18
```

After:

```dgmo
line Plunder by Crew, 1716–1720
y-label Doubloons (thousands)

series
  Blackbeard
  Bonnet
  Vane

marker y 40 Break-even
era 1717 -> 1718 Blockade of Charleston
note Blackbeard @ 1718 Queen Anne's Revenge runs aground
note Vane @ 1720 Hanged at Port Royal

1716 12 8 10
1717 28 16 22
1718 46 24 31
1719 30 19 36
1720 22 11 18
```

## Highlight one item — story view

Add a `highlight` line to put one series in the spotlight. The named series keeps its own colour, drawn solid and on top. Every other series turns grey, including its points and value labels. Its legend entry turns grey too. The name is a series name, such as `Royal Navy`. List several names with commas. Add a colour word to paint the subject: `highlight Royal Navy orange`. A name that matches nothing changes nothing.

Before:

```dgmo
line Fleet Size by Navy
y-label Ships of the line

series
  Royal Navy
  French Navy
  Spanish Navy

1690 100 93 40
1700 127 108 45
1710 131 90 38
1720 124 52 33
```

After:

```dgmo
line Fleet Size by Navy
highlight Royal Navy
y-label Ships of the line

series
  Royal Navy
  French Navy
  Spanish Navy

1690 100 93 40
1700 127 108 45
1710 131 90 38
1720 124 52 33
```

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted area fill (default), on `fill` charts. |
| `fill-solid` | Saturated solid area fill, on `fill` charts. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

The fill family acts on the area under the line, so it only has an effect once
`fill` is set. Colors come from the active palette — see [Colors](colors.md).
Set the palette and light/dark theme at render time with `--palette <name>` and
`--theme light|dark|transparent`.

## Common mistakes

- **Use [`slope`](chart-slope.md) only when the endpoints are the story.** Slope hides everything between them, so a metric that crashed and recovered draws flat. If the intermediate movement matters, it belongs on a line.
- **An x-value ending in a digit merges with the y-value.** `Q1 2024 10` becomes a point labelled `Q1 2024` — which is usually what you wanted here, but check it, because `Day 1 8` becomes `Day 1` worth 8 rather than day 1 at 8.
- **Check the y-axis range** against the values you believe you entered. A rescaled axis is the fastest sign a value was misread.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`slope`](chart-slope.md) · [`timeline`](chart-timeline.md) · [`scatter`](chart-scatter.md) · [`function`](chart-function.md) · [`journey-map`](chart-journey-map.md) · [`calendar-heatmap`](chart-calendar-heatmap.md)
- **Then:** [Colors & palettes](colors.md)
