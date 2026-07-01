#!/usr/bin/env node
/**
 * bootstrap-keywords.mjs — collapse the AI trigger vocabulary into the canonical
 * model (docs/registry-entity-model.md: "trigger words are the same thing as
 * search aliases → one keyword field"). Seeds entity.keywords from:
 *
 *   1. dgmo-mcp/src/suggest/triggers.json  → TYPE keywords (kind: trigger)
 *   2. VARIANT_SYNONYMS (below)            → VARIANT keywords (kind: synonym)
 *
 * so new-file search, docs, and AI selection share ONE vocabulary instead of
 * three drifting lists. Idempotent + additive: existing keywords are preserved,
 * new ones merged by text (never duplicated). The Workspace refines from here.
 *
 * Honesty: variant synonyms are only real, well-known aliases — no invented terms.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const TRIGGERS = join(CONTENT_ROOT, '../dgmo-mcp/src/suggest/triggers.json');

// Real, well-known aliases for the variant tiles (the words a user would type to
// reach that specific variant). Substring search means "dough" hits "doughnut".
const VARIANT_SYNONYMS = {
  'pie-donut': ['donut', 'doughnut', 'ring chart'],
  'bar-stacked': ['stacked', 'stacked bar', 'composite bar'],
  'bar-grouped': ['grouped', 'clustered', 'grouped bar', 'clustered bar'],
  'bar-horizontal': ['horizontal', 'horizontal bar'],
  'line-area': ['area', 'area chart', 'filled line'],
  'line-multi-series': ['multi series', 'multiple lines', 'multi-line'],
  'scatter-bubble': ['bubble', 'bubble chart'],
  'radar-multi-series': ['multi series radar', 'overlaid radar'],
  'arc-ordered': ['ordered arc'],
  'pyramid-inverted': ['inverted pyramid', 'funnel pyramid'],
  'cycle-counterclockwise': ['counterclockwise', 'anticlockwise'],
  'er-labels': ['labeled relationships', 'labelled er'],
  'flowchart-lr': ['left to right', 'horizontal flowchart'],
  'gantt-critical-path': ['critical path'],
  'raci-rasci': ['rasci', 'responsible accountable'],
  'sequence-groups': ['grouped sequence', 'sequence sections'],
  'sequence-protocols': ['protocol sequence'],
  'c4-context': ['system context', 'c4 level 1'],
  'c4-containers': ['container diagram', 'c4 level 2'],
  'c4-components': ['component diagram', 'c4 level 3'],
  'c4-deployment': ['deployment diagram'],
};

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const triggers = JSON.parse(await readFile(TRIGGERS, 'utf8'));

let added = 0;
function mergeKeywords(entity, texts, kind) {
  const have = new Set(entity.keywords.map((k) => k.text.toLowerCase()));
  for (const raw of texts) {
    const text = raw.trim();
    if (!text || have.has(text.toLowerCase())) continue;
    entity.keywords.push({ text, kind });
    have.add(text.toLowerCase());
    added++;
  }
}

for (const e of registry.entities) {
  if (e.kind === 'type' && triggers[e.id]) mergeKeywords(e, triggers[e.id].phrases ?? [], 'trigger');
  if (e.kind === 'variant' && VARIANT_SYNONYMS[e.id]) mergeKeywords(e, VARIANT_SYNONYMS[e.id], 'synonym');
}

registry.entities.sort((a, b) => a.id.localeCompare(b.id));
registry.examples.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const withKw = registry.entities.filter((e) => e.keywords.length > 0).length;
console.log(`keywords merged: +${added} · ${withKw}/${registry.entities.length} entities now have keywords`);
const still = registry.entities.filter((e) => e.keywords.length === 0).map((e) => e.id);
if (still.length) console.log(`\nstill no keywords (${still.length}): ${still.join(', ')}`);
