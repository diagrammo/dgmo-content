```dgmo
boxes-and-lines Pirate Software

tag Status as s
  Done green
  Doing yellow
  Todo red
  NA gray default

MobileApp s:Todo
  -> API

WebSite s:Doing
  -> API

[Backend]
  API s:Doing
    -> DB
    -> AuthVendor

  DB s:Done

AuthVendor
```

## Overview

Boxes and lines is a general-purpose node-edge diagram for modeling systems, architectures, and relationships. Nodes are connected with labeled arrows, organized into nested groups, and annotated with color-coded tags.

Unlike more specialized diagram types (infra for traffic simulation, C4 for system context), boxes-and-lines is intentionally flexible. Node shapes are inferred from names — a node called "UserDB" renders as a cylinder, "Redis" as a diamond, "OrderQueue" as a hexagon.

Reach for it for system and component overviews, status-tagged architecture sketches, and quick wiring when you don't want to place anything by hand. The layout is computed for you — **box position carries no meaning**, so don't read adjacency into it.

## When to use

- **`boxes-and-lines`** — you want to show which things exist and which talk to which, and you want the tool to arrange the boxes for you.
- [`block`](chart-block.md) — *where* each box sits is meaning you control. Position here is auto-layout and carries none; swapping the two either invents adjacency semantics or throws yours away.
- [`sketch`](chart-sketch.md) — you'd rather drag shapes around on a canvas than write the diagram out as text.
- [`c4`](chart-c4.md) — you need to zoom from "the whole system" into "inside this service." C4 also asserts a specific abstraction level, so mixing levels there is worse than an untyped diagram; `boxes-and-lines` is right when one flat picture is enough.
- [`infra`](chart-infra.md) — you want the tool to *calculate* traffic, latency, and downstream failure. `boxes-and-lines` only draws what you write; it computes nothing.
- [`flowchart`](chart-flowchart.md) — the boxes are *steps that happen* rather than *things that exist*.
- [`class`](chart-class.md) — the boxes need to list fields and methods, not just names.
- [`er`](chart-er.md) — you need primary keys and how many rows link to how many.
- [`arc`](chart-arc.md) — there are so many links that the boxes-and-arrows turn into spaghetti and you mainly want to see who is most connected.

## Declaration

```
boxes-and-lines Optional Title
```

The first line declares the diagram type and optional title.

## Nodes

Nodes are created explicitly or implicitly when referenced in edges.

### Explicit nodes

```
API Gateway description: Main entry point
UserDB
```

A name on its own line creates a node. Same-line metadata is optional.

### Implicit nodes

```
API Gateway -routes-> UserService
```

If `UserService` hasn't been declared yet, it's created automatically from the edge.

### Same-line metadata

```
API Gateway t: Backend, description: Main entry point
```

Metadata uses `key: value` pairs separated by commas. Common keys:

- Tag aliases (e.g., `t: Backend` where `t` is a tag alias)
- `description` — shown as a subtitle on the node

### Shape inference

Node shapes are inferred from names:

| Name contains                                  | Shape             |
| ---------------------------------------------- | ----------------- |
| `DB`, `Database`, `Postgres`, `MySQL`, `Mongo` | Cylinder          |
| `Cache`, `Redis`, `Memcached`                  | Diamond           |
| `Queue`, `Kafka`, `SQS`, `EventBus`            | Hexagon           |
| `Gateway`, `LB`, `Proxy`, `Router`             | Wide rectangle    |
| `User`, `Actor`, `Client`, `Admin`             | Rounded rectangle |
| `External`, `Stripe`, `Twilio`                 | Dashed border     |
| Everything else                                | Default rectangle |

## Edges

### Directed edges

```
// unlabeled
A -> B
// labeled
A -routes-> B
```

### Bidirectional edges

```
// bidirectional with label
A <-syncs-> B
// bidirectional unlabeled
A <-> B
```

### Indented shorthand

When a node has multiple outbound edges, indent them below:

```
API Gateway
  -routes-> UserService
  -routes-> ProductService
  -routes-> OrderService
```

This is equivalent to writing three separate edge lines with `API Gateway` as the source.

### Edge metadata

```
SessionCache <-syncs-> ProductDB p: Medium
```

Edges support same-line metadata, typically for tag values.

## Groups

Groups visually contain nodes in a dashed rectangle.

### Basic groups

```
[AWS us-east-1]
  API Gateway
  UserService
  ProductDB
```

### Nested groups (max 2 levels)

```
[AWS us-east-1]
  [Compute]
    API Gateway
    UserService
  [Data]
    UserDB
    ProductDB
```

### Group-to-group edges

Groups can be edge endpoints:

```
[Frontend] -> [Backend]
```

## Tags

Tags add colored metadata dimensions for filtering and visual grouping.

### Declaring tags

```
tag Team as t Backend blue, Frontend green, Platform purple
tag Priority as p High red, Medium orange, Low gray
```

Format: `tag Name as alias Value1 color, Value2 color, ...`

### Assigning tags

Use the alias in same-line metadata:

```
API Gateway t: Backend
UserDB t: Platform
```

### Filtering

The **first declared tag group colors nodes automatically** — `active-tag` is only needed to pick a *different* group:

```
// color by Priority instead of the default (Team, declared first)
active-tag Priority
// hide nodes tagged Low priority
hide priority:Low
```

## Heat metric (numeric ramp)

Boxes can carry a numeric measure that drives a continuous color ramp — a choropleth-style "heat" dimension alongside the categorical tag groups.

```dgmo
boxes-and-lines Fleet Crews
heat Crew blue

Flagship heat: 120
Frigate heat: 40
Sloop heat: 12
Flagship -> Frigate
Flagship -> Sloop
```

- `heat: <number>` on any box line records its measure (a reserved metadata key — lifted out, never rendered as a tag). Non-numeric values are an error.
- `heat <Label> [color]` names the dimension and optionally sets the ramp hue (default: the palette's primary color). Pre-content directive.
- The ramp anchors at `0` for all-non-negative data, else at the data minimum.
- **Active dimension:** the heat ramp is the resting-active dimension whenever any box has a `heat:` (so heat shading works in static export with no interaction). `active-tag <tag-group>` switches to a tag group; `active-tag none` suppresses all tinting; `active-tag <metric>` forces the heat ramp. On a name collision between a tag group and the heat label, the tag group wins.
- When the heat ramp is active, every box tints along the min→max ramp and the legend shows a gradient capsule. Boxes without a `heat:` get a neutral fill.
- Each box's number is printed as text by default, independent of which dimension is active. Add `no-value` to suppress the numbers and let the color carry the measure alone.

## Options

| Directive     | Values            | Default     | Description                                 |
| ------------- | ----------------- | ----------- | ------------------------------------------- |
| `direction-lr` \| `direction-tb` | (flag)  | `direction-lr` | Layout direction (left-right or top-bottom) |
| `active-tag`  | tag group name    | first group | Which tag group drives node coloring; first declared is active by default, so only set this to pick another (`none` suppresses all coloring, a heat label forces the heat ramp) |
| `hide`        | `alias:value`     | none        | Hide nodes with a specific tag value        |
| `heat`        | `<Label> [color]` | none        | Names the numeric heat dimension and optional ramp hue |
| `no-value`    | (flag)            | off         | Suppress each box's `heat:` number (values print by default) |
| `show-values` | (flag)            | —           | Legacy no-op — values already print by default. Kept so older files still parse. |
| `no-notes`    | (flag)            | off         | Suppress every `note` annotation            |
| `no-title`    | (flag)            | off         | Hide the title line                         |
| `no-legend`   | (flag)            | off         | Hide the legend                             |
| `fill-tint` \| `fill-solid` \| `fill-outline` | (flag) | `fill-tint` | Fill treatment — see [Appearance](#appearance) |

`heat`, `no-value`, `show-values`, `active-tag`, and the appearance flags are **pre-content** directives: write them above the first node.

## Notes

Attach a hide-able annotation to a box with `note <Box> text`. The note floats beside the box as a folded-corner box (it never moves the box) and respects the diagram's `direction`. Indent lines below the heading for a multi-line body with bullets and inline markdown; end the heading with a lowercase color word to recolor it. `no-notes` suppresses every note.

```
boxes-and-lines
Flagship
  -> Harbor

note Flagship the admiral sails here — command and control
note Flagship green
  Holds:
  - the **war council**
  - the charts
```

## Comments

```
// This is a comment
```

Only `//` comments are supported.

## Complete Example

```dgmo
boxes-and-lines Microservices

tag Team as t Backend blue, Frontend green, Infra purple
direction-lr

WebApp t: Frontend
  -> API Gateway

API Gateway t: Infra
  -auth-> AuthService
  -data-> DataService

AuthService t: Backend
  -> UserDB

DataService t: Backend
  -> PostgreSQL
  -> Redis

UserDB t: Infra
PostgreSQL t: Infra
Redis t: Infra

[Cloud]
  [Services]
    API Gateway
    AuthService
    DataService
  [Storage]
    UserDB
    PostgreSQL

Redis <-cache-> DataService
```

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

## Next

- **Related:** [`block`](chart-block.md) · [`sketch`](chart-sketch.md) · [`c4`](chart-c4.md) · [`infra`](chart-infra.md) · [`flowchart`](chart-flowchart.md) · [`class`](chart-class.md) · [`er`](chart-er.md) · [`arc`](chart-arc.md)
- **Then:** [Colors & palettes](colors.md)
