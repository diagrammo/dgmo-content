```dgmo
countdown Trip to Japan
target 2027-04-15
```

## Overview

A countdown is the only **dynamic** dgmo chart: a single "N days until X" that recomputes against the viewer's clock on every load and ticks every second on any live surface. Reach for it as a live widget — a blog sidebar, an Obsidian note, a shared page — for a trip date, a product launch, or a deadline. It is distinct from `goal` (§goal): a goal measures `now` against a `target`; a countdown counts down to one future instant. For a value over time use `line`.

## Syntax

```
countdown Title, e.g. "Trip to Japan"
target 2027-04-15     // the future instant — space-separated, no colon
units human           // human (default): "1 year, 2 months"
expired Now!          // optional; shown once the target passes
```

The first line declares the chart type and the event title. `target`, `units`, and `expired` are space-separated `key value` directives (like gantt's `start-date`): no colon. The target date renders as a caption automatically, and a **calendar band** below the header pictures the wait (see *The calendar band*).

## Target formats

`target` accepts a bare date, a datetime, or a datetime with a timezone offset:

- `target 2026-08-21` — counts to the viewer's **local midnight** on that day.
- `target 2026-09-01T09:00` — a specific local time.
- `target 2026-09-01T09:00-07:00` — an explicit offset, honored everywhere.

The literal `target now` resolves at render time (→ immediately expired) — handy for previewing the `expired` state.

## Recurring events

For anything that repeats — a birthday, an anniversary, a standing meeting — use an `every` rule instead of `target`. The countdown resolves to the **next** occurrence and **rolls forward** on its own when the day passes, so it never goes stale and needs no year:

```dgmo
countdown Monthly All-Hands
every month on 1st Monday at 10:00
on-day Today!
```

The rule is a single line, `every <cadence> [on <instant>] [at <time>] [from <anchor>]`:

- `every year on Aug 21` — an annual month + day.
- `every month on 3rd Tuesday` / `every month on last Friday` — the nth (or last) weekday of each month.
- `every week on Friday` — a weekday each week.
- `every 2 weeks from 2026-07-03` — a fixed interval anchored to a date.
- `at 18:00` — a 24h time (default midnight). `on-day <text>` shows on the occurrence day.

Weekday and month names are a fixed vocabulary, so the editor autocompletes them and a typo is a named error — never a silent wrong date. Free prose is rejected with the fix: `every Friday 6pm` → `✕ "6pm": use 24h time (18:00)` → `↳ every week on Friday at 18:00`. A block has **either** `target` **or** `every`, never both. Single nth/last weekday only (no `2nd and 4th Wednesday`). Times are the viewer's local clock.

## Numbering with `since`

`since` turns a recurring countdown into a numbered one — a 7th anniversary — counting `resolvedYear − since`:

```dgmo
countdown Wedding Anniversary
every year on Jun 14
since 2015
since-label Nth Anniversary
```

`since-label` is a free-form eyebrow template: **`Nth`** becomes the ordinal word (`7th`) and **`N`** the bare number (`7`), so `since-label Nth Anniversary` renders a quiet "7TH ANNIVERSARY" above the day-count, and `since-label Year N` renders "YEAR 7". Any phrasing works. It defaults to `Nth <title>`. The tokens are case-sensitive, so ordinary words with an "n" are left alone.

## Units & display

```dgmo
countdown Rocket Launch
target 2026-09-01T09:30
units full
expired 🚀 Liftoff!
```

`units human` (the default) reads the way people speak: the coarse **top-two units including years** as the hero ("1 year, 2 months") with the finer remainder ("3 days") in a small sub-line beneath. Leading zero units are dropped and the hero auto-shrinks so it never collides with the title. `units days` opts back to the raw whole-day count ("437 days", **ceil** — a target later today reads "1 day", not "0"). Other modes: `full` (`Nd HH:MM:SS`), `clock` (total `HH:MM:SS`, may pass 24h), `weeks`, and `words`. Shape them with `round up|down|nearest`, `fields d,h,m,s` (drop `s` for a calm widget), and `lang en`.

## The calendar band

Below the header, every date-bearing countdown draws a **calendar band** — a "you-are-here → event" picture whose resolution auto-tightens as the day nears, so the same reading holds from years out to the final week:

- **> 1 year** — a row of 12 month rectangles per year.
- **~3–12 months** — one rectangle per month (the same idiom, un-grouped), muted fill with only the now- and target-months dated.
- **≤ ~3 months** — real side-by-side month calendars with day numbers.
- **< 7 days** — a seven-day "boarding-pass" strip ending on the event.

Two markers hold everywhere: **today** (a solid blue chip — shifted to teal if your accent is itself blue) and the **event day** (a solid accent chip); the span between fills an accent "remaining" tint and elapsed cells fade to gray. Every shape carries a solid border and the same color convention across all tiers. Add `no-visual` to suppress the band and collapse to the header alone.

## Timed targets — the pivot

When the `target` carries a **time** (`2026-08-21T18:00`, or a recurring `at 18:00`) the event instant is a **pivot**, not a stop. Days out, the human hero keeps its phrase and a live `HH:MM:SS` clock rides the sub-line. On the final day the hero becomes that ticking clock and the band turns into three **ring gauges** — hours · minutes · seconds. Past the instant the same clock and rings keep ticking **up**, the caption flipping "to go" → "ago". `expired <text>` still wins when set, freezing a fixed message instead of counting up.

## The footer & the "as of" stamp

Every countdown bakes an **in-chart footer** stating exactly what it resolved to — `→ Tue Jul 21 2026 · in 8 days` — so a mistaken rule shows a visibly wrong date. It also carries an **"as of" stamp** that the live ticker erases the moment it runs: on a real page it vanishes instantly, but a screenshot keeps it, so a frozen countdown is always honestly dated.

## When it passes

For a one-shot `target`, set `expired` to your celebration (`expired 🚀 Shipped!`) — once the target passes it freezes that message and stops ticking. Without an `expired` text a timed one-shot instead counts **up** past the instant (the pivot above); an all-day one reads "N ago". Recurring blocks don't expire — they roll forward to the next occurrence.

## Live vs. baked

On any live surface (the app, the web editor, a docs site, an Obsidian note, a shared page) the countdown ticks every second and is accurate the instant the page loads. On image surfaces that can't run JavaScript — a PNG export, an `.svg` opened via `<img>`, a GitHub camo-proxied image — it shows the human hero and calendar band baked at export time. That is the correct graceful fallback, not a bug: images can't tick.
