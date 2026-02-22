# Welcome to Diagrammo

Diagrammo turns plain text into diagrams. Write a few lines, get a chart.

## Quick Start

A bar chart:

```dgmo
chart: bar
title: Treasure Hauls by Port
series: Gold Doubloons

Port Royal: 850
Tortuga: 620
Nassau: 1100
Havana: 430
Cartagena: 780
```

A sequence diagram:

```dgmo
chart: sequence
title: Treasure Hunt App

User -> WebApp: Search nearby loot
WebApp -> TreasureAPI: GET /treasures?nearby
TreasureAPI -> MapDB: Find within 5nm <- 3 results
TreasureAPI -> WebApp: Treasure locations <- JSON
WebApp -> User: Show treasure map
```

A timeline:

```dgmo
chart: timeline
title: Golden Age of Piracy

era 1690-01 -> 1700-01: Buccaneers
era 1700-01 -> 1718-01: Golden Age

## Famous Pirates
1694-01: Henry Every retires rich
1718-06: Blackbeard's last stand
1720-11: Calico Jack captured
```

## Supported Types

**Charts:** area, bar, bar-stacked, bubble, doughnut, funnel, heatmap, line, multi-line, pie, polar-area, radar, scatter

**Diagrams:** arc, chord, flowchart, function, org, quadrant, sankey, sequence, slope, timeline, venn, wordcloud

## Learn More

- Desktop app: [diagrammo.app](https://diagrammo.app)
- CLI: `npm install -g @diagrammo/dgmo`
