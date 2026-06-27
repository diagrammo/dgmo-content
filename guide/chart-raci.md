```dgmo
raci Voyage Operations
roles
  Cap  red
  QM   orange
  Bos  yellow
  Nav  blue
  Crew gray

[Departure] teal
  Plot the course
    Heading, currents, weather window
    Cap: A
    Nav: R
    QM: C
  Provision the hold
    QM: A R
    Cap: C
    Crew: I

[At Sea] purple
  Stand the watch
    Bos: A
    Crew: R
  Sight the next port
    Nav: A R
    Cap: C
```

## Overview

A RACI matrix maps **tasks** against **roles** and tags each cell with a marker indicating that role's responsibility for that task. The `raci` chart type covers three variants — RACI, RASCI, and DACI — with author-time linting against the structural rules of each.

| Variant | Marker alphabet | Constraint |
|---------|-----------------|------------|
| RACI    | `R A C I`       | Exactly one Accountable per task |
| RASCI   | `R A S C I`     | Exactly one Accountable per task |
| DACI    | `D A C I`       | Exactly one Driver and one Approver per task |

The variant is **inferred from the markers used** in the chart. An optional `variant-*` directive locks it explicitly.

## Syntax

```
raci Title
[directives]                        // optional: roles, variant-*, palette, theme

[Phase Label] color                 // optional bracketed phase header + trailing-token color
  Task name                         // 2-space indent
    Optional description line       // 4-space indent, before any role line
    Role: <markers>                 // 4-space indent, space-delimited markers
  Another task
    Role: A R                       // combined-marker cell
```

Three-level indentation: phase → task → role assignment / description. Phase headers are optional; tasks without a phase are valid.

## Variant resolution

The variant is inferred from the markers you use:

1. Any `D` marker → **DACI**.
2. Any `S` marker → **RASCI**.
3. Otherwise → **RACI**.
4. **Mixed-marker conflict.** If both `D` and `S` appear, fires `E_RACI_MIXED_VARIANTS` — a chart can't be both DACI and RASCI.

The resolved variant is shown in the rendered chart's header label.

## Roles

Declare column order with the `roles` directive. Two equivalent forms:

```
roles Cap, QM, Bos                    // inline form (name-only)
```

```
roles                                 // block form — supports per-role color
  Cap red
  QM  orange
  Bos yellow
```

When `roles` is present, any role used in a task assignment that wasn't declared emits the `W_RACI_UNKNOWN_ROLE` warning.

Per-role color uses the universal trailing-token form (`Cap red`) — same as cycle / pyramid / ring / boxes-and-lines layers. The inline form is name-only; to color roles, use the block form. The same-line form (`Cap color: red`) is also accepted, but reserve it for when another metadata key rides along.

## Phase metadata

Phase headers accept a trailing-token color for per-phase styling:

```
[Departure] teal
[At Sea] purple
```

The phase bar tints to a soft mix of the color over the background. Phases without color fall back to a neutral gray bar.

## Directives

| Directive | Effect |
|-----------|--------|
| `roles` | Declare column order (inline or block form). Required to enable the unknown-role warning. |
| `palette`, `theme`, `active-tag` | Universal options. |

## Display vs source ordering

Markers in cells are always **rendered in canonical alphabet order** (`R A C I`, `R A S C I`, `D A C I`) regardless of source order. Source casing and order are preserved in the file; mutations operate on source order to keep round-trips byte-stable except for the cell that changed.

## Complete Example — DACI

```dgmo
raci Choose the next port
roles Cap, Nav, QM, Bos

  Pick destination
    Cap: D
    Nav: A
    QM: C
    Bos: I

  Decide departure window
    Cap: D
    Nav: C
    QM: A
    Bos: I
```

The `D` markers make this a DACI chart by inference — no directive needed.
