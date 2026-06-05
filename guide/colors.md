# Colors

Diagrammo uses named colors throughout. There are two ways colors appear in diagrams: **inline annotations** directly on elements, and **tags** that map metadata values to colors across many elements at once.

## Named Colors

Eleven color names are available everywhere colors are accepted:

<table>
<tr><th>Name</th><th>Swatch (Nord)</th></tr>
<tr><td><code>red</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#bf616a;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>orange</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#d08770;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>yellow</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#ebcb8b;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>green</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#a3be8c;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>blue</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#5e81ac;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>purple</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#b48ead;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>teal</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#8fbcbb;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>cyan</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#88c0d0;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>gray</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#4c566a;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>black</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#2e3440;border-radius:3px;vertical-align:middle"></span></td></tr>
<tr><td><code>white</code></td><td><span style="display:inline-block;width:20px;height:20px;background:#e5e9f0;border-radius:3px;vertical-align:middle;border:1px solid #d8dee9"></span></td></tr>
</table>

`black` and `white` are theme-stable — each palette picks near-darkest / near-lightest values that stay distinct from the canvas.

Swatches above use Nord values. The actual color rendered depends on your active color scheme — see [Color Schemes](#color-schemes) below.

---

## Color Schemes

Diagrammo includes ten built-in color schemes. Change yours in **Settings**. The same eleven color names resolve to different hex values in each scheme. Swatches show all eleven colors (red → white) for light / dark mode.

<table>
<tr><th>Scheme</th><th style="text-align:center">Light</th><th style="text-align:center">Dark</th></tr>
<tr>
  <td><strong>Atlas</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#f3ead3;padding:4px 6px;border-radius:4px;border:1px solid #bcaa86"><span style="display:inline-block;width:14px;height:14px;background:#bf6a52;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cf9a5c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cdb35e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7e9a6f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5b7a99;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9a7fa6;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6fa094;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#79a7b5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8a7d68;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#463a26;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ece0c0;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#1e2a33;padding:4px 6px;border-radius:4px;border:1px solid #3d4f5c"><span style="display:inline-block;width:14px;height:14px;background:#cf7a60;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d9a96a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d8c074;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9bb588;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7ba0bf;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b59ac0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#85b3a6;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#92bccb;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9a8d76;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#27353f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e8dcc0;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Blueprint</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#f4f8fb;padding:4px 6px;border-radius:4px;border:1px solid #aac3d6"><span style="display:inline-block;width:14px;height:14px;background:#c25a4e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#c2823e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#c2a843;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4f8a6b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1f5e8c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6f5e96;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3a8a8a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3f8fb5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7e8e98;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#123a5e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e6eef4;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#103a5e;padding:4px 6px;border-radius:4px;border:1px solid #3a6f96"><span style="display:inline-block;width:14px;height:14px;background:#e0907e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0ab78;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e3d089;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#93c79e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8ec3e0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b6a6d8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#84c7c2;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9fd6e0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#aebecb;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#16466e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#eaf2f8;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Catppuccin</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#eff1f5;padding:4px 6px;border-radius:4px;border:1px solid #ccd0da"><span style="display:inline-block;width:14px;height:14px;background:#d20f39;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#fe640b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#df8e1d;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#40a02b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1e66f5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8839ef;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#179299;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#04a5e5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9ca0b0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4c4f69;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e6e9ef;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#1e1e2e;padding:4px 6px;border-radius:4px;border:1px solid #45475a"><span style="display:inline-block;width:14px;height:14px;background:#f38ba8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#fab387;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#f9e2af;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#a6e3a1;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#89b4fa;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cba6f7;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#94e2d5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#89dceb;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#a6adc8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#313244;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cdd6f4;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Gruvbox</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#fbf1c7;padding:4px 6px;border-radius:4px;border:1px solid #d5c4a1"><span style="display:inline-block;width:14px;height:14px;background:#9d0006;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#af3a03;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b57614;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#79740e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#076678;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8f3f71;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#427b58;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#689d6a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7c6f64;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3c3836;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ebdbb2;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#282828;padding:4px 6px;border-radius:4px;border:1px solid #504945"><span style="display:inline-block;width:14px;height:14px;background:#fb4934;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#fe8019;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#fabd2f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b8bb26;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#83a598;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d3869b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8ec07c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8ec07c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#928374;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3c3836;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ebdbb2;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Nord</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#eceff4;padding:4px 6px;border-radius:4px;border:1px solid #d8dee9"><span style="display:inline-block;width:14px;height:14px;background:#bf616a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d08770;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ebcb8b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#a3be8c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5e81ac;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b48ead;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8fbcbb;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#88c0d0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4c566a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2e3440;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e5e9f0;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#2e3440;padding:4px 6px;border-radius:4px;border:1px solid #4c566a"><span style="display:inline-block;width:14px;height:14px;background:#bf616a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d08770;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ebcb8b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#a3be8c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5e81ac;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b48ead;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8fbcbb;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#88c0d0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4c566a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3b4252;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#eceff4;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Rosé Pine</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#faf4ed;padding:4px 6px;border-radius:4px;border:1px solid #f2e9e1"><span style="display:inline-block;width:14px;height:14px;background:#b4637a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d7827e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ea9d34;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#286983;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#56949f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#907aa9;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#56949f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#56949f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9893a5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#575279;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#fffaf3;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#191724;padding:4px 6px;border-radius:4px;border:1px solid #26233a"><span style="display:inline-block;width:14px;height:14px;background:#eb6f92;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ea9a97;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#f6c177;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3e8fb0;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9ccfd8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#c4a7e7;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9ccfd8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9ccfd8;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#908caa;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2a273f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0def4;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Slate</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#ffffff;padding:4px 6px;border-radius:4px;border:1px solid #d4dae1"><span style="display:inline-block;width:14px;height:14px;background:#c0504d;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cc7a33;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#c9a227;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5b9357;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3b6ea5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7d5ba6;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3a9188;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4f96c4;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7e8a97;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1f2933;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#f3f5f8;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#161b22;padding:4px 6px;border-radius:4px;border:1px solid #38424f"><span style="display:inline-block;width:14px;height:14px;background:#e07b6e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0975a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d9bd5a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#74b56e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5b9bd5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#a585c9;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#45b3a3;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#62b0d9;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#95a1ae;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#202833;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e6eaef;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Solarized</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#fdf6e3;padding:4px 6px;border-radius:4px;border:1px solid #eee8d5"><span style="display:inline-block;width:14px;height:14px;background:#dc322f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cb4b16;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b58900;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#859900;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#268bd2;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6c71c4;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2aa198;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2aa198;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#93a1a1;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#657b83;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#eee8d5;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#002b36;padding:4px 6px;border-radius:4px;border:1px solid #073642"><span style="display:inline-block;width:14px;height:14px;background:#dc322f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cb4b16;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b58900;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#859900;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#268bd2;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6c71c4;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2aa198;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2aa198;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#586e75;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#073642;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#839496;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Tidewater</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#eceff0;padding:4px 6px;border-radius:4px;border:1px solid #a9b2b3"><span style="display:inline-block;width:14px;height:14px;background:#c1433a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#cc7a38;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d6bf5a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4f8a6b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1f4e6b;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6a5a8c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#3d8c8c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4f9bb5;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8a8d86;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#18313f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0e4e3;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#0f2230;padding:4px 6px;border-radius:4px;border:1px solid #2c4856"><span style="display:inline-block;width:14px;height:14px;background:#e06a5e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#df9a52;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0c662;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#6fb58c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#4f9bc4;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9486bf;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#5cb0ac;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#62b4cf;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9aa39c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#16303f;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e6ebe8;border-radius:2px"></span></span></td>
</tr>
<tr>
  <td><strong>Tokyo Night</strong></td>
  <td><span style="display:inline-flex;gap:2px;background:#d5d6db;padding:4px 6px;border-radius:4px;border:1px solid #9699a3"><span style="display:inline-block;width:14px;height:14px;background:#f52a65;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#b15c00;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8c6c3e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#587539;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#2e7de9;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7847bd;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#118c74;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#007197;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#8990b3;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1a1b26;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#d0d5e3;border-radius:2px"></span></span></td>
  <td><span style="display:inline-flex;gap:2px;background:#1a1b26;padding:4px 6px;border-radius:4px;border:1px solid #3b4261"><span style="display:inline-block;width:14px;height:14px;background:#f7768e;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#ff9e64;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#e0af68;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#9ece6a;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7aa2f7;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#bb9af7;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#1abc9c;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#7dcfff;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#565f89;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#292e42;border-radius:2px"></span><span style="display:inline-block;width:14px;height:14px;background:#c0caf5;border-radius:2px"></span></span></td>
</tr>
</table>

---

## Editor vs Export Palette

Your editor palette and your export palette don't have to match. You might prefer a dark scheme like Tokyo Night or Nord while working — easier on the eyes during long sessions — but switch to a light scheme for exports that will end up in presentations, documentation, or shared links.

Diagrammo lets you set a separate **Export Color Scheme** in **Settings**. When configured, all exports (PNG, SVG, clipboard, share links) use that palette instead of your editor palette. The export theme (light, dark, or transparent background) is also independent and can be set in the **Export** dialog.

If no export palette is set, exports use whatever palette and theme you're currently editing in.

---

## Inline Color Annotations

Type a lowercase color name at the end of a label to color that element. The 11 recognized color names (`red`, `orange`, `yellow`, `green`, `blue`, `purple`, `teal`, `cyan`, `gray`, `black`, `white`) are reserved as trailing tokens — to use one as a literal label, capitalize it (`Red`, `Blue`).

### Flowchart nodes

Append the color inside the node shape, after the label:

```
flowchart Request Pipeline

(Start green) -> [Parse Input] -> <Valid? blue>
  -yes-> [Process teal] -> (Success green)
  -no-> [Error Handler red] -> /Log Error orange/ -> (Failure red)
```

Every node shape supports inline color — rounds `()`, rectangles `[]`, diamonds `<>`, parallelograms `//`, and more. Edges themselves take no color in flowchart, state, or sitemap — color flows through nodes only.

### Timeline eras and markers

```
timeline Project Roadmap

era 2025-01 -> 2025-06 Foundation blue
era 2025-07 -> 2025-12 Growth green

marker 2025-03 Beta Launch orange
marker 2025-09 GA Release purple
```

---

## Tags: Color by Metadata

Tags let you define named groups of values, assign a color to each value, then annotate your diagram elements with metadata. When a tag group is active, every element is colored by its matching value — without scattering color names throughout the diagram.

This is the primary way to color sequence diagrams, org charts, infrastructure diagrams, and timelines.

### Declaring a tag group

```
tag GroupName as g
  Value1 blue
  Value2 green
  Value3 orange default
```

- **`alias g`** — a short alias you use when assigning metadata (optional but recommended)
- **trailing color name** — append a lowercase color to each value
- **`default`** — the fallback value applied to elements that have no explicit tag assignment

You can define multiple tag groups in one diagram. Only one group is "active" (coloring the diagram) at a time — the active group is selected in the diagram legend.

### Assigning metadata to elements

Use `key: Value` after any element to attach metadata:

```
Gateway t: Platform
Redis c: Caching, t: Platform
```

Multiple metadata keys are separated by commas. Use the tag alias as the key.

### Sequence diagrams

Tags color participant boxes, self-messages, and message arrows. The first declared group is shown by default; add `active-tag` only to pick a different group.

```
sequence API Gateway — Infrastructure Concerns

tag Concern as c
  Caching blue
  Auth green
  RateLimiting orange
  BusinessLogic purple default

tag Team as t
  Platform teal
  Product orange
  Security red

Mobile is an actor
Gateway t: Platform
Redis is a cache c: Caching, t: Platform

[Backend] t: Product
  UserAPI
  OrderAPI
  DB is a database

== Authentication ==
Mobile -POST /orders-> Gateway
Gateway -verify token-> Gateway c: Auth
Gateway -check rate limit-> Redis c: RateLimiting

== Business Logic ==
Gateway -POST /orders-> OrderAPI
OrderAPI -INSERT order-> DB
OrderAPI -201 Created-> Gateway

== Response ==
Gateway -cache response-> Redis c: Caching
Gateway -201 Created-> Mobile
```

Elements that share a tag value with the active group are highlighted in that color. Elements with no matching tag are shown in a neutral gray.

### Org charts

Org charts use tag groups to color nodes by any metadata field — location, seniority, status, team, etc. Switch between views using the legend.

```
org Acme Corp

tag Location
  NY blue
  LA yellow
  Remote purple

tag Status
  FTE green
  Contractor orange

Jane Smith
  role: CEO
  location: NY
  status: FTE

  Alex Chen
    role: CTO
    location: LA
    status: FTE

    [Platform Team]
      Alice Park
        role: Senior Engineer
        location: NY
        status: FTE
      Bob Torres
        role: Junior Engineer
        location: Remote
        status: Contractor
```

### Infrastructure diagrams

```
infra Production Traffic Flow

tag Team as t
  Backend blue
  Platform teal

CloudFront t: Platform
  -> CloudArmor

CloudArmor t: Platform
  -> ALB

ALB t: Platform
  -/api-> [API Pods]

[API Pods]
  APIServer t: Backend
    instances: 3
    latency-ms: 45
```

### Timeline diagrams

Tags in timelines sort and color swim lanes. Use `sort tag:GroupName` to arrange items by tag value.

```
timeline Product Roadmap 2025

tag Team as t
  Engineering blue
  Design purple
  Product green

era 2025-01 -> 2025-06 Phase 1 - Foundation

2025-01 -> 2025-03 Core API Development t: Engineering
2025-01 -> 2025-02 Design System v1 t: Design
2025-02 Competitor Analysis t: Product
```
