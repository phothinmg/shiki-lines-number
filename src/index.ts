import type { ShikiTransformer, DecorationItem } from "@shikijs/types";

export type TransformerLinesNumberOptions = {
  /**
   * Set true to work this transformer.
   * @default true
   */
  enable?: boolean;
};

function isEnable(en: boolean, mt: boolean, str?: string): boolean {
  const rex = /\blines-number\b/;
  const aa = en ? "en" : mt ? "mt" : str?.match(rex) !== null ? "meta" : "woow";
  let r = false;
  switch (aa) {
    case "en":
      r = true;
      break;
    case "meta":
      r = true;
      break;
    case "mt":
      r = true;
      break;
    case "woow":
      r = false;
      break;
  }
  return r;
}

/**
 * Transformer to add line numbers to code blocks.
 *
 * @param {TransformerLinesNumberOptions} options Transformer options.
 * @returns {ShikiTransformer} The transformer.
 */
export function transformerLinesNumber(
  options?: TransformerLinesNumberOptions
): ShikiTransformer {
  const enable = options?.enable ?? true;
  let useNotation = false;
  return {
    name: "shiki:lines-number",
    preprocess(code, options) {
      const rex = /\[\s*lines-number\s*\]/g;
      const meta = code.split("\n").filter((i) => i !== "");
      const match = meta[0].match(rex);
      if (match !== null) {
        meta.shift();
        useNotation = true;
      }
      if (isEnable(enable, useNotation, this.options.meta?.__raw)) {
        if (this.options.decorations) {
          this.options.decorations.map((i) => {
            i.start["character"] = i.start["character"] + 2;
            i.end["character"] = i.end["character"] + 3;
          });
        }
        options.decorations = options.decorations ?? [];
        const str: string[] = [];
        meta.map((v, i) => {
          const vv: DecorationItem = {
            start: { line: i, character: 0 },
            end: { line: i, character: 1 },
            properties: {
              style: "display: inline-block;color:#888;--shiki-dark:#999;",
            },
          };
          options.decorations?.push(vv);
          str.push(`${i + 1}. ${v}`);
        });
        return str.join("\n");
      }
      return code;
    },
  };
}
