#!/usr/bin/env node
/**
 * check-guide-directives.mjs — catches guides that document directives the
 * parser does not accept.
 *
 * The 2026-07-18 persona docs audit found TWELVE of these across the corpus:
 * `mode shapes` (boxes-and-lines, never implemented), `collapse-notes`
 * (sequence, zero source hits), `hide` (sitemap, stored and never read),
 * `variant-*` (raci — offered as the escape hatch from raci's hardest failure
 * mode), `animate`/`no-animate` (infra, accepted only to warn they were
 * removed), `fill` (function — the real token is `shade`, and the shipped
 * example was broken), `scale on` (timeline — the flagship example did not
 * parse), plus `title` metadata rows removed by decision #48.
 *
 * Each one makes a reader write DGMO that fails or silently no-ops. They are
 * cheap to introduce and invisible in review, so this is a guard rather than a
 * one-time cleanup.
 *
 * WHY A SOURCE GREP AND NOT `validate()`: several parsers swallow unknown
 * top-level options through a catch-all, so `validate()` returns CLEAN for
 * `collapse-notes` and `hide status` — both of which are dead. Absence of a
 * diagnostic is not evidence of implementation, which is precisely why these
 * survived so long in the guides. The check has to read the source.
 *
 * HEURISTIC: pull every backticked token out of a guide's directive/settings/
 * options tables, then look for that literal anywhere in the dgmo source. A
 * token that appears nowhere is a false claim. A token that appears ONLY on
 * lines announcing its own removal is a stale claim. Both fail.
 *
 * WHAT THIS CANNOT CATCH: a token the parser genuinely accepts but no renderer
 * consumes — c4's `layout`, function's `shade`, heatmap's `x-label`. Those are
 * live vocabulary by every static measure and still do nothing. They need a
 * consumer-side check; see S6 in tasks/docs-persona-audit/FINDINGS.md.
 *
 * False positives are possible (a token spelled differently in source than in
 * docs), so every finding names the token and the guide line — verify before
 * editing. Add genuine exceptions to ALLOW below with a reason.
 *
 * Usage:  node scripts/check-guide-directives.mjs [--verbose]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const GUIDE_DIR = join(HERE, '..', 'guide');
const DGMO_SRC = join(HERE, '..', '..', 'dgmo', 'src');
const VERBOSE = process.argv.includes('--verbose');

/**
 * Tokens that legitimately appear in guide tables without being parser
 * vocabulary. Keep this list short and justified — it is the escape hatch that
 * lets the guard stay strict everywhere else.
 */
const ALLOW = new Set([
  // Metadata keys and structural words, not directives.
  'chart', 'title', 'now', 'target', 'note', 'description', 'color', 'colors',
  'value', 'values', 'label', 'labels', 'name', 'names', 'text', 'date', 'dates',
  'key', 'type', 'id', 'group', 'groups', 'tag', 'tags', 'row', 'rows',
  'column', 'columns', 'period', 'periods', 'stage', 'stages', 'level', 'levels',
  // Syntax illustrations rather than tokens.
  'true', 'false', 'yes', 'no', 'on', 'off',
]);

/** Lines matching these are announcing a removal, not documenting a feature. */
const REMOVAL_RE = /\b(removed|no longer|deprecated|deleted|dropped)\b/i;

/** Section headings whose tables carry directive vocabulary. */
const TABLE_SECTION_RE =
  /^#{2,3}\s+.*\b(directive|setting|option|flag|modifier|kev|key)s?\b/i;

function sourceFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === 'dist' || e.name === '__tests__') continue;
        walk(p);
      } else if (/\.(ts|tsx|mts)$/.test(e.name) && !/\.test\.ts$/.test(e.name)) {
        out.push(p);
      }
    }
  };
  walk(dir);
  return out;
}

/**
 * Files that can plausibly accept a directive for `type`.
 *
 * Scoping matters: a global search gives false negatives, because common words
 * exist somewhere in a 200-file tree regardless of whether THIS parser accepts
 * them. `mode` is documented by boxes-and-lines and implemented by nobody, yet
 * appears all over the source; `animate` survives only in infra's own removal
 * warning. Both look live to a global grep and dead to a scoped one.
 */
function scopeFor(type) {
  const dir = join(DGMO_SRC, type);
  const files = existsSync(dir) ? sourceFiles(dir) : [];
  // Data charts (bar/line/pie/scatter/…) have no per-type dir — they share
  // these parsers. Always include them; they are also where the universal
  // fill-*/no-* family lives.
  for (const shared of [
    'data-chart-parser.ts', 'chart.ts', 'directives-registry.ts',
    'utils/parsing.ts', 'visualizations/parse.ts',
  ]) {
    const p = join(DGMO_SRC, shared);
    if (existsSync(p)) files.push(p);
  }
  const d3 = join(DGMO_SRC, 'charts-d3', `${type}.ts`);
  if (existsSync(d3)) files.push(d3);
  const vis = join(DGMO_SRC, 'visualizations');
  if (existsSync(vis) && !existsSync(dir)) files.push(...sourceFiles(vis));
  return files;
}

if (!existsSync(DGMO_SRC)) {
  console.error(`✗ dgmo source not found at ${DGMO_SRC}`);
  console.error('  This guard needs the sibling dgmo checkout. Skipping is not safe —');
  console.error('  clone dgmo alongside dgmo-content and re-run.');
  process.exit(1);
}

/** Per-type source text, read once and cached. */
const scopeCache = new Map();
function scopeLines(type) {
  if (!scopeCache.has(type)) {
    const text = scopeFor(type)
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n');
    scopeCache.set(type, text.split('\n'));
  }
  return scopeCache.get(type);
}

/** Every line in this type's parser scope mentioning the literal token. */
function sourceLinesFor(type, token) {
  const esc = token.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const quoted = new RegExp(`['"\`]${esc}['"\`]`);
  return scopeLines(type).filter((l) => quoted.test(l));
}

/**
 * Regex literals in this type's scope, compiled. Cached per type.
 *
 * Not every directive is a quoted string. Several parsers match a whole family
 * at once — treemap accepts `no-headers` via `/^no-(values?|percent|headers|
 * legend)\s*$/i`, so the literal "no-headers" appears nowhere in the source and
 * a quote-only search reports a live directive as missing. A guard that cries
 * wolf gets switched off, so test the token against the actual patterns.
 */
const regexCache = new Map();
function scopeRegexes(type) {
  if (!regexCache.has(type)) {
    const out = [];
    for (const line of scopeLines(type)) {
      for (const m of line.matchAll(/\/((?:[^/\\\n[]|\\.|\[(?:[^\]\\]|\\.)*\])+)\/([gimsuy]*)/g)) {
        const body = m[1];
        // Only patterns that look like vocabulary matchers, not path-ish noise.
        if (!/[(|^$]/.test(body)) continue;
        try {
          out.push(new RegExp(body, m[2].replace(/[gy]/g, '')));
        } catch {
          /* not a real regex literal — skip */
        }
      }
    }
    regexCache.set(type, out);
  }
  return regexCache.get(type);
}

/**
 * True when some parser regex in scope actually enumerates this token.
 *
 * Matching alone is not evidence: a generic matcher like `/^(\w[\w-]*)$/`
 * accepts every string, so "does some regex match?" silently passes anything —
 * verified by feeding this guard a deliberately fake directive. The pattern
 * must ALSO spell out one of the token's own stems, which is what an
 * enumerating alternation such as `no-(values?|percent|headers|legend)` does
 * and what a generic word matcher does not.
 */
function matchedByPattern(type, token) {
  const stems = token.split(/[-_]/).filter((s) => s.length >= 4);
  if (stems.length === 0) return false;
  return scopeRegexes(type).some((re) => {
    const src = re.source;
    if (!stems.some((s) => src.includes(s))) return false;
    try {
      return re.test(token);
    } catch {
      return false;
    }
  });
}

/** Extract candidate directive tokens from the tables in a guide. */
function tokensFrom(md) {
  const lines = md.split('\n');
  const found = new Map(); // token -> first line number (1-indexed)
  let inTable = false;
  let inFence = false;

  lines.forEach((line, i) => {
    if (/^```/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    if (/^#{2,3}\s/.test(line)) inTable = TABLE_SECTION_RE.test(line);
    if (!inTable) return;
    if (!line.trim().startsWith('|')) return;

    // First cell of a table row holds the token(s).
    const firstCell = line.split('|')[1] ?? '';
    for (const m of firstCell.matchAll(/`([^`]+)`/g)) {
      // A cell may hold `a` \| `b` alternatives; each backtick group is one token.
      const raw = m[1].trim();
      // Strip a documented value: `direction lr|columns` -> `direction`.
      const token = raw.split(/[\s:]/)[0].replace(/[.,]$/, '');
      if (!token || ALLOW.has(token)) continue;
      // Skip pure placeholders and prose.
      if (/^[<[]/.test(token) || token.length < 2) continue;
      if (!found.has(token)) found.set(token, i + 1);
    }
  });

  return found;
}

const guides = readdirSync(GUIDE_DIR)
  .filter((f) => f.startsWith('chart-') && f.endsWith('.md'))
  .sort();

const findings = [];
let tokenCount = 0;

for (const file of guides) {
  const md = readFileSync(join(GUIDE_DIR, file), 'utf8');
  const tokens = tokensFrom(md);
  const type = file.replace(/^chart-/, '').replace(/\.md$/, '');

  for (const [token, line] of tokens) {
    tokenCount++;
    const hits = sourceLinesFor(type, token);

    if (hits.length === 0) {
      // Second chance: the parser may match a whole family by pattern rather
      // than listing the token literally.
      if (matchedByPattern(type, token)) {
        if (VERBOSE) console.log(`  ok  ${file}:${line}  ${token}  (matched by parser regex)`);
        continue;
      }
      findings.push({
        file, line, token,
        kind: 'ABSENT',
        detail: `no quoted literal and no parser pattern in dgmo/src/${type}/ accepts it`,
      });
      continue;
    }

    const live = hits.filter((l) => !REMOVAL_RE.test(l));
    if (live.length === 0) {
      findings.push({
        file, line, token,
        kind: 'REMOVED',
        detail: `only appears on removal notices, e.g. ${hits[0].trim().slice(0, 90)}`,
      });
    } else if (VERBOSE) {
      console.log(`  ok  ${file}:${line}  ${token}  (${live.length} source hits)`);
    }
  }
}

console.log(`\nchecked ${tokenCount} documented tokens across ${guides.length} guides`);

if (findings.length === 0) {
  console.log('✓ every documented directive exists in the parser\n');
  process.exit(0);
}

console.log(`\n✗ ${findings.length} documented directive(s) the parser does not accept:\n`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.line}`);
  console.log(`    \`${f.token}\` — ${f.kind}: ${f.detail}`);
}
console.log(
  '\nEach of these makes a reader write DGMO that fails or silently does nothing.',
);
console.log('Fix the guide, or add a justified exception to ALLOW in this script.\n');
process.exit(1);
