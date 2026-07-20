```dgmo
radar Ship Combat Rating

Firepower 85
Speed 70
Armor 60
Maneuverability 90
Crew Morale 75
```

## Overview

Plots several measures on axes radiating from a center, tracing a shape that profiles strengths and weaknesses — "strong here, weak there" at a glance, for one subject or a few compared on the same criteria. **Hard precondition: every axis shares one scale.** All axes are drawn against a single maximum taken from the largest value anywhere in the chart, so mixing units — dollars on one axis, percent on another, a raw count on a third — collapses the small-numbered axes to stubs while the shape still looks decisive and meaningful. Normalize your values to a common range (0–100 is conventional) before plotting, or use [`bar`](chart-bar.md). A radar also needs **at least three axes**; with fewer, the chart renders blank.

## When to use

- **`radar`** — the *overall shape* across several measures is the point, all measures are on one comparable scale, and you have three or more of them.
- **[`bar`](chart-bar.md)** — the individual numbers need to be read accurately, or your measures are in different units and can't be normalized honestly.
- **[`heatmap`](chart-heatmap.md)** — you're profiling many subjects × many attributes rather than one or two.
- **[`polar-area`](chart-polar-area.md)** — each label is a separate thing with its own size, not an attribute of one subject forming a profile.

## Syntax

```
radar Chart Title

Label value
```

Each data line defines one axis of the radar with its value. **Three axes minimum** —
a radar with fewer renders nothing at all.

## Data Format

```
Firepower 85
Speed 70
Armor 60
```

Values are plotted on axes radiating from the center, connected by a filled polygon.
The outer edge of the plot is set from the single largest value across every axis
and every series, with a small headroom margin — so an axis carrying 3 next to an
axis carrying 3000 will sit almost on the center point.

## Multiple Series

Add a `series` block to compare several subjects on the same axes. Each subject
draws its own polygon in its series color, and a legend is added. Every data row
then carries one value per series (in series order):

```dgmo
radar Ship Combat Ratings by Vessel
series
  Black Pearl blue
  Queen Anne's Revenge green
  Flying Dutchman purple

Firepower       85  70  95
Speed           90  65  55
Armor           60  80  90
Maneuverability 88  62  50
Crew Morale     75  85  70
Cannon Range    70  78  92
```

The trailing color token after each series name is optional — omit it and series
take palette colors by index. The shared-scale rule spans series as well as axes:
all polygons are drawn against the same maximum.

## Axis Labels

### Quote any label that ends in a digit

A data row is split by peeling numbers off the **end** of the line: the last one
number per series becomes the data, and **everything left over stays in the
label**. A label that ends in a digit is therefore ambiguous, and the parser
resolves it by counting, not by meaning. On a single-series chart `Armor 50 60`
does not mean "Armor 50, value 60" *and* it does not mean "Armor, values 50 and
60" — it renders an axis literally named **`Armor 50`** with the value `60`.

**Quote the label to pin it**, exactly as [`treemap`](chart-treemap.md) does:

```dgmo
radar Deck Readiness
series
  Black Pearl blue
  Flying Dutchman purple

"Gun Deck 2" 60 72
"Gun Deck 3" 84 66
Powder Store 70 55
```

Two rules make the difference between an annoyance and a silent wrong answer:

- **With a `series` block you get a warning.** Whenever a row offers more
  trailing numbers than there are series, the parser says so and prints the
  quoted rewrite of the reading it chose — `Armor 50 60 70 80` against two
  series reports back `"Armor 50 60" 70 80`. If that is not what you meant, the
  message shows you the line to write instead.
- **Without a `series` block there is no such check.** A single-series radar
  takes the last number and leaves every earlier one in the label, silently, no
  matter how many there are. `Armor 50 60` renders an axis called "Armor 50" and
  never says a word. Quote defensively here — nothing will catch it for you.

### Short labels are the only sizing lever

Axis names are drawn at a fixed size, anchored outward along their spoke.
**There is no directive for label size, wrapping, rotation, or truncation** —
long names on the left and right of the circle will run outward and can collide
with the edge of the image or with each other.

The only control you have is the text itself. Shorten the axis names — `Maint.`
over `Maintainability`, `Crew` over `Crew Morale Rating` — or move to
[`bar`](chart-bar.md), where category labels get a proper axis and far more
room. This is a real limitation, not an oversight in this page.

### Three axes minimum

Under three data rows, a radar has no polygon to draw and **draws nothing at all
— no rings, no spokes, and no warning**. Validation reports the chart as clean.
If your radar comes back blank, count your axes first.

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

## Next

- **Related:** [`bar`](chart-bar.md) · [`heatmap`](chart-heatmap.md) · [`polar-area`](chart-polar-area.md)
- **Then:** [Colors & palettes](colors.md)
