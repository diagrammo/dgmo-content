# dgmo-content

Shared content for the DGMO ecosystem — no build, no package, no dependencies. It ships three things as-is: `examples/` (one folder per chart type, `.dgmo` sources), `guide/` (one `chart-*.md` per type), and `registry.json`, the hand-curated canonical entity table (types, variants, keywords, guidance) that the guides and the MCP trigger vocabulary are projected from.

## How it's consumed

- **Marketing site** — git submodule at `diagrammo_app_site/content/`. Its build runs `git submodule update --init --remote content`, so the site builds from this repo's **latest `main`, not the pinned commit**. Push content changes here first or they don't ship.
- **Desktop app + web editor** — symlink `diagrammo-app/packages/content/` → `../../dgmo-content`. Not a submodule; there is nothing to bump.
- 🔴 **Pushing here no longer ships anything to the site.** `.github/workflows/dispatch-site-deploy.yml` still repository-dispatches on `examples/**` or `guide/**`, but the site repo's Actions are billing-blocked — its jobs have not started since 2026-07-27, so the dispatch lands and nothing runs. A content change reaches production only when someone runs `pnpm build && npx wrangler deploy` in `diagrammo_app_site` afterwards. Checked 2026-07-31.

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
