# Writing Dates

Every chart type that reads dates — **gantt, timeline, event-line, countdown, and pert** — shares one date grammar. Write dates however feels natural; Diagrammo normalizes them internally, so the rendered output is identical no matter which form you type.

## Formats

All of these mean the same day:

| You write            | Reads as     | Note                                   |
| -------------------- | ------------ | -------------------------------------- |
| `2026-07-04`         | Jul 4, 2026  | ISO — always unambiguous               |
| `2026-07`            | Jul 2026     | month only                             |
| `2026`               | 2026         | year only                              |
| `07-04` / `7/4`      | Jul 4        | numeric, **US month-first** (see below) |
| `Jul 4` / `July 4`   | Jul 4        | month name — never ambiguous           |
| `July 4, 2026`       | Jul 4, 2026  | full natural form                      |
| `4 Jul 2026`         | Jul 4, 2026  | day-first natural form                 |

Datetimes work where the chart supports a time: `2026-07-04 14:30`. Timeline also accepts era-signed years like `753 BCE` and `14 CE`.

## Numeric dates are US month-first

`7/4` is **July 4th** by default (month-first). Two ways to change that:

- Add **`date-order dmy`** once at the top and every numeric slash/dash date reads day-first — `7/4` becomes April 7th.
- Or just use a month name — `Jul 4` and `4 Jul` are never ambiguous and ignore `date-order` entirely.

Out-of-range numbers sort themselves out regardless: `13/2` can only be Feb 13.

## You rarely need to type the year

Leave the year off a date and Diagrammo fills it in, in this order:

1. **A year on the date itself** always wins.
2. **A `year 2026` line** anywhere in the chart sets the base year for every bare date below it.
3. **A neighbouring dated row.** Timelines and event lines carry the year forward from the last full date and roll into the next year when a month falls earlier (a November start followed by a January row lands in the next year). Gantt and PERT anchor every bare date to the project's start date.
4. **This year**, as a last resort — only if the chart has no full date at all. You'll see a gentle hint suggesting you add `year 2026` so the chart looks the same next January.

So a gantt only needs the year once:

```dgmo
gantt Launch
year 2026
start Jan 6
  Design 2w
  Build 3w
  Launch start: 7/1
```

## Directives

These work in any date-bearing chart, and it doesn't matter whether they appear before or after the dates they affect:

| Directive          | What it does                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `year 2026`        | base year for bare month-days                                      |
| `date-order dmy`   | numeric slash/dash dates read day-first (default is US month-first) |
| `no-current-year`  | a chart with no year anywhere is an error instead of assuming this year — use it when output must be reproducible |

Era, marker, and holiday bands (gantt and timeline) accept the same formats. Existing charts written in ISO keep working unchanged — this is an addition, not a migration.
