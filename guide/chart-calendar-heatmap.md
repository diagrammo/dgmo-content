```dgmo
calendar-heatmap Cannon Volleys Fired in 2026
// Daily log: one `date value` line per day; a missing day is zero.
year 2026
unit volley

01-03 2
01-09 1
02-14 4
03-02 3
05-18 6
06-05 9
06-06 14
07-11 4
07-12 9
08-21 6
09-30 3
11-02 1
12-24 2
```

## Overview

A calendar of squares, one per day: one column per week, seven weekday rows, each square shaded by that day's value. It is the chart for a **daily log across weeks or a year**: commits, workouts, sales, volleys fired. The reader sees streaks, gaps and busy seasons at once. The input is a plain log. Write one `date value` line per day it happened, and every other day counts as zero.

## When to use

- **`calendar-heatmap`** — you have a value per **day** and the question is when, over weeks or months, the busy and quiet stretches fall.
- **[`heatmap`](chart-heatmap.md)** — your two dimensions are named categories (team × quarter, day-of-week × hour), not a run of consecutive dates.
- **[`line`](chart-line.md)** — the point is the exact trend and the numbers, not the shape of a habit.

## Syntax

```
calendar-heatmap Chart Title
year 2026
unit commit

01-02 1
01-05 8
2026-03-10 11
03-10 1
```

- **Entry line** — a date, a space, then a number of zero or more. A date is `YYYY-MM-DD`, or `MM-DD` when a `year` line is set.
- A date not listed is zero. A date listed twice **adds up**, so a log can append `03-10 1` for each commit.
- **Span** — `year` draws that whole year. `from … to …` trims it to a range. With neither, the chart spans the dates you give.
- Entries and options may come in any order, and blank lines are ignored.

## Options

| Option                          | Effect                                                               |
| ------------------------------- | -------------------------------------------------------------------- |
| `year YYYY`                     | Draw that whole year, and read `MM-DD` dates in it                   |
| `unit <noun>`                   | What a value counts, written singular (`unit commit` → "11 commits") |
| `from YYYY-MM-DD to YYYY-MM-DD` | Trim the grid to a range                                             |
| `week-start monday`             | Monday on the top row. Default `sunday`                              |
| `max N`                         | Pin the top shade at N instead of the quartiles                      |
| `no-summary`                    | Hide the total and busiest day under the title                       |
| `no-legend`                     | Hide the Less … More legend at the bottom right                      |

A unit that is a word takes an English plural; one with no vowel (`km`, `kg`) stays as written. The title and the frame lines `subtitle`, `source` and `footnote` work as in every chart.

## Shading

Five steps. Zero is grey. The other days split into four equal-count bands (quartiles of the days that have a value), so one huge day does not wash out the rest. Set `max N` when you want the shade to mean the same thing across charts, for example "20 or more is the darkest". Four equal ranges then run up to N.

## Trimming to a range

```dgmo
calendar-heatmap Leagues Sailed, Autumn Voyage
from 2026-09-01 to 2026-11-30
week-start monday
unit league
max 20

2026-09-01 5
2026-09-03 12
2026-09-08 22
2026-09-09 18
2026-09-14 8
2026-09-21 15
2026-10-05 12
2026-10-12 22
2026-10-13 5
2026-10-27 18
2026-11-03 3
2026-11-16 15
```

A shorter span draws bigger squares, so a quarter reads better than a year when the log is short. A date outside the span is left out, with a warning.

## Reading the chart

The subtitle line shows the total and the busiest day (`844 commits · busiest day Mar 5`). Hover or focus a day to see its value, the unit and the full weekday date. Tab moves along the days.

## Appearance

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **`MM-DD` without a `year` line** is an error. Add `year 2026`, or write the full date.
- **A date that does not exist** (`2026-02-30`) is an error.
- **A colon or comma in an entry** (`2026-03-10: 4`) is not a date and a value; write them separated by a space.
- **Expecting a zero line to be needed.** Days you leave out already count as zero.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`heatmap`](chart-heatmap.md) · [`line`](chart-line.md)
- **Then:** [Colors & palettes](colors.md)
