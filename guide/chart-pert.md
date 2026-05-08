# PERT Diagram

```dgmo
pert Pirate Voyage to the Atoll
time-unit w
confidence medium
analysis monte-carlo
trials 5000
seed 42

milestone voyage approved

voyage approved
  -> recruit crew

[outfit ship]
  recruit crew 1 2 4 as rc
    -> load powder 0.5 1 2
  careen hull 1 1.5 2.5
    -> load powder
  load powder
    -> sail to atoll 3 5 8

sail to atoll
  -> count gold 1 2 3
  -> repair hull 2 3 5

count gold
  -> divvy shares 1 2 3
repair hull
  -> divvy shares
```

## Overview

A PERT diagram (Program Evaluation Review Technique) is an Activity-on-Node project network. Each activity carries a three-point estimate — optimistic, most-likely, and pessimistic — and the analyzer computes earliest/latest start/finish times, slack, the M-world critical path, and (when Monte Carlo is enabled) a probability-weighted criticality index plus P50/P80/P95 completion percentiles.

Use it when you want to plan work that has uncertainty and parallelism: launches, expeditions, refactors, releases. Critical-path activities saturate toward the palette accent; off-critical activities stay closer to the surface tint.

## Syntax

```
pert Project Name
time-unit w

milestone kickoff

kickoff
  -> design 1 2 4
design
  -> build 2 3 5
build
  -> ship 1 1 2
```

## Settings

| Key            | Description                                                                       | Default   |
| -------------- | --------------------------------------------------------------------------------- | --------- |
| `pert`         | Required. Optional title follows.                                                 | —         |
| `time-unit`    | One of `d`, `bd`, `w`, `m`, `q`, `y`. Used for μ/σ/ES/EF formatting.              | `d`       |
| `direction`    | `LR` (left-to-right) or `TB` (top-to-bottom).                                     | `LR`      |
| `node-detail`  | `compact` shows name + duration; `full` adds μ ± σ inside the node.               | `compact` |
| `confidence`   | `high` / `medium` / `low`, or an explicit `O P` factor pair. Fills missing O/P.  | `medium`  |
| `analysis`     | `none` or `monte-carlo`. Enables criticality + percentile output.                 | `none`    |
| `trials`       | Monte Carlo trial count for static export.                                        | `10000`   |
| `seed`         | Deterministic seed (integer). Same seed → same output across machines.            | `1`       |

## Activities

Each activity is declared on its own line. The duration estimate follows the name:

```
research 2 3 5             three-point: O M P
prototype 5                 M-only: O and P fill from confidence
demo                        TBD: no estimate yet (poisons descendants)
```

### Three-point Estimates

`name O M P` gives optimistic / most-likely / pessimistic durations. The analyzer uses the Beta-PERT formulas:

- μ = (O + 4M + P) / 6
- σ = (P − O) / 6

### M-only Estimates

`name M` records only the most-likely duration. The analyzer expands O and P from the active `confidence` level (or a per-activity override via `| confidence: low`).

### Aliases

Append `as <id>` to give an activity a stable short id you can reference from edges:

```
recruit crew 1 2 4 as rc
  -> rc.then-load powder 0.5 1 2
```

### Milestones

Zero-duration synchronization points use the `milestone` keyword:

```
milestone kickoff
milestone launch
```

Milestones render as diamonds and never lie on the critical path themselves — they're inert sync points.

## Edges

Dependencies are written with `->` from a child line indented under the predecessor:

```
recruit crew 1 2 4
  -> load powder 0.5 1 2
  -> careen hull 1 1.5 2.5
```

The arrow always points from predecessor to successor. Inline duration on the right-hand side is allowed — the activity is created if it doesn't already exist.

## Groups

Wrap related activities in `[group-name]` to add a dashed bounding rect. Groups with a single entry and single exit are auto-classified as **hammocks** (collapsible into a super-edge); multi-entry/multi-exit groups are **clusters** (collapsible into a bounding rect).

```
[outfit ship]
  recruit crew 1 2 4
    -> load powder 0.5 1 2
  careen hull 1 1.5 2.5
    -> load powder
  load powder
    -> sail to atoll 3 5 8
```

## Monte Carlo Analysis

Add the `analysis monte-carlo` directive to enable probabilistic analysis:

```
analysis monte-carlo
trials 5000
seed 42
```

The renderer then:

- Tints each activity by its **criticality index** (fraction of trials where the activity sits on the longest path). 0 → surface tint, 1 → full accent.
- Adds a **diagonal stripe overlay** to activities with criticality ≥ 0.9 — a non-color signal so deuteranopic readers can still find the modal critical path.
- Prints **P50 / P80 / P95** project-completion percentiles next to the title.

The simulator uses a deterministic mulberry32 PRNG; a given (seed, inputs) tuple produces the same output across machines.

## Reading the Diagram

| Visual | Meaning |
| --- | --- |
| Saturated fill | High criticality — activity is on the longest path most of the time |
| Light tint | Low criticality — activity has slack |
| Diagonal stripes | Criticality ≥ 0.9 (non-color signal) |
| ★ before name | Activity is on the M-world critical path |
| Diamond shape | Milestone (zero duration) |
| Dashed border | Group bounding rect |

## Tips

- For a deterministic Monte Carlo, always pin `seed`. Without it, runs vary.
- High `trials` (≥ 10000) is fine for static export; the live duration scrubber uses a smaller count for responsiveness.
- TBD activities (no estimate) "poison" their descendants — slack stays `null` and the renderer marks them gray. Resolve TBDs before relying on the analysis.
- `confidence: low` widens O/P spreads; `confidence: high` tightens them. Use per-activity overrides for tasks with unusual variance.
