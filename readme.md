# shiki-lines-number

![GitHub License](https://img.shields.io/github/license/phothinmg/shiki-lines-number?style=for-the-badge&logo=github)


Lines number transformer for [Shiki][shiki].

## Contents

- [Overview](#overview)
- [Install](#install)
- [Use](#use)
  - [Node js](#node-js)
  - [Cloudflare Workers](#cloudflare-workers)
  - [CDN Usage](#cdn-usage)
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

Add line number to [shiki][shiki] highlighted code block.

Shiki is a syntax highlighter using the [Hypertext Abstract Syntax Tree (hast)][hast] syntax tree. It can be customized to your needs and desires.

## Install

```bash
npm i shiki shiki-lines-number
```

```bash
pnpm i shiki shiki-lines-number
```

```bash
yarn add shiki shiki-lines-number
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { transformerLinesNumber } from "https://esm.sh/shiki-lines-number";
</script>
```

## Use

> Shiki can run on any JavaScript runtime, including browsers, Node.js, Cloudflare Workers, etc.
> This package uses only the Shiki API and can be run alongside Shiki.

### Node js

##### `example.md`:

````md
```js
const message = "Hello World";
console.log(message);
```
````

##### `example.js`:

```ts
import fs from "node:fs/promises";
import { codeToHtml } from "shiki";
import { transformerLinesNumber } from "shiki-lines-number";

const value = await fs.readFile("example.md", "utf8");

const html = await codeToHtml(value, {
  lang: "js",
  theme: "github-light",
  transformers: [transformerLinesNumber({ enable: true })], // default true
  meta: { __raw: "lines-number" }, // enable lines number
});

console.log(html);
```

## CDN Usage

[Demo](demo-cdn)



```html
<body>
  <div id="foo"></div>

  <script type="module">
    // be sure to specify the exact version
    import { codeToHtml } from "https://esm.sh/shiki@3.0.0";
    import { transformerLinesNumber } from "https://esm.sh/shiki-lines-number@0.0.1";

    const foo = document.getElementById("foo");

    const code =
      "console.log('1')\nconsole.log('2')\nconsole.log('3')\nconsole.log('4')";

    foo.innerHTML = await codeToHtml(code, {
      lang: "js",
      theme: "vitesse-light",
      transformers: [transformerLinesNumber()],
    });
  </script>
</body>
```

### Cloudflare Workers

See in [Shiki Documentation][cloudflare-workers]


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

- Set true to `options.enable` of this transformer or add `lines-number` to `options.meta` [Meta String][meta-string] see example [here](#examplejs)

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

> 👉 **Note**:
> Currently the notation must be at the top, may be conflict with other transformers, will fix next version.

## License

[MIT][file-license] © [Pho Thin Mg][ptm]

<!-- Definitions -->

[file-license]: license

[shiki]: https://shiki.matsu.io/

[transformer-api]: https://shiki.style/guide/transformers

[meta-string]: https://shiki.matsu.io/guide/transformers#meta

[ptm]: https://github.com/phothinmg

[hast]: https://github.com/syntax-tree/hast

[esmsh]: https://esm.sh

[demo-cdn]: https://jsfiddle.net/phothin/z89e51kg/40/

[cloudflare-workers]: https://shiki.matsu.io/guide/install#cloudflare-workers

[badge-license]: https://img.shields.io/github/license/phothinmg/shiki-lines-number?style=for-the-badge&logo=github
