#!/usr/bin/env node
/**
 * test-guidance.mjs — eyeball whether a type's guidance actually improves AI
 * output. For each of the type's real prompts it asks the model twice —
 *   A) syntax reference only          (no guidance)
 *   B) syntax reference + guidance     (registry.guidance for that type)
 * — extracts the DGMO, renders both to SVG, and writes a side-by-side gallery.
 * A and B differ by EXACTLY the guidance, so the diff is the guidance's effect.
 *
 * Mirrors the guidance-studio tuning framing (buildTuningBase/extractDgmo) so
 * the base is realistic — the same per-type reference an agent fetches via
 * get_language_reference, minus the TIPS (guidance) which is what we're testing.
 *
 *   node scripts/test-guidance.mjs <type> [--n 2] [--out DIR]
 *
 * Needs the `dgmo` CLI (../dgmo/dist/cli.cjs) and `claude` on PATH. Output is
 * gitignored; open the printed index.html to compare.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const REGISTRY = join(ROOT, 'registry.json');
const REF = join(ROOT, '../dgmo/docs/language-reference.md');
const PROMPTS = join(ROOT, '../dgmo-mcp/tools/guidance-studio/prompts.json');
const DGMO_CLI = join(ROOT, '../dgmo/dist/cli.cjs');

const argv = process.argv.slice(2);
const type = argv.find((a) => !a.startsWith('--'));
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};
if (!type) {
  console.error('usage: node scripts/test-guidance.mjs <type> [--n 2] [--out DIR]');
  process.exit(1);
}
const N = Number(flag('n', '2'));
const OUT = flag('out', join(ROOT, '_guidance-tests', type));

// ── inputs ────────────────────────────────────────────────────────────────
const registry = JSON.parse(await readFile(REGISTRY, 'utf8'));
const entity = registry.entities.find((e) => e.id === type && e.kind === 'type');
if (!entity) { console.error(`no type entity "${type}" in registry`); process.exit(1); }
const guidance = entity.guidance ?? '';
if (!guidance) console.warn(`⚠ "${type}" has no guidance — A/B will be identical. Testing anyway.`);

const md = await readFile(REF, 'utf8');
// Per-type syntax reference = the TYPE block minus its TIPS pair.
const markers = [...md.matchAll(/<!--\s*TYPE:([\w-]+)\s*-->/g)].map((m) => ({ id: m[1], start: m.index }));
const mi = markers.findIndex((m) => m.id === type);
let reference = '';
if (mi >= 0) {
  const start = markers[mi].start;
  const nextMarker = markers[mi + 1]?.start ?? md.length;
  const h2 = md.slice(start).search(/\n## /);
  const end = h2 >= 0 ? Math.min(start + h2, nextMarker) : nextMarker;
  reference = md.slice(start, end).replace(/<!--\s*TIPS start\s*-->[\s\S]*?<!--\s*TIPS end\s*-->/, '').trim();
}

const allPrompts = JSON.parse(await readFile(PROMPTS, 'utf8'));
const prompts = (allPrompts[type] ?? []).slice(0, N);
if (!prompts.length) { console.error(`no prompts for "${type}" in prompts.json`); process.exit(1); }

// ── framing (mirrors guidance-studio buildTuningBase) ───────────────────────
function buildPrompt(userPrompt, tips) {
  const parts = [
    `Produce a Diagrammo (DGMO) "${type}" diagram for the request below.`,
    'Output ONLY the DGMO source — no prose, no explanation. A ```dgmo fence is fine.',
  ];
  if (reference) parts.push(`DGMO syntax reference for "${type}":\n${reference}`);
  if (tips) parts.push(`Styling guidance you MUST follow:\n${tips}`);
  parts.push(`Request: ${userPrompt}`);
  return parts.join('\n\n');
}
const extractDgmo = (out) => {
  const f = out.match(/```(?:dgmo)?\s*\n([\s\S]*?)```/);
  return (f ? f[1] : out).trim();
};
const claude = (prompt) =>
  new Promise((resolve) =>
    execFile('claude', ['-p', prompt], { timeout: 180_000, maxBuffer: 8 << 20 }, (err, stdout) =>
      resolve({ out: (stdout || '').trim(), error: err ? String(err.message ?? err) : null }),
    ),
  );
const render = (dgmoPath, svgPath) =>
  new Promise((resolve) =>
    execFile(process.execPath, [DGMO_CLI, dgmoPath, '-o', svgPath], { timeout: 60_000, maxBuffer: 16 << 20 }, (err) =>
      resolve(err ? String(err.message ?? err) : null),
    ),
  );

// ── run ─────────────────────────────────────────────────────────────────────
await mkdir(OUT, { recursive: true });
console.log(`testing "${type}" · ${prompts.length} prompt(s) · out ${OUT}`);

async function variant(i, label, tips) {
  const gen = await claude(buildPrompt(prompts[i], tips));
  const code = gen.error ? '' : extractDgmo(gen.out);
  const base = `${i}-${label}`;
  const dgmoPath = join(OUT, `${base}.dgmo`);
  const svgPath = join(OUT, `${base}.svg`);
  await writeFile(dgmoPath, code + '\n');
  const renderErr = code ? await render(dgmoPath, svgPath) : 'no DGMO generated';
  return { label, code, genErr: gen.error, renderErr, svg: `${base}.svg`, ok: !gen.error && !renderErr };
}

const rows = [];
for (let i = 0; i < prompts.length; i++) {
  process.stdout.write(`  [${i + 1}/${prompts.length}] ${prompts[i].slice(0, 60)}…\n`);
  const [a, b] = await Promise.all([variant(i, 'without', ''), variant(i, 'with', guidance)]);
  rows.push({ prompt: prompts[i], a, b });
}

// ── gallery ──────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
const cell = (v) => `
  <td class="${v.ok ? '' : 'bad'}">
    <div class="tag">${v.label}${v.ok ? '' : ' ⚠'}</div>
    ${v.ok ? `<img src="${v.svg}" />` : `<div class="err">${esc(v.genErr || v.renderErr)}</div>`}
    <details><summary>source</summary><pre>${esc(v.code || '(none)')}</pre></details>
  </td>`;
const html = `<!doctype html><meta charset="utf8"><title>guidance A/B — ${type}</title>
<style>
 body{font:14px/1.5 system-ui;margin:24px;background:#0f1115;color:#e6e6e6}
 h1{font-size:18px} .prompt{margin:28px 0 8px;font-weight:600;color:#9ecbff}
 table{width:100%;border-collapse:collapse} td{width:50%;vertical-align:top;padding:12px;border:1px solid #2a2f3a}
 .tag{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#8b93a7;margin-bottom:8px}
 img{max-width:100%;background:#fff;border-radius:6px}
 details{margin-top:8px} pre{white-space:pre-wrap;font:12px ui-monospace;background:#161a22;padding:8px;border-radius:6px;overflow:auto}
 td.bad{background:#2a1416} .err{color:#ff8a8a;font-family:ui-monospace;font-size:12px}
 .guidance{background:#161a22;padding:12px;border-radius:8px;border:1px solid #2a2f3a;color:#c9d1d9}
</style>
<h1>Guidance A/B — <code>${type}</code></h1>
<div class="guidance"><b>Guidance under test:</b><br>${esc(guidance) || '<i>(none)</i>'}</div>
${rows.map((r) => `<div class="prompt">▸ ${esc(r.prompt)}</div><table><tr>${cell(r.a)}${cell(r.b)}</tr></table>`).join('\n')}
`;
const indexPath = join(OUT, 'index.html');
await writeFile(indexPath, html);
console.log(`\n✓ done → file://${indexPath}`);
