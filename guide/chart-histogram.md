```dgmo
histogram Raid Hauls by Fleet
x-axis Doubloons plundered
y-axis Share of raids
bin-width 30
percent
mean

[Black Pearl] blue
263 224 82 154 188 133 370 135 155 176 82 172
133 127 244 153 90 181 142 80 217 166 138 130
205 62 127 74 70 235 133 126 84 50 187 218
112 109 110 100 136 480 311 164 193 247 111 129
69 163 146 96 134 128 100 116 99 228 193 115
114 80 135 200 103 115 256 38 90 143 230 124
161 88 198 141 119 147 98 251

[Flying Dutchman] red
107 125 107 90 108 68 42 97 69 116 65 21
66 139 84 57 74 110 109 100 137 115 94 112
141 122 124 65 91 115 87 125 112 120 89 166
130 89 98 168 85 119 122 95 62 100 105 127
117 96 119 110 101 97 88 114 65 77 95 54
83 39 76 111 111 93 89 55 146 109 126 70
90 44 117 121 42 94 113 46
```

## Overview

A histogram counts raw numbers into bins and draws each count as a bar, so the shape of a set of measurements — where it centres, how wide it spreads, whether it skews — shows at a glance. Reach for it when you have many values of one measurement and want their distribution, not the individual values. You give the numbers; dgmo picks the bins.

## When to use

- **`histogram`** — many raw values of one measurement, and the question is how they are spread.
- **[`bar`](chart-bar.md)** — each bar is a named category with its own value, not a count of measurements.
- **[`scatter`](chart-scatter.md)** — each observation has two measurements and you want how they relate.

## Syntax

```
histogram Chart Title
x-axis X Axis Title
y-axis Y Axis Title
bin-width 5
percent
mean
median

12 18 21, 9 15
27 33
```

## Metadata Keys

| Key          | Description                                                | Required |
| ------------ | ---------------------------------------------------------- | -------- |
| `chart`      | Must be `histogram`                                        | Yes      |
| `x-axis`     | `[title] [min..max]` — a range clips the bins; values outside it are not counted | No |
| `y-axis`     | `[title] [min..max] [log]` for the count axis              | No       |
| `bin-width`  | Exact bin width; edges fall on multiples of it             | No       |
| `bins`       | About N bins with round edges (`bins 10` can give 9 or 12) | No       |
| `bin-start`  | The first edge; values below it are not counted            | No       |
| `percent`    | Y shows each group's share of its own values, not a count  | No       |
| `mean`       | A vertical line per group at the mean, labelled            | No       |
| `median`     | A vertical line per group at the median, labelled          | No       |

## Data Format

Values are bare numbers — any number per line, separated by spaces or commas. There are no labels. A word that is not a number is an error, though the numbers on its line still count.

```
12 18 21
9, 15, 27
33
```

With no bin directive the bin width is chosen from the data and rounded to 1, 2, 2.5 or 5 × 10ⁿ. A value exactly on an edge goes in the bin to its right; the last bin is closed on both sides. Setting both `bins` and `bin-width` is an error and `bin-width` wins.

## Groups

Use `[Name] color` headers — the color goes after the bracket — to overlay several distributions. Groups share one set of bins and draw as translucent fills with a stepped outline in the group color. There is no side-by-side or stacked mode.

```dgmo
histogram Doubloons per Raid
x-axis Doubloons
y-axis Share of raids
bin-width 50
percent
mean

[Black Pearl] blue
120 85 210 140 95 175 160 110 230 130
145 90 185 155 105 200 125 170 115 150
135 195 100 165 180 140 120 205 155 130

[Flying Dutchman] red
60 95 45 130 80 70 110 55 90 100
75 120 65 85 140 50 105 95 70 115
80 60 125 90 100 150 75 85 65 110
```

Add `percent` when the groups differ in size, so each sums to 100%.

## Pre-counted ranges

When you already hold the counts, write `lo-hi count` rows. The counts are drawn as given, and `mean` and `median` are estimated from the bins:

```dgmo
histogram Crew Ages Aboard the Revenge
x-axis Age in years
y-axis Sailors

15-20 6
20-25 19
25-30 27
30-35 18
35-40 9
40-45 4
45-50 2
```

Ranges must run low to high and must not overlap. With unequal widths a bar's height is its count divided by its width, so area stays true.

## Number format — `format`, `unit`, `locale`

These apply to the x values: tick labels, hover and the mean / median labels. Counts print plain, and `percent` prints `%`. For example `format compact`, or `unit days` for text after each number.

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

- **Do not mix raw values and pre-counted rows.** A chart is all one or the other; the other kind errors and its line is left out.
- **`x-label` and `y-label` are not valid.** Use `x-axis` and `y-axis`.
- **Both `bins` and `bin-width` is an error.** Pick one.
- **A histogram counts measurements, not categories.** For one value per named item, use [`bar`](chart-bar.md).
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`scatter`](chart-scatter.md)
- **Then:** [Colors & palettes](colors.md)
