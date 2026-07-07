```dgmo
funnel Pirate Recruitment Pipeline

Port Visitors 1000
Tavern Recruits 500
Crew Trials 200
Sworn Pirates 100
Veteran Buccaneers 50
```

## Syntax

```
funnel Chart Title

Label value
```

## Metadata Keys

| Key     | Description                           | Required |
| ------- | ------------------------------------- | -------- |
| `chart` | Must be `funnel`                      | Yes      |
| `title` | Chart title displayed above the chart | No       |

## Data Format

Each data line defines a stage with its value. Stages are displayed top-to-bottom with widths proportional to their values:

```
Visitors 1000
Signups 500
Purchases 100
```

List stages from largest to smallest for a classic funnel shape.

## Labels

Each stage renders its name to the left of the band (in the band's color), its value inside the band, and a stage-over-stage conversion percentage to the right. The first stage has no percentage — there is nothing to convert from. Suppress any part with a bare flag line:

| Flag         | Effect                                        |
| ------------ | --------------------------------------------- |
| `no-name`    | Hide the stage names left of each band        |
| `no-value`   | Hide the value inside each band               |
| `no-percent` | Hide the conversion % right of each band      |
