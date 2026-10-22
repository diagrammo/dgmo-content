# Charts for Your Notes

Most dgmo chart types are built for engineering docs: [sequence diagrams](chart-sequence.md), [infrastructure maps](chart-infra.md), [gantt plans](chart-gantt.md). Five are built for a personal note instead. This page follows one trip to Japan, for Chidi Okafor's 50th birthday: the days until it, the travel agent's office hours, the route, and the money saved for it, plus a family tree for the people in your notes. Each one is a few lines of plain text in a `dgmo` fence, so it sits in the note beside the prose and stays searchable.

| Type | What it answers | Live? |
|---|---|---|
| [`countdown`](chart-countdown.md) | How many days until it happens? | Ticks every second |
| [`clock`](chart-clock.md) | Is their office open right now? | Ticks every second |
| [`family`](chart-family.md) | Who is related to whom, and how? | — |
| [`map`](chart-map.md) | Where does the trip go? | — |
| [`goal`](chart-goal.md) | How close am I to the number? | — |

`countdown` and `clock` are the two **live** chart types: on a live surface — an Obsidian note, the Diagrammo app, the web editor, a docs page — they recompute against your clock every time the note opens and tick while you read it. In a PNG or SVG export they show the moment they were exported, because an image cannot tick.

## Countdown — the days until something

For something that comes back every year — a birthday, an anniversary — give it a title and `since` with the date it first happened. The countdown always shows the next one and rolls forward on its own once the day passes, so the note never goes stale:

```dgmo
countdown Chidi's Birthday
since 1977-04-15
since-label Nth Birthday
on-day 🎂 Happy birthday, Chidi!
```

`since-label Nth Birthday` adds the count ("50th Birthday") above the days. For a one-off date, write `target 2027-04-15` instead of `since`; once it passes, it counts up, or shows your `expired` text. Monthly and weekly cadences, timezones and captions are on the [countdown page](chart-countdown.md).

## Clock — when someone far away is free

A clock is most useful as a note about one person or office in another timezone: the travel agent booking the trip, or a friend coming along from abroad. Name their zone, label the panel, and the note answers "can I call now?" whenever you open it:

```dgmo
clock Sakura Travel
hours 9am-5pm
days mon-fri
color-by work
America/New_York as Our travel agent
```

`hours` and `days` set the office's working week, and `color-by work` shows it green while the office is open, amber in its last hour and grey once it closes. Each line is one panel; write a city, an IANA zone such as `Europe/Lisbon`, or an offset such as `UTC+1`. Analog faces, 24-hour time and sunrise lines are on the [clock page](chart-clock.md).

## Family — who is who

A family chart draws a tree from one line per person and one line per couple, with their children indented below:

```dgmo
family The Okafor Family

Grandpa Emeka b: 1948, sex: m
Grandma Ada b: 1951, sex: f

Grandpa Emeka + Grandma Ada m: 1972
  Ngozi b: 1975, sex: f
  Chidi b: 1977, sex: m

Chidi + Laura m: 2006
  Tobi b: 2008, sex: m
  Amara b: 2011, sex: f
```

It is a good fit for a note kept before a wedding or a reunion, or for a genealogy vault. Remarriage, adoption, deceased relatives and generation labels are on the [family page](chart-family.md).

## Map — the route of a trip

A map draws a trip from a `route` line and one indented leg per stop. `~>` draws a leg as an arc and `->` as a straight line, and text inside the arrow labels the leg:

```dgmo
map Trip to Japan

poi Kyoto label: Kyoto · 3 nights in Gion

route Tokyo
  ~bullet train~> Kyoto
  -> Osaka
  -> Hiroshima
  ~ferry day~> Fukuoka
  ~flight home~> Tokyo
```

You never pick a projection or a zoom: the map frames itself around the places you name, so this one shows Japan. `poi` puts a label of your own on a stop. Shading countries, tagging places and live clocks on pins are on the [map page](chart-map.md).

## Goal — how close you are to a number

A goal is a progress bar, a thermometer or a gauge, drawn from `now` and `target`:

```dgmo
goal Japan Trip Fund ($)
thermometer
now 4200
target 6500
note Add $300 on the 1st of each month.
```

Update `now` as the number moves. The [goal page](chart-goal.md) has the three faces and the colour options.

## Putting one in a note

- **Obsidian** — install the **Diagrammo Diagrams** community plugin, then write a fenced code block with the `dgmo` language tag. The chart renders in reading mode and in live preview, on desktop and on mobile. The [Obsidian setup page](https://diagrammo.app/embed/obsidian/) has the setup steps, and the blog post [Five Charts for an Obsidian Note](https://diagrammo.app/blog/charts-for-obsidian-notes/) walks through these charts in one trip note.
- **Anywhere else** — paste the same fence into the [online editor](https://online.diagrammo.app) or the Diagrammo app, or into a docs site set up as in [Embedding in Your Docs](embedding-in-your-docs.md).

The source is the same everywhere, so a block copied from this page works unchanged in a note.

## Next

- [Countdown](chart-countdown.md) — every cadence, timezone and caption option
- [Clock](chart-clock.md) — anchors, labels, working hours and faces
- [Family](chart-family.md) — every relationship the tree can draw
- [Map](chart-map.md) — routes, pins and shading
- [Goal](chart-goal.md) — the three faces and the colour bands
