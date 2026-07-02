#!/usr/bin/env node
/**
 * bootstrap-guidance.mjs — seed entity.guidance from the per-type authoring TIPS
 * already written for the AI tooling. Those TIPS live as
 * `<!-- TIPS start -->…<!-- TIPS end -->` pairs inside each TYPE block of
 * dgmo/docs/language-reference.md (guidance-studio edits them; the MCP server
 * slices them per type to every client). Same collapse-into-the-model idea as
 * bootstrap-keywords / bootstrap-descriptions: don't re-author what exists.
 *
 * Only fills EMPTY guidance (never overwrites a curated one). Idempotent.
 * Types with no TIPS block are left blank (a gap to fill later).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const REF = join(CONTENT_ROOT, '../dgmo/docs/language-reference.md');

const md = await readFile(REF, 'utf8');

// Alias map: `<!-- ALIAS:foo -> bar -->` style, if present. Fall back to identity.
const aliases = new Map();
for (const m of md.matchAll(/<!--\s*ALIAS:([\w-]+)\s*->\s*([\w-]+)\s*-->/g)) {
  aliases.set(m[1], m[2]);
}

// Split into TYPE blocks: a block runs from its `<!-- TYPE:id -->` marker to the
// next TYPE marker or the next H2, whichever comes first.
const typeMarker = /<!--\s*TYPE:([\w-]+)\s*-->/g;
const markers = [...md.matchAll(typeMarker)].map((m) => ({ id: m[1], start: m.index }));
const tips = new Map();
for (let i = 0; i < markers.length; i++) {
  const { id, start } = markers[i];
  const nextMarker = markers[i + 1]?.start ?? md.length;
  const h2 = md.slice(start).search(/\n## /);
  const end = h2 >= 0 ? Math.min(start + h2, nextMarker) : nextMarker;
  const block = md.slice(start, end);
  const t = block.match(/<!--\s*TIPS start\s*-->([\s\S]*?)<!--\s*TIPS end\s*-->/);
  if (!t) continue;
  const text = t[1]
    .replace(/\*\*Styling tips:\*\*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text) tips.set(id, text);
}

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
let filled = 0;
for (const e of registry.entities) {
  if (e.kind !== 'type' || e.guidance) continue;
  const t = tips.get(e.id) ?? tips.get(aliases.get(e.id));
  if (t) { e.guidance = t; filled++; }
}

registry.entities.sort((a, b) => a.id.localeCompare(b.id));
registry.examples.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const types = registry.entities.filter((e) => e.kind === 'type');
const withG = types.filter((e) => e.guidance).length;
console.log(`guidance: +${filled} · ${withG}/${types.length} types now have one`);
const missing = types.filter((e) => !e.guidance).map((e) => e.id);
if (missing.length) console.log(`still blank (${missing.length}): ${missing.join(', ')}`);
