```dgmo
timeline The Golden Age of Piracy (1716–1722)
scale on

tag Pirate as p
  Blackbeard red
  Bonny & Rackham purple
  Roberts blue

tag Outcome as o
  Victory green
  Defeat red
  Uncertain yellow

tag Theatre as t
  Caribbean teal
  Atlantic blue
  Africa orange

era 1716->1718 Nassau Republic
era 1719->1722 Roberts Era

marker 1718-07 Woodes Rogers arrives orange
marker 1721-08 Roberts reaches peak teal

1716 -> 1717 Sails under Hornigold p: Blackbeard, o: Victory
1717-11 -> 1718-06 Commands Queen Anne's Revenge p: Blackbeard, o: Victory, t: Atlantic
1718-05 Blockades Charleston harbor p: Blackbeard, o: Victory
1718-11-22 Killed at Ocracoke p: Blackbeard, o: Defeat
1718 -> 1719 Rackham builds crew in Nassau p: Bonny & Rackham, o: Victory
1719-03 -> 1720-10? Bonny & Rackham raid together p: Bonny & Rackham
1720-11 Rackham hanged at Port Royal p: Bonny & Rackham, o: Defeat
1719-06 -> 1720 Raids West African coast p: Roberts, o: Victory, t: Africa
1720 -> 1722 Captures 400+ ships p: Roberts, o: Victory, t: Atlantic
1722-02-10 Killed at Cape Lopez p: Roberts, o: Defeat, t: Africa
```

## Syntax

```
timeline Chart Title
sort group

era YYYY->YYYY Era Name

marker YYYY-MM-DD Marker Label color

[Group Name] color
YYYY -> YYYY Span event
YYYY-MM-DD Point event
```

## Metadata Keys

| Key         | Description                                                                                           | Required |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------- |
| `chart`     | Must be `timeline`                                                                                    | Yes      |
| `title`     | Chart title displayed above the chart                                                                 | No       |
| `sort`      | Event ordering: `time` (default), `group`, `tag`, or `tag:GroupName`                                  | No       |
| `swimlanes` | Show shaded backgrounds per group (boolean; `no-swimlanes` to disable). Works best with `sort group`. | No       |

## Event Format

Events use date-first syntax. The date comes first, then the event name, then optional trailing metadata.

### Point Events

A date followed by the event name:

```
1718-11-22 Killed at Ocracoke
1720-11 Rackham hanged at Port Royal
```

### Range Events

A start date, arrow, end date, then the event name:

```
1717-11 -> 1718-06 Commands Queen Anne's Revenge
1720 -> 1722 Captures 400+ ships
```

### Duration Events

Instead of specifying an end date, add a `duration:` value after the event name:

```
2026-07-15 Film release window duration: 30d
2026-06-01 Festival run duration: 2w
2026-01 Award season duration: 6m
2026 Franchise arc duration: 2y
```

> `duration:` is the canonical (and only) form. A bare trailing duration-like token is **not** treated as a duration — it just becomes part of the event name, so `2026-07-15 Film release window 30d` is a point event titled "Film release window 30d", and `1918 42d Street Parade` is titled "42d Street Parade". This keeps names that happen to start with a duration-like word unambiguous; always use `duration:` to apply a duration.

Supported duration units:

| Unit  | Meaning |
| ----- | ------- |
| `s`   | Seconds |
| `min` | Minutes |
| `h`   | Hours   |
| `d`   | Days    |
| `w`   | Weeks   |
| `m`   | Months  |
| `y`   | Years   |

Decimals are supported (up to 2 places):

```
2026-01 Fifteen months duration: 1.25y
2026-01 Half year duration: 0.5y
2026-01-01 Six weeks duration: 1.5m
```

The end date is calculated automatically and preserves the precision of the start date.

### Uncertain End Dates

Add `?` to the end date or duration value to indicate an uncertain or approximate end date. The bar will fade out over the last 20%:

```
2026-07-15 Project Alpha duration: 3m?
2026-01 Long-term initiative duration: 1.5y?
1719-03 -> 1720-10? Rackham's crew
```

This visually communicates that the end date is an estimate rather than a fixed deadline.

### Date Precision

Dates support these levels of precision:

- Year: `1718`
- Year-Month: `1718-05`
- Year-Month-Day: `1718-11-22`
- Year-Month-Day Time: `2024-01-15 14:30`
- Year-Month-Day Time with seconds: `2024-01-15 14:30:45`

Hours are `0–23`, minutes and seconds `0–59`. Sub-minute spans get second-level axis ticks automatically, so launch sequences, race splits, or incident postmortems read cleanly:

```dgmo
timeline Launch Sequence
2024-01-15 10:00:00 Ignition
2024-01-15 10:00:08 Liftoff
2024-01-15 10:00:45 Max-Q
2024-01-15 10:02:30 Stage separation
```

### BCE / Ancient Dates

Suffix a year with `BCE` (or `BC`) for pre–Common-Era dates. `CE`/`AD` are accepted as positive no-ops. The marker is what distinguishes an ancient year from a stray number, so 1–3 digit years are fine here (a bare `753` is not a date). Dates display normalized as `753 BCE`, and ranges may cross the boundary:

```dgmo
timeline Ancient Rome
753 BCE Rome founded
509 BCE Republic begins
44 BCE Caesar assassinated
27 BCE -> 14 CE Reign of Augustus
476 CE Western Empire falls
```

Numbering is astronomical-naive (`N BCE` maps to internal year `-N`), so events order correctly but there is no special year-0 adjustment.

## Eras

Background shaded regions that span a time range:

```
era 1716->1718 Nassau Republic
era 1719->1722 Roberts Era
```

## Markers

Notable moments displayed as a dashed vertical line with a diamond indicator:

```
marker 1718-11-22 Blackbeard Killed red
marker 1720-11 Trial at Port Royal orange
```

Markers are not associated with groups and appear above all events. They're useful for highlighting key dates that span across all timeline tracks.

## Groups

Use `[Group Name] color` headers to organize events into colored tracks. Events must be indented under the group header.

```
[Blackbeard] red
  1716 -> 1717 Sails under Hornigold
  1718-11-22 Killed at Ocracoke

[Roberts] blue
  1719-06 -> 1720 Raids West African coast
  1722-02-10 Killed at Cape Lopez
```

When `[Group]` headers are present, the timeline automatically renders as horizontal swimlanes: one labeled row per group with a `▼` collapse toggle in the header. Click any group header to collapse that group into a single date-range summary bar showing `Group Name (N events)`; click again to expand. Ungrouped events appear in an implicit `(Other)` lane at the bottom.

To opt out of swimlanes and render events as a flat time-sorted list, add `sort time`.

## Tag Groups

Tag groups let you color and organize events by metadata categories like team, priority, or status — independent of the timeline's structural groups.

### Declaring Tag Groups

```
tag Team
  Engineering blue
  Design green
  QA orange
```

Each entry has a name and a color:

```
tag Priority
  High red
  Medium yellow
  Low gray
```

### Tagging Events

Add tag metadata after the event name as trailing key-value pairs:

```
2024-01 -> 2024-06 Build API Team: Engineering
2024-03 -> 2024-05 UX Review Team: Design, Priority: High
```

Multiple tags can be separated by commas.

### Tag-Based Swimlanes

Use `sort: tag` or `sort: tag:GroupName` to arrange events into swimlanes by tag value:

```dgmo
timeline Project Roadmap
sort tag:Team

tag Team
  Engineering blue
  Design green
  QA orange

tag Priority
  High red
  Medium yellow
  Low gray

2024-01 -> 2024-06 Build API Team: Engineering, Priority: High
2024-03 -> 2024-05 UX Review Team: Design, Priority: Medium
2024-04 -> 2024-07 Integration Tests Team: QA, Priority: High
2024-02 -> 2024-04 Design System Team: Design, Priority: Low
```

- `sort tag` — uses the first declared tag group for swimlanes
- `sort tag:GroupName` — uses a specific tag group (aliases work: `sort tag:t` resolves to `sort tag:Team`)

### Interactive Legend

When tag groups are declared, a legend appears above the chart. Click a tag group pill to activate it — events are colored by that group's values. The swimlane tag group controls the spatial layout; the active tag group controls the coloring. These can be set independently.
