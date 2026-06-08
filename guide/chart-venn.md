```dgmo
venn Pirate Skill Overlap

Swordsmanship as sw red
Navigation as nav blue
Leadership as lead green

sw + nav Sea Raiders
nav + lead Voyager Captains
sw + lead Buccaneer Chiefs
sw + nav + lead Legendary Pirates
```

## Syntax

```
venn Chart Title

<name> [as <alias>] [color]

<A> + <B> Label
<A> + <B> + <C> Label
```

## Metadata Keys

| Key     | Description                             | Required |
| ------- | --------------------------------------- | -------- |
| `chart` | Must be `venn`                          | Yes      |
| `title` | Chart title displayed above the diagram | No       |

## Sets

Each set is defined as a name with an optional alias and an optional color. 2 or 3 sets are supported. Modifier order follows the universal rule (§2A.2): name first, then `as <alias>`, then the trailing-token color.

```
Swordsmanship as sw red
Navigation as nav blue
Leadership as lead green
```

### Colors

Append a lowercase color word at the end of the line — after the alias if present:

```
Math as m blue
Science as s orange
```

Supports named colors: `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`.

### Aliases

Use `as` to define a short name for intersections:

```
Swordsmanship as sw red
Navigation as nav blue
```

The alias (`sw`, `nav`) is used when defining intersections. The full name is shown in the diagram.

## Intersections

Intersection lines use `+` to reference two or three sets by alias, followed by a label:

```
sw + nav Sea Raiders
nav + lead Voyager Captains
sw + nav + lead Legendary Pirates
```

- The label follows the last set reference (no colon)
- Set references use the alias, not the full name

## Constraints

- Minimum 2 sets, maximum 3 sets
