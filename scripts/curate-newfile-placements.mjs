#!/usr/bin/env node
/**
 * curate-newfile-placements.mjs — decide which VARIANTS deserve a new-file tile.
 *
 * The bootstrap stamped `new-file/starter` on every variant, so the app's
 * new-file picker showed feature-demo variants ("Groups", "Protocols") as if
 * they were chart types. A variant earns a new-file tile only when it's an
 * alternate FORM a user picks by name (Donut, Stacked, Bubble) — not a demo of
 * a feature on the same chart (grouped sequence, flowchart loop). This strips
 * the `new-file` placement from the feature-demo variants below; they keep
 * their docs/obsidian placements. Types are untouched. Idempotent.
 *
 * Edit FEATURE_DEMOS and re-run to adjust; the console's placement editor is
 * the long-term home for this curation.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Feature demos — same chart, showcasing a feature. Drop from new-file.
const FEATURE_DEMOS = new Set([
  'sequence-groups', 'sequence-protocols', 'sequence-tags',
  'flowchart-decision', 'flowchart-loop', 'flowchart-groups', 'flowchart-shapes', 'flowchart-lr',
  'er-labels', 'class-full', 'infra-full', 'org-teams', 'raci-rasci',
  'gantt-critical-path', 'gantt-sprints', 'boxes-and-lines-diverging', 'arc-ordered',
  'tech-radar-dense', 'treemap-tags', 'timeline-grouped', 'cycle-counterclockwise',
  'line-multi-series', 'radar-multi-series', 'c4-context',
]);
// Everything else stays: bar-stacked/grouped/horizontal, line-area/dual-axis,
// scatter-bubble, pie-donut, arc-chord, map-*, treemap-heat, pyramid-inverted,
// c4-containers/components/deployment, map-subnational-zoom.

const HERE = dirname(fileURLToPath(import.meta.url));
const REGISTRY = join(HERE, '..', 'registry.json');
const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));

const dropped = [];
for (const ex of registry.examples) {
  if (!FEATURE_DEMOS.has(ex.entity)) continue;
  const before = (ex.placements ?? []).length;
  ex.placements = (ex.placements ?? []).filter((p) => p.surface !== 'new-file');
  if (ex.placements.length !== before) dropped.push(ex.entity);
}

registry.entities.sort((a, b) => a.id.localeCompare(b.id));
registry.examples.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const variants = registry.entities.filter((e) => e.kind === 'variant');
const tiled = variants.filter((e) => {
  const p = registry.examples.find((x) => x.entity === e.id && x.isPrimary);
  return p && (p.placements ?? []).some((pl) => pl.surface === 'new-file');
});
console.log(`stripped new-file from ${dropped.length} feature-demo variant(s).`);
console.log(`variant new-file tiles now: ${tiled.length}/${variants.length}`);
console.log(`  kept: ${tiled.map((e) => e.id).sort().join(', ')}`);
