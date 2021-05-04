#!/usr/bin/env node

const {build} = require('esbuild');

/** @type {import('esbuild').BuildOptions} */
const cjs = {
	entryPoints: ['./src/index.ts'],
	outdir: './lib/cjs',
	platform: 'node',
	format: 'cjs',
	target: 'node12',
	minify: true
};

/** @type {import('esbuild').BuildOptions} */
const esm = {
	...cjs,
	outdir: './lib/esm',
	format: 'esm'
};

Promise.all([build(cjs), build(esm)])
	.then(() => console.log('build success'))
	.catch(() => process.exit(1));
