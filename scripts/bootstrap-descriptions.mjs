#!/usr/bin/env node
/**
 * bootstrap-descriptions.mjs — seed entity.description from the per-type one-line
 * descriptions already authored for the AI tooling
 * (dgmo-mcp/tools/guidance-studio/registry.json). Same collapse-into-the-model
 * idea as bootstrap-keywords: don't re-author what already exists.
 *
 * Only fills EMPTY descriptions (never overwrites a curated one). Idempotent.
 * Types with no guidance-studio entry are left blank (a gap to fill later).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const GS = join(CONTENT_ROOT, '../dgmo-mcp/tools/guidance-studio/registry.json');

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const gs = JSON.parse(await readFile(GS, 'utf8'));
const desc = new Map((gs.types ?? []).map((t) => [t.id, t.description]));

let filled = 0;
for (const e of registry.entities) {
  if (e.kind !== 'type' || e.description) continue;
  const d = desc.get(e.id);
  if (d) { e.description = d; filled++; }
}

registry.entities.sort((a, b) => a.id.localeCompare(b.id));
registry.examples.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const withDesc = registry.entities.filter((e) => e.kind === 'type' && e.description).length;
const totalTypes = registry.entities.filter((e) => e.kind === 'type').length;
console.log(`descriptions: +${filled} · ${withDesc}/${totalTypes} types now have one`);
const missing = registry.entities.filter((e) => e.kind === 'type' && !e.description).map((e) => e.id);
if (missing.length) console.log(`still blank (${missing.length}): ${missing.join(', ')}`);
