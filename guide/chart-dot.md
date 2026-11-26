```dgmo
dot Captain Vane takes the largest share of every haul
subtitle Median share of plunder by rank, before and after the Tortuga mutiny, doubloons
series Before gray, After red
sort After
gap
connector direction
x-axis 0..

Captain 212 296
Quartermaster 168 181
First Mate 151 117
Sailing Master 139 163
Navigator 122 74
Boatswain 96 129
Gunner 88 52
Surgeon 79 138
Carpenter 64 47
Cook 46 91
Cabin Boy 24 33
Powder Monkey 18 58
Lookout 31 12
```

## Overview

A dot chart puts each category on its own row and its values as dots along one shared scale. One value per row is a **dot plot**, a lighter alternative to bars. Two values make a **dumbbell**: two dots joined by a line, showing a gap or a before and after. Three or more make a **strip**, every value on the row's line and the connector spanning lowest to highest.

## When to use

- **`dot`** — many categories, one to a few values each, and the question is how far apart they sit or how much each one moved.
- **[`bar`](chart-bar.md)** — the size from zero matters, or the values are counts that should read as quantities.
- **[`slope`](chart-slope.md)** — a few categories over exactly two periods, where crossing lines are the story.

## Syntax

```
dot Chart Title
series First, Second

Category A 71 78
Category B 64 61
```

A single value per row needs no `series` line:

```dgmo
dot Median share of plunder by rank, doubloons

Captain 212
Quartermaster 168
Cook 71
```

| Line | Does |
| ---- | ---- |
| `Label v1 [v2 …]` | a row: its name, then one value per `series` name, in `series` order |
| `series A, B` | names the columns, on one line or as an indented block. A colour word after a name sets its colour (`series Before gray, After blue`) |

- **Shape** — one value draws a dot, two a dumbbell, three or more a strip.
- **Labels** — each series name sits above its dot in the first row, in the series colour. There is no legend.
- **Names ending in a number** — under a `series` line, values are read from the end of the row, so `Deck 2 45 50` under two series is the row `Deck 2`.
- **Axis** — fitted to the data with round ends, so it need not start at zero. `x-axis 0..100` sets the range; `x-axis 0..` pins only the start.

## Options

| Option | Effect |
| ------ | ------ |
| `sort gap` | Rows by last − first, largest first (two or more series) |
| `sort <series>` | Rows by that series' value, largest first |
| `sort name` | Rows A–Z. Default: as written |
| `gap` | Print last − first at each row's right end, signed (`+7`, `−3`) |
| `connector direction` | Connectors green for a rise and red for a fall. Default: grey |
| `connector direction down` | The same, flipped, for when a fall is good |
| `x-axis [min..max] [log]` | The value range and scale |
| `format`, `unit`, `locale` | The number format of the axis and the gaps |
| `subtitle`, `source`, `footnote` | The chart frame |

## A strip of three values

```dgmo
dot Storm crossings run longest through the Devil's Strait
subtitle Fastest, typical and slowest crossing by route, days
series
  Fastest
  Typical
  Slowest
sort Slowest
x-axis 0..

Tortuga to Nassau 3 5 9
Port Royal to Havana 4 7 12
Devil's Strait 6 11 24
Spanish Main Run 5 8 15
Cape Gale Passage 7 10 19
```

With three series each row becomes a range: the connector runs from the fastest to the slowest crossing, and `sort Slowest` puts the worst route on top.

## Appearance

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **A row with a different number of values than `series`** warns and is not drawn.
- **Two values with no `series` line** warn: without `series` the chart expects one value per row.
- **`gap`, `sort gap` or `connector direction` on a one-value chart** warn and are ignored.
- **`sort` naming a series that does not exist** warns; the rows stay as written.
- **A value written with a unit, like `71%`,** is not a number. Write `71` and set `unit` or `format`.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`slope`](chart-slope.md) · [`line`](chart-line.md)
- **Then:** [Colors & palettes](colors.md)
