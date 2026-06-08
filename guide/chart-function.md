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

## Data Format

Each data line defines a named function with an optional color and a math expression:

```
Label color: expression
```

Expressions support:

- Basic arithmetic: `+`, `-`, `*`, `/`
- Exponents: `x^2`, `x^3`
- The variable `x` represents the X axis value

## Colors

Append a color name (lowercase) after the function name:

```
Parabola blue: x^2
Linear red: 2*x + 1
```
