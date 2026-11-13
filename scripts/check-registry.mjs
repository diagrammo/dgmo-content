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
 *   - `families` missing, a family id or subhead repeated, a family colour
 *     missing, not a dgmo palette colour or shared with another family, an
 *     entity whose family is not listed, a variant in another family than its base, or a
 *     type in a family with subheads whose first intent is under none of them
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

// families (#1956): the one list of family order, labels and sub-heads that
// every surface grouping chart types reads.
const families = Array.isArray(doc.families) ? doc.families : [];
if (!families.length) errors.push('registry has no `families` list');
// A family's colour is a named colour of the dgmo palettes, so each surface
// resolves it in its own palette and theme; black and white are not hues.
const FAMILY_COLORS = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'teal', 'cyan', 'gray']);
const familyById = new Map();
const colorOwner = new Map();
for (const f of families) {
  if (familyById.has(f.id)) errors.push(`duplicate family id: ${f.id}`);
  familyById.set(f.id, f);
  if (!f.label) errors.push(`family ${f.id} has no label`);
  if (!FAMILY_COLORS.has(f.color)) {
    errors.push(`family ${f.id}: color "${f.color ?? '(none)'}" is not a dgmo palette colour (${[...FAMILY_COLORS].join(', ')})`);
  } else if (colorOwner.has(f.color)) {
    errors.push(`family ${f.id}: color "${f.color}" is also ${colorOwner.get(f.color)}'s`);
  } else colorOwner.set(f.color, f.id);
  const subheadIds = new Set();
  const intentOwner = new Map();
  for (const s of f.subheads ?? []) {
    if (subheadIds.has(s.id)) errors.push(`family ${f.id}: duplicate subhead id ${s.id}`);
    subheadIds.add(s.id);
    if (!s.label) errors.push(`family ${f.id}: subhead ${s.id} has no label`);
    if (!s.intents?.length) errors.push(`family ${f.id}: subhead ${s.id} lists no intents`);
    for (const i of s.intents ?? []) {
      if (intentOwner.has(i)) errors.push(`family ${f.id}: intent "${i}" is under both ${intentOwner.get(i)} and ${s.id}`);
      intentOwner.set(i, s.id);
    }
  }
}
for (const e of doc.entities) {
  if (!familyById.has(e.family)) {
    errors.push(`${e.kind} ${e.id}: family "${e.family}" is not in \`families\``);
    continue;
  }
  if (e.kind === 'variant' && entityById.get(e.base)?.family !== e.family) {
    errors.push(`variant ${e.id}: family "${e.family}" differs from its base ${e.base}'s`);
  }
  const subheads = familyById.get(e.family).subheads;
  if (e.kind === 'type' && subheads?.length) {
    const first = e.intent?.[0];
    if (!subheads.some((s) => s.intents.includes(first))) {
      errors.push(`type ${e.id}: its first intent "${first ?? '(none)'}" is under no ${e.family} subhead`);
    }
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
