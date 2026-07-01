#!/usr/bin/env node
// Guard: an example file's directory (data/business/software/project) must match
// its chart type's canonical family — guide/registry.json `group`. This is the
// one remaining physical copy of family; this check keeps it from drifting.
//
// Usage: node scripts/check-example-categories.mjs [contentRoot]
// contentRoot defaults to the dir this script lives under (dgmo-content).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'guide', 'registry.json');
const examplesDir = join(root, 'examples');

if (!existsSync(registryPath) || !existsSync(examplesDir)) {
  console.error(`✗ missing ${registryPath} or ${examplesDir}`);
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const groupOf = new Map(); // chart id -> group
for (const p of registry.pages ?? []) {
  if (p.slug?.startsWith('chart-')) groupOf.set(p.slug.slice('chart-'.length), p.group);
}
const chartIds = [...groupOf.keys()];

// Longest chart id that `stem` is (id) or starts with (id-<variant>).
function baseType(stem) {
  let best = null;
  for (const id of chartIds) {
    if ((stem === id || stem.startsWith(`${id}-`)) && (!best || id.length > best.length)) best = id;
  }
  return best;
}

// Categorized example dirs; `docs` holds prose/embed assets, not corpus examples.
const CAT_DIRS = ['data', 'business', 'software', 'project'];
let errors = 0;
let checked = 0;

for (const dir of CAT_DIRS) {
  const abs = join(examplesDir, dir);
  if (!existsSync(abs)) continue;
  for (const file of readdirSync(abs)) {
    if (!file.endsWith('.dgmo')) continue;
    const stem = file.slice(0, -'.dgmo'.length);
    const type = baseType(stem);
    if (!type) continue; // custom-named fixture — no canonical family to check
    checked++;
    const expected = groupOf.get(type);
    if (expected && expected !== dir) {
      console.error(`✗ examples/${dir}/${file} — ${type} belongs in "${expected}" (registry group), not "${dir}"`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} example(s) in the wrong category folder.`);
  process.exit(1);
}
console.log(`✓ ${checked} example(s) match their registry category.`);
