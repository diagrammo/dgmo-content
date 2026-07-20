```dgmo
sankey Rum Supply Chain of the Caribbean

Sugar Plantations green
  Tortuga Distillery orange 3000
  Nassau Distillery orange 2500
  Kingston Distillery orange 2000

Tortuga Distillery
  Pirate Taverns red 2000
  Ship Provisions teal 1000

Nassau Distillery
  Pirate Taverns 1500
  Black Market purple 1000

Kingston Distillery
  Royal Navy blue 1200
  Pirate Taverns 800

Pirate Taverns
  Crew Morale 3500
  Bar Fights 800 red

Ship Provisions -> Long Voyages 1000
```

## Overview

A sankey traces a quantity as flowing bands whose width encodes volume, following where a total goes as it splits and merges across stages. Reach for it when you want to answer "where does the money go" or "where does the energy end up" — not just what the pieces are, but how they move from source to destination. A sankey encodes **conserved flow**: what enters a node leaves it.

## When to use

- **`sankey`** — a measurable quantity moves through stages, splitting and merging, and the amount is conserved along the way.
- **[`arc`](chart-arc.md)** — you only want to show who is linked to whom, maybe with a strength; links can go both ways or form loops.
- **[`treemap`](chart-treemap.md)** — you want to show what the total *is*, broken into nested parts, not where it *goes*.
- **[`funnel`](chart-funnel.md)** — everything flows down one single path with no branching.
- **[`infra`](chart-infra.md)** — the nodes are components handling traffic and you want the tool to compute load and latency.

If the quantity isn't conserved — affinity, correlation, co-occurrence, "these two things are related" — use [`arc`](chart-arc.md). A sankey applied to non-conserved relationships fabricates conservation, and any mismatch between a node's inbound and outbound widths reads as real data loss that never happened.

## Syntax

### Arrow syntax

```
sankey Chart Title

Source -> Target value
```

### Indentation syntax

```
sankey

Source
  Target A 300
  Target B 200

Target A
  Sub-target 150
```

Indent targets under a bare source label. Both syntaxes can be mixed in the same diagram.

### Undirected links

Write `--` instead of `->` for a link with no direction — the band is drawn without asserting which way the quantity moved:

```
Source -- Target value
```

### Aliases

Long node names get unwieldy when they repeat. Add `as <alias>` the first time a node appears, then use the short handle everywhere after:

```dgmo
sankey Rum Ledger

Sugar Plantations as sp -> Tortuga Distillery as td 3000
td -> Pirate Taverns 2000
td -> Ship Provisions 1000
```

The alias is a shorthand for authoring only — the node still renders under its full name.

## Color Annotations

### Node colors

Append a color name (lowercase) after a node name to color that node:

```
Revenue green
  Costs red 600
  Profit blue 400

// or with arrows
Revenue green -> Costs red 600
```

Uncolored nodes use the palette's default series colors.

### Link colors

Append a color name (lowercase) after the value to color a specific link:

```
Revenue
  Costs 600 orange

// or with arrows
Revenue -> Costs 600 orange
```

Uncolored links use a gradient between their source and target node colors.

## Metadata Keys

| Key     | Description      | Required |
| ------- | ---------------- | -------- |
| `chart` | Must be `sankey` | Yes      |

## Data Format

Each data line defines a flow from source to target with a numeric value:

```
Sugar Plantations -> Distillery 3000
Distillery -> Taverns 2000
Distillery -> Ship Provisions 1000
```

Nodes are created automatically from the source and target names. The same node can appear as both a source and a target to create multi-level flows.

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

Sankey also accepts the two **emphasis** directives, which set what is foreground and what is background:

| Directive | Effect |
| --------- | ------ |
| `dim <Name>` | The named nodes and their flows recede. Everything else is untouched. |
| `highlight <Name>` | The named node's whole flow stays lit — everything upstream that feeds it and everything downstream it feeds. The rest of the chart recedes. |

Both are written on their own line, anywhere in the diagram. They are mutually exclusive; if you write both, the last one wins. List several names with commas — `dim Spoilage, Evaporation`. A name with a space in it needs no comma: `dim Ship Provisions` is one node, not two.

### Making a flow recede

Every supply chain has a branch you have to show but do not want to argue about — spoilage, waste, returns. Deleting it makes the numbers stop adding up. `dim` keeps it in the picture and takes it out of the argument:

```dgmo
sankey Rum Supply Chain

Sugar Plantations green
  Tortuga Distillery 3000
  Nassau Distillery 2500
Tortuga Distillery
  Barrel Aging 2000
  Spoilage 1000
Nassau Distillery
  Barrel Aging 1800
  Spoilage 700
dim Spoilage
```

Both spoilage ribbons and the Spoilage node fade back; the aging flow keeps its full weight.

Dimming reduces opacity — it never repaints. A red flow that recedes is still red, so emphasis stacks on top of your colors instead of spending them. And because the faded opacity is baked into the output, PNG and SVG exports look exactly like the preview; nothing here depends on hover or a stylesheet.

The other direction is `highlight`, for when the story is one path rather than one exception:

```dgmo
sankey Rum Supply Chain

Sugar Plantations green
  Tortuga Distillery 3000
  Nassau Distillery 2500
Tortuga Distillery
  Barrel Aging 2000
  Spoilage 1000
highlight Barrel Aging
```

`highlight Barrel Aging` keeps the plantations and the distilleries lit too, because they are what feeds it. Highlighting a node without its sources would erase the explanation you highlighted it for.

A name that matches no node is reported as a warning and ignored — a typo leaves the chart un-emphasized rather than blanking it.

## Common mistakes

- **Sankey encodes conserved flow** — what enters a node leaves it. On affinity, correlation, or co-occurrence there is nothing to conserve, and mismatched widths read as data loss that is not there. Use [`arc`](chart-arc.md) for non-conserved relationships.
- **A trailing `//` note deletes the link silently.** No diagnostic names the line; the link is simply absent. If a flow you wrote is not in the picture, check that line for an inline comment.
- **An unrecognized color token is reported by name and line.** Read the warning rather than hunting for the missing link — DGMO accepts only its named colors.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`arc`](chart-arc.md) · [`treemap`](chart-treemap.md) · [`funnel`](chart-funnel.md) · [`infra`](chart-infra.md)
- **Then:** [Colors & palettes](colors.md)
