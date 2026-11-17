# Use a Space from CI or an AI Agent

A space API key lets a script, a CI job or an AI agent read and write diagrams in one Diagrammo Cloud space. It needs no sign-in.

Only an owner or admin of the space can make a key.

## Make a key

1. Open the web editor at [online.diagrammo.app](https://online.diagrammo.app).
2. Go to Account, then Spaces, and open the space.
3. Find the API keys section. You also find your keys under Account, then Sign-in & Security.
4. Type what will use the key, for example `CI`. Press "Make a key".
5. Copy the key and the space id beside it. Diagrammo shows the key once.

The key starts with `dgmo_sk_`. It does not say which space it belongs to, so every command also takes the space id.

Keys do not expire. Revoke a key to stop it at once. Each key shows its last use and what it wrote, with the time.

A diagram written through a key is always private. A key cannot publish to the web.

## Use it from the command line

The `dgmo` command comes from `@diagrammo/dgmo-cli`. It reads the key from the environment variable `DGMO_API_KEY`. There is no flag for the key, so it stays out of your shell history and your CI logs.

```bash
export DGMO_API_KEY=dgmo_sk_...

dgmo put architecture.dgmo --space <space-id>
dgmo ls --space <space-id>
dgmo get --space <space-id> --title "Architecture"
```

The commands:

- `dgmo put <file> --space <space-id> [--folder <path>] [--title <title>]` writes a diagram.
- `dgmo get --space <space-id> [--folder <path>] --title <title>` reads a diagram by folder and title.
- `dgmo get --space <space-id> --id <diagram-id>` reads a diagram by id.
- `dgmo ls --space <space-id>` lists the diagrams in the space.

Every command takes `--json`. Every command exits with a non-zero code when it fails. No command asks a question.

## Use it in GitHub Actions

Store the key as a repository secret named `DGMO_API_KEY`. Pass it to the step as an environment variable.

```yaml
name: Publish diagrams
on:
  push:
    branches: [main]

jobs:
  put:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npx @diagrammo/dgmo-cli put docs/architecture.dgmo --space ${{ vars.DGMO_SPACE_ID }}
        env:
          DGMO_API_KEY: ${{ secrets.DGMO_API_KEY }}
```

The space id is not secret. This example keeps it in a repository variable named `DGMO_SPACE_ID`.

## Use it from an AI agent

The MCP server `@diagrammo/dgmo-mcp` has three space tools: `put_space_diagram`, `get_space_diagram` and `list_space_diagrams`. They need `DGMO_API_KEY` in the environment of the server. The tools take the space id as an argument. The key is never a tool argument, so it stays out of the chat transcript.

Add the key to the `env` block of the server in your MCP config:

```json
{
  "mcpServers": {
    "dgmo": {
      "command": "npx",
      "args": ["-y", "@diagrammo/dgmo-mcp"],
      "env": {
        "DGMO_API_KEY": "dgmo_sk_..."
      }
    }
  }
}
```

Give the agent the space id. It then writes and reads diagrams in that space and nowhere else.
