# Glossary

The chart-type guides lean on a handful of words over and over. This page defines them in plain language, with a small working example for each and a note on where you will run into the term.

If you are new, read [How DGMO Thinks](how-dgmo-thinks.md) first — it covers the ideas. This page covers the vocabulary.

---

## The shape of a file

Nearly every `.dgmo` file has the same three parts, in this order:

```dgmo
gantt Voyage Plan
start-date 2026-03-01

tag Crew as t
  Deck blue
  Galley orange

Provision Ship 10bd t: Deck
Recruit Crew 5bd t: Galley
```

1. **Line 1** names the chart type and the title.
2. Any **directives** — settings for the whole diagram.
3. Any **tag groups** — named colors you will reuse.
4. The **content** — the actual things being drawn.

The words in bold are defined below.

---

## Line and structure words

### Declaration

Writing a thing down for the first time, on its own line. A declaration brings something into existence: a chart type, a node, a task, a tag group.

```dgmo
bar Doubloons by Month

Jan 42
Feb 58
```

Line 1 is the **chart-type declaration** — the chart type (`bar`) and the title (`Doubloons by Month`). `Jan 42` declares a bar.

The word "declare" carries a rule with it: in most chart types you have to declare something before you can point an arrow at it. You will see phrases like "declare the node first, then indent its edges below it."

*Where you meet it:* every guide. Line 1 of every diagram is a declaration.

### Directive

A setting that applies to the whole diagram, written on its own line near the top, before the content.

**"Directive" and "option" are the same thing.** The chart-type guides mostly say "directive"; [How DGMO Thinks](how-dgmo-thinks.md#directives-are-simple-toggles) mostly says "option". If you have learned one word, you already know the other.

Directives come in two shapes. A **bare** directive is a single word that switches something on:

```dgmo
gantt Voyage Plan
today-marker

Provision Ship 10bd
```

A **value** directive is a word followed by its setting, separated by a space — never a colon:

```dgmo
gantt Voyage Plan
start-date 2026-03-15

Provision Ship 10bd
```

Many bare directives have an off switch spelled with a `no-` in front: the legend is on by default, and `no-legend` turns it off. Guides call these **opt-outs**, or **cosmetic opt-outs** when they only affect appearance.

Directives must come **before** the content. A directive written lower down is usually read as content instead — see [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you).

A few directives work in nearly every chart type. Guides call this set the **universal appearance directives**: `fill-tint` (the default), `fill-solid`, `fill-outline`, `no-title`, and `no-legend`. The `fill-` family controls how shapes are filled — a soft tint, a full block of color, or an outline with no fill.

Guides often describe a directive by saying it does *not* exist: "there is no `title` directive," "no `format` or `currency` directive." This is telling you not to go looking — that behaviour is decided some other way, usually from your data or from the title line.

*Where you meet it:* every chart type has its own set. Gantt and PERT have the most; bar and pie have a few.

### Flag

Another word for a bare directive, or for a bare word attached to a single line rather than the whole diagram — `[Backend] collapsed` puts a `collapsed` flag on one group.

### Token

One chunk of a line, with spaces on either side of it. `Provision Ship 10bd` has three tokens: `Provision`, `Ship`, and `10bd`.

The word matters because some chart types decide what a line means by looking at the **last** token. In a gantt chart, the last token is the duration and everything before it is the task name. That is why `Provision Ship 10bd` gives you a task called "Provision Ship" lasting ten business days — and why an unexpected extra token at the end changes the meaning of the whole line.

*Where you meet it:* gantt, PERT, bar, line, and anywhere a guide says "positional" or "the last token."

### Bare

Written on its own, with nothing after it. A **bare directive** is the keyword on its own (`today-marker`). A **bare color** is a color name with no `color:` label in front of it (`[Done] green`). "Bare" is the opposite of writing `key: value`.

*Where you meet it:* kanban, pyramid, ring, gantt, and the directive lists in most guides.

### Top-level

Not indented. A top-level line starts at the left edge of the file, in column one. Directives are top-level. So are the outermost items in a hierarchy.

*Where you meet it:* used throughout to distinguish settings from content.

---

## Attaching extra information

### Metadata

Extra facts attached to something you already declared, written as `key: value`. The key is the name of the fact; the value is the fact itself.

Metadata is how you say "and also" — this person has a role, this task is 80 percent done, this connection carries high traffic.

There are two places to put it, and they mean exactly the same thing.

**Same-line metadata** goes on the end of the line, after the name. Multiple pairs are separated by commas:

```dgmo
org Ship's Company

Blackbeard role: Captain, location: Nassau
```

**Indented metadata** goes on the lines beneath, one pair per line:

```dgmo
org Ship's Company

Blackbeard
  role: Captain
  location: Nassau
```

Use same-line for one or two facts, indented for several. There is no way to continue a same-line list onto a second line — a line ending in a comma is an error.

The colon is required in metadata. That is one of the two places DGMO uses colons at all; see [The Colon Rule](how-dgmo-thinks.md#the-colon-rule).

*Where you meet it:* almost everywhere. Org and C4 prefer the indented form; gantt, kanban, and the connection-style diagrams usually use same-line.

### Key and value

In `role: Captain`, `role` is the key and `Captain` is the value.

Each chart type publishes a known set of keys it understands. Guides call these **reserved keys**. A key the chart type does not recognise may be quietly ignored rather than flagged, so it is worth checking the guide's list rather than inventing a key name.

Reserved keys are the mirror image of directives: directives are colon-free settings for the whole diagram, reserved keys are colon-carrying facts about one item.

### Trailing color

A color name written at the end of a line to color that one thing, with no key in front of it:

```dgmo
boxes-and-lines Fleet

API red
Cache blue
```

This is fine for a one-off accent. When the color *means* something — a status, a team, a priority — use a tag group instead so the diagram grows a legend that explains itself.

Only eleven color names exist: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. See [Colors](colors.md).

---

## Tags

### Tag group

A named set of categories, each with a color. You declare the group once near the top of the file, then label things with it. The diagram grows a legend from the group automatically.

```dgmo
boxes-and-lines Fleet Systems

tag Priority as p
  Critical red
  Routine green

API p: Critical
Cache p: Routine
```

`tag Priority as p` declares the group. `Critical red` and `Routine green` are its members, indented beneath. `API p: Critical` puts the API in the Critical category, which colors it red and adds a "Priority" legend.

The first tag group you declare becomes the active one, which is the one the legend and any coloring use by default.

*Where you meet it:* most diagram types that draw distinct things — boxes-and-lines, infra, flowchart, gantt, kanban, timeline, treemap, and more.

### Alias

The short name you give a tag group so you do not have to type the long one on every line. In `tag Priority as p`, the alias is `p`.

```dgmo
boxes-and-lines Fleet Systems

tag Team as t
  Platform blue
  Data purple

API t: Platform
Warehouse t: Data
```

You choose the alias — `t` and `p` are conventions, not requirements. Once declared, the alias works as a metadata key anywhere in the file, including on groups and edges.

*Where you meet it:* everywhere tags are supported. The alias is what you actually type; the full name is what shows up in the legend.

### Active tag

Which tag group the diagram uses for coloring and the legend when more than one is declared. The first group declared is active by default; the `active-tag` directive picks a different one.

---

## Things and connections

### Node

One box, circle, or shape in a diagram — a single thing being drawn. Different guides call the same idea by different names depending on what it represents: a **participant** in a sequence diagram, a **table** in an ER diagram, a **class** in a class diagram, a **card** in kanban, a **task** in a gantt chart, a **page** in a sitemap.

### Edge

A line or arrow between two nodes. Also called a **connection**, **relationship**, **arrow**, or **dependency** depending on the chart type.

```dgmo
boxes-and-lines Supply Line

Harbour
  -cargo-> Warehouse
  -cargo-> Market
```

The arrow's **source** is where it starts; its **target** is where it points. In the example, `Harbour` is the source of both edges. `-cargo->` is a **labeled** edge — the word between the dashes becomes the text on the line.

*Where you meet it:* boxes-and-lines, infra, flowchart, C4, sequence, ER, class, state, sitemap, PERT.

### Group (container)

Several things drawn together inside a labeled boundary. Written with square brackets. Whatever is indented underneath belongs to it.

```dgmo
kanban Voyage Board

[To Do]
  Swab the deck
  Hoist the sail

[Done]
  Chart the course
```

The same bracket syntax means "column" in kanban, "swimlane" in gantt, "boundary" in C4, and "category" in scatter charts — but it is always the same idea: these things go together.

---

## Hierarchy words

These come from the way people describe family trees, and they show up wherever one thing sits underneath another.

Take this org chart:

```dgmo
org Ship's Company

Blackbeard
  Anne Bonny
    Mary Read
  Calico Jack
```

### Parent

The thing directly above, that something belongs to. `Blackbeard` is the parent of `Anne Bonny`.

### Child

The thing indented directly underneath a parent. `Anne Bonny` and `Calico Jack` are children of `Blackbeard`.

### Sibling

Two things with the same parent. `Anne Bonny` and `Calico Jack` are siblings.

### Root

Something with no parent — a top-level line. `Blackbeard` is the root here. A diagram can have more than one root.

### Branch

Anything that has children of its own. `Anne Bonny` is a branch, because `Mary Read` sits under her.

### Leaf

Anything with no children — the end of a line of descent. `Mary Read` and `Calico Jack` are leaves.

The branch/leaf distinction matters most in **treemap**, where the two are measured differently:

```dgmo
treemap Fleet Budget

Ships
  Queen Anne's Revenge 400
  Adventure 250
Supplies
  Powder 120
```

Leaves carry the numbers. A branch's size is the sum of its leaves, calculated for you — a number written on a branch is ignored, and a leaf with no number renders at zero size. Both of those produce a warning, so you will be told.

### Nesting / hierarchy

"Nested" means one thing sits inside or underneath another. "Hierarchy" is the whole tree of parents and children. In DGMO, indentation is what creates both — see [How indentation works](how-dgmo-thinks.md#how-indentation-works).

*Where you meet these:* org, sitemap, treemap, mindmap, family, C4, kanban, and any guide that talks about levels.

---

## Data-chart words

### Row

One line of data. In `Jan 42`, the row has a label and a value.

### Series

One set of related numbers running across the whole chart — usually drawn as one line, or one color of bar repeated in every group. A chart with three lines has three series.

### Header

A line that names the columns or periods that the rows underneath will line up against.

### Axis

The numbered edge of a chart — the bottom edge (horizontal) or the side (vertical). What the axis covers is normally worked out from your data, which is why an axis is worth glancing at after any edit.

### Legend

The small key that explains what each color means. Tag groups generate one automatically. `no-legend` hides it.

### Slice / segment

One wedge of a pie or ring chart, or one block of a stacked bar.

### Lane

A horizontal band grouping related rows — used in swimlane diagrams and in gantt charts with `lane-by`.

---

## Words about the tool

### Palette

The set of eleven colors currently in use. When you write `red`, you get the red belonging to your active palette, not a fixed shade. Switching palettes recolors the whole diagram in a way that stays harmonious. See [Colors](colors.md).

### Parse

Reading your text and working out what it means. When a guide says "the parser accepts" or "this is a parse error," it is talking about this step.

### Render

Drawing the picture, once the text has been read. A file can parse without complaint and still render something you did not intend — see [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you).

### Toggle

A directive that is either on or off, with no value — `today-marker`, `critical-path`, `no-legend`.

### Validate / check

Reading the file and reporting anything that cannot be understood. A clean check means the file was readable. It does not mean the diagram is right. This distinction matters enough to have its own section: [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you).

### Diagnostic

One message from that check. An **error** means nothing could be drawn. A **warning** means something was drawn, but probably not what you meant. Warnings are worth reading — they catch several of the mistakes a plain error check misses.

### Infer

Work something out from what you already wrote, instead of asking you to state it. Chart types infer shapes from names, axis ranges from your numbers, and branch sizes from their leaves. When a guide says "inferred from," it is telling you there is no directive for that thing — change the input and the output follows.

### Override

Replace something that was inferred or inherited. A per-item value overrides a whole-diagram directive.

### Resolve

Turn what you wrote into the thing it refers to — matching a place name to a location, or a short alias to the full tag group it stands for.

### Collapse

Fold a group down so its contents are hidden and it draws as a single shape.

### Scope

The stretch of the file where a name means something. "Names are lane-scoped" means the same name in two different lanes refers to two different things.

### Canonical

The recommended spelling, when more than one spelling works. Older spellings usually keep working; the canonical one is the one to write in new files.

### ISO date

A date written year-first: `2026-03-15`. It is unambiguous everywhere in the world, which is why guides recommend it. Other formats are accepted — see [Writing Dates](writing-dates.md).

---

## Words with more than one meaning

A few words are used for different things in different guides. Read them in context.

| Word | In one place | In another |
|---|---|---|
| **Branch** | Something with children under it (treemap, mindmap) | A line of development in a version-control diagram |
| **Anchor** | The fixed date or time a countdown or clock is measured from | The point a PERT chart lines its layout up against |
| **Row** | One line of data in a chart | One `key: value` line of metadata, or one line of an ER table |
| **Header** | A line naming the columns the data lines up against | The banner title across the top of the rendered diagram |
| **Tag** | The `tag` line that declares a group of categories | The category you then attach to something |
| **Group** | A bracketed container of items | A tag group, which is a set of named colors |

### Comment

A line starting with `//` that is ignored. Comments must take up the whole line; there is no way to put one at the end of a line of content.

```dgmo
bar Doubloons by Month

// figures from the quartermaster's ledger
Jan 42
Feb 58
```
