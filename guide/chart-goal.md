```dgmo
goal Doubloons Plundered ($)
now 6400
target 10000
```

## Overview

A goal chart is a single **progress-toward-a-target** reading: one `now` value against one `target`, answering "how close am I?" at a glance. Reach for it for a KPI tile, a fundraising thermometer, a quarterly quota, or a completion percentage — anywhere one number racing toward one goal is the whole story. It has no time axis, no series, and no milestones.

## When to use

- **`goal`** — one number racing toward one target, and "how close am I?" is the whole question.
- **[`countdown`](chart-countdown.md)** — the thing running out is *time*, not a quantity. A deadline drawn as a goal bar implies you're 60% **done** when you're really 60% **out of time** — `goal` has no time dimension at all.
- **[`bar`](chart-bar.md)** — you're comparing several numbers against each other rather than one number against its target.
- **[`funnel`](chart-funnel.md)** — you have several sequential stages each losing volume, not one aggregate reading.
- **[`gantt`](chart-gantt.md)** — you want the task list and dates behind the percentage, not the single "% there" reading.
- **[`kanban`](chart-kanban.md)** — you're tracking many individual items sitting in various stages rather than one rolled-up number.
- **[`line`](chart-line.md)** — the point is the value's trend over time.

## The three faces

The face is the heart of a goal chart. The same `now`/`target` pair can be drawn three ways — **progress bar**, **thermometer**, or **gauge** — and the one you pick sets the whole mood of the reading. Choose the face first, then fill in the numbers. Select it with a **bare flag on its own line** (no colon, no value); omit the flag for the default bar.

### Progress bar (default)

The workhorse. A horizontal rounded fill — compact, honest, unmistakable. Reach for it for a plain KPI tile, a dashboard cell, or anywhere the number just needs to read at a glance. No flag needed.

```dgmo
goal Doubloons Plundered ($)
now 6400
target 10000
```

### Thermometer

A vertical tube with a bulb; the column climbs as you fill it. This is the **"fill it up" face** — fundraising drives, tank/barrel levels, a stretch goal you're pouring into. It reads as a physical thing filling, which is why the classic charity fundraiser thermometer works.

```dgmo
goal Grog Barrel Fill (L)
thermometer
now 34
target 50
```

### Gauge

A semicircular dial with a needle sweeping an arc. This is the **"how's it running" face** — speedometers, utilization, capacity, quota attainment. The needle position gives an instant instrument-panel read, and it **pins at the max** when you blow past the target.

```dgmo
goal Voyage Quota (chests)
gauge
now 64
target 100
```

> All three faces read the **same** `now`/`target` pair — the flag only changes the drawing, never the meaning. The percent, the traffic-light color, the labels, and the note all behave identically across faces.

| Flag          | Face        | Reach for it when…                          |
| ------------- | ----------- | ------------------------------------------- |
| *(none)*      | Progress bar | a plain KPI / dashboard number.             |
| `thermometer` | Thermometer  | fundraising or a "fill it up" framing.      |
| `gauge`       | Gauge        | a speedometer / utilization / quota feel.   |

## Values (`now` / `target`)

```
goal Title with unit, e.g. "Marathon Fund ($)"
// now — the current value; space-separated, no colon
now 6400
// target — the goal value; must be > 0
target 10000
```

The first line declares the chart type and a title. Put the **unit in the title** — there's no `format` or `currency` directive. `now` and `target` are space-separated `key value` directives (like gantt's `start-date`): no colon. Values accept `_` separators (`10_000`) but not thousands commas.

The percent is simply `now / target`. Values auto-compact for display (`6.4k`, `1.2M`).

## Color

By default the fill is **auto traffic-light** by completion: `< 50%` red, `50–80%` orange, `≥ 80%` green (over-target stays green) — so the color already reads the health of the number. Precedence:

1. A trailing color word on the title line (`goal Marathon Fund ($) green`) always wins.
2. Otherwise the auto band color (needs a `target`).
3. `no-auto-color` disables the bands and falls back to the flat palette series color.

The fill is a light 25% tint of the resolved color; add `fill-solid` for full saturation.

## Note

Add an optional `note` to caption the number with context — who's still owed, what's left, a rallying cry. Two forms: inline (`note Still waiting on three crews`) or a block header on its own line followed by an **indented body**:

```dgmo
goal Grog Barrel Fill (L)
thermometer
now 34
target 50
note
  **Great job, crew!** Grog's flowing. Still waiting on tallies from:
  - *Seattle* — first mate says "soon"
  - **Columbus** — you're almost there!
  Top us off to `50L` and the shanties start.
```

The body supports simple inline markdown (`**bold**`, `*italic*`, `` `code` ``), `- `/`* ` bullets, and blank-line gaps. It renders in the **left column** for `thermometer`/`gauge` and **under the bar** for the default face. `no-notes` hides it even when authored — that plural spelling is canonical; the singular `no-note` is accepted as a legacy alias and does the same thing.

## Over-target & edge cases

- **Over target** (`now > target`): the fill clamps at 100% but the % label stays truthful (`120%`); the gauge needle pins at the max.
- **Negative `now`**: the fill clamps to 0%, the label stays honest.
- **Missing / non-positive `target`**: flagged as an error, but the chart still renders a 0% shell.
- **Missing `now`**: treated as 0 with a warning.

## Directives

| Directive              | Effect                                          |
| ---------------------- | ----------------------------------------------- |
| `thermometer` / `gauge` | Select the render face (bare flag).            |
| `now <n>`              | Current value (required, ≥ 0).                   |
| `target <n>`           | Goal value (required, > 0).                      |
| `note <text>` / `note` + body | Free-text caption (inline or indented block). |
| `no-percent`           | Hide the `%` label.                              |
| `no-value`             | Hide the raw `now / target` label.               |
| `fill-solid`           | Full-saturation fill instead of the 25% tint.    |
| `no-title`             | Hide the banner title.                           |
| `no-notes`             | Suppress the `note` block even if authored.      |
| `no-auto-color`        | Disable the traffic-light bands; use palette color. |

## Tips

- **Pick the face first** — it carries more meaning than any directive. Bar for a KPI, thermometer for "fill it up", gauge for "how's it running".
- Keep the unit in the **title** (`($)`, `(L)`, `(chests)`) — a goal has no unit directive.
- One value only: a goal has no children. Indented lines are ignored with a warning — **except** an indented `note` block body.
- Let the **traffic-light** color do the work: red/orange/green already signals whether the number is healthy. Only pin a trailing color or add `no-auto-color` when the band coding fights your dashboard.
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
