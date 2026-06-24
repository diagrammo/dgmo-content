```dgmo
treemap Cloud Spend ($)

Compute
  EC2 1240000
  Lambda 180000
  GPU 640000
Storage
  S3 420000
  EBS 210000
Network
  Egress 380000
  CDN 95000
```

## Overview

Treemaps show a hierarchy's proportions as nested rectangles — each leaf's area is its value, and parents auto-sum their children. They're the canonical way to read "what's big and what's small" at a glance: budgets, disk usage, portfolios, headcount, taxonomies. The layout is squarified, so cells keep readable aspect ratios.

## Syntax

```
treemap Title with units, e.g. "Cloud Spend ($)"

Parent
  Leaf 320          // a bare trailing number is the leaf's size
  Leaf 180
Another Parent
  Leaf 110
```

The first line declares the chart type and an optional title. **Put units in the title** (`Cloud Spend ($)`) — there is no format or currency directive.

## Hierarchy & Value

- **Indentation sets the hierarchy** (the mind-map / org model).
- A **bare trailing number on a leaf is its size** (`Platform 320`). No thousands commas; `1_000` is fine.
- **Parents auto-sum** their descendants. A trailing number on a *branch* line is ignored (the auto-sum always wins) with a warning.
- A leaf with **no value** is treated as 0 (and warns); a **negative** value is an error.

To keep a label that genuinely ends in a digit, quote it: `"Region 5"` → label `Region 5`, no value.

## Tags (color by category)

Declare a `tag` group before the content and apply it inline; children inherit a tagged ancestor's value.

```dgmo
treemap Q3 Budget ($k)

tag Team as t
  Eng blue
  Sales green
  Ops orange

Engineering t: Eng
  Platform 320
  Mobile 180
Go-to-Market t: Sales
  Ads 90
  Events 40
Operations t: Ops
  Cloud 110
  Support 70
```

## Heat (color by value)

A per-node `heat:` metric is a second numeric channel (distinct from size — negatives and floats are fine) that drives a value ramp, named with a `heat <Label> [low] [high]` directive.

```dgmo
treemap Portfolio — today

heat Day change %

AAPL 180 heat: -2.4
NVDA 220 heat: 4.1
MSFT 160 heat: 0.8
Energy
  XOM 60 heat: -1.2
  CVX 45 heat: -0.6
```

Ramp colors are optional and data-aware: signed data (crossing 0) gets a diverging `red · neutral · green` ramp with the midpoint pinned at 0; one-sign data gets a sequential `neutral · accent` ramp. Named palette colors only — hex is rejected.

A diagram can carry **both** tags and heat. The default color mode resolves **tag → heat → branch**; in the app, the legend offers a switcher to recolor live between them.

## Directives

| Directive | Effect |
|-----------|--------|
| `heat <Label> [low] [high]` | Name (and optionally color) the value ramp; pairs with the `heat:` key. |
| `depth N` | Render N levels; deeper subtrees collapse to a drillable solid block. A render budget, not a data limit — the full tree is always drillable and static export renders it whole. |
| `no-values` | Hide value labels. |
| `no-percent` | Hide percentage labels. |
| `no-headers` | Hide parent header bars. |
| `no-legend` | Hide the legend. |

Everything is on by default; subtract with `no-*`. Numbers auto-compact (1.2M, 940k).

## Color Modes

The default mode is resolved from the source — **tags declared → tag**; else **any heat present → heat**; else **branch** (each top-level branch a distinct hue, tinted with depth). The desktop app adds a runtime tag/heat/branch switcher in the legend — live preview only, it never edits the source.

## Interactivity

In the desktop app, containers carry a focus icon and are **drillable** — click anywhere in a region to zoom into it (its box stays as context), and click its header again to zoom back out. A drilled branch keeps the color it had when expanded. Static export renders the whole tree.

## Complete Example

```dgmo
treemap Engineering Portfolio (effort, pts)

tag Squad as sq
  Platform blue
  Product green
  Infra orange

heat Δ vs plan %

Platform sq: Platform
  API Gateway 120 heat: 4.0
  Auth 80 heat: -6.5
  Service Mesh 60 heat: 1.2
Product sq: Product
  Onboarding 140 heat: 8.1
  Checkout 110 heat: -3.4
  Search 70 heat: 0.5
Infra sq: Infra
  CI Pipeline 90 heat: -1.8
  Observability 75 heat: 5.6
  Cost Controls 50 heat: 2.3
```
