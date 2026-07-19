```dgmo
swimlane Expense Approval
direction-lr

[Submit]
  lane Employee gray
    File Expense -> <Approve>
[Review]
  lane Manager blue
    <Approve>
      -deny-> (!Rejected)
      -approve-> Reimburse
[Pay]
  lane Finance green
    Reimburse -> (Paid) success
```

## Overview

Swimlane diagrams show a **cross-functional process** — who does what, in what order — as a BPMN-style flow. Each lane is a role, team, or system; the flow runs left-to-right (or top-to-bottom) and crosses lanes as work is handed off. Optional **phases** group the flow into stages. Use them for approval workflows, onboarding, incident response, order fulfillment, or any process that spans more than one actor.

The layout is automatic: steps that hand off to another lane stack vertically beneath their predecessor instead of marching diagonally, so diagrams stay compact and readable.

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
| `[[Name]]` | double-bordered box | subprocess |
| `(Name)` | circle | terminal (start / end event) |

A **bare** task name used as an edge target must be declared somewhere as a line-head — a typo'd target (`Approve -> Reimburze`) is flagged, not silently created. A **delimited** endpoint (`(Done)`, `<Gate>`, `[[Sub]]`) is created automatically the first time it's referenced, so terminals and gateways need no separate declaration.

### Terminals

A bare `(Name)` is a neutral terminal. Add a trailing keyword or `!` prefix to type it:

```
(Done) success
(!Rejected)
(Aborted) terminate
```

`success` renders green (double ring), `(!X)` renders as a red error end, and `terminate` is a hard stop. Source and sink terminals are detected automatically from the flow.

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
