# Exporting Diagrams

Every diagram ends up somewhere — a blog post, a slide, a README, a social card. This page covers choosing a format, controlling the background and colors, and setting the size.

Two things decide how an export looks: which palette (the color set) and which theme (the background and ink). The palette comes from the first of these that is set. The theme then adds a light, dark or transparent background.

```dgmo
flowchart What Decides the Look
direction-lr

(dgmo export) -> [Palette: flag, else file line, else slate] -> [Theme: light, dark or transparent] -> /PNG or SVG/
```

This order is the command line's: the flag is `--palette`. The desktop app works differently — its exports always use the **Export palette** setting, and a file's own `palette` line has no effect there today. The app can also export PDF and HTML; see [Exporting from the app](#exporting-from-the-app).

The shortest version:

```bash
dgmo diagram.dgmo                      # → diagram.png in the current directory
dgmo diagram.dgmo -o diagram.svg       # → SVG
```

Format is inferred from the extension you give `-o`. `.svg` produces SVG; anything else produces PNG. With no `-o` at all you get `<input>.png` next to where you ran the command. Piping in from stdin with no `-o` writes PNG to stdout, which is how you feed a diagram straight into another tool:

```bash
cat diagram.dgmo | dgmo > diagram.png
```

## PNG or SVG

| Going where | Use | Why |
| ----------- | --- | --- |
| Blog post, docs page | **SVG** | Scales to any screen, stays crisp on retina, small file |
| Slides (Keynote, Google Slides, PowerPoint) | **SVG** if the tool accepts it, else PNG | Slides get projected and resized; vector survives it |
| Social (X, LinkedIn, Slack) | **PNG** | Most social platforms won't accept or preview SVG at all |
| GitHub README, wiki, issue | **SVG** or PNG | Both render; SVG looks better and stays sharp |
| Print, posters, anything large | **SVG** | The only format that scales up without going soft |

The default is PNG because it works everywhere. Reach for SVG whenever the destination accepts it — it's smaller, sharper, and immune to the fixed PNG resolution described below.

One caveat for SVG: text is rendered as real text in a specific font. If the viewing environment doesn't have that font, letters may shift slightly. PNG bakes the type in, so it always looks exactly as rendered. If pixel-exact typography matters more than sharpness, use PNG.

## Backgrounds and themes

`--theme` controls the background and the ink:

```bash
dgmo diagram.dgmo --theme light         # default — light background
dgmo diagram.dgmo --theme dark          # dark background, light ink
dgmo diagram.dgmo --theme transparent   # no background at all
```

**`transparent` is the one to know about.** It produces a diagram with no background fill — a genuinely transparent PNG (real alpha channel) or an SVG with no background. Drop it onto any surface and it takes on whatever is behind it: a colored slide, a patterned header, a page whose background you don't control.

```bash
dgmo diagram.dgmo --theme transparent -o diagram.png
```

This is what you want for slides almost every time. A light-theme PNG on a slide gives you a white rectangle floating on your deck; a transparent one just shows the diagram.

**The honest caveat:** `transparent` uses the *light* theme's ink — dark text, dark strokes. It's built to sit on a light or mid-tone surface. On a dark slide the text will be nearly invisible. There is no "dark transparent" combination today; `--theme dark` always paints its own dark background. If your destination is dark, export with `--theme dark` and accept the background, or place the dark-theme image on a matching dark surface so the seam doesn't show.

## Palettes

`--palette` picks the color set. It beats any palette the diagram names for itself:

```bash
dgmo diagram.dgmo --palette nord
dgmo diagram.dgmo --palette catppuccin --theme dark
```

Without the flag, a diagram can carry its own `palette` line (for example `palette nord` at the bottom of the file), and that is used. With neither, you get `slate`. A `palette <name> dark` line also pins the diagram to dark, whatever `--theme` says.

The palettes that ship:

| Palette | Character |
| ------- | --------- |
| `slate` | The default — muted, professional, safe on any background |
| `nord` | Cool arctic blues and soft frost tones |
| `atlas` | Warm earth tones, parchment feel |
| `blueprint` | Deep technical blues, drafting-table look |
| `catppuccin` | Bright saturated pastels, high contrast |
| `tidewater` | Desaturated coastal blues and greens |
| `tokyo-night` | Vivid neons, strongest in dark theme |

An unknown `--palette` name is rejected with the valid list. Run `dgmo --help` to see it.

Palette and theme are independent: every palette has a light and a dark rendering, and any palette can be exported transparent. A diagram can also embed its own custom palette, and the desktop app reads custom palettes from a theme folder. [Colors](colors.md) shows what each named color looks like in every palette.

## Output size

`--width` and `--height` set the canvas size in pixels:

```bash
dgmo diagram.dgmo --width 1600 -o wide.svg
```

Many chart types size themselves from their content. For those, `--width` is a maximum, and `dgmo` warns if the content does not fit. Most chart types work out the height from the content and ignore `--height`.

PNG export always renders at **2x**. A diagram laid out at 1200x800 comes out as a 2400x1600 PNG. That is sharp enough for documents, slides and social cards, and there is no flag to push it further.

**Use SVG when you need to scale.** SVG has no resolution at all; it renders sharp at any size, and every downstream tool that accepts it can resize it losslessly. For a very large raster, export SVG and convert it with a separate image tool.

## Other flags worth knowing

- **`--now <instant>`** pins "now" for `clock` and `countdown` diagrams, so the output is reproducible. A countdown file is a snapshot of the moment you exported it, and `dgmo` says so.
- **`--json`** prints structured output for scripts instead of plain messages. With `--json`, a diagram error exits with a non-zero code. Without it, `dgmo` prints the errors and still writes a file that shows an error card.
- **WebP images** cannot be drawn into a PNG. They show as placeholders, with one warning. Export SVG to keep them.

## Share links

To hand someone a diagram without exporting a file at all:

```bash
dgmo share diagram.dgmo
```

This prints a URL that opens the diagram in the online editor, and copies it to your clipboard at the same time. The whole diagram is encoded in the URL itself — nothing is uploaded and no account is involved, so the link works for anyone who clicks it.

```bash
dgmo share diagram.dgmo --no-copy    # print only, don't touch the clipboard
dgmo share diagram.dgmo --json       # structured output for scripts
```

Share links are ideal for review — paste one into a pull request, a chat message, or a ticket and the other person sees the rendered diagram *and* can edit it. Because the source is packed into the URL, very large diagrams can exceed the URL length limit; if that happens, export a file instead.

## Exporting from the app

In the desktop app and the web editor, **Share…** (**⌘ + E**, or Ctrl + E) opens the Share dialog. Its Picture row exports the open diagram:

- **Format:** PNG, SVG, PDF or HTML. HTML takes an optional page title.
- **Width:** 800, 1200 or 1600 pixels.
- **Transparent background:** PNG and SVG only.
- **Save…** writes a file. **Copy** puts a PNG on the clipboard (PNG only). **File → Copy as PNG** does the same from the menu.

Palette and theme come from Settings. **Export palette** chooses the palette, and its light, dark or auto switch chooses the theme. The app does not read a file's own `palette` line; only the command line and docs-site plugins do.

The dialog also has a **Snapshot link** row with Copy, Open and a QR code. It is the same link `dgmo share` prints, and it carries the palette you chose unless the link would grow too long. **File → Copy Snapshot Link** (**⌘ + Shift + L**) copies it in one step. A **Live link** stays current as you edit; see [Live links](live-links.md).

## Doing it for a whole directory

`dgmo` renders one file per invocation — there is no glob or batch mode. Use a shell loop:

```bash
for f in *.dgmo; do
  dgmo "$f" -o "${f%.dgmo}.svg"
done
```

See [Diagrams in your repo](diagrams-in-your-repo.md) for the CI-ready version of this, plus how to check diagrams for errors before they ship.

## Next

- **Then:** [Diagrams in your repo](diagrams-in-your-repo.md) · [Colors](colors.md) · [How DGMO thinks](how-dgmo-thinks.md)
- **Instead of a file:** [Live links](live-links.md) · [Showing on the web](showing-on-the-web.md)
