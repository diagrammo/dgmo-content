# Ring Diagram

```dgmo
ring Captain's Sphere of Influence

solid-fill

Captain red
  Final word on heading and plunder,
  keeper of the ship's charter.

Quartermaster | Second-in-command, arbitrates disputes and divvies the booty

Crew yellow
  Deckhands, gunners, and powder
  monkeys aboard the ship.

Allied Crews green
  Loose alliances kept by oath
  or shared bounty in fair seas.

The Open Sea blue
  Weather, currents, and rival
  flags beyond any captain's reach.
```

## Overview

Ring diagrams show concentric layers of nested or hierarchical categories. Source order reads core-out: the first layer in the file is the innermost element (rendered as a filled disc), the last layer is the outermost ring. Min 2 layers, max 15.

## Syntax

```
ring Title

[solid-fill]                 // optional directive

LayerLabel                   // innermost first
LayerLabel blue
LayerLabel green
  Indented description
```

The first line declares the chart type and an optional title. Each non-indented, non-directive line declares one layer.

## Layers

```
ring Org Maturity

Pilot yellow
Adoption orange
Standard green
Embedded blue
```

Color uses the trailing-token form. Reach for `| color: <name>` only when another pipe key (`description: …`) rides along on the same line.

### Layer Pipe Metadata

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `color` | palette name | auto-assigned | Ring color (pair with another key — for color-only, use the trailing-token form) |
| `description` | string | — | One-liner shown in the side description list |

### Descriptions

Indented lines under a layer add description text. Markdown inline formatting is supported (`**bold**`, `*italic*`, `` `code` ``, `[links](url)`). Bullet points with `- item` render as `• item`.

```
Crew green
  Deckhands and gunners.
  - Standing watch
  - Working the rigging
```

If both `| description: text` and indented lines exist, they concatenate (pipe first, then indented).

The shorthand form — bare text after `|` with no `key:` prefix — is taken as the description directly:

```
Quartermaster | Second-in-command, divvies the booty
```

## Directives

| Directive | Effect |
|-----------|--------|
| `solid-fill` | Render rings with the full intent color instead of the default 25% tint. |

`inverted` is **not** valid on ring diagrams (rings are rotationally symmetric — visual inversion is meaningless). Using it emits an error-severity diagnostic and the line is discarded.

## Color Validation

Unknown color names emit an error-severity diagnostic with a "Did you mean…?" hint, and the layer falls back to its series color so the chart still renders. Allowed colors: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`.

## Rendering

- Each ring is its own annular shape — concentric bands don't overlap.
- A 1px contrast stroke separates adjacent rings so similar tints don't blur together.
- Labels sit inside their ring band (innermost label centered on the disc, outer-ring labels stacked along the band's vertical midline above center).
- The side description list shows one entry per layer with a colored accent bar matching the ring.
- When ring band thickness would force the label below the readable floor, in-band labels are skipped and the side list shows the layer names instead.

## Complete Example

```dgmo
ring OSI Layered Model

solid-fill

Physical red
  Cables, voltages, signal timing.

Data Link orange
  Frames between adjacent nodes; MAC addressing.

Network yellow
  IP routing across networks.

Transport green
  End-to-end reliability; TCP and UDP.

Application blue
  HTTP, SMTP, SSH — what the user sees.
```
