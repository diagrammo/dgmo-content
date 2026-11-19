```dgmo
scatter Cannon Range vs Powder Charge
x-axis Powder (lbs)
y-axis Range (yards)

Long Tom 12 1800
Demi-Culverin 8 1200
Carronade 4 400
Swivel Gun 2 250
Nine-Pounder 6 900
Eighteen-Pounder 10 1500
Basilisk 14 2000
Falconet 3 350
Minion 5 700
Saker 7 1050
```

## Overview

A scatter plot puts a dot on two axes for every observation, so how two measured variables relate — the correlation, the clusters, the outliers — comes out of the shape of the cloud. Reach for it when each dot is an independent thing measured two ways and both numbers are real values with units. Add a third value per point to size the dots and it becomes a bubble chart.

## When to use

- **`scatter`** — each dot is an independent thing measured two ways, in real units.
- **[`histogram`](chart-histogram.md)** — one measurement per observation and the question is how the values are spread, not how two relate.
- **[`line`](chart-line.md)** — one value per point in time, read in order; a line implies a time ordering a scatter does not claim.
- **[`quadrant`](chart-quadrant.md)** — the positions are judgement calls you placed by eye rather than measurements.
- **[`heatmap`](chart-heatmap.md)** — the two dimensions are named categories (weeks, regions) rather than measured numbers.
- **[`function`](chart-function.md)** — you have a continuous equation rather than discrete observed points.
- **[`map`](chart-map.md)** — the positions correspond to real places on Earth.
- **[`boxplot`](chart-boxplot.md)** — you have many values of one measurement per group and want their spread and outliers, not a relation between two measures.

## Syntax

```
scatter Chart Title
x-axis X Axis Label
y-axis Y Axis Label
no-name
size-label Size Legend Label

Point Name x y

// or with size (bubble chart)
Point Name x y size
```

## Metadata Keys

| Key          | Description                                                | Required |
| ------------ | ---------------------------------------------------------- | -------- |
| `chart`      | Must be `scatter`                                          | Yes      |
| `x-axis`     | `[title] [min..max] [log \| linear]`, e.g. `x-axis Year 1990..2020` | No       |
| `y-axis`     | Same form for the value axis, e.g. `y-axis Revenue 0..100 log`; a range or `log` needs numbers | No       |
| `no-name`    | Hide point labels (labels are on by default)               | No       |
| `size-label` | Label for the size dimension (shown in legend for bubbles) | No       |
| `connect` | Join the points in row order, with an arrow at the end | No |
| `trend` | A least-squares line per category, labelled with its R² | No |

## Data Format

Each data line provides X and Y values, with an optional third value for bubble size:

```
// 2D scatter
Point A 12 1800
Point B 8 1200

// 3D bubble
Point A 85 90 80
Point B 45 55 35
```

## Category Groups

Use `[Category Name] color` headers to group points into colored categories:

```
[English Pirates] red
Blackbeard 85 90 80
Calico Jack 45 55 35

[French Buccaneers] blue
L'Olonnais 70 80 60
```

## Point Colors

A single point can carry its own color. Append a color name (lowercase) after the point label, before its values — this overrides the category color for that point:

```dgmo
scatter Cannon Range vs Powder Charge
x-axis Powder (lbs)
y-axis Range (yards)

Long Tom blue 12 1800
Carronade red 4 400
Basilisk 14 2000
```

Points with no color of their own fall back to their category color, or to the palette's series colors when they sit outside any category.

## Variants

### Bubble Chart

Add a third value per data point and use `size-label` to label the size dimension:

```dgmo
scatter Pirate Fleets of the Caribbean
size-label Crew

[English Pirates] red
Blackbeard 85 90 80
Calico Jack 45 55 35
Anne Bonny 50 70 30

[French Buccaneers] blue
L'Olonnais 70 80 60
Pierre le Grand 30 45 25
```

### Connected scatter — `connect`

Add `connect` to join the points in row order, so the chart reads as a path
through time. An arrow on the last segment shows the direction, and the first
and last points keep their names even under `no-name`:

```dgmo
scatter Black Pearl Voyage
x-axis Longitude (°W)
y-axis Latitude (°N)
connect

Port Royal 76.8 17.9
Tortuga 72.8 20.0
Nassau 77.3 25.0
Havana 82.4 23.1
```

With `[Category]` groups, each category gets its own path in its colour.
A category with one point draws no path.

### Trend line — `trend`

Add `trend` for a dashed least-squares line through the points, labelled with
its R² (how closely the points follow it, 0 to 1). Each `[Category]` gets its
own line in its colour:

```dgmo
scatter Gunnery Drills vs Hits on Target
x-axis Drill hours
y-axis Hits per 100 shots
trend

[Black Pearl] blue
  Gibbs 4 31
  Marty 8 36
  Cotton 12 44
  Pintel 18 47
  Ragetti 22 55
  Anamaria 28 61
[Flying Dutchman] teal
  Bootstrap 6 42
  Maccus 10 51
  Koleniko 16 47
  Clanker 20 55
  Hadras 26 52
  Palifico 30 60
```

## Number format — `format`, `unit`, `locale`

Every number the chart prints takes the same format on the y values (x stays plain):
`format currency USD` ($1,200), `format percent 1` (12.5% — values as
written), `format compact` (1.2M), or a quoted pattern such as
`format ",.2f"`. Add `unit ms` for text after each number and `locale de-DE`
for that locale's separators.

## Annotate — `marker`, `band` and `note`

`marker 50 Target` draws a dashed line across at y = 50, and `marker x 20 Launch` one up the plot at x = 20. `band 10..20 Normal` shades a y range, and `band x 0..5 Seed stage` an x range. A `note` indented under a point rings that point and writes beside it: `PayFlow 45 32` then `  note Largest round`. `no-notes` hides every note.

Before:

```dgmo
scatter Funding vs Revenue
x-axis Funding ($M)
y-axis Revenue ($M)

Acme Cloud 12 8.5
PayFlow 45 32
LendTech 18 12.5
QuickPay 9 6.8
```

After:

```dgmo
scatter Funding vs Revenue
x-axis Funding ($M)
y-axis Revenue ($M)

marker 20 Profitable
marker x 30 Series B

Acme Cloud 12 8.5
PayFlow 45 32
  note Largest round
LendTech 18 12.5
QuickPay 9 6.8
```

## Highlight one item — story view

Indent a `highlight` line under a point to put it in the spotlight, or under a `[Category]` header to light the whole category. The lit points keep their own colour, drawn solid and on top. Every other point, with its label and leader line, turns grey. The legend entries for grey categories turn grey too. Put a `highlight` under each thing you want lit. Add a colour word to paint the subject: `highlight orange`.

Before:

```dgmo
scatter Startup Funding vs Revenue
x-axis Funding ($M)
y-axis Annual Revenue ($M)

[SaaS] blue
  Acme Cloud 12 8.5
  DataSync 5.2 3.1

[Fintech] green
  PayFlow 45 32
  LendTech 18 12.5

[HealthTech] red
  MediScan 15 7.2
  CareLink 7 3.8
```

After:

```dgmo
scatter Startup Funding vs Revenue
x-axis Funding ($M)
y-axis Annual Revenue ($M)

[SaaS] blue
  Acme Cloud 12 8.5
  DataSync 5.2 3.1

[Fintech] green
  highlight
  PayFlow 45 32
  LendTech 18 12.5

[HealthTech] red
  MediScan 15 7.2
  CareLink 7 3.8
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

- **Every point needs both coordinates.** A row with one number is dropped from the plot with no diagnostic, and the axis rescales around what is left — so the chart looks complete. Count the points.
- **Scatter carries units and a real axis scale.** [`quadrant`](chart-quadrant.md) does not — it is qualitative placement in a 0–1 space. Do not move measurements into a quadrant to get the four labelled corners.
- **A label ending in a digit takes the x value with it.** Quote it.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`line`](chart-line.md) · [`quadrant`](chart-quadrant.md) · [`heatmap`](chart-heatmap.md) · [`function`](chart-function.md) · [`map`](chart-map.md)
- **Then:** [Colors & palettes](colors.md)
