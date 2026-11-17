```dgmo
ownership Dread Fleet group structure
// A cross-holding inside the group (10% -> ...) and owners outside it.
tag Jurisdiction as j
  Tortuga blue
  Nassau  green
  Cayman  orange
  Havana  purple
  Lisbon  red

Dread Fleet Holdings  j: Tortuga
  Quoted on the Tortuga exchange
  100% Revenge Shipping Ltd  j: Tortuga
    Owns the flagship
    60% Plunder Partners LLP  j: Nassau, type: partnership
      Holds the treasure maps
    10% -> Serpent Salvage Co
  100% Cayman Cove Trading  j: Cayman
    Offshore holding company
    90% Serpent Salvage Co  j: Nassau
      Wreck recovery
    75% Havana Rum Imports  j: Havana
      Distillery and docks

Gold Coast Fund LP  j: Cayman, type: partnership
  Outside investor
  40% -> Plunder Partners LLP

Calico Rackham  j: Lisbon, type: individual
  Co-founder, Havana Rum Imports
  25% -> Havana Rum Imports
```

## Overview

An ownership chart draws a **corporate entity structure** top down: the parent, its subsidiaries and the owners outside the group. Every line carries the stake (`60%`) and every box carries its jurisdiction, so the legal, tax and deal questions can be read straight off the page. Write the group as an indented tree, one entity per line, with the stake first. Lines never cross where the layout can keep them apart.

Hover an entity and its chain of owners stays lit. Its card shows **effective ownership**: each ultimate owner with the total stake summed over every path (`90% via Cayman Cove Trading + 10% via Revenge Shipping Ltd = 100%`).

## When to use

- **`ownership`** — the question is who owns what, at what percentage, and in which jurisdiction. An entity can have several owners, and owners can sit outside the group.
- **[`org`](chart-org.md)** — people report to one boss. An org chart has no stakes and every node has exactly one parent.
- **[`family`](chart-family.md)** — the links are marriage and descent, not shareholdings.
- **[`treemap`](chart-treemap.md)** — you want the size of each share as area, not the legal chain of who holds what.

## Syntax

```
ownership Chart Title
tag Jurisdiction as j
  Tortuga blue
  Nassau  green

Parent Co  j: Tortuga
  Free description line
  100% Subsidiary Ltd  j: Nassau
    80% Grandchild Inc  j: Nassau
  25% -> Other Entity

Outside Owner LP  j: Nassau, type: partnership
  40% -> Subsidiary Ltd
```

- **Entity line** — a name, then optional same-line metadata (`j: Tortuga, type: trust`). Declare each name once.
- **The group** — the first top-level entity that declares a subsidiary is the top of the group. Every other top-level entity is **outside the group** (a fund, a person). It draws outline-only and dashed, and so do its lines.
- **`NN% Name`** under an entity declares a subsidiary at that stake. Decimals are fine (`33.3%`).
- **`NN% -> Name`** adds an owner link to an entity declared elsewhere: a cross-holding inside the tree, or an outside owner's stake. The name may come later in the file.
- **Any other indented line** is description. The first one shows on the box in italics; the card shows all of them. Do not use square brackets.

## Entity types

`type:` picks the shape.

| Type | Shape |
| ---- | ----- |
| `corporation` (default) | rounded rectangle |
| `partnership` | triangle |
| `individual` | oval |
| `trust` | rectangle with a double outline |

When a chart uses a shape other than the default, a key to the shapes appears under the legend.

```dgmo
ownership Bonny family holdings
fill-solid
tag Jurisdiction as j
  Tortuga blue
  Jersey  teal
  Nassau  green

Bonny Family Trust  j: Jersey, type: trust
  Discretionary trust, settled 1718
  Held for the benefit of the Bonny crew's descendants.
  100% Bonny Holdings Ltd  j: Tortuga
    Family investment company
    100% Bonny Docks Ltd  j: Tortuga
      Three deep-water berths
    51% Bonny Rum Ltd  j: Nassau
      Rum distillery and tavern chain
  49.5% Bonny Ventures LP  j: Tortuga, type: partnership
    Expedition fund
    20% -> Bonny Rum Ltd

Anne Bonny  j: Tortuga, type: individual
  Managing partner
  0.5% -> Bonny Ventures LP
```

## Options

| Option | Effect |
| ------ | ------ |
| `tag <Group> as <alias>` / `active-tag` | Colour the boxes by a tag group; jurisdiction is the usual first group. Adds the legend |
| `fill-tint`, `fill-solid`, `fill-outline` | How the boxes are filled. Outside entities are always outline-only and dashed |
| `no-legend` | Hide the legend |
| `subtitle`, `source`, `footnote` | The chart frame |
| `palette` | Draw in a built-in palette |

Colors come from the active palette — see [Colors](colors.md).

## Common mistakes

- **Owners of one entity must add up to 100% or less.** More than 100% is an error (`E_OWNERSHIP_OVER_100`). When the direct stakes come to less than 100%, the card says how much is not shown.
- **`NN% -> Name` points at an entity that exists.** A misspelled name is an error, and the message suggests the nearest one.
- **An outside owner goes at the start of a line, after the group.** Indent it under the group and it becomes a subsidiary.
- **Circular ownership draws, with a warning** (`W_OWNERSHIP_CYCLE`); effective ownership stops at the circle. Two lines the structure forces to cross also warn (`W_OWNERSHIP_FORCED_CROSSING`).
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`org`](chart-org.md) · [`family`](chart-family.md) · [`treemap`](chart-treemap.md)
- **Then:** [Colors & palettes](colors.md)
