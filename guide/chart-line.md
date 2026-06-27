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

Week 1  8.2  1.1  0.3
Week 2  9.5  1.6  0.5
Week 3 11.8  2.4  0.9
Week 4 13.4  3.3  1.4
```

A short one-line form is tolerated: `series Free Pro Team`.

> The former standalone `multi-line` chart type was removed in 1.0 — use `line` + a `series` block.

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
| `title`   | Chart title displayed above the chart     | No       |
| `series`  | Name of the data series (shown in legend) | No       |
| `x-label` | Label for the X axis                      | No       |
| `y-label` | Label for the Y axis                      | No       |
| `color`   | Override the line color                   | No       |

## Data Format

Each data line follows the pattern `Label value`:

```
Day 1 8
Day 2 10
Day 3 7
```
