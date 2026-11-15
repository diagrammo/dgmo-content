# Exporting Diagrams

Every diagram ends up somewhere — a blog post, a slide, a README, a social card. This page covers choosing a format, controlling the background and colors, and setting the size.

Two things decide how an export looks: which palette (the color set) and which theme (the background and ink). The palette comes from the first of these that is set. The theme then adds a light, dark or transparent background.

```dgmo
flowchart What Decides the Look

(dgmo export) -> [Palette: flag, else file line, else slate] -> [Theme: light, dark or transparent] -> /PNG, SVG or PDF/
```

This order is the command line's: the flag is `--palette`. The desktop app has no flag. There, a file's own `palette` line wins, and the **Export palette** setting takes the place of slate. The app can also export HTML; see [Exporting from the app](#exporting-from-the-app).

The shortest version:

```bash
dgmo diagram.dgmo                      # → diagram.png in the current directory
dgmo diagram.dgmo -o diagram.svg       # → SVG
```

Format is inferred from the extension you give `-o`. `.svg` produces SVG, `.pdf` produces a one-page PDF, and anything else produces PNG. With no `-o` at all you get `<input>.png` next to where you ran the command. Piping in from stdin with no `-o` writes PNG to stdout, which is how you feed a diagram straight into another tool:

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

The default is PNG because it works everywhere. Reach for SVG whenever the destination accepts it — it's smaller, sharper, and has no pixel size at all.

An SVG keeps its text as real text, so it stays selectable and searchable. The file carries the Inter font it is drawn in, so it looks the same on a machine that does not have Inter installed.

For print shops and vector editors such as Illustrator or Inkscape, add `--outline-text`. Every label becomes a filled shape, so the file needs no font at all:

```bash
dgmo diagram.dgmo --outline-text -o print.svg
```

The text can then no longer be selected or edited as text, and the file is about three times larger. `--outline-text` applies to SVG only.

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

Chart types that lay out onto the canvas come back exactly the size you ask for when you give both `--width` and `--height`. Among them are the data charts (bar, line, scatter and the rest), pie, polar area, radar, funnel, venn, sankey and both treemaps:

```bash
dgmo pie.dgmo --width 1000 --height 600 -o card.svg   # a 1000x600 SVG
```

Chart types that size themselves from their content, such as flowchart and sequence, treat `--width` as a maximum and ignore `--height`. `dgmo` warns if the content does not fit.

PNG export renders at **2x** unless you say otherwise. A diagram laid out at 1200x800 comes out as a 2400x1600 PNG. That is sharp enough for documents, slides and social cards.

`--scale <n>` sets how many PNG pixels each canvas pixel becomes:

```bash
dgmo diagram.dgmo --scale 3 -o print.png   # 1200x800 canvas → 3600x2400 PNG
dgmo diagram.dgmo --scale 1 -o small.png   # 1200x800 canvas → 1200x800 PNG
```

Any positive number works, fractions included: `--scale 1.5` turns 1200x800 into 1800x1200. The layout does not change, only the pixel count. `--scale` applies to PNG and PDF; with an `.svg` output `dgmo` warns and writes the SVG as usual.

`dgmo` rasterises at most 16384 x 16384 pixels (268,435,456 in all). A `--scale` that would pass that exits with code 1 and names the largest scale that fits the diagram, for example `This 480x390 diagram fits up to --scale 37.86.`

`-o file.pdf` writes a one-page PDF. The page is the canvas at 96 dpi, so a 1200x800 canvas is a 900x600 pt page whatever the scale. The diagram is one image on that page, drawn at `--scale` pixels per canvas pixel (default 2), so a higher scale gives a sharper PDF on the same page:

```bash
dgmo diagram.dgmo -o diagram.pdf             # 1200x800 canvas → 900x600 pt page
dgmo diagram.dgmo --scale 4 -o print.pdf     # same page, twice the image resolution
```

A PDF has no transparent background. With `--theme transparent`, `dgmo` warns and draws the diagram on the light background.

**Use SVG when you need to scale without limit.** SVG has no resolution at all; it renders sharp at any size, and every downstream tool that accepts it can resize it losslessly.

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

Palette and theme come from Settings unless the file names its own. **Export palette** chooses the palette, and its light, dark or auto switch chooses the theme. A file's own `palette` line beats the setting: with `palette nord` the export is Nord whatever **Export palette** says, and `palette nord dark` also makes it dark. A file with no `palette` line uses the setting.

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
