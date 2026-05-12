# PERT Diagram

```dgmo
pert Pirate Voyage to the Atoll
time-unit w
default-confidence medium

voyage approved 0
  -> recruit crew

[outfit ship]
  recruit crew 1 2 4 as rc
    -> load powder
  careen hull 1.5
    -> load powder
  load powder 0.5 1 2
    -> sail to atoll

sail to atoll 5
  -> count gold
  -> repair hull

count gold 1 2 3
  -> divvy shares

repair hull 3
  -> divvy shares

divvy shares 1 2 3
```

## Overview

A PERT diagram (Program Evaluation Review Technique) is an Activity-on-Node project network. Each activity carries a duration estimate — three-point (O / M / P), single-number (M-only), or zero (a sync point) — and the analyzer computes earliest/latest start/finish times, slack, the M-world critical path, and (when at least one activity has a three-point estimate) a probability-weighted criticality index plus P50/P80/P95 completion percentiles.

Use it when you want to plan work that has uncertainty and parallelism: launches, expeditions, refactors, releases. Critical-path activities saturate toward the palette accent; off-critical activities stay closer to the surface tint.

## Syntax

```
pert Project Name
time-unit w

kickoff 0
  -> design

design 1 2 4
  -> build

build 3
  -> ship

ship 1 1 2
```

Every activity is declared on its own non-indented source-line with its duration estimate. Arrow lines (`-> name`) only carry a name — they are pure references, never declarations. This keeps every activity's attributes in exactly one place.

## Settings

| Key            | Description                                                                       | Default       |
| -------------- | --------------------------------------------------------------------------------- | ------------- |
| `pert`         | Required. Optional title follows.                                                 | —             |
| `time-unit`    | One of `min`, `h`, `d`, `bd`, `w`, `m`, `q`, `y`. Default unit for duration tokens and for μ/σ/ES/EF formatting. **Overrideable per-token** — see *Per-token Time Units*. | `d` |
| `direction`    | `LR` (left-to-right) or `TB` (top-to-bottom).                                     | `LR`          |
| `node-detail`  | `compact` shows name + duration; `full` adds μ ± σ inside the node.               | `compact`     |
| `default-confidence` | `high` / `medium` / `low`, or an explicit `O/P` factor pair (e.g. `0.6/2.5`). Fills O/P for M-only activities. Per-activity override via `\| confidence: low` pipe metadata. See *M-only Estimates* for multipliers. | `medium` |
| `trials`       | Monte Carlo trial count. Auto-derived from activity count when omitted.           | auto-derived  |
| `seed`         | Deterministic PRNG seed. Auto-derived from the title (or activity names) when omitted. | auto-derived  |
| `start-date`   | `YYYY-MM-DD` or `now`. **Forward anchor** — pins project start; ES/EF/LS/LF render as calendar dates. Mutually exclusive with `end-date`. See *Anchoring to a Calendar*. | none |
| `end-date`     | `YYYY-MM-DD` (literal date only — `now` is a parse error). **Backward anchor** — pins the project deadline; flips percentile interpretation to *latest-safe starts*. Mutually exclusive with `start-date`. See *Anchoring to a Calendar*. | none |

`trials` and `seed` exist for power users who want exact control. The defaults are set up so authors never need to think about them: the analyzer scales trials with graph size, and the seed is hashed from the title so two diagrams render with different (but each individually stable) noise.

## Activities

Each activity is declared on its own non-indented source-line. The duration estimate follows the name:

```
research 2 3 5             three-point: O M P
prototype 5                M-only: O and P fill from default-confidence
gate 0                     zero-duration: marked with ◆ (sync point)
demo                       TBD: no estimate yet (poisons descendants)
```

### Per-token Time Units

Duration tokens normally inherit the diagram-level `time-unit`. Append a unit suffix to any token to override it *for that token only*:

```
setup 5d                              # days, regardless of diagram time-unit
research 1w 2w 4w                     # explicit weeks per O/M/P
audit 2d 5d 2w                        # mixed: 2 days / 5 days / 2 weeks
quick fix 30min                       # sub-day activity
```

Valid suffixes: `min`, `h`, `d`, `bd`, `w`, `m`, `q`, `y`. The analyzer normalizes everything to the diagram's `time-unit` for arithmetic, so ES / EF / LS / LF read out in one consistent unit regardless of which units you authored on individual activities.

**When this matters.** A high-level plan in weeks (`time-unit w`) often has one or two short activities that read better in days (`setup 5d`) — overriding inline avoids forcing awkward fractional weeks like `0.71w`. Mixing units inside a single triple is allowed but rare — usually the three estimates share a unit.

### Three-point Estimates

`name O M P` gives optimistic / most-likely / pessimistic durations:

- **O (optimistic)** — best case. If everything goes right, what's the fastest this could finish?
- **M (most likely)** — your gut estimate. The single number you'd give if forced to pick one.
- **P (pessimistic)** — worst case (not catastrophe). If normal things go wrong, what's the slowest reasonable finish?

The analyzer combines these into two summary numbers per activity using the Beta-PERT formulas:

- **μ (mu) = (O + 4M + P) / 6** — the **expected duration**. Your best single-number estimate, weighted toward M but pulled by the asymmetry between O and P. This is the number to use when someone asks "how long will this take?"
- **σ (sigma) = (P − O) / 6** — the **spread**, roughly a standard deviation. How uncertain you are. A small σ means you're confident; a large σ means the duration could swing widely. High-σ activities are the ones to watch — they're where surprise schedule slips come from.

**Rule of thumb:** if you doubled the gap between O and P, you didn't make the project longer — you admitted it was more uncertain. σ goes up, P95 moves out, but μ barely changes.

### M-only Estimates

`name M` records only the most-likely duration. The analyzer fills in O and P from the active confidence level — the `default-confidence` directive, or a per-activity `| confidence: low` override.

#### Confidence multipliers

Each level resolves to a pair of multipliers applied to M:

| Level                | O multiplier | P multiplier | Use for |
| -------------------- | -----------: | -----------: | ------- |
| `high`               | × 0.9        | × 1.5        | Familiar, repeatable work where you'd be surprised to be far off. |
| `medium` *(default)* | × 0.75       | × 3.0        | Typical software / project work where things sometimes go sideways. |
| `low`                | × 0.5        | × 4.0        | Research, exploratory, or first-time work where the worst case is genuinely open-ended. |

So for `name M` with `default-confidence medium`: O = `0.75 × M`, P = `3.0 × M`. With M = 4 that's O = 3, P = 12.

The multipliers are intentionally **asymmetric** — pessimistic spreads more than optimistic. In practice, real-world tasks slip much further than they speed up (Hofstadter's Law), so encoding symmetric uncertainty would systematically under-state risk.

#### Per-activity override

The diagram-level `default-confidence` applies to every M-only activity, but any single activity can override it with `| confidence: <level>` pipe metadata. The override accepts the same forms as the directive — a named level or an explicit `O/P` factor pair:

```
default-confidence medium

quick fix 2                            # uses medium (0.75 / 3.0)
hard research 3 | confidence: low      # uses low    (0.5  / 4.0)
known task 1   | confidence: high      # uses high   (0.9  / 1.5)
custom 4       | confidence: 0.6/2.5   # explicit factors, just this activity
```

Use overrides on the handful of activities that genuinely diverge from the project's confidence default — don't mark every line. If most of your activities want a non-medium confidence, change `default-confidence` instead.

#### Worked example

With `M = 4 weeks`, each confidence level produces:

| Level     | O    | M | P    | μ    | σ    |
| --------- | ---- | - | ---- | ---- | ---- |
| `high`    | 3.6  | 4 | 6.0  | 4.27 | 0.40 |
| `medium`  | 3.0  | 4 | 12.0 | 5.17 | 1.50 |
| `low`     | 2.0  | 4 | 16.0 | 5.67 | 2.33 |

Two things worth noticing:

1. **Lower confidence pushes μ up**, not just σ. Because P pulls four times harder than O (the asymmetry above), admitting you're less sure also moves your expected duration. The honest estimate is longer.
2. **σ grows fast** — `low` is roughly 6× the σ of `high`. Your project's overall variance is the root-sum-square of activity σ on the critical path, so a single `confidence: low` activity can dominate the project's P95.

### Zero-duration Activities (Sync Points)

`name 0` declares an activity with no duration — useful for project gates, externally-imposed deadlines, or "phase X complete" markers. Zero-duration activities render with a `◆` glyph before the label so they stand out in the network. They participate in the dependency graph and critical path but contribute 0 to project μ/σ.

```
voyage approved 0
  -> recruit crew

recruit crew 1 2 4
  -> sail

sail 3 5 8
  -> landfall

landfall 0
```

### Aliases

Append `as <id>` to give an activity a stable short id you can reference from later edges:

```
recruit crew 1 2 4 as rc

load powder 0.5 1 2

rc
  -> load powder
```

A bare alias source-line (`rc`) resolves to the canonical activity, so subsequent arrows attach to the original. Aliases must be declared on the activity's source-line — not on an arrow line.

## Edges

Dependencies are written with `->` from a child line indented under the predecessor. Arrow lines may only carry a destination name (or an existing alias) — durations, `as <alias>`, and pipe metadata must live on the target's own source-line:

```
recruit crew 1 2 4
  -> load powder
  -> careen hull

load powder 0.5 1 2
careen hull 1.5
```

Inline forward-declarations (`-> load powder 0.5 1 2`) are rejected — readers should always know to look at a non-indented line for an activity's attributes.

### Dependency Types and Lag/Lead

By default, every `->` is **Finish-to-Start with zero lag** — the successor can't start until the predecessor finishes. That's the dominant case; you almost never need anything else.

For the cases where you do, the arrow carries an inline label between two dashes to override the type, the lag, or both:

| Syntax | Type | Meaning |
|--------|------|---------|
| `A -> B` | FS *(default)* | B starts after A finishes — no lag |
| `A -SS-> B` | SS | B starts when A starts |
| `A -2d-> B` | FS with +2d lag | B starts 2 days after A finishes |
| `A -SS+2d-> B` | SS with +2d lag | B starts 2 days after A starts |
| `A -FF-1d-> B` | FF with 1d lead | B finishes 1 day before A finishes |
| `A -SF+3d-> B` | SF with +3d lag | Rare — B finishes 3 days after A starts |

Grammar: `-[TYPE][±LAG]->` — both pieces optional, but the label must carry at least one of them. Type names are case-insensitive (`SS`, `ss`, `Ss` all parse).

#### The four types

| Type | What it constrains | When to use |
|------|--------------------|-------------|
| **FS** *(default)* | B can't start until A finishes (+ lag) | Sequential work — the common case |
| **SS** | B can't start until A starts (+ lag) | Parallel work staggered by a fixed offset |
| **FF** | B can't finish until A finishes (+ lag) | Ship-together activities that have to land simultaneously |
| **SF** | B can't finish until A starts (+ lag) | Rare; included for completeness |

The trick to reading them: the **first letter is the predecessor's anchor**, the **second is the successor's anchor**. `SS` means "predecessor's start gates successor's start"; `FF` means "predecessor's finish gates successor's finish." `FS` (the default) is "predecessor's finish gates successor's start" — and that's why it's the common case: most work is "finish this, then start that."

#### Lag vs lead

- **Lag is positive — a wait.** `-FS+2d->` reads "B starts 2 days *after* A finishes." Lag pushes the successor later.
- **Lead is negative — an overlap.** `-FS-1d->` reads "B can start 1 day *before* A finishes." Lead pulls the successor earlier, letting downstream work begin while the predecessor is wrapping up.

Lag values inherit the diagram's `time-unit` unless suffixed (`-FF+4h->`, `-SS+2d->`), the same way activity durations work.

#### Reading non-default edges in the rendered diagram

The renderer paints a small midpoint label on every edge that isn't a plain FS+0 — `SS +2d`, `FF -1d`, or just `+2d` for an FS edge that only carries lag. Default edges stay visually clean so the non-default ones jump out. If you see no label on an edge, it's the default; if you see one, slow down and read it.

#### Impossible leads

A lead bigger than the predecessor's duration is logically impossible — the successor would have to start before the predecessor starts on an FS edge that says the successor *follows* the predecessor. The analyzer emits a warning when this happens. The schedule still computes (the constraint is clamped to A.ES), but the lead is asking for something the dependency can't deliver. Either shorten the lead or switch the type to SS.

#### No diagram-level default

There's deliberately no `default-edge-type` directive. Every edge declares its type inline, so copy-pasting an edge between diagrams never silently flips its semantics. If most of your edges are SS, you write `-SS->` on each — verbose by design.

#### Worked example

A small voyage prep showing all four levers in context:

```
pert Outfit and Set Sail
time-unit d

charter ship 3
  -SS+1-> recruit crew

recruit crew 2 3 5
  -FF-> provision hold

provision hold 4
  -FS-1-> brief captain

brief captain 0.5
  -> set sail

set sail 0
```

What each edge expresses:

- `charter ship -SS+1-> recruit crew` — **start-to-start with 1-day lag.** Recruiting starts 1 day after chartering starts; the two run in parallel after that initial day. The captain doesn't want the crew arriving before the ship is even paid for.
- `recruit crew -FF-> provision hold` — **finish-to-finish, zero lag.** Provisioning has to be done by the time the crew is fully assembled (you can't sail short on rations), but the two activities are otherwise independent — provisioning could finish first and just wait.
- `provision hold -FS-1-> brief captain` — **finish-to-start with a 1-day lead.** The captain briefing can begin a day before provisioning fully completes — there's enough info partway through to start preparing the briefing.
- `brief captain -> set sail` — **plain FS+0** (the default). Sailing waits for the briefing to finish, no overlap. The midpoint label is suppressed because there's nothing non-default to say.

Read the diagram's midpoint labels first if you suspect lag is shifting the critical path. A `SS+5d` lag on the wrong edge can make an off-critical activity drive the project finish, and it's invisible in the duration numbers alone.

## Groups

Wrap related activities in `[group-name]` to add a dashed bounding rect. Groups with a single entry and single exit are auto-classified as **hammocks** (collapsible into a super-edge); multi-entry/multi-exit groups are **clusters** (collapsible into a bounding rect).

```
[outfit ship]
  recruit crew 1 2 4
    -> load powder
  careen hull 1.5
    -> load powder
  load powder 0.5 1 2
    -> sail to atoll

sail to atoll 3 5 8
```

## Monte Carlo Analysis

Monte Carlo runs **automatically** whenever at least one activity carries an O/M/P triple (e.g. `recruit crew 1 2 4`). No directive needed — the data tells the analyzer what kind of analysis it can perform. M-only and zero-duration activities still participate; they just don't add variance.

```
recruit crew 1 2 4
  -> sail

sail 3 5 8
```

The renderer then:

- Tints each activity by its **criticality index** (fraction of trials where the activity sits on the longest path). 0 → surface tint, 1 → full accent.
- Adds a **diagonal stripe overlay** to activities with criticality ≥ 0.9 — a non-color signal so deuteranopic readers can still find the modal critical path.
- Prints **P50 / P80 / P95** project-completion percentiles next to the title.

The simulator uses a deterministic mulberry32 PRNG; a given (seed, inputs) tuple produces the same output across machines.

### Interpreting the Output

The analysis answers three practical questions:

**1. When will this finish?** The P50 / P80 / P95 percentiles in the title — *in forward or no-anchor mode*:

- **P50** — 50% chance of finishing by this date. Half the time you'll be earlier, half later. Don't promise this date externally.
- **P80** — 80% chance of finishing by this date. A reasonable date to commit to a stakeholder if you have a little slack to spare.
- **P95** — 95% chance of finishing by this date. The "if anyone asks, no later than" date. Use for hard deadlines and SLAs.

If the gap between P50 and P95 is small, the schedule is robust. If it's wide, your real risk is variance — focus on tightening the worst-case (P) estimates on high-σ activities rather than speeding up the most-likely (M).

> In **backward mode** (`end-date` is set), these percentiles flip meaning — they report *latest-safe starts*, not finishes. See *Anchoring to a Calendar* below.

**2. Where is the schedule fragile?** Criticality tells you which activities are on the critical path *most of the time across all the trials*:

- An activity with **criticality near 1** is on the critical path in nearly every trial — slipping it slips the whole project.
- An activity with **criticality near 0** has slack — a delay there won't move the finish date.
- The **stripe overlay** marks the activities the project is most likely to hinge on. That's where to invest in risk reduction first.

**3. What if I had to cut scope?** Look at the light-tinted activities — cutting them won't move the finish date. Cutting a saturated activity will.

## Anchoring to a Calendar

By default, ES / EF / LS / LF cells render as numeric offsets in the diagram's `time-unit`. Add one of two anchors to turn them into real dates:

- `start-date 2026-06-01` — **forward anchor.** Pins project start. Everything counts forward from there.
- `end-date 2026-09-15` — **backward anchor.** Pins project end (deadline). The renderer derives projectStart as `end-date − μ` and dates everything backward from the deadline.

`start-date` and `end-date` are **mutually exclusive** — author one or the other. `start-date now` resolves to today's local date at parse time (share-links bake the resolved date in so recipients see what the author saw). `end-date now` is a parse error — express deadlines as concrete dates.

### Forward Mode: "When will we finish?"

With `start-date`, percentiles answer the most common scheduling question. P50 / P80 / P95 in the title are **finish dates** — same interpretation as the *Interpreting the Output* section above. The S-curve x-axis is finish date, y rises 0 → 1 ("chance we're done by date X").

### Backward Mode: "When must we start?"

This is the mode that catches people out. **Percentile meaning flips.** With `end-date`, you've committed to finishing *by* the deadline — the open question is no longer "when will we finish?" but "how late can we still start and reasonably hit that date?"

P50 / P80 / P95 in the title reframe as **latest-safe starts**:

- **P50 start** — start by this date for a 50% chance of hitting the deadline. Too thin to commit to anything.
- **P80 start** — start by this date for an 80% chance. A reasonable working buffer.
- **P95 start** — start by this date for a 95% chance. The absolute last responsible moment to begin.

The S-curve flips with the framing: x-axis is candidate start date, y *falls* 1 → 0 — "chance we still hit the deadline if we start by date X." The right edge of the chart (x = `end-date`) shows the impossible "start on the deadline" scenario; the left edge shows generous buffer.

The title annotation reads *"Backward-anchored from end-date YYYY-MM-DD (as of YYYY-MM-DD)"* — the second date is when the diagram was parsed, captured so a shared backward-anchored plan is auditable later.

#### Past-date warning

If a latest-safe-start date falls in the **past** (you needed to start before today to hit the deadline with that confidence), the row appends `(latest-safe start has passed)`. Read this as: *at that confidence level, you're already late*. There are only three responses — pull in scope, accept a lower confidence, or move the deadline.

#### Ramifications of setting `end-date`

- **Set `end-date` only when the deadline is the constraint, not the goal.** If you can negotiate the date, use `start-date` and read the finishes — that gives you commit-able dates. `end-date` is for "this date is fixed, work backward from it."
- **Backward mode tells you when to start, not whether the plan fits.** If P95-start is already in the past, the analysis is telling you the plan doesn't fit the deadline at any reasonable confidence — that's a renegotiation signal, not a scheduling output.
- **TBD activities silence the analysis.** Without estimates everywhere, `projectStart` can't be derived; all schedule cells render `?`. Finish estimating before relying on backward mode.
- **`time-unit bd` is treated as calendar days** under any anchor (you get a warning). For real business-day scheduling, use a Gantt chart instead.
- **`time-unit min` / `h` round to whole days** for date display under any anchor (you get a warning). Anchors are calendar-grained, not time-of-day-grained.

## Reading the Diagram

| Visual | Meaning | What to do |
| --- | --- | --- |
| Saturated red fill | Activity is on the critical path most of the time | Protect it. Add buffer, assign your strongest people, track it closely. |
| Light tint | Activity has slack | Don't over-invest. Cuttable if scope tightens. |
| Diagonal stripes | Criticality ≥ 0.9 — your bottleneck | Risk-reduction effort goes here first. |
| ◆ before name | Zero-duration sync point | A milestone or gate. Useful for tracking; adds no time to the project. |
| Dashed border | Group bounding rect, **or** a TBD activity (no estimate) | If it's a group, just visual grouping. If it's TBD, finish estimating before relying on the analysis. |

## Tips

- For deterministic Monte Carlo across edits, pin `seed N` explicitly. Otherwise the auto-derived seed changes if the title (or activity names) change.
- TBD activities (no estimate) "poison" their descendants — slack stays `null` and the renderer marks them gray. Resolve TBDs before relying on the analysis.
- `confidence: low` widens O/P spreads; `confidence: high` tightens them. Use per-activity overrides for tasks with unusual variance.
