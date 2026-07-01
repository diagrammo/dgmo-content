#!/usr/bin/env node
/**
 * check-all.mjs — one command for every dgmo-content drift guard. Run before
 * committing content changes (and manually in review); exits non-zero if any
 * guard fails so "the model and its lenses agree" is a single check.
 *
 *   1. check-registry            registry.json structural integrity + gaps
 *   2. project-guide --check     guide/registry.json is a faithful projection
 *   3. check-example-categories  every example sits in its registry category
 *
 * The MCP trigger-vocabulary guard lives in the sibling repo (it owns
 * triggers.json): run `pnpm -C ../dgmo-mcp check:triggers` there. It's not
 * invoked here because dgmo-content can't assume the sibling is checked out.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const guards = [
  { name: 'registry integrity', script: 'check-registry.mjs', args: [] },
  { name: 'guide projection', script: 'project-guide-registry.mjs', args: ['--check'] },
  { name: 'example categories', script: 'check-example-categories.mjs', args: [] },
];

let failed = 0;
for (const g of guards) {
  process.stdout.write(`\n▶ ${g.name}\n`);
  const r = spawnSync(process.execPath, [join(HERE, g.script), ...g.args], { stdio: 'inherit' });
  if (r.status !== 0) failed++;
}

process.stdout.write(failed ? `\n✗ ${failed} guard(s) failed\n` : '\n✓ all guards passed\n');
process.exit(failed ? 1 : 0);
