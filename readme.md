# shiki-lines-number

Lines number transformer for [Shiki][shiki].

## Contents

- [Overview](#overview)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`transformerLinesNumber`](#transformerlinesnumber)
    - [Parameters](#parameters)
      - [Options](#options)
- [Enable to transform](#enable-to-transform)
  - [Enable all shiki generated code block](#enable-all-shiki-generated-code-block)
  - [Enable specific shiki generated code block](#enable-specific-shiki-generated-code-block)
- [License](#license)

## Overview

**_ESM Only_**

Add line number to [shiki][shiki] highlight code block.

## Install

```bash
npm i shiki shiki-lines-number
```

```bash
pnpm i shiki shiki-lines-number
```

```bash
yarn i shiki shiki-lines-number
```

## Use

`example.md`:

````md
```js
const message = "Hello World";
console.log(message);
```
````

`example.js`:

```ts
import fs from "node:fs/promises";
import { codeToHtml } from "shiki";
import { transformerLinesNumber } from "shiki-lines-number";

const value = await fs.readFile("example.md", "utf8");

const html = await codeToHtml(value, {
  lang: "js",
  theme: "github-light",
  transformers: [transformerLinesNumber()],
  meta: { __raw: "lines-number" }, // enable lines number
});

console.log(html);
```

## API

- This package exports the transformer `transformerLinesNumber` and type `TransformerLinesNumberOptions`.

- There is no default export.

### `transformerLinesNumber`

#### Parameters

##### Options

- type : `TransformerLinesNumberOptions`

- optional : true

- default : {}

  - `options.enable`

  - type : boolean

  - optional : true

  - default : true

  - description : If true , add line number to all shiki generated code block

## Enable to transform

### Enable all shiki generated code block

- Set true to `options.enable` of this transformer or add `lines-number` to `options.meta` [Meta String][meta-string] see example below:

````md
```js
const html = await codeToHtml(value, {
  lang: "js",
  theme: "github-light",
  transformers: [transformerLinesNumber({ enable: true })], // default true
  meta: { __raw: "lines-number" }, // enable lines number with
});
```
````

### Enable specific shiki generated code block

- Disable all above setting

- Enable specific code block with comment notation `// [lines-number]` at the top.

- See example below:

````md
```js
// [lines-number]
console.log("1");
console.log("2");
console.log("3");
console.log("4");
```
````

> [!NOTE]:
> Currently the notation must be at the top, may be conflict with other transformers, will fix next version.

## License

[MIT][file-license] © [Pho Thin Mg][ptm]

<!-- Definitions -->

[file-license]: license

[shiki]: https://shiki.matsu.io/

[meta-string]: https://shiki.matsu.io/guide/transformers#meta

[ptm]: https://github.com/phothinmg
