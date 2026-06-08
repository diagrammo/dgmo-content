# How DGMO Thinks

A guide to the design principles behind the DGMO language. Understanding these themes will help you write diagrams faster and make better use of the language's features.

---

## Indent, Don't Repeat

The most important pattern in DGMO: write the thing once, then indent what belongs to it beneath.

Instead of repeating the source on every line:

```dgmo-source
// Verbose — repeats "API" three times
API -routes-> UserService
API -routes-> ProductService
API -auth-> AuthService
```

Indent edges under their source:

```dgmo-source
// Concise — declare once, indent connections
API
  -routes-> UserService
  -routes-> ProductService
  -auth-> AuthService
```

This isn't just a shorthand — it's how DGMO thinks about ownership and hierarchy. The pattern shows up everywhere:

- **Org charts and sitemaps** — indentation *is* the hierarchy
- **Kanban** — cards indented under columns
- **Gantt** — dependencies indented under tasks
- **ER** — columns and relationships indented under tables
- **Sequence** — participants indented under groups

When you see indentation in DGMO, read it as "belongs to."

---

## Meaning First, Color Second

When you want to make something red, your instinct might be to reach for a trailing color: `AuthService red`. That works for one-offs. But DGMO encourages a different approach for anything that carries meaning.

**Tags** let you separate *what something means* from *how it looks*:

```dgmo-source
tag Priority as p
  Critical red
  Normal green
  Low gray

API p: Critical
Cache p: Low
```

Why go through this indirection?

- **Colors become meaningful.** Red means "Critical," not just red. The legend self-documents.
- **Palettes stay intact.** Switching from Nord to Atlas adjusts all your colors harmoniously. Direct hex codes would break this.
- **Filtering works.** Tags are structured metadata — you can sort, hide, and group by them.
- **One change updates everything.** Rename "Critical" to "Urgent" in one place, not fifty nodes.

Use trailing color names (`red`, `blue`, …) for quick visual accents. Use tags when color carries meaning you'd want in a legend.

---

## Name Things, Skip the Boilerplate

DGMO infers as much as it can from names you're already writing.

In sequence diagrams, the parser recognizes common names and gives them the right shape automatically:

```dgmo-source
Redis                // cache (cylinder, dashed)
Kafka                // queue (horizontal cylinder)
User                 // actor (stick figure)
PostgresDB           // database (cylinder)
```

You only need `is a` when the name doesn't match a pattern:

```dgmo-source
Vault is a database         // "Vault" matches no rule, but you want database
Notifications is a queue    // "Notifications" matches no rule
```

The first declared tag group auto-activates. Chart types are detected from the first line. Org hierarchy comes from indentation alone.

The principle: **name things sensibly and DGMO figures out the rest.** Override only when inference gets it wrong.

---

## Palette-Aware Colors

When you write `red`, DGMO doesn't render `#ff0000`. It renders *the red from your active palette* — a shade that harmonizes with the other ten named colors in that palette.

The allowed color names are: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`.

That's the complete list. No hex codes, no CSS keywords, no custom colors. This is a deliberate constraint:

- Every palette (Nord, Catppuccin, Atlas, Tokyo Night, etc.) defines its own version of these eleven names
- Switching palettes recolors your entire diagram coherently
- Diagrams always look good regardless of which palette or theme is active
- No one accidentally picks colors that clash or become invisible on certain backgrounds

DGMO prioritizes *beautiful by default* over *total control.*

---

## Brackets Mean "Container"

Wherever you see `[Name]`, something is being grouped:

```dgmo-source
[Backend]              // group in infra, boxes-and-lines, C4
[To Do]                // column in kanban
[Sprint 1]             // swimlane in gantt
[Marketing]            // container in sitemap
[Caribbean]            // category in scatter charts
[Royal Navy]           // group in timeline
```

Content indented below the bracket line belongs to that group. Bracket grouping works in sequence, infra, flowchart, state, org, kanban, sitemap, gantt, boxes-and-lines, timeline, and scatter/bubble diagrams. When you see brackets, read them as "these things go together."

Groups carry metadata after the closing bracket. When color rides alongside other keys, use the long form `color: <name>`:

```dgmo-source
[Backend] color: blue, team: Platform
  API
  Database
  Cache
```

For semantic coloring, lean on tag aliases — `[Backend] t: Platform` (where `t` is a declared tag alias) lets the legend drive the fill instead of hardcoding the swatch. Kanban columns and pyramid/ring phase headers are the only groups that accept a bare trailing color (`[Done] green`); elsewhere, use the `color:` key.

---

## One Arrow Vocabulary

DGMO uses the same small set of arrow patterns everywhere:

| Pattern | Meaning | Example |
|---------|---------|---------|
| `->` | Synchronous / directed | `API -> Database` |
| `~>` | Asynchronous | `API ~> Queue` |
| `-label->` | Labeled edge | `-routes-> UserService` |
| `~label~>` | Labeled async edge | `~notify~> Email` |
| `<->` | Bidirectional | `A <-> B` |

The label goes between the dashes (or tildes). `->` and `-label->` work in every chart that has edges — sequence, infra, flowchart, C4, ER, class, sitemap, boxes-and-lines, and more. The async forms (`~>`, `~label~>`) are specific to communication-style diagrams (sequence, infra, flowchart). Bidirectional `<->` is a boxes-and-lines convenience.

Learn the shape once, then reach for the variant the diagram type allows.

---

## Metadata: The Universal "And Also..."

When you need to attach extra information to something, the same `key: value` syntax works on almost anything:

```dgmo-source
API description: Main gateway, team: Platform
API -routes-> UserService frequency: High
[Backend] owner: Platform Team
Database Schema 10bd p: Foundation, progress: 80
1718-05 Blockade p: Blackbeard
Card Title priority: High, assignee: Alice
```

Nodes, edges, groups, tasks, events, cards — if it exists in DGMO, you can probably attach metadata to it. The format is always `key: value, key2: value2` trailing the name, or indented `key: value` lines beneath it.

---

## Describe Relationships, Not Layouts

DGMO diagrams have no x/y coordinates, no manual positioning, no pixel-level control. You describe *what things are* and *how they connect*, and the layout engine handles placement.

```dgmo-source
// You write this
CEO
  CTO
    Engineering
    DevOps
  CFO
    Finance

// DGMO handles the layout
```

This is a trade-off:

- Diagrams reflow cleanly when content changes — add a node and everything adjusts
- Version control diffs are meaningful (text changes, not coordinate noise)
- You spend time on content, not dragging boxes around
- But you don't get pixel-perfect placement

If you find yourself wanting to control exact positions, you're probably fighting the tool. Instead, use groups, ordering, and direction options (`direction-tb`, `direction-lr`) to guide the layout.

---

## Options Are Simple Toggles

Configuration goes at the top of the diagram as plain keywords:

```dgmo-source
gantt Product Launch
start 2026-03-15
today-marker
critical-path
no-dependencies
active-tag Team
```

- **Boolean options**: bare keyword turns it on, `no-` prefix turns it off (`activations` / `no-activations`)
- **Value options**: keyword followed by the value, space-separated (`start 2026-03-15`)
- No YAML, no JSON, no nested config blocks
- Options must appear before diagram content

---

## The Colon Rule

Colons show up in exactly two situations:

**1. Open-ended metadata** — when you're defining freeform key-value pairs:
```dgmo-source
API description: Main gateway           // same-line metadata
  role: Senior Engineer                 // org/C4 indented metadata
```

**2. Type separators** — where both sides can contain spaces and a delimiter is needed:
```dgmo-source
+ name: string                          // class field type
+ sail(): void                          // class method return
Trajectory blue: -0.001*x^2 + 0.27*x  // function expression
```

**No colons anywhere else** — declarations, options, tags, data rows, arrows, groups, and comments are all colon-free:
```dgmo-source
bar Revenue by Quarter                  // declaration: no colon
tag Team as t                        // tag: no colon
start 2026-03-15                        // option: no colon
Gold 3500 4200 5100                     // data row: no colon
id int pk                               // ER column: no colon
latency-ms 50                           // infra property: no colon
```

The intuition: **if DGMO already knows what the fields are, spaces are enough. Colons appear only when you're defining something freeform or need an unambiguous separator.**

---

## One Diagram Per File

The first line declares the chart type. There's no way to embed multiple diagrams in a single file. One file, one diagram, one clear purpose.

```dgmo-source
sequence Auth Flow
// everything below is this one diagram
```

## Comments Are Full-Line Only

```dgmo-source
// This is a comment
API -> Database  // This is NOT a comment — it's part of the line
```

Use `//` at the start of a line. There are no inline comments. `#` is not a comment character.
