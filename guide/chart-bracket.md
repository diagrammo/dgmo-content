```dgmo
bracket Buccaneer Brawl

Black Pearl beats Sea Serpent 5-3
Salty Dog beats Kraken 4-2
Black Pearl beats Salty Dog 2-1
```

## Overview

A bracket chart is a **single-elimination tournament tree**: winners advance up the bracket and the shape builds itself from the results. Reach for it for a game night, a fantasy league, a "best taco in town" showdown, or a full sports postseason. List a one-sided ladder for a simple pool, or split the field into two `[Side]` columns that mirror inward and meet at a championship.

There are two ways to author, and Diagrammo picks between them automatically:

- **Casual** — just list the results. The round structure is inferred from who beat whom.
- **Seeded** — declare the field with `seed` lines and the full bracket skeleton renders on **day 0**, before a single game is played, with unplayed matchups shown as dashed **TBD** slots.

## Casual brackets

The body is a list of match lines. Each decided game reads left-to-right — **the winner is on the left of `beats`**:

```dgmo
bracket Grog Cup

Black Pearl beats Sea Serpent 5-3
Salty Dog beats Kraken 4-2
Black Pearl beats Salty Dog 6-5
```

Reuse a crew's exact name to advance them a round — names are identifiers, so `Black Pearl` in the last line is the same `Black Pearl` that won round 1. Two round-1 matches feeding one final gives a four-crew bracket with `Black Pearl` crowned champion.

The trailing `5-3` is a **cosmetic score** — it's printed between the boxes but never decides who advanced. If a score disagrees with the winner (`Black Pearl beats Salty Dog 1-6`), the winner still stands and you get a warning.

### Pending matches

Use `vs` for a matchup that hasn't been played yet — both boxes render with no winner emphasis:

```dgmo
bracket Weekend Ladder

Cutlass beats Flintlock 2-0
Grog Hound vs Marauder
```

### Byes

A crew whose **first appearance** is a later round simply never played round 1 — they get a bye:

```dgmo
bracket Kraken Classic

Tiger Shark beats Anglerfish 3-1
Leviathan beats Tiger Shark 4-2
```

`Leviathan` is placed in round 2 against the round-1 winner, no extra syntax required.

## Seeded brackets

Add `seed N Name` lines and the bracket switches to seeded mode: the standard single-elimination skeleton is built from the seed count and **every slot renders immediately**. Top seeds get a first-round bye; a six-team side pairs `3v6` / `4v5` in round 1 (the familiar postseason positions). Results fill the `TBD` slots as games are played.

```dgmo
bracket Fleet Playoffs
rounds Wild Card, Division, Championship

seed 1 Black Pearl
seed 2 Queen Anne
seed 3 Sea Serpent
seed 4 Jolly Roger
seed 5 Kraken
seed 6 Barnacle Betty

Sea Serpent beats Barnacle Betty 2-1
Jolly Roger beats Kraken 2-0
Black Pearl beats Jolly Roger 3-1
```

`rounds A, B, C` names the columns from the entry round inward; leave it off for generic `Round 1 … Final` labels.

## Two sides & a championship

Wrap each half of the draw in a `[Side]` header (an optional trailing color word tints that half). The two sides mirror left and right, and an **indent-0** result outside any side becomes the center championship:

```dgmo
bracket Grand Line Cup
rounds Skirmish, Clash, Fleet Final

[Red Fleet] red
  seed 1 Black Pearl
  seed 2 Queen Anne
  Black Pearl beats Queen Anne 4-2

[Blue Fleet] blue
  seed 1 Flying Dutchman
  seed 2 Salty Dog
  Flying Dutchman beats Salty Dog 4-1

Black Pearl beats Flying Dutchman 4-3
```

The center column is labeled with the bracket title (`Grand Line Cup`) — the deciding game.

## Color by attribute (tags)

A bracket box has two things to color, so each gets its own job: the **fill** shows win/loss automatically, and the **outline** is yours to assign. Tag competitors with the same `tag` grammar every other chart uses, and the outline colors by that tag — with a legend for free:

```dgmo
bracket AL Playoffs

tag Ticketing as tk
  MLB Ballpark blue
  Ticketmaster orange

seed 1 Blue Jays tk: MLB Ballpark
seed 2 Yankees tk: Ticketmaster
Yankees beats Blue Jays 3-2
```

In a casual (no-seed) bracket, tag a team with a **roster line** — a name plus metadata, no `beats`/`vs`:

```dgmo
bracket Taco Night

tag Truck as t
  Baja green
  Birria orange

El Verde t: Baja
Doña Birria t: Birria
El Verde beats Doña Birria 5-3
```

Leave the colors off a `tag` group to have them auto-assigned. `no-legend` hides the legend strip while keeping the coloring.

## Commentary

Add color commentary as prose indented **under** a match. A leading `- ` becomes a bullet, and `**bold**`, `*italic*`, and `[links](url)` render inline:

```dgmo
bracket World Series

Blue Jays beats Brewers 4-3
  Game 7, 10 innings — **Guerrero Jr.** walk-off double.
  - Series MVP: Vlad Jr.
```

## Home field & seeds

Seeded brackets number each team and treat the higher seed as **home** (a small house glyph). Mark the host explicitly in a casual bracket with `@`:

```dgmo
bracket Neighborhood Cup

Anchor Pub beats The Growler 3-1 @ Anchor Pub
```

When a lower seed beats a higher one, the match is auto-flagged **UPSET**, and the champion gets a star.

## Format

`single-elim` is the default. `double-elim` is reserved — it parses today but renders the winners' side only with a "not yet supported" note; a losers'-bracket grammar is planned.

## Tips

- **Winner on the left, always.** The score is decoration; the word order is the truth.
- **Reuse names exactly** to advance a competitor — `Black Pearl` ≠ `The Black Pearl`.
- **Don't hand-place byes** — a competitor first seen in a later round is slotted there automatically.
- **Seed for a preview, list results for a recap.** One `seed` line flips the whole bracket into day-0 skeleton mode.
