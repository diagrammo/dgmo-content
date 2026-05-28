# Markdown Syntax

Diagrammo supports `.md` files with GitHub Flavored Markdown plus math expressions. This page covers the supported syntax with rendered examples.

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

Use triple backticks with an optional language tag for syntax highlighting:

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

## Math (KaTeX)

Inline math with single dollar signs: `$E = mc^2$` renders as $E = mc^2$.

Display math with double dollar signs:

```
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

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

## Not Supported

The following standard markdown features are **not** available:

- Footnotes
- Definition lists
- Abbreviations
- Custom HTML attributes
