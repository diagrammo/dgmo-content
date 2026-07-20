```dgmo
class Ship Class Hierarchy

Vessel [interface]
  + sail(): void
  + anchor(): void

Ship implements Vessel [abstract]
  # name: string
  # crew: number
  + getName(): string
  -> ShipType : has type

Galleon extends Ship
  - cannons: number
  + fire(): void

Sloop extends Ship
  - speed: number
  + flee(): void

ShipType [enum]
  Galleon
  Sloop
  Frigate
```

## Overview

A **class diagram** models object-oriented structure: the classes in your code, the attributes and methods inside each one, and how they inherit from or depend on each other. Reach for it to capture a type hierarchy, document a domain model, or explain an interface before anyone reads the source. Each box is a UML-style card with three compartments — name, attributes, methods — and the boxes are arranged for you.

## When to use

- **`class`** — you're describing *code*: objects with typed fields, methods, inheritance, and interfaces.
- **[`er`](chart-er.md)** — you're describing *storage*: database tables with columns, primary and foreign keys, and how many rows link to how many. `class` has no keys and no cardinality, so a schema drawn here silently drops the constraints you were trying to show.
- **[`boxes-and-lines`](chart-boxes-and-lines.md)** — your boxes are just named components; nothing inside them needs listing.
- **[`pyramid`](chart-pyramid.md)** — the hierarchy is conceptual levels (tiers, maturity stages), not code inheritance.

## Syntax

```
class Diagram Title

ClassName [modifier] color
  + publicField: type
  - privateField: type
  # protectedField: type
  + method(params): returnType

ChildClass extends ParentClass
  + field: type
```

The first line declares the chart type and the title — there is no separate `title` directive.

## Classes

Declare a class on an unindented line. Members are indented below:

```
User
  + name: string
  + email: string
  + login(password: string): boolean
```

### Modifiers

Add a modifier in brackets to change the class type:

| Modifier  | Syntax             | Appearance                              |
| --------- | ------------------ | --------------------------------------- |
| Interface | `Name [interface]` | `«interface»` badge, blue               |
| Abstract  | `Name [abstract]`  | `«abstract»` badge, italic name, purple |
| Enum      | `Name [enum]`      | `«enum»` badge, yellow                  |

### Enum Values

Enum classes list plain values instead of typed fields:

```
OrderStatus [enum]
  Pending
  Confirmed
  Shipped
  Delivered
```

## Fields and Methods

Indented lines under a class are parsed as members.

### Visibility

| Symbol | Meaning   |
| ------ | --------- |
| `+`    | Public    |
| `-`    | Private   |
| `#`    | Protected |
| (none) | Public    |

### Fields

```
  + name: string
  - password: string
  # id: number
```

### Methods

Methods are detected by the presence of parentheses:

```
  + login(email: string, pass: string): boolean
  - validate(): void
  + getInstance(): Logger {static}
```

Add `{static}` at the end to mark a member as static.

## Relationships

### Inheritance & Implementation

Use `extends` or `implements` in the class declaration header:

```
Dog extends Animal
  + breed: string

Circle implements Drawable
  - radius: number
```

This declares the class and establishes the relationship in one line. Members are indented below as usual.

### Arrow Syntax

For other relationships, use arrow notation. An arrow line is **indented under its source class**, alongside that class's members — the source is the class you nested it in, so you never repeat its name:

```
Car
  - vin: string
  *-- Engine
  ..> Logger
```

| Relationship   | Arrow   | Example (indented under the source) |
| -------------- | ------- | ----------------------------------- |
| Inheritance    | `--\|>` | `--\|> Animal`                      |
| Implementation | `..\|>` | `..\|> Serializable`                |
| Composition    | `*--`   | `*-- Engine`                        |
| Aggregation    | `o--`   | `o-- Player`                        |
| Dependency     | `..>`   | `..> Logger`                        |
| Association    | `->`    | `-> Customer`                       |

> An arrow written at the left margin (`Car *-- Engine`) is **not** drawn — it warns that it must be indented under the source class. Indentation is what names the source.

### Labels

Add a label after the target, with or without a colon:

```
Car
  *-- Engine : powered by
  ..> Logger uses
```

## Colors

Colors are auto-assigned by modifier type. Override with a trailing color name (lowercase):

```
Ship red
Engine [abstract] purple
```

## Notes

Attach a hide-able annotation to a class with `note <ClassName> text`. The note floats beside the class as a folded-corner box (it never moves the class). Indent lines below the heading for a multi-line body with bullets and inline markdown; end the heading with a lowercase color word to recolor it. `no-notes` suppresses every note.

```
class
Ship
  + sail(): void

note Ship the flagship — heaviest hull in the fleet
note Ship red
  Carries:
  - **boarding crews**
  - the captain's log
```

## Comments

```
// This line is ignored by the parser
```

## Complete Example

```dgmo
class Design Patterns

Drawable [interface]
  + draw(): void
  + resize(w: number, h: number): void

Shape implements Drawable [abstract] purple
  # x: number
  # y: number
  + area(): number

Circle extends Shape
  - radius: number
  + getRadius(): number

Rectangle extends Shape
  - width: number
  - height: number

Canvas
  - shapes: Shape[]
  + render(): void
  *-- Shape : contains
  ..> Logger : uses

Logger
  + log(msg: string): void
```

## Appearance

Every chart accepts the universal appearance directives:

| Directive | Effect |
| --------- | ------ |
| `fill-tint` | Soft tinted fills (default). |
| `fill-solid` | Saturated solid fills. |
| `fill-outline` | Outline only, no fill. |
| `no-title` | Hide the title line. |
| `no-legend` | Hide the legend. |

Colors come from the active palette — see [Colors](colors.md). Set the palette and light/dark theme at render time with `--palette <name>` and `--theme light|dark|transparent`.

## Common mistakes

- **Class has no crow's-foot cardinality and no PK/FK.** If the constraint information is the point of the diagram, use [`er`](chart-er.md) — the wrong choice drops exactly what you drew the diagram to communicate.
- **Relationships must be indented under the source class.** A top-level `Dog --|> Animal` is dropped with a warning and draws nothing.
- **Members need their visibility marker and their type separator.** A member line without a colon between name and type is read as something else.
- Anything that renders but looks wrong: [Troubleshooting](troubleshooting.md) is organised by symptom.

## Next

- **Related:** [`er`](chart-er.md) · [`boxes-and-lines`](chart-boxes-and-lines.md) · [`pyramid`](chart-pyramid.md)
- **Then:** [Colors & palettes](colors.md)
