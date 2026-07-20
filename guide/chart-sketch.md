```dgmo
sketch Plunder Pipeline

tag Crew
  Deck
  Hold

Spyglass Feed shape: database, at: 0 0, crew: Deck
  -sightings-> con
Captain's Console as con at: 2 0, crew: Deck
  -orders-> bq
Divvy Service as dvy at: 4 0, crew: Hold

[Below Decks] at: 2 2, crew: Hold
  Booty Queue as bq shape: queue, at: 0 0
    ~haul~> dvy
  Ship Ledger as ledger shape: database, at: 2 0

[Armory] as armory at: 0 2, collapsed
  Powder Store at: 0 0
```

## Overview

A sketch is a **GUI-first constrained canvas** — you place uniformly-sized shapes on a snap grid, draw arrows between them, and attribute meaning through tags. It's the one chart type built for getting an idea out of your head spatially rather than describing it in markup: the desktop and web apps open a sketch straight into a canvas editor, and the markup below is _generated_. It looks like dgmo and diffs like dgmo — but you never have to write it. The renderer, not you, guarantees the result never looks ugly; you own placement, connection, naming, and meaning.

Reach for `sketch` when the drawing _is_ the content.

## When to use

- **`sketch`** — you want to place shapes freely on a canvas and eyeball the arrangement yourself.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — you'd rather write the diagram out as text and let the engine lay the graph out for you.
- **[`block`](chart-block.md)** — everything should snap into a tidy grid, and that strict arrangement is the message.
- **[`wireframe`](chart-wireframe.md)** — you're drawing a *screen* with buttons, fields, and nav rather than shapes and arrows.
- **[`quadrant`](chart-quadrant.md)** — position means a rating on two named axes, not layout.

## Syntax

```
sketch Title

// a bare name + same-line metadata
Spyglass Feed shape: database, at: 0 0
  // an edge, indented under its source
  -orders-> con
// `as` gives it a handle for edges
Captain's Console as con at: 2 0
```

The first line declares the chart type and an optional title. Each top-level line is one shape; brackets `[Below Decks]` mean exactly one thing — a box.

## Shapes

Every shape renders as an **org-style card**: a header with the name, a rule, and a row per tag the shape carries (`Group: value`). A shape is a **bare name** with optional same-line `key: value` metadata. `shape:` sets a small **type badge** in the card header:

| Value      | Header badge                                |
| ---------- | ------------------------------------------- |
| `database` | cylinder                                    |
| `queue`    | capsule                                     |
| `person`   | torso-head                                  |
| `document` | page with a wavy bottom                     |
| `note`     | sticky card, left-aligned text (no header)  |

A rectangle is the default (no badge) and is never written. Every card is the same fixed size — there is no resizing; the name fits on one line (it shrinks, then ellipsizes). Kind-of-thing is a hint; meaning lives in tags — so the shape set stays small on purpose.

## Coordinates

`at: C R` places a shape on the grid in half-slot steps (a slot is one footprint plus the mandatory gap between shapes). Coordinates are origin-normalized, so panning the whole sketch is a zero diff. **`at:` is optional** — an un-positioned shape flows into a row below the existing content. You'll rarely write coordinates by hand; the canvas editor writes real ones on every save.

## Lines

Edges are indented under their source shape and target an alias (or an unambiguous label). The forms are:

| Form        | Meaning        |
| ----------- | -------------- |
| `-label->`  | one arrowhead  |
| `<-label->` | both ends      |
| `-label-`   | no heads       |

Each has a dashed twin written with `~` in place of `-` (`~label~>`). Dashed means "secondary", not async.

Unlabeled headless lines are written `--` and `~~`. There are no left-pointing arrows — write the edge from the other side. A tag on the edge's tail (`-haul-> dvy crew: Hold`) colors the whole line.

## Boxes

Wrap related shapes in a labeled frame with `[Brackets]` and an indented body:

```
[Below Decks] at: 2 2, crew: Hold
  Booty Queue shape: queue, at: 0 0
  Ship Ledger shape: database, at: 2 0
```

The box reserves a top band for its label. Boxes are one level deep (no nesting). A tag on the box **cascades** to its children; a tag on an individual child **overrides** it. Add the bare `collapsed` flag to start a box folded — it renders as a single card with a collapse bar, and its edges re-target the card. In the app, click the band to fold and the card to unfold; static export renders the authored state.

## Tags & color

Declare a `tag` group before the content, then apply values as metadata on shapes, boxes, and edge tails. Named palette colors only — there is no color picker anywhere. Untagged shapes render a neutral gray until you give them meaning.

```
tag Crew
  Deck
  Hold

Spyglass Feed at: 0 0, crew: Deck
```

## Descriptions

Indent one or more `>` lines under a shape to give it a description block. Lines accumulate, and the text renders in the card body below the tag rows:

```dgmo
sketch Plunder Pipeline

Spyglass Feed shape: database, at: 0 0
  > Watches the horizon for sail.
  > Emits a sighting per contact.
Captain's Console at: 2 0
  > Where the orders get given.
```

Add `no-descriptions` at the top level to hide every description block without deleting the text — useful when the same file has to serve both a detailed view and a compact embed:

```dgmo
sketch Plunder Pipeline
no-descriptions

Spyglass Feed shape: database, at: 0 0
  > Watches the horizon for sail.
Captain's Console at: 2 0
```

## Tips

- **Let the app write it.** Sketch is GUI-authored — open a `.dgmo` file that starts with `sketch` in the desktop or web app and the canvas editor takes over.
- **Keep it small.** Sketches read best under ~15 shapes; embeds shrink past ~30, and that pressure is a feature.
- **Categorize with tags, not more shapes** — the shape set is deliberately narrow. Color the axis that sorts your shapes into kinds (crew, tier, trust zone) with one tag group.
- **`~` means secondary, not async** — it's a softer stroke, unlike infra's async arrows.

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

- **Related:** [`boxes-and-lines`](chart-boxes-and-lines.md) · [`block`](chart-block.md) · [`wireframe`](chart-wireframe.md) · [`quadrant`](chart-quadrant.md)
- **Then:** [Colors & palettes](colors.md)
