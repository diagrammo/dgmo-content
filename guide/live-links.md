# Live Links

A live link is a diagram fence that names a diagram shown on the web from the Diagrammo app instead of carrying its own source. The page shows the publisher's current version, so a diagram you don't own, or one maintained somewhere else, never goes quietly out of date in your docs.

<figure class="ll-fig" aria-labelledby="ll-anim-cap">
<style>
.ll-fig{margin:1.5rem 0;color:inherit}
.ll-fig svg{display:block;width:100%;height:auto;font-family:inherit}
.ll-fig .ll-ink{fill:none;stroke:currentColor;stroke-opacity:.45;stroke-width:1.25}
.ll-fig .ll-panel{fill:currentColor;fill-opacity:.04;stroke:currentColor;stroke-opacity:.3;stroke-width:1.25}
.ll-fig .ll-box{fill:currentColor;fill-opacity:.07;stroke:currentColor;stroke-opacity:.55;stroke-width:1.25}
.ll-fig .ll-line{fill:currentColor;fill-opacity:.14}
.ll-fig .ll-t{fill:currentColor;font-size:11px}
.ll-fig .ll-mute{fill:currentColor;fill-opacity:.6;font-size:10px}
.ll-fig .ll-head{fill:currentColor;font-size:12px;font-weight:600}
.ll-fig .ll-ico{fill:none;stroke:currentColor;stroke-opacity:.8;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ll-fig .ll-amber{stroke:#e0890b;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.ll-fig .ll-amberfill{fill:#e0890b}
.ll-fig .ll-banner{fill:#e0890b;fill-opacity:.16;stroke:#e0890b;stroke-opacity:.7}
.ll-fig .ll-new-a{animation:ll-new-a 12s infinite}
.ll-fig .ll-new-c{animation:ll-new-c 12s infinite}
.ll-fig .ll-dot1{animation:ll-dot1 12s infinite}
.ll-fig .ll-dot2{animation:ll-dot2 12s infinite}
.ll-fig .ll-v1{animation:ll-v1 12s infinite}
.ll-fig .ll-v2{animation:ll-v2 12s infinite}
.ll-fig .ll-ban{animation:ll-ban 12s infinite}
.ll-fig ol{margin:.75rem 0 0;padding-left:1.4rem;font-size:.95em}
.ll-fig li{opacity:.4;transition:none}
.ll-fig li:nth-child(1){animation:ll-s1 12s infinite}
.ll-fig li:nth-child(2){animation:ll-s2 12s infinite}
.ll-fig li:nth-child(3){animation:ll-s3 12s infinite}
.ll-fig li:nth-child(4){animation:ll-s4 12s infinite}
@keyframes ll-new-a{0%,6%{opacity:0}12%,92%{opacity:1}97%,100%{opacity:0}}
@keyframes ll-new-c{0%,74%{opacity:0}80%,92%{opacity:1}97%,100%{opacity:0}}
@keyframes ll-dot1{0%,25%{opacity:0;transform:translateX(0)}27%{opacity:1;transform:translateX(0)}37%{opacity:1;transform:translateX(118px)}39%,100%{opacity:0;transform:translateX(118px)}}
@keyframes ll-dot2{0%,65%{opacity:0;transform:translateX(0)}67%{opacity:1;transform:translateX(0)}76%{opacity:1;transform:translateX(118px)}78%,100%{opacity:0;transform:translateX(118px)}}
@keyframes ll-v1{0%,37%{opacity:1}38%,95%{opacity:0}97%,100%{opacity:1}}
@keyframes ll-v2{0%,37%{opacity:0}38%,95%{opacity:1}97%,100%{opacity:0}}
@keyframes ll-ban{0%,46%{opacity:0}49%,77%{opacity:1}80%,100%{opacity:0}}
@keyframes ll-s1{0%,24%{opacity:1}25%,100%{opacity:.4}}
@keyframes ll-s2{0%,24%{opacity:.4}25%,44%{opacity:1}45%,100%{opacity:.4}}
@keyframes ll-s3{0%,44%{opacity:.4}45%,64%{opacity:1}65%,100%{opacity:.4}}
@keyframes ll-s4{0%,64%{opacity:.4}65%,96%{opacity:1}97%,100%{opacity:.4}}
.ll-fig .ll-legend li{opacity:1;animation:none}
@media (prefers-reduced-motion:reduce){.ll-fig *{animation:none!important}.ll-fig li{opacity:1}.ll-fig .ll-new-a,.ll-fig .ll-new-c,.ll-fig .ll-v2{opacity:1}.ll-fig .ll-v1,.ll-fig .ll-ban,.ll-fig .ll-dot1,.ll-fig .ll-dot2{opacity:0}}
</style>
<svg viewBox="0 0 720 236" role="img" aria-label="A diagram edited in the Diagrammo app travels through Diagrammo Cloud to a docs site that embeds it by id.">
<text class="ll-head" x="124" y="16" text-anchor="middle">In the app — the author</text>
<text class="ll-head" x="360" y="16" text-anchor="middle">Diagrammo Cloud</text>
<text class="ll-head" x="596" y="16" text-anchor="middle">A docs site — anyone</text>
<rect class="ll-panel" x="8" y="26" width="232" height="190" rx="8"/>
<line class="ll-ink" x1="8" y1="46" x2="240" y2="46"/>
<circle class="ll-line" cx="20" cy="36" r="3.5"/><circle class="ll-line" cx="31" cy="36" r="3.5"/><circle class="ll-line" cx="42" cy="36" r="3.5"/>
<line class="ll-ink" x1="106" y1="46" x2="106" y2="216"/>
<text class="ll-mute" x="16" y="66">crew.dgmo</text>
<rect x="10" y="74" width="94" height="20" rx="4" fill="#e0890b" fill-opacity=".12"/>
<text class="ll-t" x="16" y="88">voyage.dgmo</text>
<g transform="translate(88 78) scale(.5)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g>
<text class="ll-mute" x="16" y="112">ports.dgmo</text>
<rect class="ll-box" x="116" y="78" width="48" height="26" rx="5"/><text class="ll-t" x="140" y="95" text-anchor="middle">Port</text>
<rect class="ll-box" x="182" y="78" width="48" height="26" rx="5"/><text class="ll-t" x="206" y="95" text-anchor="middle">Isle</text>
<line class="ll-ink" x1="164" y1="91" x2="182" y2="91"/>
<g class="ll-new-a"><line class="ll-ink" x1="206" y1="104" x2="206" y2="140" style="stroke:#e0890b;stroke-opacity:1"/><rect x="182" y="140" width="48" height="26" rx="5" fill="#e0890b" fill-opacity=".14" stroke="#e0890b"/><text class="ll-t" x="206" y="157" text-anchor="middle">Gold</text></g>
<text class="ll-mute" x="173" y="204" text-anchor="middle">edit, save</text>
<path class="ll-ink" d="M300 92 a26 26 0 0 1 48 -14 a22 22 0 0 1 40 8 a20 20 0 0 1 4 40 h-90 a18 18 0 0 1 -2 -34z"/>
<text class="ll-mute" x="346" y="114" text-anchor="middle">dgm_01M3…</text>
<g class="ll-v1"><text class="ll-t" x="346" y="102" text-anchor="middle">version 1</text></g>
<g class="ll-v2"><text class="ll-t" x="346" y="102" text-anchor="middle" fill="#e0890b" style="fill:#e0890b">version 2</text></g>
<text class="ll-mute" x="360" y="160" text-anchor="middle">one id, always the</text>
<text class="ll-mute" x="360" y="174" text-anchor="middle">latest version</text>
<line class="ll-ink" x1="244" y1="106" x2="290" y2="106"/>
<line class="ll-ink" x1="430" y1="106" x2="476" y2="106" stroke-dasharray="4 3"/>
<text class="ll-mute" x="453" y="98" text-anchor="middle">build</text>
<g class="ll-dot1"><circle class="ll-amberfill" cx="232" cy="106" r="5"/></g>
<g class="ll-dot2"><circle class="ll-amberfill" cx="372" cy="106" r="5"/></g>
<rect class="ll-panel" x="480" y="26" width="232" height="190" rx="8"/>
<line class="ll-ink" x1="480" y1="46" x2="712" y2="46"/>
<rect class="ll-line" x="500" y="31" width="150" height="10" rx="5"/>
<rect class="ll-line" x="494" y="56" width="180" height="6" rx="3"/>
<rect class="ll-line" x="494" y="68" width="150" height="6" rx="3"/>
<rect class="ll-box" x="520" y="84" width="50" height="26" rx="5"/><text class="ll-t" x="545" y="101" text-anchor="middle">Port</text>
<rect class="ll-box" x="590" y="84" width="50" height="26" rx="5"/><text class="ll-t" x="615" y="101" text-anchor="middle">Isle</text>
<line class="ll-ink" x1="570" y1="97" x2="590" y2="97"/>
<g class="ll-new-c"><line class="ll-ink" x1="615" y1="110" x2="615" y2="134" style="stroke:#e0890b;stroke-opacity:1"/><rect x="590" y="134" width="50" height="26" rx="5" fill="#e0890b" fill-opacity=".14" stroke="#e0890b"/><text class="ll-t" x="615" y="151" text-anchor="middle">Gold</text></g>
<g class="ll-ban"><rect class="ll-banner" x="494" y="170" width="204" height="22" rx="4"/><text class="ll-t" x="596" y="185" text-anchor="middle">This diagram has been updated</text></g>
<rect class="ll-line" x="494" y="200" width="170" height="6" rx="3"/>
</svg>
<ol id="ll-anim-cap">
<li>The author edits <code>voyage.dgmo</code>. The amber globe on its row means it is shown on the web.</li>
<li>Diagrammo Cloud now serves version 2 under the same id. Nothing anyone embedded has to change.</li>
<li>A reader on a page built earlier sees the old picture, with a line saying it has been updated.</li>
<li>The docs site's next build fetches version 2 and the page catches up.</li>
</ol>
</figure>

## The amber globe

A live link always starts in the app, on a diagram somebody shows on the web. The app marks that diagram with an **amber globe**. Amber is the app's colour for "someone outside can read this", and the globe appears nowhere else. [Getting the link](#getting-the-link) shows where it sits in the app.

## Getting the link

<figure class="ll-fig" aria-labelledby="ll-where-cap">
<svg viewBox="0 0 720 330" role="img" aria-label="The Diagrammo app window. On the left rail, the lower group of buttons holds Share and, below it, a lit amber globe. The file list shows an amber globe on a shown diagram's row. The Share dialog is open, and its Show on the web row has a Show button."><rect class="ll-panel" x="8" y="8" width="704" height="314" rx="10"/><line class="ll-ink" x1="60" y1="8" x2="60" y2="322"/><line class="ll-ink" x1="250" y1="8" x2="250" y2="322"/><rect class="ll-panel" x="18" y="20" width="32" height="96" rx="16"/><circle class="ll-line" cx="34" cy="38" r="11"/><circle class="ll-line" cx="34" cy="68" r="11"/><circle class="ll-line" cx="34" cy="98" r="11"/><rect class="ll-panel" x="18" y="186" width="32" height="124" rx="16"/><g transform="translate(26 194) scale(0.667)"><g class="ll-ico"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></g></g><circle cx="34" cy="232" r="12" fill="#e0890b" fill-opacity=".2"/><g transform="translate(26 224) scale(0.667)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g><g transform="translate(26 254) scale(0.667)"><g class="ll-ico"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/></g></g><g transform="translate(26 284) scale(0.667)"><g class="ll-ico"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></g></g><text class="ll-mute" x="72" y="34">MY SPACE</text><text class="ll-t" x="72" y="62">crew.dgmo</text><rect x="64" y="72" width="178" height="24" rx="5" fill="currentColor" fill-opacity=".09"/><text class="ll-t" x="72" y="88">voyage.dgmo</text><g transform="translate(222 78) scale(0.5)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g><text class="ll-t" x="72" y="116">ports.dgmo</text><text class="ll-t" x="72" y="140">tides.dgmo</text><rect x="300" y="36" width="390" height="236" rx="10" fill="currentColor" fill-opacity=".05" stroke="currentColor" stroke-opacity=".45" stroke-width="1.25"/><text class="ll-head" x="318" y="62">Share</text><rect x="368" y="49" width="30" height="18" rx="4" fill="none" stroke="currentColor" stroke-opacity=".4"/><text class="ll-mute" x="383" y="62" text-anchor="middle">⌘E</text><line class="ll-ink" x1="300" y1="76" x2="690" y2="76"/><text class="ll-t" x="318" y="108" font-weight="600">Picture</text><line class="ll-ink" x1="300" y1="130" x2="690" y2="130"/><text class="ll-t" x="318" y="162" font-weight="600">Snapshot link</text><line class="ll-ink" x1="300" y1="184" x2="690" y2="184"/><rect x="304" y="188" width="382" height="78" rx="6" fill="#e0890b" fill-opacity=".08"/><g transform="translate(318 203) scale(0.5)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g><text class="ll-t" x="336" y="214" font-weight="600">Show on the web</text><text class="ll-mute" x="318" y="232">A link that stays current as you edit.</text><rect x="596" y="200" width="78" height="28" rx="6" fill="#e0890b" fill-opacity=".16" stroke="#e0890b"/><g transform="translate(606 208) scale(.5)"><g class="ll-amber"><circle cx="10" cy="10" r="8"/><path d="M10 2a11.6 11.6 0 0 0 0 16 11.6 11.6 0 0 0 0-16"/><path d="M2 10h16"/><path d="M17.5 17.5h5"/><path d="M20 15v5"/></g></g><text class="ll-t" x="644" y="218" text-anchor="middle" font-weight="600">Show</text><line x1="86" y1="202" x2="50" y2="202" stroke="#e0890b" stroke-width="1.5"/><circle class="ll-amberfill" cx="86" cy="202" r="10"/><text x="86" y="206" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">1</text><line x1="86" y1="236" x2="48" y2="234" stroke="#e0890b" stroke-width="1.5"/><circle class="ll-amberfill" cx="86" cy="236" r="10"/><text x="86" y="240" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">4</text><line x1="635" y1="252" x2="635" y2="230" stroke="#e0890b" stroke-width="1.5"/><circle class="ll-amberfill" cx="635" cy="252" r="10"/><text x="635" y="256" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">2</text><line x1="236" y1="116" x2="230" y2="96" stroke="#e0890b" stroke-width="1.5"/><circle class="ll-amberfill" cx="236" cy="116" r="10"/><text x="236" y="120" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">3</text></svg>
<ol id="ll-where-cap" class="ll-legend">
<li><strong>Share</strong> — the arrow in the lower group of buttons on the left rail, or <strong>⌘E</strong> (<strong>Ctrl+E</strong> on Windows and Linux). It opens the Share dialog.</li>
<li><strong>Show</strong> — in the dialog's <strong>Show on the web</strong> row. The diagram goes on the web and its link is copied to your clipboard.</li>
<li><strong>The row's globe</strong> — from now on the diagram wears an amber globe in the file list. It only reports; hover it for the reminder. Right-clicking the row and choosing <strong>Show and copy link</strong> does steps 1 and 2 at once.</li>
<li><strong>The rail's globe</strong> — lit whenever the open diagram is shown. Press it to copy the link again.</li>
</ol>
</figure>

If the diagram is not in a [space](spaces.md) yet, the app asks before it files it into one.

To take it back, right-click the row and choose **Stop showing**. The globe goes away, and every page that embeds the diagram shows a short placeholder card in its place.

## Putting it in your docs

Paste the link on a line of its own inside a fenced code block tagged `dgmo`. This is the whole thing, backticks included, and it works unchanged in Obsidian and in every docs-site plugin below:

<!-- Shown indented rather than as a dgmo fence: a live fence here would be rendered as a diagram by the content validator. -->

    ```dgmo
    https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
    ```

Once you know the diagram's id, there is a shorter spelling that does the same job:

    ```dgmo
    live-link dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
    ```

## Every place it works

| Where | What you put there | When it picks up a change |
| --- | --- | --- |
| [Obsidian](https://diagrammo.app/embed/obsidian/) | the fence above, with the Diagrammo Diagrams community plugin | each time the note is opened |
| [Astro](https://diagrammo.app/embed/astro/) | the fence above, with `astro-dgmo` | each time the site builds |
| [Docusaurus](https://diagrammo.app/embed/docusaurus/) | the fence above, with `docusaurus-plugin-dgmo` | each time the site builds |
| [Fumadocs](https://diagrammo.app/embed/fumadocs/) | the fence above, with `fumadocs-dgmo` | each time the site builds |
| [Nextra](https://diagrammo.app/embed/nextra/) | the fence above, with `nextra-dgmo` | each time the site builds |
| [VitePress](https://diagrammo.app/embed/vitepress/) | the fence above, with `vitepress-dgmo` | each time the site builds |
| [Confluence](https://diagrammo.app/embed/confluence/) | the bare link, pasted into a page — no fence | every page view |
| [Jira](https://diagrammo.app/embed/jira/) | the bare link, pasted into an issue — no fence | every page view |
| [Notion](https://diagrammo.app/embed/notion/) | the bare link, pasted into a page, then **Embed** — no fence | every page view |

On a docs site, a reader who arrives between builds is told the page is behind; see [the refresh check](#the-refresh-check-and-your-csp). Notion is not tested yet: it embeds links through the same service Confluence uses, so we expect it to work.

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

Resolving a live link is a read of one shown diagram's source by id. Nothing about your site, your repository or your readers is sent — not a page URL, not a referrer you control, not an identifier of any kind. Only diagrams shown on the web are readable at all: there is no token to configure and no allowlist to maintain.

## Where to go next

- [Embedding in Your Docs](embedding-in-your-docs.md) — the two things a fence can carry, and which to pick
- [Showing a Diagram on the Web](showing-on-the-web.md) — getting the id a live-link fence needs
- [Spaces](spaces.md) — where a diagram lives before it can be shown
- [Diagrams in Your Repo](diagrams-in-your-repo.md) — keeping `.dgmo` files in version control
