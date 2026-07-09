#!/usr/bin/env node
/**
 * expand-dgmo-embeds.mjs — expand Obsidian-style `![[foo.dgmo]]` embeds into
 * inline ```dgmo fenced blocks.
 *
 * The app and the Obsidian plugin render `![[x.dgmo]]` transclusions natively
 * (BL-101), so a source .md authored with embeds is single-source: the diagram
 * lives once in its .dgmo file. But the framework wrappers and raw GitHub only
 * understand fenced ```dgmo — so we author with embeds and PUBLISH the expanded,
 * fenced copy. This script is that expander.
 *
 *   node scripts/expand-dgmo-embeds.mjs <src.md> <out.md>           # write
 *   node scripts/expand-dgmo-embeds.mjs <src.md> <out.md> --check   # drift
 *
 * Only whole-line `![[target.dgmo]]` (optional `|alias`) is expanded, matching
 * the app's rule (remarkDgmoEmbed.ts). The target path resolves relative to the
 * SOURCE file's folder — the same semantics the in-app renderer uses. Non-.dgmo
 * `![[…]]` and inline occurrences are left untouched.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const check = args.includes('--check');
const [src, out] = args.filter((a) => a !== '--check');

if (!src || !out) {
  process.stderr.write('usage: expand-dgmo-embeds.mjs <src.md> <out.md> [--check]\n');
  process.exit(2);
}

const EMBED = /^!\[\[\s*([^|\]]+?\.dgmo)\s*(?:\|[^\]]*)?\]\]\s*$/;
const srcDir = dirname(resolve(src));

const expanded = readFileSync(src, 'utf8')
  .split('\n')
  .map((line) => {
    const m = line.match(EMBED);
    if (!m) return line;
    const body = readFileSync(resolve(srcDir, m[1].trim()), 'utf8').replace(/\s+$/, '');
    return '```dgmo\n' + body + '\n```';
  })
  .join('\n');

if (check) {
  let current = '';
  try {
    current = readFileSync(out, 'utf8');
  } catch {
    /* missing counts as drift */
  }
  if (current !== expanded) {
    process.stderr.write(`✗ ${out} is stale. Run: node scripts/expand-dgmo-embeds.mjs ${src} ${out}\n`);
    process.exit(1);
  }
  process.stdout.write(`✓ ${out} is in sync with ${src}\n`);
} else {
  writeFileSync(out, expanded);
  process.stdout.write(`✓ wrote ${out}\n`);
}
