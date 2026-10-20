# Diagrams in Your Repo

A `.dgmo` file is plain text, so it belongs in version control next to the code it describes. This page covers the practical side of that: where the files go, how to render and check them in CI, and what a reviewer actually sees when a diagram changes in a pull request — including the parts that don't work well yet.

```dgmo
boxes-and-lines From repo to review

.dgmo Source
  -dgmo-> Render Step
  -text diff-> PR Review

Render Step
  -writes-> Committed SVG

Committed SVG
  -image diff-> PR Review
```

## Where the files live

Keep `.dgmo` files next to whatever they document. A diagram that explains the auth service belongs in the auth service's directory, not in a far-away `docs/diagrams/` folder that nobody remembers to update.

```
services/auth/
  auth.dgmo          ← the source of truth, committed
  auth.svg           ← rendered output, committed OR generated
  handler.ts
```

The `.dgmo` source is always committed. The rendered image is a judgement call:

- **Commit the image** when something outside your build has to display it — a GitHub README, a wiki, an issue comment. This is the common case, and it's the only thing that works on GitHub today (see below).
- **Generate it at build time** when the image is only consumed by a site you already build — a docs site, a static site, an internal portal. Then `.svg`/`.png` goes in `.gitignore` and nobody reviews a binary blob.

If you commit images, render them in a pre-commit hook or a CI job rather than by hand. A committed image that has silently drifted from its source is worse than no image at all.

## Rendering from the terminal

One file at a time:

```bash
dgmo services/auth/auth.dgmo -o services/auth/auth.svg
```

Output format comes from the extension you give `-o` — `.svg` produces SVG, anything else produces PNG. With no `-o` at all, you get `<input>.png` in the current directory.

**There is no glob or batch mode.** `dgmo` takes exactly one input file; a second positional argument is rejected with `Error: Unexpected argument`, and passing `'*.dgmo'` is treated as a literal filename that doesn't exist. Use a shell loop:

```bash
find . -name '*.dgmo' -print0 | while IFS= read -r -d '' f; do
  dgmo "$f" -o "${f%.dgmo}.svg"
done
```

That loop is the supported pattern for a whole repo. Batch rendering as a first-class flag doesn't exist yet.

## Rendering in CI

The same loop works in CI, with one change — add `--json`, so a broken diagram fails the job:

```bash
find . -name '*.dgmo' -print0 | while IFS= read -r -d '' f; do
  dgmo "$f" --json -o "${f%.dgmo}.svg" || exit 1
done
```

Without `--json`, `dgmo` is lenient. A diagram with an error still prints `✖ Line 3: ...`, still writes an image (showing the error) and still exits `0`. A CI loop built on that exit code passes on broken diagrams and commits the error images. With `--json`, a parse error exits `1` and writes no image. Run the recipe in `bash` — `exit 1` ends the loop and fails the job.

`--json` also prints a machine-readable result on stdout:

```bash
dgmo services/auth/auth.dgmo --json -o auth.svg
```

```json
{
  "success": true,
  "output": "/repo/auth.svg",
  "chartType": "boxes-and-lines"
}
```

On failure the same shape comes back with `"success": false`, an `"error"` string, and the offending `"line"`. The exit code is `1`. An unreadable input file also exits `1`, with or without `--json`.

### The exit code does not mean "valid"

This is the important caveat. `dgmo` renders on a best-effort basis: **a file with warnings still renders and still exits `0`, even with `--json`.** A stray line that the parser doesn't recognize produces `⚠ Line 5: Unexpected line: ...` on stderr and a successful exit. Only a parse error fails a `--json` run.

So "the render command succeeded" is a weaker guarantee than "the diagram is correct." If you want warnings to fail the build, check them explicitly.

## Validating in CI or a pre-commit hook

**There is no `dgmo check` or `dgmo validate` subcommand.** The CLI's subcommands are `share`, `types`, `diagnostics`, `install`, `mcp`, `map-search`, and the Cloud space commands `put`, `get` and `ls` — none of them is a linter. Strict validation is available only through the JavaScript API, where `validate(text)` parses without rendering and hands back every diagnostic.

Drop this script in your repo as `scripts/check-diagrams.mjs`:

```js
import { readFileSync } from 'node:fs';
import { validate, formatDgmoError } from '@diagrammo/dgmo';

const files = process.argv.slice(2);
let failed = 0;

for (const file of files) {
  const { diagnostics } = validate(readFileSync(file, 'utf-8'));
  for (const d of diagnostics) {
    console.error(`${file}: ${d.severity}: ${formatDgmoError(d)}`);
    if (d.severity === 'error') failed++;
  }
}

console.log(`Checked ${files.length} file(s), ${failed} error(s).`);
process.exit(failed > 0 ? 1 : 0);
```

Run it over everything:

```bash
node scripts/check-diagrams.mjs $(find . -name '*.dgmo')
```

It prints one line per diagnostic and exits non-zero when any of them is an error. To be stricter than the renderer, count warnings too — change the condition to `if (d.severity === 'error' || d.severity === 'warning') failed++`. That's the version worth running in a pre-commit hook, because a warning is almost always a typo you'd rather catch before it lands.

This requires `@diagrammo/dgmo` as a dev dependency:

```bash
npm install --save-dev @diagrammo/dgmo
```

A CLI equivalent of this script doesn't exist yet. If your project has no Node toolchain, the closest you can get is the `--json` render loop above, which catches errors but not warnings.

## Keep committed images stable

A committed image should change only when the source changes. Pin what the render depends on:

- **`--palette <name>` and `--theme <light|dark|transparent>`** — set them explicitly so every machine renders the same colors. `--palette` beats a `palette` line in the file. See [Colors](colors.md).
- **`--width <px>` and `--height <px>`** — set the canvas size. Most chart types ignore `--height` and derive it from the content.
- **`--now <date-time>`** — pin "now" for `clock` and `countdown` diagrams, for example `--now 2026-01-15T09:00:00Z`. Without it, those images change on every render.

The CLI also reads a diagram from stdin, which suits hooks: `cat auth.dgmo | dgmo -o auth.svg`. With no `-o`, it writes a PNG to stdout.

## Reviewing a diagram in a pull request

Here is the honest tradeoff. A `.dgmo` diff is readable — far more readable than a re-exported binary — but the reviewer is reading text, not looking at the picture.

A diff like this is genuinely reviewable:

```diff
 Gateway -auth-> AuthService
-  AuthService -lookup-> UserDB
+  AuthService -lookup-> UserCache
+  UserCache -miss-> UserDB
```

You can see a cache was introduced without rendering anything, and you can comment on that line the same way you'd comment on code. That's the real win over a binary format, and it's why the source is worth committing whether or not you commit images.

But a diff cannot show you an edge crossing something it shouldn't, a label that no longer fits, or a layout that got worse. For anything where the *picture* matters, the reviewer needs to see the picture. Three things help:

- **Commit the rendered image alongside the source.** GitHub shows before/after for changed images in the Files tab, so the reviewer gets the visual for free. This is the highest-leverage option and the reason most repos commit output.
- **Post a share link in the PR.** `dgmo share <file>` prints a URL that opens the diagram in the online editor, and copies the URL to your clipboard. In CI, add `--no-copy`. Paste the URL into the PR description and any reviewer can see the rendered result without checking the branch out.
- **Render in your docs site preview.** If the diagram lives in a docs site with a deploy preview, the fence is rendered on the preview build and the reviewer looks at the real thing.

## GitHub does not render `.dgmo`

State this plainly, because it's the first thing an engineer runs into: **GitHub renders Mermaid fences natively in Markdown; it does not render DGMO.** A `dgmo` fence in a README shows up as a code block. There is no GitHub-side integration and none is coming from your end — it's a decision only GitHub can make.

The workarounds, in order of how well they work:

1. **Commit a rendered SVG or PNG and reference it from the README.** This is what actually works today, everywhere on GitHub — READMEs, wikis, issues, PR comments. Keep the `.dgmo` source next to it so the diagram is still editable and diffable.

   ```markdown
   ![Auth flow](services/auth/auth.svg)
   ```

   Automate the render step so the image cannot drift from the source.

2. **Use a docs site with a DGMO integration.** If your documentation is published from the repo rather than read on github.com, the fence renders for real. Integrations ship for Astro, Docusaurus, Fumadocs, Nextra, and VitePress, plus a framework-agnostic remark plugin for anything else in that ecosystem. Fences stay as source in the repo and become diagrams on the published site — the best of both.

3. **Read the repo in Obsidian.** The Obsidian plugin renders `dgmo` fences live in Markdown notes, which is useful if your team already keeps engineering notes there.

4. **Share links for one-off review.** `dgmo share` covers the "just look at this real quick" case in a PR comment without committing anything. To keep a diagram in a [space](spaces.md) instead of committing an image, `dgmo put` writes it there, using the space's key in `DGMO_API_KEY`.

There is no way to get a raw `.dgmo` fence rendering on github.com itself. Anyone who tells you otherwise is describing an image that got committed.

## Next

- **Then:** [Exporting diagrams](exporting.md) · [Colors](colors.md) · [How DGMO thinks](how-dgmo-thinks.md)
