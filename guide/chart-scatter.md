```dgmo
scatter Cannon Range vs Powder Charge
x-label Powder (lbs)
y-label Range (yards)

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
- **[`line`](chart-line.md)** — one value per point in time, read in order; a line implies a time ordering a scatter does not claim.
- **[`quadrant`](chart-quadrant.md)** — the positions are judgement calls you placed by eye rather than measurements.
- **[`heatmap`](chart-heatmap.md)** — the two dimensions are named categories (weeks, regions) rather than measured numbers.
- **[`function`](chart-function.md)** — you have a continuous equation rather than discrete observed points.
- **[`map`](chart-map.md)** — the positions correspond to real places on Earth.

## Syntax

```
scatter Chart Title
x-label X Axis Label
y-label Y Axis Label
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
| `x-label`    | Label for the X axis                                       | No       |
| `y-label`    | Label for the Y axis                                       | No       |
| `no-name`    | Hide point labels (labels are on by default)               | No       |
| `size-label` | Label for the size dimension (shown in legend for bubbles) | No       |

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
x-label Powder (lbs)
y-label Range (yards)

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
