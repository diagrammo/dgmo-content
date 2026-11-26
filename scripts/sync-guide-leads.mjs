#!/usr/bin/env node
/**
 * sync-guide-leads.mjs — each chart guide's FIRST ```dgmo fence is its type's
 * marquee example, copied from examples/ (#2398).
 *
 * Docs pages, online and in the app, draw their first chart from that fence. The
 * owner picks marquee examples in the console reviewer, so the example file is
 * the source and the fence is a projection: edit the example, never the fence.
 *
 * Source per TYPE entity: its registry example with `isPrimary` and
 * `status: "marquee"`. A type whose primary is not marquee keeps its fence as
 * it is — a draft is never copied onto a public page (#2400). Variant sections
 * further down a guide are teaching snippets and are not touched.
 *
 *   node scripts/sync-guide-leads.mjs           # rewrite stale guides
 *   node scripts/sync-guide-leads.mjs --check   # exit 1 if any guide is stale
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'));

// The first ```dgmo fence: its opening line, body, and closing line.
const FIRST_FENCE = /^```dgmo[ \t]*\n([\s\S]*?)\n```[ \t]*$/m;

const stale = [];
const problems = [];
for (const type of registry.entities.filter((e) => e.kind === 'type')) {
  const ex = registry.examples.find((x) => x.entity === type.id && x.isPrimary);
  if (!ex || ex.status !== 'marquee') continue;
  const guideRel = `guide/chart-${type.id}.md`;
  const guidePath = join(ROOT, guideRel);
  if (!existsSync(guidePath)) {
    problems.push(`${guideRel}: missing, but ${ex.file} is a marquee example`);
    continue;
  }
  const md = readFileSync(guidePath, 'utf8');
  const m = md.match(FIRST_FENCE);
  if (!m) {
    problems.push(`${guideRel}: no \`\`\`dgmo fence to lead with ${ex.file}`);
    continue;
  }
  const body = readFileSync(join(ROOT, ex.file), 'utf8').replace(/\s+$/, '');
  if (m[1] === body) continue;
  stale.push(guideRel);
  if (!CHECK) {
    const at = m.index;
    writeFileSync(guidePath, md.slice(0, at) + '```dgmo\n' + body + '\n```' + md.slice(at + m[0].length));
  }
}

for (const p of problems) process.stderr.write(`✗ ${p}\n`);
if (CHECK && stale.length) {
  process.stderr.write(
    `✗ ${stale.length} guide(s) do not lead with their marquee example: ${stale.join(', ')}\n` +
      '  Run: node scripts/sync-guide-leads.mjs\n',
  );
  process.exit(1);
}
if (problems.length) process.exit(1);
process.stdout.write(
  CHECK ? '✓ every guide leads with its marquee example\n' : `✓ rewrote ${stale.length} guide lead(s)\n`,
);
