```dgmo
clock Dani
New York   America/New_York
```

## Overview

A clock is a live **world clock**: one panel per person or place, each showing the **current** local time in its zone and ticking every second, accurate the instant the page loads. Reach for it to answer "what time is it for the crew right now" — a distributed team's local times, a single collaborator's clock, or the window where everyone's awake for a call. Like `countdown` (§countdown) it is one of the **dynamic** dgmo charts: it recomputes against the viewer's system clock on every load. Use it as a live widget in a blog sidebar, an Obsidian note, or a shared page.

## When to use it

- **A single person or place** — the common case: one title, one entry. "What time is it for Dani in New York."
- **A distributed team** — a panel per teammate so you can see, at a glance, who is in their working hours.
- **Scheduling overlap** — add a working window (`hours`, `days`) to shade each zone's on-hours and find the meeting slot where everyone overlaps.

For a fixed future instant ("N days until launch") use `countdown` instead — a clock always shows *now*.

## Syntax

```
clock Title, e.g. "Crew standups"
analog                // optional; analog dials (digital is the default face)
time-24               // optional; 24-hour readout (12h am/pm is the default)
hours 9-17            // optional working window (24h; also 8:30-17:15 or am/pm)
days mon-fri         // optional working days
no-sun               // optional; hide the sunrise/sundown line (on by default)

London   Europe/London      as UK team    // <place> <IANA/Zone> [as <label>]
```

The first line declares the chart type and the title. The global directives (`analog`, `time-24`, `hours`, `days`, `no-sun`, `no-title`, `direction lr`, `color-by`) are flat lines — **no colon, no indentation**. Each **entry** is a single line: a human-readable place, a real IANA zone, and an optional `as <label>`.

## Zones and labels

Always use a real **IANA time-zone name** (`Europe/London`, `America/New_York`, `America/Los_Angeles`, `Asia/Tokyo`, `Australia/Sydney`) — never a bare offset like `GMT+1`, because IANA zones track daylight saving automatically while a raw offset silently drifts twice a year.

The place is what shows on the panel; use `as <label>` to name the **person or role** behind a zone:

```dgmo
clock Crew standups
London        Europe/London        as Quartermaster
New York      America/New_York     as Dani (NY)
Los Angeles   America/Los_Angeles  as West coast
```

The label is optional — drop it when the place already says everything.

## Zone reference

**Any** real IANA zone works for the time itself. The zones below are the curated set that also get a placed **sunrise/sundown** line and full `color-by daylight`/`time` support — reach for the nearest one to your city. A zone outside this list still ticks the correct time; it just skips the sun line. Bare offsets (`GMT+1`, `UTC+5`) are never valid — only `UTC` itself.

**North America** — `America/New_York`, `America/Detroit`, `America/Toronto`, `America/Montreal`, `America/Chicago`, `America/Winnipeg`, `America/Mexico_City`, `America/Denver`, `America/Phoenix`, `America/Edmonton`, `America/Los_Angeles`, `America/Vancouver`, `America/Tijuana`, `America/Anchorage`, `America/Adak`, `Pacific/Honolulu`, `America/Halifax`, `America/St_Johns`, `America/Havana`, `America/Panama`, `America/Guatemala`, `America/Costa_Rica`

**South America** — `America/Bogota`, `America/Lima`, `America/Caracas`, `America/La_Paz`, `America/Santiago`, `America/Argentina/Buenos_Aires`, `America/Montevideo`, `America/Asuncion`, `America/Sao_Paulo`, `America/Bahia`, `America/Manaus`, `America/Guayaquil`

**Europe** — `Europe/London`, `Europe/Dublin`, `Europe/Lisbon`, `Europe/Madrid`, `Europe/Paris`, `Europe/Brussels`, `Europe/Amsterdam`, `Europe/Berlin`, `Europe/Zurich`, `Europe/Rome`, `Europe/Vienna`, `Europe/Prague`, `Europe/Warsaw`, `Europe/Stockholm`, `Europe/Oslo`, `Europe/Copenhagen`, `Europe/Helsinki`, `Europe/Athens`, `Europe/Bucharest`, `Europe/Budapest`, `Europe/Kyiv`, `Europe/Istanbul`, `Europe/Moscow`, `Europe/Reykjavik`

**Africa** — `Africa/Casablanca`, `Africa/Lagos`, `Africa/Accra`, `Africa/Algiers`, `Africa/Tunis`, `Africa/Cairo`, `Africa/Johannesburg`, `Africa/Nairobi`, `Africa/Addis_Ababa`, `Africa/Khartoum`, `Africa/Kinshasa`, `Africa/Dakar`, `Africa/Harare`, `Indian/Mauritius`

**Middle East / West & Central Asia** — `Asia/Jerusalem`, `Asia/Beirut`, `Asia/Amman`, `Asia/Riyadh`, `Asia/Qatar`, `Asia/Dubai`, `Asia/Baghdad`, `Asia/Tehran`, `Asia/Baku`, `Asia/Yerevan`, `Asia/Tbilisi`, `Asia/Karachi`, `Asia/Tashkent`, `Asia/Almaty`

**South & Southeast Asia** — `Asia/Kolkata`, `Asia/Colombo`, `Asia/Kathmandu`, `Asia/Dhaka`, `Asia/Yangon`, `Asia/Bangkok`, `Asia/Ho_Chi_Minh`, `Asia/Jakarta`, `Asia/Kuala_Lumpur`, `Asia/Singapore`, `Asia/Manila`

**East Asia** — `Asia/Hong_Kong`, `Asia/Shanghai`, `Asia/Taipei`, `Asia/Seoul`, `Asia/Tokyo`, `Asia/Ulaanbaatar`, `Asia/Vladivostok`

**Australia / Pacific** — `Australia/Perth`, `Australia/Adelaide`, `Australia/Darwin`, `Australia/Brisbane`, `Australia/Sydney`, `Australia/Melbourne`, `Australia/Hobart`, `Pacific/Auckland`, `Pacific/Fiji`, `Pacific/Guam`, `Pacific/Port_Moresby`, `Pacific/Tongatapu`

**UTC** — `UTC`

## Single clock

The single-clock case is common and encouraged: one title, one entry. It reads as a personal "here's my local time" chip.

```dgmo
clock Dani
New York   America/New_York
```

## Analog vs digital

The default face is **digital** — the current time as text. Add the bare `analog` flag to switch the whole board to clock dials instead. `time-24` gives a 24-hour readout on either face (the default is 12-hour am/pm):

```dgmo
clock Bridge watch
analog
time-24
London      Europe/London        as UK team
New York    America/New_York     as Dani (NY)
Sydney      Australia/Sydney     as Night watch
```

## Working hours

Add a working window with `hours <start>-<end>` and optional `days <range>` to shade each zone's on-hours, so an out-of-hours teammate reads at a glance and the overlap window is obvious. The window is 24-hour by default but also accepts `HH:MM` and am/pm (`hours 8:30-17:15`, `hours 9am-6pm`). Reach for this only when the point is scheduling; drop it for a plain "current time" widget.

```dgmo
clock When can the crew muster
hours 9-17
days mon-fri
London        Europe/London        as Quartermaster
New York      America/New_York     as Dani (NY)
Los Angeles   America/Los_Angeles  as West coast
Tokyo         Asia/Tokyo           as Deckhand
```

## Sunrise & sundown

The sunrise/sundown indicator is drawn on each panel by default so a zone in the dead of night reads differently from one at midday. Add the bare `no-sun` flag to suppress it for a plainer face.

## Coloring (`color-by`)

A clock board is **colorized by default** — colorful out of the box. `color-by <dimension>` chooses how the zones are colored; the zone's time and label render in a solid color and its lane gets a soft tint of it. Omit the directive and you get `place`; `color-by none` goes neutral.

- **`place`** (the default) — each place gets a distinct palette accent, an identity color with no meaning. Use it when you just want the rows to read apart.
- **`work`** — green while a zone is inside its `hours`/`days` window, amber in the last hour before close, grey when off. Needs `hours` set; reach for it on a standup or team board where availability is the story.

  ```dgmo
  clock Crew availability
  hours 9-17
  days mon-fri
  color-by work
  London        Europe/London        as Quartermaster
  New York      America/New_York     as Dani (NY)
  Tokyo         Asia/Tokyo           as Deckhand
  ```

- **`daylight`** — warm where the sun is currently up, cool where it is down, off the same solar math as the `sun` line. A quick day-vs-night read.
- **`time`** — a continuous dawn → midday → dusk → night hue ramp keyed to each zone's local hour. Order the zones **west-to-east** and the daylight sweeps across the board.

  ```dgmo
  clock Follow the sun
  color-by time
  Los Angeles   America/Los_Angeles  as West coast
  London        Europe/London        as Quartermaster
  Tokyo         Asia/Tokyo           as Deckhand
  ```

- **`none`** — neutral greyscale.

A hand-set **per-zone color always wins over the dimension**: a **defined** shade — a trailing color on the entry (`London Europe/London as UK team purple`) — keeps that zone purple while the rest follow the dimension. `color-by` only fills the zones you didn't color yourself.

## Live vs. baked

On any live surface (the app, the web editor, a docs site, an Obsidian note, a shared page) the clock ticks every second and is accurate the instant the page loads. On an image surface that can't run JavaScript — a PNG export, an `.svg` opened via `<img>`, a GitHub camo-proxied image — it shows the time baked at export. That is the correct graceful fallback, not a bug: images can't tick.
