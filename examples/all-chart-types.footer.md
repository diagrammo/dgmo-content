---

### Error state

> This block is **intentionally invalid** — `piechart` isn't a chart type (it
> should be `pie`). It's included to show how Diagrammo reports a mistake, so you
> know what to look for when a diagram doesn't render.

<!-- dgmo-expect-error -->
```dgmo
piechart Quarterly Revenue
  Q1 40
  Q2 30
  Q3 20
  Q4 10
```
