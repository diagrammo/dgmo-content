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

Cycle diagrams show a circular process flow where nodes are arranged on a circle and directed edges connect each to the next, with the last wrapping back to the first. They are ideal for OODA loops, PDCA cycles, product lifecycles, continuous improvement processes, and any workflow that repeats.

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

### Node Pipe Metadata

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
| `no-descriptions` | Hide description text on all nodes and edges |
| `circle-nodes` | Render nodes as circles instead of rounded rectangles |

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
