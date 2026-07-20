```dgmo
sitemap The Salty Compass

tag Auth
  Public green
  Crew Only blue

Home Auth: Public, description: Landing page with interactive demos
  -shop-> Shop
  -voyages-> Upcoming Voyages
  -join crew-> Sign Up
  -sign in-> Login

[Ship Store]
  Shop Auth: Public
    -> Eye Patches
    -> Flags & Banners
  Eye Patches Auth: Public
    -add to chest-> Cart
  Flags & Banners Auth: Public
    -add to chest-> Cart
  Cart Auth: Public
    -checkout-> Checkout
  Checkout Auth: Crew Only
    -done-> My Orders

[Voyages]
  Upcoming Voyages Auth: Public
    -details-> Voyage Detail
  Voyage Detail Auth: Public
    -enlist-> Sign Up

[Crew Quarters]
  Login Auth: Public
    -welcome aboard-> Dashboard
    -new pirate-> Sign Up
  Sign Up Auth: Public
    -welcome aboard-> Dashboard
  Dashboard Auth: Crew Only
    description: Full overview of crew activity and orders
    -> My Orders
  My Orders Auth: Crew Only
    -reorder-> Shop
```

## Overview

A sitemap lays out the pages of a site and the links between them — for planning site structure and navigation before or during a build. Indentation defines the parent-child relationship between pages. Pages can be grouped into containers, connected with arrows, and annotated with metadata and color-coded tag groups, so things like access level per page read at a glance.

## When to use

- **`sitemap`** — the boxes are actual pages a visitor can navigate between, and you care how they link.
- **[`mindmap`](chart-mindmap.md)** — the branches are just topics or ideas, with no navigable structure implied.
- **[`wireframe`](chart-wireframe.md)** — you want to show what's on *one* page rather than which pages exist.
- **[`treemap`](chart-treemap.md)** — the nesting is proportion of a total rather than navigation.

## Syntax

```
sitemap Site Title

Page Name
  Child Page
    Grandchild Page
```

## Settings

| Key            | Description                                   | Default  |
| -------------- | --------------------------------------------- | -------- |
| `chart`        | Must be `sitemap`                             | —        |
| `direction-tb` | Top-to-bottom layout (omit for left-to-right) | off (LR) |

## Pages

Each line of text creates a page node. Indentation creates child pages:

```
Home
  About
  Products
    Enterprise
    Starter
  Contact
```

## Groups (Containers)

Use `[Group Name]` to create a visual container that groups its children:

```
Home
  [Product Section]
    Products
    Pricing
    Demo

  [Support Section]
    Help Center
    Documentation
```

Containers render as labeled boxes. They can have their own metadata.

## Arrows

Add arrows between pages using `->` syntax indented under a page:

```
Home
  -> Products
  -explore-> Blog
Products
  Pricing
    -upgrade-> Enterprise
```

- `-> Target` — plain arrow
- `-label-> Target` — labeled arrow

## Metadata

Add key-value pairs indented under a page:

```
Home
  status: Live
  owner: Marketing

Products
  status: Draft
  owner: Product Team
```

Metadata renders as secondary text on the page card. For concise entries, put metadata on the same line as the page name:

```
Home status: Live, owner: Marketing
Products status: Draft, owner: Product Team
```

## Descriptions

Add a description to any page using the `description` keyword (indented) or same-line metadata:

```
// Same-line metadata form
Pricing description: Compare plans and features

// Indented keyword form (colon required; bare "description" is deprecated)
Dashboard
  description: Full overview of crew activity and orders
  My Orders
```

Descriptions render as secondary text on the page card. The indented form must come before child pages. Multiple `description` lines accumulate into a multi-line description.

## Node Colors

Append a color name (lowercase) after a page name. For a group, the color goes inside the brackets, after the group label:

```
Home blue
[Admin Section red]
  Dashboard
  Settings
```

## Tag Groups

Define color-coded tags for metadata values. Tag groups must appear before page content:

```
sitemap Company Site

tag Status
  Live green
  Draft yellow
  Deprecated red

tag Owner
  Marketing blue
  Engineering purple

Home
  status: Live
  owner: Marketing
```

- `tag GroupName` starts a tag group
- When a tag group is active, pages are colored by their matching tag value
- Click a tag group pill to activate it; click the eye icon to toggle that metadata's visibility on cards

## Direction

The default layout is left-to-right. Add `direction-tb` to switch to top-to-bottom:

```
sitemap
direction-tb
```

## Collapse / Expand

In the app, click a page or group that has children to focus it. Click again to collapse its subtree — a "+N" label shows how many nodes are hidden. Click once more to expand.

Keyboard: Tab to focus a node, Enter or Space to toggle.

## Comments

```
// This line is ignored by the parser
```

## Complete Example

```dgmo
sitemap The Salty Compass

tag Auth
  Public green
  Crew Only blue

tag Status
  Live cyan
  Coming Soon yellow

Home Auth: Public, Status: Live
  -shop-> Shop
  -voyages-> Upcoming Voyages
  -join crew-> Sign Up
  -sign in-> Login

[Ship Store]
  Shop Auth: Public, Status: Live
    -> Eye Patches
    -> Flags & Banners
  Eye Patches Auth: Public, Status: Live
    -add to chest-> Cart
  Flags & Banners Auth: Public, Status: Coming Soon
    -add to chest-> Cart
  Cart Auth: Public, Status: Live
    -checkout-> Checkout
  Checkout Auth: Crew Only, Status: Live
    -done-> My Orders

[Voyages]
  Upcoming Voyages Auth: Public, Status: Live
    -details-> Voyage Detail
  Voyage Detail Auth: Public, Status: Live
    -enlist-> Sign Up

[Crew Quarters]
  Login Auth: Public, Status: Live
    -welcome aboard-> Dashboard
    -new pirate-> Sign Up
  Sign Up Auth: Public, Status: Live
    -welcome aboard-> Dashboard
  Dashboard Auth: Crew Only, Status: Live
    -> My Orders
  My Orders Auth: Crew Only, Status: Live
    -reorder-> Shop
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

- **Related:** [`mindmap`](chart-mindmap.md) · [`wireframe`](chart-wireframe.md) · [`treemap`](chart-treemap.md)
- **Then:** [Colors & palettes](colors.md)
