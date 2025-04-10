#!/usr/bin/env node
/** @import {BuildOptions} from "lwe8-build" */
import { build } from "lwe8-build";

await (async () => {
	/**
	 * @type {BuildOptions}
	 */
	const options = {
		format: ["esm"],
		indexFile: {
			path: "./src/index.ts",
		},
		outputDirs: {
			esm: "./dist",
		},
	};
	await build(options);
})();
