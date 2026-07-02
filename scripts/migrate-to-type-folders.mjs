#!/usr/bin/env node
/**
 * migrate-to-type-folders.mjs — Part 3 of the registry model (DECIDED): move the
 * example corpus from family folders (examples/data/…) to per-base-type folders
 * (examples/pie/…). Family lives ONLY in registry.json now, never in the path.
 *
 * For each registry example: newPath = examples/<base>/<filename>, where <base>
 * is the entity's base type (variants) or the entity id (types). Filenames are
 * unchanged (the `-primary` qualifier is deferred — it would break filename==id
 * consumers like getExampleByChartType). Updates:
 *   • git mv every example file to its type folder
 *   • rewrite registry.json example.file fields (entities/keywords untouched)
 *
 * docs/ (non-entity fixtures + markdown) is left alone. Idempotent: files already
 * in place are skipped. Pass --dry to preview.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const DRY = process.argv.includes('--dry');

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const entityById = new Map(registry.entities.map((e) => [e.id, e]));

const git = (...args) => {
  const r = spawnSync('git', args, { cwd: CONTENT_ROOT, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git ${args.join(' ')}\n${r.stderr}`);
  return r.stdout.trim();
};

let moved = 0;
let already = 0;
for (const ex of registry.examples) {
  const ent = entityById.get(ex.entity);
  if (!ent) throw new Error(`example ${ex.id} → unknown entity ${ex.entity}`);
  const base = ent.kind === 'variant' ? ent.base : ent.id;
  const filename = ex.file.split('/').pop();
  const newFile = `examples/${base}/${filename}`;
  if (newFile === ex.file) {
    already++;
    continue;
  }
  if (DRY) {
    console.log(`${ex.file}  →  ${newFile}`);
  } else {
    await mkdir(join(CONTENT_ROOT, 'examples', base), { recursive: true }); // git mv won't create it
    git('mv', ex.file, newFile);
  }
  ex.file = newFile;
  moved++;
}

if (!DRY) {
  registry.examples.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');
}

console.log(`\n${DRY ? '[dry] ' : ''}moved ${moved} file(s), ${already} already in place`);
