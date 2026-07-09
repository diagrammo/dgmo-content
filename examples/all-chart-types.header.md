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
