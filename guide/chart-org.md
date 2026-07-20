```dgmo
org The Dread Fleet
sub-node-label Crew
show-sub-node-count

tag Rank as r
  Captain red
  FirstMate orange
  Quartermaster yellow
  Bosun green
  Gunner teal
  Sailor blue default
  Jester cyan
  Swab purple

tag Ship as s
  Revenge blue default
  Serpent green
  Phantom purple

tag Status as st
  Loyal green default
  Turncoat red
  NewRecruit yellow

Blackbeard r: Captain, s: Revenge
  Anne Bonny r: FirstMate
    [Gun Deck]
      Cannonball Pete r: Gunner
      Smokey Jack r: Gunner, st: NewRecruit
      Powder Meg r: Swab, st: NewRecruit
    [Boarding Party]
      Cutlass Jim r: Bosun
      Red Mary
      One-Eyed Dan st: Turncoat
  Calico Rackham r: Quartermaster
    [Cargo Hold]
      Barnacle Bob
      Slippery Sal st: Turncoat
  Long John r: FirstMate, s: Serpent
    [Rigging Crew]
      Monkey Fist r: Bosun
      Pegleg Pete
      Crow Jane
    [Navigation]
      Stargazer Quinn r: Quartermaster
      Compass Rose st: NewRecruit
```

## Overview

An org chart maps **reporting structure** — who reports to whom — as a top-down tree of roles, people, and teams. Each person is a line of text; indentation puts them under their manager, and metadata like `role:` or `location:` rides along on the card. Reach for it for team structure, chain of command, and headcount by group.

**Org charts are strictly single-parent.** Every node has exactly one line above it, because indentation is the only way to express a relationship. That's the right model for reporting lines and the wrong model for anything where two things join to produce a third — most obviously a family tree, where drawing a couple's child under one indentation silently deletes the other parent from the lineage. If your structure has unions, use [`family`](chart-family.md).

## When to use

- **`org`** — everyone has exactly one boss above them, and the diagram is about reporting or authority.
- **[`family`](chart-family.md)** — people pair up and have children together. Org's single-parent rule would drop one parent from every union, which is a factual error about lineage, not a styling problem.
- **[`mindmap`](chart-mindmap.md)** — the boxes are ideas you're breaking down, not people or teams with real reporting lines.
- **[`raci`](chart-raci.md)** — the question is who's on the hook for which specific task, not who the reporting chain is.
- **[`pyramid`](chart-pyramid.md)** — you're naming *levels* (tiers, maturity stages, needs) rather than people or units reporting upward.
- **[`bracket`](chart-bracket.md)** — pairs get *eliminated* going up. In an org chart everyone stays.
- **[`treemap`](chart-treemap.md)** — the nesting is about *size and containment* (budget, headcount as area), not about authority.

## Syntax

```
org Chart Title

Person Name
  role: Job Title

  Direct Report
    role: Job Title
```

## Settings

Directives go on their own line, before the org content. The chart title is the
rest of line 1 (`org The Dread Fleet`) — there is no `title` directive.

| Directive | Effect | Default |
| --------- | ------ | ------- |
| `direction-tb` | Top-to-bottom layout | on |
| `direction-lr` | Left-to-right layout | off |
| `sub-node-label <Label>` | Rename the descendant-count row (see below) | `Sub-node Count` |
| `show-sub-node-count` | Show a descendant count on every node that has one | off |
| `hide <key>[, <key>]` | Drop those metadata keys from the rendered cards | none hidden |
| `active-tag <Group>` | Which tag group colors the nodes (`none` suppresses) | first declared |

### Sub-node counts — `show-sub-node-count` and `sub-node-label`

`show-sub-node-count` adds a count of everyone below a node as an extra metadata
row on that node's card, so a manager reads "how big is this branch?" without
expanding it. It counts *people* across the whole subtree — containers themselves
aren't counted, and a collapsed subtree's hidden nodes still are. Nodes with
nobody beneath them get no row.

`sub-node-label <Label>` names that row. It defaults to `Sub-node Count`; the
opening example on this page sets `sub-node-label Crew` so a pirate crew reads
`Crew 7`. The label is a display string — put whatever noun fits your org there
(`Crew`, `Reports`, `Headcount`, `Engineers`).

```
org Engineering
sub-node-label Headcount
show-sub-node-count

Alex Chen
  role: CTO
  Alice Park
  Bob Torres
```

`hide` takes a comma-separated list of metadata keys and removes them from the
cards without removing them from the source — useful for exporting a clean
headcount view of a chart that carries a lot of per-person detail.

## Nodes

Each non-indented (or less-indented) text line creates a person node. Deeper indentation creates a child (direct report):

```
CEO
  VP of Engineering
    Senior Engineer
    Junior Engineer
  VP of Sales
    Account Executive
```

## Metadata

Add key-value pairs indented under a node:

```
Alice Park
  role: Senior Engineer
  location: New York
  focus: APIs
```

Metadata renders as secondary text on the node card.

## Containers (Teams)

Use `[Team Name]` to create a container that groups its children visually:

```
Alex Chen
  role: CTO

  [Platform Team]
    goal: Core infrastructure and APIs

    Alice Park role: Senior Engineer
    Bob Torres role: Junior Engineer

  [Frontend Team]
    goal: Ship new design system by Q3

    Carol Wu role: Senior Engineer
    Dave Kim role: Junior Engineer
```

Containers render as labeled boxes. They can have metadata like `goal:` and `charter:` which display below the container label.

## Node Colors

Org is the one chart type that does **not** take a trailing color token on a
node or container line. A container header is `[` label `]` and nothing else —
`[Platform Team blue]` renders a team literally named "Platform Team blue", and
`Alice Park blue` renders a person named "Alice Park blue". This is deliberate:
org labels are people's names, and silently eating a trailing word would mangle
anyone called Green or Brown.

Color an org chart with **tag groups** instead — declare the dimension you want
to color by, then apply it as metadata. That also earns the chart a legend, which
a bare color could not.

```dgmo
org Platform Group

tag Team as t
  Platform blue
  Frontend green
  Data purple

Alex Chen t: Platform
  role: CTO
  Alice Park t: Platform
  Carol Wu t: Frontend
  Eve Martinez t: Data
```

## Tag Groups

Define color-coded tags for metadata values like location or status. Tag groups must appear before org content:

```
org Acme Corp

tag Location
  NY blue
  LA yellow
  Remote purple

tag Status
  FTE green
  Contractor orange

Jane Smith
  role: CEO
  location: NY
  status: FTE
```

- `tag GroupName` starts a tag group
- `as <alias>` provides a shorthand for metadata keys (e.g., `tag Location as l`)
- `default` marks the fallback value for nodes without that metadata
- When a node's metadata value matches a tag entry, it renders with that tag's color as a badge

## Splitting an Org Across Files

A whole-company chart written in one file gets unmaintainable fast, and it forces
one person to own everyone else's branch. Org charts can be **composed from
several `.dgmo` files**: each team owns its own subtree file, and a top-level
file stitches them together.

### `import <file>.dgmo` — graft a subtree

An `import` line must be **indented**, and the imported file's content is grafted
at exactly that indentation — so where you put the `import` is where the subtree
lands in the hierarchy.

```
org Acme Corp

Dana Reyes
  role: CEO

  [Engineering]
    import teams/engineering.dgmo

  [Sales]
    import teams/sales.dgmo
```

`teams/engineering.dgmo` is an ordinary org file. Its own header (`org …`, plus
any directives) is stripped on import, and only its people and containers are
grafted:

```
org Engineering

Alex Chen
  role: VP Engineering
  Alice Park
    role: Senior Engineer
  Bob Torres
    role: Junior Engineer
```

- Paths are **relative to the importing file**.
- Imports nest — an imported file can import further files.
- **Circular imports are detected** and reported with the chain that caused them
  (`a.dgmo -> b.dgmo -> a.dgmo`), rather than hanging.
- Nesting is capped at ten levels; going deeper is an error naming the file that
  breached it.
- A missing file is an error on the `import` line; the rest of the chart still
  renders.

### `tags <file>.dgmo` — share one tag vocabulary

A `tags` line sits **unindented in the header**, before the org content, and pulls
tag groups in from another file so every team chart colors by the same palette
of locations, statuses, or cost centers:

```
org Engineering
tags ../shared/company-tags.dgmo

Alex Chen
  role: VP Engineering
  location: NY
```

The referenced file just holds tag group declarations:

```
tag Location as l
  NY blue
  LA yellow
  Remote purple

tag Status as st
  FTE green
  Contractor orange
```

When the same group name arrives from more than one place, **inline groups win
over a `tags` file, which wins over groups pulled in through `import`** — so a
team can override a company-wide default locally without editing the shared file.

> Composition reads files from disk, so it works in the CLI and the desktop app.
> A share link or an embedded fence has no filesystem — flatten the chart into a
> single file for those.

## Comments

```
// This line is ignored by the parser
```

## Collapse / Expand

In the app, click a node that has children to focus it. Click again to collapse its subtree — a "+N hidden" label shows how many nodes are hidden. Click once more to expand. Containers can be collapsed independently.

Keyboard: Tab to focus a node, Enter or Space to toggle.

## Complete Example

```dgmo
org Engineering Division

Alex Chen
  role: CTO

  [Platform Team]
    goal: Core infrastructure and APIs
    charter: Platform reliability and developer experience

    Alice Park role: Senior Engineer, location: NY
    Bob Torres role: Junior Engineer, location: CO

  [Frontend Team]
    goal: Ship new design system by Q3

    Carol Wu
      role: Senior Engineer
    Dave Kim
      role: Junior Engineer

  [Data Team]
    goal: ML pipeline and analytics

    Eve Martinez
      role: Data Scientist
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

- **Org is strictly single-parent.** Drawing genealogy through an org chart silently deletes one parent from every union. Use [`family`](chart-family.md) when a node needs two parents.
- **Metadata attaches to whatever it is indented beneath.** Put `role: Quartermaster` at the same depth as the person it describes and it attaches to their manager instead — clean validate, wrong chart. One more indent step fixes it.
- **Do not mix tabs and spaces.** A tab counts wider than the spaces around it, so a tabbed line becomes a child of the line above and nothing warns. See [how indentation works](how-dgmo-thinks.md#how-indentation-works).
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`family`](chart-family.md) · [`mindmap`](chart-mindmap.md) · [`raci`](chart-raci.md) · [`pyramid`](chart-pyramid.md) · [`bracket`](chart-bracket.md) · [`treemap`](chart-treemap.md)
- **Then:** [Colors & palettes](colors.md)
