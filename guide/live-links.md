# Live Links

A live link is a diagram fence that names a diagram published to Diagrammo Cloud instead of carrying its own source. The page shows the publisher's current version, so a diagram you don't own, or one maintained somewhere else, never goes quietly out of date in your docs.

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

A live link always starts in the app, on a diagram somebody shows on the web. The app marks that diagram with an **amber globe**. Amber is the app's colour for "someone outside can read this", and the globe appears nowhere else.

<figure class="ll-fig" aria-labelledby="ll-globe-cap">
<svg viewBox="0 0 720 250" role="img" aria-label="The Diagrammo app window. An amber globe sits at the end of a shown file's row in the file list, and a lit amber globe sits in the rail on the far left.">
<rect class="ll-panel" x="8" y="8" width="704" height="234" rx="10"/>
<line class="ll-ink" x1="60" y1="8" x2="60" y2="242"/>
<line class="ll-ink" x1="280" y1="8" x2="280" y2="242"/>
<circle class="ll-line" cx="34" cy="36" r="12"/>
<circle class="ll-line" cx="34" cy="66" r="12"/>
<circle class="ll-line" cx="34" cy="96" r="12"/>
<rect class="ll-panel" x="18" y="140" width="32" height="92" rx="16"/>
<circle class="ll-line" cx="34" cy="158" r="12"/>
<circle cx="34" cy="188" r="12" fill="#e0890b" fill-opacity=".2"/>
<g transform="translate(26 180) scale(.667)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g>
<circle class="ll-line" cx="34" cy="216" r="12"/>
<text class="ll-mute" x="76" y="34">MY SPACE</text>
<text class="ll-t" x="76" y="62">crew.dgmo</text>
<rect x="66" y="72" width="206" height="24" rx="5" fill="currentColor" fill-opacity=".09"/>
<text class="ll-t" x="76" y="88">voyage.dgmo</text>
<g transform="translate(250 78) scale(.5)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g>
<text class="ll-t" x="76" y="116">ports.dgmo</text>
<g transform="translate(250 106) scale(.5)"><g class="ll-amber"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></g></g>
<text class="ll-t" x="76" y="140">tides.dgmo</text>
<rect class="ll-box" x="380" y="80" width="80" height="34" rx="6"/><text class="ll-t" x="420" y="101" text-anchor="middle">Port</text>
<rect class="ll-box" x="520" y="80" width="80" height="34" rx="6"/><text class="ll-t" x="560" y="101" text-anchor="middle">Isle</text>
<rect class="ll-box" x="520" y="160" width="80" height="34" rx="6"/><text class="ll-t" x="560" y="181" text-anchor="middle">Gold</text>
<line class="ll-ink" x1="460" y1="97" x2="520" y2="97"/>
<line class="ll-ink" x1="560" y1="114" x2="560" y2="160"/>
<circle class="ll-amberfill" cx="258" cy="56" r="10"/><text x="258" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">1</text>
<line x1="258" y1="66" x2="258" y2="76" stroke="#e0890b" stroke-width="1.5"/>
<circle class="ll-amberfill" cx="80" cy="188" r="10"/><text x="80" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">2</text>
<line x1="70" y1="188" x2="48" y2="188" stroke="#e0890b" stroke-width="1.5"/>
</svg>
<ol id="ll-globe-cap" class="ll-legend">
<li><strong>On the file's row</strong> — this diagram is shown on the web, and anyone with its link can read it. The row's globe only reports; hover it for the reminder.</li>
<li><strong>On the rail</strong> — lit whenever the open diagram is shown. Press it to copy the diagram's link.</li>
</ol>
</figure>

## Getting the link

1. In the file list, right-click the diagram and choose **Show and copy link**. If the diagram is not in a [space](spaces.md) yet, the app asks before it files it into one.
2. The amber globe appears on the diagram's row, and the link is on your clipboard.
3. To copy it again later, open the diagram and press the globe on the rail.

To take it back, right-click the row and choose **Stop showing**. The globe goes away, and every page that embeds the diagram shows a short placeholder card in its place.

## Putting it in your docs

Paste the link on a line of its own inside a fenced code block tagged `dgmo`:

<!-- Shown indented rather than as a dgmo fence: a live fence here would be rendered as a diagram by the content validator. -->

    https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD

Once you know the diagram's id, there is a shorter spelling that does the same job:

    live-link dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD

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
