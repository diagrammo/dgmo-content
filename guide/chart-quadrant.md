## Syntax

```
quadrant Chart Title
x-label Low Label, High Label
y-label Low Label, High Label

top-right Quadrant Label color
top-left Quadrant Label color
bottom-left Quadrant Label color
bottom-right Quadrant Label color

Item Name x, y
```

## Metadata Keys

| Key            | Description                                             | Required |
| -------------- | ------------------------------------------------------- | -------- |
| `chart`        | Must be `quadrant`                                      | Yes      |
| `title`        | Chart title displayed above the chart                   | No       |
| `x-label`      | Two comma-separated labels for X axis (low, high)       | No       |
| `y-label`      | Two comma-separated labels for Y axis (low, high)       | No       |
| `top-right`    | Label for the top-right quadrant with optional color    | No       |
| `top-left`     | Label for the top-left quadrant with optional color     | No       |
| `bottom-left`  | Label for the bottom-left quadrant with optional color  | No       |
| `bottom-right` | Label for the bottom-right quadrant with optional color | No       |

## Data Format

Each data point specifies X and Y coordinates between 0 and 1:

```
Item A 0.9, 0.95
Item B 0.4, 0.3
```

## Quadrant Colors

Colors can be specified in parentheses after each quadrant label:

```
top-right Promote green
top-left Train yellow
bottom-left Maroon red
bottom-right Watch Closely purple
```
