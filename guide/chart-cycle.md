```dgmo
cycle OODA Loop

Observe blue
  Gather raw information from the environment
  Monitor unfolding circumstances
  -Unfold circumstances-> color: blue

Orient green
  Analyze and synthesize observations
  Form a mental model of the situation
  -Form hypothesis-> color: green

Decide orange
  Select a course of action
  -Commit to action-> color: orange

Act red
  Execute the chosen course of action
  Generate results that feed back
  -Generate feedback-> color: red
```

## Overview

A **cycle** arranges stages in a closed loop where the last step feeds back into the first — the shape of a recurring process that never terminates. Reach for it for OODA and PDCA loops, product lifecycles, continuous-improvement frameworks, retro cadences, and any workflow that repeats. You list the stages in order and the loop is drawn for you: nodes sit around a circle and the arrows connect each to the next, with the last wrapping back to the start.

## When to use

- **`cycle`** — the process loops forever with no exit, and the loop itself is the point.
- **[`flowchart`](chart-flowchart.md)** — the process *ends*, or it branches on decisions. A cycle has no branches and no terminating step.
- **[`state`](chart-state.md)** — the boxes are conditions something *is in* rather than steps you *do*, and specific events flip between them in many directions. A cycle is a fixed loop walked one way; a [back edge](#back-edges) or two for rework is fine, but if most steps jump around, use `state`.

## Syntax

```
cycle Title

NodeLabel
NodeLabel color: blue, span: 2
```

The first line declares the chart type and title. Each top-level line declares a node. Nodes are positioned around a circle in declaration order.

## Nodes

Every non-indented, non-directive line is a node:

```
cycle Seasons

Spring green
Summer yellow
Autumn orange
Winter blue
```

Color uses the trailing-token form (`Spring green`). Reach for `color: <name>` only when another metadata key (`span`, `description`, …) rides along — e.g. `Spring color: green, span: 2`.

### Node Metadata Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `color` | palette name | auto | Node fill color (pair with another key — for color-only, use the trailing-token form) |
| `span` | positive number | `1` | Relative arc distance to next node |
| `description` | string | — | One-liner shown below the label |

### Descriptions

Indented lines under a node add description text. Markdown inline formatting is supported (`**bold**`, `*italic*`, `` `code` ``, `[links](url)`). Bullet points with `- item` render as `• item`.

```
Observe blue
  Gather raw information from the environment
  Monitor unfolding circumstances
```

If both `description: text` and indented lines exist, they concatenate (same-line first, then indented).

## Edges

Edges are **implicit** — every node connects to the next, with the last wrapping to the first. The `->` syntax annotates edges with labels, descriptions, and styling:

```
Observe blue
  -Unfold circumstances-> color: blue
    Synthesize raw data into context

Orient green
  -> width: 4
```

Edge lines are indented under their source node. A label goes between `-` and `->`. Edge metadata supports `color` and `width`. Edges have no trailing-token color slot, so `color: <name>` is the only way to color them.

Each edge line is one arrow. What it draws depends on whether a step name follows `->`:

| Edge line | Draws |
|-----------|-------|
| `->` · `-Label->` | the step's arrow to the **next** step (label, colour, width) |
| `-Label-> NextStep` | the same — naming the next step changes nothing |
| `-Label-> OtherStep`, beside a line above | a **back edge**: an extra dashed arrow to that step |
| `-Label-> OtherStep`, alone | a **redirect**: the step's arrow goes there instead of the next step |

The target is the text after `->` and before any `key: value`. It matches a step label, ignoring case.

## Back Edges

A back edge shows a step that can send work backward — a review that sends a change back to planning — while the loop still moves forward. Under the step, write its forward arrow, then a second line naming the earlier step:

```dgmo
cycle Release Train

center SHIP
autonumber

Plan blue
  Pick the work for the sprint
Build green
  Write the code
Review orange
  Two people read every change
  -Approved->
  -Rework-> Plan color: red
Ship purple
  Release to everyone
```

The back edge is drawn **dashed**, inside the ring, so it reads as the way back rather than the main flow. It takes the source step's colour unless you set `color:`. An arrow to the previous step runs just inside the ring; to any other step it curves across the middle, clear of the other steps, the `center` text and the other labels. A step can have several back edges, one line each. It works with `direction-counterclockwise`, `circle-nodes`, `autonumber` and `center`.

Leave out the forward line (`-Approved->` above) and the named arrow **replaces** the step's arrow to the next step instead — drawn solid, as part of the loop. Use that for a loop with a lead-in step:

```dgmo
cycle Raid Cycle

Spot a Sail
Pursue
Board
Plunder
  -Back on the hunt-> Pursue
```

A target that names no step, or the step itself, is an error on that line (with a "did you mean" hint when a step name is close), and that arrow is not drawn.

### Edge Descriptions

Indented lines under an edge line add description text:

```
Observe
  -Analyze->
    Break down observations into components
    Identify **key patterns**
```

## Span

The `span` metadata controls relative arc distance between nodes. A node with `span: 2` gets twice the arc space to the next node:

```
cycle Weighted Process

Important Step span: 2
Quick Step
Another Step span: 1.5
```

## Directives

| Directive | Effect |
|-----------|--------|
| `direction-counterclockwise` | Reverse cycle direction (default: clockwise) |
| `circle-nodes` | Render nodes as circles instead of rounded rectangles |
| `center TEXT` | Text in the middle of the ring (`center PDCA`; quotes optional) |
| `autonumber` | Number the steps 1, 2, 3… in source order, as a badge on each node's outer edge |

```
cycle Simple Loop

direction-counterclockwise

Plan
Do
Check
Act
```

## Complete Example

```dgmo
cycle PDCA Continuous Improvement

Plan color: blue, span: 1.5
  Define objectives and processes
  Establish expected outcomes
  -Start implementation->

Do green
  Execute the plan on a small scale
  Collect data for analysis
  -Gather results->

Check orange
  Compare results against expectations
  Identify deviations and root causes
  -Propose changes-> color: orange

Act red
  Standardize successful changes
  Address remaining gaps
  -Feed back into planning-> color: red
    Begin the next improvement cycle
```

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`flowchart`](chart-flowchart.md) · [`state`](chart-state.md)
- **Then:** [Colors & palettes](colors.md)
