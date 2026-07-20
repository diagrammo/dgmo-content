```dgmo
block Web Service Architecture

tag Layer as l
  Edge blue
  Service green
  Data orange

[Clients] l: Edge
  [Browser] [Mobile] [CLI]

[Backend] l: Service
  [Auth] [Orders]
  [Inventory] [Billing]

[Data] l: Data collapsed
  [Postgres] [Redis]
```

## Overview

A block diagram is an author-controlled **grid** of rectangular blocks — for the diagrams where the 2-D arrangement itself is the message: system and hardware block diagrams, signal chains, layered stacks, deployment topologies. It's the deliberate exception to dgmo's auto-layout: you place the blocks (columns, spans, nesting) and the renderer derives every pixel. Reach for `block` when you want a specific arrangement. In a block diagram 2-D position *is* the meaning and it is yours to control — the diagram asserts that these things sit next to each other on purpose.

## When to use

- **`block`** — *where* each box sits carries meaning you control, and everything should snap into a tidy grid.
- [`boxes-and-lines`](chart-boxes-and-lines.md) — you want the tool to arrange the boxes for you. Position there is auto-layout and carries no meaning; read one as the other and you either invent adjacency semantics or lose them.
- [`sketch`](chart-sketch.md) — you want to place shapes freely and eyeball it, rather than snap to a grid.
- [`quadrant`](chart-quadrant.md) — position is a *rating on two axes*, not a physical or logical arrangement.
- [`c4`](chart-c4.md) — you need click-to-zoom levels of detail (context → container → component) rather than one static arranged picture.
- [`wireframe`](chart-wireframe.md) — the result needs to look like a user interface, not a systems layout that happens to be gridded.
- [`body`](chart-body.md) — the underlying picture is a human figure rather than an arrangement you define.

## Syntax

```
block Title

// one source line = one row of blocks
[Web] [Mobile] [CLI]
// a lone block fills the row's width
[API Gateway]
[Auth] [Orders] [Billing]
```

The first line declares the chart type and an optional title. A `[Label]` is a block; a row is one source line.

## Columns

Columns are **inferred from the widest row**, so you rarely write `columns` at all:

- A **lone block** on a row fills the full width.
- A short row that **evenly divides** the column count spreads to fill (two blocks in a four-column grid → two half-width blocks); otherwise blocks stay one column wide, left-aligned.
- `columns N` overrides the inferred count (e.g. to leave trailing empty cells).
- `_` is a deliberate empty cell — repeat `_ _` for a wider gap. `space` is an accepted spelling of the same token, if the underscore reads too cryptically.

```
block Memory Layout
columns 4

[Header] span: 2 _ [Flags]
[Payload] span: 4
```

## Spans

For an uneven span — a block covering some but not all columns — add `span:` **after** the bracket: `[Wide] span: 2`. A span larger than the column count clamps to it.

## Containers & collapse

Indent a sub-grid under a block to make it a **container**. Sibling containers stack vertically; the horizontal grid is for the leaf blocks inside a container.

```
block Cloud Architecture

[VPC]
  [Public Tier]
    [Load Balancer] [Bastion]
  [Data Tier] collapsed
    [Postgres] [Replica]
```

Add the bare `collapsed` flag to start a container folded — it renders as a header band with a collapse bar. In the desktop app you can click a container header to collapse or expand it; static export renders the authored state.

## Tags & color

Declare a `tag` group before the content and apply it **outside** the bracket — `[Backend] l: Service`. A tag on a **container cascades** to its children; a tag on an **individual box overrides** the cascade. Because metadata sits outside the bracket, a colon inside a label (`[api: v2]`) stays label text. Named palette colors only.

```
block Service Health

tag Status as s
  Healthy green
  Degraded orange

[Services] s: Healthy
  // Orders overrides; Auth inherits Healthy
  [Auth] [Orders] s: Degraded
```

## Directives

| Directive   | Effect                                            |
| ----------- | ------------------------------------------------- |
| `columns N` | Override a grid's inferred column count.           |
| `_` / `space` | A deliberate empty cell in a row (two spellings of one token). |
| `no-legend` | Hide the tag legend.                               |
| `fill-tint` \| `fill-solid` \| `fill-outline` | Fill treatment for the blocks — see [Appearance](#appearance). |

## Tips

- Group with **containers** and tag the container so the color cascades — you rarely need to tag every box.
- Don't write `columns` unless you need to override the inferred width; a lone block already fills its row.
- Mark a busy subsystem `collapsed` to keep the overview readable, then expand it in the app.
- Use `block` for arrangement-is-the-meaning layouts; use `boxes-and-lines` when you want the engine to place and connect the boxes.

## Appearance

Block accepts these universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-legend` | Hide the legend. |

The fill family is mutually exclusive — the last one written wins. Block has no `no-title` directive; omit the title from line 1 if you don't want one.

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **In `block`, 2-D position is the meaning and you control it.** In [`boxes-and-lines`](chart-boxes-and-lines.md) position is automatic and carries none. Reading one as the other invents adjacency semantics or loses them.
- **Blocks on the same line are neighbours in the same row.** Moving one to its own line changes the layout, which is the point — but it also changes what the diagram asserts.
- **A trailing `//` note breaks the tag it sits beside**, silently, so the color override you wrote never happens. Put notes on their own line.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`boxes-and-lines`](chart-boxes-and-lines.md) · [`sketch`](chart-sketch.md) · [`quadrant`](chart-quadrant.md) · [`c4`](chart-c4.md) · [`wireframe`](chart-wireframe.md) · [`body`](chart-body.md)
- **Then:** [Colors & palettes](colors.md)
