# Map

```dgmo
map The Brethren's Caribbean
projection mercator

tag Port as p
  Home Port red
  Friendly green
  Spanish Prize orange

poi Kingston p: Home Port, value: 120
poi Havana p: Spanish Prize, value: 90
poi Santo Domingo p: Friendly, value: 70

route Kingston style: arc
  -weigh anchor-> Havana
  -raid the galleons-> Santo Domingo
  -careen & resupply-> Kingston
```

## Overview

Map diagrams are geographic concept maps: highlight or shade political subdivisions, drop points of interest (POIs), and connect them with routes or edges. They're for *sharing a concept* — territories, presence, voyages — not cartography. The map renders at a fixed, auto-fit position (no pan/zoom), and the basemap and viewport are **inferred from the content you reference**, so most maps need no directives at all. v1 boundaries are world countries and US states.

## Syntax

```
map Title

region us-states               // optional — basemap is inferred
projection mercator            // optional — auto-picked by extent otherwise
region-metric Doubloons               // names the value-ramp legend

Florida value: 42              // choropleth fill
Texas p: Friendly              // categorical fill (via a tag alias)

poi Kingston value: 80          // a point of interest
route Kingston style: arc       // ordered voyage: origin + arrow legs
  -> Havana
```

The first line declares the chart type and an optional title. Everything else is inferred from the places you name — all three directives above are optional. `region` accepts `us-states` or `world`; `projection` accepts `equirectangular`, `natural-earth`, `albers-usa`, or `mercator` (see [How the map is chosen](#how-the-map-is-chosen)).

## How the map is chosen

The renderer takes the bounding box of everything you reference — valued or tagged regions, POIs, edge endpoints — pads it, and measures the span:

- **US-only** → `albers-usa` (conic, with Alaska/Hawaii insets).
- **World-scale** (span ≥ ~90°) → `equirectangular`, snapped to the full Greenwich world frame.
- **Tight regional cluster** → `mercator`.

Directives only matter to *override* this. `region us-states` forces the US state mesh + US scoping (handy on a POI-only US map). `projection …` forces a projection. `region world` is currently inert — world is already the default.

## Region fill — value (choropleth)

A subdivision name on its own line with a `value:` fills it from a single-hue tint ramp (auto min→max, ~15% floor). Subdivisions with no value or tag render as the neutral base.

```dgmo
map Plunder by State
region us-states
region-metric Doubloons (000s)

Florida value: 92
Georgia US value: 78
Louisiana value: 64
Texas value: 40
```

- `region-metric Label` names the ramp in the legend.
- `scale <min> <max>` overrides the auto anchors.

## Region fill — categorical (tags)

Map diagrams use the universal tag model: declare a `tag` group and apply its alias as a key. The first declared group colours the map automatically — you only need `active-tag` to pick a *different* group (or the value ramp; see below).

```dgmo
map Fleet Reach
region world

tag Waters as w
  Stronghold red
  Raiding Grounds orange
  Friendly green

Jamaica w: Stronghold
Cuba w: Raiding Grounds
Madagascar w: Stronghold
Indonesia w: Friendly
```

A region can carry **both** a `value:` and a tag (bivariate). Both are kept as selectable colouring dimensions: the legend shows the value ramp and each tag group. The value ramp fills by default whenever any region has a value; `active-tag <GroupName>` switches the fill to a tag group instead (and `active-tag <ValueLabel>` — the `region-metric` label, or `Value` — switches back to the ramp).

## Points of Interest

```
poi <name | <lat> <lon>> [as <alias>] [<key>: <value>, …]
```

```dgmo
map Crew Outposts

poi Kingston                    // label defaults to "Kingston"
poi Havana label: Spanish Main  // anchored at Havana; shows "Spanish Main"
poi 18.0 -76.8 as cache         // positional coords (lat lon), signed
poi Tortuga value: 200           // value: scales the marker area (a data channel)
poi Nassau w: Raiding Grounds   // categorical colour via a tag alias
```

- **Coordinates are positional** — two leading signed numbers, latitude then longitude. Cities never start with a number, so there's no ambiguity.
- `value:` scales the marker area; pair it with `poi-metric Label` for a legend key.
- POI properties: `label`, `value`, `style`, an applied tag alias, and `as`. There are no POI icons in v1.
- Coord-positioned or relabeled POIs take `as <alias>` so routes and edges can reference them; named POIs are referenced by name.

## Routes & Connectors

`route <origin>` starts an ordered, auto-numbered voyage; each indented line is a `-> destination` **leg** that continues from the previous stop. A leg is an edge — the in-arrow text labels it, `value:` sets its thickness, and `->`/`~>` (or the header `style: arc`) sets its shape. A tag or `label:` on a leg line decorates the *destination* stop. Repeat the origin as the last destination to close a loop (drawn without a second marker). The origin gets a distinct marker; to size an intermediate stop, declare it as a `poi`.

```dgmo
map Treasure Run
projection mercator

route Havana style: arc
  -set sail-> Kingston
  -take on crew-> Santo Domingo
  -bury the chest-> Havana
```

Native `->` edges handle any other connection:

```dgmo
map Supply Lines

dcw                     // hub/star — indented edges share the source
  -> Kingston
  -> Havana

Kingston -ships-> Havana value: 22   // labeled; value = thickness
```

`~>` curves a single edge. There's no geographic path-finding — legs are straight or arced.

## Labels, Legend & Chrome

| Directive | Effect |
|-----------|--------|
| `subtitle Text` | Subtitle under the title. |
| `caption Text` | Caption below the map. |
| `region-metric Label` | Names the region value-ramp legend. |
| `poi-metric Label` | Names the POI value (marker size) channel. |
| `flow-metric Label` | Names the edge/leg value (thickness) channel. |
| `no-legend` | Suppresses the whole legend block. |
| `region-labels full \| abbrev \| off` | On-map subdivision names (default `off`). |
| `poi-labels off \| auto \| all` | On-map POI labels (default `auto`). |

Labels render **on the map** (export-safe), escalating from inline → leader line → numbered pin in dense clusters. Markers never move.

## Name Resolution

- Admin units use **ISO 3166** — geometry is keyed by code, so `United States`, `USA`, and `US` all resolve alike.
- Cities use **GeoNames** with alias/accent matching, population ranking, and did-you-mean hints.
- `default-country` / `default-state <ISO>` scopes bare city resolution (inferred from content if unset).
- **Disambiguate once:** add a trailing ISO code at first mention — `San Jose CR` (country) or `Portland US-OR` (subdivision) — then use the bare name. Two same-named cities → give each an `as <alias>`.
- The country-vs-state collision (`Georgia` = country `GE` or US state `US-GA`) is resolved by ISO code (`US-GA value: 5`) or name + scope (`Georgia US value: 5`).
- Positional coordinates are the escape hatch for anything missing or ambiguous.

## Directives & Reserved Keys

Directives (no colon): `region`, `projection`, `region-metric`, `poi-metric`, `flow-metric`, `scale`, `region-labels`, `poi-labels`, `default-country`, `default-state`, `active-tag`, `no-legend`, `subtitle`, `caption`.

Reserved metadata keys (need colons): `value`, `label`, `style`. `value` is the single numeric channel — it renders as region shade, POI marker size, or edge thickness depending on the element.

## Color Validation

Tag colors use named palette colors only: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. Value choropleths derive their ramp from the active palette automatically.
