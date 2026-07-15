```dgmo
function Trig & Exponential Curves
x-label x
y-label f(x)
x 0 to 10

Sine blue: sin(x)
Cosine green: cos(x)
Exponential decay red: exp(-x/4)
```

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
| `title`   | Chart title displayed above the chart | No       |
| `x-label` | Label for the X axis                  | No       |
| `y-label` | Label for the Y axis                  | No       |
| `x`       | X range in format `min to max`        | No       |
| `fill`    | Shade the area below each curve        | No       |

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

## Filled Area — `fill`

Add `fill` to shade the area below each curve down to the baseline — the same directive as `line` + `fill`. The fill is a translucent 25% tint of each curve's color; add `fill-solid` for opaque bands.

```
function Trajectories
x 0 to 250
fill

15 degrees blue: -0.001*x^2 + 0.27*x
30 degrees green: -0.002*x^2 + 0.58*x
```
