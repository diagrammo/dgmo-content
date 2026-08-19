```dgmo
countdown Trip to Japan
target 2027-04-15
```

> **Dates** — the `target` accepts any date format (`2026-07-04`, `7/4/2026`, `July 4, 2026`) as well as `now`. See [Writing Dates](writing-dates.md).

## Overview

A countdown is the only **dynamic** dgmo chart: a single "N days until X" that recomputes against the viewer's clock on every load and ticks every second on any live surface. Reach for it as a live widget — a blog sidebar, an Obsidian note, a shared page — for a trip date, a product launch, or a deadline: "how many days until the trip."

## When to use

- **`countdown`** — the thing running out is **time**, and there is exactly one future moment to count toward (or one recurring occurrence to roll forward to).
- **[`goal`](chart-goal.md)** — progress toward a **number**, not a date. `goal` has no time dimension, so a deadline drawn as a goal bar implies you are 60% *done* when you are really 60% *out of time*.
- **[`gantt`](chart-gantt.md)** — many tasks against a schedule, with durations and dependencies, rather than one date.
- **[`clock`](chart-clock.md)** — what time it is *right now* for people in different places, rather than how long is left.

## Syntax

```
countdown Title, e.g. "Trip to Japan"
// target — the future instant; space-separated, no colon
target 2027-04-15
// units — human (default) renders "1 year, 2 months"
units human
// expired — optional; shown once the target passes
expired Now!
```

The first line declares the chart type and the event title. `target`, `units`, and `expired` are space-separated `key value` directives (like gantt's `start-date`): no colon. The target date renders as a caption automatically, and a **calendar band** below the header pictures the wait (see *The calendar band*).

## Target formats

`target` accepts a bare date, a datetime, or a datetime with a timezone offset:

- `target 2026-08-21` — counts to the viewer's **local midnight** on that day.
- `target 2026-09-01T09:00` — a specific local time.
- `target 2026-09-01T09:00-07:00` — an explicit offset, honored everywhere.

The literal `target now` resolves at render time (→ immediately expired) — handy for previewing the `expired` state.

## Pinning to a timezone

By default the count is **viewer-local**: a bare date, an offset-free datetime, and the time carried by a recurring block's `since` anchor all resolve against whatever clock the viewer's machine is set to — so the same countdown reads differently in New York and Mumbai, and drifts if you travel. Add a `tz` line to **pin** those authored times to one IANA zone, so every viewer sees the same remaining time and it never shifts when the machine moves zones:

```dgmo
countdown Ship's launch
target 2026-09-01T18:00
tz America/New_York
```

`tz <zone>` is a space-separated directive (no colon), taking any IANA zone name — `America/New_York`, `Asia/Kolkata`, `Europe/London`, or `UTC`. With it set, the footer shows the in-zone time plus a `UTC±` offset tag so the anchor is unambiguous. An explicit ISO offset already baked into `target` (`2026-09-01T09:00-07:00`) is absolute on its own and needs no `tz`.

## Recurring events

For anything that repeats — a birthday, an anniversary, a standing meeting — anchor the block with `since` instead of `target`. The countdown resolves to the **next** occurrence and **rolls forward** on its own once the day passes, so it never goes stale:

```dgmo
countdown Monthly All-Hands
since 2026-06-01T10:00
every month by weekday
tz America/New_York
on-day Today!
```

A recurring block carries exactly **one date**, and it lives in `since`: the **anchor**, the occurrence the whole series is measured from. Everything about an occurrence is read off that one date — the month and day, the day of the month, the weekday, the time of day — and `every` names nothing but the **cadence**. That is the point of the shape: with a single date on a single line, no two lines can disagree about when the thing happens.

`since` accepts any date the rest of dgmo accepts (`2015-06-14`, `Jun 14 2015`, `6/14/2015`) — see [Writing Dates](writing-dates.md). A bare date makes the occurrence an **all-day** one; give the anchor a time (`since 2026-01-05T18:00`) and the occurrence is that precise instant. A bare year is not a date, so `since 2015` is an error.

### The cadences

`every <cadence>` is optional: **leave it off and the block repeats yearly**, which is what a birthday or an anniversary wants.

| Cadence | The next occurrence is |
| ------- | ---------------------- |
| `every year` | the anchor's month and day, once a year — the default when `every` is absent |
| `every month` | the anchor's day of the month — an anchor on the 31st skips the months that have no 31st |
| `every month by weekday` | the anchor's *nth weekday* — anchor a 2nd Sunday and every 2nd Sunday follows |
| `every month by last weekday` | the anchor's weekday, the last one in each month |
| `every week` | the anchor's weekday, every week |
| `every day` | every day from the anchor onward |
| `every N days` · `every N weeks` · `every N months` | a fixed interval counted from the anchor, e.g. `every 2 weeks` |

The two `by weekday` forms are the one place a shape word is still needed, because a date alone cannot settle the question: `2026-06-16` is both "the 16th" and "the third Tuesday", and only you know which of those the meeting actually is. Every other cadence reads the anchor unambiguously.

### Annual — the default

The workhorse: anchor the date it first happened and leave `every` off entirely. Ideal for birthdays, holidays, and anniversaries.

```dgmo
countdown Mom's Birthday
since 1958-08-21
on-day 🎂 Today!
```

The block rolls to the next August 21 forever. `on-day 🎂 Today!` swaps the header for that phrase on the day itself (see roll-forward below).

### Monthly — by date, or by weekday

`every month` keeps the anchor's **day of the month**: anchor the 1st and it comes due on the 1st of every month. A 31st anchor skips the months that have no 31st rather than sliding quietly to the 30th.

Most standing meetings are not on a date at all, though — they are on the *nth weekday*. `every month by weekday` reads that shape off the anchor:

```dgmo
countdown Sprint Review
since 2026-06-16T14:00
every month by weekday
tz America/New_York
on-day Live now
```

June 16, 2026 is the third Tuesday of that month, so the block resolves to the third Tuesday of every month at 14:00, pinned to New York. `every month by last weekday` does the same for the final weekday of a month — anchor a last Friday and every month's last Friday follows. One weekday per block: "2nd and 4th Wednesday" is not expressible in a single block, and a month with no fifth of a given weekday simply skips to the next month that has one.

### Weekly — `every week`

A standing weekday, taken from the anchor. A bare anchor date makes the whole day the occurrence; an anchor with a time counts to that instant.

```dgmo
countdown Friday Deploy Freeze
since 2026-07-03T17:00
every week
on-day 🧊 Frozen
```

### Fixed interval — `every N days|weeks|months`

An interval cadence repeats every N units measured from the anchor — reach for it when the rhythm isn't tied to a calendar name (every 10 days, every other Friday counted from a known start):

```dgmo
countdown Payday
since 2026-07-03
every 2 weeks
on-day 💸 Payday
```

`every day` belongs to the same family, and the singular cadences are just `N = 1` of theirs: `every month` is `every 1 month`.

### Timing, roll-forward, and expiry

- **The time of day comes from the anchor.** `since 2026-07-03T17:00` makes each occurrence a precise instant; **a bare anchor date makes the occurrence the whole day** — the countdown reads "Today!" (or your `on-day` text) from local midnight to midnight, then rolls to the next occurrence. A *timed* occurrence instead rolls the exact second it passes and, on its final day, pivots into a live `HH:MM:SS` clock (see *Timed targets*).
- **`on-day <text>`** replaces the header on the occurrence day or instant — a party phrase, a "Live now" flag, an emoji.
- **Roll-forward is automatic.** After an occurrence passes, the block re-resolves to the next one on the next load; recurring blocks never enter the `expired` state (`expired` is for one-shot `target`s only). The in-chart footer always states the resolved instant (`→ Tue Aug 21 2026 · in 39 days`), so a mistaken anchor shows a visibly wrong date.

The cadence words are a fixed vocabulary, so the editor autocompletes them and a typo is a named error rather than a silent wrong date. A block has **either** `target` **or** `since`, never both. Times are the viewer's local clock unless a `tz` line pins them.

## Numbering with `since-label`

Every recurring block has an anchor, so every one of them *could* be numbered — but numbering a standing meeting would be noise, so the eyebrow is **opt-in**. Add a `since-label` and the count appears above the day-count; leave it off and there is no eyebrow at all:

```dgmo
countdown Wedding Anniversary
since 2015-06-14
since-label Nth Anniversary
```

`since-label` is a free-form eyebrow template: **`Nth`** becomes the ordinal word (`11th`) and **`N`** the bare number (`11`), so `since-label Nth Anniversary` renders a quiet "11th Anniversary" above the day-count, and `since-label Year N` renders "Year 11". Any phrasing works, and the tokens are case-sensitive, so ordinary words with an "n" in them are left alone.

**The number is the count of complete cadence units since the anchor — birthday semantics.** The anchor occurrence itself is the **0th**, so someone born on June 14, 2015 turns 11 on June 14, 2026, not 12. Every cadence follows that same rule: a weekly standup anchored on its first meeting numbers that meeting 0 and the one a week later 1. If you want the first occurrence to read as #1, anchor `since` one cadence-unit earlier — a standup whose first meeting was July 3 gets `since 2026-06-26`.

Because the count follows the cadence rather than the calendar year, **weekly, monthly and interval countdowns can be numbered too**:

```dgmo
countdown Team Standup
since 2026-06-26T09:15
every week
since-label Standup #N
```

## Units & display

```dgmo
countdown Rocket Launch
target 2026-09-01T09:30
units full
expired 🚀 Liftoff!
```

`units human` (the default) reads the way people speak: the coarse **top-two units including years** as the hero ("1 year, 2 months") with the finer remainder ("3 days") in a small sub-line beneath. Leading zero units are dropped and the hero auto-shrinks so it never collides with the title. `units days` opts back to the raw whole-day count ("437 days", **ceil** — a target later today reads "1 day", not "0"). Other modes: `full` (`Nd HH:MM:SS`), `clock` (total `HH:MM:SS`, may pass 24h), `weeks`, `words`, and `compound` (every non-zero unit spelled out in one run, coarsest first). Shape them with `round up|down|nearest`, `fields d,h,m,s` (drop `s` for a calm widget), and `lang en`.

## Date directives

`target` and `since` both take liberal date input, and two directives control how it is read:

| Directive | Effect |
| --------- | ------ |
| `date-order mdy` | numeric slash/dash dates read month-first (the default) |
| `date-order dmy` | numeric slash/dash dates read day-first, so `3/4/2027` is 3 April |
| `year 2027` | base year for a bare month-day date, so the block doesn't drift when the calendar turns |

See [Writing Dates](writing-dates.md).

## Captions with `note`

`note <text>` adds a markdown caption beneath the countdown — a line of context the header has no room for. Give it an inline value, an indented body block, or both:

```dgmo
countdown Ship's launch
target 2026-09-01T18:00
note Doors open an hour early — **bring the manifest**.
```

## The calendar band

Below the header, every date-bearing countdown draws a **calendar band** — a "you-are-here → event" picture whose resolution auto-tightens as the day nears, so the same reading holds from years out to the final week:

- **> 1 year** — a row of 12 month rectangles per year.
- **~3–12 months** — one rectangle per month (the same idiom, un-grouped), muted fill with only the now- and target-months dated.
- **≤ ~3 months** — real side-by-side month calendars with day numbers.
- **< 7 days** — a seven-day "boarding-pass" strip ending on the event.

Two markers hold everywhere: **today** (a solid blue chip — shifted to teal if your accent is itself blue) and the **event day** (a solid accent chip); the span between fills an accent "remaining" tint and elapsed cells fade to gray. Every shape carries a solid border and the same color convention across all tiers. Add `no-visual` to suppress the band and collapse to the header alone.

## Timed targets — the pivot

When the resolved event carries a **time** — `target 2026-08-21T18:00`, or a recurring `since 2026-08-21T18:00` — the event instant is a **pivot**, not a stop. Days out, the human hero keeps its phrase and a live `HH:MM:SS` clock rides the sub-line. On the final day the hero becomes that ticking clock and the band turns into three **ring gauges** — hours · minutes · seconds. Past the instant the same clock and rings keep ticking **up**, the caption flipping "to go" → "ago". `expired <text>` still wins when set, freezing a fixed message instead of counting up.

## The footer & the "as of" stamp

Every countdown bakes an **in-chart footer** stating exactly what it resolved to — `→ Tue Jul 21 2026 · in 8 days` — so a mistaken rule shows a visibly wrong date. It also carries an **"as of" stamp** that the live ticker erases the moment it runs: on a real page it vanishes instantly, but a screenshot keeps it, so a frozen countdown is always honestly dated.

## When it passes

For a one-shot `target`, set `expired` to your celebration (`expired 🚀 Shipped!`) — once the target passes it freezes that message and stops ticking. Without an `expired` text a timed one-shot instead counts **up** past the instant (the pivot above); an all-day one reads "N ago". Recurring blocks don't expire — they roll forward to the next occurrence.

## Live vs. baked

On any live surface (the app, the web editor, a docs site, an Obsidian note, a shared page) the countdown ticks every second and is accurate the instant the page loads. On image surfaces that can't run JavaScript — a PNG export, an `.svg` opened via `<img>`, a GitHub camo-proxied image — it shows the human hero and calendar band baked at export time. That is the correct graceful fallback, not a bug: images can't tick.

## Appearance

A countdown is a single figure with no legend and no title line to suppress, so of the universal appearance directives it accepts the fill family:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |

The mode carries through the calendar band and the ring gauges. Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`goal`](chart-goal.md) · [`gantt`](chart-gantt.md) · [`clock`](chart-clock.md)
- **Then:** [Colors & palettes](colors.md) · [Writing dates](writing-dates.md)
