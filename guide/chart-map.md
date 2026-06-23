```dgmo
map The Brethren's Caribbean

tag Port as p
  Home Port red
  Friendly green
  Spanish Prize orange

poi Kingston p: Home Port, value: 120
poi Havana p: Spanish Prize, value: 90
poi Santo Domingo p: Friendly, value: 70

route Kingston
  ~weigh anchor~> Havana
  ~raid the galleons~> Santo Domingo
  ~careen & resupply~> Kingston
```

## Overview

Map diagrams are geographic concept maps: highlight or shade political subdivisions, drop points of interest (POIs), and connect them with routes or edges. They're for *sharing a concept* — territories, presence, voyages — not cartography. The map renders at a fixed, auto-fit position (no pan/zoom), and **everything is inferred from the content you reference** — basemap, viewport, projection, and ramp. A bare `map` is already the good-looking map: coastlines, mountain relief on reference maps, region and POI labels, and orientation labels all render by default. v1 boundaries are world countries and US states.

## Syntax

```
map Title

region-metric Doubloons        // names the value-ramp legend

Florida value: 42              // choropleth fill
Texas p: Friendly              // categorical fill (via a tag alias)

poi Kingston value: 80          // a point of interest
route Kingston                  // ordered voyage: origin + arrow legs
  ~> Havana                     // ~> = arc leg, -> = straight leg
```

The first line declares the chart type and an optional title. **Type `map`, name some places, and you're done** — there is no projection, scale, or label directive to set. Cosmetic features are on by default; the only knobs are the bare `no-*` opt-outs in [Turning things off](#turning-things-off).

## How the map is chosen

You never pick a projection — it's inferred from what you reference. The renderer takes the bounding box of everything (valued or tagged regions, POIs, edge endpoints), pads it, and measures the span:

- **US-only** → `albers-usa` (conic; Alaska/Hawaii appear as insets only when you reference them).
- **World-scale with data** (a region/POI carries a `value:` or tag) → **Equal Earth** (equal-area, so a choropleth's shading isn't distorted by the projection).
- **World-scale reference** (no data) → **natural-earth** (the prettier curved compromise).
- **Tight regional cluster** → `mercator`.

A map whose content is **entirely US** — including one built from US cities alone — renders as the conventional US states map: every state outlined, even with no data. Name a single non-US place and it falls back to a geographic world/regional frame. The basemap, projection, and US scoping are always inferred from what you name — there is no override.

## Region fill — value (choropleth)

A subdivision name on its own line with a `value:` fills it from a single-hue tint ramp. The ramp **auto-fits** with no configuration: for all-non-negative data the low end anchors at **0** (so every such map shares a 0 baseline); mixed-sign data fits data-min→data-max. Subdivisions with no value or tag render as the neutral base.

```dgmo
map Plunder by State
region-metric Doubloons (000s)

Florida value: 92
Georgia US value: 78
Louisiana value: 64
Texas value: 40
```

- `region-metric Label` names the ramp in the legend.
- A trailing color on `region-metric` sets the ramp **hue** — `region-metric Doubloons (000s) blue` shades blue instead of the default red.

## Region fill — categorical (tags)

Map diagrams use the universal tag model: declare a `tag` group and apply its alias as a key. The first declared group colours the map automatically — you only need `active-tag` to pick a *different* group (or the value ramp; see below).

```dgmo
map Fleet Reach

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

### Direct color (highlight one region)

For a quick highlight without declaring a tag group, drop a **trailing color** on the region line. It paints a flat fill, ignores the active colouring dimension, and adds no legend entry — the "just make this one stand out" escape hatch. Use tags when the colors are a legend-worthy category.

```dgmo
map Contested Waters

Jamaica red
Cuba orange
Haiti green
```

A direct color wins over both the value ramp and a tag on the same region. (Put it before any metadata: `Cuba red value: 90`.)

## Points of Interest

```
poi <name | <lat> <lon>> [as <alias>] [<key>: <value>, …]
```

```dgmo
map Crew Outposts

tag Waters as w
  Raiding Grounds red

poi Kingston                       // label defaults to "Kingston"
poi Havana label: Spanish Main     // anchored at Havana; shows "Spanish Main"
poi 18.0 -76.8 as cache            // positional coords (lat lon), signed
poi Santo Domingo value: 200       // value: scales the marker area (a data channel)
poi Port-au-Prince w: Raiding Grounds  // categorical colour via a tag alias
poi 17.94 -76.84 as portroyal red  // direct marker colour (trailing token)
```

- **Coordinates are positional** — two leading signed numbers, latitude then longitude. Cities never start with a number, so there's no ambiguity.
- `value:` scales the marker area; pair it with `poi-metric Label` for a legend key.
- A trailing color sets the marker fill directly — `poi Port Royal red` — winning over a tag colour and the default orange; no tag group needed.
- POI properties: `label`, `value`, `style`, an applied tag alias, and `as`. There are no POI icons in v1.
- Coord-positioned or relabeled POIs take `as <alias>` so routes and edges can reference them; named POIs are referenced by name.

## Routes & Connectors

`route <origin>` starts an ordered, auto-numbered voyage; each indented line is an `<arrow> destination` **leg** that continues from the previous stop, using the same indented arrow idiom as a sitemap. A leg is an edge — the in-arrow text labels it, `value:` sets its thickness, and the arrow glyph alone sets its shape (`-…->` straight, `~…~>` arc, mixable per leg). The arrow is required — a bare destination errors. A tag or `label:` on a leg line decorates the *destination* stop. Repeat the origin as the last destination to close a loop (drawn without a second marker). The origin gets a distinct marker; to size an intermediate stop, declare it as a `poi`.

```dgmo
map Treasure Run

route Havana
  ~set sail~> Kingston
  ~take on crew~> Santo Domingo
  ~bury the chest~> Havana
```

Native `->` edges handle any other connection:

```dgmo
map Supply Lines

poi Havana as hub       // hub/star — indented edges share the source
  -> Kingston
  -> Santo Domingo

Kingston -ships-> Havana value: 22   // labeled; value = thickness
```

`~>` curves a single edge. There's no geographic path-finding — legs are straight or arced.

## Labels & Legend

Region and POI labels are **on by default** and render **on the map** (export-safe). Region labels fit themselves automatically: the full name shows when it fits, a US-state two-letter abbreviation is tried when it doesn't, and the label hides rather than overlap or spill onto the ocean (`full → abbrev → hide`). POI labels are collision-managed, escalating from inline → leader line → numbered pin in dense clusters. Markers never move. Narrow embeds (a wide map in a column under ~480px) prefer abbreviations and drop reference relief, as if zoomed out.

The only label/legend directives name a channel or attribute the data:

| Directive | Effect |
|-----------|--------|
| `caption Text` | Caption below the map (data-source attribution; travels with the exported image). |
| `region-metric Label` | Names the region value-ramp legend. |
| `poi-metric Label` | Names the POI value (marker size) channel. |
| `flow-metric Label` | Names the edge/leg value (thickness) channel. |
| `active-tag Group` | Which tag group leads when several are present. |

## Turning things off

Everything cosmetic is on by default. The only switch is a bare `no-*` opt-out — there are no positive opt-in flags. A plain, data-journalism look is the four basemap flags together.

| Flag | Turns off |
|------|-----------|
| `no-coastline` | Coastal water-lines. |
| `no-relief` | Mountain-range relief shading. |
| `no-context-labels` | Orientation labels (water bodies + nearby countries). |
| `no-region-labels` | On-map subdivision names. |
| `no-poi-labels` | On-map POI labels. |
| `no-legend` | The whole legend block. |

## Name Resolution

- Admin units use **ISO 3166** — geometry is keyed by code, so `United States`, `USA`, and `US` all resolve alike.
- Cities use **GeoNames** with alias/accent matching, population ranking, and did-you-mean hints.
- `locale <ISO>` sets a default scope for bare names — a country (`locale US`) or subdivision (`locale US-GA`, which prefers cities in that state). Inferred from content if unset.
- **Disambiguate once:** add a trailing ISO code at first mention — `San Jose CR` (country) or `Portland US-OR` (subdivision) — then use the bare name. Two same-named cities → give each an `as <alias>`.
- The country-vs-state collision (`Georgia` = country `GE` or US state `US-GA`) is resolved by ISO code (`US-GA value: 5`) or name + scope (`Georgia US value: 5`).
- **Airport codes:** a three-letter **IATA code** resolves to that airport — `poi JFK`, `route JFK -> LAX` — for large international hubs and all US scheduled-commercial airports. Case-insensitive, resolved by code only (not by airport name), and the marker label is the code. A code that is also a city name yields the **city** (the airport is the lower-precedence match); an unknown code suggests the `as <CODE>` coordinates escape.
- Positional coordinates are the escape hatch for anything missing or ambiguous (including forcing an airport over a same-named city: `poi 54.56 55.87 as UFA`).

## Directives & Reserved Keys

The full directive set is 12, no colons. Six name intent the renderer can't infer — `region-metric`, `poi-metric`, `flow-metric`, `locale`, `active-tag`, `caption` — and six are the `no-*` cosmetic opt-outs — `no-legend`, `no-coastline`, `no-relief`, `no-context-labels`, `no-region-labels`, `no-poi-labels`. There is no `projection`, `scale`, `subtitle`, or `surface` directive, and the cosmetic features have no positive opt-in form.

Reserved metadata keys (need colons): `value`, `label`, `style`. `value` is the single numeric channel — it renders as region shade, POI marker size, or edge thickness depending on the element.

## Color Validation

All colors — tag values, a direct color on a region or POI, and the `region-metric` ramp hue — use named palette colors only: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. A place literally named for a color keeps it via capitalization (`poi Orange` is the place; lowercase `orange` is the color). The choropleth ramp defaults to red and follows the active palette automatically.
