```dgmo
pie Crew Roles Distribution

Sailors 45
Gunners 20
Marines 15
Officers 8
Specialists 7
Cooks & Surgeons 5
```

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

## Metadata Keys

| Key               | Description                                          | Required |
| ----------------- | ---------------------------------------------------- | -------- |
| `chart`           | Must be `pie`                                        | Yes      |
| `title`           | Chart title displayed above the chart                | No       |
| `hole`            | Render as a doughnut ring (bare, or `hole <0–0.9>`)  | No       |
| `no-center-total` | Hide the center total (shown by default when `hole`) | No       |

## Data Format

Each data line follows the pattern `Label value`:

```
Sailors 45
Gunners 20
Officers 8
```

Slices are automatically colored using the Nord palette.
