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

Stacks layers from a narrow apex to a wide base, encoding rank, foundation, or tier. Reach for it when you're naming *levels* that all exist at once and each rests on the one below: Maslow's needs, a maturity model, the DIKW hierarchy, a skills ladder. Source order reads apex-first — the first layer in the file is the narrowest (visual top), the last is the widest (visual bottom). **A pyramid asserts simultaneous stacked levels, not sequential loss.** Nothing drops out between layers; if each stage *loses* people from the one above, that's attrition and you want [`funnel`](chart-funnel.md).

## When to use

- **`pyramid`** — layers *rest on* each other and are all present at once; the base supports everything above it.
- **[`funnel`](chart-funnel.md)** — each stage *loses* volume from the one above and the drop-off is the finding. Drawing attrition as a pyramid, or a hierarchy as a funnel, reverses the claim: Maslow as a funnel says people drop out of having needs.
- **[`ring`](chart-ring.md)** — layers nest core-outward, each surrounding the last, rather than stacking bottom-to-top.
- **[`org`](chart-org.md)** — you're naming *people or units* reporting upward, not conceptual levels.
- **[`class`](chart-class.md)** — the hierarchy is code inheritance rather than conceptual tiers.

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

Color uses the trailing-token form (`Executives purple`). Reach for the explicit
`color: <name>` key only when another metadata key rides along on the same line.

### Layer Metadata

Same-line metadata uses `key: value` pairs after the layer label:

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `color` | palette name | auto-assigned | Layer color (pair with another key — for color-only, use the trailing-token form) |
| `description` | string | — | One-liner shown beside the layer |

```
Wisdom color: purple, description: Ethical judgment, acting with insight
```

### Descriptions

Indented lines under a layer add description text. Markdown inline formatting is supported (`**bold**`, `*italic*`, `` `code` ``, `[links](url)`). Bullet points with `- item` render as `• item`.

```
Wisdom purple
  Ethical judgment, acting with insight.
  - Knowing *why* something matters
  - Acting with long-term perspective
```

If both a same-line `description: text` and indented lines exist, they concatenate (same-line first, then indented).

## Directives

| Directive | Effect |
|-----------|--------|
| `inverted` | Flip the apex to the bottom, so the widest layer is on top and the pyramid narrows downward. Source order is preserved — the first layer is always the visual top. |

`inverted` changes the *orientation*, not the meaning: the layers still all coexist
and still rest on one another. It is for genuine widest-first structures, not for
turning a pyramid into a drop-off funnel.

```dgmo
pyramid The Inverted Pyramid — News Writing
inverted

The Lede blue
  Who, what, where, when — the whole story in one sentence.

Key Details cyan
  Supporting facts a reader needs to trust the lede.

Background green
  Context, history, and quotes.

Trailing Detail orange
  Material an editor can cut from the bottom without losing the story.
```

## Overflow Handling

When descriptions don't fit a layer's band, the renderer automatically:

- **Wraps** text at the column edge so nothing leaves the canvas
- **Truncates** with "…" when content exceeds the available lines
- **Alternates** descriptions left ↔ right when a single column can't hold them
- **Reveals** the full description when a layer is highlighted (in-app), hiding siblings so it has room

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

## Common mistakes

- **Pyramid asserts simultaneous levels resting on a base.** [`funnel`](chart-funnel.md) asserts sequential loss. Maslow drawn as a funnel says people drop out of having needs.
- **A trailing `//` note swallows the color token** and welds the whole line into the label, silently. Put notes on their own line above.
- **Level descriptions belong indented under their level.** At the wrong depth they attach to the level above.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`funnel`](chart-funnel.md) · [`ring`](chart-ring.md) · [`org`](chart-org.md) · [`class`](chart-class.md)
- **Then:** [Colors & palettes](colors.md)
