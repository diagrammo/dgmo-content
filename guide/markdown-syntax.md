# DGMO in Markdown

Diagrammo opens `.md` files and previews them with GitHub Flavored Markdown (GFM). A `dgmo` code fence or a `![[file.dgmo]]` embed draws a live diagram right inside the note. This page covers the supported syntax with rendered examples.

## Text Formatting

| Syntax | Result |
| --- | --- |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `inline code` `` | `inline code` |

## Headings

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Links

```
[Link text](https://example.com)
```

Renders as: [Link text](https://example.com)

## Lists

### Unordered

```
- First item
- Second item
  - Nested item
- Third item
```

- First item
- Second item
  - Nested item
- Third item

### Ordered

```
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

### Task Lists

```
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

The preview shows checkboxes read-only. To tick one, edit the `[ ]` in the source.

## Blockquotes

```
> This is a blockquote.
> It can span multiple lines.
```

> This is a blockquote.
> It can span multiple lines.

## Tables

```
| Column A | Column B | Column C |
| --- | --- | --- |
| Row 1 | Data | Data |
| Row 2 | Data | Data |
```

| Column A | Column B | Column C |
| --- | --- | --- |
| Row 1 | Data | Data |
| Row 2 | Data | Data |

## Code Blocks

Use triple backticks with an optional language tag for syntax highlighting. Highlighting covers the common languages of the highlight.js library:

````
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

## Horizontal Rules

```
---
```

---

## Images

```
![Alt text](path/to/image.png)
```

Images are rendered with relative path resolution from the markdown file location.

## Footnotes

```
A claim that needs a source.[^1]

[^1]: The source goes here.
```

The preview shows a small superscript number. The note itself collects at the bottom, with a link back.

## Embedded Diagrams

DGMO diagrams render live when you use the `dgmo` language tag:

````
```dgmo
pie Crew Roles
Captain 1
First Mate 1
Gunner 3
Sailor 8
```
````

```dgmo
pie Crew Roles
Captain 1
First Mate 1
Gunner 3
Sailor 8
```

## Embedding a diagram file

A paragraph that holds only `![[file.dgmo]]` draws that file's diagram. Add `|` and a label to give it an alias.

```
![[auth.dgmo]]

![[../diagrams/auth.dgmo|Auth flow]]
```

The embed works for `.dgmo` files only, and only as a paragraph of its own. Inline, it stays plain text. Obsidian users know this form already.

## Wiki links

Double square brackets link to another note by name. The link resolves to a `.md` file with that name.

```
[[Other Note]]
[[notes/Plan|Roadmap]]
[[Note#Section]]
```

## Editing a diagram inside a note

A `dgmo` fence is editable in place. To open it for full editing, click the icon in the gutter beside the opening line, press **Cmd + Shift + .**, or press **Enter** on the opening line. Vim mode supports the icon and the shortcut but not Enter.

## Not Supported

The following standard markdown features are **not** available:

- Math (`$E = mc^2$` and `$$ ... $$` stay plain text)
- Definition lists
- Abbreviations
- Raw HTML in the in-app preview — tags show as text. The published docs site does render raw HTML, but do not rely on it in your own notes.
