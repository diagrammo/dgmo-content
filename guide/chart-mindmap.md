```dgmo
mindmap Product Strategy

Research
  User Interviews
    Surveys description: Quarterly NPS survey
    Focus Groups
  Competitor Analysis
    Feature Matrix
    Pricing Review
Development
  MVP Features
    Auth System
      description: Handle login, signup, OAuth flows
    Dashboard
  Nice-to-haves collapsed: true
    Dark Mode
    Export PDF
Go-to-Market
  Launch Plan
    Blog Post
    Demo Video description: 2-min product walkthrough
```

## Overview

Mind maps visualize hierarchical information radiating from a central concept. Each branch represents a subtopic, with deeper nesting for finer detail. Mind maps are useful for brainstorming, project planning, knowledge organization, and breaking down complex topics.

**Interactive features:** Click nodes to navigate to their source line. Collapse and expand subtrees by clicking nodes with children. Toggle tag group coloring and depth-based coloring via the legend controls.

## Syntax

```
mindmap Title

Node
  Child Node
    Grandchild
  Another Child
```

The first line declares the chart type. The title becomes the root node. Indentation establishes the parent-child hierarchy.

## Nodes

Every non-blank, non-directive line is a node. Nesting is set by indentation:

```
mindmap Root
  Level 1a
    Level 2a
    Level 2b
  Level 1b
```

### Node Colors

Append a color name (lowercase) at the end of the label:

```
Important Topic red
  Sub-topic blue
```

### Descriptions

Nodes can have descriptions shown as secondary text. Two forms:

```
// Same-line form
Surveys description: Quarterly NPS survey

// Indented form (before children)
Auth System
  description: Handle login, signup, and OAuth flows
  Login Page
```

### Collapse Default

Set a node's default collapsed state with metadata:

```
Nice-to-haves collapsed: true
  Dark Mode
  Export PDF
```

Collapsed nodes show a drill-bar indicating hidden children. Click to expand. Because `collapsed: true` lives in the source, it's portable view-state: every renderer (app, CLI, remark-dgmo, Obsidian, code-fence embeds) reproduces the collapsed view from the `.dgmo` alone. In the app, collapsing or expanding a node writes or removes this marker in the source.

## Multi-Root

Omit the title to create multiple independent root trees:

```
mindmap

Q1 Goals
  Ship MVP
  Hire designers
Q2 Goals
  Launch marketing
  Expand team
```

The diagram title is inferred from the first root's label.

## Tag Groups

Tag groups define color-coded categories. They appear before content and follow the standard tag syntax:

```
mindmap Root

tag Priority as p
  High red
  Medium yellow
  Low green

  Task A p: High
  Task B p: Low
```

- The alias (`p`) provides a shorthand for metadata keys
- The **first declared tag group is active by default** and colors nodes by their tag value — `active-tag` is only needed to pick a different group
- Click a tag group name in the legend to activate or deactivate it

## Options

| Option | Effect |
|--------|--------|
| `active-tag GroupName` | Choose which group colors nodes (first declared is active by default; `none` suppresses coloring) |
| `color-by-depth` | Bare flag — color nodes by their depth in the tree instead of by tag (off by default) |

`color-by-depth` is persisted from the app's **Depth Colors** toggle. Add it on its own line to shade each level of the tree a different color:

```
mindmap Root
color-by-depth

Strategy
  Research
    Interviews
  Development
    MVP
```

Because it lives in the source, a shared or exported diagram keeps depth coloring on, and every renderer honors it.

With a single tag group there's nothing to set — it's active automatically. `active-tag` only matters once you declare two or more groups and want one other than the first to drive the colors. Place it on its own line before content:

```
mindmap Root

tag Priority as p
  High red
  Low green

tag Department as d
  Engineering blue
  Design purple

active-tag Department   // override the default (Priority, declared first)

  Task A p: High, d: Engineering
```

## Complete Example

```dgmo
mindmap Product Strategy blue

tag Priority as p
  High red
  Medium yellow
  Low green

tag Department as d
  Engineering blue
  Design purple
  Marketing orange

Research d: Marketing
  User Interviews p: High
    Surveys description: Quarterly NPS survey
    Focus Groups
  Competitor Analysis d: Engineering
    Feature Matrix
    Pricing Review
Development p: High, d: Engineering
  MVP Features
    Auth System
      description: Handle login, signup, OAuth flows
    Dashboard
  Nice-to-haves p: Low, collapsed: true
    Dark Mode
    Export PDF
Go-to-Market d: Marketing
  Launch Plan
    Blog Post
    Demo Video description: 2-min product walkthrough
```
