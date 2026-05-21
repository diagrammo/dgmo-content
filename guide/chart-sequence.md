# Sequence Diagram

```dgmo
sequence Treasure Hunt App

User -Search nearby loot-> WebApp
WebApp -GET /treasures?nearby-> TreasureAPI | c: Search
note
  - check location
  - use compass
  - http://example.com
TreasureAPI -Find within 5nm-> MapDB | c: Search
MapDB -3 results-> TreasureAPI
TreasureAPI -locations-> WebApp
WebApp -Show treasure map-> User
```

Notice that `User` renders as a stick figure, `MapDB` as a cylinder, and `NotifyQueue` as a horizontal pipe — all inferred automatically from the names. Participants without a distinctive role (`WebApp`, `TreasureAPI`) fall through to the default rectangle. No declarations needed.

## Overview

The sequence diagram uses an **inference-driven** syntax. Just write messages between participants and Diagrammo automatically:

- **Creates participants** from their first mention — no declarations needed
- **Infers participant shapes** from naming conventions — `User` gets a stick figure, `OrderDB` gets a cylinder, `Kafka` gets a horizontal pipe
- **Tracks activation bars** from call stacks

No `end` keywords are needed — blocks are scoped by indentation.

## Syntax

```
sequence Diagram Title
no-activations

== Section Label ==

A -message-> B
A ~async message~> B

if condition
  A -message-> B
else
  A -alternative-> C

loop description
  A -retry-> B
```

## Settings

| Key              | Description                             | Default  |
| ---------------- | --------------------------------------- | -------- |
| `chart`          | `sequence` (inferred from `->` content) | Optional |
| `title`          | Diagram title                           | None     |
| `no-activations` | Hide activation bars (on by default)    | off      |
| `active-tag`     | Tag group to activate on load           | None     |
| `collapse-notes` | Collapse notes by default               | off      |

## Participants

### Automatic Type Inference

Participants are created automatically when first mentioned in a message. Their shape is inferred from the name — just use descriptive names and Diagrammo does the rest:

```
User -createOrder-> OrderService
OrderService -save-> OrderDB
OrderService -cache result-> Redis
OrderService ~publish event~> EventBus
```

This creates five participants, each with a different shape — no declarations needed.

The inference rules are checked in priority order (first match wins):

| Type       | Shape               | Naming Patterns                                                                                      |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| `actor`    | Stick figure        | `User`, `Customer`, `Admin`, `Guest`, `Visitor`, `Operator`, Alice, Bob, Charlie                     |
| `database` | Cylinder            | Names ending in `DB`; `Database`, `Store`, `Storage`, `Repo`, `Postgres`, `MySQL`, `Mongo`, `Dynamo` |
| `cache`    | Dashed cylinder     | `Cache`, `Redis`, `Memcache`, `KeyDB`, `Dragonfly`, `Hazelcast`, `Valkey`                            |
| `queue`    | Horizontal cylinder | `Queue`, `Kafka`, `RabbitMQ`, `EventBus`, `SQS`, `SNS`, `PubSub`, `Topic`, `Stream`, `Broker`        |
| `default`  | Rectangle           | Anything unrecognized                                                                                |

Inference is intentionally narrow — only names whose role is unambiguous at a glance get a distinctive shape. Anything else (services, gateways, UI, third-party providers) falls through to the default rectangle.

### Explicit Declarations (Optional)

You only need explicit declarations when you want to **override** the inferred type, set a **display alias**, or control **position**:

```
// Override type when the name doesn't match conventions
Vault is a database

// Multi-word names are accepted directly — no aliasing needed
"Order History" is a database

// Control left-to-right ordering
OrderDB position -1
```

The keywords `service`, `frontend`, `networking`, `gateway`, and `external` were removed in dgmo 0.16.0 — they emit a parse error. Drop the `is a` clause and the participant renders as the default rectangle.

## Participant Ordering

Participants are laid out left-to-right based on **first appearance in messages** — the first participant mentioned gets the leftmost column.

**Position values:**
- `0` = leftmost, `1` = second from left, etc.
- `-1` = rightmost, `-2` = second from right
- If two participants target the same slot, the later one shifts to the nearest free position

**Groups affect ordering:** members of the same group always stay adjacent (see [Groups](#groups) below). The group is placed where its first member would naturally appear.

**Priority (highest wins):**
1. Explicit `position N`
2. Group adjacency
3. First appearance in messages

```
// Example: force the database to the far right
sequence
User -placeOrder-> OrderService
OrderService -save-> OrderDB
OrderDB position -1
```

## Messages

### Call Arrows

A solid arrow from one participant to another:

```
User -login-> API
```

### Return Arrows

Return arrows are generated automatically from the call stack. When A calls B, a dashed return arrow from B back to A appears once B's work is done:

```
User -login-> API
API -query-> UserDB
// Auto-return: UserDB → API (dashed)
// Auto-return: API → User (dashed)
```

### Async / Fire-and-Forget

No return arrow, no activation on the target — use the `~` arrow:

```
API ~sendWelcomeEmail~> EmailService
API ~logEvent~> LogService
```

### Self-Calls

A participant calling itself renders as a loopback arrow:

```
OrderService -validate-> OrderService
```

## Blocks

Blocks use **indentation** for scoping — no `end` keyword needed.

### If / Else

```
if user authenticated
  API -getOrders-> OrderService
  OrderService -query-> OrderDB
else
  API -401 Unauthorized-> User
```

Renders as a dashed frame with an `if` label and an optional `else` divider.

### Loop

```
loop retry up to 3 times
  OrderService -request-> ExternalAPI
```

### Parallel

```
parallel send notifications
  API ~email~> EmailService
  API ~text~> SMSService
```

Blocks can nest inside each other. Unindent to end a block.

## Notes

Add context between messages with `note`:

```
User -POST /login-> API
note Validates credentials against LDAP
API -query-> UserDB
```

The note appears between the two surrounding messages.

## Sections

Full-width horizontal dividers to organize phases:

```
== Authentication ==

User -login-> API

== Data Fetch ==

API -query-> OrderDB

== Response ==

API -results-> User
```

## Groups

Organize participants into labeled boxes in the header:

```
[Backend]
  OrderService
  PaymentService
  OrderDB

[Frontend]
  WebApp
  MobileApp
```

- `[Name]` declares a named group
- Indented names belong to the group
- Grouped participants stay adjacent in the layout
- Groups can carry tag metadata: `[Backend | team: Product]`

## Activation Bars

Thin vertical rectangles on lifelines show when a participant has an active call. They are computed automatically from the call stack:

- Appear from call arrow to auto-generated return
- Nested calls show overlapping bars
- Self-calls show offset overlapping bars
- Disabled with `no-activations`

## Comments

```
// This is a comment
// Use // for all comments
```

Lines starting with `//` are ignored by the parser.

## Tags

Tags add color-coded metadata dimensions to sequence diagrams. Define a tag group, list its values with colors, then attach values to participants, messages, and groups with pipe metadata.

### Defining Tag Groups

```
tag Concern as c
  Caching blue
  Auth green
  BusinessLogic purple default
```

- `tag Name` declares a tag group; `alias x` adds a shorthand
- Each entry: `Value color` — named color trails the value (lowercase)
- `default` on an entry applies it to untagged elements when the group is active

### Attaching Tags

Use `| key: value` after participant declarations, message lines, or group headers:

```
API | concern: Caching, team: Platform
User -login-> API | concern: Auth
[Backend | concern: BusinessLogic]
  OrderAPI
  DB
```

- Multiple tags: `| key1: val1, key2: val2`
- Aliases work: `| c: Caching` (if `tag Concern as c` was declared)

### Tag Resolution

When a tag group is active, colors are resolved in priority order:

1. Explicit metadata on the element
2. Group propagation (participant inherits from its group)
3. Receiver inheritance (all incoming tagged messages agree on the same value)
4. `default` entry value
5. Neutral (no color)

### Legend

A legend is rendered automatically above participants when tag groups exist. The active group expands to show colored entry dots. In the desktop app, click a group pill to activate it — participants and messages recolor to show that dimension.

Set `active-tag GroupName` in settings to activate a group on load.

## Complete Example

```dgmo
sequence E-Commerce Checkout

tag Layer as l
  Frontend teal
  Backend blue
  Storage purple

[Backend]
  OrderService
  PaymentGateway
  OrderDB

== Browse & Select ==

User -Add items to cart-> WebApp
WebApp -validateCart-> OrderService

== Payment ==

User -Submit payment-> WebApp
WebApp -createOrder-> OrderService
OrderService -charge(amount)-> PaymentGateway

if payment successful
  OrderService -saveOrder-> OrderDB
  OrderService ~sendReceipt~> EmailService
  WebApp -Order confirmed-> User
else
  WebApp -Payment declined-> User

== Cleanup ==

loop expire stale carts
  OrderService -purgeExpired-> OrderDB
```
