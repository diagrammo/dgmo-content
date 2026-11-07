```dgmo
swot Tortuga Rum Co.
tag Priority as p
  High red
  Low gray
active-tag Priority

strengths
  Oldest distillery still on the island p: Low
  Crew of 40 sworn tasters
    Trained in three ports
  Secret recipe, aged in cannon-scarred oak
weaknesses
  One barrel supplier p: High
  Thin margins on every cask
  No presence beyond the Caribbean p: High
opportunities
  Navy rum ration contract
    Open for tender each spring
  Rising demand for spiced rum in northern ports p: Low
  Tavern partnerships along the trade routes
threats
  Royal Navy blockade p: High
  Cheap imitations from rival islands
  Rising cost of sugar cane
```

## Overview

A SWOT analysis sorts what you know about an organisation, product or plan into four fixed panels: **strengths** and **weaknesses** (internal, within your control) and **opportunities** and **threats** (external, outside it). Reach for it at the start of a business plan, a strategy review or a launch decision, when the question is "where do we stand?" rather than "what do we do next?". The grid is always 2×2 with strengths top-left, weaknesses top-right, opportunities bottom-left and threats bottom-right, whatever order you write the sections in. **Each list is a judgement, not a measurement.** The chart does not score, weight or rank items, and it does not pair them into strategies (the TOWS matrix is out of scope).

## When to use

- **`swot`** — you are listing internal strengths and weaknesses against external opportunities and threats, in prose-length items.
- **[`quadrant`](chart-quadrant.md)** — you want to place items by judgement on two axes you name, not fill four fixed panels.

## Syntax

```
swot Title
// optional directives: tag, active-tag, palette, x-label, y-label, no-axes, no-tint-items

strengths|weaknesses|opportunities|threats [Label] [color]
  Item text [key: value]
    Optional detail line
```

- A **section line** sits at indent 0. The keyword is case-insensitive. An optional label replaces the default name, and an optional trailing colour replaces the default.
- An **item** is indented under a section. One more indent level adds a smaller, muted **detail** line. Going deeper is an error.
- Sections may appear in any order and are always drawn S W / O T.
- A leading `- ` on an item is dropped, so pasted bullet lists work.
- A colour word at the end of an item stays in the text: `Margins are in the red` reads as written.
- Colons and commas inside an item are literal unless the part before the colon is a declared tag alias.

| Section | Default label | Default colour | Position |
|---------|---------------|----------------|----------|
| `strengths` | Strengths | green | top-left |
| `weaknesses` | Weaknesses | yellow | top-right |
| `opportunities` | Opportunities | blue | bottom-left |
| `threats` | Threats | red | bottom-right |

## Labels and colours

Give a section its own label and colour on the section line. The colour must be last and comes from the palette.

```dgmo
swot Navire marchand
strengths Forces teal
  Équipage expérimenté
weaknesses Faiblesses orange
  Un seul fournisseur
opportunities Occasions purple
  Nouveau contrat avec la marine
threats Menaces red
  Blocus naval
```

## Axes

The grid is framed by two axes, drawn as the headers of a table: a band over each column and a rail beside each row. Columns default to **Helpful, Harmful** and rows to **Internal, External**, which is the textbook SWOT matrix. Rename them with `x-label` and `y-label`, each a comma-separated pair, or hide them with `no-axes`, which wins over both label options.

```dgmo
swot Launch review
x-label Works for us, Works against us
y-label Inside, Outside
strengths
  Small, fast team
weaknesses
  No marketing budget
opportunities
  Competitor just raised prices
threats
  Platform fee change
```

```dgmo
swot Quick take
no-axes
strengths
  Loyal crew
weaknesses
  Leaky hull
opportunities
  Rich shipping lane
threats
  Rival fleet
```

## Tags

Declare a tag, then add `key: value` to an item to recolour its dot, tint its row in the tag colour, and show a legend. Items without a tag keep their section colour and no tint. `no-tint-items` turns the row tint off and leaves just the dot. Header bands always keep the section colour. Set `active-tag` to pick which tag drives the colours.

```
tag Priority as p
  High red
  Low gray
active-tag Priority
```

## Directives

| Directive | Effect |
|-----------|--------|
| `x-label A, B` | Column axis labels (default Helpful, Harmful). |
| `y-label A, B` | Row axis labels (default Internal, External). |
| `no-axes` | Hide both axes; wins over the label options. |
| `no-tint-items` | Don't tint tagged rows; the dot alone carries the tag. |
| `tag`, `active-tag` | Tag groups and the active one. |
| `palette` | Universal option. |

## Validation

| Code | Fires when |
|------|------------|
| `E_SWOT_UNKNOWN_SECTION` | A word at indent 0 is not one of the four keywords. The message names the nearest keyword. |
| `E_SWOT_DUPLICATE_SECTION` | The same section appears twice. |
| `E_SWOT_ORPHAN_ITEM` | An item appears before any section. |
| `E_SWOT_TOO_DEEP` | An item is nested more than one level. |
| `W_SWOT_EMPTY_SECTION` | A section is missing or has no items. The panel is still drawn, reading "None listed". |

## Layout

The chart stays 2×2 at any width and scales as a whole. Long text wraps and panels grow: a row takes the height of its tallest panel while both columns stay equal. Nothing is truncated.

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

- **Related:** [`quadrant`](chart-quadrant.md)
- **Then:** [Colors & palettes](colors.md)
