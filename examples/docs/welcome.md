# Welcome to Diagrammo

Diagrammo turns plain text into diagrams. Write a few lines, get a chart.

## Quick Start

A bar chart:

```dgmo
bar Treasure Hauls by Port

Port Royal 850
Tortuga 620
Nassau 1100
Havana 430
Cartagena 780
```

A sequence diagram:

```dgmo
sequence Treasure Hunt App

User -Search nearby loot-> WebApp
WebApp -GET /treasures?nearby-> TreasureAPI
TreasureAPI -Find within 5nm-> MapDB
MapDB -3 results-> TreasureAPI
TreasureAPI -Treasure locations-> WebApp
WebApp -Show treasure map-> User
```

A timeline:

```dgmo
timeline Golden Age of Piracy

era 1690-01->1700-01 Buccaneers
era 1700-01->1718-01 Golden Age

[Famous Pirates]
  1694-01 Henry Every retires rich
  1718-06 Blackbeard's last stand
  1720-11 Calico Jack captured
```

## Supported Types

**Charts:** bar, bubble, funnel, heatmap, line, pie, polar-area, radar, scatter

**Diagrams:** arc, flowchart, function, org, quadrant, sankey, sequence, slope, timeline, venn, wordcloud

## Learn More

- Embed a diagram saved in another file with `![[file.dgmo]]` — see [[embedding-diagrams]]
- Desktop app: [diagrammo.app](https://diagrammo.app)
- CLI: `npm install -g @diagrammo/dgmo`
