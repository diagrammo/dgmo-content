**Beta — expect rough edges and syntax changes.**

```dgmo
c4 Pirate Treasure Map System

tag Scope as sc
  Crew blue
  External gray

Captain is a person description: Commands the fleet and plans raids

TreasureMap is a system description: Tracks buried treasure locations and raid intelligence
  -Views treasure locations-> Captain
  -Sends raid alerts [carrier pigeon]-> Lookout

  containers
    ChartRoom is a container description: Interactive sea chart with treasure markers, tech: Parchment
      -Queries treasure data [secret code]-> Vault

    Vault is a container description: Encrypted treasure ledger and coordinates, tech: Iron Chest
      -Reads/writes [quill and ink]-> TreasureLog

    TreasureLog is a container description: "Stores locations, guard counts, and loot inventories", tech: Leather-Bound Tome

Lookout is an external description: Crow's nest spotter on allied ships, sc: External
  ~Relays sightings to~> Captain

deployment
  Flagship
    container ChartRoom
    container Vault
  SecretCave
    container TreasureLog
```

## Overview

C4 diagrams model software architecture at multiple zoom levels, following the [C4 model](https://c4model.com). Define people, systems, containers, and components — then drill down from context to detail. Relationships use the same arrow syntax as sequence diagrams.

The diagram starts at the **Context** level (people + systems). In the app, click a system to drill into its **Containers**, then click a container to see its **Components**. A rendered or exported image draws the Context level unless the file says otherwise with `level` — see [Rendering a specific zoom level](#rendering-a-specific-zoom-level).

Reach for it for system context diagrams, container and component views, and architecture onboarding docs — anywhere you need to explain how a system fits together to a mixed technical and non-technical audience. C4 asserts a specific abstraction level, so keep each view to one: mixing context, container, and component in a single picture produces a diagram that violates the model it claims to follow.

## When to use

- **`c4`** — you need to zoom from "the whole system" into "inside this service," with a named abstraction level at each step.
- [`boxes-and-lines`](chart-boxes-and-lines.md) — one flat picture of the pieces is enough and you don't need zoom levels. It is also the safer choice when your diagram would mix abstraction levels.
- [`infra`](chart-infra.md) — you are trying to size and stress the system rather than explain it. `infra` computes traffic, latency, and failure; C4 draws only what you write.
- [`block`](chart-block.md) — you want one static arranged picture where position is yours to control, rather than click-to-zoom levels of detail.

## Syntax

```
c4 Diagram Title

Name is a person description: ...
Name is a system description: ...
  -label with technology-> Target
  ~async label~> Target

  containers
    Name is a container tech: ..., description: ...

      components
        Name is a component tech: ..., description: ...
```

## Element Types

| Type        | Description                     | Example                         |
| ----------- | ------------------------------- | ------------------------------- |
| `person`    | User or actor                   | `Customer is a person`          |
| `system`    | Top-level software system       | `Banking is a system`           |
| `container` | Runtime unit within a system    | `API is a container`            |
| `component` | Logical part within a container | `AuthController is a component` |

Elements are declared with a name followed by `is a <type>`. Add metadata after the type:

```
Analytics Platform is a system description: Multi-tenant analytics, tech: Node.js
```

## Shapes

Shapes can be inferred from a container or component's technology or name, or declared explicitly. Context-level person and system nodes do not carry a shape field, so a shape declaration on one has no visible effect; shapes show on containers and components.

```
Database is a container is a database
Cache is a container is a cache
Event Bus is a container is a queue
AWS is a system is a cloud
Stripe is a system is an external
```

| Shape      | Inferred from                                             |
| ---------- | --------------------------------------------------------- |
| `database` | `tech: PostgreSQL`, `tech: MySQL`, names ending in `DB`   |
| `cache`    | `tech: Redis`, `tech: Memcache`, names containing `Cache` |
| `queue`    | Accepted, but currently renders as a plain rectangle      |
| `cloud`    | Accepted, but currently renders as a plain rectangle      |
| `external` | Explicit `is an external` only                            |

## Metadata

Key-value pairs on the same line, or indented below the element:

```
API Gateway is a container tech: Node.js, team: Platform
  description: REST API serving all frontends
```

Or fully inline:

```
API Gateway is a container tech: Node.js, team: Platform, description: REST API
```

## Relationships

### Arrow Types

| Arrow | Meaning                 | Example                  |
| ----- | ----------------------- | ------------------------ |
| `->`  | Synchronous             | `-Makes API calls-> API` |
| `~>`  | Async / fire-and-forget | `~Sends events~> Queue`  |

Relationships are always **indented under their source element** — there is no top-level `A -label-> B` form. For a bidirectional relationship, write one arrow under each element:

```
API is a container
  -Makes API calls-> Database
Database is a container
  -Returns results-> API
```

### Labeled Relationships

Place the complete label inside the arrow. Bracketed technology suffixes are not special syntax; write the protocol as ordinary label text:

```
-Makes API calls over JSON/HTTPS-> API
-Reads and writes over SQL/TCP-> Database
~Submits analytics queries over AMQP~> Query Engine
```

### Arrow-Label Syntax

Labels can also be placed inside the arrow:

```
-Makes API calls over JSON/HTTPS-> API
~Sends events over AMQP~> Queue
```

## Hierarchy

Systems contain containers (via `containers`), containers contain components (via `components`). Indentation defines the hierarchy:

```
Banking is a system
  containers
    Web App is a container
    API is a container
      components
        AuthController is a component
        PaymentService is a component
```

At the **Context** level, container-level relationships are automatically rolled up to their parent system.

## Rendering a specific zoom level

A rendered C4 file (the CLI, an export, a docs embed) draws the **Context** level by default: people and systems only. Containers nested under a system are parsed and make it drillable in the app, but a Context render collapses the system to one box.

To render another level, add a `level` line to the header, before the first element:

| Line | What the image shows |
|---|---|
| `level context` | People and systems. The default. |
| `level containers of <System>` | That system's containers inside its boundary, plus the people and systems they talk to. |
| `level containers` | The same, when exactly one system has containers. |
| `level components of <Container>` | That container's components. The system is found from the container. |
| `level components` | The same, when exactly one container has components. |
| `level deployment` | The `deployment` section's infrastructure boxes with the containers placed in them. |

```dgmo
c4 Harbor Authority — Containers
level containers of Harbor Authority

tag Technology as tech
  React blue
  Node.js green
  PostgreSQL purple

Ship Captain is a person
  -Books berths via [HTTPS]-> Dock Board

Harbor Authority is a system
  containers
    Dock Board is a container tech: React
      description: Berth scheduling console for captains
      -Books berths through [JSON/HTTPS]-> Manifest API

    Manifest API is a container tech: Node.js
      description: Core API for berths, manifests, and tolls
      -Reads and writes [SQL/TCP]-> Harbor Ledger

    Harbor Ledger is a container is a database tech: PostgreSQL
      description: Berths, manifests, tariffs, and toll receipts
```

Names match without regard to case. If the name is unknown, the bare form is ambiguous, or the level has nothing to draw, you get a warning that names the choices, and the image falls back to Context. The app still opens a file on Context; `level` sets the static image only.

Suffix the title with the level (`— System Context`, `— Containers`) so the view names itself. Keep one level per file: a file that mixes context and container elements violates the model it claims to follow.

You can also **drill in the app and export**. Click down to the level you want and export; the export captures the view on screen.

Drillable system cards carry a solid accent bar along their bottom edge. A drilled view adds an outer boundary frame with a synthesized italic `<Name> — system` heading. Context cards also include a stereotype band (`«person»` or `«system»`) and divider; people add a stick figure.

Keep one level per file either way. A single file that mixes context and container elements produces a diagram that violates the model it claims to follow.

## Groups

Organize containers or components into visual boundaries:

```
containers
  [Frontend]
    Dashboard is a container tech: React
    Admin Console is a container tech: React

  [Backend]
    API Gateway is a container tech: Node.js
    Query Engine is a container tech: Node.js

  [Data]
    Database is a container tech: PostgreSQL
    Cache is a container is a cache tech: Redis
```

## Tag Groups

Color-code elements by technology, team, or any custom category:

```
tag Technology as tech
  React blue
  Node.js green
  PostgreSQL purple
  Redis red

tag Team as t
  Product blue default
  Data orange
  Infrastructure teal
```

Then reference tags in metadata: `API is a container tech: Node.js, t: Product`.

On container and component cards, arbitrary metadata is visible: keys become capitalized rows, with `tech` rendered as `Technology:`. For example, `team: Platform` prints a `Team: Platform` row.

## Deployment

Map containers to infrastructure with the `deployment` section:

```
deployment
  AWS us-east-1 is a cloud
    ECS Cluster
      container API
      container Worker
    RDS is a database
      container Database
    ElastiCache is a cache
      container Cache
```

- Nest deployment nodes to any depth
- Use `container Name` to reference a defined container
- Shapes (`is a database`, `is a cloud`) work on deployment nodes too

## Options

Header directives, written at indent 0 above the content:

| Directive | Values | Effect |
| --------- | ------ | ------ |
| `active-tag` | tag group name | Which tag group drives element coloring. Defaults to the first declared group, so only set this to pick another. Applies at every level, in the app and in a static render. |
| `level` | `context` · `containers of <System>` · `components of <Container>` · `deployment` | The level a static render draws — see [Rendering a specific zoom level](#rendering-a-specific-zoom-level). Default `context`. |
| `fill-tint` \| `fill-solid` \| `fill-outline` | (flag) | Fill treatment — see [Appearance](#appearance). Mutually exclusive; last one wins. |
| `no-title` | (flag) | Hide the title line. |
| `no-legend` | (flag) | Hide the legend. |

| `direction-tb` \| `direction-lr` | (flag) | Layout flow. Default is top-to-bottom. |

`layout` is **rejected** on C4 — it errors, because there is a single layered layout with no algorithm to select. To change orientation use `direction-tb` (default) or `direction-lr`. Options are only recognized in the header region, above the first element; an option line written after content becomes an "Unexpected content" error.

### The `import` metadata key

Point an element at another `.dgmo` file with an indented `import:` line. The element becomes drillable even when it declares no `containers` or `components` of its own, and the target path rides along on the rendered node so the app can open it:

```
Payments is a system description: Handles billing
  import: payments-internals.dgmo
```

## Comments

```
// This line is ignored by the parser
```

## Common mistakes

### Writing a relationship at the top level

C4 has no `Source -label-> Target` form. The source of every relationship comes from **indentation** — the arrow belongs to the element it sits under. Writing the source name on the arrow line is an error:

```
Api is a system
Db is a system
Api -Reads-> Db
```

> `Unexpected content: "Api -Reads-> Db". Expected an element ('Web App is a container'), a relationship ('-Uses-> Database'), indented metadata ('tech: React'), or a group ('[Backend]').`

The correct form indents the arrow beneath its source:

```
Api is a system
  -Reads-> Db

Db is a system
```

The quieter version of this mistake is worse: an arrow left at indent 0 with **no** source name — `-Reads-> Db` on its own line — validates completely clean and is simply never drawn. If a relationship is missing from your diagram and nothing warned you, check its indentation first.

### Expecting nested containers to appear in the rendered image

They will not, unless the file says `level containers of <System>`. See [Rendering a specific zoom level](#rendering-a-specific-zoom-level) — without `level`, a static render is the Context view.

### Bidirectional arrows

`<->` and `<~>` are errors, not shorthand. Write one arrow under each element instead — see [Arrow Types](#arrow-types).

### Trailing comments

Comments are **full-line only**. A trailing `//` is absorbed only after a line already contains key-value metadata. On a bare declaration it is a hard parse error that replaces the diagram:

```
// core API serving all frontends
API Gateway is a container tech: Node.js
```

## Complete Example

```dgmo
c4 SaaS Analytics Platform

tag Technology as tech
  React blue
  Node.js green
  PostgreSQL purple
  Redis red

tag Team as t
  Product blue default
  Data orange
  Infrastructure teal

End User is a person description: Views dashboards and creates reports
Account Admin is a person description: Manages workspace settings and members

Analytics Platform is a system description: Multi-tenant analytics and reporting
  -Serves dashboards over HTTPS-> End User
  -Provides admin console over HTTPS-> Account Admin
  ~Sends scheduled reports via SMTP~> Email Service

  containers
    [Frontend]
      Dashboard App is a container tech: React, t: Product
        description: Interactive data visualization SPA
        -Fetches data over JSON/HTTPS-> API Gateway

      Admin Console is a container tech: React, t: Product
        description: Workspace and user management
        -Manages settings via JSON/HTTPS-> API Gateway

    [Backend]
      API Gateway is a container tech: Node.js, t: Product
        description: REST API serving all frontends
        -Reads/writes user data over SQL/TCP-> App Database
        -Reads/writes sessions over TCP-> Cache
        ~Submits analytics queries over AMQP~> Query Engine

      Query Engine is a container tech: Node.js, t: Data
        description: Processes analytics queries asynchronously
        -Runs queries over SQL/TCP-> Data Warehouse
        ~Publishes results over AMQP~> Event Bus

    [Data]
      App Database is a container tech: PostgreSQL, t: Product
        description: Users, workspaces, and dashboard configs

      Data Warehouse is a container tech: PostgreSQL, t: Data
        description: Aggregated analytics data

      Cache is a container is a cache tech: Redis, t: Infrastructure
        description: Session store and rate limiter

      Event Bus is a container tech: RabbitMQ, t: Infrastructure
        description: Async messaging backbone

Email Service is a system description: Transactional email delivery
  ~Delivers report emails to~> End User

deployment
  GCP us-central1 is a cloud
    Cloud Run — Frontend
      container Dashboard App
      container Admin Console
    Cloud Run — Backend
      container API Gateway
      container Query Engine
    Cloud SQL is a database
      container App Database
      container Data Warehouse
    Memorystore is a cache
      container Cache
    Cloud Pub/Sub
      container Event Bus
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

- **Related:** [`boxes-and-lines`](chart-boxes-and-lines.md) · [`infra`](chart-infra.md) · [`block`](chart-block.md)
- **Then:** [Colors & palettes](colors.md)
