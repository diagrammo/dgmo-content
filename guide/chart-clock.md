```dgmo
clock Dani
New York
```

## Overview

A clock is a live **world clock**: one panel per person or place, each showing the **current** local time in its zone and ticking every second, accurate the instant the page loads. Reach for it to answer "what time is it for the crew right now" — a distributed team's local times, a single collaborator's clock, or the window where everyone's awake for a call. Like `countdown` (§countdown) it is one of the **dynamic** dgmo charts: it recomputes against the viewer's system clock on every load. Use it as a live widget in a blog sidebar, an Obsidian note, or a shared page.

## When to use it

- **A single person or place** — the common case: one title, one entry. "What time is it for Dani in New York."
- **A distributed team** — a panel per teammate so you can see, at a glance, who is in their working hours.
- **Scheduling overlap** — add a working window (`hours`, `workweek`) to shade each zone's on-hours and find the meeting slot where everyone overlaps.

For a fixed future instant ("N days until launch") use `countdown` instead — a clock always shows *now*.

## Syntax

```
clock Title, e.g. "Crew standups"
analog                // optional; analog dials (digital is the default face)
time-24               // optional; 24-hour readout (12h am/pm is the default)
hours 9-17            // optional working window (24h; also 8:30-17:15 or am/pm)
workweek mon-fri      // optional working days
no-sun                // optional; hide the sunrise/sundown line (on by default)
direction-tb          // optional; vertical stack (default) — direction-lr for a horizontal strip

London as UK team    // <anchor> [as <label>] [color]
```

The first line declares the chart type and the title. The global directives (`analog`, `time-24`, `hours`, `workweek`, `no-sun`, `no-title`, `direction-lr`, `color-by`) are flat lines — **no colon, no indentation**. Each **entry** is a single line: an **anchor** that names the zone, an optional `as <label>`, and an optional trailing palette color.

## Anchors — how you name a zone

An entry starts with exactly **one anchor**, and the anchor is all you need — the panel figures out the zone from it. There are three forms, resolved in this order:

1. **A city name** — the everyday case. Write the place the way you'd say it (`London`, `NYC`, `Bombay`, `Los Angeles`) and the gazetteer resolves it to the canonical zone and displays the canonical city. If a name is ambiguous the chart errors and lists the candidates so you can pick; an unknown name is skipped with a did-you-mean hint.
2. **An IANA zone id** — anything containing a `/` (`Europe/London`, `America/New_York`, `Asia/Tokyo`). Reach for this when you want to be exact, or when the city you mean isn't in the gazetteer. IANA zones track daylight saving automatically.
3. **A UTC/GMT offset** — a **fixed** zone that never observes DST: `UTC`, `UTC+1`, `UTC-7`, `UTC+5:30`, `GMT+2`. Use it for servers, log timestamps, or "UTC on the wall" panels. Because the offset is pinned it shows a small **"no DST"** marker and draws no sun line — there's no city on Earth it's tied to.

So the plainest entry is just a city:

```dgmo
clock Crew standups
London
New York
Los Angeles
```

## Labels

`as <label>` renames the panel; default the label to the resolved city (or the offset). Use it to name the **person or role** behind a zone:

```dgmo
clock Crew standups
London        as Quartermaster
New York      as Dani (NY)
Los Angeles   as West coast
```

The label is optional — drop it when the city already says everything. You can mix all three anchor forms freely:

```dgmo
clock Bridge watch
Los Angeles          as West coast
Europe/London        as Quartermaster
UTC                  as Servers
```

## Zone reference

**Any** real IANA zone (or a city that resolves to one) works for the time itself. The zones below are the curated set that also get a placed **sunrise/sundown** line and full `color-by daylight`/`time` support — reach for the nearest one to your city. A zone outside this list still ticks the correct time; it just skips the sun line. Fixed **UTC/GMT offsets** (`UTC`, `UTC+1`, `UTC+5:30`, `GMT-3`) are also valid anchors, but as pinned offsets they carry a "no DST" marker and never draw a sun line.

**North America** — `America/New_York`, `America/Detroit`, `America/Toronto`, `America/Montreal`, `America/Chicago`, `America/Winnipeg`, `America/Mexico_City`, `America/Denver`, `America/Phoenix`, `America/Edmonton`, `America/Los_Angeles`, `America/Vancouver`, `America/Tijuana`, `America/Anchorage`, `America/Adak`, `Pacific/Honolulu`, `America/Halifax`, `America/St_Johns`, `America/Havana`, `America/Panama`, `America/Guatemala`, `America/Costa_Rica`

**South America** — `America/Bogota`, `America/Lima`, `America/Caracas`, `America/La_Paz`, `America/Santiago`, `America/Argentina/Buenos_Aires`, `America/Montevideo`, `America/Asuncion`, `America/Sao_Paulo`, `America/Bahia`, `America/Manaus`, `America/Guayaquil`

**Europe** — `Europe/London`, `Europe/Dublin`, `Europe/Lisbon`, `Europe/Madrid`, `Europe/Paris`, `Europe/Brussels`, `Europe/Amsterdam`, `Europe/Berlin`, `Europe/Zurich`, `Europe/Rome`, `Europe/Vienna`, `Europe/Prague`, `Europe/Warsaw`, `Europe/Stockholm`, `Europe/Oslo`, `Europe/Copenhagen`, `Europe/Helsinki`, `Europe/Athens`, `Europe/Bucharest`, `Europe/Budapest`, `Europe/Kyiv`, `Europe/Istanbul`, `Europe/Moscow`, `Europe/Reykjavik`

**Africa** — `Africa/Casablanca`, `Africa/Lagos`, `Africa/Accra`, `Africa/Algiers`, `Africa/Tunis`, `Africa/Cairo`, `Africa/Johannesburg`, `Africa/Nairobi`, `Africa/Addis_Ababa`, `Africa/Khartoum`, `Africa/Kinshasa`, `Africa/Dakar`, `Africa/Harare`, `Indian/Mauritius`

**Middle East / West & Central Asia** — `Asia/Jerusalem`, `Asia/Beirut`, `Asia/Amman`, `Asia/Riyadh`, `Asia/Qatar`, `Asia/Dubai`, `Asia/Baghdad`, `Asia/Tehran`, `Asia/Baku`, `Asia/Yerevan`, `Asia/Tbilisi`, `Asia/Karachi`, `Asia/Tashkent`, `Asia/Almaty`

**South & Southeast Asia** — `Asia/Kolkata`, `Asia/Colombo`, `Asia/Kathmandu`, `Asia/Dhaka`, `Asia/Yangon`, `Asia/Bangkok`, `Asia/Ho_Chi_Minh`, `Asia/Jakarta`, `Asia/Kuala_Lumpur`, `Asia/Singapore`, `Asia/Manila`

**East Asia** — `Asia/Hong_Kong`, `Asia/Shanghai`, `Asia/Taipei`, `Asia/Seoul`, `Asia/Tokyo`, `Asia/Ulaanbaatar`, `Asia/Vladivostok`

**Australia / Pacific** — `Australia/Perth`, `Australia/Adelaide`, `Australia/Darwin`, `Australia/Brisbane`, `Australia/Sydney`, `Australia/Melbourne`, `Australia/Hobart`, `Pacific/Auckland`, `Pacific/Fiji`, `Pacific/Guam`, `Pacific/Port_Moresby`, `Pacific/Tongatapu`

**Fixed offsets** — `UTC`, `UTC+1`, `UTC-7`, `UTC+5:30`, `GMT+2` (no DST, no sun line)

## Single clock

The single-clock case is common and encouraged: one title, one entry. It reads as a personal "here's my local time" chip.

```dgmo
clock Dani
New York
```

## Analog vs digital

The default face is **digital** — the current time as text. Add the bare `analog` flag to switch the whole board to clock dials instead. `time-24` gives a 24-hour readout on either face (the default is 12-hour am/pm):

```dgmo
clock Bridge watch
analog
time-24
London      as UK team
New York    as Dani (NY)
Sydney      as Night watch
```

## Layout & orientation

**The board is a vertical stack by default — there is no directive to turn "vertical" on, and none is needed.** One clock per horizontal row (clock face on the left, place in the middle, status on the right), rows running top-to-bottom. This is the right shape for a scannable list — a sidebar of teammates, a tall Obsidian panel — and it grows downward as you add zones. So the plainest board is already the vertical one:

```dgmo
clock Crew standups
London        as Quartermaster
New York      as Dani (NY)
Los Angeles   as West coast
```

If you want to say "vertical" out loud in the source — for a shared file where the orientation should be obvious, or so a search for the word lands on it — spell it `direction-tb` (top-to-bottom). It is an explicit synonym for the default and changes nothing about the render:

```dgmo
clock Crew standups
direction-tb
London        as Quartermaster
New York      as Dani (NY)
Los Angeles   as West coast
```

Add `direction-lr` to flip the board **horizontal instead**: each zone becomes its own column (time on top, place and details stacked below), columns sitting side by side left-to-right. Reach for it when the board is a wide banner across the top of a page rather than a list — a handful of zones read at a glance in a single strip.

```dgmo
clock Crew standups
direction-lr
London        as UK team
New York      as Dani (NY)
Tokyo         as Deckhand
```

So direction is a pair of bare flags: `direction-tb` (the default vertical stack) and `direction-lr` (the horizontal strip). It composes with everything else (`analog`, `color-by`, `hours`): in `direction-lr` mode the color tint fills each **column** instead of each row, and analog dials sit at the top of their column. Keep the zone count small (three or four) in `direction-lr` mode so the columns stay wide enough to read; longer lists are better as the vertical stack.

## Working hours

Add a working window with `hours <start>-<end>` and optional `workweek <range>` to shade each zone's on-hours, so an out-of-hours teammate reads at a glance and the overlap window is obvious. The window is 24-hour by default but also accepts `HH:MM` and am/pm (`hours 8:30-17:15`, `hours 9am-6pm`). Reach for this only when the point is scheduling; drop it for a plain "current time" widget.

```dgmo
clock When can the crew muster
hours 9-17
workweek mon-fri
London        as Quartermaster
New York      as Dani (NY)
Los Angeles   as West coast
Tokyo         as Deckhand
```

## Sunrise & sundown

The sunrise/sundown indicator is drawn on each panel by default so a zone in the dead of night reads differently from one at midday. Add the bare `no-sun` flag to suppress it for a plainer face.

## Coloring (`color-by`)

A clock board is **colorized by default** — colorful out of the box. `color-by <dimension>` chooses how the zones are colored; the zone's time and label render in a solid color and its lane gets a soft tint of it. Omit the directive and you get `place`; `color-by none` goes neutral.

- **`place`** (the default) — each place gets a distinct palette accent, an identity color with no meaning. Use it when you just want the rows to read apart.
- **`work`** — green while a zone is inside its `hours`/`workweek` window, amber in the last hour before close, grey when off. Needs `hours` set; reach for it on a standup or team board where availability is the story.

  ```dgmo
  clock Crew availability
  hours 9-17
  workweek mon-fri
  color-by work
  London        as Quartermaster
  New York      as Dani (NY)
  Tokyo         as Deckhand
  ```

- **`daylight`** — warm where the sun is currently up, cool where it is down, off the same solar math as the `sun` line. A quick day-vs-night read.
- **`time`** — a continuous dawn → midday → dusk → night hue ramp keyed to each zone's local hour. Order the zones **west-to-east** and the daylight sweeps across the board.

  ```dgmo
  clock Follow the sun
  color-by time
  Los Angeles   as West coast
  London        as Quartermaster
  Tokyo         as Deckhand
  ```

- **`none`** — neutral greyscale.

A hand-set **per-zone color always wins over the dimension**: a **defined** shade — a trailing color on the entry (`London as UK team purple`) — keeps that zone purple while the rest follow the dimension. `color-by` only fills the zones you didn't color yourself.

## Live vs. baked

On any live surface (the app, the web editor, a docs site, an Obsidian note, a shared page) the clock ticks every second and is accurate the instant the page loads. On an image surface that can't run JavaScript — a PNG export, an `.svg` opened via `<img>`, a GitHub camo-proxied image — it shows the time baked at export. That is the correct graceful fallback, not a bug: images can't tick.
