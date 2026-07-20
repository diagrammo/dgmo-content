```dgmo
kanban Plunder Sprint 7

tag Priority
  Urgent red
  High orange
  Low green default

tag Crew as c
  Blackbeard red
  Anne Bonny purple
  Calico Jack teal

[Awaiting Orders] red
  Recruit gunners at Tortuga priority: High, c: Calico Jack
  Chart new trade route priority: Urgent, c: Anne Bonny
    Scout the Windward Passage
    Avoid Royal Navy patrols
  Resupply rum and powder priority: Low, c: Calico Jack

[Underway] orange wip: 2
  Forge letters of marque priority: High, c: Anne Bonny
  Raid merchant convoy priority: Urgent, c: Blackbeard
    Three ships spotted off Nassau

[Done] green
  Bribe the harbour master priority: High, c: Anne Bonny
  Repair hull damage priority: Low, c: Blackbeard
```

## Overview

A kanban board shows **what the team is working on right now**: cards sorted into columns that represent stages of work, moving left to right toward done. Reach for it for tracking work in progress, sorting tasks by stage or status, and sprint or backlog boards. Cards carry tags for color-coded categorization (owner, priority, team) plus freeform detail text, and columns can enforce work-in-progress limits.

A kanban board has **no time dimension** — a card sits in a stage, and nothing in the diagram says when it will move. If the question is "what's left before launch," you need dates, not stages.

**Drag-and-drop:** In the app, drag cards between columns or reorder within a column. The editor text updates automatically.

## When to use

- **`kanban`** — you care about what *stage* each item is in, right now.
- **[`gantt`](chart-gantt.md)** — *when* each item happens matters. Kanban has no dates, so "will we make the deadline?" is unanswerable on a board.
- **[`state`](chart-state.md)** — the diagram is about the *rules* that move something between conditions, not about actual work items sitting in stages.
- **[`raci`](chart-raci.md)** — you're assigning *responsibility* for tasks rather than tracking status.
- **[`tech-radar`](chart-tech-radar.md)** — you're rating the maturity or adoption of tools, not moving work through stages.
- **[`goal`](chart-goal.md)** — you want one aggregate "% there" number instead of many items in various stages.

## Syntax

```
kanban Board Title

[Column Name]
  Card Title
  Card Title key: Value, key: Value
    Freeform detail text
    Another detail line
```

Cards are **indented** under their column header, and detail lines are indented
one level deeper again. An un-indented line after a column header is not a card —
it warns as stray text.

## Settings

Directives go on their own line, before the columns. The board title is the rest
of line 1 (`kanban Plunder Sprint 7`) — there is no `title` directive.

| Directive | Effect | Default |
| --------- | ------ | ------- |
| `active-tag <Group>` | Which tag group colors the cards (`none` suppresses) | first declared |
| `lane-by <Group>` | Slice the board into horizontal swimlanes by a tag group | off |
| `hide <key>[, <key>]` | Accepted for parity with `org`; kanban cards render all their metadata, so this currently has no visible effect | none |

## Columns

Columns are defined with `[Column Name]` syntax. All cards between one column header and the next belong to that column.

Kanban columns model a workflow pipeline. Cards move left to right as work progresses. Each column should answer "what stage is this work in?" If something isn't a stage — like acceptance criteria, decision gates, or definitions of done — model it as a tag on cards rather than a separate column.

```
[To Do]
[In Progress]
[Done]
```

### Column Header Tokens

Everything after the closing `]` is optional, and reads in a fixed order:

```
[Column Name] <color> as <alias> <key>: <value>, … collapsed
```

Each piece is independent — use any, all, or none.

| Token | Effect |
| ----- | ------ |
| trailing color | Tints the column header. A bare palette color name straight after the bracket: `[Awaiting Orders] red`. |
| `as <alias>` | A short stable id (≤12 chars, letter first) for the column, so tooling and the app's drag handlers can reference it after a rename. |
| `wip: N` | Work-in-progress limit — see below. |
| `collapsed` | The column renders collapsed by default. Peeled off the end, so it composes with everything before it. |

```
[Awaiting Orders] red
[Underway] orange wip: 2
[Shipped] green as done collapsed
```

Because `collapsed` lives in the source, it's portable view-state: every renderer
reproduces the collapsed board from the `.dgmo` alone, and collapsing a column in
the app writes the marker back into the source.

### WIP Limits

Add `wip: N` after a column header to set a work-in-progress limit. A warning appears when the limit is exceeded:

```
[In Progress] wip: 3
```

## Cards

Each line indented under a column header creates a card. Cards can have tags and detail lines.

### Tags

Tags follow the card title. Multiple tags are comma-separated:

```
[In Progress]
  Build login priority: High, assignee: Alice
```

### Detail Lines

Lines indented deeper than a card are freeform detail text:

```
[In Progress]
  Build login priority: High
    OAuth + email/password support
    Needs design review first
```

### Card Colors

Cards have **no trailing-color form** — a card title is taken literally, so
`Urgent fix red` is a card called "Urgent fix red". That keeps titles like
"Ship the blue theme" intact.

Color cards by giving them a tag instead. The tag's color shows as a dot on the
card and earns a legend entry, which a bare color could not:

```
tag Priority
  Urgent red
  Normal green default

[In Progress]
  Fix the leak priority: Urgent
```

A trailing color *is* available one level up, on the column header — see
*Column Header Tokens*.

## Tag Groups

Tag groups define categories with color-coded values. They appear before columns and use the `tag` directive:

```
tag Priority
  High red
  Medium yellow
  Low green default

tag Assignee as a
  Alice blue
  Bob purple
```

- `default` marks the fallback value for cards without an explicit tag
- `as <alias>` provides a short name for the tag key (e.g., `a` instead of `assignee`)
- Colors are shown as dots on each card
- The **first declared group is active by default** and drives the card colors

### `active-tag`

With one tag group there's nothing to set. Once you declare two or more, use
`active-tag <GroupName>` on its own line to pick which one colors the cards;
`active-tag none` suppresses coloring entirely.

```
kanban Sprint Board
active-tag Team

tag Priority
  High red
  Low green

tag Team as t
  Frontend blue
  Backend purple

[In Progress]
  Login page t: Frontend, priority: High
```

Because it lives in the source, a shared or exported board keeps the same
coloring dimension, and every renderer honors it.

## Swimlanes

Slice the board into horizontal swimlanes by a tag group with `lane-by GroupName`. Each tag value gets its own lane, so cards split into rows (by owner, team, priority) while keeping their columns:

```
kanban Sprint Board
lane-by Team

tag Team as t
  Frontend blue
  Backend purple

[To Do]
  Login page t: Frontend
  Rate limiting t: Backend

[Done]
  Landing page t: Frontend
```

It's named `lane-by` rather than `swimlane` because `swimlane` is its own chart type. This directive is persisted from the app's swimlane picker, so it lives in the source and every renderer honors it.

## Complete Example

```dgmo
kanban Product Roadmap

tag Status
  Blocked red
  Active green default

tag Team as t
  Frontend blue
  Backend purple
  Design yellow

[Backlog]
  Dark mode support t: Frontend
  API rate limiting t: Backend
    Research token bucket vs sliding window

[In Progress] orange wip: 3
  User dashboard t: Frontend, status: Active
    Charts and metrics overview
  Auth refactor t: Backend, status: Active

[Review]
  Payment integration t: Backend, status: Blocked
    Waiting on Stripe webhook setup

[Done] green collapsed
  Onboarding flow t: Design
  Landing page t: Frontend
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

- **A card written outside a column disappears.** Cards must be indented under a `[Column]` bracket line; one at the top level is dropped with no diagnostic. Count the cards in the render.
- **Columns read left to right in file order.** The first column you write is the leftmost, so write them in the order work actually flows.
- **Same-line metadata separates pairs with commas**, so a value containing a comma splits early. Move it to an indented line.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`gantt`](chart-gantt.md) · [`state`](chart-state.md) · [`raci`](chart-raci.md) · [`tech-radar`](chart-tech-radar.md) · [`goal`](chart-goal.md)
- **Then:** [Colors & palettes](colors.md)
