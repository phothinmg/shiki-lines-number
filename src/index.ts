// cSpell:disable
import type { ShikiTransformer } from "@shikijs/types";
import type { Element } from "hast";

export type TransformerLinesNumberOptions = {
	/**
	 * Set true to work this transformer.
	 * @default true
	 */
	enable?: boolean;
};

/**
 * Check is it class "line"
 */
const isLineClass = (str: string | string[]): boolean => {
	return !!(
		(typeof str === "string" && str === "line") ||
		(Array.isArray(str) && str.includes("line"))
	);
};

/**
 * Check for notation at first line of raw code.
 */
function isFromNotation(text: string): { r: boolean; text: string } {
	let r = false;
	const rex = /\[\s*lines-number\s*\]/g;
	const meta = text.split("\n").filter((i) => i !== "");
	const match = meta[0].match(rex);
	if (match !== null) {
		meta.shift();
		r = true;
	}
	text = meta.join("\n");
	return { r, text };
}

function getReplaceNode(lineNumber: number): Element {
	const node: Element = {
		type: "element",
		tagName: "span",
		properties: {
			style:
				"width: 1rem; margin-right: 1.5rem;display: inline-block;text-align: right;color:#888;--shiki-dark:#999;",
		},
		children: [
			{
				type: "text",
				value: String(lineNumber),
			},
		],
	};
	return node;
}

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
	options?: TransformerLinesNumberOptions,
): ShikiTransformer {
	const enable = options?.enable ?? true;
	let useNotation = false;
	return {
		name: "shiki:lines-number",
		preprocess(code) {
			const nt = isFromNotation(code);
			useNotation = nt.r;
			return nt.text;
		},
		code(hast) {
			if (!isEnable(enable, useNotation, this.options.meta?.__raw)) {
				return;
			}
			const lines = hast.children.filter(
				(node) =>
					node.type === "element" &&
					node.tagName === "span" &&
					isLineClass(node.properties.class as string | string[]),
			);
			for (let i = 0; i < lines.length; i++) {
				const newNode = getReplaceNode(i + 1);
				const node = lines[i];
				if (node.type === "element") {
					node.children.unshift(newNode);
				}
			}
			return hast;
		},
	};
}
