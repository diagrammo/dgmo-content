```dgmo
treemap Annual Budget ($M)

Engineering
  Platform 4.2
  Product Eng 3.8
  Infrastructure 2.1
  Security 1.4
Sales & Marketing
  Field Sales 3.1
  Demand Gen 1.9
  Brand 0.8
Operations
  Customer Support 1.6
  IT 0.9
  Facilities 1.2
G&A
  Finance 0.7
  Legal 0.6
  People 1.1
```

## Overview

Treemaps show a hierarchy's proportions as nested rectangles — each leaf's area is its value, and parents auto-sum their children. They're the fastest way to read "what's big and what's small" across a whole tree at once: budgets, cloud bills, disk usage, portfolios, headcount, taxonomies. The layout is squarified, so cells keep readable aspect ratios instead of thin slivers.

## Syntax

```
treemap Title with units, e.g. "Cloud Spend ($)"

Parent
  Leaf 320          // a bare trailing number is the leaf's size
  Leaf 180
Another Parent
  Leaf 110
```

The first line declares the chart type and an optional title. **Put units in the title** (`Cloud Spend ($)`) — there is no separate format or currency directive.

## Hierarchy & Value

- **Indentation sets the hierarchy** (the mind-map / org model). Nest as deep as you like.
- A **bare trailing number on a leaf is its size** (`Platform 320`). No thousands commas; `1_000` is fine.
- **Parents auto-sum** their descendants — a number on a branch line is ignored (with a warning); the sum always wins.
- A leaf with **no value** is treated as 0 (and warns); a **negative** value is an error.

To keep a label that genuinely ends in a digit, quote it: `"Region 5"` → label `Region 5`, no value.

Nesting works to any depth — a cloud bill broken down by service and sub-service:

```dgmo
treemap AWS Bill ($/mo)

Compute
  EC2
    On-Demand 4200
    Spot 1800
    Savings Plans 3100
  Lambda 940
  Fargate 1250
Storage
  S3 2600
  EBS 1400
  Glacier 320
Database
  RDS 3100
  DynamoDB 1450
  ElastiCache 680
Networking
  Data Transfer 2200
  CloudFront 1350
  Route 53 180
```

## Tags — color by category

Declare a `tag` group before the content and apply it inline; children inherit a tagged ancestor's value, so you tag the group once and the whole subtree picks up its color.

```dgmo
treemap Q3 Budget ($k)

tag Team as t
  Eng blue
  Sales green
  Ops orange
  G&A purple

Engineering t: Eng
  Platform 320
  Mobile 180
  Data 140
Go-to-Market t: Sales
  Ads 90
  Field Sales 130
  Events 40
Operations t: Ops
  Cloud 110
  Support 70
G&A t: G&A
  Finance 35
  People 45
```

## Heat — color by value

A per-node `heat:` metric is a second numeric channel (distinct from size — negatives and floats are fine) that drives a value ramp, named with a `heat <Label> [low] [high]` directive. Here size = position, color = the day's move, so a glance shows both *how big* a holding is and *how it's doing*:

```dgmo
treemap Portfolio — today

heat Day change %

Tech
  AAPL 180 heat: -2.4
  NVDA 220 heat: 4.1
  MSFT 160 heat: 0.8
  GOOG 95 heat: 1.6
Energy
  XOM 60 heat: -1.2
  CVX 45 heat: -0.6
Financials
  JPM 70 heat: 1.9
  BAC 40 heat: -3.1
Crypto
  BTC 90 heat: 6.7
  ETH 55 heat: 3.2
```

Ramp colors are optional and **data-aware**: signed data (crossing 0) gets a diverging `red · neutral · green` ramp with the midpoint pinned at 0; one-sign data gets a sequential `neutral · accent` ramp. Override with `heat <Label> low high` (named palette colors only — hex is rejected).

A diagram can carry **both** tags and heat. The default color mode resolves **tag → heat → branch**; in the desktop app the legend offers a switcher to recolor live between them.

## Directives

| Directive | Effect |
|-----------|--------|
| `heat <Label> [low] [high]` | Name (and optionally color) the value ramp; pairs with the `heat:` key. |
| `depth N` | Render N levels deep; deeper subtrees collapse to a drillable solid block. A render budget, not a data limit — the full tree is always drillable, and static export renders it whole. |
| `no-values` | Hide value labels. |
| `no-percent` | Hide percentage labels. |
| `no-headers` | Hide parent header bars. |
| `no-legend` | Hide the legend. |

Everything is on by default; subtract with `no-*`. Numbers auto-compact (1.2M, 940k).

`depth` keeps a deep tree readable — collapse the leaves into solid blocks you can drill into:

```dgmo
treemap Monorepo Size (KB)

depth 2

apps
  web 4200
  mobile 3100
  admin 1400
packages
  ui 1800
  core 2600
  utils 720
services
  api 3300
  worker 1500
  scheduler 640
```

## Color Modes

The default mode is resolved from the source — **tags declared → tag**; else **any heat present → heat**; else **branch** (each top-level branch a distinct hue, tinted with depth). The desktop app adds a runtime tag/heat/branch switcher in the legend — live preview only, it never edits the source.

## Interactivity

In the desktop app, containers carry a focus icon and are **drillable** — click anywhere in a region to zoom into it (its box stays as context), and click its header again to zoom back out. A drilled branch keeps the color it had when expanded. Static export renders the whole tree.

## Complete Example — tags + heat together

Size = effort, color (by default) = squad; flip the legend to the heat ramp to see which work is ahead of or behind plan:

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
