# How DGMO Thinks

A guide to the design principles behind the DGMO language. Understanding these themes will help you write diagrams faster and make better use of the language's features.

New to the vocabulary? The [Glossary](glossary.md) defines the words the chart-type guides use — directive, metadata, tag group, alias, leaf, and the rest.

---

## What a Clean Check Does and Doesn't Tell You

When the editor reports no problems, it is telling you one thing: **the file could be read.** It is not telling you the diagram is right.

DGMO is deliberately forgiving. Rather than reject a line it does not recognise, it usually finds *some* reading for it — a stray word becomes part of a label, an unfamiliar setting becomes a data row. That forgiveness is what lets you type freely without fighting the parser. The cost is that a mistake often produces a diagram rather than an error.

Here is what that looks like in practice.

**A label can absorb your data.** Type an accidental space inside a number:

```
bar Doubloons by Month

Jan 42
Feb 5 8
Mar 71
```

No errors. But the middle bar is now labeled "Feb 5" with a value of 8, not 58. The chart is drawn, the axis has quietly rescaled, and nothing is flagged.

**A mistyped setting becomes content.** Directives are ordinary words on ordinary lines, so a typo in one does not look like a typo:

```
bar Doubloons by Month

wibble-wobble 4
Jan 42
```

No errors — and a bar called "wibble-wobble" is now sitting in your chart. Note the shape of this trap: it is the **number** that does it. A misspelling on its own (`wibblewobble`) is caught and reported; a misspelling followed by a value looks exactly like a data row, so it becomes one. Count your bars.

**Dates can end up somewhere other than where you meant.** A gantt task takes its duration from the last word on the line, and everything before that becomes the name:

```
gantt Voyage Plan

Provision Ship 2026-03-01 5d
```

No errors. But the task is now named "Provision Ship 2026-03-01", and because nothing told the chart when to begin, the timeline starts in January rather than March. The intended version sets the start once, at the top:

```dgmo
gantt Voyage Plan
start-date 2026-03-01

Provision Ship 5d
Recruit Crew 5d
```

**Numbers get normalised without comment.** Percentages in a pie chart are recalculated from whatever you supply, so three values of 30 each display as 33%. If you expected them to add up to 100 and they don't, the chart will not say so.

### What to check instead

A clean check is the floor, not the finish line. After any edit, spend ten seconds on the picture:

- **Read the labels.** If one has a number stuck to it, a value has been swallowed.
- **Look at the axis.** Does its range match the numbers you believe you entered? A rescaled axis is the fastest sign that a value was misread.
- **Count the items.** Are there more shapes than you wrote, or fewer? An extra one usually means a directive or a stray line became content.
- **Check the totals.** Add up the values you meant to enter and compare them against what the chart reports.
- **Check the span.** On anything time-based, confirm the first and last dates are the ones you intended, and that the overall length is what you asked for.
- **Read the warnings, not only the errors.** A warning means something *was* drawn but probably not what you meant — an item with no value, a number that was ignored, a setting that does not apply. Warnings catch several of these cases; the mistakes above are the ones that slip past even those.

The rule of thumb: a clean check means "I understood you." Only the render can tell you whether it understood you *correctly*.

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

## How Indentation Works

Every guide on this site shows you indented examples. None of them tell you the rules. Here they are.

### How many spaces?

**Any number, as long as you are consistent.** DGMO counts *steps*, not spaces. It looks at each line and asks "is this deeper, shallower, or the same as the line above?" — never "how many spaces is this?"

These three files draw exactly the same chart:

```dgmo
org Crew

Blackbeard
  Anne Bonny
    Mary Read
```

```dgmo
org Crew

Blackbeard
    Anne Bonny
        Mary Read
```

```dgmo
org Crew

Blackbeard
 Anne Bonny
  Mary Read
```

Two spaces per level is the convention used throughout these guides, and it is what the app writes. There is nothing special about the number two — pick a step size and stay with it.

Because only the steps count, you cannot indent "half a level." Going from no indent to four spaces in one jump is one step deeper, exactly the same as going to two spaces. There is no way to land between levels.

### Do tabs work?

**Yes.** A file indented entirely with tabs draws the same chart as a file indented entirely with two spaces:

```dgmo
org Crew

Blackbeard
	Anne Bonny
		Mary Read
```

**But do not mix tabs and spaces in the same file.** A tab counts as four columns. So if you indent one line with two spaces and the next with a tab, the tab line is *deeper* — it becomes a child of the line above rather than its sibling, and nothing warns you. This is the one indentation mistake that silently changes your diagram.

Most editors show tabs and spaces identically, which is exactly why this bites. If a line lands in the wrong place and the file looks correct on screen, suspect a stray tab.

### What does a deeper indent mean?

This is the part worth reading twice: **a deeper indent means different things depending on what is on the line.** DGMO looks at the shape of the indented line to decide.

**A plain name means a child.** The indented thing belongs to the thing above, and the hierarchy is the diagram:

```dgmo
org Crew

Blackbeard
  Anne Bonny
  Calico Jack
```

Anne Bonny and Calico Jack report to Blackbeard. This is how org, sitemap, mindmap, treemap, family, and C4 read indentation.

**A line starting with an arrow means a connection, and the line above is where it starts from:**

```dgmo
boxes-and-lines Ports

Nassau
  -sails-> Tortuga
  -sails-> Port Royal
```

Both arrows leave Nassau. The indented lines are not children of Nassau — Tortuga and Port Royal are separate things, drawn beside it, joined to it by lines. Writing `Nassau -sails-> Tortuga` twice would give you the same diagram; indenting saves you repeating the name.

Chart types that read indented arrows this way: boxes-and-lines, infra, flowchart, C4, ER, class, sitemap, gantt, PERT, swimlane, cycle, sketch, and map routes.

**A line containing `key: value` means a fact about the line above:**

```dgmo
org Crew

Blackbeard
  role: Captain
  Anne Bonny
    role: Quartermaster
```

`role: Captain` does not add a crew member called "role" — the colon tells DGMO this is a detail about Blackbeard. Note the second `role:` is indented one step further, under Anne Bonny, because that is who it belongs to. Metadata attaches to whatever it is indented beneath.

That last point is the one to watch. If you put `role: Quartermaster` at the *same* depth as `Anne Bonny` rather than one step deeper, it attaches to Blackbeard instead. The file still reads fine; the diagram is wrong.

**Content under a bracket line belongs to that group:**

```dgmo
kanban Voyage Board

[To Do]
  Swab the deck
  Hoist the sail
```

So one indent step can mean "is a child of," "starts an arrow from," "is a fact about," or "goes inside." The chart-type guide for whatever you are drawing tells you which of these it uses.

### Things that do not matter

- **Blank lines.** You can leave a blank line in the middle of an indented block to space things out. It does not end the block.
- **Trailing spaces** at the end of a line.
- **Indenting a comment.** A `//` line can sit at any depth.
- **Indentation in flat data charts.** A bar or pie chart is a list, not a tree, so indenting its rows changes nothing. It also gains you nothing.

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

## Directives Are Simple Toggles

Configuration goes at the top of the diagram as plain keywords. The chart-type guides call these lines **directives**; this page has historically called them **options**. They are the same thing — if you have learned one word you already know the other.

```dgmo-source
gantt Product Launch
start-date 2026-03-15
today-marker
critical-path
no-dependencies
active-tag Team
```

- **Boolean options**: bare keyword turns it on, `no-` prefix turns it off (`activations` / `no-activations`)
- **Value options**: keyword followed by the value, space-separated (`start-date 2026-03-15`)
- No YAML, no JSON, no nested config blocks
- Options must appear before diagram content
- A few toggles are **universal** — every chart that renders the corresponding surface accepts them. `no-legend` hides the legend (data charts included), `no-title` drops the banner title, and `no-value` suppresses per-item value labels.

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
tag Team as t                           // tag: no colon
start-date 2026-03-15                   // option: no colon
Gold 3500 4200 5100                     // data row: no colon
id int pk                               // ER column: no colon
default-rps 100                         // infra option: no colon
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
