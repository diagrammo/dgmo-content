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

## When to use

- **`body`** — you are labeling parts of a person, and the underlying picture needs to be a human figure.
- [`map`](chart-map.md) — you are labeling parts of the Earth rather than parts of a person.
- [`block`](chart-block.md) — the surface is an arrangement you define yourself, not a fixed anatomical figure.

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

A **bare line** is a catalog name for the active figure. Order does not matter — the figure is fixed; you are just choosing what to light up. Which names are valid depends on the **view** (front vs back). An unknown name emits a warning and is skipped; the rest of the diagram still renders.

### Muscles (muscle form)

Full catalog by region. **F** = available on the front view, **B** = on the back view. Bare names are the primary catalog entries; the **fine heads** in the last column are separate names for the individual heads where the art splits them.

| Region | Muscle | F | B | Fine heads (separate names) |
|--------|--------|:--:|:--:|-----------------------------|
| Neck / traps | `neck` | ✓ | ✓ | |
| | `trapezius` | ✓ | ✓ | |
| Shoulders | `deltoids` | ✓ | ✓ | `front-delts`, `side-delts` (female front); `rear-delts` (back) |
| Chest | `chest` | ✓ | | |
| | `serratus-anterior` | ✓ | | |
| Arms | `biceps` | ✓ | | |
| | `triceps` | ✓ | ✓ | `triceps-lateral`, `triceps-medial`, `triceps-long` (back) |
| | `forearm` | ✓ | ✓ | `forearm-flexors`, `forearm-extensors` |
| | `hands` | ✓ | ✓ | |
| Back | `lats` | | ✓ | |
| | `infraspinatus` | | ✓ | |
| | `teres` | | ✓ | male back only |
| | `upper-back` | | ✓ | |
| | `lower-back` | | ✓ | |
| | `erector-spinae` | | ✓ | |
| | `quadratus-lumborum` | | ✓ | |
| Core | `abs` | ✓ | | `abs-upper`, `abs-lower` |
| | `obliques` | ✓ | | |
| Glutes | `gluteal` | | ✓ | `glute-maximus`, `glute-medius` |
| Legs | `quadriceps` | ✓ | | `rectus-femoris`, `vastus-lateralis`, `vastus-medialis` |
| | `adductors` | ✓ | ✓ | |
| | `hamstring` | | ✓ | `biceps-femoris`, `semitendinosus`, `semimembranosus` |
| | `knees` | ✓ | | |
| | `tibialis` | ✓ | | |
| | `calves` | ✓ | ✓ | `gastrocnemius-lateral`, `gastrocnemius-medial`, `soleus` (back) |
| | `ankles` | ✓ | | |
| | `feet` | ✓ | ✓ | |

### Surface landmarks (skin form)

In `skin` form you can also point at **surface features** — leader-only dots, no fill:

| Area | Landmarks |
|------|-----------|
| Face / head (front) | `forehead`, `eye`, `nose`, `cheek`, `ear`, `mouth`, `jaw`, `chin` |
| Torso (front) | `throat`, `collarbone`, `sternum`, `belly`, `navel`, `hip`, `groin` |
| Back | `nape`, `ear`, `shoulder-blade`, `spine`, `hip`, `tailbone` |
| Limbs (either view) | `shoulder`, `elbow`, `wrist`, `hand`, `thigh`, `knee`, `shin`, `calf`, `foot` |

## Aliases

Names accept **gym shorthand, formal anatomy, or plain-English surface words** — all resolve to the same catalog entry:

| You type | Resolves to |
|----------|-------------|
| `pecs`, `pectoralis-major` | `chest` |
| `quads`, `quadriceps-femoris` | `quadriceps` |
| `glutes`, `butt` | `gluteal` |
| `lats`, `latissimus-dorsi` | `lats` |
| `delts`, `shoulders` | `deltoids` |
| `traps` | `trapezius` |
| `hams` | `hamstring` |
| `abs`, `rectus-abdominis` | `abs` |
| `thigh` | `quadriceps` (front) / `hamstring` (back) |
| `foot` → `feet`, `hand` → `hands`, `knee` → `knees`, `shin` → `tibialis` | region |

```dgmo
body Gym Shorthand
muscle
front

pecs
delts
quads
```

## Left / right

Prefix any part with `left` or `right` to call out **one side only** (the figure's own anatomical side — on a front view `right` is the pec on the left of the image). It scopes both the fill and the leader, so a one-sided injury highlights one side alone. Works on muscles and surface landmarks.

```dgmo
body Injury Report
skin

tag Status as s
  Torn red
  Sore orange

right pec    s: Torn
  Bench tear
left biceps  s: Sore
right knee   s: Sore
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
- `no-title` — hide the title line.
- `fill-tint` \| `fill-solid` \| `fill-outline` — fill treatment for the highlighted muscles. Mutually exclusive; the last one written wins.

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

## Appearance

Body accepts these universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Next

- **Related:** [`map`](chart-map.md) · [`block`](chart-block.md)
- **Then:** [Colors & palettes](colors.md)
