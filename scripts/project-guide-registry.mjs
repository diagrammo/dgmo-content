#!/usr/bin/env node
/**
 * project-guide-registry.mjs — derive guide/registry.json's chart pages FROM the
 * canonical registry.json (open question #1, DECIDED: the guide page list is a
 * projection of the model, not a second source of truth).
 *
 * The guide file owns two things that are NOT in the model and are preserved
 * verbatim: `groups` and the getting-started (non chart-*) pages. Every chart-*
 * page is regenerated from the registry's TYPE entities:
 *     { slug: `chart-${id}`, title: name, group: family, intent, file: `chart-${id}.md` }
 *
 * Order-preserving: existing chart pages keep their curated position; new types
 * are appended after the last chart page. Idempotent — running on an in-sync
 * pair rewrites byte-identical output.
 *
 * Modes:
 *   (default)  rewrite guide/registry.json from registry.json
 *   --check    exit 1 if guide/registry.json differs from the projection (CI)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const GUIDE = join(CONTENT_ROOT, 'guide/registry.json');
const CHECK = process.argv.includes('--check');

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const guide = JSON.parse(await readFile(GUIDE, 'utf8'));

// TYPE entities → chart pages, keyed by slug.
const chartPages = new Map(
  registry.entities
    .filter((e) => e.kind === 'type')
    .map((e) => {
      const slug = `chart-${e.id}`;
      // field order matches the hand-authored file: slug, title, group, intent?, file
      const page = { slug, title: e.name, group: e.family };
      if (e.intent?.length) page.intent = e.intent;
      page.file = `${slug}.md`;
      return [slug, page];
    }),
);

const existing = guide.pages ?? [];
const nonChart = existing.filter((p) => !p.slug.startsWith('chart-'));
const existingChartOrder = existing.filter((p) => p.slug.startsWith('chart-')).map((p) => p.slug);

// order: existing chart slugs in their current order, then any new slugs appended
const orderedSlugs = [
  ...existingChartOrder.filter((s) => chartPages.has(s)),
  ...[...chartPages.keys()].filter((s) => !existingChartOrder.includes(s)),
];
const projectedChart = orderedSlugs.map((s) => chartPages.get(s));

// guide/registry.json is now a GENERATED artifact — the generator owns its
// format (canonical 2-space JSON). Consumers (app, site submodule) parse JSON
// and are format-agnostic; the one-time reformat is expected.
const out = { groups: guide.groups, pages: [...nonChart, ...projectedChart] };
const text = JSON.stringify(out, null, 2) + '\n';
const current = await readFile(GUIDE, 'utf8');

const dropped = existingChartOrder.filter((s) => !chartPages.has(s));
const added = [...chartPages.keys()].filter((s) => !existingChartOrder.includes(s));

// Docs coverage: every projected chart page must have its markdown on disk, so a
// new registry type can't ship a nav entry that 404s.
const missingDocs = projectedChart.filter((p) => !existsSync(join(CONTENT_ROOT, 'guide', p.file))).map((p) => p.file);

if (CHECK) {
  if (text === current && missingDocs.length === 0) {
    console.log('✓ guide/registry.json in sync with registry.json');
    process.exit(0);
  }
  if (missingDocs.length) console.error(`✗ guide pages missing markdown on disk: ${missingDocs.join(', ')}`);
  if (text === current) process.exit(1);
  console.error('✗ guide/registry.json is STALE — run: node scripts/project-guide-registry.mjs');
  if (dropped.length) console.error(`  chart pages no longer in registry: ${dropped.join(', ')}`);
  if (added.length) console.error(`  registry types missing a guide page: ${added.join(', ')}`);
  process.exit(1);
}

await writeFile(GUIDE, text, 'utf8');
console.log(`guide/registry.json projected: ${projectedChart.length} chart pages, ${nonChart.length} doc pages`);
if (dropped.length) console.log(`  dropped (stale): ${dropped.join(', ')}`);
if (added.length) console.log(`  added (new type): ${added.join(', ')}`);
if (missingDocs.length) console.log(`  ⚠ guide pages missing markdown: ${missingDocs.join(', ')}`);
if (text === current) console.log('  (no change — already in sync)');
