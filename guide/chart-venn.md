```dgmo
venn Pirate Skill Overlap

Swordsmanship as sw red
Navigation as nav blue
Leadership as lead green

sw + nav Sea Raiders
nav + lead Voyager Captains
sw + lead Buccaneer Chiefs
sw + nav + lead Legendary Pirates
```

## Overview

A venn diagram shows **which** groups overlap and what they share — the traits two teams have in common, the skills that appear in more than one role, the audience that belongs to both segments. Reach for it when one item can belong to two categories at once and you want to name what sits in each intersection. Two or three sets only.

**It says nothing about how much.** Region areas are **not** proportional to set sizes, and the overlap region's size is fixed by the layout, not by your data. Any read of "the overlap is twice as big" is unsupported by the picture. If magnitude is the point — how many items are in each set or each intersection — use [`bar`](chart-bar.md), or [`heatmap`](chart-heatmap.md) if every pair has a value.

## When to use

- **`venn`** — one item can belong to two (or three) categories at once, and the finding is *which* groups overlap.
- **[`pie`](chart-pie.md)** — every item belongs to exactly one category and the values sum to a meaningful whole.
- **[`heatmap`](chart-heatmap.md)** — you have a value for every row × column combination, not just membership.
- **[`arc`](chart-arc.md)** — you are linking individual items to each other rather than overlapping whole groups.
- **[`bar`](chart-bar.md)** — the sizes of the sets or intersections are the point. Venn cannot encode them.

## Syntax

```
venn Chart Title

<name> [as <alias>] [color]

<A> + <B> Label
<A> + <B> + <C> Label
```

## Sets

Each set is defined as a name with an optional alias and an optional color. 2 or 3 sets are supported. Modifier order follows the universal rule (§2A.2): name first, then `as <alias>`, then the trailing-token color.

```
Swordsmanship as sw red
Navigation as nav blue
Leadership as lead green
```

### Colors

Append a lowercase color word at the end of the line — after the alias if present:

```
Math as m blue
Science as s orange
```

Supports named colors: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`.

### Aliases

Use `as` to define a short name for intersections:

```
Swordsmanship as sw red
Navigation as nav blue
```

The alias (`sw`, `nav`) is used when defining intersections. The full name is shown in the diagram.

## Intersections

Intersection lines use `+` to reference two or three sets by alias, followed by a label:

```
sw + nav Sea Raiders
nav + lead Voyager Captains
sw + nav + lead Legendary Pirates
```

- The label follows the last set reference (no colon)
- Set references use the alias, not the full name

## Constraints

- Minimum 2 sets, maximum 3 sets

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |

A venn diagram labels its sets in place rather than in a legend, so `no-legend` has nothing to suppress.

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Region areas are not proportional to set sizes.** Any "how much bigger is the overlap" reading is unsupported by the drawing. If magnitude matters, put the numbers in a [`bar`](chart-bar.md) beside it.
- **Overlap lines must name sets that exist.** A typo in a set name or alias produces a region label with nothing behind it, and the file validates clean — check that every region you wrote actually appears in the render.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`pie`](chart-pie.md) · [`heatmap`](chart-heatmap.md) · [`arc`](chart-arc.md) · [`bar`](chart-bar.md)
- **Then:** [Colors & palettes](colors.md)
