// Chart families from one source (#1956, decided 2026-11-12; placements as
// drawn in diagrammo-ecosystem-docs mockups/2026-11-12-chart-categories.md).
//
// registry.json's `families` holds family order, labels, sub-head labels and
// sub-head order. A type sits under the sub-head whose intents hold its FIRST
// intent. guide/registry.json's family groups and each chart page's `subhead`
// are projected from it, so the docs sidebars read the same list.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'));
const guide = JSON.parse(readFileSync(join(ROOT, 'guide/registry.json'), 'utf8'));
const families = registry.families ?? [];
const familyById = new Map(families.map((f) => [f.id, f]));
const types = registry.entities.filter((e) => e.kind === 'type');

const subheadLabelOf = (e) => {
  const f = familyById.get(e.family);
  return f?.subheads?.find((s) => s.intents.includes(e.intent?.[0]))?.label;
};

test('the registry lists the six families in the decided order, with labels', () => {
  assert.deepEqual(
    families.map((f) => [f.id, f.label]),
    [
      ['software', 'Software'],
      ['project', 'Project'],
      ['business', 'Business'],
      ['life', 'Life'],
      ['data', 'Data'],
      ['freeform', 'Freeform'],
    ],
  );
});

test('data and business carry their sub-heads, in order; the other families none', () => {
  const labels = (id) => (familyById.get(id)?.subheads ?? []).map((s) => s.label);
  assert.deepEqual(labels('data'), [
    'Compare values',
    'Change over time',
    'Distribution',
    'Part of a whole',
    'Flows and links',
    'Places',
  ]);
  assert.deepEqual(labels('business'), [
    'Ideas and frameworks',
    'Structures and hierarchies',
    'Processes and journeys',
  ]);
  for (const id of ['software', 'project', 'life', 'freeform']) assert.deepEqual(labels(id), [], id);
});

test('sankey, map and word cloud are data, with every variant of theirs', () => {
  for (const e of registry.entities) {
    if (['sankey', 'map', 'wordcloud'].includes(e.base ?? e.id)) assert.equal(e.family, 'data', e.id);
  }
  for (const id of ['funnel', 'venn']) assert.equal(types.find((e) => e.id === id)?.family, 'business', id);
});

test('every data and business type sits under the sub-head the mockup drew it in', () => {
  const placed = {
    bar: 'Compare values',
    slope: 'Compare values',
    radar: 'Compare values',
    'polar-area': 'Compare values',
    line: 'Change over time',
    function: 'Change over time',
    scatter: 'Distribution',
    heatmap: 'Distribution',
    wordcloud: 'Distribution',
    pie: 'Part of a whole',
    treemap: 'Part of a whole',
    sankey: 'Flows and links',
    arc: 'Flows and links',
    map: 'Places',
    swot: 'Ideas and frameworks',
    quadrant: 'Ideas and frameworks',
    venn: 'Ideas and frameworks',
    'tech-radar': 'Ideas and frameworks',
    ring: 'Ideas and frameworks',
    cycle: 'Ideas and frameworks',
    org: 'Structures and hierarchies',
    mindmap: 'Structures and hierarchies',
    pyramid: 'Structures and hierarchies',
    swimlane: 'Processes and journeys',
    'journey-map': 'Processes and journeys',
    funnel: 'Processes and journeys',
  };
  const got = Object.fromEntries(
    types.filter((e) => e.family === 'data' || e.family === 'business').map((e) => [e.id, subheadLabelOf(e)]),
  );
  assert.deepEqual(got, placed);
});

test("guide/registry.json's family groups are the registry's families", () => {
  const familyGroups = guide.groups.filter((g) => familyById.has(g.id));
  assert.deepEqual(
    familyGroups.map((g) => ({ id: g.id, label: g.label, subheads: g.subheads })),
    families.map((f) => ({
      id: f.id,
      label: f.label,
      subheads: f.subheads?.map((s) => ({ id: s.id, label: s.label })),
    })),
  );
  // The family groups stay one block, after the guide's own groups.
  const at = guide.groups.findIndex((g) => familyById.has(g.id));
  assert.deepEqual(
    guide.groups.slice(at, at + families.length).map((g) => g.id),
    families.map((f) => f.id),
  );
});

test("each chart page's group and subhead follow its registry type", () => {
  for (const e of types) {
    const page = guide.pages.find((p) => p.slug === `chart-${e.id}`);
    assert.ok(page, `chart-${e.id} has a guide page`);
    assert.equal(page.group, e.family, e.id);
    const f = familyById.get(e.family);
    const want = f?.subheads?.find((s) => s.intents.includes(e.intent?.[0]))?.id;
    assert.equal(page.subhead, want, e.id);
  }
});

test('check-registry accepts the registry and the guide projection is in sync', () => {
  for (const script of ['scripts/check-registry.mjs', 'scripts/project-guide-registry.mjs']) {
    const args = script.endsWith('project-guide-registry.mjs') ? [script, '--check'] : [script];
    const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8' });
    assert.equal(r.status, 0, `${script}: ${r.stderr}`);
  }
});
