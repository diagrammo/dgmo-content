# Showing a diagram on the web

A diagram you show on the web gets a link that anyone can open. They need no account, no app and no sign-in — and every time they open it they see your **current** version, not a picture of what it looked like the day you sent it.

That last part is the whole point. A screenshot in a document is wrong the moment you change the diagram, and nobody who is reading it can tell. A shown diagram cannot go stale: you edit it in the app, and the link everyone already has redraws.

Showing happens to a diagram in a space. A space is what holds the diagram and hands it an address, so if the diagram is still a private file on your disk the app files it into a space first and asks you before it does — see [Spaces](spaces.md).

## Showing one

1. Open the diagram.
2. Press **Share**.
3. Press **Show on the web**.

The link is copied for you. Paste it into a document, a wiki, a chat, an email — anywhere a URL works.

The diagram is drawn in the reader's own browser from the source you published, so it stays sharp at any size and on any screen. It is not an image file.

## Stopping

Press **Stop showing**, on the same Share dialog or from the diagram's row in the file list.

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

If somebody sends you a link, you can **Watch** the diagram. It joins your Watching list and updates when they change it, so you keep their current version without asking for it again.

## Limits

Every plan caps how many diagrams you can show at once; your account page draws the figure against that ceiling. Stop showing one and the slot is free immediately.

A space's Admin can switch showing off for the whole space, in which case nobody in it can start showing anything — including the Admin. Diagrams already shown stay shown until somebody stops them one at a time, so a policy change never silently breaks a link somebody has embedded.

## Putting a shown diagram in your docs

A link is not the only thing you can do with a shown diagram. Its id can go inside a fenced block in your own markdown, and your site draws the diagram when it builds — so the page ships a picture and stays in step with your edits. See [Embedding in Your Docs](embedding-in-your-docs.md) and [Live Links](live-links.md).
