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

A block diagram is an author-controlled **grid** of rectangular blocks — for the diagrams where the 2-D arrangement itself is the message: system and hardware block diagrams, signal chains, layered stacks, deployment topologies. It's the deliberate exception to dgmo's auto-layout: you place the blocks (columns, spans, nesting) and the renderer derives every pixel. Reach for `block` when you want a specific arrangement; reach for `boxes-and-lines` or `flowchart` when you want boxes auto-connected and laid out for you.

## Syntax

```
block Title

[Web] [Mobile] [CLI]      // one source line = one row of blocks
[API Gateway]             // a lone block fills the row's width
[Auth] [Orders] [Billing]
```

The first line declares the chart type and an optional title. A `[Label]` is a block; a row is one source line.

## Columns

Columns are **inferred from the widest row**, so you rarely write `columns` at all:

- A **lone block** on a row fills the full width.
- A short row that **evenly divides** the column count spreads to fill (two blocks in a four-column grid → two half-width blocks); otherwise blocks stay one column wide, left-aligned.
- `columns N` overrides the inferred count (e.g. to leave trailing empty cells).
- `_` is a deliberate empty cell — repeat `_ _` for a wider gap.

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
  [Auth] [Orders] s: Degraded   // Orders overrides; Auth inherits Healthy
```

## Directives

| Directive   | Effect                                            |
| ----------- | ------------------------------------------------- |
| `columns N` | Override a grid's inferred column count.           |
| `no-legend` | Hide the tag legend.                               |

## Tips

- Group with **containers** and tag the container so the color cascades — you rarely need to tag every box.
- Don't write `columns` unless you need to override the inferred width; a lone block already fills its row.
- Mark a busy subsystem `collapsed` to keep the overview readable, then expand it in the app.
- Use `block` for arrangement-is-the-meaning layouts; use `boxes-and-lines` when you want the engine to place and connect the boxes.
