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
  {
    what: 'the CLI install leads with npm, for macOS and Linux',
    file: 'guide/index.md',
    contains: ['npm install -g @diagrammo/dgmo-cli', 'on macOS and Linux', 'https://diagrammo.app/dev#cli'],
    why: 'Homebrew is macOS-only, so a Linux reader was told to install with a tool they do not have. Decided on #921 (option 1, Windows out).',
    verifiedAgainst: 'https://diagrammo.app/dev/ (CLI tab: npm, Homebrew, pacman)',
    on: '2026-10-06',
  },
  {
    what: 'headless use installs the CLI with npm, for macOS and Linux',
    file: 'guide/terminal-opener.md',
    contains: ['npm install -g @diagrammo/dgmo-cli', 'macOS and Linux', 'https://diagrammo.app/dev#cli'],
    why: 'Same decision as the guide index (#921): npm first, Homebrew and pacman behind the /dev link.',
    verifiedAgainst: 'https://diagrammo.app/dev/ (CLI tab: npm, Homebrew, pacman)',
    on: '2026-10-06',
  },
  {
    what: 'the all-chart-types note shows every live-link spelling',
    file: 'examples/all-chart-types.md',
    contains: [
      '## Live link',
      '```dgmo\nlive-link dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD\n```',
      '```dgmo\nhttps://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD\n```',
      'live-link Checkout — card payment\nurl https://online.diagrammo.app/d/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD',
      '![[live-link:dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD]]',
      'Keep live links up to date',
    ],
    why: 'The Obsidian example note is where a user learns which fences they can write, and it had no live link (#1276). The id must stay shared: every published example once pointed at a dead diagram (#783).',
    verifiedAgainst: 'docs/dgmo-language-spec.md §38.3 and §38.6; obsidian-dgmo/src/ui/settings.ts (followLiveLinks); GET api.diagrammo.app/public/diagrams/dgm_01M3PG3DQ6S89W7ZFM5Z06J1CD/source → 200',
    on: '2026-10-12',
  },
  {
    what: 'the notes page names the five chart types made for personal notes',
    file: 'guide/charts-for-notes.md',
    contains: [
      '[`countdown`](chart-countdown.md)',
      '[`clock`](chart-clock.md)',
      '[`family`](chart-family.md)',
      '[`map`](chart-map.md)',
      '[`goal`](chart-goal.md)',
    ],
    why: 'The owner picked these four for the Obsidian post (#1430), and added map on 2026-10-22; the blog post and the obsidian-dgmo README link here as their durable home.',
    verifiedAgainst: 'dgmo/src/chart-types.ts; obsidian-dgmo/README.md (Supported chart types)',
    on: '2026-10-20',
  },
  {
    what: 'the notes page says countdown and clock tick live, and an export does not',
    file: 'guide/charts-for-notes.md',
    contains: ['`countdown` and `clock` are the two **live** chart types', 'because an image cannot tick'],
    why: 'The live tick is the reason these two belong in a note at all; an image export showing a fixed time is the documented fallback, not a bug.',
    verifiedAgainst: 'guide/chart-countdown.md and guide/chart-clock.md (Live vs. baked)',
    on: '2026-10-20',
  },
  {
    what: 'the notes page tells an Obsidian user which plugin to install and how to write the fence',
    file: 'guide/charts-for-notes.md',
    contains: ['**Diagrammo Diagrams** community plugin', 'the `dgmo` language tag', 'https://diagrammo.app/embed/obsidian/', 'https://diagrammo.app/blog/charts-for-obsidian-notes/'],
    why: 'A reader arriving from the Obsidian post needs the plugin name as the community browser lists it.',
    verifiedAgainst: 'obsidian-dgmo/manifest.json (name); obsidian-dgmo/README.md (Usage)',
    on: '2026-10-20',
  },
  {
    what: "the app's preview and exports honour the file's palette line, Settings as fallback",
    file: 'guide/colors.md',
    contains: ["A file's own `palette` line beats both.", "A file with no `palette` line draws in Settings' palette."],
    why: 'The app ignored the line until #1412; the page said so, and must now say the line wins in the preview and every export.',
    verifiedAgainst: 'diagrammo-app 8a6fff12, src/lib/diagramPalette.ts (chooseDiagramPalette)',
    on: '2026-10-25',
  },
  {
    what: "the app's exports honour the file's palette line, Export palette as fallback",
    file: 'guide/exporting.md',
    contains: ["A file's own `palette` line beats the setting", "a file's own `palette` line wins, and the **Export palette** setting takes the place of slate"],
    why: 'The app ignored the line until #1412; both passages said so.',
    verifiedAgainst: 'diagrammo-app 8a6fff12, src/stores/exportStore.ts (executeExport) and src/lib/diagramPalette.ts',
    on: '2026-10-25',
  },
  {
    what: 'the web editor starts a new file in the file tree with Alt+N',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['In the web editor that key is **Alt + N** (**Option + N** on a Mac)'],
    why: 'Chrome and Firefox keep Ctrl/Cmd+N for a new window and never send it to the page, so the web file tree moved to Alt+N (#1419, slice 1). The page still offered ⌘ + N there.',
    verifiedAgainst: 'diagrammo-app 913bfc23, src/lib/shortcut-table.ts (FILE_TREE_NEW_FILE) and src/features/file-tree/hooks/useFileTreeKeyboard.ts',
    on: '2026-10-28',
  },
  {
    what: 'the getting-started list gives the web editor its own new-file key',
    file: 'guide/index.md',
    contains: ['**Alt + N** in the web editor'],
    why: 'Same move as the shortcuts page (#1419): the bare Cmd + N line told a web-editor reader to press a key the browser takes.',
    verifiedAgainst: 'diagrammo-app 913bfc23, src/lib/shortcut-table.ts (FILE_TREE_NEW_FILE)',
    on: '2026-10-28',
  },
  {
    what: 'the Linux desktop app accepts the Ctrl file chords',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['On the Linux desktop app, which has no menu', '**Ctrl + Shift + O**', '**Ctrl + S**'],
    why: 'The Linux desktop app has no menu, so these chords are handled in the page itself; the page must not imply they need one.',
    verifiedAgainst: 'diagrammo-app 95d5076f (#1419 slice 3)',
    on: '2026-11-11',
  },
  {
    what: 'the Mac Ctrl alias and its punctuation-only limit',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['## Alias keys', '**Mac desktop app:** **Ctrl** also presses the **⌘** chord for', 'never works for letters or digits'],
    why: 'Ctrl stands in for Cmd on , = - / only; Apple keeps Ctrl+letter and Ctrl+digit.',
    verifiedAgainst: 'diagrammo-app/src/lib/shortcut-aliases.ts (MAC_CTRL_ALIASES, 40b07a10 + acd33617)',
    on: '2026-11-11',
  },
  {
    what: 'the Hyprland Super alias depends on the user config',
    file: 'guide/keyboard-shortcuts.md',
    contains: ['**Super** also presses a **Ctrl** chord', 'depends on your config', 'no alias'],
    why: 'Super aliases every Linux chord Hyprland binds leave free, read at startup; web, Windows and other Linux desktops get none.',
    verifiedAgainst: 'diagrammo-app/src/lib/shortcut-aliases.ts (hyprlandFreeChords, isAliasChord)',
    on: '2026-11-11',
  },
  {
    what: 'Getting Started states the file-tree focus for the new-file chord',
    file: 'guide/index.md',
    contains: ['focus the file tree and press **Cmd + N** (**Alt + N** in the web editor)'],
    why: 'Alt+N works only with the file tree focused; the shortcuts page already says so.',
    verifiedAgainst: 'guide/keyboard-shortcuts.md (file tree focus paragraph)',
    on: '2026-11-11',
  },
  {
    what: 'the gantt guide says lane-by alone sets an embed\'s banding',
    file: 'guide/chart-gantt.md',
    contains: ['has no swimlane picker. The `lane-by` line in the source is the only thing that sets its banding'],
    why: 'Embeds have no picker (decided 2026-10-09), so lane-by in the source is the only control a reader has (#1371).',
    verifiedAgainst: 'dgmo tests/embed-lane-by.test.ts at a699c4a9 (#1370)',
    on: '2026-11-11',
  },
  {
    what: 'the timeline guide says lane-by alone sets an embed\'s banding',
    file: 'guide/chart-timeline.md',
    contains: ['has no swimlane picker. The `lane-by` line in the source is the only thing that sets its banding'],
    why: 'Embeds have no picker (decided 2026-10-09), so lane-by in the source is the only control a reader has (#1371).',
    verifiedAgainst: 'dgmo tests/embed-lane-by.test.ts at a699c4a9 (#1370)',
    on: '2026-11-11',
  },
  {
    what: 'the radial flag is in the mindmap Options table',
    file: 'guide/chart-mindmap.md',
    contains: ['| `radial` | Bare flag', 'mindmap Voyage Plan\nradial\n'],
    why: 'A bare `radial` line lays a mindmap out in rings (#1843). Without the row a reader has no way to learn it exists.',
    verifiedAgainst: 'dgmo src/mindmap/parser.ts and tests/mindmap-radial.test.ts at 6fe4a0e4 (#1843)',
    on: '2026-11-15',
  },
  {
    what: 'the radial mindmap example sets the flag on its own line before content',
    file: 'examples/mindmap/mindmap-radial.dgmo',
    contains: ["mindmap The Black Gull's Crew\nradial\n"],
    why: 'The issue (#1843) is done only when dgmo-content carries a radial mindmap example; the flag must sit before content or it is read as a node.',
    verifiedAgainst: 'dgmo src/mindmap/parser.ts at 6fe4a0e4 (#1843)',
    on: '2026-11-15',
  },
  {
    what: 'the all-chart-types showcase embeds the radial mindmap',
    file: 'examples/all-chart-types.src.md',
    contains: ['### Radial mindmap\n\n![[mindmap/mindmap-radial.dgmo]]'],
    why: 'The showcase is where a reader sees every type and variant side by side, as treemap sunburst is (#1843).',
    verifiedAgainst: 'examples/all-chart-types.src.md treemap sunburst entry (renamed from radial, #1857)',
    on: '2026-11-15',
  },
  {
    what: 'the swimlane guide has a BPMN section with the element card as a table',
    file: 'guide/chart-swimlane.md',
    contains: [
      '## BPMN',
      '| Boundary event | an event indented under a task: `(5 days) timer -> X` |',
      '| Outside party (collapsed) | `pool Customer` with no lanes |',
      '| Message flow | `A ~> B` |',
    ],
    why: 'The BPMN extension (#1874) is done only when the swimlane guide carries a BPMN section with the element card as a table.',
    verifiedAgainst: 'dgmo src/swimlane/parser.ts and tests/swimlane-parser.test.ts on branch feat/swimlane-bpmn (#1874)',
    on: '2026-11-16',
  },
  {
    what: 'the guide says end events are thick single circles, not double rings',
    file: 'guide/chart-swimlane.md',
    contains: ['an **end** (thick circle), and anything in between is **mid-flow** (double ring)'],
    why: 'The BPMN extension (#1874) moved the double ring to mid-flow events only; an end event is one thick circle.',
    verifiedAgainst: 'dgmo src/swimlane/renderer.ts on branch feat/swimlane-bpmn (#1874)',
    on: '2026-11-16',
  },
  {
    what: 'the claims process is the swimlane-bpmn example and in the showcase',
    file: 'examples/all-chart-types.src.md',
    contains: ['![[swimlane/swimlane-bpmn.dgmo]]'],
    why: 'The issue (#1874) is done only when dgmo-content carries the claims process as swimlane-bpmn.dgmo.',
    verifiedAgainst: 'examples/swimlane/swimlane-bpmn.dgmo (copy of dgmo tests/fixtures/swimlane-bpmn.dgmo)',
    on: '2026-11-16',
  },
  {
    what: 'the bar guide has a mirror section and a mirror row in its Metadata Keys table',
    file: 'guide/chart-bar.md',
    contains: [
      '### Mirror — butterfly and population pyramid',
      '\nmirror\n  Black Gull purple\n  Red Kraken teal\n',
      'exactly two series',
      '| `mirror` | Two series drawn back to back from a centre gutter (see above) | No |',
    ],
    why: 'The butterfly row (#1878) is done only when the bar guide documents `mirror`; slice 1 landed the parser and renderer with no guide text.',
    verifiedAgainst: 'dgmo src/chart.ts settleMirror and docs/language-reference.md mirror section at f004d770 (#1878)',
    on: '2026-11-19',
  },
  {
    what: 'the bar-mirror example declares the mirror block with exactly two series',
    file: 'examples/bar/bar-mirror.dgmo',
    contains: ['\nmirror\n  Deserted red\n  Signed on green\n\n'],
    why: 'The butterfly row (#1878) needs an example under examples/bar/ for its registry variant.',
    verifiedAgainst: 'examples/bar/bar-mirror.dgmo after the owner picked marquee redraw version 1 (#2282)',
    on: '2026-11-25',
  },
  {
    what: 'the bar guide has a combo section and a `mark:` row in its Metadata Keys table',
    file: 'guide/chart-bar.md',
    contains: [
      '### Combo — lines over bars, `mark:`',
      '    Hit Rate red mark: line\n',
      'It is left out of the',
      '| `mark:` | On a `stack` or `group` series line: `line` or `step` draws it as a line over the bars (see above) | No |',
    ],
    why: 'The combo row (#1852) is done only when both host guides document `mark:`; slices 1 and 2 landed the parser and renderer with no guide text.',
    verifiedAgainst: 'dgmo src/chart.ts settleBarCombo and docs/language-reference.md combo sections at 0685b9e2 (#1852)',
    on: '2026-11-19',
  },
  {
    what: 'the line guide has a combo section and a `mark:` row in its Metadata Keys table',
    file: 'guide/chart-line.md',
    contains: [
      '## Combo — bars and lines, `mark:`',
      '    Plunder orange mark: bar\n',
      '| `mark:` | On a series line: `bar`, `line` (default) or `step` — how that series is drawn (see above) | No |',
    ],
    why: 'The combo row (#1852) is done only when both host guides document `mark:`.',
    verifiedAgainst: 'dgmo tests/combo-mark.test.ts and gallery/fixtures/line-combo.dgmo at 0685b9e2 (#1852)',
    on: '2026-11-19',
  },  {
    what: 'the slope guide documents `rank` (the bump chart)',
    file: 'guide/chart-slope.md',
    contains: [
      '## Rank over time — `rank` (bump chart)',
      'Every value must be a whole number from 1.',
      'Two items with the same position in one period sit side by side on that row.',
      '**`y-axis` has no effect** under `rank` and warns.',
    ],
    why: 'The bump-chart row (#1854) is done only when the guide documents `rank`; its dgmo slice landed the parser and renderer with no guide text.',
    verifiedAgainst: 'dgmo tests/slope-rank.test.ts and gallery/fixtures/slope-rank.dgmo at 7385f242 (#1854)',
    on: '2026-11-21',
  },
  {
    what: 'the sankey guide documents alluvial mode (`period` + path rows)',
    file: 'guide/chart-sankey.md',
    contains: [
      '## Who moved where — `period` (alluvial)',
      'A path with more or fewer steps than the periods is an error',
      '**A band keeps the colour of its first-column category**',
      '**Path rows only.**',
    ],
    why: 'The alluvial row (#1858) is done only when the guide documents the mode; its dgmo slice landed the parser and renderer with no guide text.',
    verifiedAgainst: 'dgmo tests/sankey-alluvial.test.ts and gallery/fixtures/sankey-alluvial.dgmo (#1858)',
    on: '2026-11-21',
  },
  {
    what: 'the bar guide has a small-multiples section and `facet` rows in its Metadata Keys table',
    file: 'guide/chart-bar.md',
    contains: [
      '### Small multiples — `facet`',
      '| `facet` | One panel per `group` series, in a grid — small multiples (see above) | No |',
    ],
    why: 'The small-multiples row (#1853) is done only when the guides document `facet`; slice 1 landed the parser and renderer with no guide text.',
    verifiedAgainst: 'dgmo tests/chart-facet.test.ts and gallery/fixtures/bar-facet.dgmo at 09fcd21c (#1853)',
    on: '2026-11-24',
  },
  {
    what: 'the line guide has a small-multiples section and `facet` rows in its Metadata Keys table',
    file: 'guide/chart-line.md',
    contains: [
      '## Small multiples — `facet`',
      '| `no-context` | With `facet`: no grey lines for the other series | No |',
    ],
    why: 'The small-multiples row (#1853) is done only when the guides document `facet`.',
    verifiedAgainst: 'dgmo tests/chart-facet.test.ts and gallery/fixtures/line-facet.dgmo at 09fcd21c (#1853)',
    on: '2026-11-24',
  },
  {
    what: 'the pie guide has a Slice colours section that covers pie and waffle',
    file: 'guide/chart-pie.md',
    contains: [
      '## Slice colours',
      'put a colour word between its name and its value',
      'Tortuga purple    5400',
      'The same rows work with `waffle`',
      'A chosen colour does not show in these cases:',
      '`other-below` combines two or more rows',
      'merge its smallest rows into one grey group',
      'too small to get a square',
    ],
    why: 'A user asked from inside the app how to colour pie and waffle slices (#2314); the parser took a colour word on a data row and the guide never said so.',
    verifiedAgainst: 'dgmo src/charts-d3/pie.ts and waffle.ts (row colour, else palette) at a29330ae (#2314)',
    on: '2026-11-24',
  },
  {
    what: 'the pie-colors example colours some rows and leaves others automatic',
    file: 'examples/pie/pie-colors.dgmo',
    contains: ['Tortuga purple    5400', 'Nassau orange     3100', 'Port Royal        2200'],
    why: 'The pie colour row (#2314) is done only when a pie-colors example exists.',
    verifiedAgainst: 'dgmo parseChart on the file at a29330ae (#2314)',
    on: '2026-11-24',
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

/**
 * Install commands a guide must not print. The guides give one install line,
 * npm, which works on macOS and Linux; Homebrew and pacman live on
 * diagrammo.app/dev, which a guide links to rather than repeats (#921, #1015).
 */
const NOT_IN_GUIDES = ['brew install', 'brew tap'];

test('no guide page gives a Homebrew install command', () => {
  const pages = guidePages();
  assert.ok(pages.length > 0, 'guide/ holds no .md pages — the sweep would pass by finding nothing.');
  const offenders = pages.filter((p) => NOT_IN_GUIDES.some((cmd) => read(p).includes(cmd)));
  assert.deepEqual(
    offenders,
    [],
    `These guide pages still print a Homebrew install command: ${offenders.join(', ')}. Lead with npm and link https://diagrammo.app/dev#cli for Homebrew and pacman.`,
  );
});
