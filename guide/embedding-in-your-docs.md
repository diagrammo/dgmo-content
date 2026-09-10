# Embedding in Your Docs

A diagram can live inside your own documentation site, drawn when the site builds. You write a fenced block in your markdown, a plugin turns it into a real diagram, and the page ships the picture. Nothing of ours runs when somebody reads it, and there is no image file to regenerate when the diagram changes.

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

## A live link

Put a live link's id in the fence instead, and the plugin fetches the diagram while your site builds:

    ```dgmo
    live-link dgm_01M4KQ7XZP2WYVR8NDHFC3BTJE
    ```

Now the source lives in one place. You edit the diagram in the app, your site rebuilds, and the page is right. Between builds the page keeps showing what it fetched last, so the picture never half-loads for a reader.

You need to be showing the diagram first — see [Showing a Diagram on the Web](showing-on-the-web.md). What the fetch commits, what happens when it fails, and how to build without a network are in [Live Links](live-links.md).

```dgmo
boxes-and-lines Two things you can put in a fence

tag Needs as n
  No account blue
  A live link orange

active-tag Needs

[The diagram's own text]
  Lines in your markdown n: No account
  Your site builds n: No account
  The page n: No account

[A live link id]
  The diagram in your space n: A live link
  Fetched while your site builds n: A live link
  The same page n: A live link

Lines in your markdown -> Your site builds
Your site builds -> The page
The diagram in your space -> Fetched while your site builds
Fetched while your site builds -> The same page
```

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

## What the reader gets

An SVG drawn into the page, not an image file. It stays sharp at any size, it takes the reader's light or dark theme, and its text is real text — selectable, searchable, and readable by a screen reader.

If you are keeping `.dgmo` files in version control alongside the code, [Diagrams in Your Repo](diagrams-in-your-repo.md) covers rendering and checking them in CI.

## Where to go next

- [Live Links](live-links.md) — what the build-time fetch commits, and what happens when it fails
- [Showing a Diagram on the Web](showing-on-the-web.md) — getting the id a live-link fence needs
- [Spaces](spaces.md) — where a diagram has to live before it can be shown
- [Exporting Diagrams](exporting.md) — when you want a file rather than a fence
