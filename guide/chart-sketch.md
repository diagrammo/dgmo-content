**Beta — expect rough edges and syntax changes.**

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

Sketch is the one chart type you **draw** rather than write. Open a `.dgmo` file whose first line is `sketch` and the desktop or web app hands you a canvas: you place shapes on a snap grid, drag lines between them, and colour them by meaning. The markup above is what the canvas _saves_ — it looks like dgmo and diffs like dgmo, and you never have to type it.

Reach for `sketch` when the drawing _is_ the content. The renderer, not you, guarantees the result never looks ugly: every card is the same size, the palette is fixed, and there is no colour picker anywhere. You own placement, connection, naming, and meaning.

This page covers the canvas first, then the file — which still matters for reading a sketch in a pull request, and for the handful of things the canvas cannot do yet.

## When to use

- **`sketch`** — you want to place shapes freely on a canvas and eyeball the arrangement yourself.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — you'd rather write the diagram out as text and let the engine lay the graph out for you.
- **[`block`](chart-block.md)** — everything should snap into a tidy grid, and that strict arrangement is the message.
- **[`wireframe`](chart-wireframe.md)** — you're drawing a _screen_ with buttons, fields, and nav rather than shapes and arrows.
- **[`quadrant`](chart-quadrant.md)** — position means a rating on two named axes, not layout.

## The canvas

There is no toolbar, no context menu, and no tool palette to choose from. Every act is a gesture on the board itself, and the whole list is short enough to learn in one sitting.

One thing to know before anything else: **nothing marks a shape's edge until you approach it**. Move the pointer near the side of a shape and a small arrow grows out of it — that arrow is what you drag to draw a line, and it is the only cue that the edge is live.

### Making things

| To make                       | Do this                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| A shape                       | Double-click empty board. It lands on the nearest slot with the caret already in its name.                                                    |
| A shape and a line together   | Hover a shape's edge until the arrow appears, then drag from that arrow out onto empty board.                                                 |
| A line between two shapes     | The same drag, released over the shape you want to reach.                                                                                    |
| A box                         | Sweep a marquee around two or more things, then type. The dashed frame is only _offered_ while you decide — the first character you type commits it and starts its name. |
| A tag group                   | The `+` circle at the end of the legend.                                                                                                     |
| A tag value                   | The `+` in the value row.                                                                                                                    |

Both `+` controls stay out of the way until the pointer approaches the legend. The room they need is always reserved, so nothing shifts when they arrive.

### Moving things

Drag a shape's middle to move it, or a box's label band or its interior to move the box with everything inside it. If what you grabbed was already part of the selection, the whole selection travels with it.

Nothing snaps while you drag. A ghost shows the slot you would land on, and letting go is what commits it — release over a slot that is already taken and the shape springs back, with nothing written and nothing to undo. Drag a shape into a box to make it a member, and clear of the box to take it out again.

Click empty board to deselect. Sweep a marquee to select several things at once — only what the sweep fully encloses is caught.

### Lines

A line carries three press targets, each sitting on the line itself:

| Press                                          | Effect                                                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The seat at its middle                         | Cycles its style: solid → dashed → gone → solid. "Gone" is a position you can press your way back out of, not a deletion — while you stand there the file still holds the line, and only leaving the line commits the removal. |
| Either end ring                                | Turns that arrowhead on or off.                                                                                                                                                             |
| Its label, or the empty slot where one would go | Names it.                                                                                                                                                                                    |

Drag an end ring onto a different shape to re-aim that end of the line; drop it on nothing and it snaps back.

Dashed means **secondary** in a sketch — a softer stroke, not async. That deliberately differs from infra's `~>`.

### Colour and meaning

Colour in a sketch never means "I liked this colour". It comes from a **tag group** — an axis you name, like crew or tier or trust zone, with one value per shape — and the legend is where you work with it.

- **Press a value's swatch** to pick that colour up, then click shapes one after another to apply it. With several things selected, one press tags them all.
- **Or drag a swatch** straight onto a shape, a box, or a line.
- **Click a value's dot** to open its colour row and choose a different colour. Hovering a colour previews it across the whole board before you commit.
- **Hover a value** and everything not carrying it recedes, so you can read one axis at a time.
- **Drag a value** along the legend to reorder it. The first value is not special in a sketch — untagged shapes stay neutral gray until you give them meaning.
- A sketch can carry more than one tag group. The others sit beside the active one as pills; clicking a pill switches which group the board is coloured by. That is a view, and it changes nothing in the file.

The colours are the palette's named colours, the same set the language accepts — see [Colors](colors.md).

### Fill and legend

A grip sits at the top-right of the preview and appears when the pointer rides the top edge. Pull it down for two controls:

- **Fill** — cycles tint (the default), solid, and outline.
- **Legend** — draws or hides the legend. With no tags yet it stays visible and says why, rather than disappearing.

Both are **persistent**: flipping one writes the setting into the file, so the choice survives a reload, an export, and a shared link. Sketch is the only chart type where these stick.

### Taking it back

| Key                             | Effect                                                                                                                                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **⌘ + Z** / **⌘ + Shift + Z**   | Undo and redo. The Edit menu names the act you are about to take back.                                                                                                        |
| **Escape**                      | Unwinds one rung per press — cancel the drag in flight, restore a line you cycled to gone, drop the box being offered, close the colour row, put down the colour you picked up, close the name field, clear the selection. |
| **Backspace** / **Delete**      | Removes the selection. There are no delete buttons anywhere.                                                                                                                  |
| Any printable character         | With one thing selected, starts renaming it.                                                                                                                                  |
| **Enter**                       | Commits a name. **Escape** while typing cancels it — the one way to lose what you typed.                                                                                       |

Double-click anything to rename it. There is no pan and no zoom: the board is drawn at rest and fits itself to the pane.

## What only the file can do

Four things the language supports that no canvas gesture reaches yet. A sketch carries them untouched through every gesture — editing on the canvas will not destroy them — but to set one, open the source pane with **⌘ + 2** and type it.

| Feature                              | Why it needs the file                                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptions**                     | The canvas does not draw them at all. They render everywhere else — export, the CLI, embeds — so a sketch can carry detail the board itself stays clean of.         |
| **Shape badges** (`shape: database`) | The badge renders; nothing on the canvas sets one.                                                                                                                 |
| **A folded box** (`collapsed`)       | A box written folded renders folded, with its edges re-targeted to the single card. No gesture folds or unfolds one.                                               |
| **A title, once there is none**      | The canvas renames a title but cannot create one, and clearing a title removes it. Put `sketch My Title` back on the first line to get it back.                     |

## The file it writes

You will rarely type any of this, but a sketch is a text file on purpose: it diffs, it reviews, and it renders anywhere dgmo does. This is what the canvas is writing while you draw.

```
sketch Title

// a bare name + same-line metadata
Spyglass Feed shape: database, at: 0 0
  // a line, indented under its source
  -orders-> con
// `as` gives it a handle to aim lines at
Captain's Console as con at: 2 0
```

The first line declares the chart type and an optional title. Each top-level line is one shape; brackets `[Below Decks]` mean exactly one thing — a box.

**Shapes.** Every shape renders as an org-style card: a header with the name, a rule, and a row per tag it carries. `shape:` sets a small type badge in the header — `database` (cylinder), `queue` (capsule), `person` (torso-head), `document` (page with a wavy bottom), or `note` (a sticky card with left-aligned text and no header). A rectangle is the default and is never written. Every card is the same fixed size; the name fits on one line, shrinking and then ellipsizing. Kind-of-thing is a hint — meaning lives in tags, which is why the shape set stays small on purpose.

**Coordinates.** `at: C R` places a shape on the grid in half-slot steps, where a slot is one card plus the mandatory gap between cards. Coordinates are origin-normalized, so panning the whole sketch is a zero diff. `at:` is optional — an un-positioned shape flows into a row below the existing content — and the canvas writes real ones on every save.

**Lines.** Indented under their source, aimed at an alias or an unambiguous label:

| Form        | Meaning       |
| ----------- | ------------- |
| `-label->`  | one arrowhead |
| `<-label->` | both ends     |
| `-label-`   | no heads      |

Each has a dashed twin written with `~` in place of `-` (`~label~>`). Unlabeled headless lines are `--` and `~~`. There are no left-pointing arrows — write the line from the other side. A tag on the line's tail (`-haul-> dvy crew: Hold`) colours the whole line.

**Boxes.** A labeled frame around an indented body:

```
[Below Decks] at: 2 2, crew: Hold
  Booty Queue shape: queue, at: 0 0
  Ship Ledger shape: database, at: 2 0
```

The box reserves a top band for its label, and boxes are one level deep — no nesting inside a nesting. A tag on the box cascades to its children; a tag on a child overrides it.

**Tags.** Declare a group before the content, then apply values as metadata on shapes, boxes, and line tails:

```
tag Crew
  Deck
  Hold

Spyglass Feed at: 0 0, crew: Deck
```

**Descriptions.** Indent one or more `>` lines under a shape. They accumulate, and render in the card body below the tag rows:

```dgmo
sketch Plunder Pipeline

Spyglass Feed shape: database, at: 0 0
  > Watches the horizon for sail.
  > Emits a sighting per contact.
Captain's Console at: 2 0
  > Where the orders get given.
```

Add `no-descriptions` at the top level to hide every description block without deleting the text — useful when one file has to serve both a detailed view and a compact embed.

## Tips

- **Let the app write it.** Sketch is drawn, not typed — open a `.dgmo` file that starts with `sketch` and the canvas takes over.
- **Keep it small.** Sketches read best under ~15 shapes; embeds shrink past ~30, and that pressure is a feature.
- **Categorize with tags, not more shapes** — the shape set is deliberately narrow. Colour the one axis that sorts your shapes into kinds.
- **`~` means secondary, not async** — a softer stroke, unlike infra's async arrows.

## Appearance

Every chart accepts the universal appearance directives:

| Directive      | Effect                        |
| -------------- | ----------------------------- |
| `fill-tint`    | Soft tinted fills (default).  |
| `fill-solid`   | Saturated solid fills.        |
| `fill-outline` | Outline only, no fill.        |
| `no-title`     | Hide the title line.          |
| `no-legend`    | Hide the legend.              |

On a sketch, `fill-*` and `no-legend` are what the Fill and Legend controls write for you.

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`boxes-and-lines`](chart-boxes-and-lines.md) · [`block`](chart-block.md) · [`wireframe`](chart-wireframe.md) · [`quadrant`](chart-quadrant.md)
- **Then:** [Colors & palettes](colors.md)
