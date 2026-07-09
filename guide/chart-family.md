```dgmo
family The Blackwater Buccaneers

tag Allegiance as flag
  Founders green
  Brethren red

Redbeard b: 1638, d: 1701, sex: m, occupation: Captain, flag: Founders
Blackheart Bess b: 1642, d: 1699, sex: f, occupation: Quartermaster, flag: Founders

Redbeard + Blackheart Bess m: 1660
  Anne b: 1662, sex: f, occupation: Pirate King, flag: Brethren
  Mad Mary b: 1665, sex: f, occupation: Powder Monkey

Anne + "Long John Silver" m: 1685
  Young Jack b: 1686, sex: m
  Grace b: 1689, sex: f adopted

Mad Mary sex: f
  Tom b: 1690, sex: m
```

## Overview

Family diagrams show a **genealogy** — people, the couples (unions) they form, and the children those unions produce. Each person is a card; a `+` between two names marries them into a couple, and children are declared indented beneath. There are no arrows: kinship is expressed by the `+` join and by nesting, the same way an org chart expresses reporting lines. Reach for `family` for ancestry, lineage, dynasty, and pedigree diagrams; reach for `org` when you have a pure single-parent hierarchy with no unions.

The layout is automatic: generations stack into rows, spouses share a row joined by a marriage bar, and children drop from the bar on a shared bus.

## Syntax

```
family Title

Person b: 1660, d: 1718, sex: m

Person + Partner m: 1685
  Child b: 1687, sex: f
```

A family file is just **two line shapes** plus indentation:

- a **person line** — a bare name, optionally with same-line metadata (`Anne b: 1665, sex: f`)
- a **union line** — two names joined by ` + ` (`Anne + Jack m: 1701`)

Lines indented under a union (or a lone person) are that couple's children. A person's metadata lives on their standalone declaration; restating the name in a union re-references the same person.

## Metadata Keys

Metadata uses `key: value` pairs (colon required, comma-separated on one line). The keys are a **fixed, GEDCOM-flavored set** — an unknown key emits a warning and is ignored.

| Level | Key | Value | Renders as |
|-------|-----|-------|------------|
| person | `sex` | `m` \| `f` | drives the default card color |
| person | `b` | birth year | left end of the year range |
| person | `d` | death year | right end of the year range |
| person | `bp` | birth place | detail line |
| person | `dp` | death place | detail line |
| person | `occupation` | free text | detail line |
| person | `military` | free text | detail line |
| person | `education` | free text | detail line |
| person | `religion` | free text | detail line |
| person | `burial` | free text | detail line |
| union | `m` | marriage year | marriage-bar label |

`b` and `d` together render as a **year range** under the name (`1638–1701`); either alone renders a partial range (`1638–` / `–1701`).

## Unions

A union is a couple, written with ` + ` between two names. Children are indented beneath:

```dgmo
family Union

Anne + Jack m: 1701
  Mary b: 1702, sex: f
  Tom b: 1704, sex: m
```

- Each side is a **bare name** — quoting (`"Long John Silver"`), `as`-aliasing, and a trailing `(color)` all work on a side.
- **Per-side metadata is not supported.** To give a partner a birth year or sex, declare them as a standalone person line; the union then re-references them by name.
- The only **union-level** key is `m` (marriage year); it renders on the marriage bar, not on either person.

A child can later head their own union line, extending the tree another generation — reusing the child's name as a union side re-references the same person.

## Remarriage

A person who appears in **two union lines** renders as **one card with two marriage bars**. Reuse the same name in a second union:

```dgmo
family Remarriage

Redbeard sex: m

Redbeard + Anne m: 1701
  Mary b: 1702, sex: f

Redbeard + Grace m: 1716
  Ned b: 1717, sex: m
```

## Single Parent

A **lone person line** (no `+`) with indented children is a single-parent family — no extra syntax:

```dgmo
family Single Parent

Bess sex: f
  Nan b: 1690, sex: f
  Will b: 1692, sex: m
```

## Adoption

A child line ending in a **bare `adopted` token** marks an adopted child; the edge from the parents to that child renders **dashed**:

```dgmo
family Adoption

Anne + Jack m: 1701
  Mary b: 1702, sex: f
  Ned b: 1705, sex: m adopted
```

A literal person actually **named** "Adopted" must be **quoted** (`"Adopted"`) so the token reads as a name rather than the flag.

## Colors

When a person carries `sex:`, their card takes a default color: `m` → blue, `f` → purple, unset → gray (a named-palette color at 25% tint). An explicit **tag** or an inline **`(color)`** on the person overrides the sex color.

**Treat the legend, not the hue, as the sex channel.** Slate blue and purple sit close in hue and desaturate further under the 25% tint, so they separate weakly under deuteranopia. The legend is the guaranteed, readable sex channel — its entries carry text labels. Where color-vision accessibility matters, distinguish the sexes (or any other facet) with **tags** rather than relying on the fill; the fill is a convenience, not the primary signal.

Tag groups work as everywhere else: declare a `tag <Facet> as <alias>` with a distinct color per value, then apply it to a person with `<alias>: <Value>`. The tag color overrides the sex-derived fill and adds a labeled legend entry.

## Complete Example

```dgmo
family House of Blackwater

tag Allegiance as flag
  Founders green
  Brethren red
  Crown blue

Redbeard b: 1638, d: 1701, sex: m, occupation: Captain, military: Sacked three ports, flag: Founders
Blackheart Bess b: 1642, d: 1699, sex: f, occupation: Quartermaster, flag: Founders

Redbeard + Blackheart Bess m: 1660
  Anne b: 1662, sex: f, occupation: Pirate King, flag: Brethren
  Mad Mary b: 1665, sex: f, occupation: Powder Monkey

"Long John Silver" b: 1658, sex: m, occupation: Cook
One-Eyed Pete b: 1660, d: 1712, sex: m, occupation: Bosun, flag: Crown

Anne + "Long John Silver" m: 1685
  Young Jack b: 1686, sex: m, occupation: Navigator
  Grace b: 1689, sex: f, occupation: Sailmaker, flag: Brethren

Anne + One-Eyed Pete m: 1698
  Sally b: 1699, sex: f, occupation: Lookout

Mad Mary sex: f
  Tom b: 1690, sex: m, occupation: Cabin Boy

Young Jack + Calico Kate m: 1712
  Ned b: 1713, sex: m, occupation: Gunner
  Pearl b: 1715, sex: f, occupation: Cartographer adopted
```

This exercises the declaration, a union with children, remarriage (one card / two bars), a single parent, an adopted child, a child who becomes a parent, sex-driven color, a tag override, and a quoted partner name.
