# Welcome to Diagrammo

Diagrammo is a diagram editor for creating charts and diagrams with a simple plain-text syntax. Write a few lines of text — get a polished, theme-aware diagram. Available as a [desktop app](https://diagrammo.app/app) and [online editor](https://online.diagrammo.app).

Learn more at **[diagrammo.app](https://diagrammo.app)**.

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

Every diagram starts with the chart type on the first line, followed by your data and settings. For example:

```
bar Q1 Sales

Jan 42
Feb 58
Mar 71
```

New to all of this? Two pages are worth reading before the chart-type guides:

- **[How DGMO Thinks](how-dgmo-thinks.md)** — the handful of ideas every chart type shares, including [how indentation works](how-dgmo-thinks.md#how-indentation-works)
- **[Glossary](glossary.md)** — plain-language definitions of the words the guides use: directive, metadata, tag group, alias, leaf, and the rest

And when something comes out wrong, **[Troubleshooting](troubleshooting.md)** is organised by symptom — "my numbers are wrong", "a row vanished", "the label is wrong" — rather than by error code.

### One thing to know early

**No errors does not mean the diagram is correct.** It means the file could be read. DGMO is forgiving by design — a typo usually produces a diagram rather than a complaint, so a stray space can quietly turn part of a number into part of a label and nothing will flag it.

Always look at the render: check the labels, the axis range, and the totals against what you meant to enter. [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you) walks through the specific ways this goes wrong and what to check for each, and [Troubleshooting](troubleshooting.md) lists the symptoms and their causes.

## The Diagrammo Ecosystem

### Desktop App

A native Mac app for authoring `.dgmo` files with a live preview editor, file tree, and export. Download at [diagrammo.app/app](https://diagrammo.app/app).

### Online Editor

The full Diagrammo experience in your browser at [online.diagrammo.app](https://online.diagrammo.app). Your diagrams are stored in your browser's [Origin Private File System (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) — they persist across sessions, but clearing browser data will remove them.

### CLI Tool

The `dgmo` command-line tool renders `.dgmo` files to PNG or SVG from your terminal. Install it via Homebrew:

```bash
brew tap diagrammo/dgmo
brew install dgmo
```

Or run directly with npx:

```bash
npx @diagrammo/dgmo diagram.dgmo
```

### JavaScript / TypeScript Library

The `@diagrammo/dgmo` npm package lets you parse and render diagrams programmatically — useful for generating diagrams in build pipelines, servers, or web apps.

```bash
npm install @diagrammo/dgmo
```
