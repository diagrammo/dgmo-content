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

Treemaps show a hierarchy's proportions as nested rectangles — each leaf's area is its value, and parents auto-sum their children. They're the fastest way to read "what's big and what's small" across a whole tree at once: budgets, cloud bills, disk usage, portfolios, headcount, taxonomies. Reach for one when your categories contain sub-categories you also want sized, and the breakdown of the total is the question. The layout is squarified, so cells keep readable aspect ratios instead of thin slivers.

## When to use

- **`treemap`** — a hierarchy where the leaves have numbers, and both *containment* and *size* matter.
- **[`pie`](chart-pie.md)** — one flat, single-level list with no hierarchy, where the reader should read exact shares of a whole.
- **[`bar`](chart-bar.md)** — one flat list of a handful of items that need to be read precisely. Rectangle areas are harder to compare than bar lengths.
- **[`sankey`](chart-sankey.md)** — the money *moves* from source to destination rather than simply being split up.
- **[`ring`](chart-ring.md)** — the layers are levels of scope with no meaningful size attached.
- **[`mindmap`](chart-mindmap.md)** — the leaves are just labels, with no values to size them by.
- **[`org`](chart-org.md)** — the nesting is about *authority* — who reports to whom — not size and containment.
- **[`sitemap`](chart-sitemap.md)** — the nesting is navigation between real pages, not proportion of a total.

## Syntax

```
treemap Title with units, e.g. "Cloud Spend ($)"

Parent
  // a bare trailing number is the leaf's size
  Leaf 320
  Leaf 180
Another Parent
  Leaf 110
```

The first line declares the chart type and an optional title. **Put units in the title** (`Cloud Spend ($)`) — there is no separate format or currency directive.

## Hierarchy & Value

- **Indentation sets the hierarchy** (the mind-map / org model). Nest as deep as you like.
- A **bare trailing number on a leaf is its size** (`Platform 320`). Thousands separators are fine — `1,240,000` and `1_240_000` both read as 1240000. To keep a label that ends in a digit, quote it: `"Region 2" 400`.
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

A diagram can carry **both** tags and heat. The resting color mode resolves **heat → tag → branch** — a value ramp outranks a tag group when both are present. In the desktop app the legend offers a switcher to recolor live between them; `active-tag <Group|HeatLabel>` pins the resting dimension in the source so the choice travels with the file.

## Directives

| Directive | Effect |
|-----------|--------|
| `heat <Label> [low] [high]` | Name (and optionally color) the value ramp; pairs with the `heat:` key. |
| `depth N` | Render N levels deep; deeper subtrees collapse to a drillable solid block. A render budget, not a data limit — the full tree is always drillable, and static export renders it whole. |
| `active-tag <Group\|HeatLabel\|none>` | Pin which dimension colors the tiles at rest — a tag group name, the `heat` label to force the ramp, or `none` to suppress tinting. Defaults to heat when present, else the first tag group. |
| `no-value` | Hide value labels. |
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

## Radial mode — sunburst / hierarchical pie

Add a bare `radial` line and the same hierarchy renders as a **sunburst** — a hierarchical, multi-ring pie. The center disc is the whole (the chart title + grand total), the first ring is your top-level groups, and each outer ring breaks a group into its parts. It's the familiar "slices of a circle" read of the exact same data a treemap shows as rectangles:

```dgmo
treemap Plunder Spend ($k)
radial

tag Crew as t
  Deck blue
  Guns orange
  Stores green

Sailing & Rigging t: Deck
  Rigging 320
  Helm 180
  Lookout 140
Cannon Battery t: Guns
  Powder 90
  Shot 130
Provisions t: Stores
  Rum 110
  Hardtack 70
```

Everything carries over: tags, the `heat` ramp, `active-tag`, and `no-value` / `no-percent` / `no-legend`. `no-headers` has no effect (a sunburst has no header bars). An arc's **angle** is its share of the whole (`value ÷ grand total`); the **radius** is just depth and carries no magnitude — so slices are laid out in **source order** (not value-sorted), and very thin arcs drop their inline label to avoid clutter.

**When to reach for radial vs. rectangular:** use the sunburst for **shallow trees (≈3 levels or fewer)** and when you want the "part of a whole" circle. For **deep trees or precise magnitude comparison, prefer the rectangular treemap** — because radius carries no magnitude, deep sunbursts thin out and the eye over-weights the outer rings. For flat, single-level data with no hierarchy, use the [pie chart](chart-pie.md) instead.

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

## Appearance

Alongside the treemap-specific `no-*` opt-outs, every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Indent a leaf one step too deep and its sibling becomes a branch.** A branch's size is the sum of its children, so the sibling's own number stops counting and the parent total silently shrinks. The warning says the trailing number is ignored — that is the symptom, and a misplaced indent is usually the cause.
- **A trailing `//` note leaves the leaf with no value**, and a valueless leaf renders at zero size — present in the model, invisible on screen. The warning quotes the number back at you because it read the whole line, comment included, as one long label.
- **In same-line metadata, a comma separates pairs.** `heat: 1,200` reads as a heat of 1. Use `heat: 1_200`. Grouped numbers are fine in ordinary values.
- **Adding a heat column recolors the whole chart.** Heat outranks tags and branch inheritance, so introducing it overrides colors you set elsewhere.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`pie`](chart-pie.md) · [`bar`](chart-bar.md) · [`sankey`](chart-sankey.md) · [`ring`](chart-ring.md) · [`mindmap`](chart-mindmap.md) · [`org`](chart-org.md) · [`sitemap`](chart-sitemap.md)
- **Then:** [Colors & palettes](colors.md)
