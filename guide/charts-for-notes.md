# Charts for Your Notes

Most dgmo chart types are built for engineering docs: sequence diagrams, infrastructure maps, gantt plans. Four are built for a personal note instead — a trip you are counting down to, a friend in another timezone, the family you married into, and a number you are saving toward. Each one is a few lines of plain text in a `dgmo` fence, so it sits in the note beside the prose and stays searchable.

| Type | What it answers | Live? |
|---|---|---|
| [`countdown`](chart-countdown.md) | How many days until it happens? | Ticks every second |
| [`clock`](chart-clock.md) | What time is it for them right now? | Ticks every second |
| [`family`](chart-family.md) | Who is related to whom, and how? | — |
| [`goal`](chart-goal.md) | How close am I to the number? | — |

`countdown` and `clock` are the two **live** chart types: on a live surface — an Obsidian note, the Diagrammo app, the web editor, a docs page — they recompute against your clock every time the note opens and tick while you read it. In a PNG or SVG export they show the moment they were exported, because an image cannot tick.

## Countdown — the days until something

Give it a title and a `target` date:

```dgmo
countdown Trip to Japan
target 2027-04-15
```

For something that comes back every year — a birthday, an anniversary — use `since` with the date it first happened instead. The countdown always shows the next one and rolls forward on its own once the day passes, so the note never goes stale:

```dgmo
countdown Mom's Birthday
since 1958-08-21
on-day 🎂 Today!
```

`since-label Nth Anniversary` adds the count ("11th Anniversary") above the days. Monthly and weekly cadences, timezones and captions are on the [countdown page](chart-countdown.md).

## Clock — what time it is for someone far away

A clock is most useful as a note about one person: a friend abroad, a parent in another country, a partner on a long trip. Name the city they are in, label the panel with their name, and the note answers "is it a good time to call?" whenever you open it:

```dgmo
clock Calling Mira
hours 8-22
Lisbon as Mira
Denver as Me
```

`hours 8-22` shades the hours you would actually call, so it is obvious at a glance whether Mira is asleep. Each line is one panel; write a city, an IANA zone such as `Europe/Lisbon`, or an offset such as `UTC+1`. Analog faces, 24-hour time and sunrise lines are on the [clock page](chart-clock.md).

## Family — who is who

A family chart draws a tree from one line per person and one line per couple, with their children indented below:

```dgmo
family The Okafor Family

Grandpa Emeka b: 1948, sex: m
Grandma Ada b: 1951, sex: f

Grandpa Emeka + Grandma Ada m: 1972
  Ngozi b: 1975, sex: f
  Chidi b: 1978, sex: m

Chidi + Laura m: 2006
  Tobi b: 2008, sex: m
  Amara b: 2011, sex: f
```

It is a good fit for a note kept before a wedding or a reunion, or for a genealogy vault. Remarriage, adoption, deceased relatives and generation labels are on the [family page](chart-family.md).

## Goal — how close you are to a number

A goal is a progress bar, a thermometer or a gauge, drawn from `now` and `target`:

```dgmo
goal Emergency Fund ($)
thermometer
now 4200
target 10000
note Add $300 on the 1st of each month.
```

Update `now` as the number moves. The [goal page](chart-goal.md) has the three faces and the colour options.

## Putting one in a note

- **Obsidian** — install the **Diagrammo Diagrams** community plugin, then write a fenced code block with the `dgmo` language tag. The chart renders in reading mode and in live preview, on desktop and on mobile. The [embed page](https://diagrammo.app/embed#obsidian) has the setup steps.
- **Anywhere else** — paste the same fence into the [online editor](https://online.diagrammo.app) or the Diagrammo app, or into a docs site set up as in [Embedding in Your Docs](embedding-in-your-docs.md).

The source is the same everywhere, so a block copied from this page works unchanged in a note.

## Next

- [Countdown](chart-countdown.md) — every cadence, timezone and caption option
- [Clock](chart-clock.md) — anchors, labels, working hours and faces
- [Family](chart-family.md) — every relationship the tree can draw
- [Goal](chart-goal.md) — the three faces and the colour bands
