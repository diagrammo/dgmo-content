#!/usr/bin/env node
/**
 * build-all-chart-types.mjs — assemble examples/all-chart-types.md from the
 * per-type .dgmo files, so the showcase and every other surface share ONE
 * source. Diagram content lives only in examples/{type}/*.dgmo; this script
 * fences them in the order/grouping/labels the manifest declares, wrapped by
 * the header + footer partials.
 *
 * Fix a "lame" diagram → edit its .dgmo → rerun this. It updates the showcase
 * (and, because the same .dgmo also feeds the new-file starter and the gallery
 * tile, those too).
 *
 *   node scripts/build-all-chart-types.mjs            # regenerate + write
 *   node scripts/build-all-chart-types.mjs --check    # fail if on-disk drifts
 *
 * The output is committed because the framework wrappers curl it raw from
 * GitHub main; --check (wired into check-all.mjs) keeps the committed file in
 * sync with the sources.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const MANIFEST = join(ROOT, 'examples/all-chart-types.manifest.json');
const OUT = join(ROOT, 'examples/all-chart-types.md');

const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

function build() {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const parts = [];

  parts.push(read(manifest.header).trimEnd());

  for (const section of manifest.sections) {
    parts.push('');
    parts.push(`## ${section.title}`);
    for (const block of section.blocks) {
      const body = read(block.file).replace(/\s+$/, '');
      parts.push('');
      parts.push(`### ${block.heading}`);
      parts.push('');
      parts.push('```dgmo');
      parts.push(body);
      parts.push('```');
    }
  }

  parts.push('');
  parts.push(read(manifest.footer).trimEnd());

  return parts.join('\n') + '\n';
}

const check = process.argv.includes('--check');
const next = build();

if (check) {
  let current = '';
  try {
    current = readFileSync(OUT, 'utf8');
  } catch {
    /* missing file counts as drift */
  }
  if (current !== next) {
    process.stderr.write(
      '✗ examples/all-chart-types.md is stale. Run: node scripts/build-all-chart-types.mjs\n',
    );
    process.exit(1);
  }
  process.stdout.write('✓ all-chart-types.md is in sync with its sources\n');
} else {
  writeFileSync(OUT, next);
  process.stdout.write(`✓ wrote ${OUT}\n`);
}
