import {build} from 'esbuild';

/** @type {import('esbuild').BuildOptions} */
const cjs = {
	entryPoints: ['./src/index.ts'],
	outfile: './lib/index.cjs',
	platform: 'node',
	format: 'cjs',
	mainFields: ['module', 'main'],
	target: 'node16',
	minify: true,
};

/** @type {import('esbuild').BuildOptions} */
const esm = {
	...cjs,
	outfile: './lib/index.mjs',
	format: 'esm',
};

Promise.all([build(cjs), build(esm)]).then(() => console.log('build success'));
