# Live Links

A live link is a diagram fence that names a diagram published to Diagrammo Cloud instead of carrying its own source. The page shows the publisher's current version, so a diagram you don't own, or one maintained somewhere else, never goes quietly out of date in your docs.

It is one line: a fenced code block tagged `dgmo`, containing the chart type `live-link` followed by the diagram's id.

<!-- Shown indented rather than as a dgmo fence: a live fence here would be rendered as a diagram by the content validator. -->

    live-link dgm_7f2a91

This is the other side of [showing a diagram on the web](showing-on-the-web.md) — somebody shows it, and your docs site embeds it by id. For diagrams whose source lives in your own repository, see [diagrams in your repo](diagrams-in-your-repo.md).

## What happens at build time

Your build fetches the diagram's source once per id, renders it exactly like a pasted diagram, and writes what it got into `.dgmo/references/` in your repository.

That directory is meant to be committed, and the reason matters. A cache in `node_modules` would make a clean CI checkout hit the network for every diagram on every build, which would turn our availability into your build's success. With the cache in your repo, the worst case is a page that is quietly a little stale, and the change shows up as a reviewable diff in a pull request.

It holds source, not rendered markup. Rendering is deterministic and your site pins its renderer version, so the source plus that pin reproduces the same bytes without hundreds of kilobytes of generated markup churning in every diff.

```dgmo
sequence What a live-link fence does at build time

Your build is an actor

[Diagrammo Cloud]
  API

Your build -reads the fence-> Reference cache
if the id is not cached, and the network is available
  Your build -fetch this diagram's source-> API
  API -the source, as it is now-> Your build
  Your build -writes it into .dgmo/references/-> Reference cache
else
  Reference cache -the source it already has-> Your build
Your build -draws the diagram into the page-> Your site
```

## When a fetch goes wrong

| Situation | Your build | The page |
| --- | --- | --- |
| It resolves | writes the cache | the current diagram |
| Network error, cache present | succeeds, warns | last known good |
| Network error, no cache | fails | — |
| No such diagram, never cached | fails | — |
| No such diagram, previously cached | succeeds, warns | last known good |
| The author stopped showing it | succeeds, warns | a short placeholder |

Two rows are deliberate. A diagram id that has never resolved fails the build, because it can only be a typo, it is yours, and it is one line away from where it was made — rendering a placeholder there would ship a broken embed and call it a warning. And once an author stops showing a diagram, the placeholder is what you get, never the cached copy: stale-but-still-published is fine, stale-after-revoked is publishing something somebody took back.

## Building without network access

If your CI runner has no egress, commit the cache from a build that does, then set:

```js
dgmo({
  liveLink: { offline: true },
})
```

The build then reads only what is in your repository and never reaches for the network.

## Turning live links off

Live links resolve by default. If you would rather your build never fetched anything:

```js
// astro.config.mjs — or the equivalent in your wrapper
dgmo({
  liveLink: { enabled: false },
})
```

With that set, a live-link fence renders a small card naming the diagram and linking through to it, and your build logs a warning naming the file and line. Your readers see the card; nothing is fetched, at build time or in their browser.

That card carries a **Show this diagram here** link. Removing the option above is what bakes the diagram into the page instead.

## The refresh check, and your CSP

A built page also carries a small client script that checks, once the page is idle, whether the diagram has moved since your last build — so a reader who arrives between builds is told the page is behind rather than shown something stale without comment. Almost always it hasn't moved, and the check costs one edge-cached request. It notices by default; it does not re-render, because re-rendering means shipping the whole renderer to your readers.

If your site sets a Content-Security-Policy it must allow `connect-src https://api.diagrammo.app`. Without it the diagram still renders — it was baked at build time — but it will never notice a change, and nothing on the page can tell you so, because the report would be blocked too. This is the one thing to get right before shipping live links.

## What is not sent

Resolving a live link is a read of one published diagram's source by id. Nothing about your site, your repository or your readers is sent — not a page URL, not a referrer you control, not an identifier of any kind. Only published diagrams are readable at all: there is no token to configure and no allowlist to maintain.

## Where to go next

- [Embedding in Your Docs](embedding-in-your-docs.md) — the two things a fence can carry, and which to pick
- [Showing a Diagram on the Web](showing-on-the-web.md) — getting the id a live-link fence needs
- [Spaces](spaces.md) — where a diagram lives before it can be shown
- [Diagrams in Your Repo](diagrams-in-your-repo.md) — keeping `.dgmo` files in version control
