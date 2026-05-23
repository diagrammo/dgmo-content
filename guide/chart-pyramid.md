# Pyramid Diagram

```dgmo
pyramid Maslow's Hierarchy of Needs

Self-Actualization purple
  Morality, creativity, acceptance of facts.

Esteem blue
  Respect, recognition, confidence.

Love & Belonging green
  Friendship, intimacy, family.

Safety yellow
  Security, employment, health.

Physiological orange
  Food, water, warmth, rest.
```

## Overview

Pyramid diagrams show a hierarchy of stacked layers. Each layer gets a colored band with a label and an optional description. Source order reads apex-first — the first layer in the file is the narrowest (visual top), the last is the widest (visual bottom). Use `inverted` to flip into a funnel orientation.

## Syntax

```
pyramid Title

LayerLabel
LayerLabel blue
LayerLabel green
  Indented description
```

The first line declares the chart type and an optional title. Each non-indented, non-directive line declares one layer. At least two layers are required.

## Layers

```
pyramid Roles

Executives purple
Managers blue
Individual Contributors green
```

Color uses the trailing-token form. Reach for `| color: <name>` only when another pipe key (`description: …`) rides along on the same line.

### Layer Pipe Metadata

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `color` | palette name | auto-assigned | Layer color (pair with another key — for color-only, use the trailing-token form) |
| `description` | string | — | One-liner shown beside the layer |

### Descriptions

Indented lines under a layer add description text. Markdown inline formatting is supported (`**bold**`, `*italic*`, `` `code` ``, `[links](url)`). Bullet points with `- item` render as `• item`.

```
Wisdom purple
  Ethical judgment, acting with insight.
  - Knowing *why* something matters
  - Acting with long-term perspective
```

If both `| description: text` and indented lines exist, they concatenate (pipe first, then indented).

## Directives

| Directive | Effect |
|-----------|--------|
| `inverted` | Flip apex to the bottom (funnel orientation). Source order is preserved — the first layer is always the visual top. |

```
pyramid Acquisition Funnel

inverted

Visitors blue
Signups cyan
Activated green
Paid orange
```

## Overflow Handling

When descriptions don't fit a layer's band, the renderer automatically:

- **Wraps** text at the column edge so nothing leaves the canvas
- **Truncates** with "…" when content exceeds the available lines
- **Alternates** descriptions left ↔ right when a single column can't hold them
- **Reveals** the full description when a layer is highlighted (in-app), hiding siblings so it has room

## Complete Example

```dgmo
pyramid The DIKW Pyramid

Wisdom purple
  Ethical judgment, acting with insight — knowing *why*.

Knowledge blue
  Synthesized information — knowing *how*.

Information green
  Processed data with context — knowing *what*.

Data yellow
  Raw facts and measurements — unprocessed signals.
```
