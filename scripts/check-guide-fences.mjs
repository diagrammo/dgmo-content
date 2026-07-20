#!/usr/bin/env node
/**
 * check-guide-fences.mjs — every ```dgmo block in the guide corpus must parse
 * clean.
 *
 * The 2026-07-18 persona docs audit found guides whose own flagship example did
 * not work: `chart-timeline.md`'s hero opened with `scale on`, which no parser
 * branch accepts; `chart-slope.md`'s colour example silently rendered a series
 * named "Python blue 3"; `chart-class.md` and `chart-er.md` documented
 * top-level relationship arrows that the parser rejects, so their Relationship
 * sections and Complete Examples drew zero edges.
 *
 * These are the worst kind of documentation bug — the reader copies the example
 * precisely because it is the example, and it does not work. This guard makes
 * that state unshippable.
 *
 * NOTE ON SILENT FAILURE: a clean `validate()` is necessary but not sufficient.
 * Several parsers swallow unknown top-level options through a catch-all, and
 * some malformed rows fold into a label rather than erroring. Warnings are
 * therefore treated as failures here — they are the only signal those cases
 * produce.
 *
 * Usage:  node scripts/check-guide-fences.mjs [--verbose]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = join(HERE, '..', 'guide');
const DGMO_DIST = join(HERE, '..', '..', 'dgmo', 'dist', 'index.js');
const VERBOSE = process.argv.includes('--verbose');

if (!existsSync(DGMO_DIST)) {
  // "Cannot verify" is not "verified broken". Content-only contributors may not
  // have the sibling repo built, and a guard that hard-fails for an
  // environmental reason trains people to ignore the whole check-all run.
  // Skip loudly instead — silence here would be the same defect this guard exists
  // to catch.
  console.warn(`\n⚠ SKIPPED — dgmo build not found at ${DGMO_DIST}`);
  console.warn('  Guide examples were NOT validated. Run `pnpm build` in the dgmo');
  console.warn('  repo and re-run to actually check them.\n');
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { validate } = require(DGMO_DIST);

/** Every ```dgmo fence in a markdown file, with its 1-indexed start line. */
function fencesFrom(md) {
  const out = [];
  const lines = md.split('\n');
  let start = -1;
  let buf = [];

  lines.forEach((line, i) => {
    if (start === -1) {
      if (/^```dgmo\s*$/.test(line.trim())) {
        start = i + 1;
        buf = [];
      }
      return;
    }
    if (/^```\s*$/.test(line.trim())) {
      out.push({ line: start, source: buf.join('\n') });
      start = -1;
      return;
    }
    buf.push(line);
  });

  return out;
}

const files = readdirSync(GUIDE_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort();

let total = 0;
const failures = [];

for (const file of files) {
  const md = readFileSync(join(GUIDE_DIR, file), 'utf8');
  for (const fence of fencesFrom(md)) {
    total++;
    let diags = [];
    try {
      const r = validate(fence.source);
      diags = Array.isArray(r) ? r : (r?.diagnostics ?? []);
    } catch (err) {
      failures.push({
        file, line: fence.line,
        diags: [{ severity: 'error', message: `threw: ${err.message}` }],
      });
      continue;
    }
    const bad = diags.filter((d) => d.severity === 'error' || d.severity === 'warning');
    if (bad.length) failures.push({ file, line: fence.line, diags: bad });
    else if (VERBOSE) console.log(`  ok  ${file}:${fence.line}`);
  }
}

console.log(`\nvalidated ${total} dgmo block(s) across ${files.length} guide pages`);

if (failures.length === 0) {
  console.log('✓ every documented example parses clean\n');
  process.exit(0);
}

console.log(`\n✗ ${failures.length} block(s) do not parse clean:\n`);
for (const f of failures) {
  console.log(`  ${f.file}:${f.line}`);
  for (const d of f.diags.slice(0, 4)) {
    console.log(`    [${d.severity}] ${(d.message ?? '').toString().slice(0, 140)}`);
  }
  if (f.diags.length > 4) console.log(`    … ${f.diags.length - 4} more`);
}
console.log(
  '\nA reader copies the example BECAUSE it is the example. Fix the guide.\n',
);
process.exit(1);
