```dgmo
wireframe Login Page

[Header]
  Acme App
  nav
    Home active
    About
    Pricing

[Main]
  # Sign In

  Email  [user@example.com]
  Password  [****] password

  <x> Remember me

  (Sign In)
  (Forgot Password?) ghost

  ---

  New here? (Create Account) ghost
```

## Overview

A wireframe is a low-fidelity mockup of **one screen** — the inputs, buttons, nav, headings, and checkboxes that make up a page, before anyone designs any pixels. Reach for it to sketch a UI layout, work out form and page structure, or agree on what goes where. The syntax is **visual-mnemonic**: bracket characters communicate the element type, so the source text reads as a wireframe even before rendering — `[field]` is an input, `(Label)` is a button, `<x>` is a checkbox.

## When to use

- **`wireframe`** — you are drawing a *screen*: buttons, fields, nav, and the layout of one page.
- **[`sitemap`](chart-sitemap.md)** — the question is *which pages exist and how they link*, not what is on any one of them.
- **[`sketch`](chart-sketch.md)** — you want free-placed shapes and arrows on a canvas rather than stock UI controls.
- **[`block`](chart-block.md)** — the thing is a systems layout that happens to be gridded, and it should not read as a user interface.
- **[`journey-map`](chart-journey-map.md)** — the point is how the experience *feels* step by step, not what the screens contain.

## Elements

| Syntax | Element |
|--------|---------|
| `[text]` (no children) | Text input |
| `[Name]` (with children) | Group / region |
| `(Label)` | Button |
| `{A \| B \| C}` | Dropdown |
| `<x>` / `< >` | Checkbox |
| `(*) Label` / `( ) Label` | Radio button |
| `# Text` | Heading |
| `## Text` | Subheading |
| `---` | Divider |
| `- text` | List item |

## Keywords

`nav`, `tabs`, `table`, `image`, `modal`, `skeleton`, `alert`, `progress`, `chart`

- `image round` / `image wide` — shape hints
- `chart line` / `chart bar` / `chart pie` — chart silhouettes
- `progress 60` — percentage bar
- `table 5x4` — skeleton table with dimensions
- `modal <Title>` — opens a modal block; its indented children lay out in a centered panel below the main content

## States

State flags are **trailing keywords** — write them after the element, separated by spaces. No colon, no pipe:

```
(Submit) disabled
(Delete) destructive
(Cancel) ghost
[Email] password
[Notes] textarea
<x> Dark mode toggle
[Cards] horizontal
```

More than one keyword may trail a single element (`(Save) primary disabled`). Every token in the trailing position must be a recognized state keyword, all lowercase:

`disabled` · `active` · `selected` · `empty` · `ghost` · `destructive` · `success` · `warning` · `info` · `primary` · `toggle` · `password` · `textarea` · `scrollable` · `collapsed` · `horizontal`

`scrollable`, `collapsed`, and `horizontal` apply to groups only.

## Options

Written at the top level, one per line.

| Directive | Effect |
| --------- | ------ |
| `mobile` | Switch to the 375px mobile form factor. Recognized anywhere at the top level, not just in the header. |
| `palette <name>` | Set the palette in the source. |
| `theme <name>` | Set the light/dark theme in the source. |
| `active-tag <GroupName>` | Pin which declared tag group colors the elements at rest. |

## Layout

- **Desktop** (default): 1200px, top-level regions side-by-side
- **Mobile**: `mobile` keyword, 375px vertical stacking
- **Smart sizing**: `sidebar` gets ~25%, `main` fills remaining
- `horizontal` trailing any group arranges children in a row

## Multi-Element Lines

Two or more spaces between elements on one line:

```
// label + field
Email  [user@example.com]
// inline stepper
(-)  1  (+)
```

## Tables

```dgmo
wireframe Data

table
  Name, Email, Role
  John, john@, Admin
  Sally, sally@, Editor

// Skeleton shorthand:
table 5x4
  Name, Email, Role, Status
```

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |

A wireframe draws no legend, so `no-legend` has nothing to suppress.

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`, or pin them in the source with `palette <name>` / `theme <name>`.

## Next

- **Related:** [`sitemap`](chart-sitemap.md) · [`sketch`](chart-sketch.md) · [`block`](chart-block.md) · [`journey-map`](chart-journey-map.md)
- **Then:** [Colors & palettes](colors.md)
