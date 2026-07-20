```dgmo
arc Pirate Alliances
//order appearance name, group, degree

// Source -> Target weight
[Caribbean] red
  Blackbeard -> Bonnet 8
  Blackbeard -> Vane 5
  Blackbeard -> Hornigold 4
  Hornigold -> Bonnet 2

[Women Pirates] purple
  Bonny -> Rackham 9
  Bonny -> Read 7
  Rackham -> Vane 3

[West Africa] teal
  Roberts -> Davis 6
```

## Overview

An arc chart maps **weighted connections across a set of entities** — who connects to whom, and how strongly — drawn as arcs along a baseline or wrapped into a circular chord layout. Reach for it when the *pattern* of links is the story: co-occurrence, link density, who is most connected, a network shown compactly without boxes-and-arrows spaghetti. The same data renders both ways — linear **arc** (default) or circular **chord** — controlled by a single `layout` directive. They are one chart type, not two. An arc link asserts only that two things are related and how strongly; it says nothing about direction of flow or quantity conserved.

## When to use

- **`arc`** — so many links that boxes and arrows turn into spaghetti, and what you mainly want to see is who is most connected.
- [`boxes-and-lines`](chart-boxes-and-lines.md) — you need to read each individual connection's meaning, not the overall pattern.
- [`sankey`](chart-sankey.md) — a measurable quantity moves and is conserved as it splits. Arc links can go both ways or form a loop; sankey flows one direction, source to sink. Drawing a non-conserved relationship (affinity, correlation, co-occurrence) as a sankey fabricates conservation.
- [`venn`](chart-venn.md) — you are overlapping whole groups rather than linking individual items.
- [`map`](chart-map.md) — the endpoints have real locations on Earth; arc positions are abstract.
- [`family`](chart-family.md) — the links are specifically marriages and births.

## Syntax

```
arc Chart Title
order appearance
layout arc

Source -> Target weight
```

## Metadata Keys

| Key      | Description                                                         | Required |
| -------- | ------------------------------------------------------------------- | -------- |
| `chart`  | Must be `arc` — the circular ("chord") layout is selected with `layout chord`, not a separate keyword | Yes      |
| `order`  | Node ordering: `appearance` (default), `name`, `group`, or `degree` | No       |
| `layout` | `arc` (default, linear) or `chord` (circular)                       | No       |
| `orientation-horizontal` \| `orientation-vertical` | Baseline orientation of the linear arc layout (default horizontal) | No       |

The title is line 1 (`arc Pirate Alliances`) — there is no `title` directive.

## Data Format

Each data line defines a connection between two nodes with an optional weight:

```
Source -> Target weight
Source -> Target
```

If weight is omitted, it defaults to 1. Arc/chord thickness is proportional to weight.

## Node Groups

Use `[Group Name] color` headers to group nodes by color:

```
[Captains] red
Blackbeard -> Bonnet 8
Blackbeard -> Vane 5

[Crew] blue
Bonny -> Read 7
```

Nodes inherit the color of the group in which they first appear.

## Node Ordering

- `appearance` — nodes appear in the order they are first mentioned (default)
- `name` — nodes sorted alphabetically
- `group` — nodes sorted by group, then by appearance within group
- `degree` — nodes sorted by number of connections (most connected first)

## Chord Layout

Add `layout chord` to arrange the nodes around a circle instead of along a line.
The chord ribbons' width represents connection strength. Groups, ordering, and
weights all carry over.

```dgmo
arc Pirate Alliance Network
layout chord

Blackbeard -> Bonnet 150
Blackbeard -> Vane 80
Blackbeard -> Hornigold 120
Bonnet -> Rackham 40
Vane -> Rackham 60
Rackham -> Bonny 200
Bonny -> Read 180
Roberts -> Davis 90
Roberts -> Anstis 70
Hornigold -> Bonnet 50
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

- **Related:** [`sankey`](chart-sankey.md) · [`boxes-and-lines`](chart-boxes-and-lines.md) · [`venn`](chart-venn.md) · [`map`](chart-map.md) · [`family`](chart-family.md)
- **Then:** [Colors & palettes](colors.md)
