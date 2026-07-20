```dgmo
version-control Feature Branch Workflow

main
  Initial commit
  Add README

develop from main
  Set up CI
  Add test suite

feature/login from develop
  Login form
  Form validation

develop
  merge feature/login
  Address review notes

main
  merge develop tag: v1.0.0
  Hotfix typo type: highlight
```

## Overview

A version-control graph draws a commit history as parallel **branch lanes** — the git branch-and-merge picture you see in GitKraken, `git log --graph`, or a GitHub network view. It's the right diagram for explaining a **branching strategy** (GitFlow, trunk-based, release trains), onboarding docs, and pull-request walkthroughs.

The name is deliberately tool-neutral: commits, branches, and merges are universal to git, Mercurial, and SVN. It shows **topology** — who branched from whom and what merged where — not wall-clock time. For real dates use [`timeline`](chart-timeline.md) or [`gantt`](chart-gantt.md).

The grammar is **keyword-less**: a bare top-level line is a branch, a bare indented line is a commit. Re-naming a branch resumes it, so there is no `checkout` to track. Only `merge` and `cherry-pick` are verbs you have to type.

## Syntax

```
version-control Title

// a bare top-level line is a BRANCH (the first is the trunk)
main
  // a bare indented line is a COMMIT — the text is the message
  Initial commit
  Add README

// `from` sets the branch point
develop from main
  Set up CI

// naming a branch again RESUMES it (this replaces `checkout`)
main
  merge develop tag: v1.0.0
```

- **Branch** — a bare top-level line: `name [from parent] [order: N] [color]`. The first branch (or any commit before one) is the trunk. There is **no `branch` keyword**.
- **Commit** — a bare indented line; the text is the message. There is **no `commit` keyword** (it survives only as the opt-in form for an empty commit).
- **Resume / "checkout"** — naming an existing branch again appends to it. Re-opening a branch later in the file places its commits later in time, so you can interleave (e.g. a hotfix on `main` mid-feature).

### Commit metadata

Add same-line metadata after a commit message:

```dgmo
version-control Commit Metadata

main
  Bootstrap app id: 0a1b2c3
  Ship payments tag: v1.2.0
  Roll back payments type: reverse
  Emergency patch type: highlight
```

- `id: <sha>` — show a short SHA on the commit (e.g. a real hash). Without `id:` no hash is drawn, so the source matches the picture exactly.
- `tag: <label>` — a release/ref marker, rendered as a colored pill badge.
- `type: normal | highlight | reverse` — `highlight` is a filled square (emphasis); `reverse` is a crossed dot (a backed-out commit).

### Merge and cherry-pick

`merge` and `cherry-pick` are the only required verbs; write them indented, inside the active branch:

```dgmo
version-control Merge and Cherry-Pick

main
  Init
  Add API
release/2.0 from main
  Freeze for QA
  Fix checkout bug
main
  merge release/2.0 tag: v2.0.0
  cherry-pick Fix checkout bug
```

- `merge <branch> [tag:] [id:] [type:] [squash | ff | no-ff]` — joins a branch's tip back into the active lane. `squash` collapses the source into one commit; `ff` is a fast-forward (no merge node).
- `cherry-pick <commit>` — copies a commit (referenced by message or `id:`) onto the active lane. Add `parent:` when the source is a merge commit.

## Direction

`direction-lr` (default) draws horizontal lanes with the newest commit on the right — the iconic git-graph look. `direction-tb` draws column lanes, the `git log` view.

```dgmo
version-control Top-Down
direction-tb

main
  Release
hotfix from main
  Patch CVE-2026-1 type: highlight
main
  cherry-pick Patch CVE-2026-1
  Revert bad config type: reverse
```

## HEAD, remotes, and ahead/behind

The `ref` verb drops a labeled pointer at a commit — one mechanism for remote-tracking branches, extra tags, and a detached HEAD:

```dgmo
version-control Sync With Remote

main
  Bootstrap
  Payment API
  Rate limiter
  Hotfix cap

ref origin/main at Payment API
```

- `ref <name> at <commit> [remote]` — a pointer pill. An `origin/…` name is ghosted automatically, and when a local branch `X` and an `origin/X` ref both exist the renderer labels **ahead/behind** (`↑2`) from the commit graph.
- **HEAD** auto-sits on the active branch's tip; write `ref HEAD at <commit>` for a detached HEAD, or `no-head` to hide it.

## Operations: rebase, reset, revert, squash

These draw the operations that confuse people — git's hardest concepts. Abandoned commits render faded ("ghosts").

```dgmo
version-control Rebase Feature

main
  Init
  Add API
feature from main
  Work A
  Work B
main
  Fix bug
  Improve API
rebase feature onto main
```

- `rebase <branch> onto <target>` — replays the branch's commits onto a new base; the originals fade and dashed arrows point to the solid copies.
- `reset <branch> to <commit>` — moves the branch pointer back; later commits fade (orphaned).
- `revert <commit>` — adds an inverse commit (crossed) with a dashed link to what it undoes.

## Step notes

`note <text>` adds a numbered callout on the current commit — handy for narrating a strategy:

```dgmo
version-control Trunk-Based

main
  Bootstrap
  note Trunk is always releasable
feature/search from main
  Add search
  note Short-lived branch, merged daily
main
  merge feature/search tag: v3.1
```

## Directives

| Directive | Effect |
| --------- | ------ |
| `direction-lr` \| `direction-tb` | Lane orientation. `direction-lr` (default) is newest-right; `direction-tb` is the git-log column view. |
| `no-labels` | Hide commit messages. |
| `no-lanes` | Hide the branch lane lines. |
| `no-head` | Hide the auto HEAD marker. |

## When to use

- **`version-control`** — branch/merge topology: how work flows across branches, splitting into parallel tracks that later rejoin.
- **[`timeline`](chart-timeline.md)** — the events run in one line and the real dates between them matter. `version-control` is topology, not a calendar.
- **[`gantt`](chart-gantt.md)** — real durations and dependencies on a schedule.
- **[`flowchart`](chart-flowchart.md)** — the rules a person follows, not an actual commit history. A flowchart cannot express parallel lanes rejoining.
- **[`sequence`](chart-sequence.md)** — parties passing messages to each other, not commits landing on branches.

## Appearance

Each branch gets its own lane color automatically, assigned in declaration order. Set one explicitly with a trailing color token on the branch line — after `from` and `order:` if present:

```dgmo
version-control Branch Colors

main
  Init
release/2.0 from main purple
  Freeze for QA
hotfix from main order: 3 red
  Patch CVE-2026-1 type: highlight
```

Commits, merge nodes, tag pills, and `ref` pointers inherit their lane's color; ghosted commits and `origin/…` refs are drawn faded against it. Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

The universal fill family (`fill-tint` / `fill-solid` / `fill-outline`) and `no-title` do not apply here — a commit graph draws dots and lanes rather than filled shapes. Use `no-labels`, `no-lanes`, and `no-head` above to subtract detail.

## Next

- **Related:** [`timeline`](chart-timeline.md) · [`gantt`](chart-gantt.md) · [`flowchart`](chart-flowchart.md) · [`sequence`](chart-sequence.md)
- **Then:** [Colors & palettes](colors.md)
