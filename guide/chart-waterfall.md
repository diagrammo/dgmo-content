```dgmo
waterfall Plunder Bridge, Spring Voyage to Autumn Voyage (doubloons)

Spring Voyage 1200 total
Merchant Galleons +340
Port Ransoms 210
Naval Skirmish Losses -180
Storm Damage -65
Midyear Hoard total
Smuggling Runs +95
Harbour Bribes -40
Autumn Voyage total
```

## Overview

A waterfall walks from a start to an end. Each step floats from the running total before it to the total after it, so the reader sees which changes pushed the number up, which pulled it down, and where it landed. It is the chart for a **bridge**: revenue year to year, budget to actual, headcount start to end. Write the steps as they happened and close with a bare `total` so the chart adds them up.

## When to use

- **`waterfall`** — you have a start, a list of signed changes, and an end, and the question is what made the number move.
- **[`bar`](chart-bar.md)** — the values are independent sizes to compare, not changes that add up to a result.
- **[`pie`](chart-pie.md)** — the values are shares of one whole, not steps between two levels.
- **[`funnel`](chart-funnel.md)** — every stage is a subset of the one before and only the drop-off matters.

## Syntax

```
waterfall Chart Title

Start 1200 total
Gain +340
Loss -180
Subtotal total
Another gain 95
End total
```

| Row             | Does                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `Label N`       | a step. A bare number is a change; `+` is optional and `-` subtracts                     |
| `Label N total` | a total bar from zero at N. It sets the running total: the start, or a restated baseline |
| `Label total`   | a total bar at the running total so far: a subtotal or the end                           |

- **First row** — if it is not a `total`, the walk starts from 0.
- **Reconcile** — a `Label N total` after the first row whose N differs from the running total draws N and warns, naming both numbers (`FY25 is 1500 but the steps add up to 1560`). Write a bare `Label total` to let the chart do the sum.
- **Crossing zero** — a bar whose walk passes zero draws through the zero line.

## Options

| Option                                  | Effect                                             |
| --------------------------------------- | -------------------------------------------------- |
| `direction down`                        | A cost bridge: a rise is red and a fall is green   |
| `no-connectors`                         | Drop the dashed connectors                         |
| `no-value`                              | Hide the value labels                              |
| `orientation-horizontal` (`horizontal`) | Steps down the left, values across, as on `bar`    |
| `format`, `unit`, `locale`              | The number format of the values and the axis       |
| `subtitle`, `source`, `footnote`        | The chart frame                                    |

Not in this version: stacked steps (one step split into parts) and a percent axis.

## Colours

Rises are green, falls are red and totals are grey. A colour word before the number wins for that bar: `One-off purple +50`. Steps print their signed change in their colour; totals print their level in bold.

## A cost bridge

```dgmo
waterfall Ship Running Costs, Budget to Actual (doubloons)
direction down

Budgeted Costs 900 total
Crew Wages +120
Hull Repairs 85
Rum Rations -40
Powder Savings -55
Rigging Replaced +30
Actual Costs total
```

On costs a rise is bad news, so `direction down` flips the colours: overspend is red, savings are green.

## Appearance

| Directive | Effect |
| --------- | ------ |
| `no-title` | Hide the title line. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **A `total` with a number that does not match the steps** draws your number and warns. Use a bare `Label total` for a subtotal or the end.
- **A row with no number that is not a `total`** is an error.
- **A sign on a `total`** (`Start -50 total`) warns; a total is a level, not a change.
- **`direction` with any value but `down`** is ignored with a warning.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`pie`](chart-pie.md) · [`funnel`](chart-funnel.md)
- **Then:** [Colors & palettes](colors.md)
