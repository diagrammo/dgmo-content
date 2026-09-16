// The content-assertion suite a documentation slice proves itself against.
//
// 🔴 THIS FILE IS WHY dgmo-content HAS A TEST SCRIPT AT ALL. Before it, a
// nightly slice that edited only documentation could not reach PROVEN: the
// merge guard runs `scripts/prove-fix.sh`, which requires a test that goes red
// when the fix is reverted, and there was no test command here to run. The
// slot's only move was to skip the row, every night, forever (#823). Two doc
// edits on the report-a-problem work (#688) were skipped on 2026-09-14 and
// 2026-09-15 and then applied by hand.
//
// 🔴 HOW A DOCS SLICE USES IT. Add a row to DOCUMENTED in the same commit as
// the prose, then pass the prose file — NOT this file — as `--fix`:
//
//   scripts/prove-fix.sh --repo-dir dgmo-content \
//     --fix guide/keyboard-shortcuts.md --test 'node --test tests/'
//
// prove-fix.sh never reverts a test file, so reverting the prose leaves the
// assertion standing and the suite goes red. A row added WITHOUT the prose
// edit is red from the start, which is the same signal read from the other
// end. Putting the assertion in `--fix` would revert both and prove nothing —
// that is the failure the tool refuses a test-looking `--fix` path to prevent.
//
// 🔴 EVERY ROW CARRIES ITS SOURCE. A documented fact is a claim about a running
// product, so `verifiedAgainst` names the file or commit it was read off and
// `on` dates it. A row nobody can re-check is one nobody can ever retire.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

/**
 * Facts the guides must state. One row per documented behaviour, newest last.
 *
 * `contains` is matched literally, so it carries the exact spelling a reader
 * sees — including the glyph. That is deliberate: the app prints `⌘` and a row
 * asserting the word "Cmd" would pass while the page said something else.
 */
const DOCUMENTED = [
  {
    what: 'the Report a problem chord is listed in the Global table',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['**⌘ + Shift + R**', 'Report a problem'],
    why: 'Cmd/Ctrl+Shift+R has opened the report route since the app shipped it, and was undocumented for a day.',
    verifiedAgainst: 'diagrammo-app/src/hooks/useReportProblemShortcut.ts',
    on: '2026-09-16',
  },
  {
    what: 'the web editor caveat on that chord',
    file: 'guide/keyboard-shortcuts.md',
    contains: ["normally the browser's hard reload"],
    why: 'The listener calls preventDefault, so the chord stops hard-reloading the page there. Without the caveat the row reads as a conflict we did not resolve.',
    verifiedAgainst: 'diagrammo-app/src/hooks/useReportProblemShortcut.ts',
    on: '2026-09-16',
  },
  {
    what: 'the Share door is named as the Share door',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['**⌘ + E**', 'Share diagram'],
    why: 'The dialog ⌘E opens has been called Share since 2026-08-18; the guide called it Export for four weeks after the rename.',
    verifiedAgainst: 'diagrammo-app/src/lib/shortcuts.ts',
    on: '2026-09-16',
  },
];

/**
 * Words the product retired. A guide printing one is drift, not a typo — the
 * name changed and the page did not. Each carries what to say instead, so the
 * failure names the fix rather than only the offence.
 *
 * Scoped to `guide/` prose. `examples/` is diagram source and is governed by
 * the language spec, not by interface vocabulary.
 */
const RETIRED = [
  {
    term: 'Unpublish',
    instead: 'Stop showing',
    why: 'The live-link vocabulary is Show on the web → Showing → Stop showing, mirrored by Watch → Watching → Stop watching. The parallel undos are the whole point of the pair.',
  },
  {
    term: 'Export diagram',
    instead: 'Share diagram',
    why: 'Export named one row of a dialog that has three; the door took the verb Share on 2026-08-18.',
  },
];

test('every documented fact is stated on its page', async (t) => {
  for (const row of DOCUMENTED) {
    await t.test(`${row.file}: ${row.what}`, () => {
      assert.ok(
        existsSync(join(ROOT, row.file)),
        `${row.file} does not exist — the row was written for a page that moved or was deleted.`,
      );
      const page = read(row.file);
      for (const needle of row.contains) {
        assert.ok(
          page.includes(needle),
          [
            `${row.file} does not contain ${JSON.stringify(needle)}.`,
            `Why it must: ${row.why}`,
            `Read off ${row.verifiedAgainst} on ${row.on}.`,
          ].join('\n  '),
        );
      }
    });
  }
});

const guidePages = () =>
  readdirSync(join(ROOT, 'guide'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => join('guide', f));

test('no guide page prints a retired name', async (t) => {
  const pages = guidePages();
  assert.ok(pages.length > 0, 'guide/ holds no .md pages — the sweep would pass by finding nothing.');

  for (const { term, instead, why } of RETIRED) {
    await t.test(`"${term}" \u2192 "${instead}"`, () => {
      const offenders = pages.filter((p) => read(p).includes(term));
      assert.deepEqual(
        offenders,
        [],
        [
          `These guide pages still print "${term}": ${offenders.join(', ')}.`,
          `Say "${instead}" instead. ${why}`,
        ].join('\n  '),
      );
    });
  }
});
