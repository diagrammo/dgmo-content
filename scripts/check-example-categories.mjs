#!/usr/bin/env node
// Guard: an example file lives in the folder named for its BASE TYPE
// (examples/pie/pie-donut.dgmo). Family is no longer in the path — it lives only
// in registry.json (Part 3 of the registry model). This replaces the old
// folder==family check; it keeps the physical layout aligned with the model.
//
// Usage: node scripts/check-example-categories.mjs [contentRoot]
// contentRoot defaults to the dir this script lives under (dgmo-content).

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'registry.json');
const examplesDir = join(root, 'examples');

if (!existsSync(registryPath) || !existsSync(examplesDir)) {
  console.error(`✗ missing ${registryPath} or ${examplesDir}`);
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const typeIds = registry.entities.filter((e) => e.kind === 'type').map((e) => e.id);

// Longest type id that `stem` is (id) or starts with (id-<variant>).
function baseType(stem) {
  let best = null;
  for (const id of typeIds) {
    if ((stem === id || stem.startsWith(`${id}-`)) && (!best || id.length > best.length)) best = id;
  }
  return best;
}

// `docs` holds prose + embed-target fixtures, not corpus examples — skip it.
const SKIP_DIRS = new Set(['docs']);
let errors = 0;
let checked = 0;

for (const dir of readdirSync(examplesDir)) {
  const abs = join(examplesDir, dir);
  if (SKIP_DIRS.has(dir) || !statSync(abs).isDirectory()) continue;
  for (const file of readdirSync(abs)) {
    if (!file.endsWith('.dgmo')) continue;
    const stem = file.slice(0, -'.dgmo'.length);
    const type = baseType(stem);
    if (!type) {
      console.error(`✗ examples/${dir}/${file} — filename matches no chart type`);
      errors++;
      continue;
    }
    checked++;
    if (type !== dir) {
      console.error(`✗ examples/${dir}/${file} — ${stem} belongs in "${type}/" (its base type), not "${dir}/"`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} example(s) in the wrong folder.`);
  process.exit(1);
}
console.log(`✓ ${checked} example(s) sit in their base-type folder.`);
