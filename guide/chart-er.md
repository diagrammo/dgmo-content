```dgmo
er Pirate Fleet

ships
  id int pk
  name varchar
  ship_type varchar
  cannons int
  1-aboard-* crew_members
  1-1 captains
  1-carries-* treasure

captains
  id int pk
  name varchar
  ship_id int fk
  bounty int
  ?-frequents-1 ports

crew_members
  id int pk
  name varchar
  ship_id int fk
  role varchar nullable

treasure
  id int pk
  name varchar
  value int
  ship_id int fk nullable

ports
  id int pk
  name varchar
  region varchar unique
  1-docks-* ships
```

## Overview

An **ER diagram** describes a database schema: the tables, the columns and keys inside each one, and how many rows on one side link to how many on the other. Reach for it when the *data model* is the thing you need to communicate — designing a schema, reviewing a migration, or onboarding someone to an unfamiliar database. Write each table on its own line, indent its columns beneath it, and indent a cardinality line to draw the relationship; the boxes are arranged for you.

## When to use

- **`er`** — you need primary keys, foreign keys, and crow's-foot cardinality between database tables.
- **[`class`](chart-class.md)** — you're describing *code* rather than storage: objects with methods, inheritance, and interfaces. `class` has no keys and no cardinality, so a schema drawn as a class diagram silently drops exactly the constraint information you were trying to show.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — you only need to show which things talk to which, with no keys and no row counts.

## Syntax

```
er Diagram Title
notation crowsfoot

TableName color
  column_name type constraints
  1-label-* TargetTable
```

The first line declares the chart type and the title — there is no separate `title` directive.

## Settings

| Key        | Description             | Default     |
| ---------- | ----------------------- | ----------- |
| `notation` | `crowsfoot` or `labels` | `crowsfoot` |
| `active-tag` | Tag group to color tables by | first declared |

## Tables

Declare a table on an unindented line. Columns are indented below:

```
ships
  id int pk
  name varchar
  cannons int
```

### Colors

Colors are auto-assigned from the palette. Override with a bare palette color word as the last token on the table line:

```
ships blue
treasure red
```

## Columns

Indented lines under a table are parsed as columns.

### Format

Columns are **space-separated** — no colons, no brackets:

```
  column_name type constraints
```

All parts except the name are optional:

```
  // name + type + constraint
  id int pk
  // name + type
  name varchar
  // name + constraint
  active nullable
  // name only
  notes
```

### Constraints

Constraints follow the type as further space-separated tokens. Multiple constraints are separated by spaces, not commas:

| Constraint | Icon | Meaning     |
| ---------- | ---- | ----------- |
| `pk`       | ♦    | Primary key |
| `fk`       | →    | Foreign key |
| `unique`   | ◆    | Unique      |
| `nullable` | ○    | Nullable    |

```
  id int pk
  name varchar unique nullable
  ship_id int fk
```

## Relationships

Relationships connect two tables with cardinality on each side. A relationship line is **indented under its source table**, alongside that table's columns — the source is the table you nested it in, so you never repeat its name.

### Cardinality Values

| Symbol | Meaning     | Crow's foot        |
| ------ | ----------- | ------------------ |
| `1`    | Exactly one | Perpendicular bar  |
| `*`    | Many        | Three-pronged fork |
| `?`    | Zero or one | Circle + bar       |

### Syntax

Write the source cardinality, dashes, the target cardinality, then the target table — all indented under the source:

```
ships
  id int pk
  1--* crew_members
  ?--1 captains
```

Single dash also works (`1-* crew_members`).

> A relationship written at the left margin (`ships 1--* crew_members`) is **not** drawn — it warns that it must be indented under the source table. Indentation is what names the source.

### Labels

Put the label **between the dashes**, not after a colon:

```
ships
  1-aboard-* crew_members
  1-commanded by-1 captains
```

Both single and double dashes delimit the label (`1--sails on--*` works too). The label renders along the relationship line.

## Notation Modes

### Crow's Foot (default)

Cardinality is shown as graphical markers at each end of the relationship line:

- **One (1):** perpendicular bar
- **Many (\*):** three-pronged fork
- **Optional (?):** circle with perpendicular bar

### Labels Mode

Switch to text labels by adding `notation labels`:

```
er
notation labels
```

This replaces crow's foot markers with text like `1`, `*`, and `0..1`.

## Semantic Colors

By default, ER diagrams tint columns by their key role — primary keys and foreign keys get distinct semantic colors so the schema's structure reads at a glance. Add `no-semantic-colors` on its own line to turn this off and render every column neutral:

```
er
no-semantic-colors

ships
  id int pk
  name varchar
  home_port int fk
```

This directive is persisted from the app's **Semantic colors** toggle, so it lives in the `.dgmo` source — a shared or exported diagram keeps whichever choice you made, and every renderer honors it.

## Tags

Tag groups color tables by a facet you choose — the owning service, the bounded context, the lifecycle stage — and add a labeled legend. Declare a `tag <Group>` block (optionally `as <alias>` for a short key) **before the first table**, list one value per indented line with a palette color, then apply a value to a table as same-line metadata:

```dgmo
er Fleet Schema

tag Domain as dom
  Voyages blue
  Ledger orange

ships dom: Voyages
  id int pk
  name varchar
  1-aboard-* crew_members

crew_members dom: Voyages
  id int pk
  ship_id int fk
  1-hauls-* plunder

plunder dom: Ledger
  id int pk
  value int
```

An entry with no color word is auto-assigned one from the palette. The first value listed is the group's default; mark a different one with a trailing `default`. When several tag groups are declared, `active-tag <Group>` picks which one drives the fills and the legend.

## Notes

Attach a hide-able annotation to a table with `note <Table> text`. The note floats beside the table as a folded-corner box (it never moves the table). Indent lines below the heading for a multi-line body with bullets and inline markdown; end the heading with a lowercase color word to recolor it. `no-notes` suppresses every note.

```
er
ships
  id int pk
  name varchar

note ships the flagship table — every voyage starts here
note ships red
  Tracks:
  - one **captain** per hull
  - the crew manifest
```

## Comments

```
// This line is ignored by the parser
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

## Complete Example

```dgmo
er Pirate Ports

ports blue
  id int pk
  name varchar
  region varchar unique
  1-home of-* ships
  1-targeted-* raids

ships
  id int pk
  name varchar
  home_port int fk
  cannons int
  1-commanded by-1 captains
  1-launched-* raids

captains green
  id int pk
  name varchar
  ship_id int fk
  bounty int

raids
  id int pk
  ship_id int fk
  port_id int fk
  date date
  plunder int nullable
```

## Common mistakes

- **The cardinality reads from the source table outward.** On a line indented under `ships`, `1-aboard-* crew_members` says one ship has many crew members. Reversing it validates cleanly and draws a plausible diagram that asserts the opposite constraint — which is the one thing an ER diagram exists to prevent.
- **Relationships must be indented under the source table.** A top-level `Customer 1--* Order` is dropped with a warning and no line is drawn.
- **Columns are space-separated, not colon-separated** — `id int pk`, never `id: int`. This is the one place in DGMO where a colon is wrong.
- **Use [`class`](chart-class.md) instead** when you need inheritance rather than crow's-foot cardinality and keys.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`class`](chart-class.md) · [`boxes-and-lines`](chart-boxes-and-lines.md)
- **Then:** [Colors & palettes](colors.md)
