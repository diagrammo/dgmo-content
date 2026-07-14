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

## Pinning to a timezone

By default the count is **viewer-local**: a bare date, an offset-free datetime, and a recurring `at` time all resolve against whatever clock the viewer's machine is set to — so the same countdown reads differently in New York and Mumbai, and drifts if you travel. Add a `tz` line to **pin** those authored times to one IANA zone, so every viewer sees the same remaining time and it never shifts when the machine moves zones:

```dgmo
countdown Ship's launch
target 2026-09-01T18:00
tz America/New_York
```

`tz <zone>` is a space-separated directive (no colon), taking any IANA zone name — `America/New_York`, `Asia/Kolkata`, `Europe/London`, or `UTC`. With it set, the footer shows the in-zone time plus a `UTC±` offset tag so the anchor is unambiguous. An explicit ISO offset already baked into `target` (`2026-09-01T09:00-07:00`) is absolute on its own and needs no `tz`.

## Recurring events

For anything that repeats — a birthday, an anniversary, a standing meeting — use an `every` rule instead of `target`. The countdown resolves to the **next** occurrence and **rolls forward** on its own when the day passes, so it never goes stale and needs no year:

```dgmo
countdown Monthly All-Hands
every month on 1st Monday at 10:00
on-day Today!
```

The rule is a single line, `every <cadence> [on <instant>] [at <time>] [from <anchor>]`. The cadence sets how often; the optional `on` picks *which* day within that period, `at` picks the time, and `from` anchors an interval. Every cadence has a worked example below.

### Annual — `every year`

The workhorse: a fixed month + day, no year, so it never expires. Ideal for birthdays, holidays, and anniversaries.

```dgmo
countdown Mom's Birthday
every year on Aug 21
on-day 🎂 Today!
```

The month is a fixed name (`Jan`…`Dec`, full or abbreviated) and the day is a plain number. `on-day 🎂 Today!` swaps the header for that phrase on the day itself (see roll-forward below).

### Monthly — `every month on <nth> <weekday>`

Picks the nth (or `last`) weekday of every month — the shape of most standing meetings. Combine with `at` for a time and `tz` to pin it.

```dgmo
countdown Sprint Review
every month on 3rd Tuesday at 14:00
tz America/New_York
on-day Live now
```

`1st`…`5th` and `last` are the only ordinals; the weekday is a fixed name. Single weekday only — `2nd and 4th Wednesday` is not expressible in one block. A month with no 5th of a given weekday simply skips to the next month that has one.

### Weekly — `every week on <weekday>`

A standing weekday. Add `at` for a time; without it the whole day counts as the occurrence.

```dgmo
countdown Friday Deploy Freeze
every week on Friday at 17:00
on-day 🧊 Frozen
```

### Fixed interval — `every N <days|weeks|months> from <anchor>`

An interval cadence repeats every N units measured from an anchor date — use it when the rhythm isn't tied to a calendar name (every 10 days, every other Friday counted from a known start). The `from` anchor is **required** here, because "every 2 weeks" is meaningless without a starting point:

```dgmo
countdown Payday
every 2 weeks from 2026-07-03
on-day 💸 Payday
```

`every day` is the same family and likewise needs an anchor (`every day from 2026-07-01`). The singular form drops the `N`: `every month from 2026-01-31` is `N = 1` — one month past the anchor, then the next, and so on.

### Timing, roll-forward, and expiry

- **`at <time>`** is 24-hour, default midnight. `at 18:00` makes the occurrence a precise instant; **omit it and the occurrence is the whole day** — the countdown reads "Today!" (or your `on-day` text) from local midnight to midnight, then rolls to the next occurrence. A *timed* occurrence instead rolls the exact second it passes and, on its final day, pivots into a live `HH:MM:SS` clock (see *Timed targets*).
- **`on-day <text>`** replaces the header on the occurrence day/instant — a party phrase, a "Live now" flag, an emoji.
- **Roll-forward is automatic and needs no year.** After an occurrence passes, the block re-resolves to the next one on the next load; recurring blocks never enter the `expired` state (`expired` is for one-shot `target`s only). The in-chart footer always states the resolved instant (`→ Tue Aug 21 2026 · in 39 days`), so a mistaken rule shows a visibly wrong date.

Weekday and month names are a fixed vocabulary, so the editor autocompletes them and a typo is a named error — never a silent wrong date. Free prose is rejected with the fix: `every Friday 6pm` → `✕ "6pm": use 24h time (18:00)` → `↳ every week on Friday at 18:00`. A block has **either** `target` **or** `every`, never both. Times are the viewer's local clock unless a `tz` line pins them.

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
