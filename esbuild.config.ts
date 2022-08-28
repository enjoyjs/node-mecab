import {build, BuildOptions} from 'esbuild';

const cjs: BuildOptions = {
	entryPoints: ['./src/index.ts'],
	bundle: true,
	external: ['dargs', 'execa'],
	outfile: './lib/index.cjs',
	platform: 'node',
	format: 'cjs',
	mainFields: ['module', 'main'],
	target: 'node16',
	minify: true,
};

const esm: BuildOptions = {
	...cjs,
	outfile: './lib/index.mjs',
	format: 'esm',
};

await Promise.all([build(cjs), build(esm)]);
