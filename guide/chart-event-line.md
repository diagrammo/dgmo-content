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

[The Standards Era] collapsed: true
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

## Overview

An **event line** is the annotated, narrative timeline every infographic reaches for: a horizontal spine of point events, each a dot with a date caption and a leader line up to an org-style card holding a title and a short description. Cards auto-alternate above and below the spine to pack densely. Think "a history of the web", "company milestones", "how a bill becomes law", or "a mission timeline".

It is distinct from the [Timeline](chart-timeline.md) chart: `timeline` is a strict, to-scale date axis with eras, markers, and range bars; `event-line` is **point events with rich prose**, optionally **not to scale** for the storytelling look.

## Syntax

```
event-line Title

2012-02-05 Event Title  tagAlias: Value
  A description line — bare prose, markdown allowed.
  - a bullet point
```

- **Event = a line.** An optional **leading ISO date** (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`, optionally `… HH:MM`) comes first, then the title. The date is optional — a bare title works too.
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

Add `collapsed: true` to fold an era into a single summary card — its name as the title and a bulleted list of its member events — while a small bracket stays on the spine marking the era's span. In the desktop app you can click an era to collapse or expand it live.

```
[The Standards Era] collapsed: true
  1995 JavaScript  t: Platform
  1996 CSS  t: Standard
```

## Directives

| Directive | Effect |
| --------- | ------ |
| `no-scale` | space events evenly instead of by date (dates become captions) |
| `side above` / `side below` | place all cards on one side instead of alternating |
| `no-box` | card-less slide style: a tag-colored label, a rule, and the description — no box |
| `no-legend` | hide the tag legend |

## Tips

- Event lines read best with **5–25 events**. For longer histories, group events into **eras** and collapse the ones you're not focused on.
- Use `no-scale` for explainer and history threads; keep the default date scale for mission timelines and project histories where the real gaps matter.
- Reach for `no-box` when dropping the line into a slide.
