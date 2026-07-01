#!/usr/bin/env node
/**
 * bootstrap-registry.mjs — one-time generator for the canonical entity table.
 *
 * Consolidates the three sources that TODAY each own a slice of the model:
 *   1. guide/registry.json   → the TYPE rows (family + intent)          [docs surface config]
 *   2. VARIANTS (below)      → the VARIANT rows (base + produces)       [ported from console TARGET §7]
 *   3. examples/**.dgmo      → EXAMPLE rows + placements                [on-disk corpus]
 *
 * …into ONE canonical file: dgmo-content/registry.json (the `entity` table).
 * See docs/registry-entity-model.md. After bootstrap this file is HAND-CURATED
 * (edited via the console Entity Workspace) — this script only seeds it.
 *
 * Honesty rules (per project memory):
 *   - never invent DGMO syntax → `produces` is null unless verifiably known.
 *   - `keywords` seeded empty → the gaps filter flags "missing keywords".
 *   - variant entities are created even with NO example on disk (the corpus we
 *     WANT); the missing example is a gap, not a silent drop.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const GUIDE_REGISTRY = join(CONTENT_ROOT, 'guide/registry.json');
const EXAMPLES_DIR = join(CONTENT_ROOT, 'examples');
const OUT = join(CONTENT_ROOT, 'registry.json');

/* ── VARIANTS + features, ported from console catalog.ts TARGET (§7) ──────────
 * variants → variant ENTITIES (kind=variant, base=type).
 * features → extra EXAMPLES of the base type (kind stays type; example, non-primary).
 * produces → the directive/block that makes the variant; null when unverified.
 */
const VARIANTS = {
  bar: { variants: ['stacked', 'grouped', 'horizontal'], features: ['solid-fill'] },
  line: { variants: ['area', 'multi-series', 'dual-axis'] },
  pie: { variants: [{ id: 'donut', produces: 'hole' }], features: ['no-center-total'] },
  radar: { variants: ['multi-series'] },
  scatter: { variants: ['bubble'] },
  arc: { variants: ['ordered', { id: 'chord', produces: 'layout chord' }] },
  treemap: { variants: ['heat', 'tags'] },
  function: { features: ['shade'] },
  pyramid: { variants: ['inverted'] },
  cycle: { variants: ['counterclockwise'], features: ['circle-nodes'] },
  org: { variants: ['teams'] },
  'tech-radar': { variants: ['dense'] },
  map: { variants: ['choropleth', 'choropleth-diverging', 'pois', 'route', 'subnational-zoom', 'categorical'] },
  flowchart: { variants: ['decision', 'groups', 'loop', 'shapes', 'lr'] },
  sequence: { variants: ['groups', 'tags', 'protocols'] },
  c4: { variants: ['context', 'containers', 'components', 'deployment'] },
  class: { variants: ['full'] },
  er: { variants: ['labels'] },
  'boxes-and-lines': { variants: ['diverging'] },
  infra: { variants: ['full'] },
  gantt: { variants: ['critical-path', 'sprints'] },
  timeline: { variants: ['grouped'] },
  raci: { variants: ['rasci'] },
};

const norm = (v) => (typeof v === 'string' ? { id: v, produces: null } : { produces: null, ...v });

async function main() {
  const guide = JSON.parse(await readFile(GUIDE_REGISTRY, 'utf8'));
  const typePages = guide.pages.filter((p) => p.slug.startsWith('chart-'));

  const entities = [];
  const byType = new Map(); // type id → entity

  // 1) TYPE entities from guide pages.
  for (const p of typePages) {
    const id = p.slug.replace(/^chart-/, '');
    const ent = {
      id,
      kind: 'type',
      base: null,
      name: p.title,
      family: p.group,
      intent: p.intent ?? [],
      produces: null,
      keywords: [],
      guidance: null,
      description: null,
    };
    entities.push(ent);
    byType.set(id, ent);
  }

  // 2) VARIANT entities.
  const featureIds = new Set(); // "<type>-<feature>" → non-primary example of the type
  for (const [type, spec] of Object.entries(VARIANTS)) {
    const parent = byType.get(type);
    for (const raw of spec.variants ?? []) {
      const v = norm(raw);
      entities.push({
        id: `${type}-${v.id}`,
        kind: 'variant',
        base: type,
        name: humanize(v.id),
        family: parent?.family ?? null, // inherit
        intent: [], // inherit from base at read time; empty = "same as base"
        produces: v.produces,
        keywords: [],
        guidance: null,
        description: null,
      });
    }
    for (const f of spec.features ?? []) featureIds.add(`${type}-${f}`);
  }

  const entityIds = new Set(entities.map((e) => e.id));
  const typeIds = [...byType.keys()];

  // 3) EXAMPLE rows from on-disk .dgmo files.
  const files = await collectDgmo(EXAMPLES_DIR);
  const examples = [];
  const unmatched = [];
  for (const rel of files) {
    const stem = rel.split('/').pop().replace(/\.dgmo$/, '');
    const type = matchType(stem, typeIds);
    if (!type) {
      unmatched.push(rel);
      continue;
    }
    const rest = stem === type ? '' : stem.slice(type.length + 1);
    const variantId = rest ? `${type}-${rest}` : '';

    let entity;
    let isPrimary;
    if (!rest) {
      entity = type; // base file → the type's primary
      isPrimary = true;
    } else if (entityIds.has(variantId)) {
      entity = variantId; // variant file → that variant's primary
      isPrimary = true;
    } else {
      entity = type; // feature/extra file → non-primary example of the type
      isPrimary = false;
    }

    const placements = [{ surface: 'docs', role: 'docs' }];
    if (isPrimary) {
      placements.push({ surface: 'new-file', role: 'starter' });
      placements.push({ surface: 'obsidian', role: 'sampler' });
    }
    examples.push({
      id: stem,
      entity,
      file: `examples/${rel}`,
      isPrimary,
      status: 'draft',
      placements,
    });
  }

  entities.sort((a, b) => a.id.localeCompare(b.id));
  examples.sort((a, b) => a.id.localeCompare(b.id));

  const doc = {
    $schema: './registry.schema.json',
    version: 1,
    note: 'Canonical entity table. See docs/registry-entity-model.md. Hand-curated via the console Entity Workspace; bootstrapped by scripts/bootstrap-registry.mjs.',
    entities,
    examples,
  };
  await writeFile(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');

  // report
  const types = entities.filter((e) => e.kind === 'type').length;
  const variants = entities.filter((e) => e.kind === 'variant').length;
  const withEx = new Set(examples.map((e) => e.entity));
  const gapNoExample = entities.filter((e) => !withEx.has(e.id)).map((e) => e.id);
  console.log(`registry.json written: ${entities.length} entities (${types} types, ${variants} variants), ${examples.length} examples`);
  if (unmatched.length) console.log(`\n⚠ ${unmatched.length} files matched no type (skipped):\n  ${unmatched.join('\n  ')}`);
  if (gapNoExample.length) console.log(`\ngaps — entities with NO example (${gapNoExample.length}):\n  ${gapNoExample.join(', ')}`);
}

function humanize(id) {
  return id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Longest type id that `stem` equals or starts with (id-<rest>). */
function matchType(stem, ids) {
  let best = null;
  for (const id of ids) {
    if ((stem === id || stem.startsWith(`${id}-`)) && (!best || id.length > best.length)) best = id;
  }
  return best;
}

async function collectDgmo(dir, prefix = '') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...(await collectDgmo(join(dir, e.name), rel)));
    else if (e.name.endsWith('.dgmo')) out.push(rel);
  }
  return out;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
