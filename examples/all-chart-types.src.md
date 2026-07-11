# Diagrammo — All Chart Types

> Every `dgmo` code fence below renders a different chart type, and the prose
> around them shows the Markdown formatting the integration renders alongside
> diagrams. Edit the data to experiment! For the full editor experience visit
> [diagrammo.app](https://diagrammo.app).

---

## Markdown formatting

Diagrams live inside ordinary Markdown, so everything below renders normally
next to the `dgmo` fences — **bold**, *italic*, ~~strikethrough~~, `inline
code`, and [links](https://diagrammo.app).

### Bullet lists & indentation

- Crew roster
  - Captain
    - Quartermaster
    - Boatswain
  - Gunner
- Ship's stores
  - Powder and shot
  - Salt pork and biscuit

### Numbered steps

1. Hoist the colours
2. Come alongside the prize
3. Board and secure the hold
   1. Take the powder room first
   2. Then the captain's cabin

### Task list

- [x] Careen the hull
- [x] Re-tar the rigging
- [ ] Divide the plunder

### Table

| Vessel             | Guns | Crew | Status    |
| ------------------ | ---: | ---: | --------- |
| Queen Anne's Revenge | 40 |  300 | Flagship  |
| Ranger             |   10 |   80 | Consort   |
| Adventure          |    8 |   60 | Captured  |

### Blockquote & code

> A merry life and a short one shall be my motto. — Bartholomew Roberts

```js
const plunder = ships.reduce((sum, s) => sum + s.gold, 0);
```

---

## Data

### Arc Diagram

![[arc/arc.dgmo]]

### Area Chart (line + fill)

![[line/line-area.dgmo]]

### Bar Chart

![[bar/bar.dgmo]]

### Bar Chart (stacked)

![[bar/bar-stacked.dgmo]]

### Bubble Chart (scatter + size)

![[scatter/scatter-bubble.dgmo]]

### Arc — Chord Layout

![[arc/arc-chord.dgmo]]

### Doughnut Chart (pie + hole)

![[pie/pie-donut.dgmo]]

### Function Plot

![[function/function.dgmo]]

### Funnel Chart

![[funnel/funnel.dgmo]]

### Heatmap

![[heatmap/heatmap.dgmo]]

### Line Chart

![[line/line.dgmo]]

### Line Chart (Multi-series)

![[line/line-multi-series.dgmo]]

### Pie Chart

![[pie/pie.dgmo]]

### Polar Area Chart

![[polar-area/polar-area.dgmo]]

### Radar Chart

![[radar/radar.dgmo]]

### Sankey Diagram

![[sankey/sankey.dgmo]]

### Scatter Plot

![[scatter/scatter.dgmo]]

### Slope Chart

![[slope/slope.dgmo]]

### Treemap

![[treemap/treemap.dgmo]]

### Sunburst (treemap radial)

![[treemap/treemap-radial.dgmo]]

## Business

### Body

![[body/body.dgmo]]

### Cycle Diagram

![[cycle/cycle.dgmo]]

### Family

![[family/family.dgmo]]

### Goal

![[goal/goal.dgmo]]

### Goal (gauge)

![[goal/goal-gauge.dgmo]]

### Countdown

![[countdown/countdown.dgmo]]

### Countdown (recurring, numbered)

![[countdown/countdown-anniversary.dgmo]]

### Bracket

![[bracket/bracket.dgmo]]

### Bracket (seeded, two sides)

![[bracket/bracket-seeded.dgmo]]

### Journey Map

![[journey-map/journey-map.dgmo]]

### Map

![[map/map.dgmo]]

### Org Chart

![[org/org.dgmo]]

### Pyramid Diagram

![[pyramid/pyramid.dgmo]]

### Quadrant Chart

![[quadrant/quadrant.dgmo]]

### Ring Diagram

![[ring/ring.dgmo]]

### Swimlane

![[swimlane/swimlane.dgmo]]

### Tech Radar

![[tech-radar/tech-radar.dgmo]]

### Venn Diagram

![[venn/venn.dgmo]]

### Word Cloud

![[wordcloud/wordcloud.dgmo]]

## Project

### DACI

![[raci/raci-daci.dgmo]]

### Gantt Chart

![[gantt/gantt.dgmo]]

### Kanban Board

![[kanban/kanban.dgmo]]

### PERT

![[pert/pert.dgmo]]

### RACI Matrix

![[raci/raci.dgmo]]

### RASCI

![[raci/raci-rasci.dgmo]]

### Timeline

![[timeline/timeline.dgmo]]

## Software

### Boxes and Lines

![[boxes-and-lines/boxes-and-lines.dgmo]]

### C4 Architecture

![[c4/c4.dgmo]]

### Class Diagram

![[class/class.dgmo]]

### Entity Relationship

![[er/er.dgmo]]

### Flowchart

![[flowchart/flowchart.dgmo]]

### Infrastructure Diagram

![[infra/infra.dgmo]]

### Mindmap

![[mindmap/mindmap.dgmo]]

### Sequence Diagram

![[sequence/sequence.dgmo]]

### Sitemap

![[sitemap/sitemap.dgmo]]

### State Diagram

![[state/state.dgmo]]

### Version Control

![[version-control/version-control.dgmo]]

### Wireframe

![[wireframe/wireframe.dgmo]]

### Event Line

![[event-line/event-line.dgmo]]

### Block

![[block/block.dgmo]]

### Sketch

![[sketch/sketch.dgmo]]

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
