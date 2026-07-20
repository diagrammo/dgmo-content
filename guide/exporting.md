# Exporting Diagrams

Every diagram ends up somewhere — a blog post, a slide, a README, a social card. This page covers choosing a format, controlling the background and colors, and the one thing you can't control yet.

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

The default is PNG because it works everywhere. Reach for SVG whenever the destination accepts it — it's smaller, sharper, and immune to the resolution limit described below.

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

`--palette` picks the color set. This is what "the active palette" means everywhere else in the docs — it's set at render time, not in the diagram source.

```bash
dgmo diagram.dgmo --palette nord
dgmo diagram.dgmo --palette catppuccin --theme dark
```

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

`slate` is used if you don't pass anything. An unknown name is rejected with the valid list, so you can always jog your memory with a deliberate typo — or just run `dgmo --help`.

Palette and theme are independent: every palette has a light and a dark rendering, and any palette can be exported transparent. See [Colors](colors.md) for what each of the named colors looks like in every palette.

## Output size

**Output size is not currently controllable.** There is no `--width`, `--height`, `--scale`, or `--dpi` flag — passing one is an error, not a silently-ignored option.

What you get instead: the diagram is laid out at a natural size determined by its content, and PNG export renders that at **2x**. A diagram whose natural size is 1200x800 comes out as a 2400x1600 PNG. That is retina-sharp for normal document and slide use, and it's plenty for most social cards.

Where it bites is anything large — a poster, a wide banner, a diagram blown up to fill a projected slide. At those sizes 2x PNG will start to look soft and you have no flag to push it further.

**Use SVG when you need to scale.** SVG has no resolution at all; it renders sharp at any size, and every downstream tool that accepts it can resize it losslessly. If you must have a large raster, export SVG and convert it at whatever size you want with a separate image tool.

A resolution flag doesn't exist yet. SVG is the workaround, and for most destinations it's the better answer anyway.

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
