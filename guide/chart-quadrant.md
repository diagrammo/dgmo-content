```dgmo
quadrant Crew Performance Assessment
x-label Low Skill, High Skill
y-label Low Loyalty, High Loyalty

top-right Promote green
top-left Train yellow
bottom-left Maroon red
bottom-right Watch Closely purple

Quartermaster 0.9 0.95
Navigator 0.85 0.8
Gunner 0.7 0.6
Surgeon 0.8 0.75
Boatswain 0.6 0.85
Cook 0.4 0.9
New Recruit 0.2 0.5
Troublemaker 0.65 0.2
```

## Overview

Places items in a 2×2 grid defined by two axes you name, sorting them into four labelled zones — the classic way to **prioritize** a backlog, triage a list, or position competitors. Reach for it for effort-versus-impact sorting, urgent-versus-important triage, or any "which of these should we do first?" conversation. **Positions are qualitative judgement calls, not measurements.** Each item takes an x and a y between 0 and 1 that you assign by eye; there are no units, no axis scale, and no gridlines to read a value off. Any number is accepted and plotted as-is with no warning, so pasting real measurements in silently strips their units and converts data into opinion while keeping the visual authority of a plotted chart. If you have measured values with units, use [`scatter`](chart-scatter.md).

## When to use

- **`quadrant`** — you want to prioritize or position items by judgement on two axes you name yourself, and roughly-placed is good enough.
- **[`scatter`](chart-scatter.md)** — your positions are real measured values with units that must survive onto the axes.
- **[`tech-radar`](chart-tech-radar.md)** — you're sorting technologies into "use it / try it / watch it / avoid it" rings rather than free axes.
- **[`heatmap`](chart-heatmap.md)** — you have a value for every row × column combination and want cells shaded, not items placed.
- **[`sketch`](chart-sketch.md)** — you're drawing a picture where position is layout, not a rating.
- **[`block`](chart-block.md)** — the grid is a physical or logical arrangement rather than a scoring space.

## Syntax

```
quadrant Chart Title
x-label Low Label, High Label
y-label Low Label, High Label

top-right Quadrant Label color
top-left Quadrant Label color
bottom-left Quadrant Label color
bottom-right Quadrant Label color

Item Name x y
```

## Directives

| Directive      | Description                                              |
| -------------- | -------------------------------------------------------- |
| `x-label`      | Two comma-separated labels for the X axis (low, high).    |
| `y-label`      | Two comma-separated labels for the Y axis (low, high).    |
| `top-right`    | Label for the top-right quadrant, with optional color.    |
| `top-left`     | Label for the top-left quadrant, with optional color.     |
| `bottom-left`  | Label for the bottom-left quadrant, with optional color.  |
| `bottom-right` | Label for the bottom-right quadrant, with optional color. |

The title is line 1 — there is no separate title directive.

## Data Format

Each data point specifies X and Y coordinates between 0 and 1:

```
Item A 0.9 0.95
Item B 0.4 0.3
```

Both coordinates are qualitative placements. Values outside 0–1 are read as-is
without a warning and will land outside the plotted square, so keep them in range.

The two coordinates are the last two numbers on the line, so an item name that
ends in a number is safe as written — `Billing v2 0.85 0.8` keeps `Billing v2`
as the name. Quote it (`"Phase 3" 0.4 0.5`) only if the name is *nothing but* a
number.

## Quadrant Colors

A palette color word as the last token of a quadrant label sets that quadrant's color:

```
top-right Promote green
top-left Train yellow
bottom-left Maroon red
bottom-right Watch Closely purple
```

Omit the trailing color word and the quadrant takes its default tint.

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

- **Positions are qualitative judgements in a 0–1 space, not measurements.** Real measured values are accepted without complaint and plotted off the grid — feeding a scatter's worth of data into a quadrant strips the units and the axis scale while keeping the visual authority of a measured plot. Use [`scatter`](chart-scatter.md) for measurements.
- **Both coordinates are required.** A row with one number is dropped from the plot.
- **The axis labels are the two poles, comma-separated** — they name the ends of the spectrum, not the quantity.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`scatter`](chart-scatter.md) · [`tech-radar`](chart-tech-radar.md) · [`heatmap`](chart-heatmap.md) · [`sketch`](chart-sketch.md) · [`block`](chart-block.md)
- **Then:** [Colors & palettes](colors.md)
