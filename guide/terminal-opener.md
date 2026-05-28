# Diagrammo Terminal Opener

The Diagrammo desktop app ships with a small command-line helper named `diagrammo`. It lets you open diagrams, folders, and markdown files in the desktop app straight from your terminal — handy when you're already in the shell, or when something else (your editor, a script, a `Makefile`) needs to hand a file off to Diagrammo.

The opener is installed automatically the first time you launch the app. No setup, no PATH editing — if it isn't already on your `PATH`, the installer adds it for you.

## Usage

```
diagrammo .              # open the current folder as a workspace
diagrammo foo.dgmo       # open a diagram in the desktop app
diagrammo foo.md         # open a markdown file in the desktop app
diagrammo a.dgmo b.dgmo  # open multiple files at once
diagrammo                # just launch the app
diagrammo --help         # show the built-in usage text
diagrammo --version      # print the installed version
```

Paths are resolved relative to the current working directory, so `diagrammo ./drafts/api.dgmo` works exactly like `diagrammo drafts/api.dgmo`.

## What it actually does

`diagrammo` is a thin shell script. When you run it:

1. It looks for `Diagrammo.app` in `/Applications` (and falls back to `~/Applications`).
2. If the app is installed, it hands the files off via `open -a Diagrammo.app` — the same mechanism Finder uses when you double-click a `.dgmo` file.
3. If the app **isn't** installed but you've got the standalone `dgmo` CLI available, `.dgmo` files are rendered to a share URL and opened at `online.diagrammo.app` so you can still view them in the browser. Markdown files require the desktop app.

The script is plain `/bin/sh` — open it in a pager (`less $(which diagrammo)`) any time if you're curious.

## Where it lives

When you first launch the desktop app, the installer tries (in order):

1. `/usr/local/bin/diagrammo` — written directly when that directory is writable by your user. No admin prompt; if it's not writable, the installer skips it silently.
2. `~/.local/bin/diagrammo` — used as a fallback whenever the primary path isn't writable. The installer then appends one block to your shell rc files (`~/.zshrc`, `~/.bashrc`, `~/.bash_profile` — whichever exist) so `~/.local/bin` is on your `PATH`. Open a new terminal window after first install to pick up the change.

## Headless / scripting use

The terminal opener is for hand-off to the desktop app. If you want to render diagrams **without** the app — in CI, on a server, or in a script — install the standalone [`dgmo` CLI](https://diagrammo.app/docs/) instead:

```
brew tap diagrammo/dgmo
brew install dgmo
```

Or with npm:

```
npm install -g @diagrammo/dgmo
```

`dgmo` renders directly to `.svg` / `.png` / share URLs, supports stdin input, and has no UI dependency. Full reference at [diagrammo.app/docs](https://diagrammo.app/docs/).

## Troubleshooting

**`command not found: diagrammo`** — open a new terminal window. The installer's PATH update only applies to shells started after the update. If a fresh terminal still can't find it, run `ls ~/.local/bin/diagrammo` to confirm the file exists; if it does, your `PATH` is probably set by a shell rc file the installer didn't recognize. Add this line manually to your shell config:

```
export PATH="$HOME/.local/bin:$PATH"
```

**Want to reinstall** — quit Diagrammo and relaunch. The installer runs on every fresh app version. To force a reinstall on the current version, remove the installed binary (`rm ~/.local/bin/diagrammo` or `sudo rm /usr/local/bin/diagrammo`) and relaunch.

**Using fish or another non-POSIX shell** — the installer only updates `~/.zshrc`, `~/.bashrc`, and `~/.bash_profile`. For fish, add this to `~/.config/fish/config.fish`:

```
set -gx PATH $HOME/.local/bin $PATH
```
