```dgmo
funnel Pirate Recruitment Pipeline

Port Visitors 1000
Tavern Recruits 500
Crew Trials 200
Sworn Pirates 100
Veteran Buccaneers 50
```

## Overview

Shows how a quantity narrows through sequential stages, exposing where the biggest **drop off** happens — the standard for conversion and pipeline analysis. Reach for it for conversion drop-off by stage, a sales or recruitment pipeline, or working out where users leave a flow. **Hard precondition: every stage must be a subset of the one above it.** The chart asserts that the people counted in "Purchases" are the same people previously counted in "Signups", and that the difference between the two bands is attrition. If that isn't true of your data, a funnel states something false.

## When to use

- **`funnel`** — each stage is a strict subset of the stage before, everything flows down one single path, and the shrinkage *is* the finding.
- **[`bar`](chart-bar.md)** — your categories are independent and nothing is a subset of anything. A funnel on independent categories manufactures an attrition story that does not exist, and because band widths are proportional, non-monotonic numbers render as a physically impossible shape.
- **[`pyramid`](chart-pyramid.md)** — the layers *rest on* each other and are all present at once (needs, tiers, maturity levels) rather than losing members stage by stage. Maslow drawn as a funnel claims people drop out of having needs.
- **[`sankey`](chart-sankey.md)** — the quantity splits and branches to several destinations instead of flowing down one path.
- **[`goal`](chart-goal.md)** — you have one number racing toward one target, not several stages each losing volume.
- **[`flowchart`](chart-flowchart.md)** — you're showing branches and decisions rather than counts dropping at each stage.

## Syntax

```
funnel Chart Title

Label value
```

The title is the rest of line 1 (`funnel Signup Funnel`) — there is no `title` directive.

## Data Format

Each data line defines a stage with its value. Stages are displayed top-to-bottom with widths proportional to their values:

```
Visitors 1000
Signups 500
Purchases 100
```

Stages must descend from largest to smallest. This is a correctness requirement, not a styling preference: each stage is drawn as a subset of the one above it, and the gap between two bands is read as drop-off. A stage larger than its predecessor is data the chart cannot represent — the widths are proportional, so it renders as a shape that contradicts itself. If your numbers don't shrink monotonically, they aren't funnel data; use [`bar`](chart-bar.md).

## Labels

Each stage renders its name to the left of the band (in the band's color), its value inside the band, and a stage-over-stage conversion percentage to the right. The first stage has no percentage — there is nothing to convert from. Suppress any part with a bare flag line:

| Flag         | Effect                                        |
| ------------ | --------------------------------------------- |
| `no-name`    | Hide the stage names left of each band        |
| `no-value`   | Hide the value inside each band               |
| `no-percent` | Hide the conversion % right of each band      |

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Funnel asserts that each stage is a subset of the one above** and the gap is drop-off. On independent categories you have manufactured an attrition story that your data does not support — use [`bar`](chart-bar.md).
- **Non-monotonic values are silently reordered.** Write a stage larger than the one above it and the funnel sorts it to the top rather than flagging the impossible shape. If your rendered order is not your written order, your data is not funnel-shaped.
- **Trailing `//` notes reject the whole row.** The stage disappears with a warning about an unexpected line. Comments are full-line only.
- **A tapering shape is not always a funnel.** Simultaneous levels resting on a base are a [`pyramid`](chart-pyramid.md); sequential loss is a funnel.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`pyramid`](chart-pyramid.md) · [`sankey`](chart-sankey.md) · [`goal`](chart-goal.md) · [`flowchart`](chart-flowchart.md)
- **Then:** [Colors & palettes](colors.md)
