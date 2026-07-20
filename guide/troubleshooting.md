# Troubleshooting

Most DGMO problems are not "it won't render." They are "it rendered, and it's wrong." This page is organised by **what you are looking at**, not by error code — because when something goes wrong you have a symptom, not a code.

## Before anything else

**A clean check means the file could be read. It does not mean the diagram is right.**

DGMO is forgiving on purpose: rather than reject a line it does not recognise, it usually finds *some* reading for it. That is what lets you type freely, and it is why a mistake often produces a diagram instead of a complaint. [What a clean check does and doesn't tell you](how-dgmo-thinks.md#what-a-clean-check-does-and-doesnt-tell-you) explains the mechanism and gives you a ten-second check to run after every edit.

Two habits catch nearly everything on this page:

- **Read the labels and the axis range** against what you believe you typed.
- **Read the warnings, not only the errors.** Warnings mean something *was* drawn but probably not what you meant. They are the ones people skip.

## Symptom index

| What you're seeing | Section |
| --- | --- |
| A number is smaller than I entered, or a total doesn't add up | [My numbers are wrong](#my-numbers-are-wrong) |
| A row, slice, or link I wrote isn't in the picture | [Something vanished](#something-vanished) |
| A label has part of my data stuck to it | [The label is wrong](#the-label-is-wrong) |
| There's an item in the chart I never wrote | [An extra item appeared](#an-extra-item-appeared) |
| A child or detail landed under the wrong thing | [It attached to the wrong parent](#it-attached-to-the-wrong-parent) |
| I wrote an arrow and no line was drawn | [The relationship didn't draw](#the-relationship-didnt-draw) |
| A setting I wrote had no effect | [The setting did nothing](#the-setting-did-nothing) |
| Blank canvas, or an error card | [Nothing rendered](#nothing-rendered) |

---

## My numbers are wrong

### A trailing `//` note ate the value

Comments are **full-line only**. A `//` part-way through a line is not a comment — it is read as part of that line. [`chart-flowchart.md`](chart-flowchart.md#comments) states the rule and demonstrates it.

The behaviour varies by chart type and none of it is what you want. On some types the whole row is rejected with a warning; on others the value is absorbed and the item renders at zero size; on a few nothing is said at all. This treemap loses `Compute` entirely:

```
treemap Cloud Spend

Cloud
  Compute 400 // ec2 and fargate
  Storage 400
```

> `Leaf "Compute 400 // ec2 and fargate" has no value — it renders with zero size`

The same annotation on a `sankey` link produces **no diagnostic whatsoever** and the link is simply gone from the diagram.

**Fix:** put the note on its own line above.

```dgmo
treemap Cloud Spend

Cloud
  // ec2 and fargate
  Compute 400
  Storage 400
```

Do this everywhere, for every chart type. Do not rely on a particular type tolerating it — almost none of them do, and the ones that fail most quietly are the ones that look safest.

### The thousands separator in same-line metadata

Grouped numbers are fine in ordinary data values — `12,400` reads as twelve thousand four hundred on `bar`, `pie`, `funnel`, `line`, `scatter`, `heatmap`, `treemap` and the rest. A *malformed* grouping like `1,24,000` is rejected with a warning rather than silently truncated, so that case announces itself.

The exception is **same-line metadata**, where the comma is the separator between key/value pairs. `heat: 1,200` reads as a heat of `1` followed by a stray `200`, and nothing warns:

```
treemap Cloud Spend

Cloud
  Compute 400 heat: 1,200
  Storage 400
```

**Fix:** use an underscore in same-line metadata — `1_200` parses as twelve hundred.

```dgmo
treemap Cloud Spend

Cloud
  Compute 400 heat: 1_200
  Storage 400
```

### A total is smaller than its parts

On hierarchical types, a branch's size is the sum of its children — any number you write on the branch itself is ignored. If one item is indented a step too deep it becomes a child of its sibling, that sibling turns into a branch, and the sibling's own value drops out of the arithmetic. See [It attached to the wrong parent](#it-attached-to-the-wrong-parent).

### The percentages aren't the numbers I entered

Proportional types recompute shares from whatever you supply. Three pie values of `30` each display as 33%. If you expected them to add to 100 and they don't, nothing says so — check the totals against the render.

## Something vanished

A row you wrote is not in the picture. In order of likelihood:

1. **A trailing `//` note on that line.** The commonest cause. See [above](#a-trailing--note-ate-the-value).
2. **A malformed number.** `Jan 1,24,000` warns and drops the row. A grouped number has to be grouped in threes.
3. **A row with the wrong number of values** on a multi-series chart. Too *few* values warns and drops the row; too *many* warns and welds the excess into the label.
4. **A blank value.** On hierarchical types an item with no number renders at zero size — present in the model, invisible on screen.

If a whole *link* vanished on `sankey`, and the only complaint is an unrelated one about links, look at the line's colour token. An unrecognised colour is now reported by name and line, so read the warning text rather than guessing.

## The label is wrong

### It ends in a number that should have been data

This is the single most common silent corruption. A label whose last word is a number is indistinguishable from a label followed by a value, so the parser splits on the last token:

```
bar Doubloons by Month

Jan 42
Feb 5 8
Mar 71
```

The middle bar is labelled `Feb 5` with a value of `8`. No diagnostic. The axis quietly rescales and the chart looks entirely plausible.

**Fix:** quote the label.

```dgmo
bar Doubloons by Month

Jan 42
"Feb 5" 8
Mar 71
```

**On multi-series charts this now warns**, and the warning writes the corrected line for you. `radar` and `bar` with a `series` block both report:

> `Data point "Armor" has 4 value(s), but 2 series defined. If the label ends in a number, quote it: "Armor 50 60" 70 80`

That suggestion is generated from the actual parse, so pasting it back is always literally correct. On **single-series** charts there is no series count to check against, so nothing warns — quote defensively whenever a label ends in a digit.

### It has a stray word in it

Anything the parser cannot classify on a data line tends to become part of the label rather than an error. Read the rendered labels, not the source.

## An extra item appeared

### A mistyped setting became a data row

Settings are ordinary words on ordinary lines, so a typo in one does not look like a typo. A misspelling **on its own** is caught:

> `Unexpected line: 'orientation-horizontl'. Did you mean 'orientation-horizontal'?`

But a misspelling **followed by a number** is a perfectly valid data row, and it silently draws a bar:

```
bar Doubloons by Month

wibble-wobble 4
Jan 42
```

No diagnostic. The chart now has a bar named `wibble-wobble`.

**Fix:** count the items in the render against the rows you wrote. One extra shape almost always means a setting fell through into the data.

## It attached to the wrong parent

Indentation is what builds structure, and putting a line one step too deep or too shallow moves it somewhere else without complaint. The rules — how many spaces, what a deeper indent means for each kind of line, and why mixing tabs with spaces is the one indentation mistake that changes your diagram silently — are in [How indentation works](how-dgmo-thinks.md#how-indentation-works).

The two symptoms to recognise:

**A detail attached to the wrong thing.** `key: value` metadata belongs to whatever it is indented *beneath*. Written at the same depth as its intended owner, it attaches to the owner's parent instead. This validates clean:

```
org Crew

Blackbeard
  Anne Bonny
  role: Quartermaster
```

Blackbeard is now the Quartermaster. One more indent step fixes it:

```dgmo
org Crew

Blackbeard
  Anne Bonny
    role: Quartermaster
```

**A child became a grandchild.** On hierarchical types this also changes the arithmetic — the item above it turns into a branch, and a branch's number is ignored in favour of the sum of its children. `Cloud` below reports 200 rather than 800, because `Compute`'s 600 stopped counting:

```
treemap Cloud Spend

Cloud
  Compute 600
    Storage 200
Office
  Rent 200
```

This one does warn — `"Compute" is a branch — its trailing number is ignored` — but the warning describes the mechanism, not the mistake, so it is easy to read past.

## The relationship didn't draw

On [`er`](chart-er.md), [`class`](chart-class.md), and [`c4`](chart-c4.md), a relationship line must be **indented under the element it starts from**. There is no top-level relationship form.

```
er Ship Stores

Customer
  id int pk

Order
  id int pk

Customer 1--* Order
```

> `Relationship "customer → order" must be indented under the source table "customer"`

On `er` and `class` the arrow is dropped and you get a warning; on `c4` it is a hard error and nothing renders at all. The fix is the same in each case — move the arrow under its source and delete the repeated source name:

```dgmo
er Ship Stores

Customer
  id int pk
  1--* Order

Order
  id int pk
```

The same shape applies on `boxes-and-lines`, `infra`, `flowchart`, `sitemap`, `gantt`, `pert`, `swimlane`, `cycle`, and `sketch`, where an indented arrow means "starts from the line above" — see [How indentation works](how-dgmo-thinks.md#how-indentation-works).

## The setting did nothing

- **It's misspelled.** Check for a `Did you mean` warning.
- **It belongs to a different chart type.** Settings are per-type; the chart-type guide lists the ones that apply.
- **It needs a value and didn't get one**, or took one it didn't expect. Settings that take values follow their type's own convention — most use `key: value`, but a few types use a bare space-separated form. The type's guide is authoritative.

Placement above or below your data does not matter on data charts, so that is not the cause.

## Nothing rendered

**An error card instead of a diagram.** The first line is the chart type, and an unrecognised one is a hard error with a `Did you mean` suggestion. Check for a typo in the type name, and that the type is on line 1 with nothing above it.

**A blank canvas with no complaint at all** usually means the type's minimum was not met. Several types need a floor before they can draw anything — a `radar` with fewer than three axes renders nothing and says nothing, for instance. The chart-type guide states these minimums.

**A title and nothing else** means the parser found no content it recognised as data. You'll see `No data points found` alongside it. Check that your rows match the format the type expects.

## How to read a diagnostic

**Errors** stop the render. You get an error card naming the line. These are the easy ones — they cannot be ignored.

**Warnings** are the ones that matter. A warning means something *was* drawn, but probably not what you meant: an item with no value, a number that was ignored, a row that was dropped, a setting that didn't apply. The diagram in front of you looks finished, so the temptation is to dismiss the warning as noise. Nearly every failure on this page that produces a diagnostic produces a warning, not an error.

**No diagnostic at all** is not a clearance. The corruptions above that warn are outnumbered by the ones that don't. Read the picture.

When a warning quotes a value back at you while saying the value is missing — `Leaf "Compute 400 // ec2" has no value` — it is not malfunctioning. It is telling you that the text it quoted was taken as one long label, so nothing was left over to read as a number.

## Next

- **Then:** [How DGMO thinks](how-dgmo-thinks.md) — the mental model behind the whole language
- **Vocabulary:** [Glossary](glossary.md) — directive, metadata, tag group, alias, leaf
