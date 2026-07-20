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

A responsibility matrix mapping **tasks** against **roles**, tagging each cell with a marker for that role's involvement — for clarifying who does what on a project and removing ownership ambiguity. Reach for it when the question is accountability rather than order or status. The `raci` chart type covers three variants — RACI, RASCI, and DACI — with author-time linting against the structural rules of each. **The variant is inferred from the markers you use and cannot be declared.** Mixing marker alphabets therefore silently selects a variant you didn't intend and lints your chart against the wrong rules, so keep one alphabet per chart.

| Variant | Marker alphabet | Constraint |
|---------|-----------------|------------|
| RACI    | `R A C I`       | Exactly one Accountable per task |
| RASCI   | `R A S C I`     | Exactly one Accountable per task |
| DACI    | `D A C I`       | Exactly one Driver and one Approver per task |

The variant is **inferred from the markers used** in the chart — there is no directive to declare it. To get DACI, use `D` markers; to get RASCI, use `S` markers.

## When to use

- **`raci`** — you need to record who is on the hook for which specific task, with no ordering implied.
- **[`org`](chart-org.md)** — you're showing the reporting chain rather than task ownership.
- **[`swimlane`](chart-swimlane.md)** — the *order* of the work matters, not just who owns each part.
- **[`kanban`](chart-kanban.md)** — you're tracking the *status* of work items rather than assigning responsibility.
- **[`heatmap`](chart-heatmap.md)** — your cells hold numbers rather than a kind of involvement.
- **[`tech-radar`](chart-tech-radar.md)** — you're assigning confidence to technologies rather than ownership of tasks.

## Syntax

```
raci Title
// optional directives: roles, palette, theme, active-tag

// optional bracketed phase header + trailing-token color
[Phase Label] color
  // task name — 2-space indent
  Task name
    // description — 4-space indent, before any role line
    Optional description line
    // role assignment — 4-space indent, space-delimited markers
    Role: <markers>
  Another task
    // combined-marker cell
    Role: A R
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
// inline form (name-only)
roles Cap, QM, Bos
```

```
// block form — supports per-role color
roles
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
| `roles` | Declare column order (inline or block form). Required to enable the undeclared-role warning. |
| `palette`, `theme`, `active-tag` | Universal options. |

There is no directive for selecting the variant — it comes from the markers.

## Validation warnings

Structural linting runs on every chart. These fire as warnings, so the diagram still renders:

| Code | Fires when |
|------|------------|
| `W_RACI_MISSING_ACCOUNTABLE` | A task has no Accountable (`A`). |
| `W_RACI_MISSING_RESPONSIBLE` | A task has no Responsible (`R`) — nobody is doing the work. |
| `W_RACI_TOO_MANY_RESPONSIBLE` | A task has more Responsibles than the dilution threshold; split it or downgrade some to Consulted. |
| `W_RACI_CONFLICTING_MARKERS` | One role on one task carries both an active marker (`R`/`A`/`D`) and a passive one (`C`/`I`). |
| `W_RACI_ORPHAN_ROLE` | A role is declared but never assigned to any task. |
| `W_RACI_UNKNOWN_ROLE` | A task assigns a role that `roles` never declared — usually a typo. |
| `W_RACI_EMPTY_TASK` | A task has no role assignments at all. |
| `W_DACI_MISSING_DRIVER` | A DACI task has no Driver (`D`) to move it forward. |
| `W_DACI_MISSING_ACCOUNTABLE` | A DACI task has no Approver (`A`) to sign off. |

Two conditions are errors rather than warnings: `E_RACI_MIXED_VARIANTS` when both
`D` and `S` appear, and `E_RACI_MULTI_ACCOUNTABLE` when a task names more than one
Accountable.

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

Without a phase header, tasks sit at the left margin and role lines take the
2-space indent — each level shifts up by one.

The `D` markers make this a DACI chart by inference — no directive exists to say so explicitly.

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

- **Related:** [`org`](chart-org.md) · [`swimlane`](chart-swimlane.md) · [`kanban`](chart-kanban.md) · [`heatmap`](chart-heatmap.md) · [`tech-radar`](chart-tech-radar.md)
- **Then:** [Colors & palettes](colors.md)
