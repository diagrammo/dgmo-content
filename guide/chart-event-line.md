```dgmo
event-line A Short History of the Web
no-scale

tag Theme as t
  Protocol blue
  Browser green
  Platform purple
  Standard orange

[The Early Web]
  1991 WorldWideWeb  t: Protocol
    Tim Berners-Lee publishes the first website at **CERN**.
  1993 Mosaic  t: Browser
    The first popular *graphical* browser.

[The Standards Era] collapsed
  1995 JavaScript  t: Platform
    Brendan Eich writes the language in ten days.
  1996 CSS  t: Standard
    Styling splits from structure.

[The App Era]
  2005 Ajax  t: Platform
    `XMLHttpRequest` updates pages without a reload.
  2014 HTML5  t: Standard
    The living standard — video, canvas, semantics.
```

> **Dates** — event dates accept any format (`2026-03-20`, `3/20`, `Mar 20`); a bare month-day inherits its year from a `year 2026` line or the surrounding events. See [Writing Dates](writing-dates.md).

## Overview

An **event line** is the annotated, narrative timeline every infographic reaches for: a horizontal spine of point events, each a dot with a date caption and a leader line up to an org-style card holding a title and a short description. Cards auto-alternate above and below the spine to pack densely. Think "a history of the web", "company milestones", "how a bill becomes law", or "a mission timeline".

It is distinct from the [Timeline](chart-timeline.md) chart: `timeline` is a strict, to-scale date axis with eras, markers, and range bars; `event-line` is **point events with rich prose**, optionally **not to scale** for the storytelling look.

## When to use

- **`event-line`** — each event needs a paragraph of story, and you'd rather pack the cards densely than honor the real gaps between dates.
- **[`timeline`](chart-timeline.md)** — the *spacing* between dates is the finding. With `no-scale` an event line is deliberately **not to scale**, so a reader who assumes horizontal distance means elapsed time will read acceleration, clustering, and long quiet gaps that aren't there. If pacing is the story, use `timeline`.
- **[`journey-map`](chart-journey-map.md)** — you're tracking how one person *felt* step by step, not narrating events in the world.

## Syntax

```
event-line Title

2012-02-05 Event Title  tagAlias: Value
  A description line — bare prose, markdown allowed.
  - a bullet point
```

- **Event = a line.** An optional **leading ISO date** (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`, optionally `… HH:MM` or `… HH:MM:SS`) comes first, then the title. The date is optional — a bare title works too. The caption is **formatted for reading** (`2008-09-02` → `Sep 2, 2008`).
- **Ancient dates.** Suffix a year with `BCE`/`BC` for pre–Common-Era events (`753 BCE Rome founded`); `CE`/`AD` are positive no-ops. Displays as `753 BCE`. Great for history threads.
- **Description** = the **indented body** beneath the event. Lines starting with `- ` become bullets; `**bold**`, `*italic*`, `` `code` `` and `[links](url)` all render.
- **Tags** color the events. Declare a `tag <Group> as <alias>` block before the first event, then add `alias: Value` as trailing metadata on an event line. Named colors only; the dot, leader, and card pick up the tag color.

By default events are placed **to scale by date**. Add `no-scale` to space them evenly — the storytelling look — where the date becomes a pure caption.

## Eras

Group a run of events into a labeled section of the spine with a `[Name]` bracket, then **indent the events beneath it** — the same nesting used by org charts and version-control graphs:

```
[The 1960s]
  1961 First event
    ...
  1969 Another event

[The 1970s]
  ...
```

An event belongs to the era it is indented under; its description sits one level deeper still. Dedent back to the left margin (indent 0) for an event that sits **outside** any era. An era draws as a bracket on the side opposite the cards, labeled with its name.

Add a trailing bare `collapsed` flag to the era line to fold it into a single summary card — its name as the title and a bulleted list of its member events — while a small bracket stays on the spine marking the era's span. In the desktop app you can click an era to collapse or expand it live; when several eras are collapsed, each summary card centers over its own spine bracket so a later era sits visibly right of an earlier one.

In the desktop app you can also **click a legend entry to mute that category** — its event cards collapse to bare dots on the spine (hover a dot to peek its card), so a busy timeline quiets to just the categories you care about; muted members also drop from any collapsed era's bullet list. Both the era toggle and the legend mute are live preview only and never edit your source.

```
[The Standards Era] collapsed
  1995 JavaScript  t: Platform
  1996 CSS  t: Standard
```

The bare flag is canonical and composes with an era color in either order (`[Era] blue collapsed`, `[Era] collapsed blue`). The metadata form `[Era] collapsed: true` is also accepted, and `collapsed: false` spells out the default.

## Future events (TBD)

Not everything on a timeline has happened yet. Write the literal **`TBD`** (case-insensitive) in place of the date for an event that isn't scheduled:

```
2024-09-01 1.0 Launch  t: Content
TBD Console Port  t: Engine
  Ship to consoles once certification lands.
TBD Sequel Greenlit  t: Content
  Depends on 1.0 reception — no date yet.
```

A `TBD` event reads as **pending**: a hollow dot, a faded leader, and a `TBD` caption (a faded shelf edge in `no-box`). On a to-scale timeline its spot is **inferred from its neighbors** — a `TBD` with a real date *after* it slots into that gap, while a **trailing** `TBD` (nothing dated after it) parks past the last real date and the spine trails off dashed into the open horizon. `TBD` events never trigger date warnings, so you can mix shipped and planned work in one chart.

## The now marker

Mark "today" on the timeline with a `now` line:

```
event-line Platform Roadmap
now 2025-06
2024-01 Auth rebuild
2025-11 Team spaces
```

`now` alone tracks the **current date** — the marker slides as time passes. `now <date>` **pins** it to an explicit date (deterministic, snapshot-safe); a trailing token overrides the caption (`now 2025-06 Today`). It renders as a palette-**red** diamond planted on the spine with a small `now` tab, plus a dotted "today line" that fades out near the axis — hover the marker in the desktop app to extend the line full-height. Because it rides the date axis it is drawn **only on a to-scale timeline** (every event dated); under `no-scale` it is ignored. A `now` past the last dated event rides out onto a trailing-`TBD` open horizon if there is one, else clamps to the last event.

## Directives

| Directive | Effect |
| --------- | ------ |
| `no-scale` | space events evenly instead of by date (dates become captions) |
| `side above` / `side below` | place all cards on one side instead of alternating |
| `no-box` | card-less slide style: a tag-colored label, a rule, and the description — no box |
| `no-legend` | hide the tag legend |
| `now` / `now <date>` | mark "today" — a red pin + dotted today-line (to-scale only; see [The now marker](#the-now-marker)) |

### Date directives

| Directive | Effect |
| --------- | ------ |
| `year 2026` | base year for bare month-day dates, so the chart renders the same next January |
| `date-order mdy` | numeric slash/dash dates read month-first (the default) |
| `date-order dmy` | numeric slash/dash dates read day-first |
| `no-current-year` | a fully bare date (no year anywhere in the file) becomes an error instead of silently assuming this year |

These may sit anywhere in the file — they are read before the dates they govern. See [Writing Dates](writing-dates.md).

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

## Tips

- Event lines read best with **5–25 events**. For longer histories, group events into **eras** and collapse the ones you're not focused on.
- Use `no-scale` for explainer and history threads; keep the default date scale for mission timelines and project histories where the real gaps matter.
- Reach for `no-box` when dropping the line into a slide.

## Next

- **Related:** [`timeline`](chart-timeline.md) · [`journey-map`](chart-journey-map.md)
- **Then:** [Colors & palettes](colors.md) · [Writing dates](writing-dates.md)
