```dgmo
journey-map Morning Coffee Run

persona Maya, Remote Worker
  31, needs caffeine + a quiet seat before her 9am standup

[Arrive]
  Spot the line out the door score: 2, emotion: Wary
  Find the mobile-order shortcut score: 4, emotion: Hopeful

[Order]
  App crashes mid-checkout score: 1, emotion: Frustrated
    pain: Lost her saved payment method
  Reorder at the counter score: 3

[Enjoy]
  Snag the last window seat score: 4
  First sip, latte is perfect score: 5, emotion: Delighted
    thought: Worth the wait — back tomorrow
```

## Overview

A journey map charts **one person's experience** across the stages of a process or service, plotting the emotional highs and lows as a continuous curve so pain points and gaps in the experience stand out. Each step carries a score (1–5, high is good) that drives the curve; phases group related steps, annotations capture pain points, opportunities, and thoughts, and tags add cross-cutting dimensions like channel or touchpoint. Reach for it for UX research, customer-experience mapping, and service design.

**The scores are subjective ratings you assigned — not measurements.** A 4 is "this felt pretty good to Maya," arrived at from research, interviews, or judgement. The renderer draws them as a smooth continuous curve, which is exactly what a chart of measured data looks like, so readers will assume the numbers were collected rather than authored. Say where they came from in the caption or surrounding text, and don't put anything with real units on this scale. If your numbers *are* measurements — completion rates, task times, survey percentages — plot them with [`line`](chart-line.md) instead, where the axis carries a unit and the reader can see what was counted.

## When to use

- **`journey-map`** — the subject is one person, the y-value is how they *felt* at each step, and you want the friction to be visible.
- **[`line`](chart-line.md)** — the numbers are real measurements with units. A journey map strips the units and converts data into a mood rating.
- **[`event-line`](chart-event-line.md)** — you're narrating events in the world rather than tracking how one person felt step by step.
- **[`swimlane`](chart-swimlane.md)** — the story is several teams handing work to each other, not one person's feelings.
- **[`wireframe`](chart-wireframe.md)** — the question is what the screens actually *contain*, not how the experience feels.

## Syntax

```
journey-map Title

persona Name

[Phase Name]
  Step Name score: N
  Step Name score: N, emotion: Label
```

The first line must be `journey-map` followed by a title. Phases use bracket syntax at indent 0. Steps are indented within phases.

## Persona

Declares the journey's protagonist:

```
persona Tech-Savvy Shopper
  28yo developer, price-sensitive, does extensive research
```

Indented lines add description text. Only one persona per diagram.

The name is everything after `persona ` **except a trailing color token**, which
is peeled off and used to color the persona card. `persona Maya green` is a
persona named "Maya" drawn in green, not a persona named "Maya green" — so if
your protagonist is genuinely called Green or Rose, use the explicit form below.

```
// trailing color token
persona Maya green
// explicit key — same result
persona Maya color: green
// no color; the whole string is the name
persona Maya, Remote Worker
```

Both forms accept the named palette colors (`red`, `orange`, `yellow`, `green`,
`blue`, `purple`, `teal`, `cyan`, …) — see [Colors](colors.md). Steps have no
trailing-color form; color a step by giving it a tag (see *Tag Groups*).

## Phases

Phases group steps into logical stages:

```
[Research]
  Compare specs score: 4
  Watch reviews score: 5

[Purchase]
  Add to cart score: 3
  Complete payment score: 3
```

Phases are optional — steps can appear at root level for a flat continuous flow.

## Steps

Steps appear indented within phases (or at indent 0 in flat mode).

### Score Syntax

The score is set with the `score:` key in same-line metadata:

```
// bare score
Step Name score: 4
// score + emotion label
Step Name score: 4, emotion: Delighted
// score + tag metadata
Step Name score: 4, ch: Web
// score + label + metadata
Step Name score: 4, emotion: Delighted, ch: Web
// no metadata = scoreless step
Step Name
```

- **Score scale**: 1–5 integer (high = good). It is a *rating you assigned*, not a measurement — see the Overview.
- **Emotion label**: optional single word after the score (e.g., `Frustrated`, `Delighted`, `Neutral`). It renders as a caption beside the step's face on the curve — naming the *specific* feeling the score alone can't convey (anxious vs. bored both score low).
- **Scoreless steps**: render as cards but produce no emotion curve point

## Annotations

Deeper-indented lines under a step add context:

```
  Forced account creation score: 1, emotion: Frustrated
    pain: Wants guest checkout
    opportunity: Add guest checkout option
    thought: Why do I need an account?
    description: User abandoned cart twice
```

| Prefix | Rendering |
|--------|-----------|
| `pain:` | Pain point (red accent) |
| `opportunity:` | Improvement opportunity (green accent) |
| `thought:` | User thought (italic) |
| `description:` | General context text |

Multiple annotations per step are allowed.

## Tag Groups

Tags add color-coded dimensions like channel or touchpoint:

```
tag Channel as ch
  Web blue
  Mobile purple
  In-Person green

[Research]
  Compare specs score: 4, ch: Web
  Ask friends score: 4, ch: In-Person
```

Reference tag values in step metadata via the alias.

## Flat Mode

Steps at root level (no `[Phase]` brackets) render as a continuous horizontal strip:

```dgmo
journey-map Quick Feedback

Opened app score: 4
Searched for feature score: 3
Hit error score: 1, emotion: Frustrated
  pain: No helpful error message
Contacted support score: 2
Got resolution score: 5, emotion: Relieved
```

## Directives

| Directive | Effect |
|-----------|--------|
| `no-legend` | Hide the score legend |
| `active-tag GroupName` | Color by a group other than the first declared (which is active by default); `none` suppresses |

## Complete Example

```dgmo
journey-map Buying a Laptop

persona Tech-Savvy Shopper
  28yo developer, price-sensitive, does extensive research

tag Channel as ch
  Web blue
  Mobile purple
  Email teal
  In-Person green

[Research]
  Compare specs score: 4, ch: Web
    description: Checked 12 laptops across 4 review sites
  Watch reviews score: 5, emotion: Engaged, ch: Mobile
  Ask friends score: 4, ch: In-Person

[Purchase]
  Add to cart score: 3, ch: Web
  Forced account creation score: 1, emotion: Frustrated, ch: Web
    pain: Wants guest checkout
    pain: Password requirements too strict
  Complete payment score: 3, ch: Web

[Delivery]
  Track package score: 4, ch: Mobile
  Unboxing score: 5, emotion: Delighted, ch: In-Person
    opportunity: Include setup guide
    thought: Excited to try it out
```

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only — hollows the faces and drops the emotion gradient band. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Scores are a subjective 1–5 emotion rating**, drawn as a continuous curve that reads like measured data. Say so in the surrounding text if the audience might take the curve literally.
- **A trailing `//` note destroys the score.** The step falls off the emotion curve entirely, and the warning that says so is easy to read past because the step still appears in its stage.
- **A score outside 1–5 is rejected, not clamped** — the step loses its score and drops off the curve.
- **Steps must be indented under a `[Stage]`.** Notes such as `pain:` and `thought:` go one step deeper still, under the step they belong to.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`line`](chart-line.md) · [`event-line`](chart-event-line.md) · [`swimlane`](chart-swimlane.md) · [`wireframe`](chart-wireframe.md)
- **Then:** [Colors & palettes](colors.md)
