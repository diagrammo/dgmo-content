## Syntax

### Arrow syntax

```
sankey Chart Title

Source -> Target value
```

### Indentation syntax

```
sankey

Source
  Target A 300
  Target B 200

Target A
  Sub-target 150
```

Indent targets under a bare source label. Both syntaxes can be mixed in the same diagram.

## Color Annotations

### Node colors

Append a color name (lowercase) after a node name to color that node:

```
Revenue green
  Costs red 600
  Profit blue 400

// or with arrows
Revenue green -> Costs red 600
```

Uncolored nodes use the palette's default series colors.

### Link colors

Append a color name (lowercase) after the value to color a specific link:

```
Revenue
  Costs 600 orange

// or with arrows
Revenue -> Costs 600 orange
```

Uncolored links use a gradient between their source and target node colors.

## Metadata Keys

| Key     | Description                           | Required |
| ------- | ------------------------------------- | -------- |
| `chart` | Must be `sankey`                      | Yes      |
| `title` | Chart title displayed above the chart | No       |

## Data Format

Each data line defines a flow from source to target with a numeric value:

```
Sugar Plantations -> Distillery 3000
Distillery -> Taverns 2000
Distillery -> Ship Provisions 1000
```

Nodes are created automatically from the source and target names. The same node can appear as both a source and a target to create multi-level flows.
