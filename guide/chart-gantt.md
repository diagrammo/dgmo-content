# Gantt Chart

```dgmo
gantt Voyage to Treasure Island
start 2024-01-15
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

+8bd Chart New Routes 10bd c: Navigators, p: Outfitting

[Shipyard] c: Sailors
  Hull Repairs 30bd p: Outfitting, progress: 80
  Rigging Overhaul 10bd? p: Outfitting, progress: 100
    -5bd-> [Provisions].Cargo Loading
  Cannon Mounting 5bd c: Lookouts, p: Voyage
  Deck Sealing 5bd c: Lookouts, p: Voyage

[Provisions] c: Navigators
  Supply Run 15bd p: Outfitting
  Cargo Loading 10bd c: Sailors, p: Voyage
  Final Stowage 5bd p: Voyage, progress: 30

[Muster] c: Lookouts
  Crew Assembly 10bd
  -> Set Sail 0d
```

## Overview

Gantt charts visualize project schedules as horizontal bars on a time axis. Tasks have positional durations, can be grouped, run in parallel by default, and linked sequentially with arrow dependencies. The renderer automatically calculates dates and highlights the critical path.

## Basic Syntax

```
gantt Chart Title
start 2024-01-15

Task Name 30bd
Another Task 10d
```

The first line declares the chart type and optional title. `start` sets the project start date. Each task line has a name followed by a duration.

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
| `s`   | Sprints        |

The `s` unit activates sprint mode automatically. See the Settings section for sprint configuration.

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

Use `sort tag:Name` to reorganize the chart into horizontal swimlanes grouped by tag value:

```
sort tag:Crew

tag Crew as c
  Sailors blue
  Navigators purple

[Shipyard] c: Sailors
  Hull Repairs 30bd
[Navigation] c: Navigators
  Chart Routes 10bd
```

Each tag value gets its own collapsible lane. In the app, click the swimlane icon on a tag pill to switch between swimlane groups.

## Settings

| Setting          | Description                                              | Default    |
| ---------------- | -------------------------------------------------------- | ---------- |
| `start`          | Project start date (`YYYY-MM-DD`)                        | Today      |
| `today-marker`   | Show today marker (bare keyword or `YYYY-MM-DD`)         | off        |
| `critical-path`  | Highlight the critical path                              | off        |
| `no-dependencies`| Hide dependency arrows                                   | shown      |
| `sort`           | Task layout: `tag` or `tag:GroupName` for swimlanes      | `default`  |
| `active-tag`     | Pre-select a tag group for filtering                     | none       |
| `solid-fill`     | Render bars at full saturation instead of 25% tint       | off        |
| `no-title`       | Suppress the chart banner title                          | off        |
| `sprint-length`  | Sprint duration (`2w`, `10d`)                            | `2w`       |
| `sprint-number`  | Which sprint the chart starts at                         | `1`        |
| `sprint-start`   | Date that `sprint-number` begins (`YYYY-MM-DD`)          | chart start|

Settings are bare keywords (no colons). Boolean settings toggle on by writing the keyword and off with `no-` prefix (e.g., `no-dependencies`).

### Sprint Mode

Sprint mode activates automatically when any task uses the `s` duration unit, or explicitly via `sprint-*` settings:

```
gantt Pirate Sprint Raid
start 2026-03-01
sprint-length 2w
sprint-number 5
sprint-start 2026-01-05

[Scouts]
  Recon Harbors 2s
  Map Defenses 1s
```

## Comments

Lines starting with `//` are ignored. Comments can appear at the top level or indented under a task:

```
[Shipyard]
  Hull Repairs 30bd
  // Blocked until dry dock is available
  Rigging Overhaul 10bd
```

## Complete Example

```dgmo
gantt Voyage to Treasure Island
start 2024-01-15
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

+8bd Chart New Routes 10bd c: Navigators, p: Outfitting

[Shipyard] c: Sailors
  Hull Repairs 30bd p: Outfitting, progress: 80
  Rigging Overhaul 10bd? p: Outfitting, progress: 100
    -5bd-> [Provisions].Cargo Loading
  Cannon Mounting 5bd c: Lookouts, p: Voyage
  Deck Sealing 5bd c: Lookouts, p: Voyage

[Provisions] c: Navigators
  Supply Run 15bd p: Outfitting
  Cargo Loading 10bd c: Sailors, p: Voyage
  Final Stowage 5bd p: Voyage, progress: 30

[Muster] c: Lookouts
  Crew Assembly 10bd
  -> Set Sail 0d
```
