```dgmo
boxplot Plunder per Raid by Ship (doubloons)
y-axis Doubloons
points
mean
fill-solid

[Black Pearl] teal
120 135 140 150 155 160 170 180 195 210 400

[Queen Anne's] red
200 240 260 310 330 380 450 520

[Fancy] green
60 70 75 80 85 90 95 100 110

[Adventure Galley] yellow
90 100 115 125 130 140 150 170

[Revenge] purple
150 165 180 190 210 220 240 260 300
```

## Overview

A box plot sums up a pile of numbers per group in one shape: a box from the first to the third quartile, a thicker line at the median, whiskers to the furthest ordinary values, and hollow dots for outliers. It is the chart for **comparing spread and outliers across groups**: cycle times, response times, test scores, quality and Six Sigma work, research papers. Write the raw numbers. The chart works out the quartiles. The same input as a histogram, so changing the first word switches the view.

## When to use

- **`boxplot`** — you have many numbers per group and want to compare their middle, spread and outliers side by side.
- **histogram** — you want the shape of **one** distribution: where it peaks, whether it has two humps.
- **[`bar`](chart-bar.md)** — each group has one value, not a pile of them.
- **[`scatter`](chart-scatter.md)** — every observation has two measurements and the relation between them is the point.

## Syntax

```
boxplot Chart Title
y-axis Days
points
mean

[Platform]
2 2 2 3 3 3 4 5 5 6 8 26

[Payments] red
3 3 4 4 4 5 5 6 9
```

- **Values** are free numbers, any number per line, separated by spaces or commas. Negative numbers are fine.
- **Groups** open with a `[Name]` header line. An optional colour word after the `]` colours that box (`[Payments] red`). Values above the first header form one unnamed group.
- Every box shares one colour. A group takes another colour only when its header names one.
- `n = 30` is printed under each group name.

## Options

| Option                   | Effect                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `points`                 | Draw every value as a dot beside its box. A fixed hash spreads them sideways, so the same source gives the same picture |
| `mean`                   | Draw a hollow diamond at the mean                                                       |
| `orientation-horizontal` | Groups down the left, values across                                                     |
| `y-axis <Title> [min..max] [log]` | The value axis, in either orientation, e.g. `y-axis Days 0..30`                |
| `x-axis <Title>`         | Title for the groups. A title only                                                      |
| `format`, `unit`, `locale` | Number format of the values                                                           |
| `fill-tint`, `fill-solid`, `fill-outline` | How the boxes are filled                                               |

The title and the frame lines `subtitle` and `footnote` work as in every chart.

## How the box is drawn

- **Box** — first quartile (Q1) to third quartile (Q3). **Median** — the thicker line inside.
- **Quartiles** use linear interpolation between ranks (Excel `QUARTILE.INC`, R type 7).
- **Whiskers** follow Tukey's rule: they reach the last value within 1.5 × the box height (IQR) of the box. Values beyond are **outliers**, drawn as hollow dots. No other whisker rule exists.

## Showing every value

```dgmo
boxplot Plunder per Raid (doubloons)
y-axis Doubloons
points
mean

[Galleon Raids]
120 135 140 150 155 160 170 180 195 210 400

[Merchant Sloops] green
60 70 75 80 85 90 95 100 110

[Fort Assaults] orange
200 240 260 310 330 380 450 520
```

`points` suits small groups, where the dots show what a box hides. `mean` against the median shows skew.

## Laid on its side

```dgmo
boxplot Cannon Reload Time by Gun Crew (seconds)
orientation-horizontal
y-axis Seconds 0..120
mean

[Port Battery]
42 45 48 50 52 55 58 60 63 70 95

[Starboard Battery]
38 40 44 46 47 49 51 53 56 61

[Bow Chasers] purple
55 60 62 65 68 70 74 80 85 90 110
```

`orientation-horizontal` is the same flag as in `bar`. Long group names read better down the left.

## Appearance

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **A word in a value row** is an error (`E_BOXPLOT_NOT_A_NUMBER`). The numbers in that row still count.
- **A `[Name]` header with no values** under it draws no box (`W_BOXPLOT_EMPTY_GROUP`).
- **Fewer than 5 values in a group** still draws a box, with a warning (`W_BOXPLOT_FEW_VALUES`). Quartiles of so few values say little.
- **Expecting pre-computed summaries.** Give the raw values; a five-number summary per group is not supported. Notches, violin shapes and other whisker rules are not either.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`scatter`](chart-scatter.md) · [`bar`](chart-bar.md) · [`heatmap`](chart-heatmap.md)
- **Then:** [Colors & palettes](colors.md)
