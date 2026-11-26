```dgmo
swimlane Planning a Raid
direction-lr

[Plan]
  lane Captain red
    Set Course -> <Worth the risk?>
    <Worth the risk?>
      -no-> (!Stay in Port)
      -yes-> Brief Crew
    Brief Crew -> Chart Route
  lane Navigator blue
    Chart Route -> Man Cannons
[Raid]
  lane Bosun orange
    Man Cannons -> Board Prize
  lane Captain red
    Board Prize -> Count Haul
[Share]
  lane Quartermaster green
    Count Haul -> Split Shares
    Split Shares -> (Paid Out) success
```

## Overview

Swimlane diagrams show a **cross-functional process** — who does what, in what order — as a BPMN-style flow. Each lane is a role, team, or system; the flow runs left-to-right (or top-to-bottom) and crosses lanes as work is handed off. Optional **phases** group the flow into stages. Use them for approval workflows, onboarding, incident response, order fulfillment, or any process that spans more than one actor.

The layout is automatic: steps that hand off to another lane stack vertically beneath their predecessor instead of marching diagonally, so diagrams stay compact and readable.

## When to use

- **`swimlane`** — the order of the work matters **and** it matters *who* does each step. Handoffs across teams are the finding.
- **[`flowchart`](chart-flowchart.md)** — the same actor does everything, or who does it is irrelevant. A flowchart has no concept of ownership.
- **[`sequence`](chart-sequence.md)** — the parties send messages back and forth to each other. Swimlane is a handoff down a chain; sequence is a conversation.
- **[`raci`](chart-raci.md)** — you only need who owns what, with no order to the work.
- **[`journey-map`](chart-journey-map.md)** — the subject is one person's experience and how they felt at each step, not several teams' handoffs.

## Syntax

```
swimlane Title
direction-lr

lane Role A color
  First Step -> Second Step
lane Role B color
  Second Step
```

A swimlane is a set of **lane blocks**. A `lane` line declares a lane **and opens its block**: the indented lines beneath it are that lane's nodes and their outgoing edges, written inline. There is **no separate flow block** — a node and its wiring live together under the lane that owns it.

A node is owned by the lane where it appears as a **line-head** (a bare node, or the source of an arrow); everywhere else the same name is a **reference**. References may point forward, to a node declared later or in another lane. Names are **lane-scoped**, so two lanes can each hold a `Review`; a bare reference resolves in its own lane first, then across all lanes — qualify it `Lane.Node` when a name is shared.

## Direction

`direction-lr` (default) runs the flow left-to-right with lanes as horizontal rows. `direction-tb` transposes it — the flow runs downward and lanes become vertical columns.

## Lanes

```
lane Customer gray
  Open Ticket -> Investigate
lane Support blue
  Investigate -> Resolve
lane Engineering red
  Resolve
```

Each `lane` declares a row (or column in TB) with a name and a color, and opens its block for the nodes/edges beneath it. Lane order matches first-appearance order; re-opening a lane later (or under another phase) resumes it.

## Node shapes

Shapes mirror flowchart conventions and are inferred from the node name's wrapper:

```dgmo
swimlane Shapes
direction-lr

lane Flow blue
  Task -> <Decision> -> <+ Parallel> -> [[Subprocess]] -> (Done) success
```

| Wrapper | Shape | Meaning |
|---------|-------|---------|
| `Name` | rounded box | a task / activity |
| `<Name>` | diamond | exclusive gateway (one branch taken) |
| `<+ Name>` | diamond with `+` | parallel gateway (fork / join) |
| `<o Name>` | diamond with `O` | inclusive gateway (any branches taken) |
| `<* Name>` | diamond with a ring | event-based gateway (the first event wins) |
| `[[Name]]` | double-bordered box | subprocess |
| `(Name)` | circle | event (start / mid-flow / end) |

A gateway's label is drawn above the diamond, never squeezed inside it. The exclusive gateway shows an X.

A **bare** task name used as an edge target must be declared somewhere as a line-head — a typo'd target (`Approve -> Reimburze`) is flagged, not silently created. A **delimited** endpoint (`(Done)`, `<Gate>`, `[[Sub]]`) is created automatically the first time it's referenced, so terminals and gateways need no separate declaration.

### Terminals

A bare `(Name)` is a neutral terminal. Add a trailing keyword or `!` prefix to type it:

```
(Done) success
(!Rejected)
(Aborted) terminate
```

Where an event sits decides its circle: with no inbound `->` it is a **start** (thin circle), with no outbound `->` an **end** (thick circle), and anything in between is **mid-flow** (double ring). `success` renders green, `(!X)` renders red with a lightning mark, and `terminate` is a hard stop (a filled dot inside the thick circle). A trigger word — `message`, `timer`, `signal` — adds its mark; see [BPMN](#bpmn).

## Phases

Wrap lane blocks in `[Phase]` headers to group the flow into stages. Under each phase, indent the `lane` blocks, then their nodes:

```dgmo
swimlane Hiring
direction-lr

[Apply]
  lane Candidate gray
    Submit -> <Phone Screen>
[Screen]
  lane Recruiter blue
    <Phone Screen>
      -no-> (!Rejected)
      -yes-> Interview
  lane Team green
    Interview -> Send Offer
[Offer]
  lane Recruiter blue
    Send Offer -> (Hired) success
```

Phases appear as labeled bands with subtle zebra striping behind the flow. A lane may appear under more than one phase (Recruiter, above, spans Screen and Offer).

## Flow

Edges use `->`, written inline under the lane that owns the source. Chain steps on one line, and indent branches under a shared source:

```
<Gate>
  -approve-> Ship
  -reject-> (Denied)
```

### In-arrow labels

Branch labels go **inside** the arrow (`-label->`), not trailing the line. This keeps each branch's condition attached to its edge:

```
<Valid>
  -yes-> Process
  -no-> Retry
```

### Loops

An edge back to an earlier node creates a loop — it's routed as a dashed back-edge so it reads as a return path:

```
Inspect -> <Pass>
<Pass>
  -fail-> Inspect
  -ok-> Ship
```

## Parallel work

A parallel gateway (`<+ Name>`) forks the flow into concurrent branches that later join at another parallel gateway:

```dgmo
swimlane Build
direction-lr

lane CI teal
  Compile -> <+ Fork>
  <+ Fork>
    -> Unit Tests
    -> Lint
  Unit Tests -> <+ Join>
  Lint -> <+ Join>
  <+ Join> -> Package
  Package
```

## Tags

Tag groups add a second dimension — color a node by a category like risk or priority, independent of its lane. Declare the group, then apply it to a node with `alias: value` (on the node's declaration or on a reference):

```dgmo
swimlane Triage
direction-lr

tag Risk as r
  low green
  high red

lane Ops blue
  Assess -> Patch
  Patch r: high
```

## Complete example

```dgmo
swimlane Incident Response
direction-tb

lane Monitoring orange
  Alert Fires -> <Ack in 5m>
lane On-Call red
  <Ack in 5m>
    -no ack-> (!Escalate)
    -acked-> Triage
  Triage -> [[Mitigate]]
lane Engineering blue
  [[Mitigate]] -> <Resolved>
  <Resolved>
    -still down-> [[Mitigate]]
    -recovered-> Notify Status Page
lane Comms purple
  Notify Status Page -> (Closed) success
```

## BPMN

Swimlane covers BPMN's everyday elements: pools, message flow, event triggers, task markers, boundary events, data and notes. It is not the whole BPMN 2.0 standard, and it does not read or write BPMN XML. A diagram with no `pool` lines is an ordinary swimlane.

```dgmo
swimlane Insurance claim

pool Customer
  ~> Claim received

pool Insurer
  lane Claims Agent blue
    (Claim received) message -> Check policy
    Check policy type: service, store: Policy DB
      -> <Amount over 5k?>
    <Amount over 5k?>
      -yes-> Adjuster review
      -no-> Auto approve
    Auto approve type: service, note: Under 5k, no person reviews the claim
      -> <> as merge

  lane Adjuster orange
    Adjuster review type: user
      -> [[Inspect property]]
      (5 days) timer -> Escalate      // a boundary event: fires if the review takes 5 days
    [[Inspect property]] -> merge
    Escalate type: user -> (Escalated)

  lane Finance green
    merge -> <+> as split
    split
      -> Notify customer
      -> Pay claim
    Notify customer type: send
      -> <+> as join
      ~> Customer
    Pay claim type: service -> join
    join -> (Paid)
```

### Every element

| Element | How to write it |
| --- | --- |
| Start | `(Claim filed)` |
| Message start | `(Claim received) message` |
| Timer start | `(Every Monday) timer` |
| Wait (mid-flow) | `(2 days) timer` |
| Wait for a message | `(Reply) message` |
| Signal | `(Alarm) signal` |
| End | `(Paid)` |
| Error end | `(!Rejected)` |
| Terminate end | `(Cancelled) terminate` |
| Exclusive: one path | `<Approved?>` |
| Parallel: all paths | `<+> as split` |
| Inclusive: any paths | `<o Which checks?>` |
| First event wins | `<* Wait for reply>` |
| User task | `Review type: user` |
| Service task | `Check type: service` |
| Manual task | `Inspect type: manual` |
| Script task | `Score type: script` |
| Send task | `Notify type: send` |
| Receive task | `Get form type: receive` |
| Subprocess | `[[Inspect property]]` |
| Boundary event | an event indented under a task: `(5 days) timer -> X` |
| Data object | `data: Claim form` |
| Data store | `store: Policy DB` |
| Annotation | `note: Under 5k…` |
| Message flow | `A ~> B` |
| Pool | `pool Insurer` |
| Outside party (collapsed) | `pool Customer` with no lanes |
| Lane | `lane Claims Agent blue` |

### Rules

- **Pools.** `pool Name` at the start of a line opens a pool; its `lane` blocks indent under it. A pool with no lanes is an outside party, drawn as a thin bar that can only send or receive `~>`. Once a diagram has pools, every lane belongs to one.
- **Message flow.** `~>` is drawn dashed, with an open circle at the source and a hollow arrowhead. It runs only between different pools, and a whole pool can be either end (`~> Claim received` written under `pool Customer`). Inside one pool, use `->`.
- **Event triggers** are a trailing word after the parentheses, the same way `success` and `terminate` work.
- **Task markers.** `type:` draws a marker in the task's top-left corner: `user`, `service`, `manual`, `script`, `send` (filled envelope) or `receive` (hollow envelope).
- **Boundary events.** An event line indented under a task sits on that task's bottom edge. Its arrow is the exception path — here, escalating when the review takes 5 days.
- **Unlabelled gateways.** `<>`, `<+>`, `<o>` and `<*>` take a name with `as` (`<+> as join`) so other lines can point at them.
- **Data and notes.** `store:`, `data:` and `note:` on a node attach a data store (cylinder), a data object (folded page) or an annotation (open bracket) with a dotted line. `note:` runs to the end of the line, commas included, so put it last.
- Edges never pass through a box: the layout routes every line around tasks, gateways, events and attachments.

Not yet supported: pools together with `[Phase]` columns, escalation, compensation and conditional events, and BPMN XML import or export.

## Appearance

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |

Lane colors are the trailing token on each `lane` line, and tag groups recolor nodes independently of their lane. Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`flowchart`](chart-flowchart.md) · [`sequence`](chart-sequence.md) · [`raci`](chart-raci.md) · [`journey-map`](chart-journey-map.md)
- **Then:** [Colors & palettes](colors.md)
