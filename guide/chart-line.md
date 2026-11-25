```dgmo
line Ship Speed Over Voyage
series Knots
x-axis Day
y-axis Speed

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
- **[`calendar`](chart-calendar.md)** — you have a value per day and want the pattern of streaks and gaps across weeks, not the exact curve.

## Syntax

```
line Chart Title
series Series Name
x-axis X Axis Label
y-axis Y Axis Label

Label value
```

## Filled Area — `fill`

Add `fill` to shade the area under the line.

```dgmo
line Monthly Revenue
fill
x-axis Month
y-axis USD (thousands)

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
x-axis Week
y-axis Users (thousands)

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
y-axis Barrels

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
also takes no `y-right-axis`, `band` between series, or `fill-between`.

## Dual Y-Axes — `y-right-axis`

When two series share an x-axis but not a unit — revenue in dollars against margin
in percent — give the chart a second y-axis. Inside the `series` block, an indented
`y-axis` or `y-right-axis` line acts as a **header**: every series declared beneath
it is assigned to that axis, until the next header. The header text doubles as that
axis's title, so you don't write a separate `y-axis` line. Each header is a whole axis line, so it can also carry a range and `log`, such as `y-right-axis Million barrels 0..`.

```dgmo
line Revenue vs Margin
series
  y-axis Revenue (thousands)
  Product blue
  Services green
  y-right-axis Margin (%)
  Margin orange
x-axis Quarter

Q1 120  80 18
Q2 140  95 21
Q3 165 110 24
Q4 190 130 26
```

- Series accumulate under the **most recent header**; anything before the first
  header lands on the left axis.
- Data rows still carry one value per series in declaration order — left-axis
  series first, then right-axis, exactly as written in the block.
- Each axis fits its own series independently, so the two units never
  distort each other. Fix an end of either axis with a range on its header.
- Dual axes are a `line` feature, and a `bar` chart with lines takes them too
  (see the bar guide's combo section). Setting `y-right-axis` on another chart
  type warns and renders a single axis, and setting it with no series grouped
  under it warns too.

Use a second axis sparingly: two axes let the author choose where the lines
cross, so reserve it for genuinely different units rather than for two numbers
that could share one scale.

## Combo — bars and lines, `mark:`

A series line takes a same-line `mark:` key that says how that one series is
drawn: `mark: bar` draws it as bars, `mark: step` as a step line, and
`mark: line` is the default. Mix them to put a quantity in bars and a rate in a
line, usually with the second axis above:

```dgmo
line Plunder and Morale Over the Voyage
x-axis Port of Call

series
  y-axis Doubloons (thousands)
    Plunder orange mark: bar
  y-right-axis Crew Morale (%)
    Morale blue

Nassau       4.2 62
Tortuga      6.5 71
Port Royal   9.1 80
Isla Muerta  7.8 58
Kingston    11.4 86
```

- `mark:` goes last on the series line, after the name and its colour:
  `Plunder orange mark: bar`.
- Lines always draw over bars. Several bar series stand side by side in each
  x slot, and an axis with bars on it reaches 0, because a bar's length is its
  value.
- `mark: step` holds each value until the next point, like the `step` flag,
  for that one series.
- The legend's swatch shows each series' mark: a square chip for a bar, a
  stroke for a line.
- A chart with any bar keeps its row labels as categories, even when every
  row is a date.
- A word `bar` or `line` at the end of a name is part of the name
  (`Bottom Line`); only `mark:` sets a mark.
- `mark:` is an error on a stacked area (a `stack` block), and an unknown mark
  is an error.

To lead with bars instead — a `stack` or `group` of bars with a line over
them — write a `bar` chart and give the line series `mark: line`. The bar guide
covers that form.

## Small multiples — `facet`

The `facet` flag draws one panel per series, in the order the `series`
block lists them, in a grid under one title block. Use it when four or more
lines tangle in one plot and each one's own shape matters more than where the
lines cross:

```dgmo
line Rum Rations by Ship
subtitle Barrels drunk per month, first half of the voyage
facet
y-axis Barrels

series
  Black Pearl
  Flying Dutchman
  Queen Anne's Revenge
  Jolly Roger

Jan 12 9 15 7
Feb 14 10 13 8
Mar 11 12 17 9
Apr 16 11 19 8
May 18 13 16 11
Jun 15 14 21 12
```

- Each panel is headed by its series name in the series colour. There is no
  legend. The axis titles are drawn once, for the whole grid.
- All panels share one value axis, so equal values sit at equal heights, and
  its tick labels stand on the first column only. `facet-free-y` gives each
  panel its own range and labels every panel.
- Each panel draws the other series in light grey behind its own, for
  context. `no-context` turns them off; a `facet-free-y` chart never draws
  them, because its panels share no scale.
- The grid takes as many columns as fit at a readable panel width.
  `facet N` sets the count, as in `facet 3`.
- `fill`, `step` / `step-before`, eras, markers, bands and the statistics
  overlays apply in every panel. A `note` stays with its own series' panel.
- `stack`, `mirror`, a `y-right-axis` group, `mark:`, a series `band` and
  `fill-between` are errors beside `facet`, because each needs several series
  in one plot; the chart is then drawn as one plot. One series warns and draws
  one chart.

## Y-Axis Scaling — auto-fit by default, `no-auto-y` to opt out

A line chart **auto-fits its y-axis to the data**: the axis spans a padded window
around the min→max of all series (not a forced 0 baseline), so a tightly-clustered,
high-valued series fills the plot instead of hugging the top of a 0-based scale.

```dgmo
line Squat Est. 1RM (lbs)
x-axis Week
y-axis lbs

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
y-axis lbs

"Week 1" 315
"Week 6" 395
```

> Auto-fit is **line only**. Bar charts always anchor at 0 — a bar's length
> encodes magnitude, so a floating baseline would mislead. `no-auto-y` is ignored
> on non-line charts.

### Fixed range and log scale — `y-axis` range and `log`

A range on the `y-axis` line fixes either end of the axis: `y-axis 0..100`, `y-axis 0..` (floor only), `y-axis ..100` (ceiling only). Use it to compare charts on
one scale, or to force a 0 floor with an exact top. Add `log` last, as in `y-axis Users 1..10,000,000 log`; it suits values
that span decades: a series from 10 to 10 million stays readable, with a tick
at every power of ten.

```dgmo
line Monthly Active Users
y-axis log

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
y-axis Pieces of eight per barrel

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
y-axis Barrels
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
y-axis Doubloons
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

## Statistics overlays — `mean`, `median`, `target`, `trend`, `moving-average`, `extremes`

One bare line per overlay. dgmo computes each from the series and draws it
behind the lines, labelled at its right end in its colour:

```dgmo
line Doubloons Plundered, 1715
y-axis Doubloons
mean
median

Jan 310
Feb 295
Mar 340
Apr 1180
May 360
Jun 355
Jul 390
Aug 370
Sep 410
Oct 405
Nov 430
Dec 450
```

One April haul drags the mean up to 441; the median stays at 380.

| Overlay | Draws |
| --- | --- |
| `mean` / `median` | a dashed / dotted line at each series' mean / median |
| `target N` | a line at N; points that reach it are filled, the rest go grey (`target N below` flips it; a last colour word, `target N green`, paints what met it) |
| `trend` | a dashed least-squares line per series, labelled with its slope per row (`trend +2.16/week`) |
| `moving-average N` | each series' trailing N-point average, drawn heavier over a thinner raw line |
| `extremes` | a filled marker and a label on each series' highest and lowest point |

```dgmo
line Crew Aboard the Black Pearl
x-axis Week
y-axis Sailors
moving-average 3
trend

W1 41
W2 47
W3 39
W4 52
W5 50
W6 44
W7 57
W8 61
W9 51
W10 64
W11 60
W12 67
```

A one-word `x-axis` title names the step in the labels: `trend +2.16/week`,
`3-week avg`. With several series, each overlay draws once per series, in the
series' colour:

```dgmo
line Rum Stores in the Hold
y-axis Barrels
extremes
series
  Black Pearl blue
  Queen Anne's Revenge red

Jan 120 90
Feb 104 96
Mar 88 110
Apr 131 84
May 95 120
Jun 76 102
```

Overlays do not apply to a `stack`. There is no `average`: write `mean`.

## Era Bands

Annotate named time periods with a shaded background band and label:

```dgmo
line U.S. Strategic Petroleum Reserve
y-axis Million Barrels

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
| `x-axis` | Title for the X axis, e.g. `x-axis Week` | No       |
| `y-axis` | `[title] [min..max] [log \| linear]` for the left Y axis, e.g. `y-axis Users 0..100` | No |
| `y-right-axis` | Same form for the right Y axis (dual-axis; group series beneath it) | No |
| `mark:` | On a series line: `bar`, `line` (default) or `step` — how that series is drawn (see above) | No |
| `stack` | Stacked areas in place of `series`; `stack 100%` for shares (see above) | No |
| `facet` | One panel per series, in a grid — small multiples (see above) | No |
| `facet-free-y` | With `facet`: each panel takes its own value range | No |
| `no-context` | With `facet`: no grey lines for the other series | No |
| `facet N` | `facet` with N panels per row, e.g. `facet 2` | No |
| `fill`    | Shade the area under the line             | No       |
| `fill-between` | Shade between two series, by which one leads | No |
| `band` | A value range (`band 40..60`) or a band between two series (`band Forecast Low High`) | No |
| `color`   | Override the line color                   | No       |
| `no-auto-y` | Anchor the y-axis at 0 (opt out of auto-fit) | No    |
| `step` | Hold each value until the next point | No |
| `step-before` | Steps that reach each value at its own point | No |
| `mean` / `median` | A dashed / dotted line at each series' mean / median (see above) | No |
| `target N` | A line at N; points that reach it are filled (`target N below` flips it; a last colour word, `target N green`, paints what met it) | No |
| `trend` | A dashed least-squares line per series, labelled with its slope | No |
| `moving-average N` | Each series' trailing N-point average, drawn heavier | No |
| `extremes` | Mark and label each series' highest and lowest point | No |
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

Four lines mark what the reader should notice. `marker 40 Break-even` draws a dashed line at a value. To draw one at a category, indent `marker Raid` under that row — under `1718 46 24 31`, it marks 1718. `band 20..30 Usual range` shades a value range, and `era 1717 -> 1718 Blockade` shades a span of the x-axis.

A `note` indented under a row rings one point of that row and writes beside it, with a leader line, in empty plot space. On a chart with several series, the note starts with the series: `  note Vane Hanged at Port Royal` under `1720 22 11 18`. On a single series the row is enough: `  note Peak`. Quote a multi-word series name, and indent lines under the note to add more text. A point value under a note gives way to it. `no-notes` hides every note.

Each series' name also sits at the right end of its line, so the reader does not have to look up the legend. The names are added beside the point values, not in place of them.

Before:

```dgmo
line Plunder by Crew, 1716–1720
y-axis Doubloons (thousands)

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
y-axis Doubloons (thousands)

series
  Blackbeard
  Bonnet
  Vane

marker y 40 Break-even
era 1717 -> 1718 Blockade of Charleston

1716 12 8 10
1717 28 16 22
1718 46 24 31
  note Blackbeard Queen Anne's Revenge runs aground
1719 30 19 36
1720 22 11 18
  note Vane Hanged at Port Royal
```

## Highlight one item — story view

Indent a `highlight` line under a series name in the `series` block to put that series in the spotlight. It keeps its own colour, drawn solid and on top. Every other series turns grey, including its points and value labels. Its legend entry turns grey too. Put a `highlight` under each series you want lit. Add a colour word to paint the subject: `highlight orange`.

Before:

```dgmo
line Fleet Size by Navy
y-axis Ships of the line

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
y-axis Ships of the line

series
  Royal Navy
    highlight
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

- **Related:** [`slope`](chart-slope.md) · [`timeline`](chart-timeline.md) · [`scatter`](chart-scatter.md) · [`function`](chart-function.md) · [`journey-map`](chart-journey-map.md) · [`calendar`](chart-calendar.md)
- **Then:** [Colors & palettes](colors.md)
