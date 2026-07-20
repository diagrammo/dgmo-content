```dgmo
ring Captain's Sphere of Influence

fill-solid

Captain red
  Final word on heading and plunder,
  keeper of the ship's charter.

Quartermaster description: "Second-in-command, arbitrates disputes and divvies the booty"

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

Concentric rings radiating from a core, each layer a widening sphere of scope, reach, or containment — for nested-context models where distance from the center is the meaning. Source order reads core-out: the first layer in the file is the innermost element (rendered as a filled disc), the last layer is the outermost ring. Min 2 layers, max 15. **Band widths are not proportional to anything.** Every band is cut to the same thickness regardless of what the layer represents, which means the outer bands cover far more area than the inner ones purely because they sit further out. Readers trained on doughnut charts will read the widest-looking band as the largest share; it encodes nothing. If your layers have sizes to compare, use [`treemap`](chart-treemap.md) or [`pie`](chart-pie.md).

## When to use

- **`ring`** — each layer *contains* the one inside it, and you're naming levels of scope rather than quantities.
- **[`pie`](chart-pie.md)** — the slices are *siblings* splitting one total, and share is the question.
- **[`treemap`](chart-treemap.md)** — the pieces have values you want sized and compared.
- **[`pyramid`](chart-pyramid.md)** — the layers stack bottom-to-top with a base supporting the rest, rather than nesting core-outward.

## Syntax

```
ring Title

// optional directive
[fill-solid]

// innermost first
LayerLabel
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

Color uses the trailing-token form. Reach for `color: <name>` only when another key (`description: …`) rides along on the same line.

### Layer Metadata

Same-line metadata uses `key: value` pairs after the layer label:

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

If both a same-line `description: text` and indented lines exist, they concatenate (same-line first, then indented):

```
Quartermaster description: Second-in-command, divvies the booty
```

## Directives

| Directive | Effect |
|-----------|--------|
| `fill-solid` | Render rings with the full intent color instead of the default 25% tint. |

`inverted` is **not** valid on ring diagrams (rings are rotationally symmetric — visual inversion is meaningless). Using it emits an error-severity diagnostic and the line is discarded.

## Color Validation

Unknown color names emit an error-severity diagnostic with a "Did you mean…?" hint, and the layer falls back to its series color so the chart still renders. Allowed colors: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`.

## Rendering

- Each ring is its own annular shape — concentric bands don't overlap.
- A 1px contrast stroke separates adjacent rings so similar tints don't blur together.
- Labels sit inside their ring band (innermost label centered on the disc, outer-ring labels stacked along the band's vertical midline above center).
- The side description list shows one entry per layer with a colored accent bar matching the ring.
- When ring band thickness would force the label below the readable floor, in-band labels are skipped and the side list shows the layer names instead.
- Band thickness is the outer radius divided by the layer count — identical for every ring, and unrelated to any value.

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

`inverted` is not accepted — see Directives above.

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Complete Example

```dgmo
ring OSI Layered Model

fill-solid

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

## Common mistakes

- **The bands are containment, not proportion.** Ring widths are not area-proportional to anything, so a reader trained on doughnut charts will read a share that is not there. Use [`pie`](chart-pie.md) or [`treemap`](chart-treemap.md) when magnitude is the point.
- **A trailing `//` note swallows the color token.** The entire line becomes the label — color and all — with no diagnostic at all. Put notes on their own line above.
- **Descriptions belong indented under their ring.** At the wrong depth they attach to the ring above instead, and the file still validates.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`pie`](chart-pie.md) · [`treemap`](chart-treemap.md) · [`pyramid`](chart-pyramid.md)
- **Then:** [Colors & palettes](colors.md)
