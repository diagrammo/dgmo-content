```dgmo
swimlane Expense Approval
direction LR

lane Employee gray
lane Manager blue
lane Finance green

[Submit]
  Employee
    File Expense
[Review]
  Manager
    <Approve>
    (!Rejected)
[Pay]
  Finance
    Reimburse
    (Paid) success

File Expense -> <Approve>
<Approve>
  -deny-> (!Rejected)
  -approve-> Reimburse -> (Paid)
```

## Overview

Swimlane diagrams show a **cross-functional process** — who does what, in what order — as a BPMN-style flow. Each lane is a role, team, or system; the flow runs left-to-right (or top-to-bottom) and crosses lanes as work is handed off. Optional **phases** group the flow into stages. Use them for approval workflows, onboarding, incident response, order fulfillment, or any process that spans more than one actor.

The layout is automatic: steps that hand off to another lane stack vertically beneath their predecessor instead of marching diagonally, so diagrams stay compact and readable.

## Syntax

```
swimlane Title
direction LR

lane Role A color
lane Role B color

Role A
  First Step
Role B
  Second Step

First Step -> Second Step
```

A swimlane file has three parts: **lane declarations**, a **structure block** (which nodes live in which lane), and a **flow block** (the edges connecting them). Node names are global and must be unique.

## Direction

`direction LR` (default) runs the flow left-to-right with lanes as horizontal rows. `direction TB` transposes it — the flow runs downward and lanes become vertical columns.

## Lanes

```
lane Customer gray
lane Support blue
lane Engineering red
```

Each `lane` declares a row (or column in TB) with a name and a color. Lane order top-to-bottom matches declaration order.

## Node shapes

Shapes mirror flowchart conventions and are inferred from the node name's wrapper:

```dgmo
swimlane Shapes
direction LR

lane Flow blue

Flow
  Task
  <Decision>
  <+ Parallel>
  [[Subprocess]]
  (Done) success

Task -> <Decision> -> <+ Parallel> -> [[Subprocess]] -> (Done)
```

| Wrapper | Shape | Meaning |
|---------|-------|---------|
| `Name` | rounded box | a task / activity |
| `<Name>` | diamond | exclusive gateway (one branch taken) |
| `<+ Name>` | diamond with `+` | parallel gateway (fork / join) |
| `[[Name]]` | double-bordered box | subprocess |
| `(Name)` | circle | terminal (start / end event) |

### Terminals

A bare `(Name)` is a neutral terminal. Add a trailing keyword or `!` prefix to type it:

```
(Done) success
(!Rejected)
(Aborted) terminate
```

`success` renders green (double ring), `(!X)` renders as a red error end, and `terminate` is a hard stop. Source and sink terminals are detected automatically from the flow.

## Phases

Wrap the structure block in `[Phase]` headers to group the flow into stages. Under each phase, indent the lane, then indent its nodes:

```dgmo
swimlane Hiring
direction LR

lane Candidate gray
lane Recruiter blue
lane Team green

[Apply]
  Candidate
    Submit
[Screen]
  Recruiter
    <Phone Screen>
    (!Rejected)
  Team
    Interview
[Offer]
  Recruiter
    Send Offer
    (Hired) success

Submit -> <Phone Screen>
<Phone Screen>
  -no-> (!Rejected)
  -yes-> Interview -> Send Offer -> (Hired)
```

Phases appear as labeled bands with subtle zebra striping behind the flow. A lane may appear under more than one phase.

## Flow

The flow block lists edges with `->`. Chain steps on one line, and indent branches under a shared source:

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
direction LR

lane CI teal

CI
  Compile
  <+ Fork>
  Unit Tests
  Lint
  <+ Join>
  Package

Compile -> <+ Fork>
<+ Fork>
  -> Unit Tests -> <+ Join>
  -> Lint -> <+ Join>
<+ Join> -> Package
```

## Tags

Tag groups add a second dimension — color a node by a category like risk or priority, independent of its lane. Declare the group, then apply it to a node with `alias: value`:

```dgmo
swimlane Triage
direction LR

tag Risk as r
  low green
  high red

lane Ops blue

Ops
  Assess
  Patch r: high

Assess -> Patch
```

## Complete example

```dgmo
swimlane Incident Response
direction TB

lane Monitoring orange
lane On-Call red
lane Engineering blue
lane Comms purple

Monitoring
  Alert Fires
On-Call
  <Ack in 5m>
  Triage
Engineering
  [[Mitigate]]
  <Resolved>
Comms
  Notify Status Page
  (Closed) success
  (!Escalate)

Alert Fires -> <Ack in 5m>
<Ack in 5m>
  -no ack-> (!Escalate)
  -acked-> Triage -> [[Mitigate]] -> <Resolved>
<Resolved>
  -still down-> [[Mitigate]]
  -recovered-> Notify Status Page -> (Closed)
```
