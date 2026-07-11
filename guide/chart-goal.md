```dgmo
goal Doubloons Plundered ($)
now 6400
target 10000
```

## Overview

A goal chart is a single **progress-toward-a-target** reading: one `now` value against one `target`, answering "how close am I?" at a glance. Reach for it for a KPI tile, a fundraising thermometer, a quarterly quota, or a completion percentage — anywhere one number racing toward one goal is the whole story. It has no time axis, no series, and no milestones; for a running clock use `countdown`, for a value over time use `line`.

## Syntax

```
goal Title with unit, e.g. "Marathon Fund ($)"
now 6400          // current value  — space-separated, no colon
target 10000      // goal value     — must be > 0
```

The first line declares the chart type and a title. Put the **unit in the title** — there's no `format` or `currency` directive. `now` and `target` are space-separated `key value` directives (like gantt's `start-date`): no colon. Values accept `_` separators (`10_000`) but not thousands commas.

The percent is simply `now / target`. Values auto-compact for display (`6.4k`, `1.2M`).

## Faces

A bare-flag directive on its own line picks the render face (omit it for the default bar):

```dgmo
goal Grog Barrel Fill (L)
thermometer
now 34
target 50
```

```dgmo
goal Voyage Quota (chests)
gauge
now 64
target 100
```

| Flag          | Face                                             |
| ------------- | ------------------------------------------------ |
| *(none)*      | Progress bar — horizontal rounded fill (default). |
| `thermometer` | Vertical tube + bulb, column rises with progress. |
| `gauge`       | Semicircular dial with a needle and value arc.    |

All three read the **same** `now`/`target` pair — the flag only changes the drawing.

## Over-target & edge cases

- **Over target** (`now > target`): the fill clamps at 100% but the % label stays truthful (`120%`); the gauge needle pins at the max.
- **Negative `now`**: the fill clamps to 0%, the label stays honest.
- **Missing / non-positive `target`**: flagged as an error, but the chart still renders a 0% shell.
- **Missing `now`**: treated as 0 with a warning.

## Color

Add an optional trailing color word to the title line — `goal Marathon Fund ($) green`. The fill defaults to a light 25% tint of the series color; add `solid-fill` for full saturation.

## Directives

| Directive              | Effect                                        |
| ---------------------- | --------------------------------------------- |
| `thermometer` / `gauge` | Select the render face (bare flag).           |
| `now <n>`              | Current value (required, ≥ 0).                 |
| `target <n>`           | Goal value (required, > 0).                    |
| `no-percent`           | Hide the `%` label.                            |
| `no-value`             | Hide the raw `now / target` label.             |
| `solid-fill`           | Full-saturation fill instead of the 25% tint.  |
| `no-title`             | Hide the banner title.                         |

## Tips

- Keep the unit in the **title** (`($)`, `(L)`, `(chests)`) — a goal has no unit directive.
- One value only: a goal has no children. Indented lines are ignored with a warning.
- Use `thermometer` for fundraising and "fill it up" framings, `gauge` for a speedometer/utilization feel, and the default bar for a plain KPI tile.
- Reach for `goal` when one number chases one target; use `line` for a trend and `countdown` for a deadline.
