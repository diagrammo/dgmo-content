```dgmo
flowchart Pirate's Code

(Sail Ho!) -> <Friend or Foe?>
  -friend-> [Check Logs~] -> /Trade Rum/ -> [Celebrate]
  -foe-> [Fire Cannons] -> [[Claim Loot]] -> [Celebrate]
[Celebrate]->(Sail On)
```

## Overview

Shaped nodes and labeled arrows that trace a process or decision path from start to end — the default choice when you need to show the steps somebody actually follows, the branches they hit, and where each branch ends up. Reach for it for step-by-step processes, decision branches and outcomes, or algorithm and logic flow. Every edge means **"then do this"**: the flow moves because the previous step finished, not because something happened to it. Nodes are created automatically from their shape delimiters — write the flow and the layout is handled for you.

## When to use

- **`flowchart`** — the boxes are *steps that happen*, in order, and the process ends.
- **[`state`](chart-state.md)** — the boxes say what something *is* right now (`Pending`, `Shipped`), and each arrow is an **event that causes the transition** rather than the next thing to do. Drawing states as a flowchart misattributes causality: readers infer the system advances on its own when it actually needs an external trigger.
- **[`swimlane`](chart-swimlane.md)** — it matters *who* performs each step. A flowchart has no concept of ownership.
- **[`sequence`](chart-sequence.md)** — the boxes are *parties sending messages to each other*, not actions.
- **[`cycle`](chart-cycle.md)** — the process loops forever with no exit. A flowchart implies termination.
- **[`pert`](chart-pert.md)** — the steps have durations you want added up into a schedule.
- **[`funnel`](chart-funnel.md)** — you're showing counts dropping at each stage, not branches and decisions.
- **[`bracket`](chart-bracket.md)** — the branches are contestants losing and dropping out, not decisions.
- **[`version-control`](chart-version-control.md)** — you're describing an actual commit history with parallel lines that rejoin.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — the boxes are *things that exist*, not steps that happen.

## Syntax

```
flowchart Chart Title
direction-lr

(Start) -> [Step] -> <Decision?>
  -yes-> [Action] -> (End)
  -no-> [Other Action]
```

## Settings

| Key            | Description                                     | Default |
| -------------- | ----------------------------------------------- | ------- |
| `chart`        | Must be `flowchart`                             | Yes     |
| `direction-lr` | Left-to-right layout (default is top-to-bottom) | off     |

The title is the rest of line 1 — there is no `title` directive.

## Node Shapes

Each shape has its own delimiter syntax:

| Shape      | Syntax      | Appearance          | Typical Use         |
| ---------- | ----------- | ------------------- | ------------------- |
| Terminal   | `(Label)`   | Rounded rectangle   | Start / End         |
| Process    | `[Label]`   | Rectangle           | Actions / Steps     |
| Decision   | `<Label?>`  | Diamond             | Yes/No branching    |
| I/O        | `/Label/`   | Parallelogram       | Input / Output      |
| Subroutine | `[[Label]]` | Double-bordered box | Reusable procedures |
| Document   | `[Label~]`  | Wavy-bottom box     | Files / Reports     |

## Arrows and Edge Labels

Connect nodes with `->`. Add labels between dashes:

```
[A] -> [B]
[A] -yes-> [B]
[A] -no-> [C]
```

## Branching with Indentation

Indent continuation lines to branch from a decision node:

```
<Valid?>
  -yes-> [Process] -> (Done)
  -no-> [Show Error] -> /Retry/
```

The indented lines connect back to the last node at the parent indent level, creating branching paths without explicit wiring.

## Node Colors

Append a color name (lowercase) at the end of a node label:

```
(Start green) -> [Process blue] -> (End red)
```

The recognized colors are `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, and `white`. To use one as a literal label, capitalize it (`Red`, `Blue`).

## Comments

**Comments are full-line only.** A line whose first non-whitespace characters are `//` is ignored by the parser. A `//` part-way through a line is *not* a comment — it is read as part of the value on that line, which is how a trailing annotation silently corrupts a label, a size, or a coordinate. Put the note on its own line above instead. ([`pert`](chart-pert.md) is the one exception: it also accepts `#`, including trailing.)

```
// This line is ignored by the parser
(Start) -> [Step] // inline comments are NOT supported
```

## Complete Example

```dgmo
flowchart Color Demo

(Start green) -> [Parse Input] -> <Valid? blue>
  -yes-> [Process teal] -> (Success green)
  -no-> [Error Handler red] -> /Log Error orange/ -> (Failure red)
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

- **Related:** [`state`](chart-state.md) · [`swimlane`](chart-swimlane.md) · [`sequence`](chart-sequence.md) · [`cycle`](chart-cycle.md) · [`pert`](chart-pert.md) · [`funnel`](chart-funnel.md) · [`bracket`](chart-bracket.md) · [`version-control`](chart-version-control.md) · [`boxes-and-lines`](chart-boxes-and-lines.md)
- **Then:** [Colors & palettes](colors.md)
