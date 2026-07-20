#!/usr/bin/env node
/**
 * check-guide-crossrefs.mjs — guide-to-guide links must be reciprocal, and
 * must point at a file that exists.
 *
 * The 2026-07-18 persona docs audit found every cross-reference in the corpus
 * was one-directional: `event-line` sent readers to `timeline` and `timeline`
 * never mentioned `event-line`; `family` sent readers to `org` and `org` never
 * warned it is single-parent; `block` and `sketch` both pointed at
 * `boxes-and-lines`, which pointed at neither.
 *
 * One-way links are how a reader gets stranded: they arrive at the wrong chart
 * from a search, and the page has no idea the neighbour exists. Reciprocity is
 * what makes a wrong first pick recoverable, and it is exactly the property
 * that silently rots when guides are edited one at a time.
 *
 * Only links inside a `## When to use` (or `## When not to use`) section count
 * as an ejection. A passing mention elsewhere in the prose does not create an
 * obligation — that would make the guard unusable.
 *
 * Usage:  node scripts/check-guide-crossrefs.mjs [--verbose]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = join(HERE, '..', 'guide');
const VERBOSE = process.argv.includes('--verbose');

const SECTION_RE = /^##\s+When\s+(not\s+)?to\s+use\b/i;
const ANY_H2_RE = /^##\s+/;

/** Chart guides that link out from their When-to-use section. */
function ejectionsFrom(md) {
  const out = new Set();
  let inSection = false;
  let inFence = false;

  for (const line of md.split('\n')) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (ANY_H2_RE.test(line)) inSection = SECTION_RE.test(line);
    if (!inSection) continue;

    for (const m of line.matchAll(/\]\((?:\.\/)?chart-([a-z0-9-]+)\.md\)/g)) {
      out.add(m[1]);
    }
  }
  return out;
}

const files = readdirSync(GUIDE_DIR)
  .filter((f) => f.startsWith('chart-') && f.endsWith('.md'))
  .sort();

const graph = new Map();
for (const f of files) {
  const type = f.replace(/^chart-/, '').replace(/\.md$/, '');
  graph.set(type, ejectionsFrom(readFileSync(join(GUIDE_DIR, f), 'utf8')));
}

const broken = [];
const oneWay = [];
const selfRef = [];

for (const [type, targets] of graph) {
  for (const target of targets) {
    if (target === type) {
      selfRef.push(type);
      continue;
    }
    if (!existsSync(join(GUIDE_DIR, `chart-${target}.md`))) {
      broken.push({ from: type, to: target });
      continue;
    }
    if (!graph.get(target)?.has(type)) {
      oneWay.push({ from: type, to: target });
    }
  }
}

const linkCount = [...graph.values()].reduce((n, s) => n + s.size, 0);
const isolated = [...graph.entries()].filter(([, s]) => s.size === 0).map(([t]) => t);

console.log(
  `\nchecked ${linkCount} ejection link(s) across ${files.length} guides`,
);

if (VERBOSE) {
  for (const [type, targets] of graph) {
    console.log(`  ${type} → ${[...targets].join(', ') || '(none)'}`);
  }
}

let failed = false;

if (broken.length) {
  failed = true;
  console.log(`\n✗ ${broken.length} link(s) to a guide that does not exist:`);
  for (const b of broken) console.log(`    chart-${b.from}.md → chart-${b.to}.md (missing)`);
}

if (selfRef.length) {
  failed = true;
  console.log(`\n✗ ${selfRef.length} guide(s) link to themselves:`);
  for (const t of selfRef) console.log(`    chart-${t}.md`);
}

if (oneWay.length) {
  failed = true;
  console.log(`\n✗ ${oneWay.length} one-directional ejection(s):`);
  for (const o of oneWay) {
    console.log(
      `    chart-${o.from}.md ejects to \`${o.to}\`, but chart-${o.to}.md never mentions \`${o.from}\``,
    );
  }
  console.log(
    '\n  A reader who lands on the wrong chart from the other direction has no way back.',
  );
  console.log('  Add the reciprocal line to the target\'s "When to use" section.');
}

if (isolated.length) {
  // Not a failure on its own — a genuinely unmistakable type may have no
  // neighbour — but the audit found no such type, so it is worth surfacing.
  console.log(
    `\n⚠ ${isolated.length} guide(s) with no ejection links at all: ${isolated.join(', ')}`,
  );
  console.log('  Every type in CONFUSABILITY.md has at least one confusable neighbour.');
}

if (failed) {
  console.log('');
  process.exit(1);
}

console.log('✓ every guide cross-reference is reciprocal and resolves\n');
process.exit(0);
