# Timeline

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
  Uncertain yellow default

tag Theatre as t
  Caribbean teal default
  Atlantic blue
  Africa orange

era 1716->1718 Nassau Republic
era 1719->1722 Roberts Era

marker 1718-07 Woodes Rogers arrives orange
marker 1721-08 Roberts reaches peak teal

Sails under Hornigold start: 1716, end: 1717, p: Blackbeard, o: Victory
Commands Queen Anne's Revenge start: 1717-11, end: 1718-06, p: Blackbeard, o: Victory, t: Atlantic
Blockades Charleston harbor start: 1718-05, p: Blackbeard, o: Victory
Killed at Ocracoke start: 1718-11-22, p: Blackbeard, o: Defeat
Rackham builds crew in Nassau start: 1718, end: 1719, p: Bonny & Rackham, o: Victory
Bonny & Rackham raid together start: 1719-03, end: 1720-10?, p: Bonny & Rackham
Rackham hanged at Port Royal start: 1720-11, p: Bonny & Rackham, o: Defeat
Raids West African coast start: 1719-06, end: 1720, p: Roberts, o: Victory, t: Africa
Captures 400+ ships start: 1720, end: 1722, p: Roberts, o: Victory, t: Atlantic
Killed at Cape Lopez start: 1722-02-10, p: Roberts, o: Defeat, t: Africa
```

## Syntax

```
timeline Chart Title
sort group

era YYYY->YYYY Era Name

marker YYYY-MM-DD Marker Label color

[Group Name] color
Span event start: YYYY, end: YYYY
Point event start: YYYY-MM-DD
```

## Metadata Keys

| Key         | Description                                                                                           | Required |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------- |
| `chart`     | Must be `timeline`                                                                                    | Yes      |
| `title`     | Chart title displayed above the chart                                                                 | No       |
| `sort`      | Event ordering: `time` (default), `group`, `tag`, or `tag:GroupName`                                  | No       |
| `swimlanes` | Show shaded backgrounds per group (boolean; `no-swimlanes` to disable). Works best with `sort group`. | No       |

## Event Format

Events use name-first syntax with `start:`, `end:`, and `duration:` as reserved metadata keys.

### Point Events

An event name followed by `start:` and a date:

```
Killed at Ocracoke start: 1718-11-22
Rackham hanged at Port Royal start: 1720-11
```

### Range Events

An event name with `start:` and `end:` dates:

```
Commands Queen Anne's Revenge start: 1717-11, end: 1718-06
Captures 400+ ships start: 1720, end: 1722
```

### Duration Events

Instead of specifying an end date, you can use `duration:`:

```
Film release window start: 2026-07-15, duration: 30d
Festival run start: 2026-06-01, duration: 2w
Award season start: 2026-01, duration: 6m
Franchise arc start: 2026, duration: 2y
```

Supported duration units:

| Unit | Meaning |
| ---- | ------- |
| `d`  | Days    |
| `w`  | Weeks   |
| `m`  | Months  |
| `y`  | Years   |

Decimals are supported (up to 2 places):

```
Fifteen months start: 2026-01, duration: 1.25y
Half year start: 2026-01, duration: 0.5y
Six weeks start: 2026-01-01, duration: 1.5m
```

The end date is calculated automatically and preserves the precision of the start date.

### Uncertain End Dates

Add `?` to the `end:` or `duration:` value to indicate an uncertain or approximate end date. The bar will fade out over the last 20%:

```
Project Alpha start: 2026-07-15, duration: 3m?
Long-term initiative start: 2026-01, duration: 1.5y?
Rackham's crew start: 1719-03, end: 1720-10?
```

This visually communicates that the end date is an estimate rather than a fixed deadline.

### Date Precision

Dates support four levels of precision:

- Year: `1718`
- Year-Month: `1718-05`
- Year-Month-Day: `1718-11-22`
- Year-Month-Day Time: `2024-01-15 14:30`

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

Use `[Group Name] color` headers to organize events into colored tracks:

```
[Blackbeard] red
Sails under Hornigold start: 1716, end: 1717
Killed at Ocracoke start: 1718-11-22

[Roberts] blue
Raids West African coast start: 1719-06, end: 1720
Killed at Cape Lopez start: 1722-02-10
```

## Tag Groups

Tag groups let you color and organize events by metadata categories like team, priority, or status — independent of the timeline's structural groups.

### Declaring Tag Groups

```
tag Team
  Engineering blue
  Design green
  QA orange
```

Each entry has a name and a color. You can add `default` to an entry to apply it to untagged events when the group is active:

```
tag Priority
  High red
  Medium yellow default
  Low gray
```

### Tagging Events

Add tag metadata after the event name alongside scheduling keys:

```
Build API start: 2024-01, end: 2024-06, Team: Engineering
UX Review start: 2024-03, end: 2024-05, Team: Design, Priority: High
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

Build API start: 2024-01, end: 2024-06, Team: Engineering, Priority: High
UX Review start: 2024-03, end: 2024-05, Team: Design, Priority: Medium
Integration Tests start: 2024-04, end: 2024-07, Team: QA, Priority: High
Design System start: 2024-02, end: 2024-04, Team: Design, Priority: Low
```

- `sort tag` — uses the first declared tag group for swimlanes
- `sort tag:GroupName` — uses a specific tag group (aliases work: `sort tag:t` resolves to `sort tag:Team`)

### Interactive Legend

When tag groups are declared, a legend appears above the chart. Click a tag group pill to activate it — events are colored by that group's values. The swimlane tag group controls the spatial layout; the active tag group controls the coloring. These can be set independently.
