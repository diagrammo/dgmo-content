```dgmo
polar-area Cargo Tonnage by Port

Port Royal 1200
Havana 1050
Tortuga 940
Nassau 780
Kingston 610
```

## Overview

Compares independent items as wedges of equal angle but varying radius around a circle — a rounder take on a bar chart. Every wedge gets the same slice of the circle; only the radius carries the value, read against the largest value in the set. Reach for it when you want to compare *how big each thing is* on one common scale and nothing is being divided up: tonnage by port, rainfall by month, calls by hour. Each label must be a separate thing measured the same way.

## When to use

- **`polar-area`** — several independent items, each with its own magnitude on one shared scale, arranged radially.
- **[`pie`](chart-pie.md)** — the question is "what share is each", and the values sum to a meaningful whole.
- **[`radar`](chart-radar.md)** — the axes are different *attributes of one thing* and the profile shape is the point, not the individual sizes.
- **[`bar`](chart-bar.md)** — anyone needs to compare the values precisely. Radius is harder to read than length.

## Syntax

```
polar-area Chart Title

Label value
```

## Data Format

Each data line follows the pattern `Label value`:

```
Port Royal 1200
Havana 1050
Tortuga 940
```

Wedge radius is scaled against the largest value present. Each label is also
shown with its value and its percentage of the summed total — suppress any of
those parts with the label directives below when the values don't compose a whole.

A palette color word after the label — before the value — sets one wedge's color explicitly:

```
Port Royal blue 1200
```

## Directives

| Directive    | Effect                                          |
| ------------ | ----------------------------------------------- |
| `no-name`    | Hide wedge labels.                              |
| `no-value`   | Hide raw values in wedge labels.                |
| `no-percent` | Hide the computed percentage in wedge labels.   |

The title is line 1 — there is no separate title directive.

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

- **Related:** [`pie`](chart-pie.md) · [`radar`](chart-radar.md) · [`bar`](chart-bar.md)
- **Then:** [Colors & palettes](colors.md)
