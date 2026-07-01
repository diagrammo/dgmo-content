```dgmo
radar Ship Combat Rating

Firepower 85
Speed 70
Armor 60
Maneuverability 90
Crew Morale 75
```

## Syntax

```
radar Chart Title

Label value
```

## Metadata Keys

| Key     | Description                           | Required |
| ------- | ------------------------------------- | -------- |
| `chart` | Must be `radar`                       | Yes      |
| `title` | Chart title displayed above the chart | No       |

## Data Format

Each data line defines one axis of the radar with its value:

```
Firepower 85
Speed 70
Armor 60
```

Values are plotted on axes radiating from the center, connected by a filled polygon.

## Multiple Series

Add a `series` block to compare several subjects on the same axes. Each subject
draws its own polygon in its series color, and a legend is added. Every data row
then carries one value per series (in series order):

```dgmo
radar Ship Combat Ratings by Vessel
series
  Black Pearl blue
  Queen Anne's Revenge green
  Flying Dutchman purple

Firepower       85  70  95
Speed           90  65  55
Armor           60  80  90
Maneuverability 88  62  50
Crew Morale     75  85  70
Cannon Range    70  78  92
```

The trailing color token after each series name is optional — omit it and series
take palette colors by index.
