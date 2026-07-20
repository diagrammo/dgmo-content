```dgmo
gantt Ship Refit
start-date 2026-03-02

Haul Out 5bd
Hull Repairs 10bd
  -> Repaint Hull 4bd
Provision Stores 6bd
```

That is a whole gantt chart. A title line, the date the project starts, and one line per task: a name and a duration. Tasks written at the same level run **in parallel**; an indented `->` line makes a task wait for the one above it. Everything else in this guide — groups, tags, milestones, eras, the critical path — is optional decoration on that shape. See [Complete Example](#complete-example) for what a fully dressed schedule looks like.

> **Dates** — gantt accepts any date format (`2024-01-15`, `1/15`, `Jan 15`) for `start-date`, task `start:`, eras, markers, and holidays. Add a `year 2024` line to write the year just once. See [Writing Dates](writing-dates.md).

## Overview

Lays tasks along a timeline as bars, with dependencies, milestones, and a critical path — the standard for project scheduling and tracking. Reach for it for project schedules and timelines, task dependencies and milestones, or tracking progress against a plan. A gantt bar asserts a **known start and end date**; tasks run in parallel by default, chain with arrow dependencies, and the dates and critical path are calculated for you.

## When to use

- **`gantt`** — you know your dates (or your durations), and you want the schedule: what starts when, what blocks what, what's on the critical path.
- **[`pert`](chart-pert.md)** — your estimates are genuinely uncertain and the question is *what could slip*. Gantt bars project false precision on guessed dates; `pert` exists to carry three-point estimates, slack, and P50/P80/P95.
- **[`kanban`](chart-kanban.md)** — only *what stage* each item is in matters, not *when* it happens. Kanban needs no dates.
- **[`timeline`](chart-timeline.md)** — you're recording what already happened rather than planning work with dependencies.
- **[`countdown`](chart-countdown.md)** — there's one date and the only question is how long is left, not a task list.
- **[`goal`](chart-goal.md)** — you want a single "% there" reading rather than the task list and dates behind it.
- **[`version-control`](chart-version-control.md)** — the parallel tracks are branches that split and rejoin. That's topology, not a calendar; `gantt` places work on real dates.

## Basic Syntax

```
gantt Chart Title
start-date 2024-01-15

Task Name 30bd
Another Task 10d
```

The first line declares the chart type and optional title. `start-date` sets the project start date. Each task line has a name followed by a duration.

## Duration Units

| Unit  | Meaning        |
| ----- | -------------- |
| `d`   | Calendar days  |
| `bd`  | Business days  |
| `w`   | Weeks          |
| `m`   | Months         |
| `q`   | Quarters       |
| `y`   | Years          |
| `h`   | Hours          |
| `min` | Minutes        |
| `sp`  | Sprints        |

The `sp` unit activates sprint mode automatically. See the Settings section for sprint configuration.

## Groups

Groups organize tasks into labeled sections using bracket syntax. Metadata on a group is inherited by all tasks inside it:

```
[Shipyard] c: Sailors
  Hull Repairs 30bd
  Rigging Overhaul 10bd

[Provisions] c: Navigators
  Supply Run 15bd
  Cargo Loading 10bd
```

Groups can be nested:

```
[Ship]
  [Hull]
    Caulking 10bd
    Planking 15bd
  [Rigging]
    Mast Stepping 5bd
```

## Scheduling Model

**Bare siblings are parallel.** Tasks at the same indent level inside a group start at the same time:

```
[Shipyard]
  Hull Repairs 30bd
  Cannon Mounting 5bd
  Deck Sealing 5bd
```

All three tasks above start together.

**Arrows create sequential dependencies.** Use `->` to chain tasks so the next one starts after the previous finishes:

```
[Muster]
  Crew Assembly 10bd
  -> Set Sail 0d
```

"Set Sail" starts after "Crew Assembly" finishes.

## Dependencies

### Basic arrow

Indent an arrow line under a task to define a successor:

```
[Tavern]
  Recruit Crew 10bd
    -> Training Drills 5bd
```

"Training Drills" starts after "Recruit Crew" finishes.

### Cross-group references

Reference a task in another group with `[Group].Task`:

```
[Shipyard]
  Rigging Overhaul 10bd
    -> [Provisions].Cargo Loading

[Provisions]
  Cargo Loading 10bd
```

When the target already exists elsewhere, omit the duration to create a reference-only dependency (no new task is created).

### Lag (delay after predecessor)

Add a duration before the arrow to insert a gap:

```
  Rigging Overhaul 10bd
    -5bd-> [Provisions].Cargo Loading
```

"Cargo Loading" starts 5 business days after "Rigging Overhaul" finishes.

### Lead (overlap with predecessor)

Double the dash to create lead time (negative lag):

```
  Design Review 5bd
    --2w-> Implementation 10bd
```

"Implementation" starts 2 weeks before "Design Review" finishes.

## Offset Prefix

Prefix a task or group with `+Nunit` to offset it from the chart start date:

```
+8bd Chart New Routes 10bd
+2w [Scouting]
  Recon Harbors 5bd
```

"Chart New Routes" starts 8 business days after the chart start. The entire "Scouting" group starts 2 weeks after chart start.

## Milestones

A task with `0d` duration renders as a diamond milestone marker:

```
Set Sail 0d
Release Day 0d
```

## Uncertain Duration

Append `?` to the duration unit to indicate an estimate. The bar fades out over its last 20%:

```
Rigging Overhaul 10bd?
Treasure Hunt 30d?
```

The `?` is a **visual hedge, not a model**. The bar still occupies one definite span, the dependent tasks still start on one definite date, and the critical path is still computed as if the number were certain. It is the right tool for "this one is a bit soft" on a schedule that is otherwise known.

If your estimates are *genuinely* uncertain — if the real question is how much the project could slip — use [`pert`](chart-pert.md) instead. PERT carries three-point estimates (optimistic / most likely / pessimistic), computes slack per task, and reports P50/P80/P95 completion dates. A gantt chart of guessed durations publishes a confident-looking schedule that nobody has any basis for believing.

## Progress

Track completion with `progress:` metadata (0-100):

```
Hull Repairs 30bd progress: 80
Supply Run 15bd progress: 100
```

A filled overlay shows how much of the task is complete.

## Tags

Tag groups categorize tasks with color-coded values. Define a block with `tag Name as alias`, then reference tags in task metadata using the alias:

```
tag Crew as c
  Sailors blue
  Navigators purple
  Lookouts orange

[Shipyard] c: Sailors
  Hull Repairs 30bd
  Cannon Mounting 5bd c: Lookouts
```

The first entry in a tag group is the default. Group-level tags are inherited by child tasks unless overridden.

## Eras and Markers

Eras shade a background region across a time range. Markers draw a vertical line at a single date. Both accept an optional trailing color:

```
era 2024-01-15 -> 2024-02-15 Harbor Preparations
era 2024-03-10 -> 2024-03-14 Storm Season purple
marker 2024-02-26 Admiral Inspection
marker 2024-04-08 Landfall orange
```

Eras and markers also support block syntax for multiple entries:

```
era
  2024-01-15 -> 2024-02-15 Harbor Preparations
  2024-03-10 -> 2024-03-14 Storm Season purple

marker
  2024-02-26 Admiral Inspection
  2024-04-08 Landfall orange
```

## Holidays and Workweek

Define non-working days inside a `holiday` block. Business day durations (`bd`) automatically skip holidays and non-workdays:

```
holiday
  1718-12-25 Christmas
  1718-12-31 -> 1719-01-01 New Year

workweek sun-thu
```

The default workweek is Mon-Fri. Override with `workweek` using a day range (`sun-thu`) or comma-separated days (`mon, tue, wed, thu`).

## Swimlane Mode

Use `lane-by GroupName` to reorganize the chart into horizontal swimlanes grouped by tag value:

```
lane-by Crew

tag Crew as c
  Sailors blue
  Navigators purple

[Shipyard] c: Sailors
  Hull Repairs 30bd
[Navigation] c: Navigators
  Chart Routes 10bd
```

Each tag value gets its own collapsible lane. It's named `lane-by` rather than `swimlane` because `swimlane` is its own chart type. `sort tag:GroupName` is an accepted back-compat spelling of the same thing. This directive is persisted from the app's swimlane picker, so it lives in the source and every renderer honors it. In the app, click the swimlane icon on a tag pill to switch between swimlane groups.

## Settings

| Setting          | Description                                              | Default    |
| ---------------- | -------------------------------------------------------- | ---------- |
| `start-date`     | Project start date (`YYYY-MM-DD`)                        | Today      |
| `today-marker`   | Show today marker (bare keyword or `YYYY-MM-DD`)         | off        |
| `critical-path`  | Highlight the critical path                              | off        |
| `no-dependencies`| Hide dependency arrows                                   | shown      |
| `sort`           | Task layout: `tag` or `tag:GroupName` for swimlanes      | `default`  |
| `active-tag`     | Group to color by (first declared is active by default; `none` suppresses) | first group |
| `fill-solid`     | Render bars at full saturation instead of 25% tint       | off        |
| `no-title`       | Suppress the chart banner title                          | off        |
| `sprint-length`  | Sprint duration (`2w`, `10d`)                            | `2w`       |
| `sprint-number`  | Which sprint the chart starts at                         | `1`        |
| `sprint-start`   | Date that `sprint-number` begins (`YYYY-MM-DD`)          | chart start|

Settings are bare keywords (no colons). Boolean settings toggle on by writing the keyword and off with `no-` prefix (e.g., `no-dependencies`).

### Sprint Mode

Sprint mode activates automatically when any task uses the `sp` duration unit, or explicitly via `sprint-*` settings:

```
gantt Pirate Sprint Raid
start-date 2026-03-01
sprint-length 2w
sprint-number 5
sprint-start 2026-01-05

[Scouts]
  Recon Harbors 2sp
  Map Defenses 1sp
```

## Comments

Lines starting with `//` are ignored. Comments can appear at the top level or indented under a task:

```
[Shipyard]
  Hull Repairs 30bd
  // Blocked until dry dock is available
  Rigging Overhaul 10bd
```

## Common mistakes

### Writing a date into the task name

A task line is `Name` then `duration`. The duration is read from the **last token**, and everything before it becomes the name — so a bare date in the middle is absorbed into the name and changes nothing about the schedule:

```
Provision Ship 2026-03-01 5d
```

That creates a task literally named `Provision Ship 2026-03-01`, starting at the chart start date, not in March. **It validates clean** — nothing warns you. The tell is the task label on the rendered bar and a timeline that begins on the wrong date.

To pin a task to a real date, use the full key-value form, where both the duration and the start are named:

```
Provision Ship duration: 5d, start: 2026-03-01
```

Mixing the two forms does not work: in `Provision Ship 5d start: 2026-03-01` the `5d` is absorbed into the name. Either write both keys, or use the [offset prefix](#offset-prefix) (`+2m Provision Ship 5d`) to place the task relative to the chart start.

### Publishing guesses as a schedule

A gantt bar asserts a definite start and end. The `?` suffix fades the bar's tail but changes no arithmetic — dependent tasks and the critical path are still computed as if the number were certain. If the real question is *how much could this slip*, use [`pert`](chart-pert.md), which carries three-point estimates and reports P50/P80/P95. See [Uncertain Duration](#uncertain-duration).

### Trailing comments on a task line

Comments are **full-line only**. A `//` placed after content is absorbed into the value rather than stripped:

```
// Blocked until the dry dock frees up
Hull Repairs 30bd
```

## Complete Example

```dgmo
gantt Voyage to Treasure Island
start-date 2024-01-15
today-marker 2024-03-01
critical-path

tag Crew as c
  Sailors blue
  Navigators purple
  Lookouts orange

tag Phase as p
  Outfitting green
  Voyage orange

era 2024-01-15 -> 2024-02-15 Harbor Preparations
era 2024-03-10 -> 2024-03-14 Storm Season purple
marker 2024-02-26 Admiral Inspection
marker 2024-04-08 Landfall orange

[Shipyard] c: Sailors, p: Outfitting
  Hull Repairs 18bd progress: 100
    -> Rigging Overhaul 7bd? progress: 100
  Cannon Mounting 8bd c: Lookouts, progress: 100
    -> Deck Sealing 5bd c: Lookouts, progress: 80
  Supply Run 20bd c: Navigators, progress: 70

+25bd [Voyage] c: Sailors, p: Voyage
  Chart New Routes 8bd c: Navigators, progress: 60
    -> Open Water Run 20bd progress: 15
  Storm Watch 25bd? c: Lookouts, progress: 25
  Daily Drills 18bd progress: 20
    -> Mutiny Drill 3bd? progress: 0

+55bd [Landfall] c: Lookouts, p: Voyage
  Recon Beach 3bd
    -> Dig Treasure 6bd c: Sailors
      -> Load Hold 4bd c: Sailors
        -> Set Sail 0d
  Guard Camp 9bd
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

- **Related:** [`pert`](chart-pert.md) · [`kanban`](chart-kanban.md) · [`timeline`](chart-timeline.md) · [`countdown`](chart-countdown.md) · [`goal`](chart-goal.md)
- **Then:** [Colors & palettes](colors.md) · [Writing dates](writing-dates.md)
