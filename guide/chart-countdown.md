```dgmo
countdown Voyage to Tortuga
target 2099-08-21
```

## Overview

A countdown is the only **dynamic** dgmo chart: a single "N days until X" that recomputes against the viewer's clock on every load and ticks every second on any live surface. Reach for it as a live widget — a blog sidebar, an Obsidian note, a shared page — for a trip date, a product launch, or a deadline. It is distinct from `goal` (§goal): a goal measures `now` against a `target`; a countdown counts down to one future instant. For a value over time use `line`.

## Syntax

```
countdown Title, e.g. "Trip to Japan"
target 2026-08-21     // the future instant — space-separated, no colon
units days            // days (default) or full
expired Now!          // optional; shown once the target passes
```

The first line declares the chart type and the event title. `target`, `units`, and `expired` are space-separated `key value` directives (like gantt's `start-date`): no colon. The target date renders as a caption automatically.

## Target formats

`target` accepts a bare date, a datetime, or a datetime with a timezone offset:

- `target 2026-08-21` — counts to the viewer's **local midnight** on that day.
- `target 2026-09-01T09:00` — a specific local time.
- `target 2026-09-01T09:00-07:00` — an explicit offset, honored everywhere.

The literal `target now` resolves at render time (→ immediately expired) — handy for previewing the `expired` state.

## Recurring events

For anything that repeats — a birthday, an anniversary, a standing meeting — use an `every` rule instead of `target`. The countdown resolves to the **next** occurrence and **rolls forward** on its own when the day passes, so it never goes stale and needs no year:

```dgmo
countdown Crew Muster
every month on 3rd Tuesday at 18:00
on-day Tonight! 🍺
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
countdown Ship's Commissioning
every year on Jun 14
since 2019
since-label anniversary
since-style eyebrow
```

`since-style` picks how loud the ordinal is: **`eyebrow`** (default) keeps the day-count the hero with a quiet "7TH ANNIVERSARY" above it; `headline` makes the ordinal the big number; `tenure` adds a "N years" chip; `inline` renders one sentence. `since-label` names the noun (defaults from the title).

## Units & display

```dgmo
countdown Ship Sails at Dawn
target 2099-09-01T06:00
units full
expired ⚓ Anchors aweigh!
```

`units days` (the default) shows whole days and uses **ceil**, so a target later today reads "1 day", not "0". Other modes: `full` (`Nd HH:MM:SS`), `clock` (total `HH:MM:SS`, may pass 24h), `weeks`, and `words` ("in 6 weeks"). Shape them with `round up|down|nearest`, `fields d,h,m,s` (drop `s` for a calm widget), and `lang en`.

## The footer & the "as of" stamp

Every countdown bakes an **in-chart footer** stating exactly what it resolved to — `→ Tue Jul 21 2026 · in 8 days` — so a mistaken rule shows a visibly wrong date. It also carries an **"as of" stamp** that the live ticker erases the moment it runs: on a real page it vanishes instantly, but a screenshot keeps it, so a frozen countdown is always honestly dated.

## When it passes

For a one-shot `target`, once it passes the `expired` text (default `"Now!"`) replaces the number and that countdown stops ticking — no negative counts. Set it to your celebration: `expired 🚀 Shipped!`. Recurring blocks don't expire — they roll forward to the next occurrence.

## Live vs. baked

On any live surface (the app, the web editor, a docs site, an Obsidian note, a shared page) the countdown ticks every second and is accurate the instant the page loads. On image surfaces that can't run JavaScript — a PNG export, an `.svg` opened via `<img>`, a GitHub camo-proxied image — it shows the whole-day count baked at export time. That is the correct graceful fallback, not a bug: images can't tick.
