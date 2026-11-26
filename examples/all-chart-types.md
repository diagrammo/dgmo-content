<!-- GENERATED — do not edit. Author examples/all-chart-types.src.md (![[…]] embeds), then run: node scripts/expand-dgmo-embeds.mjs examples/all-chart-types.src.md examples/all-chart-types.md -->

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

```dgmo
arc Pirate Alliances
layout chord

[Caribbean] red
  Blackbeard -> Bonnet    60
  Blackbeard -> Vane      20
  Hornigold  -> Bonnet    3

[West Africa] blue
  Roberts -> Davis  80
  Davis   -> Anstis 10
  Roberts -> Anstis 2

[Madagascar] green
  Kidd    -> Avery  45
  Avery   -> Tew    8
  Tew     -> Kidd   2

[Barbary Coast] purple
  Reis   -> Barbarossa 50
  Reis   -> Dragut     5
  Barbarossa -> Dragut 12

Blackbeard -> Roberts  4
Avery -> Blackbeard    25
Roberts -> Reis        7
```

### Area Chart (line + fill)

```dgmo
line Tortuga Rum Barrels in Stores
fill
series Barrels
x-axis Month
y-axis Barrels in Hold

era Jan -> Apr Raiding Season red
era Apr -> Aug Dry Spell blue

Jan 320
Feb 410
Mar 505
Apr 618
May 470
Jun 355
Jul 210
Aug 140
Sep 260
Oct 430
Nov 560
Dec 690
```

### Bar Chart

```dgmo
bar Plunder by Voyage
x-axis Voyage
y-axis Doubloons

stack
  Gold red
  Silver orange
  Spices yellow
  Rum green

Spanish Main     480 320 210 150
Barbary Coast    360 290 340 180
Windward Passage 520 410 160 240
Coral Run        300 260 380 200
```

### Arc — Chord Layout

```dgmo
arc Who Sailed With Whom
layout chord
order group

// Grouped by how each captain's story ended. Weight = voyages sailed together.
[Pardoned] green
  Hornigold -> Jennings 6
  Hornigold -> Burgess  4
  Jennings  -> Burgess  3

[Killed at Sea] orange
  Blackbeard -> Hornigold 12
  Roberts    -> Davis      9
  Roberts    -> Anstis     6
  Davis      -> Anstis     3

[Hanged] red
  Bonnet      -> Blackbeard  10
  Vane        -> Hornigold    4
  Vane        -> Jennings     5
  Vane        -> Calico Jack 11

[Spared by the Court] purple
  Bonny -> Calico Jack 14
  Bonny -> Read         9
  Read  -> Calico Jack  7

Blackbeard -> Vane     5
Roberts    -> Bonnet   2
```

### Doughnut Chart (pie + hole)

```dgmo
pie Plunder Hold Contents
hole 0.5

Gold Doubloons    420
Silver Pieces     260
Spices & Silk     180
Rum Casks         140
Gunpowder          90
Navigation Charts  30
```

### Function Plot

```dgmo
function Roll After a Broadside: Galleon vs Sloop

x-axis Seconds after broadside 0..12
y-axis Roll (degrees)
fill

// The heavy galleon rolls slow and deep; the sloop snaps back quick but rings longer.
Galleon blue: 30*exp(-0.25*x)*sin(1.5*x)
Sloop orange: 18*exp(-0.15*x)*sin(3*x)
Calm sea green: 0
```

### Funnel Chart

```dgmo
funnel Pirate Recruitment Pipeline

Port Visitors blue     1000
Tavern Recruits cyan    500
Crew Trials yellow      200
Sworn Pirates orange    100
Veteran Buccaneers red   50
```

### Heatmap

```dgmo
heatmap Pirate Activity by Sea Region
columns Jan, Feb, Mar, Apr, May, Jun

// label value1, value2, ...
Caribbean       5 4 5 3 4 5
Atlantic        2 3 2 4 3 2
Mediterranean   3 2 1 2 3 4
Indian Ocean    4 5 4 5 4 3
South China Sea 1 2 3 2 1 2
West Africa     3 3 4 3 5 4
```

### Calendar

```dgmo
calendar Cannon Volleys Fired in 2026
year 2026
heat Volleys as v red blue
  unit volley
tag Ship as s
  Black Gull red
  Sea Wraith green
  Iron Kraken blue
active-tag Volleys

01-02 v: 1, s: Sea Wraith
01-03 v: 1, s: Iron Kraken
01-05 v: 3, s: Iron Kraken
01-06 v: 9, s: Black Gull
01-08 v: 9, s: Sea Wraith
01-09 v: 1, s: Black Gull
01-13 v: 9, s: Black Gull
01-14 v: 3, s: Sea Wraith
01-15 v: 2, s: Sea Wraith
01-17 v: 1, s: Sea Wraith
01-21 v: 3, s: Sea Wraith
01-24 v: 1, s: Black Gull
02-01 v: 2, s: Iron Kraken
02-03 v: 4, s: Iron Kraken
02-09 v: 9, s: Iron Kraken
02-10 v: 6, s: Black Gull
02-11 v: 14, s: Black Gull
02-14 v: 6, s: Iron Kraken
02-19 v: 1, s: Sea Wraith
02-23 v: 4, s: Iron Kraken
03-02 v: 14, s: Sea Wraith
03-06 v: 4, s: Sea Wraith
03-07 v: 3, s: Sea Wraith
03-11 v: 9, s: Iron Kraken
03-21 v: 2, s: Iron Kraken
03-22 v: 3, s: Sea Wraith
03-23 v: 2, s: Sea Wraith
03-25 v: 9, s: Black Gull
03-29 v: 1, s: Iron Kraken
04-08 v: 3, s: Iron Kraken
04-10 v: 1, s: Sea Wraith
04-11 v: 2, s: Black Gull
04-15 v: 3, s: Iron Kraken
04-17 v: 4, s: Sea Wraith
04-21 v: 14, s: Black Gull
04-25 v: 1, s: Black Gull
05-01 v: 6, s: Black Gull
05-02 v: 1, s: Iron Kraken
05-04 v: 1, s: Black Gull
05-06 v: 6, s: Black Gull
05-08 v: 3, s: Sea Wraith
05-09 v: 6, s: Iron Kraken
05-14 v: 3, s: Black Gull
05-17 v: 14, s: Black Gull
05-18 v: 1, s: Black Gull
05-21 v: 3, s: Black Gull
05-24 v: 6, s: Sea Wraith
05-26 v: 3, s: Iron Kraken
05-27 v: 14, s: Iron Kraken
05-28 v: 3, s: Sea Wraith
05-29 v: 1, s: Black Gull
05-30 v: 6, s: Black Gull
06-01 v: 1, s: Iron Kraken
06-05 v: 2, s: Sea Wraith
06-06 v: 6, s: Black Gull
06-07 v: 9, s: Sea Wraith
06-08 v: 1, s: Black Gull
06-10 v: 2, s: Iron Kraken
06-11 v: 14, s: Black Gull
06-13 v: 14, s: Sea Wraith
06-15 v: 2, s: Iron Kraken
06-16 v: 1, s: Iron Kraken
06-17 v: 2, s: Sea Wraith
06-18 v: 3, s: Black Gull
06-20 v: 4, s: Iron Kraken
06-21 v: 3, s: Iron Kraken
06-23 v: 9, s: Black Gull
06-25 v: 6, s: Sea Wraith
06-29 v: 2, s: Sea Wraith
06-30 v: 1, s: Sea Wraith
07-05 v: 2, s: Black Gull
07-06 v: 1, s: Black Gull
07-07 v: 6, s: Black Gull
07-09 v: 14, s: Black Gull
07-11 v: 1, s: Black Gull
07-12 v: 4, s: Sea Wraith
07-13 v: 1, s: Iron Kraken
07-14 v: 1, s: Black Gull
07-17 v: 3, s: Black Gull
07-19 v: 14, s: Black Gull
07-20 v: 3, s: Iron Kraken
07-24 v: 3, s: Black Gull
07-26 v: 1, s: Iron Kraken
07-27 v: 6, s: Iron Kraken
07-28 v: 3, s: Black Gull
07-29 v: 3, s: Sea Wraith
08-02 v: 6, s: Iron Kraken
08-03 v: 2, s: Iron Kraken
08-05 v: 1, s: Iron Kraken
08-06 v: 14, s: Sea Wraith
08-07 v: 3, s: Black Gull
08-08 v: 9, s: Sea Wraith
08-10 v: 9, s: Iron Kraken
08-11 v: 6, s: Black Gull
08-12 v: 6, s: Sea Wraith
08-13 v: 14, s: Sea Wraith
08-14 v: 1, s: Sea Wraith
08-15 v: 4, s: Iron Kraken
08-16 v: 1, s: Black Gull
08-17 v: 3, s: Black Gull
08-19 v: 4, s: Iron Kraken
08-20 v: 2, s: Sea Wraith
08-21 v: 2, s: Iron Kraken
08-26 v: 14, s: Black Gull
08-28 v: 1, s: Black Gull
08-30 v: 1, s: Sea Wraith
08-31 v: 1, s: Iron Kraken
09-03 v: 3, s: Iron Kraken
09-04 v: 1, s: Sea Wraith
09-05 v: 6, s: Sea Wraith
09-07 v: 4, s: Black Gull
09-09 v: 3, s: Black Gull
09-12 v: 2, s: Black Gull
09-13 v: 4, s: Black Gull
09-15 v: 3, s: Black Gull
09-16 v: 2, s: Black Gull
09-17 v: 1, s: Black Gull
09-19 v: 1, s: Sea Wraith
09-21 v: 3, s: Sea Wraith
09-22 v: 3, s: Iron Kraken
09-24 v: 9, s: Black Gull
09-26 v: 9, s: Sea Wraith
09-28 v: 3, s: Iron Kraken
09-30 v: 2, s: Iron Kraken
10-03 v: 2, s: Black Gull
10-04 v: 4, s: Black Gull
10-06 v: 9, s: Black Gull
10-10 v: 4, s: Iron Kraken
10-11 v: 2, s: Sea Wraith
10-12 v: 14, s: Iron Kraken
10-13 v: 6, s: Sea Wraith
10-17 v: 4, s: Black Gull
10-18 v: 2, s: Iron Kraken
10-19 v: 9, s: Sea Wraith
10-20 v: 4, s: Black Gull
10-22 v: 1, s: Sea Wraith
10-23 v: 1, s: Iron Kraken
10-24 v: 1, s: Black Gull
10-28 v: 2, s: Iron Kraken
11-04 v: 2, s: Black Gull
11-05 v: 9, s: Iron Kraken
11-08 v: 1, s: Sea Wraith
11-14 v: 1, s: Iron Kraken
11-15 v: 6, s: Iron Kraken
11-19 v: 1, s: Sea Wraith
11-23 v: 1, s: Iron Kraken
11-28 v: 14, s: Sea Wraith
11-30 v: 4, s: Sea Wraith
12-01 v: 3, s: Sea Wraith
12-02 v: 14, s: Sea Wraith
12-10 v: 2, s: Iron Kraken
12-15 v: 14, s: Black Gull
12-16 v: 4, s: Black Gull
12-18 v: 3, s: Black Gull
12-24 v: 3, s: Sea Wraith
12-26 v: 14, s: Sea Wraith
12-27 v: 14, s: Iron Kraken
12-28 v: 14, s: Black Gull
```

### Box Plot

```dgmo
boxplot Plunder per Raid by Ship (doubloons)
y-axis Doubloons
points
mean
fill-solid

[Black Pearl] teal
120 135 140 150 155 160 170 180 195 210 400

[Queen Anne's] red
200 240 260 310 330 380 450 520

[Fancy] green
60 70 75 80 85 90 95 100 110

[Adventure Galley] yellow
90 100 115 125 130 140 150 170

[Revenge] purple
150 165 180 190 210 220 240 260 300
```

### Waterfall

```dgmo
waterfall Plunder Bridge, Spring Voyage to Autumn Voyage (doubloons)

Spring Voyage 1200 total
Merchant Galleons +340
Port Ransoms 210
Naval Skirmish Losses -180
Storm Damage -65
Midyear Hoard total
Smuggling Runs +95
Harbour Bribes -40
Autumn Voyage total
```

### Dot

```dgmo
dot Captain Vane takes the largest share of every haul
subtitle Median share of plunder by rank, before and after the Tortuga mutiny, doubloons
series Before gray, After red
sort After
gap
connector direction
x-axis 0..

Captain 212 296
Quartermaster 168 181
First Mate 151 117
Sailing Master 139 163
Navigator 122 74
Boatswain 96 129
Gunner 88 52
Surgeon 79 138
Carpenter 64 47
Cook 46 91
Cabin Boy 24 33
Powder Monkey 18 58
Lookout 31 12
```

### Line Chart

```dgmo
line Plunder by Crew Over the Voyage
series
  Cutlass Crew blue
  Powder Monkeys green
  Rigging Rats orange
x-axis Port
y-axis Doubloons (000s)

marker y 8 Captain's Quota
era Nassau -> Port Royal Shakedown Run teal
era Port Royal -> Havana Golden Haul orange

Nassau      4.4 2.8 1.6
Tortuga     6.5 3.2 2.0
Port Royal  9.1 3.9 2.5
Havana     10.3 5.0 3.4
Kingston   12.6 5.9 3.9
```

### Pie Chart

```dgmo
pie Crew Roles Distribution

Sailors          45
Gunners          20
Marines          15
Officers          8
Specialists       7
Cooks & Surgeons  5
```

### Polar Area Chart

```dgmo
polar-area Ships Sighted by Month

January blue 14
February blue 11
March green 18
April green 26
May green 33
June orange 41
July orange 47
August orange 44
September red 36
October red 29
November purple 20
December blue 16
no-value
no-percent
```

### Radar Chart

```dgmo
radar Ship Combat Ratings by Vessel
series
  Black Pearl blue
  Queen Anne's Revenge green
  Flying Dutchman purple

Firepower       95 40 100
Speed           100 20 30
Armor           15 90 95
Maneuverability 90 25 10
Crew Morale     30 95 15
Cannon Range    25 100 90
```

### Sankey Diagram

```dgmo
sankey Where a Pirate Crew's Plunder Comes From and Goes

// Income
Merchant Ships green -> Treasury 4000
Naval Ransoms green -> Treasury 2500
Port Raids green -> Treasury 3000
Smuggled Rum green -> Treasury 1500

// Spending
Treasury
  Ship Upkeep orange 2500
  Provisions & Rum orange 2000
  Bribes to Governors orange 1000
  Crew Shares purple 5500

// Distribution
Crew Shares
  Captain 1100
  Quartermaster 800
  Navigator 700
  Bosun 600
  Common Hands blue 2300
```

### Scatter Plot

```dgmo
scatter Pirate Fleets of the Caribbean
x-axis Ruthlessness
y-axis Plunder (chests)
size-label Crew
band 0..20 Scraps

[English Pirates] red
  Blackbeard  90 85 700
  Calico Jack 55 32 30
  Anne Bonny  70 28 10
  Jack Rackham 40 18 5

[French Buccaneers] blue
  L'Olonnais      80 60 420
  Pierre le Grand 45 25 6
  Michel de Grammont 60 45 150

[Welsh Privateers] green
  Henry Morgan        85 120 1000
  Bartholomew Roberts 88 110 550
  Rowboat Raiders     25 10 3
```

### Slope Chart

```dgmo
slope Pirate Fleet Strength: 1715 vs 1725

period
  1715
  1725

Blackbeard red           40  4
Bartholomew Roberts blue 12 52
Charles Vane orange      20  2
Anne Bonny green          8 15
Calico Jack purple       18  6
```

### Treemap

```dgmo
treemap Plunder Spend ($k)

tag Crew as t
  Deck blue
  Guns orange
  Stores green

Sailing & Rigging t: Deck
  Rigging 320
  Helm 180
  Lookout 140
Cannon Battery t: Guns
  Powder 90
  Shot 130
Provisions t: Stores
  Rum 110
  Hardtack 70
  Salt Pork 85
  Citrus 60
  Fresh Water 95
  Ship's Biscuit 40
```

### Sunburst (treemap sunburst)

```dgmo
treemap Plunder Spend ($k)
sunburst

tag Crew as t
  Deck blue
  Guns orange
  Stores green

Sailing & Rigging t: Deck
  Rigging 320
  Helm 180
  Lookout 140
Cannon Battery t: Guns
  Powder 90
  Shot 130
Provisions t: Stores
  Rum 110
  Hardtack 70
```

### Icicle (treemap icicle)

```dgmo
treemap Plunder Spend ($k)
icicle

tag Crew as t
  Deck blue
  Guns orange
  Stores green

Sailing & Rigging t: Deck
  Rigging
    Lines 200
    Sails 120
  Helm 180
  Lookout 140
Cannon Battery t: Guns
  Powder 90
  Shot 130
Provisions t: Stores
  Rum 110
  Hardtack 70
```

## Life

### Body

```dgmo
body Powder Monkey Push Day
muscle
front

tag Effort as e
  Primary red
  Secondary orange
  Warm-up yellow

chest        e: Primary
  Barbell bench press — 4×8
deltoids     e: Primary
  Overhead press — 3×10
triceps      e: Secondary
  Rope pushdowns — 3×12
abs          e: Warm-up
  Plank — 3×45s
```

### Bracket

```dgmo
bracket Grand Line Cup

rounds
  Skirmish orange
  Clash green
  Fleet Final yellow

tag Ship as s
  Galleon red
  Frigate blue
  Sloop green
  Brigantine purple
  Schooner orange
  Corsair teal

[Red Fleet] red
  seed 1 Black Pearl s: Galleon
  seed 2 Queen Anne s: Frigate
  seed 3 Sea Serpent s: Sloop
  seed 4 Jolly Roger s: Brigantine
  seed 5 Kraken s: Schooner
  seed 6 Barnacle Betty s: Corsair
  Sea Serpent beats Barnacle Betty 2-1
  Jolly Roger beats Kraken 2-0
  Black Pearl beats Jolly Roger 3-1
  Queen Anne beats Sea Serpent 3-2
  Black Pearl beats Queen Anne 4-2

[Blue Fleet] blue
  seed 1 Flying Dutchman s: Galleon
  seed 2 Salty Dog s: Frigate
  seed 3 Grog Hound s: Sloop
  seed 4 Marauder s: Brigantine
  seed 5 Tidewater s: Schooner
  seed 6 Coral Cutlass s: Corsair
  Grog Hound beats Coral Cutlass 2-1
  Marauder beats Tidewater 2-1
  Flying Dutchman beats Marauder 3-0
  Salty Dog beats Grog Hound 3-2
  Flying Dutchman beats Salty Dog 4-1

Black Pearl beats Flying Dutchman 4-3
```

### Clock

```dgmo
clock Crew standups
direction-lr
Havana as Port Royal Watch
London as Admiralty Dock
Lisbon as Lisbon Harbor
Tokyo as Deckhand
```

### Countdown

```dgmo
countdown Peg-leg Pete's Birthday Bash
since 1971-03-14T20:00
since-label Pete turns Nth — hoist the colors!
tz America/New_York
on-day 🎂 Fire the cannons, Pete's another year older!
note **Plunder the cake.** Bring rum, Captain's orders.
```

### Countdown (recurring, numbered)

```dgmo
countdown Wedding Anniversary
since 2015-06-14
since-label Nth Anniversary
```

### Family

```dgmo
family The Blackwater Buccaneers

tag Allegiance as flag
  Founders green
  Brethren red
  Crown blue

Redbeard b: 1638, d: 1701, sex: m, occupation: Captain, military: Sacked three ports, flag: Founders
Blackheart Bess b: 1642, d: 1699, sex: f, occupation: Quartermaster, flag: Founders

Redbeard + Blackheart Bess m: 1660
  Anne b: 1662, sex: f, occupation: Pirate King, flag: Brethren
  Mad Mary b: 1665, sex: f, occupation: Powder Monkey

"Long John Silver" b: 1658, sex: m, occupation: Cook
One-Eyed Pete b: 1660, d: 1712, sex: m, occupation: Bosun, flag: Crown

Anne + "Long John Silver" m: 1685
  Young Jack b: 1686, sex: m, occupation: Navigator
  Grace b: 1689, sex: f, occupation: Sailmaker, flag: Brethren

Anne + One-Eyed Pete m: 1698
  Sally b: 1699, sex: f, occupation: Lookout

Mad Mary sex: f
  Tom b: 1690, sex: m, occupation: Cabin Boy

Young Jack + Calico Kate m: 1712
  Ned b: 1713, sex: m, occupation: Gunner
  Pearl adopted, b: 1715, sex: f, occupation: Cartographer
```

### Goal

```dgmo
goal Doubloons Plundered ($)
actual 6400
target 10000
note
  **Welcome aboard, matey!** The hold's filling nicely — `6.4k` of `10k` doubloons.
  - *Tortuga* raid — counted and stowed
  - **Port Royal** — first mate swears it's *almost* tallied
  The bar rides **orange** at 64%; cross `80%` and she turns green.
```

### Goal (gauge)

```dgmo
goal Voyage Quota (chests)
gauge
actual 64
target 100
```

## Business

### Cycle Diagram

```dgmo
cycle Raid Cycle with a Refit Loop

center RAID
circle-nodes
autonumber

tag phase as p
  Hunt blue
  Fight orange
  Feast red

Spot a Sail p:Hunt
  Lookout cries from the crow's nest
Pursue p:Hunt
  Trim the sails, close the gap
Board p:Fight
  Grappling hooks and cutlasses
Plunder p:Fight
  Strip the hold
Split Shares p:Feast
  Quartermaster deals the haul
Refit p:Feast
  Patch the hull, restock the rum
  -Back on the hunt-> Pursue
```

### Journey Map

```dgmo
journey-map The Quartermaster's Long Count

persona Quartermaster color: orange
  Keeps the ledger and the peace
  Trusts no one, counts everything

tag Place as pl
  Hold blue
  Cabin purple
  Ashore green

[Setting Out]
  Inventory the hold score: 3, emotion: Careful, pl: Hold
    description: 40 casks counted in 2 hours
    pain: Manifest and hold disagree
    opportunity: Chalk-mark every counted cask
    thought: Short one cask of rum
  Draft the articles score: 4, emotion: Satisfied, pl: Cabin
    description: 31 hands signed by dawn
    pain: Two sailors sign with crosses
    opportunity: Read each clause aloud
    thought: Fair shares for all

[The Plunder]
  Weigh the silver score: 5, emotion: Gleeful, pl: Hold
    description: 900 pounds, 3 weighings
    pain: Scale sticks in rough seas
    opportunity: Weigh twice, witness each count
    thought: Heavier than hoped!
  Crew demands extra shares score: 1, emotion: Furious, pl: Cabin
    description: 12 hands demand a second share
    pain: The Bosun wants double
    opportunity: Offer bonus pay for watch duty
    thought: Mutiny over maths
  Cook the books score: 2, emotion: Uneasy, pl: Cabin
    description: 2 ledgers, 1 hidden
    pain: Smudged ink gives it away
    opportunity: Burn the second set
    thought: Nobody counts better

[Landfall]
  Split the treasure score: 4, emotion: Relieved, pl: Ashore
    description: 1 quay, 31 shares, 0 disputes
    pain: Harbour clerk wants a cut
    opportunity: Seal each share in a pouch
    thought: Every coin accounted
  Pay off the crew score: 5, emotion: Proud, pl: Ashore
    description: 31 handshakes by sundown
    pain: One sailor owes the cook
    opportunity: Offer a berth next run
    thought: Fair is fair
```

### Map

```dgmo
map Plunder Route to the Gulf

tag Port of Call as p
  Home Port red
  Friendly green
  Spanish Prize orange

tag Leg as l
  Outbound blue
  Homeward purple

poi 25.05 -77.35 as nassau label: Nassau, p: Home Port, size: 100
  note Weigh anchor
    Captain sets course at dawn.
poi 23.13 -82.36 as havana label: Havana, p: Spanish Prize, size: 110
  note Plunder the harbour
    Powder Monkey scouts the **gun line**.
poi 23.2 -84.2 as offshore label: Off the Cape
poi 21.7 -85.4 as capesan label: Cabo San Antonio
  note Round the cape
    Navigator reads the trade winds.
poi 20.4 -86.9 as cozumel label: Cozumel, p: Friendly, size: 70
  note Landfall
    Split the treasure here.

route nassau
  -sail west-> havana l: Outbound
  -> offshore l: Outbound
  -round the cape-> capesan l: Outbound
  -> cozumel l: Outbound
```

### Org Chart

```dgmo
org The Dread Fleet
active-tag Rank
sub-node-label Crew
show-sub-node-count

tag Rank as r
  Sailor blue
  Captain red
  FirstMate orange
  Quartermaster yellow
  Bosun green
  Gunner teal
  Jester cyan
  Swab purple

tag Ship as s
  Revenge blue
  Serpent green
  Phantom purple

tag Status as st
  Loyal green
  Turncoat red
  NewRecruit yellow

Blackbeard r: Captain, s: Revenge
  Anne Bonny r: FirstMate
    [Gun Deck]
      Cannonball Pete r: Gunner
      Smokey Jack r: Gunner, st: NewRecruit
      Powder Meg r: Swab, st: NewRecruit
    [Boarding Party]
      Cutlass Jim r: Bosun
      Red Mary
      One-Eyed Dan st: Turncoat
  Calico Rackham r: Quartermaster
    [Cargo Hold]
      Barnacle Bob
      Slippery Sal st: Turncoat
  Long John r: FirstMate, s: Serpent
    [Rigging Crew]
      Monkey Fist r: Bosun
      Pegleg Pete
      Crow Jane
    [Navigation]
      Stargazer Quinn r: Quartermaster
      Compass Rose st: NewRecruit
```

### Ownership Chart

```dgmo
ownership Dutch East India Company
tag Jurisdiction as j
  Amsterdam blue
  Zeeland green
  Batavia orange

Heeren XVII  j: Amsterdam, type: trust
  The seventeen governing directors
  100% Dutch East India Company  j: Amsterdam
    Chartered 1602
    50% Amsterdam Chamber  j: Amsterdam
      Largest shareholder
    25% Zeeland Chamber  j: Zeeland
      Middelburg
    25% Batavia Council  j: Batavia, type: partnership
      Governs Asian trade posts

Governor-General  j: Batavia, type: individual
  Runs the Asian trade
  10% -> Batavia Council

Stadtholder  j: Amsterdam, type: individual
  Shareholder of the Republic
  5% -> Amsterdam Chamber
```

### Pyramid Diagram

```dgmo
pyramid Pirate Crew Hierarchy

Captain purple
  Final word on heading and plunder,
  keeper of the ship's charter.

Quartermaster blue
  Second-in-command, arbitrates
  disputes, divvies the booty.

Boatswain & Gunner green
  Keep the rigging tight and
  the cannons ready.

Able Seamen yellow
  Haul lines, swab decks,
  and stand watch.

Powder Monkeys orange
  Ferry shot and charges to the guns
  during a broadside.
```

### Quadrant Chart

```dgmo
quadrant Crew Performance Assessment
x-axis Low Skill, High Skill
y-axis Low Loyalty, High Loyalty

top-right Promote green
top-left Train yellow
bottom-left Maroon red
bottom-right Watch Closely purple

Quartermaster  0.9 0.95
Navigator     0.85  0.8
Gunner         0.7  0.6
Surgeon        0.8 0.75
Boatswain      0.6 0.85
Cook           0.4  0.9
New Recruit    0.2  0.5
Troublemaker  0.65  0.2
Spy            0.8  0.1
```

### Ring Diagram

```dgmo
ring Captain's Sphere of Influence

Captain  red
  Final word on heading and plunder,
  keeper of the ship's charter.

Quartermaster orange
  Second-in-command, arbitrates disputes and divvies the booty

Crew yellow
  Deckhands, gunners, and powder
  monkeys aboard the ship.

Allied Crews green
  Loose alliances kept by oath
  or shared bounty in fair seas.

The Open Sea blue
  Weather, currents, and rival
  flags beyond any captain's reach.
```

### SWOT Analysis

```dgmo
swot Tortuga Rum Co.
tag Priority as p
  High red
  Low gray
active-tag Priority

strengths
  Oldest distillery still on the island p: Low
  Crew of 40 sworn tasters
    Trained in three ports
  Secret recipe, aged in cannon-scarred oak
weaknesses
  One barrel supplier p: High
  Thin margins on every cask
  No presence beyond the Caribbean p: High
opportunities
  Navy rum ration contract
    Open for tender each spring
  Rising demand for spiced rum in northern ports p: Low
  Tavern partnerships along the trade routes
threats
  Royal Navy blockade p: High
  Cheap imitations from rival islands
  Rising cost of sugar cane
```

### Swimlane

```dgmo
swimlane Planning a Raid
direction-lr

[Plan]
  lane Captain red
    Set Course -> <Worth the risk?>
    <Worth the risk?>
      -no-> (!Stay in Port)
      -yes-> Brief Crew
    Brief Crew -> Chart Route
  lane Navigator blue
    Chart Route -> Man Cannons
[Raid]
  lane Bosun orange
    Man Cannons -> Board Prize
  lane Captain red
    Board Prize -> Count Haul
[Share]
  lane Quartermaster green
    Count Haul -> Split Shares
    Split Shares -> (Paid Out) success
```

### BPMN process (swimlane pools)

```dgmo
swimlane Insurance claim

pool Customer
  ~> Claim received

pool Insurer
  lane Claims Agent blue
    (Claim received) message -> Check policy
    Check policy type: service, store: Policy DB
      -> <Amount over 5k?>
    <Amount over 5k?>
      -yes-> Adjuster review
      -no-> Auto approve
    Auto approve type: service, note: Under 5k, no person reviews the claim
      -> <> as merge

  lane Adjuster orange
    Adjuster review type: user
      -> [[Inspect property]]
      (5 days) timer -> Escalate      // a boundary event: fires if the review takes 5 days
    [[Inspect property]] -> merge
    Escalate type: user -> (Escalated)

  lane Finance green
    merge -> <+> as split
    split
      -> Notify customer
      -> Pay claim
    Notify customer type: send
      -> <+> as join
      ~> Customer
    Pay claim type: service -> join
    join -> (Paid)
```

### Tech Radar

```dgmo
tech-radar Pirate Operations Radar — Q2 1718

rings
  Full Sail
  Trial Run
  Davy Jones

Tactics quadrant: top-right, color: purple
  Ambush at Dawn ring: Full Sail, trend: stable
  Boarding Parties ring: Full Sail, trend: stable
  Grappling Volleys ring: Full Sail, trend: up
  Decoy Flags ring: Trial Run, trend: up
  Smoke Screens ring: Trial Run, trend: new
  Night Raids ring: Trial Run, trend: up
  Kraken Diplomacy ring: Trial Run, trend: new
  Fire Ships ring: Trial Run, trend: new
  Ramming ring: Davy Jones, trend: down

Vessels quadrant: top-left, color: blue
  Brigantine ring: Full Sail, trend: stable
  Sloop ring: Full Sail, trend: up
  War Galleon ring: Trial Run, trend: up
  Frigate ring: Trial Run, trend: new
  Junk Rig ring: Trial Run, trend: new
  Longboat ring: Davy Jones, trend: down

Plunder Targets quadrant: bottom-left, color: orange
  Merchant Convoys ring: Full Sail, trend: stable
  Spanish Treasure Fleets ring: Full Sail, trend: stable
  Port Raids ring: Trial Run, trend: up
  Rival Pirates ring: Trial Run, trend: new
  Royal Treasury Ships ring: Trial Run, trend: new
  Whaling Ships ring: Davy Jones, trend: stable
  Fishing Villages ring: Davy Jones, trend: down

Crew Welfare quadrant: bottom-right, color: green
  Grog Rations ring: Full Sail, trend: stable
  Code of Conduct ring: Full Sail, trend: stable
  Parrot Companions ring: Full Sail, trend: up
  Sea Shanty Program ring: Trial Run, trend: new
  Dental Plan ring: Trial Run, trend: up
  Retirement Fund ring: Trial Run, trend: new
  Plank Walking ring: Davy Jones, trend: down
```

### Venn Diagram

```dgmo
venn Pirate Skill Overlap
proportional

Swordsmanship as sw red size: 90
Navigation as nav blue size: 60
Leadership as lead green size: 35

sw + nav size: 20
nav + lead size: 12
sw + lead size: 10
sw + nav + lead size: 5
```

### Word Cloud

```dgmo
wordcloud Pirate Skills
size 12, 110

swordsmanship 100
navigation    70
gunnery       48
seamanship    38
plundering    30
leadership    22
cartography   18
intimidation  14
sailing       11
knot-tying    9
lookout       8
cooking       6
carpentry     5
parley        4
fishing       3
rum-rationing 3
mutiny        2
patch-sails   2
swabbing      1
shanties      1
```

## Project

### DACI

```dgmo
raci Captain's Council Decisions
roles
  Captain
  Quartermaster
  Navigator
  Bosun

[Raid Planning]
  Choose the next prize
    Navigator: D
    Captain: A
    Quartermaster: C
    Bosun: I
  Set the attack heading
    Navigator: D A
    Captain: C
  Divide the boarding parties
    Bosun: D
    Captain: A
    Quartermaster: C

[Provisioning]
  Ration the grog
    Quartermaster: D A
    Bosun: C
  Restock the powder
    Quartermaster: D
    Captain: A
    Bosun: I
```

### Gantt Chart

```dgmo
gantt Blackbeard's Blockade — 1718
start-date 1718-05-01
today-marker 1718-05-15
critical-path

tag Role as r
  Command red
  Crew blue
  Captives orange

era 1718-05-07 -> 1718-05-16 Blockade Active blue
marker 1718-05-14 Ransom Deadline red

[Preparation] r: Crew
  Provision Ship 3d progress: 100
    -> Anchor Fleet 2d progress: 100
      -> [Blockade].Seize Merchants
  Scout Harbor 3d progress: 100
    -> Position Cannons 3d progress: 100
      -> [Blockade].Seize Merchants
  Recruit Hands 5d progress: 100
    -> [Blockade].Patrol Perimeter

[Blockade] r: Crew
  Seize Merchants 3d progress: 100
    -> Demand Medicine 2d r: Command, progress: 100
      -> Threaten Executions 2d r: Command, progress: 100
        -> [Resolution].Receive Ransom
    -> Hold Hostages 6d r: Captives, progress: 80
      -> [Resolution].Release Prisoners
  Patrol Perimeter 8d progress: 100
    -> [Resolution].Set Sail

[Resolution] r: Command
  Receive Ransom 1d r: Captives, progress: 50
    -> Release Prisoners 1d r: Captives
      -> Set Sail 0d
    -> Burn Evidence 1d r: Crew
      -> Set Sail
```

### Kanban Board

```dgmo
kanban Fleet Repairs by Ship

active-tag Ship

tag Ship as s
  Black Pearl purple
  Revenge red
  Fortune blue
  Mermaid teal

tag Priority as p
  Low gray
  High green

[Backlog] gray
  Repair the foretop sail s: Revenge, p: Low
    Mend after the last storm
  Reinforce the gunwales s: Fortune, p: High
    Two planks are rotting
  Rig a second anchor s: Black Pearl, p: Low
  Splice the mooring lines s: Mermaid, p: Low

[In Progress] teal wip: 4
  Caulk the hull seams s: Revenge, p: High
    Hold has been taking water
  Restock powder kegs s: Black Pearl, p: High
    Last batch ran damp
  Chart the shoals s: Fortune, p: Low
  Oil the capstan s: Mermaid, p: Low

[Blocked] red
  Find a new sailmaker s: Black Pearl, p: High
    Old one took ill at last port
  Buy fresh tar s: Mermaid, p: High
    Port merchants out of stock

[Done] green collapsed
  Inventory the hold s: Fortune, p: Low
  Sharpen the cutlasses s: Revenge, p: Low
  Hoist the colours s: Black Pearl, p: Low
  Stow the cannon s: Revenge, p: High
```

### PERT

```dgmo
pert Pirate Voyage to the Atoll
time-unit w
default-confidence high
active-tag Crew

tag Crew as c
  Captain blue
  Quartermaster green
  Navigator purple
  Bosun orange

voyage approved 0 c: Captain
  -> recruit crew
  -> careen hull
  -> chart course
  -> bribe harbormaster

recruit crew 1 2 6 c: Bosun
  -> load powder
  -> drill gunners

careen hull 2 c: Bosun
  -> load powder

load powder 0.5 1 1.5 c: Quartermaster
  -> sail to atoll

drill gunners 1 1 1.5 c: Bosun
  -> sail to atoll

chart course 1 3 9 c: Navigator
  -> sail to atoll

bribe harbormaster 0.5 0.5 1 c: Captain
  -> sail to atoll

sail to atoll 4 5 7 c: Navigator
  -> count gold
  -> repair hull
  -> bury chest

count gold 1 1 2 c: Quartermaster
  -> divvy shares

repair hull 2 c: Bosun
  -> divvy shares

bury chest 1 4 10 c: Captain
  -> divvy shares

divvy shares 0.5 1 1 c: Quartermaster
```

### RACI Matrix

```dgmo
raci Voyage Operations
roles
  Captain
  Quartermaster
  Boatswain
  Navigator
  Crew

[Departure] teal
  Plot the course
    Captain: A
    Navigator: R
    Quartermaster: C
  Provision the hold
    Quartermaster: A R
    Captain: C
    Crew: I

[At Sea] purple
  Stand the watch
    Boatswain: A
    Crew: R
  Mend sail damage
    Boatswain: A
    Crew: R

[Landfall] green
  Negotiate with port
    Captain: R A
    Quartermaster: C
  Inventory the take
    Quartermaster: A R
    Crew: I
```

### RASCI

```dgmo
raci Crew Responsibilities — Boarding Raid
roles
  Cap  red
  QM   orange
  Bos  yellow
  Nav  blue
  Gun  purple
  Crew gray

[Approach] teal
  Spot the prize
    Cap: A
    Nav: R
    Bos: S
    Crew: I
  Close the distance
    Nav: A R
    Cap: C
    Bos: S

[Boarding] purple
  Fire a warning shot
    Gun: A R
    Cap: C
    Crew: S
  Swing the grappling lines
    Bos: A R
    Crew: S
    Cap: I
  Storm the deck
    Cap: A
    Bos: R
    Crew: S
    Gun: S

[Plunder] green
  Secure the captives
    QM: A
    Crew: R
    Bos: S
  Tally the take
    QM: A R
    Cap: C
    Crew: S
```

### Timeline

```dgmo
timeline Pirate Campaigns 1717-1719

era 1717-01 -> 1717-12 Golden Age Peak
era 1718-01 -> 1718-12 Royal Navy Response
marker 1718-05 Rogers Arrives Nassau

[Blackbeard]
  1717-03 -> 1717-09 Blockade of Charles Town
  1717-11 Queen Anne's Revenge captured
  1718-01 -> 1718-06 Carolina Coast raids
  1718-11 Last stand at Ocracoke

[Bonnet]
  1717-06 -> 1717-10 First cruise
  1718-03 -> 1718-07 Revenge refitted
  1718-08 -> 1718-10 Cape Fear pursuit
  1718-12 Trial and hanging

[Royal Navy]
  1718-02 -> 1718-06 Fleet assembles
  1718-07 -> 1718-09 Nassau secured
  1718-10 -> 1719-03 Sweep operations
```

## Software

### C4 Architecture

```dgmo
c4 Pirate Treasure Map System

tag Scope as sc
  Crew blue
  External gray

Captain is a person description: Commands the fleet and plans raids

TreasureMap is a system description: Tracks buried treasure locations and raid intelligence
  -Views treasure locations-> Captain
  -Sends raid alerts [carrier pigeon]-> Lookout

  containers
    ChartRoom is a container description: Interactive sea chart with treasure markers, tech: Parchment
      -Queries treasure data [secret code]-> Vault

    Vault is a container description: Encrypted treasure ledger and coordinates, tech: Iron Chest
      -Reads/writes [quill and ink]-> TreasureLog

    TreasureLog is a container description: "Stores locations, guard counts, and loot inventories", tech: Leather-Bound Tome

Lookout is an external description: Crow's nest spotter on allied ships, sc: External
  ~Relays sightings to~> Captain

deployment
  Flagship
    container ChartRoom
    container Vault
  SecretCave
    container TreasureLog
```

### Class Diagram

```dgmo
class Ship Class Hierarchy

Vessel [abstract] blue
  # name: string
  + sail(): void

Ship extends Vessel
  # crew: number
  + anchor(): void

Warship extends Ship red
  - cannons: number
  + fire(): void

Galleon extends Warship red
  - treasureHold: number
  + plunder(): void

ManOWar extends Galleon red
  - gunDecks: number
  + broadside(): void

Frigate extends Warship red
  - speed: number
  + chase(): void

Sloop extends Ship green
  - speed: number
  + flee(): void

ShipType [enum]
  Sloop
  Galleon
  ManOWar

Ship
  -> ShipType : has type
```

### Entity Relationship

```dgmo
er Pirate Fleet

ships
  id int pk
  name varchar
  ship_type varchar
  cannons int
  1-aboard-* crew_members
  1-1 captains
  1-carries-* treasure

captains
  id int pk
  name varchar
  ship_id int fk
  bounty int
  ?-frequents-1 ports
  *-has-1 crew_members 

crew_members
  id int pk
  name varchar
  ship_id int fk
  role varchar nullable

treasure
  id int pk
  name varchar
  value int
  ship_id int fk nullable

ports
  id int pk
  name varchar
  region varchar unique
  1-docks-* ships
```

### Flowchart

```dgmo
flowchart Mutiny Resolution
direction-tb

(Weigh Anchor) -> [Set Sail] -> <Crew Discontent?>
  -no-> (Reach Port)
  -yes-> [Call a Vote] -> <Vote Outcome?>
    -loyal-> [Hold Steady] -> (Reach Port)
    -mutiny-> [Seize the Ship] -> [Maroon the Captain] -> (Elect New Captain)
```

### Infrastructure Diagram

```dgmo
infra Pirate Communication Network

tag Fleet as f
  Blackbeard red
  Bonny purple
  Rackham blue

Edge
  rps: 200
  -> SignalFlags

SignalFlags f: Blackbeard
  description: Flag semaphore relay — ship-to-ship messaging
  latency-ms: 3000
  -> Flagship
  -> ScoutShip

Flagship f: Blackbeard
  description: Command vessel — decrypts and routes all intelligence
  instances: 1
  max-rps: 50
  latency-ms: 500
  -> CarrierPigeons
  -> RumRunner

ScoutShip f: Bonny
  description: Fast sloop for reconnaissance
  instances: 2
  max-rps: 30
  latency-ms: 800
  -> Flagship

CarrierPigeons f: Rackham
  description: Long-range bird relay — messages to allied ports
  buffer: 100
  drain-rate: 12
  retention-hours: 72
  -> TavernNetwork

[Allied Ports]
  instances: 3

  TavernNetwork f: Rackham
    description: Dockside tavern informants across the Caribbean
    max-rps: 20
    latency-ms: 9000

RumRunner f: Bonny
  description: Smuggler supply line — moves coded messages in rum barrels
  concurrency: 4
  duration-ms: 12000
  -> TavernNetwork
```

### Mindmap

```dgmo
mindmap A Pirate's Preferred Booty

tag Worth as w
  Priceless red
  Prized orange
  Trifling green

tag Hold as h
  Treasury blue
  Galley teal
  Armory purple
  Cargo yellow

Treasure w: Priceless, h: Treasury
  Gold collapsed
    Doubloons description: "Spanish-minted, coin of the realm"
    Ingots
    Rings
  Gems
    Rubies w: Priceless
    Emeralds
    Pearls
      Black Pearls w: Priceless
  Pieces of Eight
Spirits w: Prized, h: Galley
  Rum w: Prized
    Dark Rum
    Spiced Rum
    Grog description: "Watered rum, the crew's daily ration"
  Whiskey
  Wine w: Prized, collapsed
    Port
    Madeira
Ships w: Priceless, collapsed
  Galleons description: Fat treasure haulers
  Sloops
  Frigates
Armaments w: Prized, h: Armory, collapsed
  Cannons w: Priceless
    Powder w: Prized
    Shot
  Cutlasses
  Muskets
Dry Goods w: Trifling, h: Cargo
  Spices w: Prized, collapsed
    Nutmeg
    Pepper
    Cloves
  Silk
  Salt Cod
  Tobacco
```

### Radial mindmap

```dgmo
mindmap The Black Gull's Crew
radial

tag Watch as w
  Starboard blue
  Larboard orange
  Idlers green

Officers w: Idlers
  Captain
  Quartermaster
  Sailing Master
  Bosun
Gunners w: Starboard
  Master Gunner
  Powder Monkeys
  Gun Crews
    Bow Chasers
    Broadside
    Stern Chasers
Deckhands w: Larboard
  Topmen
  Lookouts
  Helmsmen
  Riggers
Galley w: Idlers
  Cook
  Surgeon
  Carpenter
```

### Sequence Diagram

```dgmo
sequence Raid on Port Royal

tag Phase as p
  Scout blue
  Plunder green
  Danger red

Captain is an actor
Navigator is an actor

[Flagship]
  Spyglass
  Cannons
  Hold is a database

[Port]
  Harbor
  Fort

Captain ~Set course~> Navigator p: Scout
Navigator ~Plot route~> Spyglass p: Scout
Spyglass ~Fort sighted~> Captain p: Scout

== Engage ==

Captain -Fire at will-> Cannons p: Danger
Cannons -Broadside-> Fort p: Danger
if fort returns fire
  Fort -Cannonball-> Cannons p: Danger
  Cannons -Hull damaged-> Captain p: Danger
else
  Fort -Surrender-> Harbor p: Plunder

== Plunder ==

Captain -Load the loot-> Hold p: Plunder
Hold -Stored-> Captain p: Plunder
```

### Sitemap

```dgmo
sitemap Pirate Bay Trading Co.

tag Access
  Public green
  Crew Only blue
  Captain red

tag Page
  Landing purple
  Form orange
  Content cyan

Home Access: Public, Page: Landing
  -shop-> Shop
  -join-> Enlist
  -sign in-> Login
  -raids-> Raid Calendar
  -> [Port Market]

[Port Market]
  Shop Access: Public, Page: Content
    -buy-> Checkout
  Checkout Access: Crew Only, Page: Form
    -purchased-> Ship Log

[Account]
  Enlist Access: Public, Page: Form
    -enlisted-> Ship Log
  Login Access: Public, Page: Form
    -welcome aboard-> Ship Log
    -forgot-> Reset Password
  Reset Password Access: Public, Page: Form
  Change Password Access: Crew Only, Page: Form
  Ship Log Access: Crew Only, Page: Content
    -voyage-> Raid Calendar

[Raid Planning]
  Raid Calendar Access: Crew Only, Page: Content
    -book-> Schedule Raid
    -view-> Treasure Map
  Schedule Raid Access: Captain, Page: Form
  Treasure Map Access: Captain, Page: Content
```

### State Diagram

```dgmo
state Ship Battle Lifecycle
direction-tb

tag Stance as s
  Calm blue
  Attack red
  Cunning orange
  Spoils green
  Doom gray

[*] -> Sailing
Sailing s: Calm
  -enemy spotted-> Engaging
Engaging s: Attack
  -boarders ready-> Boarding
  -outgunned-> Fleeing
Boarding s: Attack
  -crew wins-> Plundering
  -crew loses-> Captured
Fleeing s: Cunning
  -escaped-> Sailing
Plundering s: Spoils
  -loot taken-> Sailing
Captured s: Doom
  -> [*]
```

### Version Control

```dgmo
version-control Pirate Website Release Voyage

main
  Set sail
  Add plunder calculator
  note Never sail without a tagged release

feature/jolly-roger-theme from main purple
  Skull and bones logo
  Dark mode: night watch

feature/ship-leaderboard from main teal
  Rank the crews
  Add shares splitter

main
  merge feature/jolly-roger-theme tag: v1.1.0
  merge feature/ship-leaderboard tag: v1.2.0

hotfix/kraken from main red
  Patch the kraken bug type: highlight

main
  merge hotfix/kraken tag: v1.2.1
```

### Wireframe

```dgmo
wireframe Pirate Crew Portal

[Header]
  The Jolly Roger Crew Hub
  nav
    Dashboard active
    Treasure Map
    Ship Log
    Crew Roster

[Main]
  # Ahoy, Captain!

  Next Raid Target  [Port Royal]
  Estimated Loot  [5000 doubloons] readonly

  {The Revenge | The Serpent | The Phantom}

  <x> Load extra cannons
  < > Fly false colors

  (*) Full crew
  ( ) Skeleton crew

  (Set Sail!)
  (Abort Mission) ghost

  ---

  New to piracy? (Read the Code) ghost
```

### Event Line

```dgmo
event-line The Black Pearl Legend
no-box

tag Deed as t
  Voyage blue
  Plunder orange
  Battle red
  Crew green
  Treasure purple

[The Mutiny Years]
  1712-03 Captain takes the helm  t: Crew
    The Black Pearl gets a new master and a skeleton crew.
  1712-06 Set course for Tortuga  t: Voyage
    First long crossing under the black flag.

[The Golden Age]
  1715-06 Spanish galleon taken  t: Plunder
    Forty chests of doubloons.
  1715-09 Siege of Port Royal  t: Battle
    The harbour guns fall silent.
  1716-02 Shares split  t: Treasure
    Every sailor draws a fair cut.

[Last Voyages]
  1719-04 Kraken sighted  t: Battle
    **Three** longboats lost to the deep.
  1721-11 Landfall at Skull Island  t: Voyage
    The map finally leads somewhere.
  1722-01 Hoard buried  t: Treasure
    Only the Navigator knows the spot.

[What's Next]
  TBD Retire to the Caribbean  t: Crew
    Quartermaster keeps the ledger.
```

### Block

```dgmo
block Web Service Architecture

tag Layer as l
  Edge red
  Service green
  Data blue

[Clients] l: Edge
  [Browser] [Mobile] [CLI]

[Backend] l: Service
  [Auth] [Orders]
  [Inventory] [Billing]

[Data] l: Data collapsed
  [Postgres] [Redis]
```

## Freeform

### Boxes and Lines

```dgmo
boxes-and-lines Pirate Fleet Command

tag Side as t
  Pirate green
  Navy red
  Smuggler yellow
  Harbor blue default

Flagship t: Pirate
  -orders-> [Harbor Defenses]
  -scouts-> IntelNetwork

[Harbor Defenses]
  FortCannon t: Harbor
    -covers-> Watchtower
  Watchtower t: Harbor
  SeaMines t: Harbor

IntelNetwork t: Pirate
  -hires-> SpyRing
  -reads-> SignalFlags

SpyRing t: Smuggler
  -warns-> [Harbor Defenses]

SignalFlags t: Pirate

NavyFrigate t: Navy
  -blockades-> [Harbor Defenses]
NavyCutter t: Navy
  -hunts-> SmugglerSloop
SmugglerSloop t: Smuggler
  -trades-> SpyRing
```

## Live link

A live link points at a diagram someone shows on the web from the Diagrammo app,
where it wears an amber globe. The note holds the pointer, not a copy, so you
always see the author's current version. To get one, open the diagram in the app
and press **Share** on the left rail (**⌘E**), then **Show on the web** → **Show** — or right-click it in the file list and choose **Show and copy
link**. The three fences below are three spellings of the same pointer.

### The keyword and an id

`live-link` and the diagram's id, on one line:

```dgmo
live-link dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
```

### A pasted share link

The link the app copied for you, on a line of its own:

```dgmo
https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
```

### A title, and the link on a `url` line

```dgmo
live-link Checkout — card payment
url https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
```

### In the note body — Obsidian only

Outside any fence, on a line of its own:

```markdown
![[live-link:dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD]]
```

This is Obsidian's own embed spelling. It works in a note and nowhere else, and
never inside a `dgmo` fence.

Turn off **Keep live links up to date** in the Diagrammo plugin's settings and
nothing is fetched: each live link shows a card naming the diagram instead.

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
