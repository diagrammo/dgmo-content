// Chart families from one source (#1956, decided 2026-11-12; placements as
// drawn in diagrammo-ecosystem-docs mockups/2026-11-12-chart-categories.md).
//
// registry.json's `families` holds family order, labels, sub-head labels and
// sub-head order. A type sits under the sub-head whose intents hold its FIRST
// intent. guide/registry.json's family groups and each chart page's `subhead`
// are projected from it, so the docs sidebars read the same list.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
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

// Slice (b): each family's colour, as a dgmo palette colour name. These are
// the hues the site docs sidebar hand-typed per family before
// (diagrammo_app_site src/components/DocsShell.astro GROUP_COLOR, whose slate-N
// tokens mirror dgmo src/palettes/slate.ts): software slate-14 green, project
// slate-9 steel cyan, business slate-15 purple, life slate-7 teal, data slate-12
// orange, freeform slate-13 yellow.
test('each family carries its colour, a dgmo palette colour, none shared', () => {
  assert.deepEqual(
    families.map((f) => [f.id, f.color]),
    [
      ['software', 'green'],
      ['project', 'cyan'],
      ['business', 'purple'],
      ['life', 'teal'],
      ['data', 'orange'],
      ['freeform', 'yellow'],
    ],
  );
});

test('check-registry refuses a family with no colour, an unknown colour, or a shared one', () => {
  const cases = [
    ['software', undefined, /family software: color "\(none\)" is not a dgmo palette colour/],
    ['software', 'chartreuse', /family software: color "chartreuse" is not a dgmo palette colour/],
    ['project', 'green', /family project: color "green" is also software's/],
  ];
  for (const [id, color, want] of cases) {
    const dir = mkdtempSync(join(tmpdir(), 'dgmo-content-families-'));
    try {
      for (const d of ['scripts', 'examples', 'guide']) cpSync(join(ROOT, d), join(dir, d), { recursive: true });
      const doc = structuredClone(registry);
      const f = doc.families.find((x) => x.id === id);
      if (color === undefined) delete f.color;
      else f.color = color;
      writeFileSync(join(dir, 'registry.json'), JSON.stringify(doc, null, 2) + '\n');
      const r = spawnSync(process.execPath, ['scripts/check-registry.mjs'], { cwd: dir, encoding: 'utf8' });
      assert.equal(r.status, 1, `${id}=${color}: check-registry should refuse`);
      assert.match(r.stdout + r.stderr, want);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
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
    familyGroups.map((g) => ({ id: g.id, label: g.label, color: g.color, subheads: g.subheads })),
    families.map((f) => ({
      id: f.id,
      label: f.label,
      color: f.color,
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
