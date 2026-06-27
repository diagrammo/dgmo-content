```dgmo
bar Treasure Hauls by Port

Port Royal 850
Tortuga 620
Nassau 1100
Havana 430
Cartagena 780
```

## Syntax

```
bar Chart Title
x-label X Axis Label
y-label Y Axis Label

Label value
```

A single-series bar needs no series declaration — one value per row.

## Multi-series — `stack` or `group`

Declare multiple series with a **layout block header**: `stack` (stacked bars,
one bar per category) or `group` (clustered, side-by-side). The header names the
layout — `series` is not used on bar charts.

```dgmo
bar Support Tickets by Priority
x-label Month
y-label Tickets

stack
  Critical red
  High orange
  Low green

January 8 24 45
February 12 19 51
March 6 22 38
```

Swap `stack` for `group` to render the series side by side instead of stacked.

## Metadata Keys

| Key                      | Description                                  | Required |
| ------------------------ | -------------------------------------------- | -------- |
| `title`                  | Chart title displayed above the chart        | No       |
| `stack` / `group`        | Multi-series layout block header (see above) | No       |
| `x-label`                | Label for the X axis                         | No       |
| `y-label`                | Label for the Y axis                         | No       |
| `orientation-horizontal` | Horizontal bars (default is vertical)        | No       |
| `color`                  | Override the bar color (e.g., `red`)         | No       |

## Data Format

Each data line follows the pattern `Label value`:

```
Port Royal 850
Tortuga 620
Nassau 1100
```

## Variants

### Horizontal Bar

Add `orientation-horizontal` to display bars horizontally:

```dgmo
bar Crew Size by Ship
orientation-horizontal

Queen Anne's Revenge 300
Royal Fortune 262
Whydah Gally 146
Adventure Galley 152
```
