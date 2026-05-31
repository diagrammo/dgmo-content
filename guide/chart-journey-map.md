# Journey Map

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

Journey maps visualize a user's experience across a process or service, plotting emotional highs and lows as a continuous curve. Each step has a score (1–5, high is good) that drives the emotion landscape. Phases group related steps, annotations capture pain points, opportunities, and thoughts, and tags add cross-cutting dimensions like channel or touchpoint.

Journey maps are ideal for UX research, customer experience mapping, service design, and identifying friction points.

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

Name is everything after `persona `. Indented lines add description text. Only one persona per diagram.

## Phases

Phases group steps into logical stages:

```
[Research]
  Compare specs | 4
  Watch reviews | 5

[Purchase]
  Add to cart | 3
  Complete payment | 3
```

Phases are optional — steps can appear at root level for a flat continuous flow.

## Steps

Steps appear indented within phases (or at indent 0 in flat mode).

### Score Syntax

The score is set with the `score:` key in same-line metadata:

```
Step Name score: 4                              // bare score
Step Name score: 4, emotion: Delighted          // score + emotion label
Step Name score: 4, ch: Web                     // score + tag metadata
Step Name score: 4, emotion: Delighted, ch: Web // score + label + metadata
Step Name                                       // no metadata = scoreless step
```

- **Score scale**: 1–5 integer (high = good)
- **Emotion label**: optional single word after the score (e.g., `Frustrated`, `Delighted`, `Neutral`)
- **Scoreless steps**: render as cards but produce no emotion curve point

## Annotations

Deeper-indented lines under a step add context:

```
  Forced account creation | 1 Frustrated
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
  Compare specs | 4, ch: Web
  Ask friends | 4, ch: In-Person
```

Reference tag values in step pipes via the alias.

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
