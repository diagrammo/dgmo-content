#!/usr/bin/env node
// Validate every embedded ```dgmo fence and every standalone `.dgmo` file under
// the given paths, failing (exit 1) on any ERROR-severity diagnostic — parse OR
// resolve (e.g. an unknown region name like "Hispaniola"). Warnings are allowed.
//
// This single script is shared by both consumers of dgmo-content: the desktop
// app mounts it at `packages/content/scripts/` (symlink) and the marketing site
// at `content/scripts/` (submodule). Each build invokes it with the paths IT
// ships, so neither can publish a broken diagram. It has no dependencies of its
// own beyond `@diagrammo/dgmo`, which resolves from the invoking repo.
//
//   node validate-dgmo.mjs <path>...
//
// `render()` is the one call that surfaces both parser and resolver diagnostics;
// in Node it loads the map data assets from disk, so map fences validate too.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

// Resolve `@diagrammo/dgmo` from the INVOKING repo's node_modules (cwd), not from
// this script's physical location — it's mounted via a symlink (app) or submodule
// (site), and Node realpaths the entry, which would otherwise break resolution.
const requireFromCwd = createRequire(join(process.cwd(), 'noop.js'));
const { render, validate } = await import(
  pathToFileURL(requireFromCwd.resolve('@diagrammo/dgmo'))
);

// A fence whose body is a CLOUD REFERENCE (`cloud <id>`, `![[cloud:<id>]]`, or a
// share URL) names a diagram that lives in Diagrammo Cloud — there is no source
// here to validate, and `render()` would reject `cloud` as an unknown chart
// type. The build resolves and renders it for real (remark-dgmo fetches the
// source, and fails the build loudly if the reference is bad), so skipping it
// here loses no coverage; NOT skipping it makes every referencing document
// unbuildable. Optional import: an older `@diagrammo/dgmo` has no such subpath,
// and this script must keep working against it.
let parseCloudReference = () => null;
try {
  ({ parseCloudReference } = await import(
    pathToFileURL(requireFromCwd.resolve('@diagrammo/dgmo/cloud-reference'))
  ));
} catch {
  // Pre-0.57 dgmo — no references to skip.
}

// `render()` reads nothing from disk or the network on its own, so a `map`
// chart obtains its basemap ONLY from the `mapData` option. Without it every
// map in the corpus fails with `E_MAP_DATA_NOT_SUPPLIED` — which is what broke
// `pnpm build:web` on 2026-08-05, since this validator sits between the dgmo
// build and `vite build`.
//
// `loadMapData` is the loader meant for exactly this caller: Node, allowed to
// touch the filesystem, and invoked only when the content really is a map, so
// the other 363 diagrams in the corpus pay nothing for it.
//
// Optional, matching the import above: an older `@diagrammo/dgmo` has no such
// export and did not need one, and this script must keep working against it.
let loadMapData;
try {
  ({ loadMapData } = await import(
    pathToFileURL(requireFromCwd.resolve('@diagrammo/dgmo/advanced'))
  ));
} catch {
  // No `advanced` subpath, or no loader in it — maps were self-loading then.
}
const renderOptions = loadMapData ? { mapData: loadMapData } : undefined;

// Quiet jsdom's "Not implemented: HTMLCanvasElement getContext()" noise — it's a
// headless-environment limitation (some chart types draw to a canvas for layout),
// not a dgmo problem. We handle those types via the parse-only fallback below.
const realError = console.error.bind(console);
console.error = (...a) =>
  /Not implemented: HTMLCanvasElement/.test(String(a[0])) ? undefined : realError(...a);

const roots = process.argv.slice(2);
if (roots.length === 0) {
  console.error('usage: validate-dgmo.mjs <path>...');
  process.exit(2);
}

const FENCE_EXTS = new Set(['.md', '.mdx', '.astro']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', 'coverage']);

/** Yield every file path under `p` (recursively), skipping noise dirs. */
async function* walk(p) {
  let s;
  try {
    s = await stat(p);
  } catch {
    return; // a passed path that doesn't exist is silently skipped
  }
  if (s.isDirectory()) {
    for (const name of (await readdir(p)).sort()) {
      if (SKIP_DIRS.has(name)) continue;
      yield* walk(join(p, name));
    }
  } else if (s.isFile()) {
    yield p;
  }
}

/** Extract ```dgmo fences from markdown/MDX/Astro, with the 1-based line of the
 *  fence's first code line so diagnostics point at the real source location. */
function extractFences(text) {
  const out = [];
  // Match ONLY the exact `dgmo` language token — NOT `dgmo-source` (illustrative
  // snippets the renderers show as plain code, never render). Mirrors what the
  // app docs viewer + remark-dgmo actually turn into diagrams.
  const re = /```dgmo(?![\w-])[^\n]*\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const before = text.slice(0, m.index);
    const openLine = before.split('\n').length; // line of ```dgmo
    // Skip fences flagged as intentionally-invalid demos: a
    // `<!-- dgmo-expect-error -->` marker in the markdown just before the fence.
    // These render as real diagrams (to show the error UI) but must not fail the
    // build's strict validation. The marker is renderer-invisible (an HTML
    // comment), unlike a `dgmo-source` lang token which would stop it rendering.
    if (/<!--\s*dgmo-expect-error\s*-->/.test(before.slice(-200))) continue;
    // A cloud reference has no local source to check — see the import above.
    if (parseCloudReference(m[1])) continue;
    out.push({ code: m[1], baseLine: openLine + 1 });
  }
  return out;
}

// ── Collect every dgmo source under the given roots ──
const sources = []; // { file, baseLine, code }
for (const root of roots) {
  for await (const file of walk(root)) {
    const ext = extname(file);
    if (ext === '.dgmo') {
      sources.push({ file, baseLine: 1, code: await readFile(file, 'utf8') });
    } else if (FENCE_EXTS.has(ext)) {
      const text = await readFile(file, 'utf8');
      for (const f of extractFences(text)) {
        sources.push({ file, baseLine: f.baseLine, code: f.code });
      }
    }
  }
}

// ── Validate each ──
let errors = 0;
for (const { file, baseLine, code } of sources) {
  const rel = relative(process.cwd(), file);
  let diagnostics;
  try {
    ({ diagnostics } = await render(code, renderOptions));
  } catch {
    // Some chart types (e.g. wordcloud) need a real canvas to lay out and throw
    // under headless jsdom — they render fine in the app/site browser. Degrade to
    // a parse-only check so syntax errors are still caught for those types.
    diagnostics = validate(code).diagnostics;
  }
  for (const d of diagnostics) {
    if (d.severity !== 'error') continue;
    // d.line is 1-based within the snippet; map it back to the file.
    const line = baseLine + (d.line ? d.line - 1 : 0);
    console.error(`✗ ${rel}:${line} — [${d.code ?? 'error'}] ${d.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} dgmo error(s) across ${sources.length} diagram(s).`);
  process.exit(1);
}
console.log(`✓ ${sources.length} dgmo diagram(s) valid.`);
