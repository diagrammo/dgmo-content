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
| `y-right-label` | Label for the right Y axis (dual-axis; group series beneath it) | No |
| `fill`    | Shade the area under the line             | No       |
| `color`   | Override the line color                   | No       |
| `no-auto-y` | Anchor the y-axis at 0 (opt out of auto-fit) | No    |
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

- **Related:** [`slope`](chart-slope.md) · [`timeline`](chart-timeline.md) · [`scatter`](chart-scatter.md) · [`function`](chart-function.md) · [`journey-map`](chart-journey-map.md)
- **Then:** [Colors & palettes](colors.md)
