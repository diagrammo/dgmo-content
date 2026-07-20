```dgmo
function Trig & Exponential Curves
x-label x
y-label f(x)
x 0 to 10

Sine blue: sin(x)
Cosine green: cos(x)
Exponential decay red: exp(-x/4)
```

## Overview

Plots mathematical expressions as continuous curves over a range of x — you supply the *formula*, not a table of readings, and the curve is sampled and drawn for you. Reach for it to plot an equation, compare several curves over the same range, or model how one variable responds to another. If you already have measured numbers rather than a formula, this is the wrong chart.

## When to use

- **`function`** — you have a *formula* (`sin(x)`, `x^2`, `exp(-x/4)`) and want the curve drawn from it over a continuous range.
- **[`line`](chart-line.md)** — you have a *list of readings* (a value per month, per day, per trial) rather than an equation.
- **[`scatter`](chart-scatter.md)** — you have discrete observed points, each an independent thing measured two ways, with no continuous equation behind them.

## Syntax

```
function Chart Title
x-label X Axis Label
y-label Y Axis Label
x: min to max

Label color: expression
```

## Metadata Keys

| Key       | Description                           | Required |
| --------- | ------------------------------------- | -------- |
| `chart`   | Must be `function`                    | Yes      |
| `x-label` | Label for the X axis                  | No       |
| `y-label` | Label for the Y axis                  | No       |
| `x`       | X range in format `min to max`        | No       |

The title is the rest of line 1 — there is no `title` directive.

## Data Format

Each data line defines a named function with an optional color and a math expression:

```
Label color: expression
```

Expressions support:

- Basic arithmetic: `+`, `-`, `*`, `/`
- Exponents: `x^2`, `x^3`
- Functions: `sin`, `cos`, `tan`, `exp`, `ln`, `log`, `sqrt`, `abs`
- Constants: `pi`, `e`
- The variable `x` represents the X axis value

## Colors

Append a color name (lowercase) after the function name:

```
Parabola blue: x^2
Linear red: 2*x + 1
```

## Shading the area below a curve

Function curves are drawn as stroked lines only — this chart type has no area fill. If you need the region under a series shaded down to the baseline, plot the same data with [`line`](chart-line.md) and its `fill` directive.

```dgmo
function Trajectories
x 0 to 250

15 degrees blue: -0.001*x^2 + 0.27*x
30 degrees green: -0.002*x^2 + 0.58*x
```

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

## Next

- **Related:** [`line`](chart-line.md) · [`scatter`](chart-scatter.md)
- **Then:** [Colors & palettes](colors.md)
