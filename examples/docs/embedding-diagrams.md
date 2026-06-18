# Embedding Diagrams

Keep a diagram in its own `.dgmo` file and pull it into any Markdown note with
the Obsidian-style embed syntax — put `![[the-file.dgmo]]` on its own line:

![[chests-by-voyage.dgmo]]

The note above holds only a **reference**. The diagram lives in
`chests-by-voyage.dgmo`, right next to this file. Edit that file once and every
note that embeds it updates. Hover the diagram and click the ↗ button to open the
source in the editor.

## How it works

- Put `![[path/to/diagram.dgmo]]` on its own line — that's the whole syntax.
- The path resolves relative to **this note's folder**, so a sibling file is
  just `![[chests-by-voyage.dgmo]]`, and a file one folder up is
  `![[../Data/bar.dgmo]]`.
- Only `.dgmo` targets are embedded. Other `![[...]]` links are left untouched.

## When to embed vs. inline

Embedding shines when the **same diagram appears in several notes**, or when you
want to keep editing it in the full diagram editor. If a diagram belongs to just
one note, a fenced block keeps the source right where you read it:

```dgmo
pie Crew Roles
Gunners 4
Riggers 6
Cooks 2
Lookouts 3
```

Both render live as you type — pick whichever keeps your notes easiest to
maintain.
