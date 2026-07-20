```dgmo
heatmap Tavern Traffic by Hour
columns 6am, 9am, 12pm, 3pm, 6pm, 9pm, 12am

Monday 2 4 7 5 9 12 6
Tuesday 2 4 6 5 8 11 5
Wednesday 3 5 7 6 10 13 7
Thursday 3 5 8 7 12 16 9
Friday 4 6 9 9 18 24 17
Saturday 6 8 11 12 21 27 20
Sunday 5 7 9 8 13 15 8
```

## Overview

A grid of cells shaded by value, revealing patterns and hotspots across two dimensions at a glance — the chart for dense matrices where color makes the structure pop. Reach for it when you need to break your numbers down by **two things at once** (day *and* hour, team *and* quarter, product *and* channel) and you want the reader to spot the hot corner without reading a single number. The grid positions are arbitrary labels: rows and columns can be reordered freely without changing what the chart means.

## When to use

- **`heatmap`** — you have a value for every row × column pair, and both dimensions are named categories.
- **[`map`](chart-map.md)** — your rows are **places**: states, countries, regions, cities. Laying geography out as an arbitrary grid discards exactly the thing the reader is looking for, and grid adjacency invents a neighborliness that doesn't exist. If the rows have locations, put them on the map.
- **[`bar`](chart-bar.md)** — you only have *one* dimension to break down by. A heatmap of a single row is a bar chart with the numbers made harder to read.
- **[`scatter`](chart-scatter.md)** — your two dimensions are measured numbers with units, not named categories.
- **[`radar`](chart-radar.md)** — you're profiling one or two subjects across their attributes, rather than comparing many subjects × many attributes.
- **[`quadrant`](chart-quadrant.md)** — items sit at *positions* on two axes; they aren't cells shaded by a value.
- **[`venn`](chart-venn.md)** — the question is which groups *overlap*, not what value each pair holds.
- **[`raci`](chart-raci.md)** — the cells say what *kind* of involvement someone has (responsible, consulted) rather than holding numbers.

## Syntax

```
heatmap Chart Title
columns Col1, Col2, Col3

Row Label value1 value2 value3
```

## Metadata Keys

| Key       | Description                          | Required |
| --------- | ------------------------------------ | -------- |
| `chart`   | Must be `heatmap`                    | Yes      |
| `columns` | Comma-separated column header labels | Yes      |

The title is the rest of line 1 — there is no `title` directive.

## Data Format

Each data line defines a row with space-separated values matching the column count:

```
Monday 2 4 7 5 9 12 6
Tuesday 2 4 6 5 8 11 5
```

The row label becomes the Y axis label. Cell colors are scaled automatically across the full value range, so the lowest value in the matrix anchors one end of the ramp and the highest anchors the other.

## Cell Values

Each cell prints its own value in the center, tinted to stay legible against the cell's fill. Hide the numbers with a bare flag on its own line, leaving only the color pattern:

| Flag       | Effect                       |
| ---------- | ---------------------------- |
| `no-value` | Hide the number in each cell |

Reach for `no-value` on large matrices where the individual figures are unreadable anyway and the point is the shape of the pattern.

## Appearance

The fill family changes how the color ramp is applied to the cells:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted cell fills (default). |
| `fill-solid` | Fully saturated cell fills. |
| `fill-outline` | Hollow cells — the ramp color moves to the cell border, drawn at full saturation so low values stay visible. |
| `no-title` | Hide the title line. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Ragged rows are accepted silently.** A row with fewer values than there are columns leaves trailing cells empty; a row with more spills past the header. Nothing warns — count the cells in one row of the render against your column list.
- **A grid discards geography.** Rows named after states or countries put the reader in front of arbitrary adjacency. Use [`map`](chart-map.md) when the shape of the place is what they are looking for.
- **A row label ending in a digit absorbs its first value.** Quote the label.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`map`](chart-map.md) · [`bar`](chart-bar.md) · [`scatter`](chart-scatter.md) · [`radar`](chart-radar.md) · [`quadrant`](chart-quadrant.md) · [`venn`](chart-venn.md) · [`raci`](chart-raci.md)
- **Then:** [Colors & palettes](colors.md)
