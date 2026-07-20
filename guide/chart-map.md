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

Map diagrams put your data on a **real geographic map** — shaded regions, points of interest, and routes — for anything where *where* is the organizing dimension: data shaded by region, offices and sites pinned as points, voyages and flows drawn between them. Map diagrams are geographic concept maps: highlight or shade political subdivisions, drop points of interest (POIs), and connect them with routes or edges. They're for *sharing a concept* — territories, presence, voyages — not cartography. The map renders at a fixed, auto-fit position (no pan/zoom), and **everything is inferred from the content you reference** — basemap, viewport, projection, and ramp. A bare `map` is already the good-looking map: coastlines, mountain relief on reference maps, region and POI labels, and orientation labels all render by default. v1 boundaries are world countries and US states.

## When to use

- **`map`** — the positions correspond to real places on Earth, and losing the geography would lose the point.
- **[`clock`](chart-clock.md)** — if the question is only *when* ("what time is it for them right now?"), a clock answers it directly. A map answers *where they are*; it grows live time cards as a side channel, not as its subject.
- **[`heatmap`](chart-heatmap.md)** — the rows and columns are named categories and the geography is irrelevant. Conversely, if your rows are states or countries, a grid throws away the adjacency the reader came for — use the map.
- **[`scatter`](chart-scatter.md)** — the two dimensions are just numbers, not latitude and longitude.
- **[`arc`](chart-arc.md)** — the endpoints of your connections are abstract. Use the map when they have real locations.
- **[`body`](chart-body.md)** — you're labeling parts of a person rather than parts of the Earth.

## Syntax

```
map Title

// names the heat-ramp legend
region-heat Output

// choropleth fill
Florida heat: 42
// categorical fill (via a tag alias)
Texas p: Friendly

// a point of interest
poi Tokyo size: 80
// ordered voyage: origin + arrow legs
route Tokyo
  // ~> = arc leg, -> = straight leg
  ~> Singapore
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

// label defaults to "Paris"
poi Paris
// anchored at Berlin; shows "DACH Region"
poi Berlin label: DACH Region
// positional coords (lat lon), signed
poi 41.9 12.5 as rome
// size: scales the marker area (a data channel)
poi Madrid size: 200
// categorical colour via a tag alias
poi Amsterdam n: Headquarters
// direct marker colour (trailing token)
poi 59.33 18.07 as stockholm teal
```

- **Coordinates are positional** — two leading signed numbers, latitude then longitude. Cities never start with a number, so there's no ambiguity.
- `size:` scales the marker area; pair it with `poi-size Label` for a legend key.
- A trailing color sets the marker fill directly — `poi Mumbai red` — winning over a tag colour and the default orange; no tag group needed.
- POI properties: `label`, `size`, `style`, `clock`, an applied tag alias, and `as`. There are no POI icons in v1.
- Coord-positioned or relabeled POIs take `as <alias>` so routes and edges can reference them; named POIs are referenced by name.

## Live local-time cards

Flag a POI with `clock` and it grows a small card above the marker showing the **current local time** at that place — a live world-clock pinned to the map, for "where is everyone right now" office/team maps. The card reads out the big local time (seconds and am/pm bracketing the hour), a status dot, and the weekday *only* when it differs from the viewer's. Cards tick live in the browser; the CLI and PNG export bake a snapshot of the moment they render.

```dgmo
map Follow-the-Sun Support Desk

hours 9-17
workweek mon-fri

poi San Francisco clock label: West Coast
poi London clock label: EMEA
poi Singapore clock label: APAC
poi Sydney clock label: Pacific
```

- **`clock` (bare flag)** — the POI's IANA time zone is derived from the gazetteer, so a named city needs no zone. Peel it anywhere on the line (`poi Tokyo clock, size: 80`).
- **`clock: <zone>` (valued)** — names the zone explicitly. **Required for a bare-coordinate pin** (no gazetteer entry to derive from), and an override on a named city. Takes an IANA id (`clock: Asia/Tokyo`) or a fixed offset (`clock: UTC+9`, DST-blind). A zone that contradicts a known city's real zone warns but is honored.
- **`label:` names the office** — a multi-word display name lives on `label:`, not `as` (the map's `as` alias is a single ≤12-char token that doesn't render).
- **`hours 9-17` + `workweek mon-fri`** — header directives that set one availability window applied to every clock pin, each evaluated **in its own local zone**. They drive the status dot: open, closing soon, or closed. Ranges accept `9-17`, `9am-5pm`, or `8:30-5:15`; `workweek` takes `mon-fri` or a list like `mon,wed,fri`. `workweek` needs `hours` to have any effect.

A bare-coordinate pin needs the valued form to place its zone:

```dgmo
map Field Team Clocks

hours 8-16
workweek mon-fri

// zone from the gazetteer
poi Denver clock
// coord pin — zone required
poi 39.74 -104.98 as field clock: America/Denver
```

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

// hub/star — indented edges share the source
poi Singapore as hub
  -> Tokyo
  -> Mumbai

// labeled; width = thickness
Mumbai -ships-> Singapore width: 22
```

`~>` curves a single edge. There's no geographic path-finding — legs are straight or arced.

### Edge arrows

| Arrow | Meaning |
|-------|---------|
| `A -> B` | Directed, straight. |
| `A ~> B` | Directed, arced. |
| `A -- B` | **Undirected** — a plain link with no arrowhead, for "these two are connected" rather than "this flows to that". |
| `A -label-> B` | Any of the above with an inline label between the dashes (`~label~>` for the arced form). |

Both endpoints must be non-empty; a malformed arrow is an error naming the line.

```dgmo
map Undersea Cable Landings

poi Lisbon
poi Casablanca
poi Dakar

Lisbon -- Casablanca
Casablanca -- Dakar
```

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

Everything cosmetic is on by default. The only switch is a bare `no-*` opt-out — there are no positive opt-in flags.

| Flag | Turns off |
|------|-----------|
| `no-coastline` | Coastal water-lines. |
| `no-relief` | Mountain-range relief shading. |
| `no-context-labels` | Orientation labels (water bodies + nearby countries). |
| `no-region-labels` | On-map subdivision names. |
| `no-region-heat-value` | The heat value printed under each shaded region (keeps the name). |
| `no-poi-labels` | On-map POI labels. |
| `no-cities` | The subtle reference city dots scattered across the basemap. |
| `no-colorize` | Automatic per-region coloring — forces the plain green-land reference dress. |
| `no-cluster-pois` | POI clustering: coincident markers always fan out instead of collapsing into a count badge. |
| `no-legend` | The whole legend block. |
| `no-title` | The title banner. |

The four basemap flags for a plain, data-journalism look are `no-coastline`,
`no-relief`, `no-context-labels`, and `no-cities`.

## Name Resolution

- Admin units use **ISO 3166** — geometry is keyed by code, so `United States`, `USA`, and `US` all resolve alike.
- Cities use **GeoNames** with alias/accent matching, population ranking, and did-you-mean hints.
- `locale <ISO>` sets a default scope for bare names — a country (`locale US`) or subdivision (`locale US-GA`, which prefers cities in that state). Inferred from content if unset.
- **Disambiguate once:** add a trailing ISO code at first mention — `San Jose CR` (country) or `Portland US-OR` (subdivision) — then use the bare name. Two same-named cities → give each an `as <alias>`.
- The country-vs-state collision (`Georgia` = country `GE` or US state `US-GA`) is resolved by ISO code (`US-GA heat: 5`) or name + scope (`Georgia US heat: 5`).
- **Airport codes:** a three-letter **IATA code** resolves to that airport — `poi JFK`, `route JFK -> LAX` — for large international hubs and all US scheduled-commercial airports. Case-insensitive, resolved by code only (not by airport name), and the marker label is the code. A code that is also a city name yields the **city** (the airport is the lower-precedence match); an unknown code suggests the `as <CODE>` coordinates escape.
- Positional coordinates are the escape hatch for anything missing or ambiguous (including forcing an airport over a same-named city: `poi 54.56 55.87 as UFA`).

## Directives & Reserved Keys

The directive set has no colons, and splits in two.

**Naming intent the renderer can't infer** — `region-heat`, `poi-size`,
`flow-width`, `locale`, `active-tag`, `caption`, plus `hours` and `workweek`
(the clock availability window; `days` is accepted as a spelling of `workweek`).

**Cosmetic opt-outs**, all bare flags — `no-legend`, `no-title`, `no-coastline`,
`no-relief`, `no-context-labels`, `no-region-labels`, `no-region-heat-value`,
`no-poi-labels`, `no-cities`, `no-colorize`, `no-cluster-pois`. See
[Turning things off](#turning-things-off).

There is no `projection`, `scale`, `subtitle`, or `surface` directive, and the
cosmetic features have no positive opt-in form.

Reserved metadata keys (need colons): `heat`, `size`, `width`, `label`, `style`, `clock`. The numeric channel splits by element kind — regions use `heat:` (choropleth shade), POIs use `size:` (marker area), and edges/legs use `width:` (line thickness). `clock` is unusual — it works bare (a flag, deriving the zone) or valued (`clock: <zone>`).

## Color Validation

All colors — tag values, a direct color on a region or POI, and the `region-heat` ramp hue — use named palette colors only: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`. A place literally named for a color keeps it via capitalization (`poi Orange` is the place; lowercase `orange` is the color). The choropleth ramp defaults to red and follows the active palette automatically.

## Appearance

Map opts out of the universal fill family — a map's tint *is* its data, so
`fill-tint` / `fill-solid` / `fill-outline` would fight the choropleth. The
universal switches it does take:

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Everything else cosmetic is a map-specific `no-*` flag — see
[Turning things off](#turning-things-off). Colors come from the active palette —
see [Colors](colors.md). Set the palette and light/dark theme at render time with
`--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Place tokens must resolve.** An unrecognized name is a hard error naming the token, not a silent omission — use the suggested lookup, an ISO code, or coordinates rather than guessing at a spelling.
- **A city is not a region.** Region syntax colors an administrative area; a city is a point of interest and needs the point syntax. Writing a city where a region is expected fails the lookup.
- **Reach for [`heatmap`](chart-heatmap.md) instead** when the geography is incidental and you are really comparing rows against columns.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`clock`](chart-clock.md) · [`heatmap`](chart-heatmap.md) · [`scatter`](chart-scatter.md) · [`arc`](chart-arc.md) · [`body`](chart-body.md)
- **Then:** [Colors & palettes](colors.md)
