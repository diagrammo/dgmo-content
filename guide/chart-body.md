```dgmo
body Powder Monkey Push Day
muscle
front

tag Effort as e
  Primary red
  Secondary orange
  Warm-up yellow

chest        e: Primary
  Barbell bench press — 4×8
deltoids     e: Primary
  Overhead press — 3×10
triceps      e: Secondary
  Rope pushdowns — 3×12
abs          e: Warm-up
  Plank — 3×45s
```

## Overview

Body diagrams annotate a **human figure** by muscle name. Name the muscles that matter, color them with a tag group, and add a short note beneath each — the rest of the figure stays a neutral gray so the highlighted muscles read at a glance. Reach for `body` for **workout splits**, **PT / rehab and injury reports**, and **anatomy teaching**. It is a labeling surface, not a data chart: there are no axes and no values, just a figure and the parts you call out.

The layout is automatic. Muscles you name are filled and given a gutter label with a leader line; a legend maps each tag color to its meaning.

## Syntax

```
body Title
muscle
front

<muscle name>  <tag>: <Value>
  <note>
```

A body file is a **header line**, a few optional **bare figure directives**, an optional **tag group**, and then one **part line** per muscle you want to call out. A part line is just a catalog muscle name, with optional trailing tag metadata and an indented note.

## Figure: form, sex, view

Four figures ship — **male** and **female**, **front** and **back**. Set the figure with bare directives before the parts; each is optional and defaults sensibly:

| Directive | Options | Default |
|-----------|---------|---------|
| form | `muscle` \| `skin` | `muscle` |
| sex | `male` \| `female` | `male` |
| view | `front` \| `back` | `front` |

```dgmo
body Back & Legs
muscle
female
back

lats
hamstring
glutes
```

`skin` renders any figure as a plain silhouette (head + hair, no muscle segmentation) — useful when you only want to point at a region. `skeletal` is reserved.

### Two views at once

Name **both** `front` and `back` to render the two views side by side in one diagram. A part is drawn on whichever view(s) contain it — `chest` on front, `lats` on back, `deltoids` / `calves` on both:

```dgmo
body Full Body — Front & Back
muscle
front
back

chest
lats
quadriceps
hamstring
calves
```

## Parts

A **bare line** is a catalog muscle name for the active figure. Order does not matter — the figure is fixed; you are just choosing which muscles to light up.

- **Front muscles** — `neck`, `trapezius`, `chest`, `deltoids`, `biceps`, `triceps`, `forearm`, `abs`, `obliques`, `quadriceps`, `adductors`, `calves`, `tibialis`.
- **Back muscles** — `trapezius`, `rear-delts`, `triceps`, `lats`, `lower-back`, `forearm`, `glutes`, `hamstring`, `calves`.
- **Fine heads** also resolve — `vastus-lateralis`, `rectus-femoris`, `biceps-femoris`, `serratus-anterior`, and the other individual heads named in the catalog.

An unknown muscle name emits a warning and is skipped; the rest of the diagram still renders.

## Aliases

Names accept **gym shorthand or formal anatomy** — both resolve to the same catalog muscle:

| You type | Resolves to |
|----------|-------------|
| `pecs`, `pectoralis-major` | `chest` |
| `quads` | `quadriceps` |
| `glutes` | `gluteal` |
| `lats` | `latissimus-dorsi` |
| `delts` | `deltoids` |
| `traps` | `trapezius` |

```dgmo
body Gym Shorthand
muscle
front

pecs
delts
quads
```

## Tags & Color

Muscles are gray until you tag them. Declare a `tag <Facet> as <alias>` with a distinct color per value, then apply it to a part with `<alias>: <Value>`. The tag colors the highlighted muscle, its leader line, and its label, and adds a labeled legend entry:

```dgmo
body Boarding-Party Wounds
muscle
front

tag Severity as s
  Critical red
  Moderate orange
  Watch yellow

deltoids   s: Critical
  Musket ball, left shoulder — immobilize
obliques   s: Moderate
  Cutlass graze
forearm    s: Watch
  Rope burn, both hands
```

## Notes

A **bare indented line** beneath a part is a note (the same shape as a `pyramid` or `ring` note). The first note prints beneath that muscle's gutter label — use it for the exercise, the set/rep scheme, or the clinical finding.

## Options

- `no-legend` — hide the tag legend.

## Complete Example

```dgmo
body Full Front Roll-Call
muscle
front

tag Group as g
  Upper blue
  Core orange
  Lower green

neck         g: Upper
trapezius    g: Upper
deltoids     g: Upper
chest        g: Upper
biceps       g: Upper
triceps      g: Upper
forearm      g: Upper
abs          g: Core
  Hollow-body hold — 3×30s
obliques     g: Core
quadriceps   g: Lower
adductors    g: Lower
calves       g: Lower
tibialis     g: Lower
```
