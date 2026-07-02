#!/usr/bin/env node
/**
 * project-guidance-to-reference.mjs — registry.guidance is CANONICAL; this
 * projects it into the per-type TIPS blocks of dgmo/docs/language-reference.md
 * (the copy the MCP server slices per type to clients). Same "one source, every
 * surface a lens" shape as project-guide-registry / project-triggers.
 *
 *   (default)   rewrite the TIPS blocks in language-reference.md from registry
 *   --check     no write; exit 1 if the file is out of sync (CI drift guard)
 *
 * Only replaces EXISTING `<!-- TIPS start -->…<!-- TIPS end -->` pairs. A type
 * with guidance but no TIPS block is reported (can't project) — add the block
 * to language-reference.md once, then this owns its content.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(HERE, '..');
const REGISTRY = join(CONTENT_ROOT, 'registry.json');
const REF = join(CONTENT_ROOT, '../dgmo/docs/language-reference.md');
const check = process.argv.includes('--check');

// The `dgmo/` sibling owns language-reference.md; skip cleanly when it isn't
// checked out (dgmo-content can't assume the sibling is present).
if (!existsSync(REF)) {
  console.log('… dgmo/docs/language-reference.md not present — skipping guidance projection');
  process.exit(0);
}

const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const guidance = new Map(
  registry.entities.filter((e) => e.kind === 'type' && e.guidance).map((e) => [e.id, e.guidance]),
);

const orig = await readFile(REF, 'utf8');

// Alias map (`<!-- ALIAS:foo -> bar -->`), if any.
const aliases = new Map();
for (const m of orig.matchAll(/<!--\s*ALIAS:([\w-]+)\s*->\s*([\w-]+)\s*-->/g)) aliases.set(m[2], m[1]);

// TYPE blocks: marker → next TYPE marker or next H2.
const markers = [...orig.matchAll(/<!--\s*TYPE:([\w-]+)\s*-->/g)].map((m) => ({ id: m[1], start: m.index }));
const edits = [];
const noBlock = [];
for (let i = 0; i < markers.length; i++) {
  const { id, start } = markers[i];
  const g = guidance.get(id) ?? guidance.get(aliases.get(id));
  if (!g) continue;
  const nextMarker = markers[i + 1]?.start ?? orig.length;
  const h2 = orig.slice(start).search(/\n## /);
  const end = h2 >= 0 ? Math.min(start + h2, nextMarker) : nextMarker;
  const block = orig.slice(start, end);
  const rel = block.search(/<!--\s*TIPS start\s*-->[\s\S]*?<!--\s*TIPS end\s*-->/);
  if (rel < 0) { noBlock.push(id); continue; }
  const m = block.match(/<!--\s*TIPS start\s*-->[\s\S]*?<!--\s*TIPS end\s*-->/);
  edits.push({
    start: start + rel,
    end: start + rel + m[0].length,
    text: `<!-- TIPS start -->\n**Styling tips:** ${g}\n<!-- TIPS end -->`,
  });
}

let next = orig;
for (const e of edits.sort((a, b) => b.start - a.start)) {
  next = next.slice(0, e.start) + e.text + next.slice(e.end);
}

if (noBlock.length) {
  console.warn(`⚠ guidance set but no TIPS block in language-reference (skipped): ${noBlock.join(', ')}`);
}

if (check) {
  if (next !== orig) {
    console.error('✗ language-reference.md TIPS drift from registry.guidance. Run: node scripts/project-guidance-to-reference.mjs');
    process.exit(1);
  }
  console.log(`✓ language-reference.md TIPS in sync with registry.guidance (${edits.length} types)`);
} else {
  if (next !== orig) {
    await writeFile(REF, next, 'utf8');
    console.log(`✓ projected ${edits.length} guidance TIPS into language-reference.md`);
  } else {
    console.log(`✓ already in sync (${edits.length} types)`);
  }
}
