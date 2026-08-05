## A live link

The diagram below is not written out anywhere in this page. Its source lives in
Diagrammo Cloud, published by its author, and what you are looking at is the
version that is current right now — not a copy taken on the day someone pasted
it in.

That is the whole point: the author keeps editing, and the docs stop going
stale.

```dgmo
https://online.diagrammo.app/d/dgm_01KYRFCJZ2BHS18XRBEAZ0Y120
```

### Put one in your own docs

Publish a diagram in Diagrammo, copy the link, and paste it on a line of its own
inside a `dgmo` fence:

````markdown
```dgmo
https://online.diagrammo.app/d/dgm_01KYRFCJZ2BHS18XRBEAZ0Y120
```
````

That is the entire setup. There is no option to switch on and no key to
configure — a `dgmo` fence holding a link is recognised as one. Once you have
the diagram's id there is a shorter spelling that does the same job:

````markdown
```dgmo
live-link dgm_01KYRFCJZ2BHS18XRBEAZ0Y120
```
````

### What happens when your site builds

Your build fetches the diagram's source once and draws it into the page as
ordinary static HTML, exactly like the hand-written diagrams elsewhere in this
showcase. A reader needs nothing at all at run time to see the picture.

The fetched source is also written to `.dgmo/references/`. Commit that folder
and later builds keep working when the network is unreachable — they fall back
to the last copy they saw and warn, instead of failing. The first build for a
given diagram is the one that genuinely needs to reach the API.

### What happens in the reader's browser

After the page loads, it asks once whether the author has changed the diagram
since your site was last built. If they have, a line appears beneath the
diagram — *"This diagram has been updated"* — linking to the current version.

That check needs your Content-Security-Policy to allow
`connect-src https://api.diagrammo.app`. Without it the diagram still renders;
it just stops noticing changes, and nothing is able to tell you so.

### When the author stops showing it

A live link belongs to whoever published it, and they can take it back. If they
press **Stop showing**, your page draws a short card in place of the diagram
saying it is no longer shared. Your build keeps working, and no reader is left
looking at a hole where a picture used to be.
