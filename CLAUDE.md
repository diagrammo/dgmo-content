# dgmo-content

Shared content for the DGMO ecosystem — no build, no package, no dependencies. It ships three things as-is: `examples/` (one folder per chart type, `.dgmo` sources), `guide/` (one `chart-*.md` per type), and `registry.json`, the hand-curated canonical entity table (types, variants, keywords, guidance) that the guides and the MCP trigger vocabulary are projected from.

## How it's consumed

- **Marketing site** — git submodule at `diagrammo_app_site/content/`. The site builds from that **checked-out submodule**, i.e. the pinned commit — nothing in its `prebuild`/`build` runs `git submodule update --remote` (verified 2026-08-24; the `--remote` step belonged to the `deploy.yml` deleted 2026-08-18). Pushing here is therefore only step one; see the deploy path below.
- **Desktop app + web editor** — symlink `diagrammo-app/packages/content/` → `../../dgmo-content`. Not a submodule; there is nothing to bump.
- 🔴 **A push here reaches the marketing site only when a person deploys it.** `dispatch-site-deploy.yml` used to repository-dispatch the site on `examples/**` or `guide/**` changes; both it and the site's `deploy.yml` it pinged were **deleted 2026-08-18**, because that repo is private and its Actions runs are billing-blocked — the chain had shipped nothing. After changing an example or a guide: push here first, then in `diagrammo_app_site` advance the pin — `git -C content fetch origin main && git -C content checkout <sha>`, `git add content`, commit — then `pnpm build && npx wrangler deploy`. 🔴 **Skip the pin and the deploy succeeds while shipping the old content.** Verify against the live page with the edge cache bypassed (`-H 'Cache-Control: no-cache'` plus a `?cb=` param), not against the build log.

## Content rules

- **Examples under `examples/` are pirate-themed by default** — crews, ships, voyages, treasure — EXCEPT the real-or-live-data types (countdown, clock, bracket, map, goal), which use believable real-world content. Sandbox and gallery fixtures are exempt.
- `docs/dgmo-language-spec.md` in the workspace root is authoritative. Verify new syntax against the spec and the parser, never against a neighbouring example.
- Every example lives in the `examples/<type>/` folder matching its registry category — `check-example-categories.mjs` enforces it.
- `registry.json` is the source; `guide/` and the guidance in the language reference are **projections**. Edit the registry and re-project, don't hand-edit the derived files.

## Before committing

```bash
node scripts/check-all.mjs               # registry · projections · categories · directives · cross-refs · embeds
pnpm -C ../diagrammo-app validate:dgmo   # every .dgmo file and ```dgmo fence
```

`scripts/validate-dgmo.mjs` can't run from here — it resolves `@diagrammo/dgmo` from the *invoking* repo, and this one has no `node_modules`. Run it through a consumer's `validate:dgmo` script (the app, or the site, which also validates its own pages). ⚠️ `dgmo file.dgmo --json` is **not** a validation command — it renders a PNG as a side effect. The MCP trigger-vocabulary guard lives in the sibling repo: `pnpm -C ../dgmo-mcp check:triggers`.
