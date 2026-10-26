# Colors & Palettes

Diagrammo has a small, closed set of named colors — `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, plus the neutrals `gray`, `black`, and `white`. Use them anywhere an element takes a color. There is no way to add a twelfth name; `crimson`, `navy`, and `#3b6ea5` are all rejected on an element. Hex appears in one place only: a custom palette, which redefines what the eleven names look like (see [Your own palette](#your-own-palette)).

The actual shade is resolved from the **active palette**, so the same `blue` looks different in Slate than in Nord — but it's always that palette's considered version of the hue, never a clashing primary. `black` and `white` are theme-relative: each palette picks near-darkest / near-lightest values that stay distinct from the canvas, which means `black` is the strongest mark you can make on a light theme and nearly invisible on a dark one. `white` is the exact reverse. Neither is a fixed ink.

<figure class="col-fig" aria-labelledby="col-fig-cap">
<style>.col-fig{margin:1.5rem 0}.col-fig svg{display:block;width:100%;height:auto;font-family:inherit}.col-fig .col-row{fill:currentColor;fill-opacity:.05;stroke:currentColor;stroke-opacity:.3}.col-fig .col-num{fill:currentColor;fill-opacity:.12}.col-fig .col-t{fill:currentColor;font-size:13px}.col-fig .col-n{fill:currentColor;font-size:12px;font-weight:700}.col-fig .col-h{fill:currentColor;font-size:13px;font-weight:600}.col-fig .col-m{fill:currentColor;fill-opacity:.65;font-size:10px}.col-fig .col-code{font-family:ui-monospace,monospace;font-size:12px}.col-fig .col-ink{stroke:currentColor;stroke-opacity:.45;fill:none;stroke-width:1.4}.col-fig figcaption{font-size:.92em;opacity:.8;margin-top:.5rem}</style>
<svg viewBox="0 0 720 220" role="img" aria-label="Four palette sources in order: an override, the file's palette line, the host's default, then Slate. The first one set picks the palette, which gives the same eleven color names its own shades, shown for Slate and Nord.">
<text class="col-h" x="16" y="18">Which palette — the first one set wins</text>
<rect class="col-row" x="16" y="32" width="270" height="34" rx="7"/>
<circle class="col-num" cx="36" cy="49" r="11"/><text class="col-n" x="36" y="53" text-anchor="middle">1</text>
<text class="col-t" x="56" y="53">An override: <tspan class='col-code'>--palette</tspan> or the host</text>
<path class="col-ink" d="M151 68 v8 M147 72 l4 4 l4 -4"/>
<rect class="col-row" x="16" y="78" width="270" height="34" rx="7"/>
<circle class="col-num" cx="36" cy="95" r="11"/><text class="col-n" x="36" y="99" text-anchor="middle">2</text>
<text class="col-t" x="56" y="99">The file's <tspan class='col-code'>palette</tspan> line</text>
<path class="col-ink" d="M151 114 v8 M147 118 l4 4 l4 -4"/>
<rect class="col-row" x="16" y="124" width="270" height="34" rx="7"/>
<circle class="col-num" cx="36" cy="141" r="11"/><text class="col-n" x="36" y="145" text-anchor="middle">3</text>
<text class="col-t" x="56" y="145">The host's default</text>
<path class="col-ink" d="M151 160 v8 M147 164 l4 4 l4 -4"/>
<rect class="col-row" x="16" y="170" width="270" height="34" rx="7"/>
<circle class="col-num" cx="36" cy="187" r="11"/><text class="col-n" x="36" y="191" text-anchor="middle">4</text>
<text class="col-t" x="56" y="191">Slate</text>
<path class="col-ink" d="M292 117 H340 M334 111 l6 6 l-6 6"/>
<text class="col-m" x="316" y="108" text-anchor="middle">picks</text>
<text class="col-h" x="352" y="18">Same eleven names, that palette's shades</text>
<text class="col-m" x="400" y="52" text-anchor="middle">red</text>
<text class="col-m" x="436" y="52" text-anchor="middle">orange</text>
<text class="col-m" x="472" y="52" text-anchor="middle">yellow</text>
<text class="col-m" x="508" y="52" text-anchor="middle">green</text>
<text class="col-m" x="544" y="52" text-anchor="middle">blue</text>
<text class="col-m" x="580" y="52" text-anchor="middle">purple</text>
<text class="col-m" x="616" y="52" text-anchor="middle">teal</text>
<text class="col-m" x="652" y="52" text-anchor="middle">cyan</text>
<text class="col-m" x="688" y="52" text-anchor="middle">gray</text>
<text class="col-t" x="352" y="86">Slate</text>
<circle cx="400" cy="82" r="13" fill="#c0504d"/>
<circle cx="436" cy="82" r="13" fill="#cc7a33"/>
<circle cx="472" cy="82" r="13" fill="#c9a227"/>
<circle cx="508" cy="82" r="13" fill="#5b9357"/>
<circle cx="544" cy="82" r="13" fill="#3b6ea5"/>
<circle cx="580" cy="82" r="13" fill="#7d5ba6"/>
<circle cx="616" cy="82" r="13" fill="#3a9188"/>
<circle cx="652" cy="82" r="13" fill="#4f96c4"/>
<circle cx="688" cy="82" r="13" fill="#7e8a97"/>
<text class="col-t" x="352" y="140">Nord</text>
<circle cx="400" cy="136" r="13" fill="#bf616a"/>
<circle cx="436" cy="136" r="13" fill="#d08770"/>
<circle cx="472" cy="136" r="13" fill="#ebcb8b"/>
<circle cx="508" cy="136" r="13" fill="#a3be8c"/>
<circle cx="544" cy="136" r="13" fill="#5e81ac"/>
<circle cx="580" cy="136" r="13" fill="#b48ead"/>
<circle cx="616" cy="136" r="13" fill="#8fbcbb"/>
<circle cx="652" cy="136" r="13" fill="#88c0d0"/>
<circle cx="688" cy="136" r="13" fill="#4c566a"/>
<text class="col-m" x="352" y="186">plus black and white, set by each palette for light and dark</text>
</svg>
<figcaption id="col-fig-cap">A diagram names colors; the palette decides what each name looks like.</figcaption>
</figure>

## Where the palette comes from

The first palette source that is set wins:

1. **An override where the diagram is shown.** On the command line this is `--palette <name>`. In code it is the `paletteOverride` option of `render()`.
2. **The file's own `palette` line.** Most files have none.
3. **The host's default** — the palette the page, plugin or tool asks for when it draws.
4. **Slate**, when nothing else is set.

Whichever palette wins, each of the eleven names then resolves to that palette's hex value, in light or dark.

The palettes that ship are `slate` (the default), `nord`, `atlas`, `blueprint`, `catppuccin`, `tidewater`, and `tokyo-night`. [Exporting diagrams](exporting.md) covers `--palette` together with the light, dark and transparent theme.

### The `palette` line

A file can name its palette on a line of its own. The usual place is the bottom of the file, but any line works:

```dgmo-source
// a built-in, in the reader's own light or dark
palette nord
```

Add `dark` or `light` to pin the diagram to one mode: `palette nord dark`.

The line is the same on every chart type, and it never becomes a node or a row. It is lowercase only: `Palette 70` stays a data row. An unknown name draws the diagram in the next source down, with a warning on that line.

### In the desktop app

The app follows the same order, with Settings (**⌘ + ,**) as the host's default: **Editor palette** for the preview, **Export palette** for exports. A file's own `palette` line beats both. With `palette nord`, the preview and every export draw in Nord whatever Settings says, and the preview pane takes Nord's background. The rest of the app keeps the Settings palette. A file with no `palette` line draws in Settings' palette. A share link keeps the file's line in the copy it sends, so the author's choice travels with the diagram.

## Choosing a color

Naming a color is easy. Deciding *which* one is the actual work, and the answer is almost always about how hard you want an element to push.

### What advances, what recedes

Every palette is tuned so no series shouts, so the differences are smaller than in a raw RGB set — but they are consistent, and they are theme-dependent:

- **`gray` is the recede color, in every palette and both themes.** It carries the least color of any hue name — measurably so; in every shipped palette, in both themes, `gray` is the lowest-saturation entry of the eight hues plus itself. That is *why* it recedes: it has no hue competing for attention, so it reads as context rather than as a category. It is not necessarily the palest color; Nord's light `gray` is quite dark. Gray means "still here, not the point."
- **`blue`, `purple`, and `red` advance on a light theme.** In every shipped palette, the strongest-contrasting non-neutral against a light canvas is one of these three. If one element must be read first, it belongs on one of them.
- **`yellow` is the weakest color on a light theme and one of the strongest on a dark one.** In nearly every palette, `yellow` has the lowest contrast against a light canvas of any non-neutral, and the highest against a dark one. `red` runs the opposite way — solid on light, and the *weakest* non-neutral on dark in nearly every palette. **Never put your most important series on `yellow` if the chart might be exported light, or on `red` if it might be exported dark** — and re-check any color-carried emphasis after switching themes, because the ranking genuinely changes.
- **`orange`, `green`, `teal`, and `cyan` are the middle.** Reliable for categories that need to be told apart, unreliable for "look here first."

### What gray is for

`gray` is the background voice. Use it for the elements a chart needs in order to be honest but doesn't want to argue about:

- the comparison baseline — last year's line, the control group, the plan you're measuring against
- the residual bucket — "Other", "Uncategorized", everything below the fold
- the parts of a structure that provide context rather than carrying the message

Doing this deliberately is the single highest-leverage color decision available, because it is what makes everything else look emphasized without you having to shout.

### Building emphasis

Emphasis is contrast *within* one chart, so it has to come from the per-element channel:

```dgmo
treemap Fleet Cargo by Hold

tag Emphasis as e
  Focus blue
  Context gray

Rum 320 e: Focus
Silk 210 e: Context
Spice 180 e: Context
Salt 140 e: Context
```

A **tag group** is the general-purpose tool: declare the group once, then attach a value to each element. It maps meaning to color across the whole chart and adds a labeled legend, so the emphasis is explained rather than merely applied. Where a chart type takes a bare color token on an element or a series, that works too and is quicker; tag groups are the form that works nearly everywhere. See [How DGMO thinks](how-dgmo-thinks.md) for where each form applies.

**One caution:** color is a scarce resource and emphasis spends it. If three of five elements are "emphasized", none of them are.

### The limit you will hit

`fill-tint`, `fill-solid`, and `fill-outline` are **chart-wide** — they set the fill treatment for the entire diagram, not per element. That makes them a *tone* control, not an emphasis control. You cannot solid-fill one bar and outline the rest, so the thing emphasis actually requires — contrast within a single chart — is not available from the fill family. Build emphasis from color choice and tag groups instead.

For genuine emphasis — pushing one element back without recoloring it — two chart types ship a **`dim` / `highlight`** directive that fades everything else while preserving each element's own hue (a red flow that recedes is still red). [`sankey`](chart-sankey.md) has both `dim <name>` and `highlight <name>`; [`family`](chart-family.md) has `highlight <name>`, which dims everyone outside one person's bloodline. Both bake into the exported image — no hover needed. On every other chart type there is no de-emphasis directive yet, so "recede" there still means assigning `gray`.

### Accessibility

**Treat color as a secondary channel, never the only one.** Palettes are tuned for a single perceived weight, which is good for looking calm and bad for telling hues apart under color-vision deficiency — `blue` and `purple` in particular sit close in hue and separate weakly under deuteranopia, and tinted fills push them closer still.

The rule that follows, stated for `family` and true everywhere: **the legend, not the hue, is the guaranteed channel**, because its entries carry text. So when accessibility matters:

- Carry the distinction on a **tag group**, which produces labeled legend entries, rather than on bare color tokens which may not.
- Separate important categories by **lightness as well as hue** — pair a light-theme strong color (`blue`, `purple`, `red`) against `gray`, not `blue` against `teal`.
- Keep the number of color-carried categories small. Beyond a handful, no palette separates reliably for anyone.
- Check the chart in both light and dark, since the contrast ranking flips between them.

## Your own palette

You can't add a color name, but you can change what the eleven names look like. A custom palette gives each name its own hex value, plus twelve **role colors** — the canvas, the panels, the text and the accents around the shapes. There are two ways to bring one in.

### In the file: an embedded palette block

Write `palette` and a name of your own, then an indented block. This file carries a warm light palette called Harbor:

```dgmo
bar Cargo by Hold

Rum 320
Silk 210
Spice 180

palette Harbor
  light
    bg #fbf8f1
    surface #f2ede1
    overlay #ebe4d4
    border #d9cfba
    text #2b2620
    text-muted #6b6152
    text-on-fill-light #ffffff
    text-on-fill-dark #2b2620
    primary #2f5d7c
    secondary #6b6152
    accent #2f7a6d
    destructive #a8432f
    colors
      red #a8432f
      orange #b8682a
      yellow #a88420
      green #4f7d3e
      blue #2f5d7c
      purple #6a4f8a
      teal #2f7a6d
      cyan #3a7f9e
      gray #8a8170
      black #2b2620
      white #f2ede1
```

The rules the block must follow:

- **Sections.** `light`, `dark`, or both. A block with one section draws in that mode only.
- **Role keys.** Each section needs all twelve: `bg surface overlay border text text-muted text-on-fill-light text-on-fill-dark primary secondary accent destructive`.
- **Colors.** A `colors` section needs all eleven names. A twelfth name is refused.
- **Hex only.** This block is the one place DGMO accepts hex.
- **Readable labels.** Text on a tinted fill needs a contrast ratio of at least 4.5:1. Text on a solid fill has a floor too. `black` and `white` are exempt.
- **A name of your own.** You can't reuse a built-in name such as `nord`.

A block that breaks a rule is not an error. The diagram draws in the next source down, and a warning names the line at fault. The palette belongs to that file alone: it is never added to anyone's list of palettes.

### In the desktop app: the theme folder

The desktop app reads custom palettes from a theme folder, one `.json` file per palette:

| System | Folder |
| --- | --- |
| macOS | `~/.diagrammo/themes` |
| Linux | `~/.config/diagrammo/themes` (or `$XDG_CONFIG_HOME/diagrammo/themes`) |
| Windows | `%APPDATA%\diagrammo\themes` |

Create the folder if it is not there. A file holds an `id`, a `name`, and a block of colors per mode. The keys are the role keys in camel case (`textMuted`, `textOnFillLight`), plus `colors`. This is Harbor again, as a light-only theme file:

```json
{
  "id": "harbor",
  "name": "Harbor",
  "mode": "light",
  "light": {
    "bg": "#fbf8f1", "surface": "#f2ede1", "overlay": "#ebe4d4", "border": "#d9cfba",
    "text": "#2b2620", "textMuted": "#6b6152",
    "textOnFillLight": "#ffffff", "textOnFillDark": "#2b2620",
    "primary": "#2f5d7c", "secondary": "#6b6152", "accent": "#2f7a6d", "destructive": "#a8432f",
    "colors": {
      "red": "#a8432f", "orange": "#b8682a", "yellow": "#a88420", "green": "#4f7d3e",
      "blue": "#2f5d7c", "purple": "#6a4f8a", "teal": "#2f7a6d", "cyan": "#3a7f9e",
      "gray": "#8a8170", "black": "#2b2620", "white": "#f2ede1"
    }
  }
}
```

To cover both modes, leave out `mode` and give a `light` and a `dark` block. The rules are the same as for an embedded block, and the `id` can't be a built-in name.

- **It shows up live.** The app watches the folder. A saved file appears in Settings → **Editor palette**, under **Your themes**. A sun or moon beside it marks a one-mode palette, which is listed only while the app is in that mode.
- **Open folder** sits beside the **Your themes** heading once one theme has loaded.
- **A broken file is named.** Settings says which file was not used and why. If the file loaded before, the app keeps showing your last good version.
- **Desktop only.** The web editor can't read a folder on your computer, so it has no theme folder.

## Named Colors

Every name, shown across the palettes that ship:

<table style="width:100%;table-layout:fixed">
<tr><th style="text-align:left;width:12.5%">Name</th><th style="font-size:11px;font-weight:600">Slate</th><th style="font-size:11px;font-weight:600">Nord</th><th style="font-size:11px;font-weight:600">Atlas</th><th style="font-size:11px;font-weight:600">Blueprint</th><th style="font-size:11px;font-weight:600">Catppuccin</th><th style="font-size:11px;font-weight:600">Tidewater</th><th style="font-size:11px;font-weight:600">Tokyo Night</th></tr>
<tr><td><code>red</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c0504d;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#bf616a;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#bf6a52;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c25a4e;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#d20f39;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c1433a;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#f52a65;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>orange</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#cc7a33;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#d08770;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#cf9a5c;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c2823e;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#fe640b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#cc7a38;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#b15c00;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>yellow</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c9a227;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#ebcb8b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#cdb35e;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#c2a843;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#df8e1d;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#d6bf5a;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8c6c3e;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>green</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#5b9357;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#a3be8c;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#7e9a6f;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4f8a6b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#40a02b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4f8a6b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#587539;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>blue</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#3b6ea5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#5e81ac;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#5b7a99;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#1f5e8c;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#1e66f5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#1f4e6b;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#2e7de9;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>purple</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#7d5ba6;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#b48ead;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#9a7fa6;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#6f5e96;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8839ef;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#6a5a8c;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#7847bd;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>teal</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#3a9188;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8fbcbb;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#6fa094;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#3a8a8a;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#179299;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#3d8c8c;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#118c74;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>cyan</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4f96c4;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#88c0d0;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#79a7b5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#3f8fb5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#209fb5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4f9bb5;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#007197;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>gray</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#7e8a97;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4c566a;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8a7d68;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#7e8e98;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#9ca0b0;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8a8d86;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#8990b3;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>black</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#1f2933;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#2e3440;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#463a26;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#123a5e;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#4c4f69;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#18313f;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#1a1b26;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
<tr><td><code>white</code></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#f3f5f8;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#e5e9f0;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#ece0c0;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#e6eef4;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#e6e9ef;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#e0e4e3;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td><td style="text-align:center"><span style="display:inline-block;width:24px;height:24px;background:#d0d5e3;border-radius:5px;border:1px solid rgba(0,0,0,0.12);vertical-align:middle"></span></td></tr>
</table>
