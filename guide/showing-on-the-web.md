# Showing a diagram on the web

A diagram you show on the web gets a link that anyone can open. They need no account, no app and no sign-in — and every time they open it they see your **current** version, not a picture of what it looked like the day you sent it.

That last part is the whole point. A screenshot in a document is wrong the moment you change the diagram, and nobody who is reading it can tell. A shown diagram cannot go stale: you edit it in the app, and the link everyone already has redraws.

Showing happens to a diagram in a space. A space is what holds the diagram and hands it an address, so if the diagram is still a private file on your disk the app files it into a space first and asks you before it does — see [Spaces](spaces.md).

```dgmo
boxes-and-lines One diagram, ways to hand it over

tag Link as l
  Frozen blue
  Current orange
  Withdrawn gray

active-tag Link

[In the app]
  Your diagram l: Frozen
    Share dialog

[Snapshot link]
  Frozen copy l: Frozen
    Inside the URL, never changes

[Live link, shown]
  Current version l: Current
    Redraws after every edit

[Live link, stopped]
  A short note l: Withdrawn
    Says it is no longer shared

Your diagram -Snapshot link-> Frozen copy
Your diagram -Show on the web-> Current version
Current version -Stop showing-> A short note
```

## Three links in the Share dialog

The **Share** dialog offers up to three links. Only one of them is the web link this page is about.

| Link | What it is | Use it when |
| --- | --- | --- |
| **Snapshot link** | The whole diagram, encoded inside the URL. It is frozen, needs no account, and cannot be taken back once sent. A very large diagram does not fit, and the dialog says so. | You want to send a diagram once, and it may go stale. |
| **Live link** | The **Show on the web** section. A short link, about thirty characters, that draws your current version. | The diagram will change, or you want to take it back later. |
| **App link** | Opens the diagram in Diagrammo. It carries no diagram, so it is no use to anyone else. Marked **Only you**. | You are linking from your own notes. |

The rest of this page is about the live link. A live link works wherever a URL works, and it also draws the diagram when you paste it into Notion, Confluence or Jira. See [every place it works](live-links.md#every-place-it-works).

## <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e0890b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> Showing one

1. Open the diagram.
2. Press **Share** on the left rail, or **⌘E** (**Ctrl+E** on Windows and Linux).
3. In the **Live link** row, press **Show on the web**.

The link is copied for you, and the diagram's row in the file list gets an amber globe <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#e0890b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> — see [the amber globe](live-links.md#the-amber-globe). You can also right-click the row and choose **Show and copy link**, which does both in one step.

To copy the link again later, open the diagram and press the lit amber globe on the left rail.

Paste the link into a document, a wiki, a chat, an email — anywhere a URL works. In Obsidian or a docs site, put it in a `dgmo` fence on a line of its own:

<!-- Indented rather than fenced: a live fence here would be rendered as a diagram by the content validator. -->

    ```dgmo
    https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD
    ```

[Live Links](live-links.md#putting-it-in-your-docs) covers what that fence does at build time.

The diagram is drawn in the reader's own browser from the source you saved, so it stays sharp at any size and on any screen. It is not an image file.

## Stopping

Press **Stop showing**, on the same Share dialog or from the diagram's row in the file list. A page that embeds the diagram, or a reader who opens the link, then sees a short note that it is no longer shared. The note names nothing about the diagram.

The link stops opening within five minutes — that delay is the cache in front of it, not a change of mind you can't act on. Anyone who already has the link keeps the link; what they stop getting is the diagram.

## Who can see it

Anyone with the link, and only people with the link. A shown diagram is not listed anywhere public, and the page asks search engines not to index it, so it is not something a stranger finds by searching. It is unlisted rather than published.

Unlisted is not secret. That request is one crawlers honour rather than a lock, and a link, once sent, can be forwarded. Show a diagram you are content for anyone holding the link to read.

Nothing else in your space becomes readable. Showing is per diagram, one at a time.

## What you can find out afterwards

Your account page lists everything you are showing, and each space's page lists its own. Each row can tell you:

- **how many times it has been opened** in the last 30 days, always written as "at least", because a reader who declines the counting prompt sends nothing and the figure can only ever be a floor
- **which sites it has been opened from** — the site's name only, never the page, and never anything about the reader
- **how many people are watching it**, if enough people are

## Watching somebody else's

If somebody sends you a link, you can **Watch** the diagram. You do not need to be a member of their space. It joins your Watching list and updates when they change it, so you keep their current version without asking for it again.

## Limits

Every plan caps how many diagrams you can show at once; your account page draws the figure against that ceiling. If you hit the cap, the app tells you to stop showing one to free a slot. Stop showing one and the slot is free immediately.

A space's Admin can switch showing off for the whole space, in which case nobody in it can start showing anything — including the Admin. Diagrams already shown stay shown until somebody stops them one at a time, so a policy change never silently breaks a link somebody has embedded.

## Putting a shown diagram in your docs

A link is not the only thing you can do with a shown diagram. Its id can go inside a fenced block in your own markdown, and your site draws the diagram when it builds — so the page ships a picture and stays in step with your edits. See [Embedding in Your Docs](embedding-in-your-docs.md) and [Live Links](live-links.md).

## Where to go next

- [Spaces](spaces.md) — who is in a space, and the switch that blocks showing for all of it
- [Embedding in Your Docs](embedding-in-your-docs.md) — putting a shown diagram inside your own site
- [Live Links](live-links.md) — what a build does with the id, and what it commits
- [Exporting Diagrams](exporting.md) — a file instead of a link
