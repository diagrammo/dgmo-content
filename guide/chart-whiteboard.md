**Beta — expect rough edges and syntax changes.**

```dgmo
whiteboard Login ideas
rectangle at: 60 60, size: 180 70
  Sign in
  with email
ellipse OAuth? at: 345 53, size: 170 84, color: blue
arrow from: 150 95, to: 430 95
rectangle Magic link at: 60 250, size: 180 70, color: green
arrow emails a code from: 150 95, to: 150 285, color: green
database Users at: 420 160, size: 140 100, color: purple
queue Email jobs at: 300 380, size: 200 64, color: orange
arrow from: 150 285, to: 400 412, color: orange, style: dashed
line from: 60 340, to: 240 340, style: dashed
text keep it to ONE screen at: 62 184
text 2FA here?? at: 560 -4, color: red
note Ask legal whether SSO needs a security review at: 600 300
ink red 3 ALwKUAEKBQoNCA8IKwwxBDMDKwkRBwsJBwkBCQgNCgkkDyQHHAE4ATQIFgYaDAwKCBABCgsO
```

## Overview

A whiteboard is a free-form board on an endless canvas. You scribble with a pen, drop a box or a sticky note, type a word and paste a screenshot, each wherever you like. Boxes, notes, arrows, lines and text are clean shapes; only your pen strokes look hand-made.

The file is ordinary DGMO text. Every box, note, arrow, line and piece of text is one readable line. Every pen stroke is also one line, but its path is a compact code that only the drawing canvas writes.

## When to use

- **`whiteboard`** — you want to think on a blank board: scribble, place things anywhere, keep drawing later.
- **[`sketch`](chart-sketch.md)** — you want tidy, same-size cards on a snap grid, coloured by meaning.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — you'd rather write the diagram as text and let the engine lay it out.
- **[`wireframe`](chart-wireframe.md)** — you're drawing a screen with buttons, fields and navigation.

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

`note` drops a sticky note: a yellow card with its text in the top-left corner, wrapped to the card. It is 160 × 120 pixels unless you add `size: W H`, and yellow unless you add `color:`. A note can start empty (`note at: 600 40`) and take its text later.

```dgmo
whiteboard
rectangle Checkout at: 0 0, size: 160 70
note Do we need guest checkout? at: 200 -20
note at: 200 130, color: blue
  Owner: Sam
  Due Friday
```

Notes sit on a layer of their own. Add `no-notes` to hide every note when the board is shown or exported; in the app, the notes toggle shows or hides them, and an export follows the toggle. An arrow end placed inside a note attaches to it, just as it does to a box.

## Colours

Add `color:` with a colour name: `red`, `green`, `blue`, `teal`, `purple`, `orange`, `yellow`, `cyan` or `gray`. Leave it off for `ink`, the default — near-black on a light background and near-white on a dark one. A note is the exception: it is `yellow` unless you say otherwise. Every colour follows the palette and the light or dark theme, like every other diagram.

## Images

A pasted picture is saved beside the diagram, in a folder named after it (`login-ideas.assets/`). When a board is shared, its pictures move to a web link. Where a picture cannot be found — a copied code block, or a docs site without the folder — the board shows a plain box marked _image not uploaded_ instead. Nothing breaks.

## Using AI

AI assistants can write and edit the boxes, notes, arrows, lines and text of a whiteboard. They never write pen strokes: a stroke's code only comes from drawing it.

## Tips

- Leave room between boxes — 60 to 100 pixels reads well.
- An arrow or line end placed inside a shape or a note is attached to it: it is drawn to the border, so the head sits on the edge. When you move a box by hand in the file, move the ends inside it too.
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
