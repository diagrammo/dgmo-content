**Beta — expect rough edges and syntax changes.**

```dgmo
whiteboard Treasure hunt app — kickoff
text MVP — ship by June at: 330 -14, color: red
ink red 3 AJQFJBYEPAAuBzwALAg8AAgB
text v2 ideas at: 870 -14, color: gray
line from: 835 -20, to: 835 450, color: gray, style: dashed
ellipse Players at: 40 80, size: 160 90, color: blue
rectangle Phone app at: 330 85, size: 180 80, color: teal, fill: solid
ink red 3 APYEvAEeFSQRPg80BTYAVAweCjIYIh4OGAQQABoFEBEYGRY_HkEOIwQ3ADUFLws1FxUNDw8LDwcRARkEDwgRFBccFTQXQA8
arrow taps and digs from: 120 125, to: 420 125, color: blue
rectangle Map service at: 620 40, size: 170 70, color: purple
arrow where am I? from: 420 125, to: 705 75, color: purple, bend: -30
database Treasure vault at: 640 190, size: 150 110, color: orange
arrow claim a chest from: 420 125, to: 715 245, color: orange
queue Push alerts at: 300 300, size: 210 64, color: cyan
ink green 4 AIgI_AQcICY5Fhs
arrow chest found! from: 715 245, to: 405 332, color: cyan, style: dashed, bend: 40
ellipse Leaderboard at: 40 300, size: 170 90, color: green, fill: outline
arrow from: 405 332, to: 125 345, color: green
arrow bragging rights from: 125 345, to: 120 125, heads: both, style: dashed
note Ask legal about digging in parks at: 330 430, size: 200 80, color: red
note What if chests move at night? at: 870 30
note Kids mode, no ads at: 870 160, color: green
note at: 870 290, color: purple
  Team battles
  every Friday
```

## Overview

A whiteboard is a free-form board on an endless canvas. You scribble with a pen, drop a box or a sticky note, draw an arrow and type a word, each wherever you like. Boxes, notes, arrows, lines and text are clean shapes; only your pen strokes look hand-made.

The file is ordinary DGMO text. Every box, note, arrow, line and piece of text is one readable line. Every pen stroke is also one line, but its path is a compact code that only the drawing canvas writes.

## When to use

- **`whiteboard`** — you want to think on a blank board: scribble, place things anywhere, keep drawing later.
- **[`sketch`](chart-sketch.md)** — you want tidy, same-size cards on a snap grid, coloured by meaning.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — you'd rather write the diagram as text and let the engine lay it out.
- **[`wireframe`](chart-wireframe.md)** — you're drawing a screen with buttons, fields and navigation.

## Drawing on the canvas

In the Diagrammo app a whiteboard opens as a canvas, not as text. Start one from **New file → Blank whiteboard**, or **File → New Whiteboard** (⌥⌘N) in the desktop app. Shortcuts below use ⌘; on Windows and Linux use Ctrl.

**Tools** live on a rail at the left edge of the canvas. It stays in view while the board is nearly empty; after that it tucks away, and moving the pointer to the left edge brings it back. Each tool also has a key:

| Key | Tool                                                              |
| --- | ----------------------------------------------------------------- |
| V   | Select                                                            |
| P   | Pen — drag to draw a stroke (the starting tool)                   |
| E   | Eraser — wipe across a pen stroke to remove it                    |
| R   | Rectangle (O ellipse, D database, Q queue) — drag to draw         |
| N   | Sticky note — click to drop one                                   |
| L   | Line (A arrow) — drag from one shape to another                   |
| T   | Text — or just double-click empty canvas                          |
| H   | Hand — drag to pan                                                |

After you draw a shape or a line the tool goes back to Select. Double-click a tool on the rail to keep it picked. You can also drag a shape, a line or a colour straight off the rail onto the board.

**Typing.** Start typing right after drawing a shape to label it. Double-click anything to edit its label, or select it and press Enter. Inside a label, Enter starts a new line, ⌘Enter or a click elsewhere finishes, and Esc throws the typing away.

**Selecting and moving.** Click to select, Shift-click to add, drag across empty canvas to select a group, ⌘A for everything. Drag to move; arrow keys nudge 1 px (Shift for 10). Drag a corner or side to resize — Shift keeps the shape's proportions. Things snap to each other's edges and centres; hold ⌘ to place freely. Delete or Backspace removes the selection, ⌘D duplicates it, and Alt-drag pulls out a copy.

**Arrows and lines.** Drag from inside one shape to inside another and the ends attach — move a shape and its arrows follow. Drag an end to re-attach it, click an end to add or remove its arrowhead, and drag the round handle in the middle of a selected arrow to bend it. The line tool's slide-out also offers dashed lines and arrows; pick one with a line selected to restyle it.

**Colour and fill.** The colour pill on the rail, and the small row of colours above any selection, recolour what is selected. Click a shape's current colour again to step its fill from a pale tint, to solid, to outline only.

**Order.** `]` brings the selection to the front and `[` sends it to the back; ⌥] and ⌥[ move it one step.

**Moving around.** Two-finger scroll or Space-drag pans; pinch or ⌘-scroll zooms. ⌘0 or Shift+1 fits the whole board, Shift+0 goes to 100%, ⌘+ and ⌘− zoom in and out. The controls at the foot of the rail do the same, and hold the **Sticky notes** toggle that shows or hides every note.

**Undo** is ⌘Z, and ⌘⇧Z redoes. **Copy and paste** work as text: copying gives you the selected elements as DGMO lines, and pasting DGMO lines — from this board or anywhere else — adds them where the pointer is.

**Seeing the text.** Press ⌘/ to show the board's text beside the canvas. The two stay in step: draw on the canvas and the line appears; edit a line and the board redraws.

## The file

One line is one element, and it starts with what it is.

| Line                                            | What it draws                          |
| ----------------------------------------------- | -------------------------------------- |
| `rectangle <label> at: X Y, size: W H`          | A box                                  |
| `ellipse <label> at: X Y, size: W H`            | An ellipse                             |
| `database <label> at: X Y, size: W H`           | An upright cylinder                    |
| `queue <label> at: X Y, size: W H`              | A cylinder on its side                 |
| `note <text> at: X Y`                           | A sticky note                          |
| `arrow <label> from: X Y, to: X Y`              | A straight arrow; the head is at `to:` |
| `line <label> from: X Y, to: X Y`               | A straight line with no head           |
| `text <words> at: X Y`                          | Free text                              |
| `image <file or https link> at: X Y, size: W H` | A pasted picture                       |
| `ink <colour> <width> <code>`                   | One pen stroke, written by the canvas  |

- **Positions are pixels.** `at:` is the top-left corner. Numbers are whole and may be negative, because the board has no edge.
- **Labels are optional** on shapes, notes, arrows and lines. A shape's label is centred inside it and wraps to the shape's width, so a long label never spills out of its box.
- **Later lines draw on top** of earlier ones.
- **Dashed strokes.** Add `style: dashed` to an arrow or a line to draw it dashed — handy for a maybe, or an optional step. Leave it off for a solid stroke; `dashed` is the only style you write.
- **Several lines.** To break a label over lines, indent each line under its element. A label on the element line itself is the first line. Your line breaks are always kept; inside a shape or a note, a line too long for it also wraps. Arrow, line and text labels never wrap. This works on shapes, notes, arrows, lines and text:

  ```dgmo
  whiteboard
  rectangle at: 0 0, size: 140 60
    Sign in
    with email
  ```

- If a label itself contains a word followed by a colon, put it in quotes: `text "todo: ship it" at: 0 0`.

## Sticky notes

`note` drops a sticky note: a yellow card with its text in the top-left corner, wrapped to the card. It is 160 × 99 pixels — the golden ratio — unless you add `size: W H`, and yellow unless you add `color:`. A note can start empty (`note at: 600 40`) and take its text later.

```dgmo
whiteboard
rectangle Checkout at: 0 0, size: 160 70
note Do we need guest checkout? at: 200 -20
note at: 200 130, color: blue
  Owner: Sam
  Due Friday
```

Notes sit on a layer of their own. Add `no-notes` to hide every note when the board is shown or exported; in the app, the notes toggle shows or hides them, and an export follows the toggle. An arrow end placed inside a note attaches to it, just as it does to a box, and when the notes are hidden, arrows and lines drawn from a note hide with it.

## Colours

Add `color:` with a colour name: `red`, `green`, `blue`, `teal`, `purple`, `orange`, `yellow`, `cyan` or `gray`. Leave it off for `ink`, the default — near-black on a light background and near-white on a dark one. A note is the exception: it is `yellow` unless you say otherwise. Every colour follows the palette and the light or dark theme, like every other diagram.

## Images

An `image` line shows a picture: `image https://example.com/sketch.png at: 600 200, size: 250 170`. The reference is an `https://` link or a file path beside the diagram. Where a picture cannot be loaded, the board shows a plain box marked _image not uploaded_ instead — nothing breaks. The canvas cannot paste or drop pictures yet; add them as a line in the text.

## Using AI

AI assistants can write and edit the boxes, notes, arrows, lines and text of a whiteboard. They never write pen strokes: a stroke's code only comes from drawing it.

## Tips

- Leave room between boxes — 60 to 100 pixels reads well.
- An arrow or line end placed inside a shape or a note is attached to it: it is drawn toward the shape's centre and stops at the border, so the head sits on the edge and two connected boxes are joined centre to centre, wherever inside them the ends were dropped. When you move a box by hand in the file, move the ends inside it too.
- A line the reader cannot understand is skipped with a warning; the rest of the board still draws.

## Appearance

| Directive  | Effect                  |
| ---------- | ----------------------- |
| `no-title` | Hide the title line.    |
| `no-notes` | Hide every sticky note. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`sketch`](chart-sketch.md) · [`boxes-and-lines`](chart-boxes-and-lines.md) · [`wireframe`](chart-wireframe.md)
- **Then:** [Colors & palettes](colors.md)
