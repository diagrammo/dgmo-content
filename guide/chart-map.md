```dgmo
map US Population by State
region-heat Residents (millions) blue

California heat: 39
Texas heat: 30
Florida heat: 23
New York heat: 20
Pennsylvania heat: 13
Illinois heat: 13
Ohio heat: 12
Georgia US heat: 11
North Carolina heat: 11
Michigan heat: 10
New Jersey heat: 9
Virginia heat: 9
Washington heat: 8
Arizona heat: 7
Tennessee heat: 7
Massachusetts heat: 7
Indiana heat: 7
Colorado heat: 6
Maryland heat: 6
```

## Overview

Map diagrams are geographic concept maps: highlight or shade political subdivisions, drop points of interest (POIs), and connect them with routes or edges. They're for *sharing a concept* — territories, presence, voyages — not cartography. The map renders at a fixed, auto-fit position (no pan/zoom), and **everything is inferred from the content you reference** — basemap, viewport, projection, and ramp. A bare `map` is already the good-looking map: coastlines, mountain relief on reference maps, region and POI labels, and orientation labels all render by default. v1 boundaries are world countries and US states.

## Syntax

```
map Title

region-heat Output             // names the heat-ramp legend

Florida heat: 42               // choropleth fill
Texas p: Friendly              // categorical fill (via a tag alias)

poi Tokyo size: 80              // a point of interest
route Tokyo                     // ordered voyage: origin + arrow legs
  ~> Singapore                  // ~> = arc leg, -> = straight leg
```

The first line declares the chart type and an optional title. **Type `map`, name some places, and you're done** — there is no projection, scale, or label directive to set. Cosmetic features are on by default; the only knobs are the bare `no-*` opt-outs in [Turning things off](#turning-things-off).

## How the map is chosen

You never pick a projection — it's inferred from what you reference. The renderer takes the bounding box of everything (valued or tagged regions, POIs, edge endpoints), pads it, and measures the span:

- **US-only** → `albers-usa` (conic; Alaska/Hawaii appear as insets only when you reference them).
- **World-scale with data** (a region/POI carries a heat/size value or tag) → **Equal Earth** (equal-area, so a choropleth's shading isn't distorted by the projection).
- **World-scale reference** (no data) → **natural-earth** (the prettier curved compromise).
- **Tight regional cluster** → `mercator`.

A map whose content is **entirely US** — including one built from US cities alone — renders as the conventional US states map: every state outlined, even with no data. Name a single non-US place and it falls back to a geographic world/regional frame. The basemap, projection, and US scoping are always inferred from what you name — there is no override.

## Region fill — heat (choropleth)

A subdivision name on its own line with a `heat:` fills it from a single-hue tint ramp. The ramp **auto-fits** with no configuration: for all-non-negative data the low end anchors at **0** (so every such map shares a 0 baseline); mixed-sign data fits data-min→data-max. Subdivisions with no heat value or tag render as the neutral base.

```dgmo
map World Coffee Production
region-heat Bags (millions)

Brazil heat: 69
Vietnam heat: 29
Colombia heat: 14
Indonesia heat: 12
Ethiopia heat: 8
Honduras heat: 6
India heat: 6
Uganda heat: 6
Mexico heat: 4
Peru heat: 4
```

- `region-heat Label` names the ramp in the legend.
- A trailing color on `region-heat` sets the ramp **hue** — `region-heat Bags (millions) blue` shades blue instead of the default red.

## Region fill — categorical (tags)

Map diagrams use the universal tag model: declare a `tag` group and apply its alias as a key. The first declared group colours the map automatically — you only need `active-tag` to pick a *different* group (or the heat ramp; see below).

```dgmo
map Asia-Pacific Markets

tag Tier as t
  Developed blue
  Emerging green
  Frontier orange

Japan t: Developed
South Korea t: Developed
China t: Emerging
India t: Emerging
Indonesia t: Emerging
Thailand t: Emerging
Malaysia t: Emerging
Vietnam t: Frontier
Philippines t: Frontier
Bangladesh t: Frontier
```

A region can carry **both** a `heat:` and a tag (bivariate). Both are kept as selectable colouring dimensions: the legend shows the heat ramp and each tag group. The heat ramp fills by default whenever any region has a heat value; `active-tag <GroupName>` switches the fill to a tag group instead (and `active-tag <HeatLabel>` — the `region-heat` label, or `Heat` — switches back to the ramp).

### Direct color (highlight one region)

For a quick highlight without declaring a tag group, drop a **trailing color** on the region line. It paints a flat fill, ignores the active colouring dimension, and adds no legend entry — the "just make this one stand out" escape hatch. Use tags when the colors are a legend-worthy category.

```dgmo
map Caribbean Cruise Line

Bahamas blue
Cuba orange
Jamaica green
Dominican Republic red
Haiti purple
```

A direct color wins over both the heat ramp and a tag on the same region. (Put it before any metadata: `Cuba orange heat: 90`.)

## Points of Interest

```
poi <name | <lat> <lon>> [as <alias>] [<key>: <value>, …]
```

```dgmo
map European Offices

tag Network as n
  Headquarters red

poi Paris                          // label defaults to "Paris"
poi Berlin label: DACH Region      // anchored at Berlin; shows "DACH Region"
poi 41.9 12.5 as rome              // positional coords (lat lon), signed
poi Madrid size: 200               // size: scales the marker area (a data channel)
poi Amsterdam n: Headquarters      // categorical colour via a tag alias
poi 59.33 18.07 as stockholm teal  // direct marker colour (trailing token)
```

- **Coordinates are positional** — two leading signed numbers, latitude then longitude. Cities never start with a number, so there's no ambiguity.
- `size:` scales the marker area; pair it with `poi-size Label` for a legend key.
- A trailing color sets the marker fill directly — `poi Mumbai red` — winning over a tag colour and the default orange; no tag group needed.
- POI properties: `label`, `size`, `style`, an applied tag alias, and `as`. There are no POI icons in v1.
- Coord-positioned or relabeled POIs take `as <alias>` so routes and edges can reference them; named POIs are referenced by name.

## Routes & Connectors

`route <origin>` starts an ordered, auto-numbered voyage; each indented line is an `<arrow> destination` **leg** that continues from the previous stop, using the same indented arrow idiom as a sitemap. A leg is an edge — the in-arrow text labels it, `width:` sets its thickness, and the arrow glyph alone sets its shape (`-…->` straight, `~…~>` arc, mixable per leg). The arrow is required — a bare destination errors. A tag or `label:` on a leg line decorates the *destination* stop. Repeat the origin as the last destination to close a loop (drawn without a second marker). The origin gets a distinct marker; to size an intermediate stop, declare it as a `poi`.

```dgmo
map South America Tour

route Bogotá
  ~Andes hop~> Lima
  ~down the coast~> Santiago
  ~over the pampas~> Buenos Aires
  ~north again~> São Paulo
  ~home leg~> Bogotá
```

Native `->` edges handle any other connection:

```dgmo
map Asia Trade Hub

poi Singapore as hub    // hub/star — indented edges share the source
  -> Tokyo
  -> Mumbai

Mumbai -ships-> Singapore width: 22   // labeled; width = thickness
```

`~>` curves a single edge. There's no geographic path-finding — legs are straight or arced.

## Labels & Legend

Region and POI labels are **on by default** and render **on the map** (export-safe). Region labels fit themselves automatically: the full name shows when it fits, a US-state two-letter abbreviation is tried when it doesn't, and the label hides rather than overlap or spill onto the ocean (`full → abbrev → hide`). POI labels are collision-managed, escalating from inline → leader line → numbered pin in dense clusters. Markers never move. Narrow embeds (a wide map in a column under ~480px) prefer abbreviations and drop reference relief, as if zoomed out.

The only label/legend directives name a channel or attribute the data:

| Directive | Effect |
|-----------|--------|
| `caption Text` | Caption below the map (data-source attribution; travels with the exported image). |
| `region-heat Label` | Names the region heat-ramp legend. |
| `poi-size Label` | Names the POI marker-size channel. |
| `flow-width Label` | Names the edge/leg width (thickness) channel. |
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
- The country-vs-state collision (`Georgia` = country `GE` or US state `US-GA`) is resolved by ISO code (`US-GA heat: 5`) or name + scope (`Georgia US heat: 5`).
- **Airport codes:** a three-letter **IATA code** resolves to that airport — `poi JFK`, `route JFK -> LAX` — for large international hubs and all US scheduled-commercial airports. Case-insensitive, resolved by code only (not by airport name), and the marker label is the code. A code that is also a city name yields the **city** (the airport is the lower-precedence match); an unknown code suggests the `as <CODE>` coordinates escape.
- Positional coordinates are the escape hatch for anything missing or ambiguous (including forcing an airport over a same-named city: `poi 54.56 55.87 as UFA`).

## Directives & Reserved Keys

The full directive set is 12, no colons. Six name intent the renderer can't infer — `region-heat`, `poi-size`, `flow-width`, `locale`, `active-tag`, `caption` — and six are the `no-*` cosmetic opt-outs — `no-legend`, `no-coastline`, `no-relief`, `no-context-labels`, `no-region-labels`, `no-poi-labels`. There is no `projection`, `scale`, `subtitle`, or `surface` directive, and the cosmetic features have no positive opt-in form.

Reserved metadata keys (need colons): `heat`, `size`, `width`, `label`, `style`. The numeric channel splits by element kind — regions use `heat:` (choropleth shade), POIs use `size:` (marker area), and edges/legs use `width:` (line thickness).

## Color Validation

All colors — tag values, a direct color on a region or POI, and the `region-heat` ramp hue — use named palette colors only: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. A place literally named for a color keeps it via capitalization (`poi Orange` is the place; lowercase `orange` is the color). The choropleth ramp defaults to red and follows the active palette automatically.
