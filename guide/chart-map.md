# Map Diagram

```dgmo
map The Brethren's Caribbean
projection mercator

tag Port as p
  Home Port red
  Friendly green
  Spanish Prize orange
active-tag Port

poi Kingston p: Home Port, size: 120
poi Havana p: Spanish Prize, size: 90
poi Santo Domingo p: Friendly, size: 70

route style: arc
  Kingston label: Weigh anchor
  Havana label: Raid the galleons
  Santo Domingo label: Careen & resupply
  Kingston
```

## Overview

Map diagrams are geographic concept maps: highlight or score political subdivisions, drop points of interest (POIs), and connect them with routes or edges. They're for *sharing a concept* — territories, presence, voyages — not cartography. The map renders at a fixed, auto-fit position (no pan/zoom), and the basemap and viewport are **inferred from the content you reference**, so most maps need no directives at all. v1 boundaries are world countries and US states.

## Syntax

```
map Title

[region us-states | world]     // optional — basemap is inferred
[projection equirectangular | natural-earth | albers-usa | mercator]
[metric Label]                 // names the score-ramp legend

RegionName score: 42           // choropleth fill
RegionName p: TagValue         // categorical fill (via a tag alias)

poi PlaceName size: 80         // a point of interest
route style: arc               // an ordered, numbered voyage
  Stop A
  Stop B
```

The first line declares the chart type and an optional title. Everything else is inferred from the places you name.

## How the map is chosen

The renderer takes the bounding box of everything you reference — scored or tagged regions, POIs, edge endpoints — pads it, and measures the span:

- **US-only** → `albers-usa` (conic, with Alaska/Hawaii insets).
- **World-scale** (span ≥ ~90°) → `equirectangular`, snapped to the full Greenwich world frame.
- **Tight regional cluster** → `mercator`.

Directives only matter to *override* this. `region us-states` forces the US state mesh + US scoping (handy on a POI-only US map). `projection …` forces a projection. `region world` is currently inert — world is already the default.

## Region fill — score (choropleth)

A subdivision name on its own line with a `score:` fills it from a single-hue tint ramp (auto min→max, ~15% floor). Subdivisions with no score or tag render as the neutral base.

```dgmo
map Plunder by State
region us-states
metric Doubloons (000s)

Florida score: 92
Georgia US score: 78
Louisiana score: 64
Texas score: 40
```

- `metric Label` names the ramp in the legend.
- `scale <min> <max>` overrides the auto anchors.

## Region fill — categorical (tags)

Map diagrams use the universal tag model: declare a `tag` group, apply its alias as a key, and `active-tag` to colour by it.

```dgmo
map Fleet Reach
region world

tag Waters as w
  Stronghold red
  Raiding Grounds orange
  Friendly green
active-tag Waters

Jamaica w: Stronghold
Cuba w: Raiding Grounds
Madagascar w: Stronghold
Indonesia w: Friendly
```

A region can carry **both** a `score:` and a tag (bivariate). Both are kept as selectable colouring dimensions: the legend shows the score ramp and each tag group, and `active-tag <GroupName>` (or `active-tag score`) chooses which one fills the map.

## Points of Interest

```
poi <name | <lat> <lon>> [as <alias>] [<key>: <value>, …]
```

```dgmo
map Crew Outposts

poi Kingston                    // label defaults to "Kingston"
poi Havana label: Spanish Main  // anchored at Havana; shows "Spanish Main"
poi 18.0 -76.8 as cache         // positional coords (lat lon), signed
poi Tortuga size: 200           // size: scales the marker area (a data channel)
poi Nassau w: Raiding Grounds   // categorical colour via a tag alias
```

- **Coordinates are positional** — two leading signed numbers, latitude then longitude. Cities never start with a number, so there's no ambiguity.
- `size:` scales the marker area; pair it with `size-metric Label` for a legend key.
- POI properties: `label`, `size`, `description`, an applied tag alias, and `as`. There are no POI icons in v1.
- Coord-positioned or relabeled POIs take `as <alias>` so routes and edges can reference them; named POIs are referenced by name.

## Routes & Connectors

`route` is an ordered, auto-numbered stop list — the origin gets a distinct marker. Repeat the first stop as the last to close a loop. `style: arc` curves the legs.

```dgmo
map Treasure Run
projection mercator

route style: arc
  Havana label: Set sail
  Kingston label: Take on crew
  Santo Domingo label: Bury the chest
  Havana
```

Native `->` edges handle any other connection:

```dgmo
map Supply Lines

dcw                     // hub/star — indented edges share the source
  -> Kingston
  -> Havana

Kingston -ships-> Havana weight: 22   // labeled; weight = thickness
```

`~>` curves a single edge. There's no geographic path-finding — legs are straight or arced.

## Labels, Legend & Chrome

| Directive | Effect |
|-----------|--------|
| `subtitle Text` | Subtitle under the title. |
| `caption Text` | Caption below the map. |
| `metric Label` | Names the score-ramp legend. |
| `size-metric Label` | Names the POI size legend key. |
| `no-legend` | Suppresses the whole legend block. |
| `region-labels full \| abbrev \| off` | On-map subdivision names (default `off`). |
| `poi-labels off \| auto \| all` | On-map POI labels (default `auto`). |

Labels render **on the map** (export-safe), escalating from inline → leader line → numbered pin in dense clusters. Markers never move.

## Name Resolution

- Admin units use **ISO 3166** — geometry is keyed by code, so `United States`, `USA`, and `US` all resolve alike.
- Cities use **GeoNames** with alias/accent matching, population ranking, and did-you-mean hints.
- `default-country` / `default-state <ISO>` scopes bare city resolution (inferred from content if unset).
- **Disambiguate once:** add a trailing ISO code at first mention — `San Jose CR` (country) or `Portland US-OR` (subdivision) — then use the bare name. Two same-named cities → give each an `as <alias>`.
- The country-vs-state collision (`Georgia` = country `GE` or US state `US-GA`) is resolved by ISO code (`US-GA score: 5`) or name + scope (`Georgia US score: 5`).
- Positional coordinates are the escape hatch for anything missing or ambiguous.

## Directives & Reserved Keys

Directives (no colon): `region`, `projection`, `metric`, `size-metric`, `scale`, `region-labels`, `poi-labels`, `default-country`, `default-state`, `active-tag`, `no-legend`, `subtitle`, `caption`.

Reserved metadata keys (need colons): `score`, `label`, `size`, `description`, `weight`, `style`.

## Color Validation

Tag colors use named palette colors only: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. Score choropleths derive their ramp from the active palette automatically.
