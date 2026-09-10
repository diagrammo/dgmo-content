# Spaces

A space is a shared set of diagrams. It is where a diagram lives once it is not only yours.

You do not need one to use Diagrammo. The app opens folders on your own disk, needs no account, and nothing leaves your machine unless you decide it should. A space is the thing you add when a diagram stops being a private file — when somebody else needs to change it, or when you want to hand it an address on the web.

## What a space holds

Diagrams, and the people allowed to touch them.

Everyone in a space sees the same set. When an editor changes a diagram, everyone else has the new version the next time their app syncs — there is no sending, and no copy in somebody's downloads folder quietly disagreeing with yours.

Two people editing the same diagram at the same moment is the one case that needs a human. The app keeps both versions rather than picking, and asks you which to keep.

## The three roles

| Role | What they can do |
| --- | --- |
| **Viewer** | Reads the diagrams in the space. |
| **Editor** | Creates and changes diagrams in the space. |
| **Admin** | The person who made the space. Invites people, changes roles, removes members, deletes it. |

There is one Admin per space and it cannot be handed to somebody else. The space's own page calls this person the **owner** — same person, two words, and you will meet both. Viewers are free and unlimited on every plan; a space that many people read and one person writes never costs anything.

Four things are metered: diagrams, diagrams shown on the web, spaces, and the people who can edit. Your account page draws each against its ceiling, with the figures read from your account rather than written into the page. The plain-English version is on the [sharing page](https://diagrammo.app/sharing/).

```dgmo
boxes-and-lines Who can reach a diagram in a space

tag How as h
  Signed in, by name blue
  Anyone with the link orange

active-tag How

[Your space]
  Owner h: Signed in, by name
  Editor h: Signed in, by name
  Viewer h: Signed in, by name
  The diagrams h: Signed in, by name

Owner -invites, removes, sets roles-> Editor
Owner -invites, removes, sets roles-> Viewer
Owner -creates and changes-> The diagrams
Editor -creates and changes-> The diagrams
Viewer -reads-> The diagrams

The diagrams -one of them, shown on the web-> Any reader
Any reader h: Anyone with the link
```

## Where each part lives

Worth knowing before you go looking. Diagrams — putting them in, editing them, showing one on the web — are the app's job. **The roster is not.** Seeing who is in a space, inviting somebody, and changing or removing them all live on the web: your account page, and each space's own page. The desktop app opens those in your browser for you.

Making a space works in either place.


## Making one

In the app, open the space switcher at the top of the file list and press the **+** beside Spaces — it has no printed label, and its name to a screen reader is *New space*. On the welcome screen and on your account page the same thing is a button reading **Make a space**.

The dialog is headed **New cloud space** and asks for one thing, a name. Press **Create space** and it exists, with you as its owner. You have to be online: a space cannot be made offline.

Two spaces may share a name, though the app will point out that you already have one called that, because they are hard to tell apart later.

## Adding people

Press **Invite someone** on your account page, or use the invite form on the space's own page. Type their email address, choose whether they join as a **viewer** or an **editor**, and send it.

Admin is not something you can hand out — see the roles above.

They get an email. The link in it is a hint, not a key: membership is granted when they sign in with the address you invited, so forwarding the link to somebody else does not let that person in. If they are signed in as somebody else the app says so rather than silently doing nothing.

An invitation is good for seven days.

If the email fails to send, the invitation is still saved and the link goes to your clipboard so you can pass it on yourself. Pending invitations can be resent, copied or revoked, and they expire.

## Changing a role, or removing somebody

Both are on the space's page, in the section headed **People**, and only its owner sees them. A role is a dropdown on the person's row; removing is a **Remove** button that asks once before it acts.

Only the owner can see who is in a space. Everybody else sees the owner's address and nothing more — an editor who wants somebody added has to ask them, and a viewer who wants to edit can request it from the same page or from the banner across a read-only diagram.

### Leaving one

You can take yourself out of a space you were invited to. The owner cannot: a space cannot be handed over yet, so the only way out of one you made is to delete it.

## Your copy stays on your machine

Joining a space does not move your work into a browser tab. The app and the web editor keep a local copy of the space's diagrams on your device, so you can keep working with no connection. That copy is yours, it is plain text, and exporting it never depends on paying us.

If you are removed from a space, the app deletes that space's copy as soon as it notices — during a sync, not at some later restart. If you had that space open at the time it tells you so; if it was one of several in the background, it goes quietly. The diagrams belonged to the space, not to your disk, and everything in it is still in the Cloud for whoever is still a member.

If instead the **owner deletes the space**, your copy of the files stays on your device, and the app names who deleted it. Losing access takes the copy; ending the space does not.

A deleted space is recoverable for thirty days before it goes for good.

## Putting a private diagram into one

A file on your own disk is not in a space. Right-click it in the file list and choose **Copy to a space...** — or select several, or a whole folder, and do the same. It is a copy: the file stays on your computer too.

The first time you do this the app stops and asks, headed **Upload to &lt;space&gt;?**, and says exactly what happens: the source text and title go up and nothing else from your machine; only members of that space can see it; and you can remove it at any time, with edits syncing while it is there. It asks only the first time.

A diagram already in a space can be moved or copied to another one with **Move to...** and **Copy to another space...**. Moving keeps its links, so anyone watching it keeps watching; copying makes a new diagram with its own link and leaves the original where it was.

Two things refuse a move rather than guessing: a diagram of the same name already at the destination, and a destination space with no room left — moving into somebody else's space spends their allowance, not yours.

## Spaces and showing are different things

Being in a space and being shown on the web are two separate ways a diagram can leave your machine, and it is worth keeping them apart.

- A **space** reaches people you named, by role. They sign in; you can change their access or remove them.
- **Showing** reaches anybody holding a link. There is no sign-in in front of it and no list of who they are.

Showing happens to one diagram inside a space, one at a time — see [Showing a Diagram on the Web](showing-on-the-web.md). Nothing else in the space becomes readable when you show one.

A space's owner can switch showing off for the whole space, from the section headed **Showing on the web** on the space's page. The control reads **Diagrams here can be shown on the web**; turned off, nobody in the space can start showing anything, including the owner.

It binds new shows only. Anything already shown keeps working until somebody stops it, one at a time — so the switch itself never silently breaks a link somebody has already embedded. Turning it off lists what is currently shown and offers to stop each one, rather than leaving you to find them.

**Deleting the space is the exception, and it is worth knowing before you do it.** Every live link in a space stops opening within about five minutes of the space going, whether or not anybody stopped showing them. If those links are embedded in documentation somewhere, take them out first.

## Where to go next

- [Showing a Diagram on the Web](showing-on-the-web.md) — giving one diagram an address anyone can open
- [Embedding in Your Docs](embedding-in-your-docs.md) — putting a diagram inside your own documentation site
- [What a space costs](https://diagrammo.app/sharing/) — roles, allowances, and what a paid plan changes
