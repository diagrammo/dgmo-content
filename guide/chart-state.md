```dgmo
state Order Lifecycle

[*] -> Pending

Pending
  -submit-> Validating

Validating
  -approved-> Processing
  -rejected-> Cancelled

[Fulfillment]
  Processing
    -pack-> Shipping
    -out of stock-> Cancelled

  Shipping
    -delivered-> Delivered
    -lost-> Refunded

[Resolution]
  Delivered
    -return request-> Returning

  Returning
    -received-> Refunded

Cancelled -> [*]
Refunded -> [*]
Delivered -> [*]
```

## Overview

A state diagram models the states an object moves through and the events that flip it between them — reach for it when behavior depends on what mode something is currently in. Write states as plain text, connect them with `->` arrows, and Diagrammo handles the layout. Use `[*]` for start and end pseudostates, and indent lines to chain transitions from a parent state. Each box says what something *is* right now; each edge names the event that causes the change.

## When to use

- **`state`** — the boxes are conditions something can be in, and named events move it between them.
- **[`flowchart`](chart-flowchart.md)** — the boxes are actions someone or something *does*, in order.
- **[`cycle`](chart-cycle.md)** — a fixed loop always walked in one direction, with no branching and no exit.
- **[`kanban`](chart-kanban.md)** — you're tracking actual work items sitting in stages right now, not the rules that govern the movement.

State edges and flowchart edges look identical and mean opposite things. A state edge means "this **event causes** this transition" — something external happens and the system responds. A flowchart edge means "**then do** this" — the process advances on its own. Swap them and you misattribute causality: readers infer the system moves by itself when it actually needs an external trigger, or that a step waits for an event when it just runs.

## Syntax

```
state Diagram Title
direction-tb

[*] -> Idle
Idle -event-> Active
Active -> [*]
```

## Settings

| Key            | Description                                     | Default |
| -------------- | ----------------------------------------------- | ------- |
| `chart`        | Must be `state`                                              | —        |
| `direction-tb` | Top-to-bottom layout                                         | off (LR) |
| `direction-lr` | Left-to-right layout (restates the default)                  | on       |
| `active-tag`   | Tag group to color by (`none` suppresses coloring)           | first group |
| `no-legend`    | Hide the tag legend                                          | off      |

`direction-lr` and `direction-tb` are alternatives — the last one written wins.

## States

Write state names as plain text. States are created automatically when referenced:

```
Idle -> Active -> Done
```

### Pseudostates

Use `[*]` for start and end points. They render as filled circles:

```
[*] -> Idle
Done -> [*]
```

## Transitions

Connect states with `->`. Add labels between dashes:

```
Idle -> Active
Idle -start-> Active
Active -finish-> Done
```

### Indent-Based Source Inference

Indent transitions under a state heading to chain them from that state:

```
Idle
  -start-> Active
  -reset-> Stopped
Active
  -> Done
```

This is equivalent to writing `Idle -start-> Active`, `Idle -reset-> Stopped`, and `Active -> Done`.

### Transition Chains

Chain multiple states on a single line:

```
[*] -> Idle -> Active -> Done -> [*]
```

## State Colors

Append a color name (lowercase) at the end of a state label:

```
Active green -> Error red
```

The 11 recognized colors are: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. To use one as a literal label, capitalize it.

## Tag Groups

States can carry tag groups — the same `tag <Group> as <alias>` declaration used across DGMO. Declare the group before the transitions, then attach a value to any state with `alias: Value` metadata. The first declared group colors the states and drives the legend:

```dgmo
state Order Lifecycle

tag Owner as o
  Warehouse blue
  Finance green

[*] -> Placed
Placed o: Warehouse -picked-> Packed
Packed o: Warehouse -invoiced-> Billed
Billed o: Finance -> [*]
```

A tagged state takes its group's color; untagged states stay neutral gray. Tag coloring and an explicit trailing color name are alternatives — the trailing color wins on the state that carries it. Add `no-legend` to drop the legend for a slide embed.

When several groups are declared, the first one colors the diagram. Set `active-tag <Group>` to start on a different dimension, or `active-tag none` to render every state neutral while keeping the metadata.

## Notes

Annotate any state with `note <state>` followed by the text. The note renders as a callout attached to the state it names:

```dgmo
state Order Lifecycle

[*] -> Pending
Pending -submit-> Validating
Validating -approved-> Shipped

note Validating Waits for the harbormaster's stamp
```

For longer text, leave the head bare and indent the body underneath. Each line accumulates:

```dgmo
state Order Lifecycle

[*] -> Pending
Pending -submit-> Validating
Validating -approved-> Shipped

note Validating
  Waits for the harbormaster's stamp.
  Times out after one tide and returns to Pending.
```

## Groups

Use bracket syntax `[Name]` to visually group states into regions. States indented under the bracket line belong to the group. The group closes when indentation returns to the bracket's level or below:

```
state

[Happy Path] green
  [*] -> Processing -> Approved -> [*]

[Error Handling] red
  Processing -fail-> Rejected -> [*]
```

Groups render as labeled background boxes with optional colors.

Add the bare `collapsed` flag to start a group folded — it renders as a single box and its transitions re-target that box:

```dgmo
state Order Lifecycle

[*] -> Pending

[Fulfillment] collapsed
  Pending -pack-> Shipping
  Shipping -delivered-> Delivered

Delivered -> [*]
```

## Comments

```
// This line is ignored by the parser
[*] -> Idle
```

## Complete Example

```dgmo
state Order of the Jolly Roger

[*] -> Docked
Docked
  -set sail-> At Sea
At Sea
  -spot treasure-> Treasure Hunt
  -enemy ship!-> Battle
Treasure Hunt
  -found gold-> Celebrating
  -empty chest-> At Sea
Battle
  -victory!-> Plundering
  -retreat!-> At Sea
Plundering
  -> Celebrating
Celebrating
  -rum's gone-> At Sea
  -retire-> Docked
  -mutiny!-> [*]
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

## Common mistakes

- **State edges mean "this event causes this transition."** [`flowchart`](chart-flowchart.md) edges mean "then do this." Swapping them misattributes causality — a reader infers the system moves on its own when it actually needs an external trigger.
- **A transition must be indented under the state it leaves.** Written at the top level it is dropped silently and the transition never draws. Compare the labels on the rendered arrows against the ones you wrote.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`flowchart`](chart-flowchart.md) · [`cycle`](chart-cycle.md) · [`kanban`](chart-kanban.md)
- **Then:** [Colors & palettes](colors.md)
