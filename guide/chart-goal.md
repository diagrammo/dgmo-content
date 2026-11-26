```dgmo
goal Doubloons Plundered ($)
actual 6400
target 10000
note
  **Welcome aboard, matey!** The hold's filling nicely — `6.4k` of `10k` doubloons.
  - *Tortuga* raid — counted and stowed
  - **Port Royal** — first mate swears it's *almost* tallied
  The bar rides **orange** at 64%; cross `80%` and she turns green.
```

## Overview

A goal chart is a single **progress-toward-a-target** reading: one `actual` value against one `target`, answering "how close am I?" at a glance. Reach for it for a KPI tile, a fundraising thermometer, a quarterly quota, or a completion percentage — anywhere one number racing toward one goal is the whole story. Add `bands` to name the zones (Poor, OK, Good), or several `[Measure]` rows to get a **bullet chart**. It has no time axis and no series.

## When to use

- **`goal`** — one number racing toward one target, and "how close am I?" is the whole question.
- **[`countdown`](chart-countdown.md)** — the thing running out is *time*, not a quantity. A deadline drawn as a goal bar implies you're 60% **done** when you're really 60% **out of time** — `goal` has no time dimension at all.
- **[`bar`](chart-bar.md)** — you're comparing several numbers against each other rather than one number against its target.
- **[`funnel`](chart-funnel.md)** — you have several sequential stages each losing volume, not one aggregate reading.
- **[`gantt`](chart-gantt.md)** — you want the task list and dates behind the percentage, not the single "% there" reading.
- **[`kanban`](chart-kanban.md)** — you're tracking many individual items sitting in various stages rather than one rolled-up number.
- **[`line`](chart-line.md)** — the point is the value's trend over time.

## The three faces

The face is the heart of a goal chart. The same `actual`/`target` pair can be drawn three ways — **progress bar**, **thermometer**, or **gauge** — and the one you pick sets the whole mood of the reading. Choose the face first, then fill in the numbers. Select it with a **bare flag on its own line** (no colon, no value); omit the flag for the default bar.

### Progress bar (default)

The workhorse. A horizontal rounded fill — compact, honest, unmistakable. Reach for it for a plain KPI tile, a dashboard cell, or anywhere the number just needs to read at a glance. No flag needed.

```dgmo
goal Doubloons Plundered ($)
actual 6400
target 10000
```

### Thermometer

A vertical tube with a bulb; the column climbs as you fill it. This is the **"fill it up" face** — fundraising drives, tank/barrel levels, a stretch goal you're pouring into. It reads as a physical thing filling, which is why the classic charity fundraiser thermometer works.

```dgmo
goal Grog Barrel Fill (L)
thermometer
actual 34
target 50
```

### Gauge

A semicircular dial with a needle sweeping an arc. This is the **"how's it running" face** — speedometers, utilization, capacity, quota attainment. The needle position gives an instant instrument-panel read, and it **pins at the max** when you blow past the target.

```dgmo
goal Voyage Quota (chests)
gauge
actual 64
target 100
```

> All three faces read the **same** `actual`/`target` pair — the flag only changes the drawing, never the meaning. The percent, the traffic-light color, the labels, and the note all behave identically across faces.

| Flag          | Face        | Reach for it when…                          |
| ------------- | ----------- | ------------------------------------------- |
| *(none)*      | Progress bar | a plain KPI / dashboard number.             |
| `thermometer` | Thermometer  | fundraising or a "fill it up" framing.      |
| `gauge`       | Gauge        | a speedometer / utilization / quota feel.   |

## Values (`actual` / `target`)

```
goal Title with unit, e.g. "Marathon Fund ($)"
// actual — the current value; space-separated, no colon
actual 6400
// target — the goal value; must be > 0
target 10000
```

The first line declares the chart type and a title. Put the **unit in the title** — there's no `format` or `currency` directive. `actual` and `target` are space-separated `key value` directives (like gantt's `start-date`): no colon. Values accept `_` separators (`10_000`) but not thousands commas.

The percent is simply `actual / target`. Values auto-compact for display (`6.4k`, `1.2M`).

## Color

With no `bands` block the fill is an **auto traffic light** by completion: `< 50%` red, `50–80%` orange, `≥ 80%` green (over-target stays green). Precedence:

1. A trailing color word on the title line (`goal Marathon Fund ($) green`) always wins.
2. Otherwise the color of the band the `actual` is in (the traffic light when there are no bands).
3. `no-auto-color` disables the status color and falls back to the flat palette series color. A ribbon from your own `bands` still draws.

The fill is a light 25% tint of the resolved color; add `fill-solid` for full saturation.

## Bands

Name the zones of the scale with a `bands` block. Each indented line is `N [Label] [color]`, and the label and color are each optional. **An edge is where a band starts**; it runs to the next edge, and the last band runs to the end of the scale.

```dgmo
goal Marathon Fund ($)

bands
  4000 Poor red
  6000 OK yellow
  7000 Good green

actual 6400
target 10000
```

- **Below the first edge** is a plain track: grey fill, no status.
- **Percent edges:** `80% Good` means 80% of `target`, and may sit beside plain numbers.
- **Colors not given** follow a traffic light by position, worst first: 1 band green; 2 red, green; 3 red, yellow, green; 4 red, orange, yellow, green; 5 or more interpolate, ending blue.
- **The fill** takes the color of the band the actual is in. A thin **ribbon** maps the zones — below the bar, left of the thermometer tube, outside the gauge arc — with each label centred on its zone.
- **The readout** reads `64% · OK` on the bar and thermometer; the gauge shows the band name under the hub. `no-percent` hides both.
- `no-ribbon` drops the ribbon and its labels (the fill still takes the status color, the readout keeps `· OK`). `no-ribbon-labels` keeps the ribbon and hides only the names.

### A band past the target

A last line with **only a number** closes the last band and sets the end of the scale, so a band can run past the target. The target then draws as a dark tick.

```dgmo
goal Treasure Haul (chests)

bands
  40 Lean
  80 Good
  100 Target met blue
  140

actual 112
target 100
```

The scale runs to the largest of the target, the closing edge and the actual.

## Several measures (bullet chart)

Add `[Measure]` headers and the goal becomes a **bullet chart** — one row per measure on the bar face, with a shared look. Each section holds `actual`, `target` and `bands`. A top-level `bands` and `target` apply to every measure that lacks its own.

```dgmo
goal Q3 targets

bands
  0% Poor
  60% OK
  90% Good

[Revenue ($k)]
actual 760
target 900

[NPS]
actual 41
target 45
bands
  0 Poor
  30 OK
  40 Good

[New customers green]
actual 1450
target 1300
```

- **Each row** shows the name, the bar with status fill and ribbon, `/ <target>`, and the readout `84% · OK`. Ribbon labels draw on the first row and on any row with bands of its own.
- **Scale:** each row has its own, 0 to the largest of its target, actual and closing edge. Add `shared-scale` to put every row on one scale and make rows comparable.
- **Thermometer and gauge:** put `thermometer` or `gauge` under the title and the measures sit side by side, wrapping after four, with the name and readout under each.
- **A color on a header** (`[New customers green]`) sets that row's fill.
- **One `note`** for the whole chart; a `note` inside a measure is ignored with a warning.
- Rows draw in source order. The flags below apply to every row.

## Note

Add an optional `note` to caption the number with context — who's still owed, what's left, a rallying cry. Two forms: inline (`note Still waiting on three crews`) or a block header on its own line followed by an **indented body**:

```dgmo
goal Grog Barrel Fill (L)
thermometer
actual 34
target 50
note
  **Great job, crew!** Grog's flowing. Still waiting on tallies from:
  - *Seattle* — first mate says "soon"
  - **Columbus** — you're almost there!
  Top us off to `50L` and the shanties start.
```

The body supports simple inline markdown (`**bold**`, `*italic*`, `` `code` ``), `- `/`* ` bullets, and blank-line gaps. It renders in the **left column** for `thermometer`/`gauge` and **under the bar** for the default face. `no-notes` hides it even when authored — that plural spelling is canonical; the singular `no-note` is accepted as a legacy alias and does the same thing.

## Over-target & edge cases

- **Over target** (`actual > target`): without bands the fill clamps at 100% but the % label stays truthful (`120%`); the gauge needle pins at the max. With bands the scale grows to the actual and the target draws as a tick.
- **Negative `actual`**: the fill clamps to 0%, the label stays honest.
- **Missing / non-positive `target`**: flagged as an error, but the chart still renders a 0% shell.
- **Missing `actual`**: treated as 0 with a warning.

## Directives

| Directive              | Effect                                          |
| ---------------------- | ----------------------------------------------- |
| `thermometer` / `gauge` | Select the render face (bare flag).            |
| `actual <n>`           | Current value (required, ≥ 0).                   |
| `target <n>`           | Goal value (required, > 0).                      |
| `note <text>` / `note` + body | Free-text caption (inline or indented block). |
| `no-percent`           | Hide the `%` label.                              |
| `no-value`             | Hide the raw `actual / target` label.               |
| `fill-solid`           | Full-saturation fill instead of the 25% tint.    |
| `no-title`             | Hide the banner title.                           |
| `no-notes`             | Suppress the `note` block even if authored.      |
| `bands` + indented lines | Named zones: `N [Label] [color]`.              |
| `[Measure]`            | Start a row (several measures = bullet chart).   |
| `no-auto-color`        | Disable the status color; use palette color.     |
| `no-ribbon`            | Drop the ribbon and its labels.                  |
| `no-ribbon-labels`     | Keep the ribbon, hide the names on it.           |
| `shared-scale`         | Bullet chart: every row on one scale.            |

## Tips

- **Pick the face first** — it carries more meaning than any directive. Bar for a KPI, thermometer for "fill it up", gauge for "how's it running".
- Keep the unit in the **title** (`($)`, `(L)`, `(chests)`) — a goal has no unit directive.
- Indented lines are ignored with a warning — **except** a `bands` block and an indented `note` block body.
- Let the **status** color do the work: red/orange/green already signals whether the number is healthy. Add `bands` when "healthy" has names, and `[Measure]` rows when several numbers share one report. Pin a trailing color or add `no-auto-color` only when the coding fights your dashboard.
- Reach for `goal` when one number chases one target; use [`line`](chart-line.md) for a trend and [`countdown`](chart-countdown.md) for a deadline.

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

- **Related:** [`countdown`](chart-countdown.md) · [`bar`](chart-bar.md) · [`funnel`](chart-funnel.md) · [`gantt`](chart-gantt.md) · [`kanban`](chart-kanban.md) · [`line`](chart-line.md)
- **Then:** [Colors & palettes](colors.md)
