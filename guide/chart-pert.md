# PERT Diagram

```dgmo
pert Pirate Voyage to the Atoll
time-unit w
confidence medium
trials 5000
seed 42

milestone voyage approved

voyage approved
  -> recruit crew

[outfit ship]
  recruit crew 1 2 4 as rc
    -> load powder
  careen hull 1 1.5 2.5
    -> load powder
  load powder 0.5 1 2
    -> sail to atoll

sail to atoll 3 5 8
  -> count gold
  -> repair hull

count gold 1 2 3
  -> divvy shares

repair hull 2 3 5
  -> divvy shares

divvy shares 1 2 3
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
  -> design

design 1 2 4
  -> build

build 2 3 5
  -> ship

ship 1 1 2
```

Every activity is declared on its own non-indented source-line with its duration estimate. Arrow lines (`-> name`) only carry a name — they are pure references, never declarations. This keeps every activity's attributes in exactly one place.

## Settings

| Key            | Description                                                                       | Default   |
| -------------- | --------------------------------------------------------------------------------- | --------- |
| `pert`         | Required. Optional title follows.                                                 | —         |
| `time-unit`    | One of `d`, `bd`, `w`, `m`, `q`, `y`. Used for μ/σ/ES/EF formatting.              | `d`       |
| `direction`    | `LR` (left-to-right) or `TB` (top-to-bottom).                                     | `LR`      |
| `node-detail`  | `compact` shows name + duration; `full` adds μ ± σ inside the node.               | `compact` |
| `confidence`   | `high` / `medium` / `low`, or an explicit `O P` factor pair. Fills missing O/P.  | `medium`  |
| `trials`       | Monte Carlo trial count for static export. Below 100 falls back to analytical.    | `10000`   |
| `seed`         | Deterministic seed (integer). Same seed → same output across machines.            | `1`       |

## Activities

Each activity is declared on its own non-indented source-line. The duration estimate follows the name:

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

Append `as <id>` to give an activity a stable short id you can reference from later edges:

```
recruit crew 1 2 4 as rc

load powder 0.5 1 2

rc
  -> load powder
```

A bare alias source-line (`rc`) resolves to the canonical activity, so subsequent arrows attach to the original. Aliases must be declared on the activity's source-line — not on an arrow line.

### Milestones

Zero-duration synchronization points use the `milestone` keyword:

```
milestone kickoff
milestone launch
```

Milestones render as diamonds and never lie on the critical path themselves — they're inert sync points.

## Edges

Dependencies are written with `->` from a child line indented under the predecessor. Arrow lines may only carry a destination name (or an existing alias) — durations, `as <alias>`, and pipe metadata must live on the target's own source-line:

```
recruit crew 1 2 4
  -> load powder
  -> careen hull

load powder 0.5 1 2
careen hull 1 1.5 2.5
```

Inline forward-declarations (`-> load powder 0.5 1 2`) are rejected — readers should always know to look at a non-indented line for an activity's attributes.

## Groups

Wrap related activities in `[group-name]` to add a dashed bounding rect. Groups with a single entry and single exit are auto-classified as **hammocks** (collapsible into a super-edge); multi-entry/multi-exit groups are **clusters** (collapsible into a bounding rect).

```
[outfit ship]
  recruit crew 1 2 4
    -> load powder
  careen hull 1 1.5 2.5
    -> load powder
  load powder 0.5 1 2
    -> sail to atoll

sail to atoll 3 5 8
```

## Monte Carlo Analysis

Monte Carlo runs **automatically** whenever at least one non-milestone activity carries an O/M/P triple (e.g. `recruit crew 1 2 4`). No directive needed — the data tells the analyzer what kind of analysis it can perform.

```
trials 5000
seed 42

recruit crew 1 2 4
  -> sail

sail 3 5 8
```

`trials < 100` clamps mode back to analytical (with a one-line caveat in the project-stats caption) — small samples produce nonsense percentiles. The legacy `analysis monte-carlo` directive is reserved-but-inert: it parses with a non-blocking warning so older `.dgmo` files keep rendering.

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
