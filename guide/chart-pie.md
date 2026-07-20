```dgmo
pie Crew Roles Distribution

Sailors 45
Gunners 20
Marines 15
Officers 8
Specialists 7
Cooks & Surgeons 5
```

## Overview

Splits one whole into proportional slices so relative share is immediately visible — "what share of the total is each?" Reach for it when you have a handful of categories that add up to a meaningful total: budget split, headcount by department, revenue by product. **Hard precondition: your values must sum to something real.** Every slice is labelled with its percentage of the summed total whether or not that total means anything, so feeding in numbers that don't compose a whole (average rating by product, headcount *and* revenue side by side) invents a denominator and publishes fabricated percentages. If your numbers don't sum to a whole, use [`bar`](chart-bar.md).

## When to use

- **`pie`** — your numbers add up to a meaningful 100% of one thing, and the share is the question.
- **[`bar`](chart-bar.md)** — you're comparing sizes of things that don't sum to anything, or anyone needs to read the individual numbers accurately.
- **[`treemap`](chart-treemap.md)** — your categories contain sub-categories you also want sized.
- **[`ring`](chart-ring.md)** — each layer *contains* the one inside it rather than being a sibling splitting a total.
- **[`polar-area`](chart-polar-area.md)** — the question is "how big is each" on a common scale, with nothing being divided up.
- **[`venn`](chart-venn.md)** — one item can belong to two categories at once. Pie requires every item in exactly one slice.
- **[`wordcloud`](chart-wordcloud.md)** — you only want a texture of which terms come up most, not exact proportions.

## Syntax

```
pie Chart Title

Label value
```

## Doughnut — `hole`

Add `hole` to render the pie as a doughnut ring. Use it bare, or with a ratio
(`hole 0.5`) to set the inner-radius size. The value total is shown in the center
by default — suppress it with `no-center-total`.

```dgmo
pie Crew Roles Distribution
hole

Sailors 45
Gunners 20
Marines 15
Officers 8
Specialists 7
```

> The former standalone `doughnut` chart type was removed in 1.0 — use `pie` + `hole`.

## Directives

| Directive         | Effect                                                    |
| ----------------- | --------------------------------------------------------- |
| `hole`            | Render as a doughnut ring (bare, or `hole <0–0.9>`).       |
| `no-center-total` | Hide the center total (shown by default when `hole` is on).|
| `no-name`         | Hide slice labels.                                          |
| `no-value`        | Hide raw values in slice labels.                            |
| `no-percent`      | Hide the computed percentage in slice labels.               |

The title is line 1 — there is no separate title directive.

## Data Format

Each data line follows the pattern `Label value`:

```
Sailors 45
Gunners 20
Officers 8
```

Percentages are computed as each value over the sum of all values. That sum is
assumed to be the whole — see the Overview before trusting it.

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

- **A pie always reads as 100% of something.** On categories that do not sum to a meaningful whole — average rating per product, headcount per unrelated team — the slices become percentages of a denominator that does not exist. Use [`bar`](chart-bar.md) when the categories are independent.
- **The percentages are recomputed, not read.** Three values of `30` each display as 33%. If you entered numbers you believed added to 100 and they did not, nothing says so — compare the rendered percentages against your source.
- **A label ending in a digit swallows its value.** `Region 5 30` becomes a slice named `Region 5` worth 30. Quote it: `"Region 5" 30`.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`bar`](chart-bar.md) · [`treemap`](chart-treemap.md) · [`ring`](chart-ring.md) · [`polar-area`](chart-polar-area.md) · [`venn`](chart-venn.md) · [`wordcloud`](chart-wordcloud.md)
- **Then:** [Colors & palettes](colors.md)
