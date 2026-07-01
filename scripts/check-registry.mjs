#!/usr/bin/env node
/**
 * check-registry.mjs — CI guard + "done is measurable" gaps report for the
 * canonical entity table (dgmo-content/registry.json).
 *
 * ERRORS (exit 1) — structural invariants the model must hold:
 *   - example.entity references an unknown entity
 *   - variant.base references an unknown type
 *   - example.file does not exist on disk
 *   - >1 primary example for one entity
 *   - duplicate entity / example id
 *
 * GAPS (exit 0, reported) — the curation to-do the console surfaces:
 *   - entity with no example, no primary, no keywords, or unapproved examples
 *
 * No external deps — hand-rolled checks (schema shape is enforced by the fields
 * this walks). Run: node scripts/check-registry.mjs [--strict]
 */
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const STRICT = process.argv.includes('--strict'); // gaps become errors

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

const doc = JSON.parse(await readFile(REGISTRY, 'utf8'));
const errors = [];
const gaps = [];

const entityById = new Map();
for (const e of doc.entities) {
  if (entityById.has(e.id)) errors.push(`duplicate entity id: ${e.id}`);
  entityById.set(e.id, e);
}

// variant.base integrity
for (const e of doc.entities) {
  if (e.kind === 'variant') {
    if (!e.base) errors.push(`variant ${e.id} has no base`);
    else if (!entityById.has(e.base)) errors.push(`variant ${e.id} base "${e.base}" is unknown`);
    else if (entityById.get(e.base).kind !== 'type') errors.push(`variant ${e.id} base "${e.base}" is not a type`);
  }
}

// examples: id uniqueness, entity ref, file exists, primary count
const seenEx = new Set();
const examplesByEntity = new Map();
for (const ex of doc.examples) {
  if (seenEx.has(ex.id)) errors.push(`duplicate example id: ${ex.id}`);
  seenEx.add(ex.id);
  if (!entityById.has(ex.entity)) errors.push(`example ${ex.id} → unknown entity "${ex.entity}"`);
  if (!(await exists(join(CONTENT_ROOT, ex.file)))) errors.push(`example ${ex.id} file missing: ${ex.file}`);
  (examplesByEntity.get(ex.entity) ?? examplesByEntity.set(ex.entity, []).get(ex.entity)).push(ex);
}
for (const [entity, exs] of examplesByEntity) {
  const primaries = exs.filter((e) => e.isPrimary).length;
  if (primaries > 1) errors.push(`entity ${entity} has ${primaries} primary examples (max 1)`);
}

// gaps
for (const e of doc.entities) {
  const exs = examplesByEntity.get(e.id) ?? [];
  if (exs.length === 0) gaps.push(`${e.id}: no example`);
  else if (!exs.some((x) => x.isPrimary)) gaps.push(`${e.id}: no primary example`);
  if (e.keywords.length === 0) gaps.push(`${e.id}: no keywords`);
  const unapproved = exs.filter((x) => x.status !== 'approved').length;
  if (exs.length && unapproved === exs.length) gaps.push(`${e.id}: no approved example`);
}

// report
if (errors.length) {
  console.error(`\n✗ ${errors.length} ERROR(S):`);
  for (const e of errors) console.error(`  - ${e}`);
}
if (gaps.length) {
  console.log(`\n○ ${gaps.length} gap(s) (curation to-do):`);
  for (const g of gaps) console.log(`  - ${g}`);
}
if (!errors.length && !gaps.length) console.log('✓ registry clean — no errors, no gaps');
else if (!errors.length) console.log(`\n✓ no structural errors · ${doc.entities.length} entities · ${doc.examples.length} examples`);

const fail = errors.length || (STRICT && gaps.length);
process.exit(fail ? 1 : 0);
