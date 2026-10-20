# Welcome to Diagrammo

Diagrammo is a diagram editor for creating charts and diagrams with a simple plain-text syntax. Write a few lines of text — get a polished, theme-aware diagram. Available as a [desktop app](https://diagrammo.app/app) and [online editor](https://online.diagrammo.app).

Learn more at **[diagrammo.app](https://diagrammo.app)**.

A `.dgmo` text file sits at the centre. Every other piece reads it, edits it, or shares it:

```dgmo
boxes-and-lines The pieces of Diagrammo
active-tag Role

tag Role as r
  Source purple
  Write blue
  Render orange
  Embed green
  Share teal

.dgmo File r: Source
  -edit-> Desktop App
  -edit-> Web Editor
  -render-> dgmo CLI
  -embed-> Docs Plugins
  -embed-> Obsidian

Desktop App r: Write
  -share-> Cloud
Web Editor r: Write
  -share-> Cloud
dgmo CLI r: Render
  -put-> Cloud
Docs Plugins r: Embed
Obsidian r: Embed
Cloud r: Share
```

## DGMO and Diagrammo

**DGMO** is the plain-text markup language you write. **Diagrammo** is the app you write it in.

Think of it like Markdown and your editor — Markdown is the syntax, and you can write it anywhere. DGMO works the same way: it's a `.dgmo` text file that describes a diagram. You can create and edit `.dgmo` files in the Diagrammo desktop app, the online editor, Obsidian (via plugin), or any text editor. The `dgmo` CLI renders them from the terminal, and the `@diagrammo/dgmo` npm package lets you render them programmatically.

The name "DGMO" is shorthand for "Diagrammo" — shorter to type, easier to use as a file extension and command name.

## Getting Started

- **Create a new file** using the file tree on the left, or press **Cmd + N**
- **Write diagram code** in the editor — the preview updates in real time
- **Export** your diagrams as PNG or SVG — see [Exporting diagrams](exporting.md) for format choice, transparent backgrounds, and palettes
- **Browse the sidebar** to explore all chart types and features

Working in a codebase? [Diagrams in your repo](diagrams-in-your-repo.md) covers committing `.dgmo` files alongside your code, rendering and checking them in CI, and reviewing diagram changes in a pull request.

Every diagram starts with the chart type on the first line, followed by your data and settings. Five lines make this chart — the source is open beneath it:

```dgmo sourceOpen
pie Doubloons by Ship

Revenge 42
Serpent 28
Phantom 18
Kraken 12
```

The same few rules draw very different pictures. A flow of money and a map of ideas:

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;align-items:center">

```dgmo
sankey Where the Gold Went

Plunder -> Captain 40
Plunder -> Crew 45
Plunder -> Ship 15
Crew -> Grog 25
Crew -> Savings 20
Ship -> Repairs 15
```

```dgmo
mindmap Plunder

tag Kind as k
  Metal orange
  Stone purple

Plunder
  Gold k: Metal
    Doubloons k: Metal
    Ingots k: Metal
  Gems k: Stone
    Rubies k: Stone
    Pearls k: Stone
```

</div>

The [chart gallery](https://diagrammo.app/gallery/) shows every chart type.

New to all of this? Two pages are worth reading before the chart-type guides:

- **[How DGMO Thinks](how-dgmo-thinks.md)** — the handful of ideas every chart type shares, including [how indentation works](how-dgmo-thinks.md#how-indentation-works)
- **[Glossary](glossary.md)** — plain-language definitions of the words the guides use: directive, metadata, tag group, alias, leaf, and the rest

And when something comes out wrong, **[Troubleshooting](troubleshooting.md)** is organised by symptom — "my numbers are wrong", "a row vanished", "the label is wrong" — rather than by error code.

### One thing to know early

**No errors does not mean the diagram is correct.** It means the file could be read. DGMO is forgiving by design — a typo usually produces a diagram rather than a complaint, so a stray space can quietly turn part of a number into part of a label and nothing will flag it.

Always look at the render: check the labels, the axis range, and the totals against what you meant to enter. [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you) walks through the specific ways this goes wrong and what to check for each, and [Troubleshooting](troubleshooting.md) lists the symptoms and their causes.

## Where to go next

These docs have two bands. The sidebar groups them the same way.

**Guide** — how to use the product:

- **Start here** — this page and [How DGMO Thinks](how-dgmo-thinks.md)
- **The app** — [Keyboard Shortcuts](keyboard-shortcuts.md), [Exporting Diagrams](exporting.md), [Terminal Opener](terminal-opener.md) and [Troubleshooting](troubleshooting.md)
- **Sharing with Diagrammo Cloud** — [Spaces](spaces.md), [Showing on the Web](showing-on-the-web.md) and [Live Links](live-links.md)
- **Publishing** — [Embedding in Your Docs](embedding-in-your-docs.md) and [Diagrams in Your Repo](diagrams-in-your-repo.md)

**Language reference** — how to write DGMO:

- **Every diagram** — [Colors & Palettes](colors.md), [Writing Dates](writing-dates.md), [DGMO in Markdown](markdown-syntax.md), the [Glossary](glossary.md) and the [Full Reference](https://diagrammo.app/reference/)
- **Chart types by category** — Software, Project, Business, Data, Life and Freeform. Each chart type has its own page.

## The Diagrammo Ecosystem

### Desktop App

A native app for Apple-silicon Macs (and Omarchy Linux) for authoring `.dgmo` files with a live preview editor, file tree, and export. Download at [diagrammo.app/app](https://diagrammo.app/app).

### Online Editor

The full Diagrammo experience in your browser at [online.diagrammo.app](https://online.diagrammo.app). Your diagrams are stored in your browser's [Origin Private File System (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) — they persist across sessions, but clearing browser data will remove them.

### CLI Tool

The `dgmo` command-line tool renders `.dgmo` files to PNG or SVG from your terminal. Install it with npm, on macOS and Linux:

```bash
npm install -g @diagrammo/dgmo-cli
```

For Homebrew or pacman, see [diagrammo.app/dev](https://diagrammo.app/dev#cli).

Or run it without installing, with npx:

```bash
npx @diagrammo/dgmo-cli diagram.dgmo
```

### JavaScript / TypeScript Library

The `@diagrammo/dgmo` npm package lets you parse and render diagrams programmatically — useful for generating diagrams in build pipelines, servers, or web apps.

```bash
npm install @diagrammo/dgmo
```

### Diagrammo Cloud

Cloud is where you share. A [space](spaces.md) holds your diagrams, you can [show a diagram on the web](showing-on-the-web.md), and a [live link](live-links.md) always draws the latest version.

### Docs Sites and Obsidian

Plugins for Astro, Docusaurus, Fumadocs, Nextra and VitePress draw `dgmo` code fences on your published docs site. The Obsidian plugin does the same inside your notes. See [Embedding in Your Docs](embedding-in-your-docs.md).
