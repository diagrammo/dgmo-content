# RACI Matrix

```dgmo
raci Voyage Operations
roles
  Cap  | color: red
  QM   | color: orange
  Bos  | color: yellow
  Nav  | color: blue
  Crew | color: gray

[Departure] | color: teal
  Plot the course
    Heading, currents, weather window
    Cap: A
    Nav: R
    QM: C
  Provision the hold
    QM: A R
    Cap: C
    Crew: I

[At Sea] | color: purple
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

[Phase Label] | color: <name>       // optional bracketed phase header
  Task name                         // 2-space indent
    Optional description line       // 4-space indent, before any role line
    Role: <markers>                 // 4-space indent, space-delimited markers
  Another task
    Role: A R                       // combined-marker cell
```

Three-level indentation: phase → task → role assignment / description. Phase headers are optional; tasks without a phase are valid.

## Variant resolution

The parser resolves the variant in this order:

1. **Explicit lock.** If a `variant-raci`, `variant-rasci`, or `variant-daci` directive is present, the chart locks to that variant.
2. **Inference from markers.** Any `D` → DACI. Any `S` → RASCI. Otherwise → RACI.
3. **Mixed-marker conflict.** If both `D` and `S` appear without a lock, fires `E_RACI_MIXED_VARIANTS` with a hint to add a `variant-*` directive.

The resolved variant is shown in the rendered chart's header label.

## Roles

Declare column order with the `roles` directive. Two equivalent forms:

```
roles Cap, QM, Bos                    // inline form (name-only)
```

```
roles                                 // block form — supports per-role pipe metadata
  Cap | color: red
  QM  | color: orange
  Bos | color: yellow
```

When `roles` is present, any role used in a task assignment that wasn't declared emits the `W_RACI_UNKNOWN_ROLE` warning.

Per-role color uses the universal pipe-metadata form (`| color: <name>`) and resolves through the active palette. The inline form is name-only; to color roles, use the block form.

## Phase metadata

Phase headers accept pipe metadata for per-phase styling:

```
[Departure] | color: teal
[At Sea] | color: purple
```

The phase bar tints to a soft mix of the color over the background. Phases without metadata fall back to a neutral gray bar.

## Directives

| Directive | Effect |
|-----------|--------|
| `variant-raci`, `variant-rasci`, `variant-daci` | Lock the chart to a specific variant. Markers outside the alphabet error. At most one per chart. |
| `roles` | Declare column order (inline or block form). Required to enable the unknown-role warning. |
| `palette`, `theme`, `active-tag` | Universal options. |

## Diagnostics

Errors block rendering; warnings are non-blocking and shown alongside the chart.

| Code | Severity | Fires when |
|------|----------|------------|
| `E_RACI_MULTI_ACCOUNTABLE` | error | RACI/RASCI task has more than one A |
| `E_DACI_MULTI_DRIVER` | error | DACI task has more than one D |
| `E_DACI_MULTI_ACCOUNTABLE` | error | DACI task has more than one A |
| `E_RACI_INVALID_MARKER` | error | Marker isn't in the resolved variant's alphabet |
| `E_RACI_UNEXPECTED_LINE` | error | Free-text line appears after the first role assignment |
| `E_RACI_MIXED_VARIANTS` | error | Both `D` and `S` markers appear without a `variant-*` lock |
| `E_RACI_DUPLICATE_VARIANT` | error | More than one `variant-*` directive in the chart |
| `W_RACI_MISSING_ACCOUNTABLE` | warning | RACI/RASCI task has no A |
| `W_RACI_MISSING_RESPONSIBLE` | warning | RACI/RASCI task has no R |
| `W_DACI_MISSING_DRIVER` | warning | DACI task has no D |
| `W_DACI_MISSING_ACCOUNTABLE` | warning | DACI task has no A |
| `W_RACI_UNKNOWN_ROLE` | warning | Role used without being declared in `roles` |

There is no source-level suppression — by design, source should not silently mute the linter.

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

The `D` markers infer DACI without a `variant-*` directive. To lock the variant explicitly (for empty/sparse charts, or to catch a typo'd marker that would otherwise flip inference), add `variant-daci` after the title line.
