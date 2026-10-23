# Embedding in Your Docs

A diagram can live inside your own documentation site, drawn when the site builds. You write a fenced block in your markdown, a plugin turns it into a real diagram, and the page ships the picture. Nothing of ours runs when somebody reads it, and there is no image file to regenerate when the diagram changes.

```dgmo
boxes-and-lines Two fences at build time

tag Source as s
  Own text blue
  Live link orange

active-tag Source

[Own text]
  Fence with lines s: Own text
    In your repository
  Plugin draws it s: Own text
    No network
  Page A s: Own text
    SVG, old until you copy edits

[Live link]
  Fence with an id s: Live link
    Names a shown diagram
  Build fetches it s: Live link
    Copy committed to your repo
  Page B s: Live link
    SVG, current at each build

Fence with lines -> Plugin draws it
Plugin draws it -> Page A
Fence with an id -> Build fetches it
Build fetches it -> Page B
```

There are two things you can put inside that fence, and they behave differently.

## The diagram's own text

Paste the lines straight into the fence, tagged `dgmo`:

    ```dgmo
    sequence Claim path
    User -Claim chest #42-> WebApp
    WebApp -POST /claim-> TreasureAPI
    ```

The plugin draws it at build time. This needs no account and no network — the source is right there in your repository, so the build works offline and a reviewer can see what changed in a pull request diff.

The cost is that the diagram now lives in two places. Edit it in the app and your docs still hold the old lines until somebody copies them across.

## <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e0890b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> A live link

Put a live link in the fence instead, and the plugin fetches the diagram while your site builds. Get the link in the app: open the diagram, press **Share** (**⌘E**), then **Show on the web** → **Show** — or right-click the diagram in the file list and choose **Show and copy link**. The diagram's row then wears an amber globe <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#e0890b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>, and the link is on your clipboard — [Getting the link](live-links.md#getting-the-link) shows where each of these is. Paste it on a line of its own:

    ```dgmo
    https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
    ```

Once you know the id, the shorter spelling does the same job:

    ```dgmo
    live-link dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
    ```

Now the source lives in one place. You edit the diagram in the app, your site rebuilds, and the page is right. Between builds the page keeps showing what it fetched last, so the picture never half-loads for a reader.

You need to be showing the diagram first — see [Showing a Diagram on the Web](showing-on-the-web.md). What the fetch commits, what happens when it fails, and how to build without a network are in [Live Links](live-links.md). If somebody stops showing the diagram, the next build can no longer fetch it, and the page shows the fallback described there.

## Which one to use

Use the diagram's own text when the diagram belongs to the repository — an architecture note that changes in the same pull request as the code it describes. Use a live link when the diagram belongs to a person or a team and the docs site is one of several places it appears.

## The six integrations

| Where you write | Package | Getting started |
| --- | --- | --- |
| Obsidian | [Diagrammo Diagrams](https://github.com/diagrammo/obsidian-dgmo) | [set it up](https://diagrammo.app/embed/#obsidian) |
| Astro | [`astro-dgmo`](https://www.npmjs.com/package/astro-dgmo) | [set it up](https://diagrammo.app/embed/#astro) |
| Docusaurus | [`docusaurus-plugin-dgmo`](https://www.npmjs.com/package/docusaurus-plugin-dgmo) | [set it up](https://diagrammo.app/embed/#docusaurus) |
| Fumadocs | [`fumadocs-dgmo`](https://www.npmjs.com/package/fumadocs-dgmo) | [set it up](https://diagrammo.app/embed/#fumadocs) |
| Nextra | [`nextra-dgmo`](https://www.npmjs.com/package/nextra-dgmo) | [set it up](https://diagrammo.app/embed/#nextra) |
| VitePress | [`vitepress-dgmo`](https://www.npmjs.com/package/vitepress-dgmo) | [set it up](https://diagrammo.app/embed/#vitepress) |

All of them are wrappers around one core, [`remark-dgmo`](https://www.npmjs.com/package/remark-dgmo), which is what actually parses the fence and renders it. That is why they behave the same: the fence syntax, the live-link resolution and the client runtime are shared, and only the host-specific wiring differs.

Install commands, configuration and a working example for each are on the [integrations page](https://diagrammo.app/embed/).

## Options you set once

Each plugin takes the same options, set in your site's config. The ones that change what a reader sees:

| Option | What it does |
| --- | --- |
| `palette` | The colour set for every diagram. The default is `slate`. |
| `colorMode` | `auto` draws light and dark and follows the reader's theme. `light` or `dark` draws one only. |
| `background` | `auto` blends the diagram into the page. `transparent` and `opaque` force the choice. |
| `showSource`, `showCopy`, `showExpand`, `showOpenInEditor` | Buttons under each diagram. |
| `liveLink` | `{ enabled: false }` swaps live-link fences for a small card. `{ offline: true }` fails the build when a cached copy is missing. |

A single diagram can override the site palette. Put a `palette` line, such as `palette nord`, at the bottom of its fence. See the palette line in the language reference.

## What the reader gets

An SVG drawn into the page, not an image file. It stays sharp at any size, it takes the reader's light or dark theme, and its text is real text — selectable, searchable, and readable by a screen reader.

If you are keeping `.dgmo` files in version control alongside the code, [Diagrams in Your Repo](diagrams-in-your-repo.md) covers rendering and checking them in CI.

## Where to go next

- [Live Links](live-links.md) — what the build-time fetch commits, and what happens when it fails
- [Showing a Diagram on the Web](showing-on-the-web.md) — getting the id a live-link fence needs
- [Spaces](spaces.md) — where a diagram has to live before it can be shown
- [Exporting Diagrams](exporting.md) — when you want a file rather than a fence
